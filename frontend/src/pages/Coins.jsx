import { useQuery } from '@tanstack/react-query'
import { Coins } from 'lucide-react'
import PackageCard from '../components/PackageCard.jsx'
import LoadingSpinner from '../components/LoadingSpinner.jsx'
import api from '../lib/axios.js'

const mockCoins = [
  { id: 'coins-10k', name: '10,000 Coins', description: 'Perfect starter pack', price: 99, category: 'coins', features: ['10,000 coins', 'Instant delivery'], image: '' },
  { id: 'coins-50k', name: '50,000 Coins', description: 'Great value bundle', price: 399, originalPrice: 499, category: 'coins', popular: true, features: ['50,000 coins', 'Save ₹100', 'Instant'], image: '' },
  { id: 'coins-100k', name: '100,000 Coins', description: 'Most popular choice', price: 699, originalPrice: 999, category: 'coins', featured: true, popular: true, features: ['100,000 coins', 'Best value', 'Free bonus +10%'], image: '' },
  { id: 'coins-250k', name: '250,000 Coins', description: 'Heavy spender pack', price: 1499, originalPrice: 1999, category: 'coins', featured: true, features: ['250,000 coins', 'Massive discount', 'Free bonus +15%'], image: '' },
  { id: 'coins-500k', name: '500,000 Coins', description: 'Huge savings package', price: 2799, originalPrice: 3999, category: 'coins', popular: true, features: ['500,000 coins', 'Free bonus +20%', 'Priority support'], image: '' },
  { id: 'coins-1m', name: '1,000,000 Coins', description: 'Millionaire pack', price: 4999, originalPrice: 7999, category: 'coins', featured: true, features: ['1,000,000 coins', 'Free bonus +30%', 'VIP perks for 1 mo'], image: '' },
]

export default function Coins() {
  const { data: packages, isLoading } = useQuery({
    queryKey: ['packages-coins'],
    queryFn: async () => {
      try {
        const res = await api.get('/packages', { params: { category: 'coins' } })
        return res.data.data
      } catch {
        return mockCoins
      }
    },
    placeholderData: mockCoins,
  })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <div className="text-center max-w-3xl mx-auto mb-12 animate-slideUp">
        <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full glass mb-6">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-yellow-400 to-amber-600 flex items-center justify-center">
            <Coins className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm font-semibold text-gray-200">In-Game Currency</span>
        </div>
        <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-white mb-4 leading-tight">
          Buy In-Game <span className="gradient-text">Coins</span>
        </h1>
        <p className="text-lg text-gray-400 leading-relaxed">
          Skip the grind. Get instant coins to buy kits, upgrades, items from the
          shop, and more. Larger packs get bonus coins!
        </p>
      </div>

      {isLoading ? (
        <div className="py-20"><LoadingSpinner size="lg" /></div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {packages.map((pkg, i) => (
            <div key={pkg.id} style={{ animationDelay: `${i * 0.08}s` }} className="animate-slideUp">
              <PackageCard pkg={pkg} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
