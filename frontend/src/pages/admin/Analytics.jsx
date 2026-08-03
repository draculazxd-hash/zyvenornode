import { useQuery } from '@tanstack/react-query'
import {
  TrendingUp,
  Users,
  ShoppingBag,
  DollarSign,
  ArrowUpRight,
  Package,
  Calendar,
  Download,
} from 'lucide-react'
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts'
import LoadingSpinner from '../../components/LoadingSpinner.jsx'
import api from '../../lib/axios.js'
import clsx from 'clsx'

const salesData = [
  { month: 'Jan', revenue: 84000, orders: 420, customers: 180 },
  { month: 'Feb', revenue: 92000, orders: 480, customers: 210 },
  { month: 'Mar', revenue: 108000, orders: 540, customers: 260 },
  { month: 'Apr', revenue: 115000, orders: 610, customers: 290 },
  { month: 'May', revenue: 138000, orders: 720, customers: 340 },
  { month: 'Jun', revenue: 156000, orders: 810, customers: 410 },
  { month: 'Jul', revenue: 142000, orders: 760, customers: 380 },
  { month: 'Aug', revenue: 124000, orders: 680, customers: 340 },
]

const categoryData = [
  { name: 'Ranks', value: 48, color: '#8b5cf6' },
  { name: 'Keys', value: 28, color: '#06b6d4' },
  { name: 'Coins', value: 22, color: '#f59e0b' },
  { name: 'Specials', value: 2, color: '#ec4899' },
]

const topProducts = [
  { name: 'MVP+ Rank', sales: 284, revenue: 426000, growth: 12.4 },
  { name: '100,000 Coins', sales: 512, revenue: 358400, growth: 8.2 },
  { name: 'VIP Rank', sales: 342, revenue: 102200, growth: 5.1 },
  { name: 'MVP Rank', sales: 156, revenue: 139600, growth: 15.7 },
  { name: 'Legendary Keys x3', sales: 196, revenue: 97600, growth: -2.3 },
]

const trafficSources = [
  { name: 'Direct', value: 42, color: '#8b5cf6' },
  { name: 'Discord', value: 28, color: '#06b6d4' },
  { name: 'YouTube', value: 18, color: '#ef4444' },
  { name: 'Twitter/X', value: 8, color: '#64748b' },
  { name: 'Other', value: 4, color: '#f59e0b' },
]

