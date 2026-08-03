import { Link, useSearchParams } from 'react-router-dom'
import { CheckCircle, Package, Home, MessageCircle, Download } from 'lucide-react'

export default function Success() {
  const [params] = useSearchParams()
  const orderId = params.get('orderId') || 'ORD-' + Date.now().toString().slice(-8)

  return (
    <div className="min-h-[70vh] flex items-center px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-xl mx-auto w-full">
        <div className="glass rounded-3xl p-8 sm:p-12 text-center animate-slideUp mc-gradient-border relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-60 h-60 bg-green-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center shadow-2xl shadow-green-500/30 animate-pulseGlow">
              <CheckCircle className="w-12 h-12 text-white" strokeWidth={2.5} />
            </div>

            <h1 className="font-display font-bold text-3xl sm:text-4xl text-white mb-3">
              Order <span className="gradient-text">Successful!</span>
            </h1>
            <p className="text-gray-400 mb-2">
              Thank you for your purchase. Your order is confirmed.
            </p>
            <div className="inline-block px-4 py-1.5 rounded-full bg-white/5 text-sm text-gray-300 mb-8">
              Order ID: <span className="font-mono font-semibold text-white">{orderId}</span>
            </div>

            <div className="glass rounded-2xl p-5 mb-8 text-left space-y-3">
              <div className="flex items-start gap-3">
                <Package className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white text-sm">Instant Delivery</p>
                  <p className="text-xs text-gray-400">
                    Your items will be delivered to your Minecraft account within a few minutes.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Download className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white text-sm">Receipt Sent</p>
                  <p className="text-xs text-gray-400">
                    A confirmation email with your receipt has been sent to your inbox.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MessageCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white text-sm">Need Help?</p>
                  <p className="text-xs text-gray-400">
                    Join our Discord server if you have any questions or issues with your order.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                to="/"
                className="mc-btn w-full sm:w-auto px-8 flex items-center justify-center gap-2"
              >
                <Home className="w-5 h-5" />
                Back to Home
              </Link>
              <Link
                to="/store"
                className="mc-btn-outline w-full sm:w-auto px-8 flex items-center justify-center gap-2"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
