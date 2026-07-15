import { useState, useEffect, useImperativeHandle, forwardRef } from 'react'
import { CATEGORY_STATUS_OPTIONS } from '../config/taxonomyConstants'
import './CategoryForm.css'

const EMPTY = { name: '', description: '', status: 'active' }

const CategoryForm = forwardRef(function CategoryForm({ initial, onSubmit }, ref) {
  const [data,   setData]   = useState(initial ?? EMPTY)
  const [errors, setErrors] = useState({})

  useEffect(() => { setData(initial ?? EMPTY); setErrors({}) }, [initial])

  const set = (key) => (e) => setData(d => ({ ...d, [key]: e.target.value }))

  useImperativeHandle(ref, () => ({
    submit() {
      const errs = {}
      if (!data.name.trim()) errs.name = 'Name is required.'
      setErrors(errs)
      if (Object.keys(errs).length === 0) onSubmit(data)
    },
  }))

  return (
    <div className="category-form">
      <div className="form-field">
        <label>Name</label>
        <input
          className={errors.name ? 'error' : ''}
          value={data.name}
          onChange={set('name')}
          placeholder="Category name"
        />
        {errors.name && <span className="form-error">{errors.name}</span>}
      </div>
      <div className="form-field">
        <label>Description</label>
        <input value={data.description} onChange={set('description')} placeholder="Optional description" />
      </div>
      <div className="form-field">
        <label>Status</label>
        <select value={data.status} onChange={set('status')}>
          {CATEGORY_STATUS_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      </div>
    </div>
  )
})

export default CategoryForm
