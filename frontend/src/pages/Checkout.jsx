import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  CreditCard,
  User as UserIcon,
  Mail,
  Gamepad2,
  MessageCircle,
  ChevronRight,
  CheckCircle2,
  Loader2,
  ShoppingCart,
  ArrowLeft,
} from 'lucide-react'
import { useCart } from '../hooks/useCart.js'
import { useToast } from '../components/Toasts/ToastContext.jsx'
import api from '../lib/axios.js'
import clsx from 'clsx'

export default function Checkout() {
  const { items, subtotal, discount, total, clear } = useCart()
  const { showToast } = useToast()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    customerName: '',
    email: '',
    minecraftUsername: '',
    discordId: '',
  })
  const [errors, setErrors] = useState({})
  const [paymentMethod, setPaymentMethod] = useState('stripe')
  const [submitting, setSubmitting] = useState(false)

  const setField = (k, v) => {
    setForm((p) => ({ ...p, [k]: v }))
    if (errors[k]) setErrors((p) => ({ ...p, [k]: '' }))
  }

  const validate = () => {
    const e = {}
    if (!form.customerName.trim()) e.customerName = 'Name is required'
    if (!form.email.trim()) e.email = 'Email is required'
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Enter a valid email'
    if (!form.minecraftUsername.trim()) e.minecraftUsername = 'Minecraft username is required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    if (items.length === 0) {
      showToast('Your cart is empty!', 'warning')
      navigate('/store')
      return
    }
    setSubmitting(true)
    try {
      const payload = {
        ...form,
        items: items.map((i) => ({
          packageId: i._id || i.id,
          name: i.name,
          price: i.price,
          quantity: i.quantity,
        })),
        subtotal,
        discount,
        total,
        paymentMethod,
      }
      const res = await api.post('/orders', payload)
      clear()
      showToast('Order placed successfully!', 'success')
      if (res.data.data?.redirectUrl) {
        window.location.href = res.data.data.redirectUrl
      } else {
        navigate(`/success?orderId=${res.data.data?._id || res.data.data?.id || ''}`)
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to place order. Please try again.'
      showToast(msg, 'error')
    } finally {
      setSubmitting(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="glass rounded-3xl p-10 text-center animate-slideUp">
          <ShoppingCart className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Your cart is empty</h2>
          <p className="text-gray-400 mb-6">Add some items before checking out</p>
          <Link to="/store" className="mc-btn inline-flex px-8">
            Go to Store
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <Link
        to="/cart"
        className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white mb-6 transition-colors animate-slideUp"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Cart
      </Link>

      <h1 className="font-display font-bold text-3xl sm:text-4xl text-white mb-8 animate-slideUp">
        <span className="gradient-text">Secure</span> Checkout
      </h1>

      <div className="grid lg:grid-cols-5 gap-6 lg:gap-8">
        <form onSubmit={handleSubmit} className="lg:col-span-3 space-y-6">
          <div className="glass rounded-2xl p-6 animate-slideUp">
            <h2 className="font-display font-bold text-xl text-white mb-5 flex items-center gap-2">
              <UserIcon className="w-5 h-5 text-primary" />
              Customer Information
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-1.5">
                  Full Name *
                </label>
                <div className="relative">
                  <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="text"
                    value={form.customerName}
                    onChange={(e) => setField('customerName', e.target.value)}
                    placeholder="John Doe"
                    className={clsx(
                      'mc-input pl-11',
                      errors.customerName && 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20'
                    )}
                  />
                </div>
                {errors.customerName && (
                  <p className="text-xs text-red-400 mt-1">{errors.customerName}</p>
                )}
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-1.5">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setField('email', e.target.value)}
                    placeholder="you@example.com"
                    className={clsx(
                      'mc-input pl-11',
                      errors.email && 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20'
                    )}
                  />
                </div>
                {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">
                  Minecraft Username *
                </label>
                <div className="relative">
                  <Gamepad2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="text"
                    value={form.minecraftUsername}
                    onChange={(e) => setField('minecraftUsername', e.target.value)}
                    placeholder="Notch"
                    className={clsx(
                      'mc-input pl-11',
                      errors.minecraftUsername && 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20'
                    )}
                  />
                </div>
                {errors.minecraftUsername && (
                  <p className="text-xs text-red-400 mt-1">{errors.minecraftUsername}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">
                  Discord ID <span className="text-gray-500">(optional)</span>
                </label>
                <div className="relative">
                  <MessageCircle className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="text"
                    value={form.discordId}
                    onChange={(e) => setField('discordId', e.target.value)}
                    placeholder="username#0000"
                    className="mc-input pl-11"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="glass rounded-2xl p-6 animate-slideUp">
            <h2 className="font-display font-bold text-xl text-white mb-5 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-primary" />
              Payment Method
            </h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { id: 'stripe', label: 'Stripe', desc: 'Credit/Debit Cards', icon: '💳' },
                { id: 'razorpay', label: 'Razorpay', desc: 'UPI, Cards, Wallets', icon: '🪙' },
              ].map((m) => (
                <button
                  type="button"
                  key={m.id}
                  onClick={() => setPaymentMethod(m.id)}
                  className={clsx(
                    'p-4 rounded-2xl border-2 text-left transition-all duration-300',
                    paymentMethod === m.id
                      ? 'border-primary bg-primary/10'
                      : 'border-white/10 bg-white/5 hover:border-white/20'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={clsx(
                        'w-10 h-10 rounded-xl flex items-center justify-center text-xl transition-all',
                        paymentMethod === m.id
                          ? 'bg-gradient-to-br from-primary to-secondary'
                          : 'bg-white/10'
                      )}
                    >
                      {m.icon}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-white flex items-center gap-2">
                        {m.label}
                        {paymentMethod === m.id && (
                          <CheckCircle2 className="w-4 h-4 text-primary" />
                        )}
                      </p>
                      <p className="text-xs text-gray-400">{m.desc}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
            <p className="mt-4 text-xs text-gray-500 flex items-center gap-2">
              🔒 Your payment information is secured and encrypted.
            </p>
          </div>
        </form>

        <div className="lg:col-span-2">
          <div className="glass rounded-3xl p-6 sm:p-8 sticky top-28 mc-gradient-border">
            <h2 className="font-display font-bold text-xl text-white mb-5">
              Your Order
            </h2>

            <div className="space-y-3 max-h-64 overflow-y-auto pr-1 mb-5">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-3 p-2.5 rounded-xl bg-white/5">
                  <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-primary/40 to-secondary/40 flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-sm text-white">
                      {item.name?.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-white truncate">{item.name}</p>
                    <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-bold text-white text-sm whitespace-nowrap">
                    ₹{(item.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>

            <div className="space-y-3 pt-5 border-t border-white/10 mb-5">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Subtotal</span>
                <span className="text-white font-medium">₹{subtotal.toLocaleString()}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Discount</span>
                  <span className="text-green-400 font-medium">- ₹{discount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Taxes & Fees</span>
                <span className="text-white font-medium">Included</span>
              </div>
            </div>

            <div className="border-t border-white/10 pt-5 mb-6">
              <div className="flex items-end justify-between mb-1">
                <span className="font-bold text-lg text-white">Total</span>
                <span className="font-display font-bold text-2xl gradient-text">
                  ₹{total.toLocaleString()}
                </span>
              </div>
              <p className="text-xs text-gray-500 text-right">
                {paymentMethod === 'razorpay' ? 'via Razorpay' : 'via Stripe'}
              </p>
            </div>

            <button
              type="submit"
              onClick={handleSubmit}
              disabled={submitting}
              className="mc-btn w-full py-4 text-base flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  Place Order
                  <ChevronRight className="w-5 h-5" />
                </>
              )}
            </button>

            <div className="mt-5 flex flex-wrap items-center justify-center gap-3 text-xs text-gray-500">
              <span>🔒 256-bit SSL</span>
              <span>⚡ Instant Delivery</span>
              <span>✅ Verified</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
