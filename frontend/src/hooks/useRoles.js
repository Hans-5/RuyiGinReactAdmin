import { useState, useCallback } from 'react'
import { getData, postData, putData, deleteData } from '../api/apiClient'

const ENDPOINT = '/system/roles'

/**
 * useRoles — state and CRUD operations for the Role Management page.
 */
export function useRoles() {
  const [allRoles,     setAllRoles]     = useState([])
  const [loading,      setLoading]      = useState(true)
  const [error,        setError]        = useState(null)
  const [search,       setSearch]       = useState('')
  const [page,         setPage]         = useState(1)
  const [modal,        setModal]        = useState({ open: false, mode: 'create', data: null })
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [submitting,   setSubmitting]   = useState(false)

  const PAGE_SIZE = 10

  const load = useCallback(() => {
    setLoading(true)
    setError(null)
    getData(ENDPOINT)
      .then(data => setAllRoles(data))
      .catch(e   => setError(e.message))
      .finally(  () => setLoading(false))
  }, [])

  // Load on mount
  useState(() => { load() }, [])

  const filtered = allRoles.filter(r =>
    !search || r.name.toLowerCase().includes(search.toLowerCase()) ||
    (r.description || '').toLowerCase().includes(search.toLowerCase())
  )
  const total     = filtered.length
  const pageCount = Math.max(1, Math.ceil(total / PAGE_SIZE))
  const roles     = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const openCreate = ()    => setModal({ open: true, mode: 'create', data: null })
  const openEdit   = (row) => setModal({ open: true, mode: 'edit',   data: row  })
  const closeModal = ()    => setModal(m => ({ ...m, open: false }))

  const submitForm = async (formData) => {
    setSubmitting(true)
    try {
      if (modal.mode === 'create') {
        const created = await postData(ENDPOINT, formData)
        setAllRoles(prev => [...prev, created])
      } else {
        const updated = await putData(ENDPOINT, modal.data.id, formData)
        setAllRoles(prev => prev.map(r => r.id === updated.id ? updated : r))
      }
      closeModal()
    } catch (e) {
      setError(e.message)
    } finally {
      setSubmitting(false)
    }
  }

  const confirmDelete = async () => {
    if (!deleteTarget) return
    try {
      await deleteData(ENDPOINT, deleteTarget.id)
      setAllRoles(prev => prev.filter(r => r.id !== deleteTarget.id))
    } catch (e) {
      setError(e.message)
    } finally {
      setDeleteTarget(null)
    }
  }

  return {
    roles, total, page, pageSize: PAGE_SIZE, pageCount,
    search, loading, error, submitting,
    modal, deleteTarget,
    setPage: (p) => setPage(p),
    setSearch: (s) => { setSearch(s); setPage(1) },
    openCreate, openEdit, closeModal, submitForm,
    setDeleteTarget, confirmDelete,
  }
}
