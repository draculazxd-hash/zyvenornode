import { useState } from 'react'
import { MessageCircle, Mail, ChevronDown, ChevronUp, HelpCircle, Search } from 'lucide-react'
import clsx from 'clsx'

const faqs = [
  {
    q: 'How quickly do I receive my purchased items?',
    a: 'All purchases are delivered instantly! As soon as your payment is confirmed, the items are automatically added to your Minecraft account. Just log in to the server to claim them.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We accept all major payment methods including UPI, Credit/Debit Cards, Net Banking, and popular wallets via Razorpay. We also support international payments via Stripe.',
  },
  {
    q: 'What is your refund policy?',
    a: 'Due to the digital nature of our products, refunds are generally not provided after delivery. However, if you encounter issues with your purchase, contact us within 7 days and we will work out a fair solution.',
  },
  {
    q: 'Can I upgrade my rank later?',
    a: 'Absolutely! Ranks are upgradable. Just contact our support team and you will only need to pay the difference in price between your current rank and the one you want.',
  },
  {
    q: 'Do I need to give my password?',
    a: 'Never! We will NEVER ask for your Minecraft or Discord password. All deliveries are made using just your Minecraft username.',
  },
  {
    q: 'I bought items but haven\'t received them yet. What should I do?',
    a: 'First, check your email for payment confirmation. If confirmed but not received, create a ticket in our Discord server with your order ID and we will resolve it within minutes.',
  },
  {
    q: 'Are purchases stackable or one-time?',
    a: 'Ranks are permanent and one-time. Keys and coins are consumable — you can purchase them multiple times and they add to your balance.',
  },
  {
    q: 'How can I contact support?',
    a: 'The fastest way is through our Discord server. You can also email us at support@zyvenormc.com. We typically respond within a few hours.',
  },
]

export default function Support() {
  const [openIdx, setOpenIdx] = useState(0)
  const [search, setSearch] = useState('')

  const filtered = faqs.filter(
    (f) =>
      f.q.toLowerCase().includes(search.toLowerCase()) ||
      f.a.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <div className="text-center max-w-3xl mx-auto mb-12 animate-slideUp">
        <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full glass mb-6">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center">
            <HelpCircle className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm font-semibold text-gray-200">Help & Support</span>
        </div>
        <h1 className="font-display font-bold text-4xl sm:text-5xl text-white mb-4 leading-tight">
          How can we <span className="gradient-text">help?</span>
        </h1>
        <p className="text-lg text-gray-400 leading-relaxed">
          Find answers to common questions below, or reach out to our support team
          directly. We're here 24/7.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 mb-12 animate-slideUp">
        <a
          href="https://discord.gg/zyvenormc"
          target="_blank"
          rel="noopener noreferrer"
          className="group mc-card flex items-center gap-4 !p-5 hover:!border-indigo-500/40"
        >
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30 group-hover:scale-110 transition-transform">
            <MessageCircle className="w-7 h-7 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-display font-bold text-lg text-white">Join our Discord</p>
            <p className="text-sm text-gray-400">Fastest support, tickets & community</p>
          </div>
          <span className="text-primary text-sm font-semibold hidden sm:block group-hover:translate-x-1 transition-transform">
            Join →
          </span>
        </a>

        <a
          href="mailto:support@zyvenormc.com"
          className="group mc-card flex items-center gap-4 !p-5 hover:!border-sky-500/40"
        >
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-500 to-cyan-600 flex items-center justify-center shadow-lg shadow-sky-500/30 group-hover:scale-110 transition-transform">
            <Mail className="w-7 h-7 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-display font-bold text-lg text-white">Email us</p>
            <p className="text-sm text-gray-400 truncate">support@zyvenormc.com</p>
          </div>
          <span className="text-primary text-sm font-semibold hidden sm:block group-hover:translate-x-1 transition-transform">
            Send →
          </span>
        </a>
      </div>

      <div className="glass rounded-3xl p-6 sm:p-8 animate-slideUp">
        <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
          <h2 className="font-display font-bold text-2xl text-white flex items-center gap-2">
            Frequently Asked Questions
          </h2>
          <div className="relative flex-1 sm:flex-none sm:w-72 min-w-[200px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search FAQs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="mc-input pl-10 py-2.5 text-sm"
            />
          </div>
        </div>

        <div className="space-y-2">
          {filtered.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-400">No FAQs match your search.</p>
            </div>
          ) : (
            filtered.map((faq, i) => {
              const isOpen = openIdx === i
              return (
                <div
                  key={i}
                  className={clsx(
                    'rounded-2xl transition-all duration-300 overflow-hidden',
                    isOpen ? 'bg-white/5 border border-white/10' : 'bg-white/[0.02] border border-transparent hover:bg-white/[0.04]'
                  )}
                >
                  <button
                    onClick={() => setOpenIdx(isOpen ? -1 : i)}
                    className="w-full flex items-center justify-between gap-4 px-5 sm:px-6 py-4 sm:py-5 text-left"
                  >
                    <span className="font-semibold text-white text-sm sm:text-base pr-4">
                      {faq.q}
                    </span>
                    <div
                      className={clsx(
                        'w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all',
                        isOpen ? 'bg-gradient-to-br from-primary to-secondary text-white' : 'bg-white/5 text-gray-400'
                      )}
                    >
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </div>
                  </button>
                  <div
                    className={clsx(
                      'grid transition-all duration-300',
                      isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    )}
                  >
                    <div className="overflow-hidden">
                      <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-0 text-gray-400 text-sm sm:text-base leading-relaxed border-t border-white/5 pt-4">
                        {faq.a}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>

      <div className="mt-10 text-center animate-slideUp">
        <p className="text-gray-400 mb-4">Still have questions?</p>
        <a
          href="https://discord.gg/zyvenormc"
          target="_blank"
          rel="noopener noreferrer"
          className="mc-btn inline-flex items-center gap-2 px-8"
        >
          <MessageCircle className="w-5 h-5" />
          Talk to us on Discord
        </a>
      </div>
    </div>
  )
}
