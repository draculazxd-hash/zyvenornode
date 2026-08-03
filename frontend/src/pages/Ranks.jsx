import { useQuery } from '@tanstack/react-query'
import { Crown } from 'lucide-react'
import PackageCard from '../components/PackageCard.jsx'
import LoadingSpinner from '../components/LoadingSpinner.jsx'
import api from '../lib/axios.js'

const mockRanks = [
  { id: 'vip', name: 'VIP', description: 'Start your premium journey with great perks', price: 299, category: 'ranks', popular: true, features: ['/fly', '3 homes', 'Custom prefix', 'Kit VIP'], image: '' },
  { id: 'vip-plus', name: 'VIP+', description: 'Enhanced commands and more homes', price: 499, originalPrice: 599, category: 'ranks', features: ['Everything in VIP', '/fly speed', '5 homes', '/nick', 'Kit VIP+'], image: '' },
  { id: 'mvp', name: 'MVP', description: 'Premium features and priority support', price: 899, originalPrice: 1199, category: 'ranks', featured: true, popular: true, features: ['Everything in VIP+', 'Priority join', '10 homes', '/god (PvE)', 'Kit MVP', 'Pet cow/sheep'], image: '' },
  { id: 'mvp-plus', name: 'MVP+', description: 'Top tier rank with all perks unlocked', price: 1499, originalPrice: 1999, category: 'ranks', featured: true, features: ['Everything in MVP', 'Unlimited homes', 'Custom join msg', 'All pets', 'All kits', '/feed /heal'], image: '' },
  { id: 'elite', name: 'ELITE', description: 'Ultra exclusive rank for serious players', price: 2499, category: 'ranks', popular: true, features: ['Everything in MVP+', 'Staff chat view', 'Free monthly keys', 'Private warp', '1.5x coins boost'], image: '' },
  { id: 'emperor', name: 'EMPEROR', description: 'The ultimate rank. Own the server.', price: 4999, originalPrice: 6999, category: 'ranks', featured: true, features: ['Everything in ELITE', '2x coins boost', 'Custom commands', 'Name color change', 'Free events entry'], image: '' },
]

export default function Ranks() {
  const { data: packages, isLoading } = useQuery({
    queryKey: ['packages-ranks'],
    queryFn: async () => {
      try {
        const res = await api.get('/packages', { params: { category: 'ranks' } })
        return res.data.data
      } catch {
        return mockRanks
      }
    },
    placeholderData: mockRanks,
  })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <div className="text-center max-w-3xl mx-auto mb-12 animate-slideUp">
        <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full glass mb-6">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
            <Crown className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm font-semibold text-gray-200">Rank Store</span>
        </div>
        <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-white mb-4 leading-tight">
          Upgrade Your <span className="gradient-text">Rank</span>
        </h1>
        <p className="text-lg text-gray-400 leading-relaxed">
          Unlock powerful commands, exclusive kits, and stand out from the crowd.
          Every rank purchase helps support the server!
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
