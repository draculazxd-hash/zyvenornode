import { Search, Eye, Download, CheckCircle, Clock, XCircle, Filter } from 'lucide-react'
import clsx from 'clsx'

const mockOrders = [
  { id: 'ORD-10420', date: '2024-08-03', customer: 'SteveGamer', email: 'steve@example.com', items: ['MVP+ Rank'], amount: 1499, status: 'completed', method: 'razorpay' },
  { id: 'ORD-10419', date: '2024-08-03', customer: 'Alex_Pro', email: 'alex@example.com', items: ['100,000 Coins'], amount: 699, status: 'completed', method: 'stripe' },
  { id: 'ORD-10418', date: '2024-08-02', customer: 'CreeperKing', email: 'creeper@example.com', items: ['Legendary Keys x3'], amount: 499, status: 'pending', method: 'razorpay' },
  { id: 'ORD-10417', date: '2024-08-02', customer: 'DiamondMine', email: 'diamond@example.com', items: ['VIP Rank'], amount: 299, status: 'completed', method: 'stripe' },
  { id: 'ORD-10416', date: '2024-08-02', customer: 'EnderDragon', email: 'ender@example.com', items: ['ELITE Rank'], amount: 2499, status: 'failed', method: 'razorpay' },
  { id: 'ORD-10415', date: '2024-08-01', customer: 'NetheriteMan', email: 'nether@example.com', items: ['Rare Keys x5', 'Common Keys x5'], amount: 298, status: 'completed', method: 'stripe' },
  { id: 'ORD-10414', date: '2024-08-01', customer: 'RedstoneWiz', email: 'redstone@example.com', items: ['MVP Rank'], amount: 899, status: 'refunded', method: 'razorpay' },
  { id: 'ORD-10413', date: '2024-08-01', customer: 'BlazeRider', email: 'blaze@example.com', items: ['500,000 Coins'], amount: 2799, status: 'completed', method: 'stripe' },
]

const statusStyles = {
  completed: 'bg-green-500/15 text-green-400',
  pending: 'bg-yellow-500/15 text-yellow-400',
  failed: 'bg-red-500/15 text-red-400',
  refunded: 'bg-gray-500/15 text-gray-400',
}

const statusIcons = {
  completed: CheckCircle,
  pending: Clock,
  failed: XCircle,
  refunded: XCircle,
}

export default function AdminOrders() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 animate-slideUp">
        <div>
          <h1 className="font-display font-bold text-2xl sm:text-3xl text-white mb-1">
            Orders
          </h1>
          <p className="text-sm text-gray-400">
            Manage and track all customer orders
          </p>
        </div>
        <button className="mc-btn-outline px-6 py-3 text-sm flex items-center justify-center gap-2 whitespace-nowrap">
          <Download className="w-4 h-4" />
          Export CSV
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-slideUp">
        {[
          { label: 'All Orders', value: '1,284', color: 'text-white' },
          { label: 'Completed', value: '1,142', color: 'text-green-400' },
          { label: 'Pending', value: '38', color: 'text-yellow-400' },
          { label: 'Failed', value: '24', color: 'text-red-400' },
        ].map((s) => (
          <div key={s.label} className="mc-card !p-4 sm:!p-5">
            <p className={`font-display font-bold text-2xl sm:text-3xl mb-1 ${s.color}`}>{s.value}</p>
            <p className="text-xs sm:text-sm text-gray-400">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="mc-card !p-5 animate-slideUp">
        <div className="flex flex-col lg:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search order ID, customer name, email..."
              className="mc-input pl-11"
            />
          </div>
          <div className="flex gap-2">
            {['All', 'Completed', 'Pending', 'Failed'].map((f) => (
              <button
                key={f}
                className="px-4 py-2.5 rounded-xl text-sm font-semibold bg-white/5 text-gray-300 hover:bg-white/10 transition-all whitespace-nowrap"
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto -mx-5 px-5">
          <table className="w-full min-w-[1000px]">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wider font-bold text-gray-500 border-b border-white/10">
                <th className="py-3 pr-4">Order</th>
                <th className="py-3 pr-4">Customer</th>
                <th className="py-3 pr-4">Items</th>
                <th className="py-3 pr-4">Amount</th>
                <th className="py-3 pr-4">Method</th>
                <th className="py-3 pr-4">Status</th>
                <th className="py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {mockOrders.map((o) => {
                const StatusIcon = statusIcons[o.status] || CheckCircle
                return (
                  <tr key={o.id} className="text-sm hover:bg-white/[0.02]">
                    <td className="py-3.5 pr-4">
                      <div>
                        <span className="font-mono font-semibold text-white">{o.id}</span>
                        <p className="text-xs text-gray-500 mt-0.5">{o.date}</p>
                      </div>
                    </td>
                    <td className="py-3.5 pr-4">
                      <div>
                        <p className="font-medium text-white">{o.customer}</p>
                        <p className="text-xs text-gray-500">{o.email}</p>
                      </div>
                    </td>
                    <td className="py-3.5 pr-4">
                      <div className="space-y-1">
                        {o.items.map((it, i) => (
                          <p key={i} className="text-gray-300 text-xs">{it}</p>
                        ))}
                      </div>
                    </td>
                    <td className="py-3.5 pr-4 font-semibold text-white">
                      ₹{o.amount.toLocaleString()}
                    </td>
                    <td className="py-3.5 pr-4">
                      <span className="capitalize px-2.5 py-1 rounded-lg bg-white/5 text-gray-300 text-xs font-medium">
                        {o.method}
                      </span>
                    </td>
                    <td className="py-3.5 pr-4">
                      <span className={clsx(
                        'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold capitalize',
                        statusStyles[o.status]
                      )}>
                        <StatusIcon className="w-3 h-3" />
                        {o.status}
                      </span>
                    </td>
                    <td className="py-3.5 text-right">
                      <button className="p-2 rounded-lg text-gray-500 hover:text-primary hover:bg-primary/10 transition-all inline-flex">
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
