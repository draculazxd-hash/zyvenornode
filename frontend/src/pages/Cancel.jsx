import { Link } from 'react-router-dom'
import { XCircle, ShoppingCart, MessageCircle, RefreshCw } from 'lucide-react'

export default function Cancel() {
  return (
    <div className="min-h-[70vh] flex items-center px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-xl mx-auto w-full">
        <div className="glass rounded-3xl p-8 sm:p-12 text-center animate-slideUp mc-gradient-border relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-60 h-60 bg-red-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-red-400 to-rose-600 flex items-center justify-center shadow-2xl shadow-red-500/30">
              <XCircle className="w-12 h-12 text-white" strokeWidth={2.5} />
            </div>

            <h1 className="font-display font-bold text-3xl sm:text-4xl text-white mb-3">
              Order <span className="text-red-400">Cancelled</span>
            </h1>
            <p className="text-gray-400 mb-8">
              Your payment was cancelled or not completed. No charges were made.
            </p>

            <div className="glass rounded-2xl p-5 mb-8 text-left space-y-3">
              <div className="flex items-start gap-3">
                <ShoppingCart className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white text-sm">Items Still in Cart</p>
                  <p className="text-xs text-gray-400">
                    Your items are still saved in the cart. You can try again anytime.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MessageCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white text-sm">Payment Issues?</p>
                  <p className="text-xs text-gray-400">
                    Contact our support team on Discord for alternative payment methods.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                to="/cart"
                className="mc-btn w-full sm:w-auto px-8 flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-5 h-5" />
                Try Again
              </Link>
              <Link
                to="/support"
                className="mc-btn-outline w-full sm:w-auto px-8 flex items-center justify-center gap-2"
              >
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
