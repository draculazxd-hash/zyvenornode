import { useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  Package,
  FolderTree,
  ShoppingBag,
  Users,
  Settings,
  Palette,
  BarChart3,
  LogOut,
  Menu,
  X,
  Bell,
  Search,
  Gamepad2,
  Shield,
  ChevronRight,
  Home,
} from 'lucide-react'
import { useAuth } from '../../hooks/useAuth.js'
import clsx from 'clsx'

const sidebarItems = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/packages', label: 'Packages', icon: Package },
  { to: '/admin/categories', label: 'Categories', icon: FolderTree },
  { to: '/admin/orders', label: 'Orders', icon: ShoppingBag },
  { to: '/admin/customers', label: 'Customers', icon: Users },
  { to: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
  { to: '/admin/theme', label: 'Theme', icon: Palette },
  { to: '/admin/settings', label: 'Settings', icon: Settings },
]

export default function AdminLayout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <div className="min-h-screen bg-bg flex">
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={clsx(
          'fixed lg:static inset-y-0 left-0 z-50 w-72 glass-strong border-r border-white/10 flex flex-col transform transition-transform duration-300 lg:translate-x-0',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="h-16 lg:h-20 flex items-center justify-between px-5 border-b border-white/10">
          <NavLink to="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center group-hover:scale-110 transition-transform">
              <Gamepad2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-display font-bold text-lg">
                <span className="gradient-text">Zyvenor</span>
                <span className="text-white">MC</span>
              </span>
            </div>
          </NavLink>
          <button
            className="lg:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 space-y-1">
          <div className="px-3 pb-2">
            <p className="text-xs uppercase tracking-wider font-bold text-gray-500">Admin</p>
          </div>
          {sidebarItems.map((item) => {
            const Icon = item.icon
            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  clsx(
                    'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200',
                    isActive
                      ? 'bg-gradient-to-r from-primary/20 to-secondary/10 text-white border border-primary/30 shadow-lg shadow-primary/10'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  )
                }
              >
                <Icon className={clsx('w-5 h-5 flex-shrink-0')} />
                <span className="flex-1">{item.label}</span>
                {item.to === '/admin/orders' && (
                  <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-red-500/20 text-red-400">
                    12
                  </span>
                )}
              </NavLink>
            )
          })}
        </div>

        <div className="mt-auto p-4 space-y-2 border-t border-white/10">
          <NavLink
            to="/"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-all"
            onClick={() => setSidebarOpen(false)}
          >
            <Home className="w-5 h-5 flex-shrink-0" />
            <span>View Storefront</span>
            <ChevronRight className="w-4 h-4 ml-auto" />
          </NavLink>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 lg:h-20 glass-strong border-b border-white/10 sticky top-0 z-30">
          <div className="h-full px-4 lg:px-8 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-all"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div className="relative hidden sm:block w-72 lg:w-96">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search orders, customers, packages..."
                  className="mc-input pl-11 py-2.5 text-sm"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <button className="relative p-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-all">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500"></span>
              </button>
              <div className="h-8 w-px bg-white/10 hidden sm:block"></div>
              <div className="flex items-center gap-3 pl-1 sm:pl-2">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/30">
                  <Shield className="w-4.5 h-4.5 text-white" />
                </div>
                <div className="hidden sm:block min-w-0">
                  <p className="text-sm font-semibold text-white truncate">
                    {user?.name || 'Admin User'}
                  </p>
                  <p className="text-xs text-gray-500 truncate capitalize">
                    {user?.role || 'Administrator'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
