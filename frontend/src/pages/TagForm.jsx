import { useState, useEffect, useImperativeHandle, forwardRef } from 'react'
import './TagForm.css'

const EMPTY = { name: '' }

const TagForm = forwardRef(function TagForm({ initial, onSubmit }, ref) {
  const [data,   setData]   = useState(initial ?? EMPTY)
  const [errors, setErrors] = useState({})

  useEffect(() => { setData(initial ?? EMPTY); setErrors({}) }, [initial])

  const set = (key) => (e) => setData(d => ({ ...d, [key]: e.target.value }))

  useImperativeHandle(ref, () => ({
    submit() {
      const errs = {}
      if (!data.name.trim()) errs.name = 'Tag name is required.'
      setErrors(errs)
      if (Object.keys(errs).length === 0) onSubmit(data)
    },
  }))

  return (
    <div className="tag-form">
      <div className="form-field">
        <label>Name</label>
        <input
          className={errors.name ? 'error' : ''}
          value={data.name}
          onChange={set('name')}
          placeholder="e.g. react"
        />
        {errors.name && <span className="form-error">{errors.name}</span>}
      </div>
    </div>
  )
})

export default TagForm
