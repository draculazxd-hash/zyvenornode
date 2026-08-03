import { Link, useNavigate } from 'react-router-dom'
import { ShoppingCart, Plus, Minus, Trash2, ArrowRight, PackageOpen } from 'lucide-react'
import { useCart } from '../hooks/useCart.js'

export default function Cart() {
  const { items, updateQty, removeFromCart, subtotal, discount, total, clear } = useCart()
  const navigate = useNavigate()

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="glass rounded-3xl p-10 lg:p-16 text-center animate-slideUp mc-gradient-border">
          <div className="w-24 h-24 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
            <PackageOpen className="w-12 h-12 text-primary" />
          </div>
          <h1 className="font-display font-bold text-3xl sm:text-4xl text-white mb-3">
            Your cart is empty
          </h1>
          <p className="text-gray-400 mb-8 max-w-md mx-auto">
            Looks like you haven't added anything yet. Browse our store to find
            amazing packages for your Minecraft adventure!
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to="/store" className="mc-btn px-8 flex items-center gap-2">
              <ShoppingCart className="w-5 h-5" />
              Browse Store
            </Link>
            <Link to="/ranks" className="mc-btn-outline px-8">
              View Ranks
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <div className="flex items-center gap-3 mb-8 animate-slideUp">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
          <ShoppingCart className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="font-display font-bold text-3xl sm:text-4xl text-white">
            Shopping Cart
          </h1>
          <p className="text-sm text-gray-400">{items.length} item(s) in your cart</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="glass rounded-2xl p-4 sm:p-5 flex gap-4 sm:gap-5 animate-slideUp group"
            >
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden flex-shrink-0 bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center">
                <span className="font-display font-bold text-2xl text-white">
                  {item.name?.charAt(0) || '?'}
                </span>
              </div>

              <div className="flex-1 min-w-0 flex flex-col">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <div className="min-w-0">
                    <h3 className="font-display font-bold text-lg text-white truncate group-hover:text-primary transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-xs text-gray-500 capitalize">{item.category}</p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-2 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition-all flex-shrink-0"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="mt-auto flex items-end justify-between gap-2 pt-2">
                  <div className="flex items-center gap-1.5 bg-white/5 rounded-xl p-1">
                    <button
                      onClick={() => updateQty(item.id, item.quantity - 1)}
                      className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-all flex items-center justify-center"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center font-bold text-white text-sm">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQty(item.id, item.quantity + 1)}
                      className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-all flex items-center justify-center"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="text-right">
                    {item.originalPrice && (
                      <p className="text-xs text-gray-500 line-through">
                        ₹{(item.originalPrice * item.quantity).toLocaleString()}
                      </p>
                    )}
                    <p className="font-display font-bold text-xl gradient-text">
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="flex justify-between pt-2">
            <Link
              to="/store"
              className="text-sm font-medium text-gray-400 hover:text-white transition-colors flex items-center gap-1"
            >
              ← Continue Shopping
            </Link>
            <button
              onClick={clear}
              className="text-sm font-medium text-gray-500 hover:text-red-400 transition-colors"
            >
              Clear cart
            </button>
          </div>
        </div>

        <div className="lg:sticky lg:top-28 h-fit">
          <div className="glass rounded-3xl p-6 sm:p-8 mc-gradient-border">
            <h2 className="font-display font-bold text-2xl text-white mb-6">
              Order Summary
            </h2>

            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Subtotal</span>
                <span className="text-white font-semibold">
                  ₹{subtotal.toLocaleString()}
                </span>
              </div>
              {discount > 0 && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Discount</span>
                  <span className="text-green-400 font-semibold">
                    - ₹{discount.toLocaleString()}
                  </span>
                </div>
              )}
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Taxes</span>
                <span className="text-white font-semibold">Included</span>
              </div>
            </div>

            <div className="border-t border-white/10 pt-5 mb-6">
              <div className="flex items-center justify-between mb-1">
                <span className="font-display font-bold text-lg text-white">Total</span>
                <span className="font-display font-bold text-2xl gradient-text">
                  ₹{total.toLocaleString()}
                </span>
              </div>
              <p className="text-xs text-gray-500 text-right">Secure checkout</p>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="mc-btn w-full text-base py-4 flex items-center justify-center gap-2"
            >
              Proceed to Checkout
              <ArrowRight className="w-5 h-5" />
            </button>

            <div className="mt-5 flex items-center justify-center gap-4 text-xs text-gray-500">
              <span>🔒 SSL Secured</span>
              <span>⚡ Instant</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
