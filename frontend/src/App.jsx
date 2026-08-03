import { Routes, Route, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import Home from './pages/Home.jsx'
import Ranks from './pages/Ranks.jsx'
import Keys from './pages/Keys.jsx'
import Coins from './pages/Coins.jsx'
import Store from './pages/Store.jsx'
import Cart from './pages/Cart.jsx'
import Checkout from './pages/Checkout.jsx'
import Success from './pages/Success.jsx'
import Cancel from './pages/Cancel.jsx'
import Support from './pages/Support.jsx'
import Login from './pages/Login.jsx'
import AdminLayout from './pages/admin/AdminLayout.jsx'
import AdminDashboard from './pages/admin/Dashboard.jsx'
import AdminPackages from './pages/admin/Packages.jsx'
import AdminCategories from './pages/admin/Categories.jsx'
import AdminOrders from './pages/admin/Orders.jsx'
import AdminCustomers from './pages/admin/Customers.jsx'
import AdminSettings from './pages/admin/Settings.jsx'
import AdminTheme from './pages/admin/Theme.jsx'
import AdminAnalytics from './pages/admin/Analytics.jsx'
import api from './lib/axios.js'

function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const res = await api.get('/settings')
        const settings = res.data.data

        const root = document.documentElement
        root.style.setProperty('--primary', settings.primaryColor || '#8b5cf6')
        root.style.setProperty('--secondary', settings.secondaryColor || '#06b6d4')
        root.style.setProperty('--bg', settings.bgColor || '#0f0a1e')
        root.style.setProperty('--card-bg', settings.cardBgColor || 'rgba(30, 20, 60, 0.7)')
        root.style.setProperty('--text', settings.textColor || '#e2e8f0')
        root.style.setProperty('--border-radius', settings.borderRadius || '16px')
      } catch (e) {
        const root = document.documentElement
        root.style.setProperty('--primary', '#8b5cf6')
        root.style.setProperty('--secondary', '#06b6d4')
        root.style.setProperty('--bg', '#0f0a1e')
        root.style.setProperty('--card-bg', 'rgba(30, 20, 60, 0.7)')
        root.style.setProperty('--text', '#e2e8f0')
        root.style.setProperty('--border-radius', '16px')
      } finally {
        setLoading(false)
      }
    }
    loadSettings()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-bg text-text flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ranks" element={<Ranks />} />
          <Route path="/keys" element={<Keys />} />
          <Route path="/coins" element={<Coins />} />
          <Route path="/store" element={<Store />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/success" element={<Success />} />
          <Route path="/cancel" element={<Cancel />} />
          <Route path="/support" element={<Support />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="packages" element={<AdminPackages />} />
            <Route path="categories" element={<AdminCategories />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="customers" element={<AdminCustomers />} />
            <Route path="settings" element={<AdminSettings />} />
            <Route path="theme" element={<AdminTheme />} />
            <Route path="analytics" element={<AdminAnalytics />} />
          </Route>
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
