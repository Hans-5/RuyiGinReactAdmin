# Ruyi Gin React Admin - Universal Template

A modern, component-based admin management system built with React and Gin framework. Featuring glassmorphism design, 3D animations, and reusable components for rapid development.

**Language:** 中文: 使用Gin框架和React框架开发的前后端分离的纯AI驱动的现代管理系统

---

## 📍 Current Status

**Phase 1 complete — frontend routing scaffold.**

| Area | Status |
|---|---|
| React frontend (Vite) | ✅ Running |
| Client-side routing (React Router v6) | ✅ All 5 routes wired |
| Dashboard page | ✅ Full implementation with mock data |
| System / Content / Analytics / Settings | 🚧 Navigable stubs |
| Mock → real API toggle | ✅ Ready (`VITE_USE_MOCK=false`) |
| Go/Gin backend | ⬜ Not started |
| Authentication | ⬜ Not started |

---

## 🎨 Design Features

- **Glassmorphism UI**: Modern frosted glass effect with backdrop blur
- **3D Animations**: Smooth 3D transforms and micro-interactions
- **Gradient Backgrounds**: Dynamic multi-directional gradients
- **Tech-Savvy Theme**: "Ruyi Guofeng Tech Blue" color scheme
- **Responsive Layout**: Fixed header (64px), fixed sidebar (256px), adaptive content

---

## 📦 Project Structure

```
RuyiGinReactAdmin/
├── frontend/                 # React frontend
│   ├── src/
│   │   ├── api/
│   │   │   └── apiClient.js             # Mock/real API toggle (VITE_USE_MOCK)
│   │   ├── components/
│   │   │   ├── Common/
│   │   │   │   ├── Card.jsx             # Reusable glass card
│   │   │   │   ├── StatCard.jsx         # KPI metrics card
│   │   │   │   └── Badge.jsx            # Status badge
│   │   │   ├── Header.jsx               # Top header with gradient
│   │   │   ├── Sidebar.jsx              # Left navigation menu
│   │   │   └── MainContent.jsx          # Content area wrapper
│   │   ├── config/
│   │   │   ├── navigation.js            # Sidebar menu structure
│   │   │   └── mockData.js              # Mock data generators
│   │   ├── hooks/
│   │   │   └── useCommon.js             # useMenu + useApiData
│   │   ├── layouts/
│   │   │   └── AdminLayout.jsx          # Header + Sidebar + Content wrapper
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx            # Dashboard (full implementation)
│   │   │   ├── System.jsx               # System Management (stub)
│   │   │   ├── Content.jsx              # Content Management (stub)
│   │   │   ├── Analytics.jsx            # Analytics (stub)
│   │   │   ├── Settings.jsx             # Settings (stub)
│   │   │   └── StubPage.css             # Shared stub page styles
│   │   ├── App.jsx                      # Routes + AdminLayout composition
│   │   ├── App.css                      # Global styles + theme vars
│   │   └── main.jsx                     # Entry point (BrowserRouter)
│   ├── .env.example                     # Environment variable reference
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
├── DESIGN_OPTIMIZATION_PLAN.md
├── COMPONENTIZATION_PLAN.md
└── README.md
```

---

## 🚀 Quick Start

### Setup Frontend

```bash
cd frontend
npm install
npm run dev
```

Opens at `http://localhost:5173/`

### Build for Production

```bash
npm run build
```

Outputs to `frontend/dist/`

---

## 🧩 Using Reusable Components

### Card Component
Base container for any card-like content with glassmorphism.

```jsx
import Card from './components/Common/Card'

<Card title="My Card">
  <p>Card content goes here</p>
</Card>
```

### StatCard Component
Display KPI metrics with icon, value, and change indicator.

```jsx
import StatCard from './components/Common/StatCard'

<StatCard
  icon="📊"
  title="Total Users"
  value="12,548"
  change="+12%"
  color="#1890ff"
/>
```

### Badge Component
Status indicator with multiple variants.

```jsx
import Badge from './components/Common/Badge'

<Badge variant="success" size="md">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="error">Error</Badge>
```

---

## 🎨 Theme System

All design tokens are CSS variables in `frontend/src/App.css`:

```css
:root {
  --primary-color: #1890ff;
  --secondary-color: #13c2c2;
  --accent-color: #faad14;
  --glass-bg: rgba(255, 255, 255, 0.08);
  --shadow-lg: 0 12px 32px rgba(0, 0, 0, 0.12);
  --transition-normal: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
```

Customize by editing these variables.

---

## 📐 Layout Structure

