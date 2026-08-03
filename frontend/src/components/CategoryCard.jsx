import { Link } from 'react-router-dom'
import { Crown, Key, Coins, Package } from 'lucide-react'
import clsx from 'clsx'

const iconMap = {
  ranks: Crown,
  keys: Key,
  coins: Coins,
  all: Package,
}

const gradientMap = {
  ranks: 'from-amber-500 to-orange-600',
  keys: 'from-purple-500 to-pink-600',
  coins: 'from-yellow-400 to-amber-500',
  all: 'from-primary to-secondary',
}

export default function CategoryCard({ category }) {
  const Icon = iconMap[category.slug] || Package
  const gradient = gradientMap[category.slug] || gradientMap.all

  return (
    <Link
      to={`/store?category=${category.slug}`}
      className="group mc-card relative overflow-hidden"
    >
      <div
        className={clsx(
          'absolute top-0 right-0 w-40 h-40 rounded-full opacity-20 blur-3xl group-hover:opacity-40 transition-opacity duration-500 bg-gradient-to-br',
          gradient
        )}
        style={{ transform: 'translate(40%, -40%)' }}
      ></div>

      <div className="relative">
        <div
          className={clsx(
            'w-14 h-14 rounded-2xl bg-gradient-to-br flex items-center justify-center shadow-lg mb-4 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300',
            gradient
          )}
        >
          <Icon className="w-7 h-7 text-white" strokeWidth={2} />
        </div>

        <h3 className="font-display font-bold text-xl text-white mb-1 group-hover:text-primary transition-colors">
          {category.name}
        </h3>
        <p className="text-sm text-gray-400 mb-4">{category.description}</p>

        <div className="flex items-center justify-between">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/5 text-gray-300 group-hover:bg-white/10 transition-colors">
            {category.count || 0} items
          </span>
          <span className="text-sm font-semibold text-primary opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300 flex items-center gap-1">
            Browse →
          </span>
        </div>
      </div>
    </Link>
  )
}
