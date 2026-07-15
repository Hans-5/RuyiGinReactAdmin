import { useRef } from 'react'
import PageHeader from '../components/Common/PageHeader'
import Card from '../components/Common/Card'
import Badge from '../components/Common/Badge'
import SearchBar from '../components/Common/SearchBar'
import DataTable from '../components/Common/DataTable'
import Pagination from '../components/Common/Pagination'
import FormModal from '../components/Common/FormModal'
import UserForm from './UserForm'
import { useUsers } from '../hooks/useUsers'
import './SystemUsers.css'

const ROLE_FILTERS = [
  { value: 'admin',  label: 'Admin'  },
  { value: 'editor', label: 'Editor' },
  { value: 'viewer', label: 'Viewer' },
]
const STATUS_FILTERS = [
  { value: 'active',    label: 'Active'    },
  { value: 'inactive',  label: 'Inactive'  },
  { value: 'suspended', label: 'Suspended' },
]

const STATUS_VARIANT = { active: 'success', inactive: 'default', suspended: 'error' }

export default function SystemUsers() {
  const formRef = useRef()
  const {
    users, total, page, pageSize, pageCount,
    filters, loading, error, submitting,
    modal, deleteTarget,
    setPage, setFilters,
    openCreate, openEdit, closeModal,
    submitForm,
    setDeleteTarget, confirmDelete,
  } = useUsers()

  const columns = [
    { key: 'id',        label: 'ID',       width: '60px' },
    { key: 'username',  label: 'Username',
      render: (v, row) => (
        <div className="user-cell">
          <span className="user-avatar">{row.avatar}</span>
          <span>{v}</span>
        </div>
      )
    },
    { key: 'email',     label: 'Email' },
    { key: 'role',      label: 'Role',
      render: v => <Badge variant="info" size="sm">{v}</Badge>
    },
    { key: 'status',    label: 'Status',
      render: v => <Badge variant={STATUS_VARIANT[v] ?? 'default'} size="sm">{v}</Badge>
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
    <div className="system-users">
      <PageHeader
        title="User Management"
        subtitle="Manage user accounts, roles, and access."
      />

      <Card
        title={`Users (${total})`}
        action={
          <button className="btn btn-primary btn-sm" onClick={openCreate}>
            + Add User
          </button>
        }
      >
        <SearchBar
          placeholder="Search by username or email…"
          filters={[
            { key: 'role',   label: 'All roles',    options: ROLE_FILTERS },
            { key: 'status', label: 'All statuses', options: STATUS_FILTERS },
          ]}
          values={filters}
          onChange={setFilters}
        />

        <div className="table-wrap">
          <DataTable
            columns={columns}
            rows={users}
            loading={loading}
            error={error}
            emptyText="No users match your search."
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
        title={modal.mode === 'create' ? 'Add User' : 'Edit User'}
        open={modal.open}
        onClose={closeModal}
        onSubmit={() => formRef.current?.submit()}
        submitting={submitting}
        submitLabel={modal.mode === 'create' ? 'Create' : 'Save'}
      >
        <UserForm
          ref={formRef}
          initial={modal.data}
          onSubmit={submitForm}
        />
      </FormModal>

      {/* Delete confirmation modal */}
      <FormModal
        title="Delete User"
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onSubmit={confirmDelete}
        submitLabel="Delete"
      >
        <p style={{ color: 'var(--text-primary)', margin: 0 }}>
          Delete user <strong>{deleteTarget?.username}</strong>? This cannot be undone.
        </p>
      </FormModal>
    </div>
  )
}
