import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Users, Package as PackageIcon, TrendingUp, Users2, Megaphone, Sparkles, ChevronRight, Crown, Key, Coins } from 'lucide-react'
import ServerIP from '../components/ServerIP.jsx'
import PackageCard from '../components/PackageCard.jsx'
import CategoryCard from '../components/CategoryCard.jsx'
import LoadingSpinner from '../components/LoadingSpinner.jsx'
import api from '../lib/axios.js'

const mockPackages = [
  {
    id: 'vip-rank',
    name: 'VIP Rank',
    description: 'Premium rank with exclusive perks and commands',
    price: 499,
    originalPrice: 799,
    category: 'ranks',
    featured: true,
    popular: true,
    features: ['/fly command', 'Custom prefix', '5 homes', 'Priority join', 'Kits access'],
  },
  {
    id: 'legendary-key',
    name: 'Legendary Key x5',
    description: 'Open legendary crates for epic rewards',
    price: 299,
    category: 'keys',
    featured: true,
    features: ['5 Legendary keys', 'Chance for God items', 'Exclusive cosmetics', 'Money pouch drops'],
  },
  {
    id: 'coins-100k',
    name: '100,000 Coins',
    description: 'Instant in-game currency boost',
    price: 199,
    originalPrice: 299,
    category: 'coins',
    popular: true,
    features: ['100,000 coins', 'Instant delivery', 'Buy kits & items', 'Shop upgrades'],
  },
  {
    id: 'mvp-rank',
    name: 'MVP+ Rank',
    description: 'Top-tier rank with all premium features',
    price: 1499,
    originalPrice: 1999,
    category: 'ranks',
    featured: true,
    popular: true,
    features: ['Everything in VIP', 'Unlimited homes', 'God mode (PvE)', 'Custom join msg', 'Pet system'],
  },
]

const categories = [
  { slug: 'ranks', name: 'Ranks', description: 'Upgrade your status', count: 12 },
  { slug: 'keys', name: 'Keys', description: 'Unlock rare crates', count: 8 },
  { slug: 'coins', name: 'Coins', description: 'Get in-game currency', count: 6 },
]

const mockStats = [
  { label: 'Online Players', value: '1,247', icon: Users, color: 'from-green-500 to-emerald-600' },
  { label: 'Packages Sold', value: '28,540', icon: PackageIcon, color: 'from-primary to-purple-600' },
  { label: 'Revenue', value: '₹12.4L', icon: TrendingUp, color: 'from-secondary to-cyan-600' },
  { label: 'Members', value: '45,000+', icon: Users2, color: 'from-orange-500 to-amber-600' },
]

function FloatingBlock({ delay, className, children }) {
  return (
    <div
      className={`absolute opacity-20 animate-float ${className}`}
      style={{ animationDelay: `${delay}s` }}
    >
      {children}
    </div>
  )
}

