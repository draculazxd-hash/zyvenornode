import { useState, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Search, Package as PackageIcon, SlidersHorizontal } from 'lucide-react'
import PackageCard from '../components/PackageCard.jsx'
import LoadingSpinner from '../components/LoadingSpinner.jsx'
import api from '../lib/axios.js'
import clsx from 'clsx'

const tabs = [
  { id: 'all', label: 'All', icon: PackageIcon },
  { id: 'ranks', label: 'Ranks' },
  { id: 'keys', label: 'Keys' },
  { id: 'coins', label: 'Coins' },
]

const mockAllPackages = [
  { id: 'vip', name: 'VIP', description: 'Start your premium journey with great perks', price: 299, category: 'ranks', features: ['/fly', '3 homes', 'Custom prefix'], image: '' },
  { id: 'vip-plus', name: 'VIP+', description: 'Enhanced commands and more homes', price: 499, originalPrice: 599, category: 'ranks', features: ['Everything in VIP', '/fly speed', '5 homes'], image: '' },
  { id: 'mvp', name: 'MVP', description: 'Premium features and priority support', price: 899, originalPrice: 1199, category: 'ranks', featured: true, features: ['Everything in VIP+', 'Priority join', '10 homes'], image: '' },
  { id: 'mvp-plus', name: 'MVP+', description: 'Top tier rank with all perks unlocked', price: 1499, originalPrice: 1999, category: 'ranks', popular: true, features: ['Unlimited homes', 'All pets', 'All kits'], image: '' },
  { id: 'elite', name: 'ELITE', description: 'Ultra exclusive rank', price: 2499, category: 'ranks', features: ['1.5x coins boost', 'Free monthly keys', 'Private warp'], image: '' },
  { id: 'common-x5', name: 'Common Keys x5', description: 'Open basic crates', price: 99, category: 'keys', features: ['5 Common keys'], image: '' },
  { id: 'rare-x5', name: 'Rare Keys x5', description: 'Rare items & enchants', price: 199, originalPrice: 249, category: 'keys', popular: true, features: ['5 Rare keys', 'Money pouches'], image: '' },
  { id: 'legendary-x3', name: 'Legendary Keys x3', description: 'Ultra rare drops', price: 499, originalPrice: 599, category: 'keys', featured: true, features: ['3 Legendary keys', 'Custom items'], image: '' },
  { id: 'mythic-x2', name: 'Mythic Keys x2', description: 'The rarest items', price: 799, category: 'keys', features: ['2 Mythic keys'], image: '' },
  { id: 'coins-10k', name: '10,000 Coins', description: 'Perfect starter pack', price: 99, category: 'coins', features: ['10,000 coins'], image: '' },
  { id: 'coins-100k', name: '100,000 Coins', description: 'Most popular choice', price: 699, originalPrice: 999, category: 'coins', featured: true, popular: true, features: ['100,000 coins', 'Free bonus +10%'], image: '' },
  { id: 'coins-500k', name: '500,000 Coins', description: 'Huge savings', price: 2799, originalPrice: 3999, category: 'coins', features: ['500,000 coins', 'Free bonus +20%'], image: '' },
]

export default function Store() {
  const [activeTab, setActiveTab] = useState('all')
  const [search, setSearch] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [priceRange, setPriceRange] = useState('all')

  const { data: packages, isLoading } = useQuery({
    queryKey: ['packages-all'],
    queryFn: async () => {
      try {
        const res = await api.get('/packages')
        return res.data.data
      } catch {
        return mockAllPackages
      }
    },
    placeholderData: mockAllPackages,
  })

  const filtered = useMemo(() => {
    let list = packages || []
    if (activeTab !== 'all') list = list.filter((p) => p.category === activeTab)
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          (p.description && p.description.toLowerCase().includes(q))
      )
    }
    if (priceRange === 'under500') list = list.filter((p) => p.price < 500)
    if (priceRange === '500-1500') list = list.filter((p) => p.price >= 500 && p.price <= 1500)
    if (priceRange === 'over1500') list = list.filter((p) => p.price > 1500)
    return list
  }, [packages, activeTab, search, priceRange])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <div className="text-center max-w-3xl mx-auto mb-10 animate-slideUp">
        <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-white mb-4 leading-tight">
          The Complete <span className="gradient-text">Store</span>
        </h1>
        <p className="text-lg text-gray-400 leading-relaxed">
          Browse our full collection of ranks, keys, coins, and special packages.
        </p>
      </div>

      <div className="glass rounded-2xl p-3 mb-8 animate-slideUp">
        <div className="flex flex-col lg:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search packages..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="mc-input pl-12 pr-4"
            />
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className={clsx(
              'flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-medium transition-all lg:hidden',
              showFilters ? 'bg-primary/20 text-primary' : 'bg-white/5 text-gray-300 hover:bg-white/10'
            )}
          >
            <SlidersHorizontal className="w-5 h-5" />
            Filters
          </button>

          <div className="hidden lg:flex items-center gap-1 p-1 bg-white/5 rounded-xl overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={clsx(
                  'px-5 py-2.5 rounded-lg text-sm font-semibold transition-all whitespace-nowrap',
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/30'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className={clsx(
          'flex lg:hidden flex-wrap gap-2 mt-3 pt-3 border-t border-white/5',
          !showFilters && 'hidden'
        )}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={clsx(
                'px-4 py-2 rounded-lg text-sm font-semibold transition-all',
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-primary to-secondary text-white'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10'
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="hidden lg:flex items-center justify-between mb-6">
        <p className="text-sm text-gray-400">
          Showing <span className="text-white font-semibold">{filtered.length}</span> packages
        </p>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-400">Price:</span>
          <select
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-white outline-none focus:border-primary transition-colors"
          >
            <option value="all">All Prices</option>
            <option value="under500">Under ₹500</option>
            <option value="500-1500">₹500 - ₹1,500</option>
            <option value="over1500">Over ₹1,500</option>
          </select>
        </div>
      </div>

      {isLoading ? (
        <div className="py-20"><LoadingSpinner size="lg" /></div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 glass rounded-2xl">
          <PackageIcon className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">No packages found</h3>
          <p className="text-gray-400">Try adjusting your filters or search terms</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 lg:gap-6">
          {filtered.map((pkg, i) => (
            <div key={pkg.id} style={{ animationDelay: `${i * 0.05}s` }} className="animate-slideUp">
              <PackageCard pkg={pkg} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
