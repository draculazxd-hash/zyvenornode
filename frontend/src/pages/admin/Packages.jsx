import { useState } from 'react'
import { Plus, Search, Edit2, Trash2, Eye, Package as PackageIcon, ChevronDown } from 'lucide-react'
import clsx from 'clsx'

const mockPackages = [
  { id: 'vip', name: 'VIP Rank', category: 'ranks', price: 299, originalPrice: 399, status: 'active', sales: 342 },
  { id: 'vip-plus', name: 'VIP+ Rank', category: 'ranks', price: 499, originalPrice: null, status: 'active', sales: 198 },
  { id: 'mvp', name: 'MVP Rank', category: 'ranks', price: 899, originalPrice: 1199, status: 'active', sales: 156 },
  { id: 'mvp-plus', name: 'MVP+ Rank', category: 'ranks', price: 1499, originalPrice: 1999, status: 'active', sales: 284 },
  { id: 'elite', name: 'ELITE Rank', category: 'ranks', price: 2499, originalPrice: null, status: 'active', sales: 68 },
  { id: 'common-x5', name: 'Common Keys x5', category: 'keys', price: 99, originalPrice: null, status: 'active', sales: 412 },
  { id: 'rare-x5', name: 'Rare Keys x5', category: 'keys', price: 199, originalPrice: 249, status: 'active', sales: 356 },
  { id: 'coins-100k', name: '100,000 Coins', category: 'coins', price: 699, originalPrice: 999, status: 'active', sales: 512 },
  { id: 'seasonal-pack', name: 'Seasonal Special', category: 'specials', price: 799, originalPrice: null, status: 'draft', sales: 0 },
  { id: 'emperor', name: 'EMPEROR Rank', category: 'ranks', price: 4999, originalPrice: 6999, status: 'archived', sales: 24 },
]

export default function AdminPackages() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')
  const [menuOpen, setMenuOpen] = useState(null)

  const filtered = mockPackages.filter((p) => {
    if (filter !== 'all' && p.status !== filter) return false
    if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 animate-slideUp">
        <div>
          <h1 className="font-display font-bold text-2xl sm:text-3xl text-white mb-1">
            Packages
          </h1>
          <p className="text-sm text-gray-400">
            Manage your store products and packages
          </p>
        </div>
        <button className="mc-btn px-6 py-3 text-sm flex items-center justify-center gap-2 whitespace-nowrap">
          <Plus className="w-4 h-4" />
          New Package
        </button>
      </div>

      <div className="mc-card !p-5 animate-slideUp">
        <div className="flex flex-col lg:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search packages..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="mc-input pl-11"
            />
          </div>
          <div className="flex gap-2">
            {['all', 'active', 'draft', 'archived'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={clsx(
                  'px-4 py-2.5 rounded-xl text-sm font-semibold capitalize transition-all',
                  filter === f
                    ? 'bg-gradient-to-r from-primary to-secondary text-white'
                    : 'bg-white/5 text-gray-300 hover:bg-white/10'
                )}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto -mx-5 px-5">
          <table className="w-full min-w-[900px]">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wider font-bold text-gray-500 border-b border-white/10">
                <th className="py-3 pr-4">Package</th>
                <th className="py-3 pr-4">Category</th>
                <th className="py-3 pr-4">Price</th>
                <th className="py-3 pr-4">Sales</th>
                <th className="py-3 pr-4">Status</th>
                <th className="py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map((pkg) => (
                <tr key={pkg.id} className="text-sm hover:bg-white/[0.02]">
                  <td className="py-3.5 pr-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center flex-shrink-0">
                        <PackageIcon className="w-5 h-5 text-white" />
                      </div>
                      <span className="font-semibold text-white">{pkg.name}</span>
                    </div>
                  </td>
                  <td className="py-3.5 pr-4">
                    <span className="px-2.5 py-1 rounded-lg bg-white/5 text-gray-300 text-xs font-medium capitalize">
                      {pkg.category}
                    </span>
                  </td>
                  <td className="py-3.5 pr-4">
                    <div>
                      <span className="font-semibold text-white">₹{pkg.price.toLocaleString()}</span>
                      {pkg.originalPrice && (
                        <span className="ml-2 text-xs text-gray-500 line-through">
                          ₹{pkg.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-3.5 pr-4 text-gray-300 font-medium">{pkg.sales}</td>
                  <td className="py-3.5 pr-4">
                    <span className={clsx(
                      'px-2.5 py-1 rounded-full text-xs font-bold capitalize',
                      pkg.status === 'active' && 'bg-green-500/15 text-green-400',
                      pkg.status === 'draft' && 'bg-yellow-500/15 text-yellow-400',
                      pkg.status === 'archived' && 'bg-gray-500/15 text-gray-400'
                    )}>
                      {pkg.status}
                    </span>
                  </td>
                  <td className="py-3.5 text-right relative">
                    <div className="flex items-center justify-end gap-1">
                      <button className="p-2 rounded-lg text-gray-500 hover:text-sky-400 hover:bg-sky-500/10 transition-all">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 rounded-lg text-gray-500 hover:text-primary hover:bg-primary/10 transition-all">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button className="p-2 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition-all">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex items-center justify-between pt-4 border-t border-white/10 text-sm">
          <p className="text-gray-400">
            Showing <span className="text-white font-semibold">{filtered.length}</span> packages
          </p>
          <div className="flex gap-1">
            {['Prev', '1', '2', '3', 'Next'].map((p, i) => (
              <button
                key={p}
                className={clsx(
                  'w-9 h-9 rounded-lg text-sm font-semibold transition-all',
                  p === '1' ? 'bg-gradient-to-r from-primary to-secondary text-white' : 'bg-white/5 text-gray-300 hover:bg-white/10',
                  (i === 0 || i === 4) && 'px-3 w-auto'
                )}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
