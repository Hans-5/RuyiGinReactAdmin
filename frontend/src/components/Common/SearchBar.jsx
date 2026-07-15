import './SearchBar.css'

/**
 * SearchBar — keyword input + optional select filters.
 *
 * filters: [{ key, label, options: [{value, label}] }]
 * values:  { [key]: string }
 * onChange: (patch) => void
 */
export default function SearchBar({ placeholder = 'Search…', filters = [], values = {}, onChange }) {
  return (
    <div className="search-bar">
      <div className="search-input-wrap">
        <span className="search-icon">🔍</span>
        <input
          className="search-input"
          type="text"
          placeholder={placeholder}
          value={values.search ?? ''}
          onChange={e => onChange({ search: e.target.value })}
        />
        {values.search && (
          <button className="search-clear" onClick={() => onChange({ search: '' })}>✕</button>
        )}
      </div>
      {filters.map(f => (
        <select
          key={f.key}
          className="search-select"
          value={values[f.key] ?? ''}
          onChange={e => onChange({ [f.key]: e.target.value })}
        >
          <option value="">{f.label}</option>
          {f.options.map(o => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      ))}
    </div>
  )
}
