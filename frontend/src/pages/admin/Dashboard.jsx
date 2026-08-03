import { useQuery } from '@tanstack/react-query'
import {
  TrendingUp,
  ShoppingBag,
  Users,
  Package as PackageIcon,
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  Activity,
} from 'lucide-react'
import LoadingSpinner from '../../components/LoadingSpinner.jsx'
import api from '../../lib/axios.js'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
} from 'recharts'
import clsx from 'clsx'

const mockStats = [
  { label: 'Total Revenue', value: '₹1,24,500', change: '+12.5%', up: true, icon: DollarSign, color: 'from-green-500 to-emerald-600' },
  { label: 'Total Orders', value: '1,284', change: '+8.2%', up: true, icon: ShoppingBag, color: 'from-primary to-purple-600' },
  { label: 'Customers', value: '3,420', change: '+5.1%', up: true, icon: Users, color: 'from-sky-500 to-blue-600' },
  { label: 'Active Packages', value: '42', change: '-2.3%', up: false, icon: PackageIcon, color: 'from-orange-500 to-amber-600' },
]

const mockRevenue = [
  { name: 'Mon', revenue: 12000, orders: 12 },
  { name: 'Tue', revenue: 15000, orders: 18 },
  { name: 'Wed', revenue: 18000, orders: 22 },
  { name: 'Thu', revenue: 22000, orders: 25 },
  { name: 'Fri', revenue: 28000, orders: 31 },
  { name: 'Sat', revenue: 32000, orders: 38 },
  { name: 'Sun', revenue: 24000, orders: 28 },
]

const mockTopPackages = [
  { name: 'MVP+ Rank', sales: 284, revenue: 426000 },
  { name: '100k Coins', sales: 512, revenue: 358400 },
  { name: 'Legendary Keys x3', sales: 196, revenue: 97600 },
  { name: 'VIP Rank', sales: 342, revenue: 102200 },
  { name: 'MVP Rank', sales: 156, revenue: 139600 },
]

const mockRecentOrders = [
  { id: 'ORD-10420', customer: 'SteveGamer', email: 'steve@example.com', package: 'MVP+ Rank', amount: 1499, status: 'completed' },
  { id: 'ORD-10419', customer: 'Alex_Pro', email: 'alex@example.com', package: '100,000 Coins', amount: 699, status: 'completed' },
  { id: 'ORD-10418', customer: 'CreeperKing', email: 'creeper@example.com', package: 'Legendary Keys x3', amount: 499, status: 'pending' },
  { id: 'ORD-10417', customer: 'DiamondMine', email: 'diamond@example.com', package: 'VIP Rank', amount: 299, status: 'completed' },
  { id: 'ORD-10416', customer: 'EnderDragon', email: 'ender@example.com', package: 'ELITE Rank', amount: 2499, status: 'failed' },
]

export default function AdminDashboard() {
  const { isLoading } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: async () => {
      try {
        const res = await api.get('/admin/stats')
        return res.data
      } catch {
        return {}
      }
    },
  })

  return (
    <div className="space-y-6 lg:space-y-8">
      <div className="animate-slideUp">
        <h1 className="font-display font-bold text-2xl sm:text-3xl text-white mb-1">
          Dashboard
        </h1>
        <p className="text-sm text-gray-400">
          Welcome back! Here's what's happening with your store today.
        </p>
      </div>

      {isLoading ? (
        <div className="py-20"><LoadingSpinner size="lg" /></div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {mockStats.map((s, i) => {
              const Icon = s.icon
              return (
                <div
                  key={s.label}
                  className="mc-card !p-5 animate-slideUp"
                  style={{ animationDelay: `${i * 0.08}s` }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center shadow-lg`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className={clsx(
                      'flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold',
                      s.up ? 'bg-green-500/15 text-green-400' : 'bg-red-500/15 text-red-400'
                    )}>
                      {s.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                      {s.change}
                    </div>
                  </div>
                  <p className="font-display font-bold text-2xl sm:text-3xl text-white mb-0.5">{s.value}</p>
                  <p className="text-sm text-gray-400">{s.label}</p>
                </div>
              )
            })}
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 mc-card !p-5 sm:!p-6 animate-slideUp">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-display font-bold text-lg text-white mb-0.5">Revenue Overview</h3>
                  <p className="text-xs text-gray-400">Last 7 days</p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 text-xs text-gray-300">
                  <Activity className="w-3.5 h-3.5 text-green-400" />
                  Live
                </div>
              </div>
              <div className="h-64 sm:h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={mockRevenue}>
                    <defs>
                      <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
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
                      formatter={(val) => [`₹${val.toLocaleString()}`, 'Revenue']}
                    />
                    <Area type="monotone" dataKey="revenue" stroke="#8b5cf6" strokeWidth={2.5} fill="url(#rev)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="mc-card !p-5 sm:!p-6 animate-slideUp">
              <div className="mb-6">
                <h3 className="font-display font-bold text-lg text-white mb-0.5">Top Packages</h3>
                <p className="text-xs text-gray-400">Best sellers</p>
              </div>
              <div className="h-64 sm:h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={mockTopPackages} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
                    <XAxis type="number" stroke="#64748b" fontSize={10} axisLine={false} tickLine={false} />
                    <YAxis type="category" dataKey="name" stroke="#64748b" fontSize={10} axisLine={false} tickLine={false} width={80} />
                    <Tooltip
                      contentStyle={{
                        background: 'rgba(20, 15, 40, 0.95)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: 12,
                        color: '#fff',
                        fontSize: 12,
                      }}
                    />
                    <Bar dataKey="sales" fill="#06b6d4" radius={[0, 8, 8, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="mc-card !p-5 sm:!p-6 animate-slideUp">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-display font-bold text-lg text-white mb-0.5">Recent Orders</h3>
                <p className="text-xs text-gray-400">Latest transactions</p>
              </div>
              <button className="text-sm font-semibold text-primary hover:text-secondary transition-colors flex items-center gap-1">
                View all <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>

            <div className="overflow-x-auto -mx-5 sm:-mx-6 px-5 sm:px-6">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr className="text-left text-xs uppercase tracking-wider font-bold text-gray-500 border-b border-white/10">
                    <th className="py-3 pr-4">Order</th>
                    <th className="py-3 pr-4">Customer</th>
                    <th className="py-3 pr-4">Package</th>
                    <th className="py-3 pr-4">Amount</th>
                    <th className="py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {mockRecentOrders.map((o) => (
                    <tr key={o.id} className="text-sm hover:bg-white/[0.02]">
                      <td className="py-3.5 pr-4">
                        <span className="font-mono font-semibold text-white">{o.id}</span>
                      </td>
                      <td className="py-3.5 pr-4">
                        <div>
                          <p className="font-medium text-white">{o.customer}</p>
                          <p className="text-xs text-gray-500">{o.email}</p>
                        </div>
                      </td>
                      <td className="py-3.5 pr-4 text-gray-300">{o.package}</td>
                      <td className="py-3.5 pr-4">
                        <span className="font-semibold text-white">₹{o.amount.toLocaleString()}</span>
                      </td>
                      <td className="py-3.5">
                        <span className={clsx(
                          'px-2.5 py-1 rounded-full text-xs font-bold',
                          o.status === 'completed' && 'bg-green-500/15 text-green-400',
                          o.status === 'pending' && 'bg-yellow-500/15 text-yellow-400',
                          o.status === 'failed' && 'bg-red-500/15 text-red-400'
                        )}>
                          {o.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
