import { useRef } from 'react'
import PageHeader from '../components/Common/PageHeader'
import Card from '../components/Common/Card'
import Badge from '../components/Common/Badge'
import SearchBar from '../components/Common/SearchBar'
import DataTable from '../components/Common/DataTable'
import Pagination from '../components/Common/Pagination'
import FormModal from '../components/Common/FormModal'
import ArticleForm from './ArticleForm'
import { useArticles } from '../hooks/useArticles'
import {
  CATEGORY_FILTER_OPTIONS,
  ARTICLE_STATUS_FILTER_OPTIONS,
  ARTICLE_STATUS_BADGE_VARIANT,
} from '../config/articleConstants'
import './ContentArticles.css'

export default function ContentArticles() {
  const formRef = useRef()
  const {
    articles, total, page, pageSize, pageCount,
    filters, loading, error, submitting,
    modal, deleteTarget,
    setPage, setFilters,
    openCreate, openEdit, closeModal,
    submitForm,
    setDeleteTarget, confirmDelete,
  } = useArticles()

  const columns = [
    { key: 'id',        label: 'ID',       width: '60px' },
    { key: 'title',     label: 'Title',
      render: (v) => <span className="article-title">{v}</span>
    },
    { key: 'category',  label: 'Category',
      render: v => <Badge variant="info" size="sm">{v}</Badge>
    },
    { key: 'author',    label: 'Author' },
    { key: 'status',    label: 'Status',
      render: v => (
        <Badge variant={ARTICLE_STATUS_BADGE_VARIANT[v] ?? 'default'} size="sm">{v}</Badge>
      )
    },
    { key: 'createdAt', label: 'Created', width: '110px' },
    { key: 'actions',   label: 'Actions', width: '120px',
      render: (_, row) => (
        <div className="action-btns">
          <button className="btn btn-default btn-sm" onClick={() => openEdit(row)}>Edit</button>
          <button className="btn btn-danger  btn-sm" onClick={() => setDeleteTarget(row)}>Delete</button>
        </div>
      )
    },
  ]

  return (
    <div className="content-articles">
      <PageHeader
        title="Article Management"
        subtitle="Create and manage published content."
      />

      <Card
        title={`Articles (${total})`}
        action={
          <button className="btn btn-primary btn-sm" onClick={openCreate}>
            + New Article
          </button>
        }
      >
        <SearchBar
          placeholder="Search by title or author…"
          filters={[
            { key: 'category', label: 'All categories', options: CATEGORY_FILTER_OPTIONS },
            { key: 'status',   label: 'All statuses',   options: ARTICLE_STATUS_FILTER_OPTIONS },
          ]}
          values={filters}
          onChange={setFilters}
        />

        <div className="table-wrap">
          <DataTable
            columns={columns}
            rows={articles}
            loading={loading}
            error={error}
            emptyText="No articles match your search."
          />
        </div>

        <Pagination
          page={page}
          pageCount={pageCount}
          total={total}
          pageSize={pageSize}
          onChange={setPage}
        />
      </Card>

      {/* Create / Edit modal */}
      <FormModal
        title={modal.mode === 'create' ? 'New Article' : 'Edit Article'}
        open={modal.open}
        onClose={closeModal}
        onSubmit={() => formRef.current?.submit()}
        submitting={submitting}
        submitLabel={modal.mode === 'create' ? 'Create' : 'Save'}
      >
        <ArticleForm
          ref={formRef}
          initial={modal.data}
          onSubmit={submitForm}
        />
      </FormModal>

      {/* Delete confirmation */}
      <FormModal
        title="Delete Article"
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onSubmit={confirmDelete}
        submitLabel="Delete"
      >
        <p style={{ color: 'var(--text-primary)', margin: 0 }}>
          Delete <strong>{deleteTarget?.title}</strong>? This cannot be undone.
        </p>
      </FormModal>
    </div>
  )
}
