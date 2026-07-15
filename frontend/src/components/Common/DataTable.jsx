import './DataTable.css'

/**
 * DataTable — config-driven table with loading/empty/error states.
 *
 * columns: [{ key, label, width?, render?: (value, row) => ReactNode }]
 * rows:    array of data objects
 * loading, error: state flags
 * emptyText: shown when rows is empty and not loading
 */
export default function DataTable({ columns, rows, loading, error, emptyText = 'No data found.' }) {
  return (
    <div className="data-table-wrap">
      <table className="data-table">
        <thead>
          <tr>
            {columns.map(col => (
              <th key={col.key} style={col.width ? { width: col.width } : undefined}>
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr><td colSpan={columns.length} className="data-table-state">Loading…</td></tr>
          ) : error ? (
            <tr><td colSpan={columns.length} className="data-table-state data-table-error">{error}</td></tr>
          ) : rows.length === 0 ? (
            <tr><td colSpan={columns.length} className="data-table-state">{emptyText}</td></tr>
          ) : (
            rows.map((row, i) => (
              <tr key={row.id ?? i}>
                {columns.map(col => (
                  <td key={col.key}>
                    {col.render ? col.render(row[col.key], row) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
