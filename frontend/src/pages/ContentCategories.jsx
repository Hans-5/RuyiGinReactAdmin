import { useRef } from 'react'
import PageHeader from '../components/Common/PageHeader'
import Card from '../components/Common/Card'
import Badge from '../components/Common/Badge'
import SearchBar from '../components/Common/SearchBar'
import DataTable from '../components/Common/DataTable'
import Pagination from '../components/Common/Pagination'
import FormModal from '../components/Common/FormModal'
import CategoryForm from './CategoryForm'
import { useCategories } from '../hooks/useCategories'
import { CATEGORY_STATUS_OPTIONS, CATEGORY_STATUS_BADGE } from '../config/taxonomyConstants'

export default function ContentCategories() {
  const formRef = useRef()
  const {
    items, total, page, pageSize, pageCount,
    filters, loading, error, submitting,
    modal, deleteTarget,
    setPage, setFilters,
    openCreate, openEdit, closeModal, submitForm,
    setDeleteTarget, confirmDelete,
  } = useCategories()

  const columns = [
    { key: 'id',           label: 'ID',       width: '60px' },
    { key: 'name',         label: 'Name' },
    { key: 'slug',         label: 'Slug' },
    { key: 'description',  label: 'Description' },
    { key: 'status',       label: 'Status',
      render: v => <Badge variant={CATEGORY_STATUS_BADGE[v] ?? 'default'} size="sm">{v}</Badge>
    },
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
      <PageHeader title="Categories" subtitle="Organise articles into categories." />
      <Card
        title={`Categories (${total})`}
        action={<button className="btn btn-primary btn-sm" onClick={openCreate}>+ Add Category</button>}
      >
        <SearchBar
          placeholder="Search by name or slug…"
          filters={[{ key: 'status', label: 'All statuses', options: CATEGORY_STATUS_OPTIONS }]}
          values={filters}
          onChange={setFilters}
        />
        <div style={{ marginTop: 16 }}>
          <DataTable columns={columns} rows={items} loading={loading} error={error}
            emptyText="No categories found." />
        </div>
        <Pagination page={page} pageCount={pageCount} total={total} pageSize={pageSize} onChange={setPage} />
      </Card>

      <FormModal title={modal.mode === 'create' ? 'Add Category' : 'Edit Category'}
        open={modal.open} onClose={closeModal} onSubmit={() => formRef.current?.submit()}
        submitting={submitting} submitLabel={modal.mode === 'create' ? 'Create' : 'Save'}>
        <CategoryForm ref={formRef} initial={modal.data} onSubmit={submitForm} />
      </FormModal>

      <FormModal title="Delete Category" open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)} onSubmit={confirmDelete} submitLabel="Delete">
        <p style={{ color: 'var(--text-primary)', margin: 0 }}>
          Delete category <strong>{deleteTarget?.name}</strong>? This cannot be undone.
        </p>
      </FormModal>
    </div>
  )
}
