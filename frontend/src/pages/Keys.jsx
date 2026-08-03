import { useQuery } from '@tanstack/react-query'
import { Key } from 'lucide-react'
import PackageCard from '../components/PackageCard.jsx'
import LoadingSpinner from '../components/LoadingSpinner.jsx'
import api from '../lib/axios.js'

const mockKeys = [
  { id: 'common-x5', name: 'Common Keys x5', description: 'Open basic crates', price: 99, category: 'keys', features: ['5 Common keys', 'Chance for armor & tools'], image: '' },
  { id: 'rare-x5', name: 'Rare Keys x5', description: 'Rare items & enchants', price: 199, originalPrice: 249, category: 'keys', popular: true, features: ['5 Rare keys', 'Enchanted gear drops', 'Money pouches'], image: '' },
  { id: 'epic-x3', name: 'Epic Keys x3', description: 'Powerful enchantments', price: 299, category: 'keys', features: ['3 Epic keys', 'God enchant chance', 'Exclusive cosmetics'], image: '' },
  { id: 'legendary-x3', name: 'Legendary Keys x3', description: 'Ultra rare drops', price: 499, originalPrice: 599, category: 'keys', featured: true, popular: true, features: ['3 Legendary keys', 'Chance for Netherite', 'Custom items'], image: '' },
  { id: 'mythic-x2', name: 'Mythic Keys x2', description: 'The rarest items', price: 799, category: 'keys', featured: true, features: ['2 Mythic keys', 'Top tier items only', 'Pet drops'], image: '' },
  { id: 'bundle-all', name: 'Ultimate Bundle', description: 'All key tiers together', price: 1499, originalPrice: 1899, category: 'keys', featured: true, features: ['5 Common + 5 Rare + 3 Epic + 3 Legendary + 2 Mythic', 'Massive savings', 'Free bonus key'], image: '' },
]

export default function Keys() {
  const { data: packages, isLoading } = useQuery({
    queryKey: ['packages-keys'],
    queryFn: async () => {
      try {
        const res = await api.get('/packages', { params: { category: 'keys' } })
        return res.data.data
      } catch {
        return mockKeys
      }
    },
    placeholderData: mockKeys,
  })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <div className="text-center max-w-3xl mx-auto mb-12 animate-slideUp">
        <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full glass mb-6">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
            <Key className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm font-semibold text-gray-200">Crate Keys</span>
        </div>
        <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-white mb-4 leading-tight">
          Unlock Amazing <span className="gradient-text">Crates</span>
        </h1>
        <p className="text-lg text-gray-400 leading-relaxed">
          Get keys to open exclusive crates with rare enchants, custom items, money,
          and cosmetic rewards. New crates added every season!
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