export default function Home() {
  const { data: packages, isLoading } = useQuery({
    queryKey: ['featured-packages'],
    queryFn: async () => {
      try {
        const res = await api.get('/packages', { params: { featured: true } })
        return res.data.data
      } catch {
        return mockPackages
      }
    },
    placeholderData: mockPackages,
  })

  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['stats'],
    queryFn: async () => {
      try {
        const res = await api.get('/stats')
        return res.data
      } catch {
        return mockStats
      }
    },
    placeholderData: mockStats,
  })

  return (
    <div className="overflow-hidden">
      <div className="relative px-4 sm:px-6 lg:px-8 pt-12 lg:pt-20 pb-20 lg:pb-32">
        <FloatingBlock delay={0} className="top-10 left-[5%] w-16 h-16">
          <div className="w-full h-full rounded-lg bg-gradient-to-br from-green-500 to-emerald-700"></div>
        </FloatingBlock>
        <FloatingBlock delay={1} className="top-20 right-[8%] w-12 h-12">
          <div className="w-full h-full rounded-lg bg-gradient-to-br from-amber-500 to-orange-700"></div>
        </FloatingBlock>
        <FloatingBlock delay={2} className="top-[60%] left-[10%] w-20 h-20">
          <div className="w-full h-full rounded-lg bg-gradient-to-br from-purple-500 to-pink-700"></div>
        </FloatingBlock>
        <FloatingBlock delay={1.5} className="top-[50%] right-[5%] w-14 h-14">
          <div className="w-full h-full rounded-lg bg-gradient-to-br from-cyan-500 to-blue-700"></div>
        </FloatingBlock>
        <FloatingBlock delay={2.5} className="bottom-10 left-[40%] w-10 h-10">
          <div className="w-full h-full rounded-lg bg-gradient-to-br from-red-500 to-rose-700"></div>
        </FloatingBlock>
        <FloatingBlock delay={0.5} className="top-[30%] left-[45%] w-8 h-8">
          <div className="w-full h-full rounded-lg bg-gradient-to-br from-yellow-400 to-amber-600"></div>
        </FloatingBlock>

        <div className="relative max-w-7xl mx-auto">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-br from-primary/20 via-secondary/10 to-transparent rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative text-center max-w-4xl mx-auto animate-slideUp">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6 mc-gradient-border">
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span className="text-sm font-medium text-gray-200">
                Summer Sale — Up to 40% OFF on all ranks!
              </span>
            </div>

            <h1 className="font-display font-bold text-5xl sm:text-6xl lg:text-7xl text-white mb-6 leading-[1.05] tracking-tight">
              Level Up Your{' '}
              <span className="gradient-text text-shadow-glow">Minecraft</span>
              <br />
              Adventure Today
            </h1>

            <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              Unlock premium ranks, exclusive keys, and in-game coins on India's most
              exciting Minecraft server. Instant delivery, 24/7 support.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Link
                to="/store"
                className="mc-btn text-base px-8 py-4 flex items-center gap-2"
              >
                Browse Store
                <ChevronRight className="w-5 h-5" />
              </Link>
              <Link
                to="/ranks"
                className="mc-btn-outline text-base px-8 py-4 flex items-center gap-2"
              >
                <Crown className="w-5 h-5 text-primary" />
                View Ranks
              </Link>
            </div>

            <div className="flex justify-center">
              <ServerIP />
            </div>
          </div>
        </div>
      </div>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4 mb-20">
        <div className="glass-strong rounded-3xl p-2 border border-white/10">
          <div className="rounded-2xl overflow-hidden relative bg-gradient-to-r from-primary/20 via-secondary/10 to-primary/20 p-1">
            <div className="glass rounded-xl px-6 py-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-orange-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-red-500/30">
                <Megaphone className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white">
                  🎉 New Season Launch — Season 2 is live!
                </p>
                <p className="text-sm text-gray-400 truncate">
                  Explore new biomes, custom enchants, and exclusive season pass rewards. Join now!
                </p>
              </div>
              <Link
                to="/store"
                className="hidden sm:inline-flex px-5 py-2.5 rounded-xl text-sm font-semibold bg-white/10 hover:bg-white/20 text-white transition-all"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        {statsLoading ? (
          <div className="py-20"><LoadingSpinner size="lg" /></div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {stats.map((stat, i) => {
              const Icon = stat.icon
              return (
                <div
                  key={stat.label}
                  className="mc-card text-center animate-slideUp"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className={`w-12 h-12 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${stat.color || 'from-primary to-secondary'} flex items-center justify-center shadow-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <p className="font-display font-bold text-2xl lg:text-3xl text-white mb-1">
                    {stat.value}
                  </p>
                  <p className="text-sm text-gray-400">{stat.label}</p>
                </div>
              )
            })}
          </div>
        )}
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="font-display font-bold text-3xl lg:text-4xl text-white mb-2">
              Shop by <span className="gradient-text">Category</span>
            </h2>
            <p className="text-gray-400">Find exactly what you need</p>
          </div>
          <Link
            to="/store"
            className="hidden sm:flex items-center gap-2 text-sm font-semibold text-primary hover:text-secondary transition-colors"
          >
            View all <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {categories.map((cat, i) => (
            <div key={cat.slug} style={{ animationDelay: `${i * 0.1}s` }} className="animate-slideUp">
              <CategoryCard category={cat} />
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="font-display font-bold text-3xl lg:text-4xl text-white mb-2">
              <span className="gradient-text">Featured</span> Packages
            </h2>
            <p className="text-gray-400">Most loved by our community</p>
          </div>
          <Link
            to="/store"
            className="hidden sm:flex items-center gap-2 text-sm font-semibold text-primary hover:text-secondary transition-colors"
          >
            See all <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        {isLoading ? (
          <div className="py-20"><LoadingSpinner size="lg" /></div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
            {packages.slice(0, 4).map((pkg, i) => (
              <div key={pkg.id} style={{ animationDelay: `${i * 0.1}s` }} className="animate-slideUp">
                <PackageCard pkg={pkg} />
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="relative rounded-3xl overflow-hidden mc-gradient-border">
          <div className="glass-strong p-8 lg:p-12 relative">
            <div className="absolute -top-20 -right-20 w-60 h-60 bg-primary/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-secondary/20 rounded-full blur-3xl"></div>

            <div className="relative grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/15 text-primary text-xs font-bold mb-4">
                  <Crown className="w-3.5 h-3.5" />
                  PREMIUM EXPERIENCE
                </div>
                <h2 className="font-display font-bold text-3xl lg:text-4xl text-white mb-4 leading-tight">
                  Why Choose{' '}
                  <span className="gradient-text">ZyvenorMC?</span>
                </h2>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  We're not just a server — we're a community. Experience the best of
                  Minecraft with custom features, active staff, and events every week.
                </p>
                <ul className="space-y-3">
                  {[
                    '⚡ Instant delivery of all purchases',
                    '🛡️ Anti-cheat & DDoS protected servers',
                    '💬 24/7 active Discord & in-game support',
                    '🎁 Weekly giveaways & seasonal events',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-gray-300">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-xs">✓</span>
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-white/5 border border-white/10 text-center">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                    <Crown className="w-6 h-6 text-white" />
                  </div>
                  <p className="font-display font-bold text-white mb-1">Premium Ranks</p>
                  <p className="text-xs text-gray-500">12+ tiers</p>
                </div>
                <div className="p-5 rounded-2xl bg-white/5 border border-white/10 text-center">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                    <Key className="w-6 h-6 text-white" />
                  </div>
                  <p className="font-display font-bold text-white mb-1">Crate Keys</p>
                  <p className="text-xs text-gray-500">8+ crates</p>
                </div>
                <div className="p-5 rounded-2xl bg-white/5 border border-white/10 text-center lg:col-span-3 xl:col-span-1">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-yellow-400 to-amber-600 flex items-center justify-center">
                    <Coins className="w-6 h-6 text-white" />
                  </div>
                  <p className="font-display font-bold text-white mb-1">In-Game Coins</p>
                  <p className="text-xs text-gray-500">6+ packs</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
