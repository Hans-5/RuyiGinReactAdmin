import { useState } from 'react'
import PageHeader from '../components/Common/PageHeader'
import Card from '../components/Common/Card'
import { appConfig } from '../config/app'
import './Settings.css'

const TIMEZONES = ['UTC', 'Asia/Shanghai', 'America/New_York', 'Europe/London', 'Asia/Tokyo']
const LANGUAGES = [{ value: 'en', label: 'English' }, { value: 'zh', label: '中文' }]
const PER_PAGE  = [10, 20, 50]

const DEFAULTS = {
  appName:     appConfig.name,
  timezone:    'Asia/Shanghai',
  language:    'en',
  pageSize:    '10',
  primaryColor: appConfig.primaryColor,
  emailNotify: true,
  systemNotify: true,
}

export default function Settings() {
  const [form,    setForm]    = useState(DEFAULTS)
  const [saved,   setSaved]   = useState(false)
  const [section, setSection] = useState('general')

  const set = (key) => (e) => {
    const val = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setForm(f => ({ ...f, [key]: val }))
    setSaved(false)
  }

  const handleSave = () => {
    // In production this would call putData('/settings', form)
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  const tabs = [
    { id: 'general',       label: 'General' },
    { id: 'appearance',    label: 'Appearance' },
    { id: 'notifications', label: 'Notifications' },
  ]

  return (
    <div className="settings-page">
      <PageHeader title="Settings" subtitle="Configure application preferences." />

      <div className="settings-layout">
        {/* Tab nav */}
        <nav className="settings-nav">
          {tabs.map(t => (
            <button
              key={t.id}
              className={`settings-nav-item ${section === t.id ? 'active' : ''}`}
              onClick={() => setSection(t.id)}
            >{t.label}</button>
          ))}
        </nav>

        {/* Panels */}
        <div className="settings-content">
          {section === 'general' && (
            <Card title="General Settings">
              <div className="settings-form">
                <div className="form-field">
                  <label>Application Name</label>
                  <input value={form.appName} onChange={set('appName')} />
                </div>
                <div className="form-row">
                  <div className="form-field">
                    <label>Timezone</label>
                    <select value={form.timezone} onChange={set('timezone')}>
                      {TIMEZONES.map(tz => <option key={tz} value={tz}>{tz}</option>)}
                    </select>
                  </div>
                  <div className="form-field">
                    <label>Language</label>
                    <select value={form.language} onChange={set('language')}>
                      {LANGUAGES.map(l => <option key={l.value} value={l.value}>{l.label}</option>)}
                    </select>
                  </div>
                </div>
                <div className="form-field">
                  <label>Default Page Size</label>
                  <select value={form.pageSize} onChange={set('pageSize')}>
                    {PER_PAGE.map(n => <option key={n} value={n}>{n} per page</option>)}
                  </select>
                </div>
              </div>
            </Card>
          )}

          {section === 'appearance' && (
            <Card title="Appearance">
              <div className="settings-form">
                <div className="form-field">
                  <label>Primary Color</label>
                  <div className="color-field">
                    <input type="color" value={form.primaryColor} onChange={set('primaryColor')}
                      className="color-input" />
                    <input type="text" value={form.primaryColor} onChange={set('primaryColor')}
                      placeholder="#1890ff" className="color-text" />
                  </div>
                  <span className="form-hint">
                    Note: Changes here are preview only. To apply globally, update <code>--primary-color</code> in <code>assets/theme.css</code>.
                  </span>
                </div>
              </div>
            </Card>
          )}

          {section === 'notifications' && (
            <Card title="Notifications">
              <div className="settings-form">
                <label className="toggle-field">
                  <input type="checkbox" checked={form.emailNotify} onChange={set('emailNotify')} />
                  <span>Email notifications</span>
                </label>
                <label className="toggle-field">
                  <input type="checkbox" checked={form.systemNotify} onChange={set('systemNotify')} />
                  <span>System alerts</span>
                </label>
              </div>
            </Card>
          )}

          <div className="settings-actions">
            <button className="btn btn-primary" onClick={handleSave}>Save Changes</button>
            {saved && <span className="save-feedback">✓ Saved</span>}
          </div>
        </div>
      </div>
    </div>
  )
}
