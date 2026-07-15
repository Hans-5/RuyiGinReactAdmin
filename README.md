# RuyiGinReactAdmin

> A reusable React + Vite admin dashboard template with glassmorphism design, full CRUD patterns, and a clean mock-to-real-API seam.

---

## English

### Introduction

RuyiGinReactAdmin is a frontend-only admin management template built with React 18 and Vite. It ships with a complete set of admin UI patterns — data tables, CRUD modals, search and filter bars, pagination, forms, analytics charts, and a settings panel — all wired to a mock data layer that can be swapped for a real backend by flipping one environment variable.

The template is designed to be handed to secondary developers as a starting point. Navigation, branding, and page routes are all config-driven. No UI library dependencies.

---

### Features

- **Glassmorphism UI** — frosted glass cards, aurora gradient background, 3D hover effects
- **Full CRUD patterns** — create / read / update / delete with loading, error, and empty states demonstrated on every list page
- **Config-driven navigation** — add or rename menu items in `config/navigation.js`, no component edits needed
- **Mock → real API seam** — set `VITE_USE_MOCK=false` and point `VITE_API_BASE` at a backend; all pages work unchanged
- **App identity config** — title, short name, version, and primary color in `config/app.js`
- **Reusable component library** — `Card`, `StatCard`, `Badge`, `DataTable`, `FormModal`, `Pagination`, `SearchBar`, `PageHeader`
- **React Router v6 nested layouts** — `AdminLayout` is a layout route; adding a page is one `<Route>` entry in `App.jsx`
- **Feature hooks pattern** — each page has a dedicated hook (`useUsers`, `useRoles`, `useArticles`, …) that owns all state and API calls

---

### Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 |
| Build tool | Vite 5 |
| Routing | React Router DOM v6 |
| Styling | Pure CSS (CSS variables, no UI library) |
| Data | Mock layer with in-memory CRUD state |

---

### Architecture Overview

```
Page component
    │  calls
    ▼
Feature hook  (useUsers / useRoles / useArticles / …)
    │  calls
    ▼
apiClient.js  (single mock/real toggle)
    │  reads/writes
    ▼
mockData.js   (in-memory state, replace with real API)
```

Every page follows this pattern. Switching to a real backend only requires changes to `apiClient.js`.

---

### Project Structure

```
frontend/src/
├── api/
│   └── apiClient.js          GET / POST / PUT / DELETE, mock/real toggle
├── assets/
│   ├── forms.css             Shared form field styles
│   ├── tables.css            Shared table styles
│   └── theme.css             CSS design tokens
├── components/
│   ├── Common/
│   │   ├── Badge.jsx         Status indicator
│   │   ├── Card.jsx          Glassmorphic container
│   │   ├── DataTable.jsx     Config-driven table with states
│   │   ├── FormModal.jsx     Modal with confirm/cancel
│   │   ├── PageHeader.jsx    Title + subtitle + action slot
│   │   ├── Pagination.jsx    Page controls
│   │   ├── SearchBar.jsx     Search + filter dropdowns
│   │   └── StatCard.jsx      KPI metric card
│   ├── Header.jsx            Top bar (reads from config/app.js)
│   ├── Sidebar.jsx           Config-driven navigation
│   └── MainContent.jsx       Content area wrapper
├── config/
│   ├── app.js                App identity (name, version, color)
│   ├── mockData.js           All mock generators + in-memory CRUD
│   ├── navigation.js         Sidebar menu structure
│   └── *Constants.js         Domain enums per feature
├── hooks/
│   ├── index.js              Barrel export
│   ├── useApiData.js         Generic data loader
│   ├── useMenu.js            Sidebar expand/collapse + URL sync
│   ├── useUsers.js           User Management state + CRUD
│   ├── useRoles.js           Role Management state + CRUD
│   ├── useArticles.js        Article Management state + CRUD
│   ├── useCategories.js      Categories state + CRUD
│   └── useTags.js            Tags state + CRUD
├── layouts/
│   └── AdminLayout.jsx       Layout route: Header + Sidebar + Outlet
├── pages/
│   ├── Dashboard.jsx         KPI cards, bar chart, activity feed, table
│   ├── SystemUsers.jsx       User CRUD — search, filter, pagination, modals
│   ├── SystemRoles.jsx       Role CRUD — permission checkbox form
│   ├── ContentArticles.jsx   Article CRUD — status badges, category filter
│   ├── ContentCategories.jsx Category CRUD
│   ├── ContentTags.jsx       Tag CRUD
│   ├── Analytics.jsx         Traffic charts, device breakdown, top pages
│   ├── Settings.jsx          Tabbed settings form
│   └── NotFound.jsx          404 catch-all
├── App.jsx                   Route tree (nested layout routes)
├── App.css                   Global resets + animations
└── main.jsx                  BrowserRouter entry point
```

---

### Getting Started

```bash
cd frontend
npm install
npm run dev
```

Opens at `http://localhost:5173/`

---

### Development Commands

```bash
npm run dev       # Start dev server with HMR
npm run build     # Production build → dist/
npm run preview   # Preview production build locally
```

---

### Configuration

**`frontend/.env.example`** — copy to `.env.local` to override defaults:

```bash
# Use mock data (default) or real backend
VITE_USE_MOCK=true

# Backend base URL (only used when VITE_USE_MOCK=false)
VITE_API_BASE=http://localhost:8080/api
```

**`frontend/src/config/app.js`** — app identity:

```js
export const appConfig = {
  name: 'Ruyi Gin React Admin',
  shortName: 'Ruyi Admin',
  version: '0.2.0',
  defaultUser: 'Admin',
  primaryColor: '#1890ff',
}
```

