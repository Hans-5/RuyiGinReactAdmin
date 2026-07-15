import { useState, useEffect, useImperativeHandle, forwardRef } from 'react'

const PERM_OPTIONS = [
  { value: 'user:read',     label: 'Users — Read'   },
  { value: 'user:write',    label: 'Users — Write'  },
  { value: 'user:*',        label: 'Users — All'    },
  { value: 'content:read',  label: 'Content — Read' },
  { value: 'content:write', label: 'Content — Write'},
  { value: 'content:*',     label: 'Content — All'  },
  { value: 'system:*',      label: 'System — All'   },
]

const DEFAULTS = { name: '', description: '', permissions: [] }

const RoleForm = forwardRef(function RoleForm({ initial }, ref) {
  const [form, setForm] = useState(initial || DEFAULTS)

  useEffect(() => { setForm(initial || DEFAULTS) }, [initial])
  useImperativeHandle(ref, () => ({ getValues: () => form }))

  const set = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.value }))

  const togglePerm = (value) => {
    setForm(f => ({
      ...f,
      permissions: f.permissions.includes(value)
        ? f.permissions.filter(p => p !== value)
        : [...f.permissions, value],
    }))
  }

  return (
    <div className="form-body">
      <div className="form-row">
        <label className="form-label">Role Name <span className="form-required">*</span></label>
        <input className="form-input" value={form.name} onChange={set('name')} placeholder="e.g. Editor" required />
      </div>
      <div className="form-row">
        <label className="form-label">Description</label>
        <input className="form-input" value={form.description} onChange={set('description')} placeholder="Brief description of this role" />
      </div>
      <div className="form-row">
        <label className="form-label">Permissions</label>
        <div className="perm-grid">
          {PERM_OPTIONS.map(opt => (
            <label key={opt.value} className="perm-item">
              <input
                type="checkbox"
                checked={form.permissions.includes(opt.value)}
                onChange={() => togglePerm(opt.value)}
              />
              <span>{opt.label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  )
})

export default RoleForm
