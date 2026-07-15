import { useState, useEffect, useImperativeHandle, forwardRef } from 'react'
import { USER_ROLES, USER_STATUSES } from '../config/userConstants'
import './UserForm.css'
const EMPTY    = { username: '', email: '', role: 'viewer', status: 'active' }

function validate(data) {
  const e = {}
  if (!data.username.trim())   e.username = 'Username is required.'
  if (!data.email.trim())      e.email    = 'Email is required.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) e.email = 'Invalid email.'
  return e
}

/**
 * UserForm — form fields for create/edit user.
 * Exposes a submit() method via ref: ref.current.submit() triggers validation
 * and calls onSubmit(data) if valid.
 */
const UserForm = forwardRef(function UserForm({ initial, onSubmit }, ref) {
  const [data,   setData]   = useState(initial ?? EMPTY)
  const [errors, setErrors] = useState({})

  useEffect(() => { setData(initial ?? EMPTY); setErrors({}) }, [initial])

  const set = (key) => (e) => setData(d => ({ ...d, [key]: e.target.value }))

  useImperativeHandle(ref, () => ({
    submit() {
      const errs = validate(data)
      setErrors(errs)
      if (Object.keys(errs).length === 0) onSubmit(data)
    },
  }))

  return (
    <div className="user-form">
      <div className="form-field">
        <label>Username</label>
        <input
          className={errors.username ? 'error' : ''}
          value={data.username}
          onChange={set('username')}
          placeholder="e.g. alice.smith"
        />
        {errors.username && <span className="form-error">{errors.username}</span>}
      </div>
      <div className="form-field">
        <label>Email</label>
        <input
          className={errors.email ? 'error' : ''}
          value={data.email}
          onChange={set('email')}
          type="email"
          placeholder="e.g. alice@example.com"
        />
        {errors.email && <span className="form-error">{errors.email}</span>}
      </div>
      <div className="form-row">
        <div className="form-field">
          <label>Role</label>
          <select value={data.role} onChange={set('role')}>
            {USER_ROLES.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>
        <div className="form-field">
          <label>Status</label>
          <select value={data.status} onChange={set('status')}>
            {USER_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>
    </div>
  )
})

export default UserForm
