import { useState, useEffect, useCallback } from 'react'
import { getData, postData, putData, deleteData } from '../api/apiClient'

const ENDPOINT = '/content/tags'
const PAGE_SIZE = 10

export function useTags() {
  const [allItems,     setAllItems]     = useState([])
  const [loading,      setLoading]      = useState(true)
  const [error,        setError]        = useState(null)
  const [filters,      setFilters]      = useState({ search: '' })
  const [page,         setPage]         = useState(1)
  const [modal,        setModal]        = useState({ open: false, mode: 'create', data: null })
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [submitting,   setSubmitting]   = useState(false)

  const load = useCallback(() => {
    setLoading(true); setError(null)
    getData(ENDPOINT).then(setAllItems).catch(e => setError(e.message)).finally(() => setLoading(false))
  }, [])

  useEffect(() => { load() }, [load])

  const filtered = allItems.filter(t => {
    const q = filters.search.toLowerCase()
    return !q || t.name.toLowerCase().includes(q) || t.slug.toLowerCase().includes(q)
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
        setAllItems(prev => prev.map(t => t.id === updated.id ? updated : t))
      }
      closeModal()
    } catch (e) { setError(e.message) }
    finally { setSubmitting(false) }
  }, [modal])

  const confirmDelete = useCallback(async () => {
    if (!deleteTarget) return
    try {
      await deleteData(ENDPOINT, deleteTarget.id)
      setAllItems(prev => prev.filter(t => t.id !== deleteTarget.id))
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