```
┌─────────────────────────────────────────────────┐
│              Header (Fixed: 64px)               │
│           Gradient Blue → Cyan                  │
├────────────┬──────────────────────────────────┤
│            │                                   │
│  Sidebar   │       Main Content Area          │
│  (Fixed:   │      (Scrollable)                │
│  256px)    │                                   │
│            │  • Dashboard                     │
│  ├─ 📊 Dashboard  • Stats Cards                │
│  ├─ ⚙️ System   │ • Charts & Graphs           │
│  ├─ 📝 Content │ • Tables & Data              │
│  ├─ 📈 Analytics │                           │
│  └─ 🔧 Settings │                           │
│            │                                   │
└────────────┴──────────────────────────────────┘
```

---

## 🔧 Creating a New Page

1. Create page file in `frontend/src/pages/`:
```jsx
export default function MyPage() {
  return (
    <div className="my-page">
      <h1>My Page</h1>
      {/* Use reusable components */}
    </div>
  )
}
```

2. Import in `App.jsx` and add route

3. Use existing components: `Card`, `StatCard`, `Badge`

4. Styling follows the glassmorphism pattern

---

## 📚 Component API Reference

### Card Props
```jsx
<Card
  title="Optional Title"
  action={<button>Action</button>}
  elevation="md"  // sm, md, lg, xl
  onClick={() => {}}
  className="custom-class"
>
  Content
</Card>
```

### StatCard Props
```jsx
<StatCard
  icon="emoji or icon"
  title="Metric Name"
  value="123,456"
  change="+12%"
  color="#1890ff"
  trend="up"  // or "down"
  onClick={() => {}}
/>
```

### Badge Props
```jsx
<Badge
  variant="default"  // success, warning, error, info
  size="md"          // sm, md, lg
  className="custom"
>
  Text
</Badge>
```

---

## 🎯 Template for Secondary Development

When reusing this template for a new project:

1. **Copy the frontend folder** to your new project
2. **Update navigation** in `src/config/navigation.js` with your menu items
3. **Replace mock data** in `src/config/mockData.js` with your data shape, then set `VITE_USE_MOCK=false` and point `VITE_API_BASE` at your backend
4. **Create new pages** using existing components, add routes in `App.jsx`
5. **Customize colors** in `App.css` CSS variables
6. **Build your backend** (Gin or any other) to match the API endpoints in `src/api/apiClient.js`

---

## 🔄 Mock / Real API

All data flows through `src/api/apiClient.js`. By default it calls mock generators in `src/config/mockData.js`. To switch to a real backend, set environment variables in `.env.local`:

```bash
VITE_USE_MOCK=false
VITE_API_BASE=http://localhost:8080/api
```

Pages and hooks need no changes — `useApiData('/dashboard/stats')` works the same way either side of the toggle.

```jsx
// Any page — works with mock or real backend
import { useApiData } from '../hooks/useCommon'

const { data: stats, loading } = useApiData('/dashboard/stats')
```

---

## 📦 Dependencies

- **React**: 18.2.0
- **React Router DOM**: 6.30.4 (client-side routing)
- **Vite**: 5.4.21 (build tool)
- **No UI libraries**: all components built from scratch for maximum customization

---

## 🎓 Best Practices for Secondary Development

✅ **Do:**
- Use existing `Card`, `StatCard`, `Badge` components
- Follow the CSS variable theme system
- Keep animations consistent with `--transition-*` variables
- Use glassmorphism for new card-like elements

❌ **Don't:**
- Import external component libraries (defeats the purpose)
- Add inline styles (use CSS classes instead)
- Create non-reusable one-off components
- Modify core layout structure

---

## 🚢 Deployment

### Frontend
```bash
cd frontend
npm run build
# Deploy dist/ folder to your hosting
```

### Backend
```bash
cd backend
# Build and deploy Gin application
```

---

## 📄 Documentation Files

- `DESIGN_OPTIMIZATION_PLAN.md` - Modern UI design decisions
- `COMPONENTIZATION_PLAN.md` - Component architecture strategy
- `frontend/src/App.css` - Theme variables & global animations

---

## 📝 License

MIT

---

## 🤝 Contributing

This template is designed for rapid secondary development. When adding new features:

1. Extract reusable components
2. Add to `components/Common/` for others to use
3. Document component props and usage
4. Update CSS variables for consistency

---

## 💡 Future Enhancements

- [ ] Dark mode support
- [ ] Internationalization (i18n)
- [ ] Advanced data table with sorting/filtering
- [ ] More chart types (Line, Pie, Heatmap)
- [ ] Form builder components
- [ ] Authentication system
- [ ] Backend API integration guide

---

**Built with ❤️ using React + Vite + AI-driven development**

