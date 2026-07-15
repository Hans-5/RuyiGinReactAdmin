import { useEffect } from 'react'
import './FormModal.css'

/**
 * FormModal — generic modal shell for create/edit forms.
 *
 * title:     string
 * open:      boolean
 * onClose:   () => void
 * onSubmit:  () => void
 * submitting: boolean
 * submitLabel: string (default 'Save')
 * children:  the form fields
 */
export default function FormModal({
  title,
  open,
  onClose,
  onSubmit,
  submitting = false,
  submitLabel = 'Save',
  children,
}) {
  // Close on Escape key
  useEffect(() => {
    if (!open) return
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">{title}</h3>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">
          {children}
        </div>
        <div className="modal-footer">
          <button className="btn btn-default" onClick={onClose} disabled={submitting}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={onSubmit} disabled={submitting}>
            {submitting ? 'Saving…' : submitLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
