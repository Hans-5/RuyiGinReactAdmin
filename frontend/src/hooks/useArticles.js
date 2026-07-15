import { useState, useEffect, useCallback } from 'react'
import { getData, postData, putData, deleteData } from '../api/apiClient'

const ENDPOINT = '/content/articles'
const PAGE_SIZE = 10

/**
 * useArticles — all state and operations for the Article Management page.
 * Mirrors the useUsers pattern — see hooks/useUsers.js for the template.
 */
export function useArticles() {
  const [allArticles,  setAllArticles]  = useState([])
  const [loading,      setLoading]      = useState(true)
  const [error,        setError]        = useState(null)
  const [filters,      setFilters]      = useState({ search: '', category: '', status: '' })
  const [page,         setPage]         = useState(1)
  const [modal,        setModal]        = useState({ open: false, mode: 'create', data: null })
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [submitting,   setSubmitting]   = useState(false)

  const load = useCallback(() => {
    setLoading(true)
    setError(null)
    getData(ENDPOINT)
      .then(setAllArticles)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => { load() }, [load])

  // ── Derived: filtered + paginated ─────────────────────────────────────────

  const filtered = allArticles.filter(a => {
    const q = filters.search.toLowerCase()
    const matchSearch   = !q ||
      a.title.toLowerCase().includes(q) ||
      a.author.toLowerCase().includes(q)
    const matchCategory = !filters.category || a.category === filters.category
    const matchStatus   = !filters.status   || a.status   === filters.status
    return matchSearch && matchCategory && matchStatus
  })

  const total     = filtered.length
  const pageCount = Math.max(1, Math.ceil(total / PAGE_SIZE))
  const safePage  = Math.min(page, pageCount)
  const articles  = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE)

  const updateFilters = useCallback(next => {
    setFilters(prev => ({ ...prev, ...next }))
    setPage(1)
  }, [])

  // ── Modal helpers ──────────────────────────────────────────────────────────

  const openCreate = () => setModal({ open: true, mode: 'create', data: null })
  const openEdit   = (article) => setModal({ open: true, mode: 'edit', data: article })
  const closeModal = () => setModal(m => ({ ...m, open: false }))

  // ── CRUD ──────────────────────────────────────────────────────────────────

  const submitForm = useCallback(async (formData) => {
    setSubmitting(true)
    try {
      if (modal.mode === 'create') {
        const created = await postData(ENDPOINT, formData)
        setAllArticles(prev => [...prev, created])
      } else {
        const updated = await putData(ENDPOINT, modal.data.id, formData)
        setAllArticles(prev => prev.map(a => a.id === updated.id ? updated : a))
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
      setAllArticles(prev => prev.filter(a => a.id !== deleteTarget.id))
      setDeleteTarget(null)
    } catch (e) {
      setError(e.message)
    }
  }, [deleteTarget])

  return {
    articles, total, page: safePage, pageSize: PAGE_SIZE, pageCount,
    filters, loading, error, submitting,
    modal, deleteTarget,
    setPage, setFilters: updateFilters,
    openCreate, openEdit, closeModal,
    submitForm,
    setDeleteTarget, confirmDelete,
  }
}
