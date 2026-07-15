import { useRef } from 'react'
import PageHeader from '../components/Common/PageHeader'
import Card from '../components/Common/Card'
import Badge from '../components/Common/Badge'
import SearchBar from '../components/Common/SearchBar'
import DataTable from '../components/Common/DataTable'
import Pagination from '../components/Common/Pagination'
import FormModal from '../components/Common/FormModal'
import RoleForm from './RoleForm'
import { useRoles } from '../hooks/useRoles'
import './SystemRoles.css'

export default function SystemRoles() {
  const formRef = useRef()
  const {
    roles, total, page, pageSize, pageCount,
    search, loading, error, submitting,
    modal, deleteTarget,
    setPage, setSearch,
    openCreate, openEdit, closeModal, submitForm,
    setDeleteTarget, confirmDelete,
  } = useRoles()

  const columns = [
    { key: 'id',          label: 'ID',          width: '60px' },
    { key: 'name',        label: 'Role Name',
      render: (v) => <strong className="role-name">{v}</strong>
    },
    { key: 'description', label: 'Description' },
    { key: 'permissions', label: 'Permissions',
      render: (perms) => (
        <div className="perm-tags">
          {perms.map(p => <Badge key={p} variant="info" size="sm">{p}</Badge>)}
        </div>
      )
    },
    { key: 'userCount',   label: 'Users',       width: '70px',
      render: (v) => <Badge variant={v > 0 ? 'success' : 'default'} size="sm">{v}</Badge>
    },
    { key: 'createdAt',   label: 'Created',     width: '110px' },
    { key: 'actions',     label: 'Actions',     width: '120px',
      render: (_, row) => (
        <div className="action-btns">
          <button className="btn btn-default btn-sm" onClick={() => openEdit(row)}>Edit</button>
          <button className="btn btn-danger  btn-sm" onClick={() => setDeleteTarget(row)}
            disabled={row.name === 'Super Admin'} title={row.name === 'Super Admin' ? 'Cannot delete' : ''}>
            Delete
          </button>
        </div>
      )
    },
  ]

  const handleSubmit = () => {
    const values = formRef.current?.getValues()
    if (!values?.name?.trim()) return
    submitForm(values)
  }

  return (
    <div className="system-roles">
      <PageHeader
        title="Role Management"
        subtitle="Define roles and their permission sets."
        action={<button className="btn btn-primary" onClick={openCreate}>+ New Role</button>}
      />

      <Card>
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search roles…"
        />

        <DataTable
          columns={columns}
          rows={roles}
          loading={loading}
          error={error}
          emptyText="No roles found."
        />

        {!loading && pageCount > 1 && (
          <Pagination page={page} pageCount={pageCount} total={total} pageSize={pageSize} onChange={setPage} />
        )}
      </Card>

      {/* Create / Edit modal */}
      <FormModal
        open={modal.open}
        title={modal.mode === 'create' ? 'New Role' : 'Edit Role'}
        onClose={closeModal}
        onConfirm={handleSubmit}
        confirmLabel={submitting ? 'Saving…' : 'Save'}
        confirmDisabled={submitting}
      >
        <RoleForm ref={formRef} initial={modal.data} />
      </FormModal>

      {/* Delete confirmation */}
      <FormModal
        open={!!deleteTarget}
        title="Delete Role"
        onClose={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
        confirmLabel="Delete"
        confirmVariant="danger"
      >
        <p style={{ padding: '8px 0' }}>
          Delete role <strong>{deleteTarget?.name}</strong>?
          This action cannot be undone.
        </p>
      </FormModal>
    </div>
  )
}