**`frontend/src/config/navigation.js`** — sidebar menu structure (add items here, no component edits needed).

**Production deployment** — `BrowserRouter` requires a server-side 404 fallback. Nginx example:
```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```
For static hosting without server config, swap `BrowserRouter` for `HashRouter` in `main.jsx`.

---

### Future Improvements

- [ ] Go/Gin backend — `apiClient.js` seam is ready; flip `VITE_USE_MOCK=false`
- [ ] Authentication — login page + protected routes
- [ ] Dark mode — CSS variable structure already supports theme switching
- [ ] Internationalization (i18n)
- [ ] Mobile-responsive sidebar
- [ ] Form validation with error messages
- [ ] E2E tests (Playwright)

---

---

## 中文

### 项目简介

RuyiGinReactAdmin 是一个基于 React 18 + Vite 构建的前端管理系统模板。项目内置完整的管理后台 UI 模式——数据表格、CRUD 弹窗、搜索过滤、分页、表单、数据分析图表和设置页面，所有数据通过一个 Mock 层提供，只需修改一个环境变量即可切换到真实后端。

模板设计目标是作为二次开发的起点：导航菜单、品牌信息和页面路由均通过配置文件驱动，无需修改组件代码。不依赖任何第三方 UI 组件库。

---

### 功能特点

- **玻璃拟态 UI** — 磨砂玻璃卡片、极光渐变背景、3D 悬停效果
- **完整 CRUD 模式** — 增删改查，包含加载中、错误、空状态的完整演示
- **配置驱动导航** — 在 `config/navigation.js` 中添加或修改菜单项，无需改组件
- **Mock 转真实 API** — 设置 `VITE_USE_MOCK=false` 并配置 `VITE_API_BASE`，所有页面无需修改即可接入真实后端
- **应用配置层** — 名称、版本、主色等应用标识统一在 `config/app.js` 管理
- **可复用组件库** — `Card`、`StatCard`、`Badge`、`DataTable`、`FormModal`、`Pagination`、`SearchBar`、`PageHeader`
- **React Router v6 嵌套布局** — `AdminLayout` 作为布局路由，新增页面只需在 `App.jsx` 添加一行 `<Route>`
- **功能 Hook 模式** — 每个页面有独立的 Hook（`useUsers`、`useRoles`、`useArticles`…）管理全部状态和 API 调用

---

### 技术栈

| 层级 | 技术 |
|---|---|
| 框架 | React 18 |
| 构建工具 | Vite 5 |
| 路由 | React Router DOM v6 |
| 样式 | 纯 CSS（CSS 变量，无 UI 库） |
| 数据 | Mock 层（内存 CRUD 状态） |

---

### 架构说明

```
页面组件
    │  调用
    ▼
功能 Hook（useUsers / useRoles / useArticles / …）
    │  调用
    ▼
apiClient.js（统一的 Mock/真实 切换层）
    │  读写
    ▼
mockData.js（内存状态，替换为真实 API 即可）
```

所有页面遵循相同模式。切换到真实后端只需修改 `apiClient.js`。

---

### 项目结构

```
frontend/src/
├── api/apiClient.js          GET/POST/PUT/DELETE，Mock/真实 切换
├── assets/                   共享 CSS（表单、表格、主题变量）
├── components/Common/        通用组件库（Badge、Card、DataTable 等）
├── components/               布局组件（Header、Sidebar、MainContent）
├── config/
│   ├── app.js                应用标识配置
│   ├── mockData.js           Mock 数据生成器 + 内存 CRUD 状态
│   ├── navigation.js         侧边栏菜单结构
│   └── *Constants.js         各功能模块的枚举常量
├── hooks/                    功能 Hook（useUsers、useRoles、useArticles 等）
├── layouts/AdminLayout.jsx   布局路由：Header + Sidebar + Outlet
├── pages/                    所有页面组件
├── App.jsx                   路由树（嵌套布局路由）
└── main.jsx                  入口文件（BrowserRouter）
```

---

### 安装运行

```bash
cd frontend
npm install
npm run dev
```

访问 `http://localhost:5173/`

---

### 开发命令

```bash
npm run dev       # 启动开发服务器（热重载）
npm run build     # 生产构建 → dist/
npm run preview   # 本地预览生产构建结果
```

---

### 配置说明

**环境变量**（复制 `frontend/.env.example` 为 `.env.local`）：

```bash
VITE_USE_MOCK=true                            # true = Mock 数据，false = 真实后端
VITE_API_BASE=http://localhost:8080/api       # 真实后端地址（VITE_USE_MOCK=false 时生效）
```

**应用配置** `frontend/src/config/app.js`：

```js
export const appConfig = {
  name: 'Ruyi Gin React Admin',   // 显示在 Header 的应用名称
  version: '0.2.0',
  defaultUser: 'Admin',
  primaryColor: '#1890ff',
}
```

**生产部署**：使用 `BrowserRouter` 需要服务端配置 404 回退至 `index.html`（参见 `.env.example` 中的 Nginx 示例）。

---

### 后续规划

- [ ] Go/Gin 后端接入（`apiClient.js` 接口已预留）
- [ ] 用户认证（登录页 + 路由守卫）
- [ ] 深色模式（CSS 变量结构已支持主题切换）
- [ ] 国际化 i18n
- [ ] 移动端响应式侧边栏
- [ ] 表单验证与错误提示
- [ ] E2E 测试（Playwright）

---

**Built with React + Vite · AI-driven development**
