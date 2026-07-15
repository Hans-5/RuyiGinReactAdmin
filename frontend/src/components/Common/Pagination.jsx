import './Pagination.css'

/**
 * Pagination — page navigator.
 *
 * page, pageCount, total, pageSize: numbers
 * onChange: (newPage) => void
 */
export default function Pagination({ page, pageCount, total, pageSize, onChange }) {
  if (pageCount <= 1 && total === 0) return null

  const start = total === 0 ? 0 : (page - 1) * pageSize + 1
  const end   = Math.min(page * pageSize, total)

  return (
    <div className="pagination">
      <span className="pagination-info">
        {total === 0 ? 'No results' : `${start}–${end} of ${total}`}
      </span>
      <div className="pagination-controls">
        <button
          className="pagination-btn"
          disabled={page <= 1}
          onClick={() => onChange(page - 1)}
        >‹</button>
        {Array.from({ length: pageCount }, (_, i) => i + 1)
          .filter(p => p === 1 || p === pageCount || Math.abs(p - page) <= 1)
          .reduce((acc, p, i, arr) => {
            if (i > 0 && arr[i - 1] !== p - 1) acc.push('…')
            acc.push(p)
            return acc
          }, [])
          .map((p, i) =>
            p === '…'
              ? <span key={`ellipsis-${i}`} className="pagination-ellipsis">…</span>
              : <button
                  key={p}
                  className={`pagination-btn ${p === page ? 'active' : ''}`}
                  onClick={() => onChange(p)}
                >{p}</button>
          )
        }
        <button
          className="pagination-btn"
          disabled={page >= pageCount}
          onClick={() => onChange(page + 1)}
        >›</button>
      </div>
    </div>
  )
}
