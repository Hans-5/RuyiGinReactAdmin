import { useState, useEffect, useCallback } from 'react'
import { getData, postData, putData, deleteData } from '../api/apiClient'

const ENDPOINT = '/system/users'
const PAGE_SIZE = 10

/**
 * useUsers — all state and operations for the User Management page.
 *
 * Exposes:
 *   Data:    users, total, page, pageSize, filters, loading, error
 *   Actions: setPage, setFilters, openCreate, openEdit, closeModal,
 *            submitForm, confirmDelete, cancelDelete
 *   Modal:   modal { open, mode:'create'|'edit', data }
 *   Delete:  deleteTarget (user to confirm) | null
 */
export function useUsers() {
  const [allUsers,     setAllUsers]     = useState([])
  const [loading,      setLoading]      = useState(true)
  const [error,        setError]        = useState(null)
  const [filters,      setFilters]      = useState({ search: '', role: '', status: '' })
  const [page,         setPage]         = useState(1)
  const [modal,        setModal]        = useState({ open: false, mode: 'create', data: null })
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [submitting,   setSubmitting]   = useState(false)

  // Load all users once; CRUD ops update local state without re-fetching.
  const load = useCallback(() => {
    setLoading(true)
    setError(null)
    getData(ENDPOINT)
      .then(setAllUsers)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => { load() }, [load])

  // ── Derived: filtered + paginated ─────────────────────────────────────────

  const filtered = allUsers.filter(u => {
    const q = filters.search.toLowerCase()
    const matchSearch = !q ||
      u.username.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q)
    const matchRole   = !filters.role   || u.role   === filters.role
    const matchStatus = !filters.status || u.status === filters.status
    return matchSearch && matchRole && matchStatus
  })

  const total     = filtered.length
  const pageCount = Math.max(1, Math.ceil(total / PAGE_SIZE))
  const safePage  = Math.min(page, pageCount)
  const users     = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE)

  // Reset to page 1 when filters change.
  const updateFilters = useCallback(next => {
    setFilters(prev => ({ ...prev, ...next }))
    setPage(1)
  }, [])

  // ── Modal helpers ──────────────────────────────────────────────────────────

  const openCreate = () => setModal({ open: true, mode: 'create', data: null })
  const openEdit   = (user) => setModal({ open: true, mode: 'edit', data: user })
  const closeModal = () => setModal(m => ({ ...m, open: false }))

  // ── CRUD ──────────────────────────────────────────────────────────────────

  const submitForm = useCallback(async (formData) => {
    setSubmitting(true)
    try {
      if (modal.mode === 'create') {
        const created = await postData(ENDPOINT, formData)
        setAllUsers(prev => [...prev, created])
      } else {
        const updated = await putData(ENDPOINT, modal.data.id, formData)
        setAllUsers(prev => prev.map(u => u.id === updated.id ? updated : u))
      }
      closeModal()
    } catch (e) {
      setError(e.message)
    } finally {
      setSubmitting(false)
    }
  }, [modal])

  const confirmDelete = useCallback(async () => {
    if (!deleteTarget) return
    try {
      await deleteData(ENDPOINT, deleteTarget.id)
      setAllUsers(prev => prev.filter(u => u.id !== deleteTarget.id))
      setDeleteTarget(null)
    } catch (e) {
      setError(e.message)
    }
  }, [deleteTarget])

  return {
    // data
    users, total, page: safePage, pageSize: PAGE_SIZE, pageCount,
    filters, loading, error, submitting,
    // modal
    modal, deleteTarget,
    // actions
    setPage, setFilters: updateFilters,
    openCreate, openEdit, closeModal,
    submitForm,
    setDeleteTarget, confirmDelete,
  }
}
