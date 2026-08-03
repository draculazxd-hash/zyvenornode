import { Check, Sparkles, ShoppingCart } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../hooks/useCart.js'
import { useToast } from './Toasts/ToastContext.jsx'
import clsx from 'clsx'

export default function PackageCard({ pkg, compact = false }) {
  const { addToCart } = useCart()
  const { showToast } = useToast()
  const navigate = useNavigate()

  const discount = pkg.originalPrice
    ? Math.round(((pkg.originalPrice - pkg.price) / pkg.originalPrice) * 100)
    : 0

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(pkg)
    showToast(`${pkg.name} added to cart!`, 'success')
  }

  const handleBuyNow = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(pkg)
    navigate('/checkout')
  }

  return (
    <div
      className={clsx(
        'mc-card group relative overflow-hidden',
        pkg.featured && 'ring-2 ring-primary/50 animate-pulseGlow'
      )}
    >
      {pkg.featured && (
        <div className="absolute top-0 right-0 bg-gradient-to-br from-primary to-secondary px-3 py-1 rounded-bl-xl">
          <div className="flex items-center gap-1 text-xs font-bold text-white">
            <Sparkles className="w-3 h-3" />
            Featured
          </div>
        </div>
      )}

      {discount > 0 && (
        <div className="absolute top-3 left-3 z-10">
          <span className="mc-badge text-white">-{discount}%</span>
        </div>
      )}

      <Link to={`/store?category=${pkg.category || 'all'}`} className="block">
        <div className="relative h-40 sm:h-48 -mx-6 -mt-6 mb-5 overflow-hidden rounded-t-2xl">
          <div
            className="absolute inset-0 bg-cover bg-center transform group-hover:scale-110 transition-transform duration-500"
            style={{
              backgroundImage: pkg.image
                ? `url(${pkg.image})`
                : 'linear-gradient(135deg, rgba(139,92,246,0.3) 0%, rgba(6,182,212,0.3) 100%)',
              backgroundColor: 'rgba(20, 15, 40, 1)',
            }}
          >
            {!pkg.image && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-2xl">
                  <span className="text-3xl font-display font-bold text-white">
                    {pkg.name?.charAt(0) || '?'}
                  </span>
                </div>
              </div>
            )}
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[rgba(20,15,40,0.95)] via-transparent to-transparent"></div>
          {pkg.popular && (
            <div className="absolute bottom-3 left-3">
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-yellow-500/20 text-yellow-300 border border-yellow-500/30">
                ⭐ Popular
              </span>
            </div>
          )}
        </div>

        <h3 className="font-display font-bold text-xl text-white mb-1 group-hover:text-primary transition-colors">
          {pkg.name}
        </h3>
        <p className="text-sm text-gray-400 mb-4 line-clamp-2">{pkg.description}</p>

        {!compact && pkg.features && pkg.features.length > 0 && (
          <ul className="space-y-2 mb-5">
            {pkg.features.slice(0, 4).map((feature, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                <div className="mt-0.5 w-4 h-4 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
                  <Check className="w-2.5 h-2.5 text-white" />
                </div>
                <span className="line-clamp-1">{feature}</span>
              </li>
            ))}
            {pkg.features.length > 4 && (
              <li className="text-xs text-gray-500 pl-6">
                +{pkg.features.length - 4} more features
              </li>
            )}
          </ul>
        )}

        <div className="flex items-end justify-between mb-4">
          <div>
            {pkg.originalPrice && (
              <p className="text-sm text-gray-500 line-through mb-0.5">
                ₹{pkg.originalPrice.toLocaleString()}
              </p>
            )}
            <p className="font-display font-bold text-2xl gradient-text">
              ₹{pkg.price.toLocaleString()}
            </p>
          </div>
          {pkg.category && (
            <span className="px-2.5 py-1 rounded-lg text-xs font-medium bg-white/5 text-gray-400 capitalize">
              {pkg.category}
            </span>
          )}
        </div>
      </Link>

      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={handleAddToCart}
          className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-primary/50 transition-all duration-300 transform hover:scale-[1.02]"
        >
          <ShoppingCart className="w-4 h-4" />
          Add to Cart
        </button>
        <button
          onClick={handleBuyNow}
          className="mc-btn flex items-center justify-center gap-2 text-sm py-3 px-4"
        >
          Buy Now
        </button>
      </div>
    </div>
  )
}
