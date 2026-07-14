import './Header.css'

export default function Header() {
  return (
    <header className="app-header">
      <div className="header-left">
        <div className="logo">Ruyi Gin React Admin</div>
      </div>
      <div className="header-right">
        <div className="user-info">
          <span className="username">Admin</span>
          <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Ccircle cx='12' cy='8' r='4' fill='%231890ff'/%3E%3Cpath d='M12 14c-6 0-8 3-8 3v6h16v-6s-2-3-8-3z' fill='%231890ff'/%3E%3C/svg%3E" alt="avatar" className="avatar" />
        </div>
      </div>
    </header>
  )
}
