import { useRef } from 'react'
import PageHeader from '../components/Common/PageHeader'
import Card from '../components/Common/Card'
import SearchBar from '../components/Common/SearchBar'
import DataTable from '../components/Common/DataTable'
import Pagination from '../components/Common/Pagination'
import FormModal from '../components/Common/FormModal'
import TagForm from './TagForm'
import { useTags } from '../hooks/useTags'

export default function ContentTags() {
  const formRef = useRef()
  const {
    items, total, page, pageSize, pageCount,
    filters, loading, error, submitting,
    modal, deleteTarget,
    setPage, setFilters,
    openCreate, openEdit, closeModal, submitForm,
    setDeleteTarget, confirmDelete,
  } = useTags()

  const columns = [
    { key: 'id',           label: 'ID',       width: '60px' },
    { key: 'name',         label: 'Name' },
    { key: 'slug',         label: 'Slug' },
    { key: 'articleCount', label: 'Articles', width: '80px' },
    { key: 'createdAt',    label: 'Created',  width: '110px' },
    { key: 'actions',      label: 'Actions',  width: '120px',
      render: (_, row) => (
        <div className="action-btns">
          <button className="btn btn-default btn-sm" onClick={() => openEdit(row)}>Edit</button>
          <button className="btn btn-danger  btn-sm" onClick={() => setDeleteTarget(row)}>Delete</button>
        </div>
      )
    },
  ]

  return (
    <div>
      <PageHeader title="Tags" subtitle="Label articles with searchable tags." />
      <Card
        title={`Tags (${total})`}
        action={<button className="btn btn-primary btn-sm" onClick={openCreate}>+ Add Tag</button>}
      >
        <SearchBar placeholder="Search tags…" values={filters} onChange={setFilters} />
        <div style={{ marginTop: 16 }}>
          <DataTable columns={columns} rows={items} loading={loading} error={error}
            emptyText="No tags found." />
        </div>
        <Pagination page={page} pageCount={pageCount} total={total} pageSize={pageSize} onChange={setPage} />
      </Card>

      <FormModal title={modal.mode === 'create' ? 'Add Tag' : 'Edit Tag'}
        open={modal.open} onClose={closeModal} onSubmit={() => formRef.current?.submit()}
        submitting={submitting} submitLabel={modal.mode === 'create' ? 'Create' : 'Save'}>
        <TagForm ref={formRef} initial={modal.data} onSubmit={submitForm} />
      </FormModal>

      <FormModal title="Delete Tag" open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)} onSubmit={confirmDelete} submitLabel="Delete">
        <p style={{ color: 'var(--text-primary)', margin: 0 }}>
          Delete tag <strong>{deleteTarget?.name}</strong>?
        </p>
      </FormModal>
    </div>
  )
}
