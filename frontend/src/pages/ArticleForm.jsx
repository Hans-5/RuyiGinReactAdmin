import { useState, useEffect, useImperativeHandle, forwardRef } from 'react'
import { ARTICLE_CATEGORIES, ARTICLE_STATUSES } from '../config/articleConstants'
import './ArticleForm.css'

const EMPTY = { title: '', summary: '', category: 'technology', status: 'draft', content: '' }

function validate(data) {
  const e = {}
  if (!data.title.trim())    e.title    = 'Title is required.'
  if (!data.category)        e.category = 'Select a category.'
  return e
}

const ArticleForm = forwardRef(function ArticleForm({ initial, onSubmit }, ref) {
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
    <div className="article-form">
      <div className="form-field">
        <label>Title</label>
        <input
          className={errors.title ? 'error' : ''}
          value={data.title}
          onChange={set('title')}
          placeholder="Article title"
        />
        {errors.title && <span className="form-error">{errors.title}</span>}
      </div>

      <div className="form-field">
        <label>Summary</label>
        <input
          value={data.summary}
          onChange={set('summary')}
          placeholder="Brief description (optional)"
        />
      </div>

      <div className="form-row">
        <div className="form-field">
          <label>Category</label>
          <select className={errors.category ? 'error' : ''} value={data.category} onChange={set('category')}>
            {ARTICLE_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          {errors.category && <span className="form-error">{errors.category}</span>}
        </div>
        <div className="form-field">
          <label>Status</label>
          <select value={data.status} onChange={set('status')}>
            {ARTICLE_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>

      <div className="form-field">
        <label>Content</label>
        <textarea
          className="article-content"
          value={data.content}
          onChange={set('content')}
          placeholder="Article content…"
          rows={6}
        />
      </div>
    </div>
  )
})

export default ArticleForm
