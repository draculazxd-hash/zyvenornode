import { Search, Package as PackageIcon, Mail, MessageCircle, Calendar, ChevronRight } from 'lucide-react'

const mockCustomers = [
  { id: 1, name: 'SteveGamer', email: 'steve@example.com', mcUser: 'SteveGamer', discord: 'steve#1234', orders: 12, spent: 12400, joined: '2024-02-15', status: 'vip' },
  { id: 2, name: 'Alex_Pro', email: 'alex@example.com', mcUser: 'Alex_Pro', discord: 'alex#4321', orders: 8, spent: 5600, joined: '2024-03-22', status: 'regular' },
  { id: 3, name: 'CreeperKing', email: 'creeper@example.com', mcUser: 'CreeperKing', discord: 'creeper#0001', orders: 24, spent: 28900, joined: '2024-01-05', status: 'elite' },
  { id: 4, name: 'DiamondMine', email: 'diamond@example.com', mcUser: 'DiamondMine', discord: 'diamond#8888', orders: 5, spent: 1499, joined: '2024-05-10', status: 'regular' },
  { id: 5, name: 'EnderDragon', email: 'ender@example.com', mcUser: 'EnderDragon', discord: 'ender#6666', orders: 18, spent: 45200, joined: '2023-12-20', status: 'emperor' },
]

const statusStyles = {
  emperor: 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white',
  elite: 'bg-gradient-to-r from-purple-500 to-pink-500 text-white',
  vip: 'bg-gradient-to-r from-sky-500 to-blue-500 text-white',
  regular: 'bg-gray-500/20 text-gray-300',
}

export default function AdminCustomers() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 animate-slideUp">
        <div>
          <h1 className="font-display font-bold text-2xl sm:text-3xl text-white mb-1">
            Customers
          </h1>
          <p className="text-sm text-gray-400">
            View and manage your customers
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-slideUp">
        {[
          { label: 'Total', value: '3,420', color: 'from-primary to-purple-600' },
          { label: 'Active', value: '2,180', color: 'from-green-500 to-emerald-600' },
          { label: 'VIP+', value: '486', color: 'from-amber-500 to-orange-600' },
          { label: 'New (7d)', value: '124', color: 'from-sky-500 to-blue-600' },
        ].map((s) => (
          <div key={s.label} className="mc-card !p-5">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.color} mb-3 flex items-center justify-center shadow-lg`}>
              <PackageIcon className="w-5 h-5 text-white" />
            </div>
            <p className="font-display font-bold text-2xl text-white mb-0.5">{s.value}</p>
            <p className="text-xs text-gray-400">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="mc-card !p-5 animate-slideUp">
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search by name, email, Minecraft username..."
            className="mc-input pl-11"
          />
        </div>

        <div className="space-y-3">
          {mockCustomers.map((c, i) => (
            <div
              key={c.id}
              className="glass rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-4 hover:border-primary/30 transition-all cursor-pointer group animate-slideUp"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <div className="flex items-center gap-4 flex-1 min-w-0">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/40 to-secondary/40 flex items-center justify-center flex-shrink-0 shadow-lg">
                  <span className="font-display font-bold text-lg text-white">
                    {c.name.charAt(0)}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="font-semibold text-white truncate">{c.name}</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-bold capitalize ${statusStyles[c.status]}`}>
                      {c.status}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-400">
                    <span className="inline-flex items-center gap-1.5">
                      <Mail className="w-3 h-3" />
                      {c.email}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <PackageIcon className="w-3 h-3" />
                      MC: {c.mcUser}
                    </span>
                    {c.discord && (
                      <span className="inline-flex items-center gap-1.5">
                        <MessageCircle className="w-3 h-3" />
                        {c.discord}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 sm:flex sm:items-center gap-3 sm:gap-6 pl-16 sm:pl-0">
                <div>
                  <p className="font-bold text-white">{c.orders}</p>
                  <p className="text-xs text-gray-500">Orders</p>
                </div>
                <div>
                  <p className="font-bold gradient-text">₹{c.spent.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">Spent</p>
                </div>
                <div>
                  <div className="inline-flex sm:flex flex-col items-end">
                    <p className="font-semibold text-sm text-gray-300 inline-flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {c.joined}
                    </p>
                  </div>
                </div>
                <button className="hidden sm:flex p-2 rounded-xl text-gray-500 hover:text-primary hover:bg-primary/10 transition-all group-hover:translate-x-1 transition-transform">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