export default function AdminAnalytics() {
  const { isLoading } = useQuery({
    queryKey: ['admin-analytics'],
    queryFn: async () => {
      try {
        const res = await api.get('/admin/analytics')
        return res.data
      } catch {
        return {}
      }
    },
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 animate-slideUp">
        <div>
          <h1 className="font-display font-bold text-2xl sm:text-3xl text-white mb-1">
            Analytics
          </h1>
          <p className="text-sm text-gray-400">
            Track your store performance and growth
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex gap-1 p-1 glass rounded-xl">
            {['7D', '30D', '90D', '1Y'].map((p, i) => (
              <button
                key={p}
                className={clsx(
                  'px-4 py-2 rounded-lg text-sm font-semibold transition-all',
                  i === 1 ? 'bg-gradient-to-r from-primary to-secondary text-white' : 'text-gray-400 hover:text-white'
                )}
              >
                {p}
              </button>
            ))}
          </div>
          <button className="mc-btn-outline px-5 py-2.5 text-sm flex items-center justify-center gap-2 whitespace-nowrap">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="py-20"><LoadingSpinner size="lg" /></div>
      ) : (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Total Revenue', value: '₹9,59,000', change: '+18.4%', up: true, icon: DollarSign, color: 'from-green-500 to-emerald-600' },
              { label: 'Total Orders', value: '5,020', change: '+12.2%', up: true, icon: ShoppingBag, color: 'from-primary to-purple-600' },
              { label: 'New Customers', value: '2,410', change: '+9.8%', up: true, icon: Users, color: 'from-sky-500 to-blue-600' },
              { label: 'Avg Order Value', value: '₹191', change: '+4.1%', up: true, icon: TrendingUp, color: 'from-orange-500 to-amber-600' },
            ].map((s, i) => {
              const Icon = s.icon
              return (
                <div key={s.label} className="mc-card !p-5 animate-slideUp" style={{ animationDelay: `${i * 0.08}s` }}>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center shadow-lg`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <span className={clsx(
                      'text-xs font-bold px-2 py-1 rounded-lg',
                      s.up ? 'bg-green-500/15 text-green-400' : 'bg-red-500/15 text-red-400'
                    )}>
                      {s.change}
                    </span>
                  </div>
                  <p className="font-display font-bold text-2xl sm:text-3xl text-white mb-0.5">{s.value}</p>
                  <p className="text-xs sm:text-sm text-gray-400">{s.label}</p>
                </div>
              )
            })}
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 mc-card !p-5 sm:!p-6 animate-slideUp">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-display font-bold text-lg text-white mb-0.5">Sales Performance</h3>
                  <p className="text-xs text-gray-400">Revenue & orders over time</p>
                </div>
              </div>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="month" stroke="#64748b" fontSize={12} axisLine={false} tickLine={false} />
                    <YAxis stroke="#64748b" fontSize={12} axisLine={false} tickLine={false} />
                    <Tooltip
                      contentStyle={{
                        background: 'rgba(20, 15, 40, 0.95)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: 12,
                        color: '#fff',
                        fontSize: 12,
                      }}
                    />
                    <Legend wrapperStyle={{ fontSize: 12 }} />
                    <Line type="monotone" dataKey="revenue" name="Revenue (₹)" stroke="#8b5cf6" strokeWidth={3} dot={{ r: 4, fill: '#8b5cf6', strokeWidth: 2, stroke: '#0f0a1e' }} />
                    <Line type="monotone" dataKey="orders" name="Orders" stroke="#06b6d4" strokeWidth={3} dot={{ r: 4, fill: '#06b6d4', strokeWidth: 2, stroke: '#0f0a1e' }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="mc-card !p-5 sm:!p-6 animate-slideUp">
              <div className="mb-6">
                <h3 className="font-display font-bold text-lg text-white mb-0.5">Sales by Category</h3>
                <p className="text-xs text-gray-400">Revenue distribution</p>
              </div>
              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {categoryData.map((entry, idx) => (
                        <Cell key={idx} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        background: 'rgba(20, 15, 40, 0.95)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: 12,
                        color: '#fff',
                        fontSize: 12,
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {categoryData.map((c) => (
                  <div key={c.name} className="flex items-center gap-2 text-xs">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: c.color }}></div>
                    <span className="text-gray-300">{c.name}</span>
                    <span className="ml-auto font-bold text-white">{c.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <div className="mc-card !p-5 sm:!p-6 animate-slideUp">
              <div className="mb-6">
                <h3 className="font-display font-bold text-lg text-white mb-0.5">Traffic Sources</h3>
                <p className="text-xs text-gray-400">Where your visitors come from</p>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={trafficSources}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
                    <XAxis dataKey="name" stroke="#64748b" fontSize={12} axisLine={false} tickLine={false} />
                    <YAxis stroke="#64748b" fontSize={12} axisLine={false} tickLine={false} />
                    <Tooltip
                      contentStyle={{
                        background: 'rgba(20, 15, 40, 0.95)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: 12,
                        color: '#fff',
                        fontSize: 12,
                      }}
                      formatter={(v) => [`${v}%`, 'Traffic']}
                    />
                    <Bar dataKey="value" radius={[12, 12, 0, 0]}>
                      {trafficSources.map((entry, idx) => (
                        <Cell key={idx} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="mc-card !p-5 sm:!p-6 animate-slideUp">
              <div className="mb-6">
                <h3 className="font-display font-bold text-lg text-white mb-0.5">Top Products</h3>
                <p className="text-xs text-gray-400">Best performing items</p>
              </div>
              <div className="space-y-3">
                {topProducts.map((p, i) => (
                  <div key={p.name} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center font-bold text-white flex-shrink-0">
                      {i + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <Package className="w-4 h-4 text-gray-500 flex-shrink-0" />
                        <p className="font-semibold text-sm text-white truncate">{p.name}</p>
                      </div>
                      <div className="flex items-center gap-3 text-xs">
                        <span className="text-gray-500">{p.sales} sales</span>
                        <span className="text-white font-semibold">₹{p.revenue.toLocaleString()}</span>
                      </div>
                    </div>
                    <span className={clsx(
                      'flex items-center gap-0.5 text-xs font-bold px-2 py-1 rounded-lg whitespace-nowrap',
                      p.growth >= 0 ? 'bg-green-500/15 text-green-400' : 'bg-red-500/15 text-red-400'
                    )}>
                      <ArrowUpRight className={clsx('w-3 h-3', p.growth < 0 && 'rotate-90')} />
                      {Math.abs(p.growth)}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
