import { useState, useEffect, useCallback } from 'react'
import { getData, postData, putData, deleteData } from '../api/apiClient'

const ENDPOINT = '/content/categories'
const PAGE_SIZE = 10

export function useCategories() {
  const [allItems,     setAllItems]     = useState([])
  const [loading,      setLoading]      = useState(true)
  const [error,        setError]        = useState(null)
  const [filters,      setFilters]      = useState({ search: '', status: '' })
  const [page,         setPage]         = useState(1)
  const [modal,        setModal]        = useState({ open: false, mode: 'create', data: null })
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [submitting,   setSubmitting]   = useState(false)

  const load = useCallback(() => {
    setLoading(true); setError(null)
    getData(ENDPOINT).then(setAllItems).catch(e => setError(e.message)).finally(() => setLoading(false))
  }, [])

  useEffect(() => { load() }, [load])

  const filtered = allItems.filter(c => {
    const q = filters.search.toLowerCase()
    const matchSearch = !q || c.name.toLowerCase().includes(q) || c.slug.toLowerCase().includes(q)
    const matchStatus = !filters.status || c.status === filters.status
    return matchSearch && matchStatus
  })

  const total     = filtered.length
  const pageCount = Math.max(1, Math.ceil(total / PAGE_SIZE))
  const safePage  = Math.min(page, pageCount)
  const items     = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE)

  const updateFilters = useCallback(next => { setFilters(p => ({ ...p, ...next })); setPage(1) }, [])
  const openCreate    = () => setModal({ open: true, mode: 'create', data: null })
  const openEdit      = (item) => setModal({ open: true, mode: 'edit', data: item })
  const closeModal    = () => setModal(m => ({ ...m, open: false }))

  const submitForm = useCallback(async (formData) => {
    setSubmitting(true)
    try {
      if (modal.mode === 'create') {
        const created = await postData(ENDPOINT, formData)
        setAllItems(prev => [...prev, created])
      } else {
        const updated = await putData(ENDPOINT, modal.data.id, formData)
        setAllItems(prev => prev.map(c => c.id === updated.id ? updated : c))
      }
      closeModal()
    } catch (e) { setError(e.message) }
    finally { setSubmitting(false) }
  }, [modal])

  const confirmDelete = useCallback(async () => {
    if (!deleteTarget) return
    try {
      await deleteData(ENDPOINT, deleteTarget.id)
      setAllItems(prev => prev.filter(c => c.id !== deleteTarget.id))
      setDeleteTarget(null)
    } catch (e) { setError(e.message) }
  }, [deleteTarget])

  return {
    items, total, page: safePage, pageSize: PAGE_SIZE, pageCount,
    filters, loading, error, submitting,
    modal, deleteTarget,
    setPage, setFilters: updateFilters,
    openCreate, openEdit, closeModal, submitForm,
    setDeleteTarget, confirmDelete,
  }
}
