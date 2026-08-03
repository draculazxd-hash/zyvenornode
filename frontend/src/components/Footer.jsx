import { Link } from 'react-router-dom'
import { MessageCircle, Twitter, Youtube, Mail, Gamepad2, Heart } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 mt-20">
      <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Gamepad2 className="w-6 h-6 text-white" />
              </div>
              <span className="font-display font-bold text-xl">
                <span className="gradient-text">Zyvenor</span>
                <span className="text-white">MC</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              The ultimate Minecraft experience. Premium ranks, exclusive keys, and
              in-game currency to enhance your adventure.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://discord.gg/zyvenormc"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/5 hover:bg-indigo-500/20 text-gray-400 hover:text-indigo-400 flex items-center justify-center transition-all duration-300 transform hover:scale-110"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com/zyvenormc"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/5 hover:bg-sky-500/20 text-gray-400 hover:text-sky-400 flex items-center justify-center transition-all duration-300 transform hover:scale-110"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://youtube.com/@zyvenormc"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/5 hover:bg-red-500/20 text-gray-400 hover:text-red-400 flex items-center justify-center transition-all duration-300 transform hover:scale-110"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a
                href="mailto:support@zyvenormc.com"
                className="w-10 h-10 rounded-xl bg-white/5 hover:bg-primary/20 text-gray-400 hover:text-primary flex items-center justify-center transition-all duration-300 transform hover:scale-110"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold text-white mb-4">Shop</h4>
            <ul className="space-y-2.5">
              {['Ranks', 'Keys', 'Coins', 'Store'].map((item) => (
                <li key={item}>
                  <Link
                    to={`/${item.toLowerCase()}`}
                    className="text-gray-400 hover:text-white text-sm transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-primary/0 group-hover:bg-primary transition-all"></span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-white mb-4">Support</h4>
            <ul className="space-y-2.5">
              <li>
                <Link
                  to="/support"
                  className="text-gray-400 hover:text-white text-sm transition-colors duration-300 flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 rounded-full bg-primary/0 group-hover:bg-primary transition-all"></span>
                  Help Center
                </Link>
              </li>
              <li>
                <a
                  href="mailto:support@zyvenormc.com"
                  className="text-gray-400 hover:text-white text-sm transition-colors duration-300 flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 rounded-full bg-primary/0 group-hover:bg-primary transition-all"></span>
                  support@zyvenormc.com
                </a>
              </li>
              <li>
                <a
                  href="https://discord.gg/zyvenormc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white text-sm transition-colors duration-300 flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 rounded-full bg-primary/0 group-hover:bg-primary transition-all"></span>
                  Discord Server
                </a>
              </li>
              <li>
                <Link
                  to="/support"
                  className="text-gray-400 hover:text-white text-sm transition-colors duration-300 flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 rounded-full bg-primary/0 group-hover:bg-primary transition-all"></span>
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-2.5">
              {['Terms of Service', 'Privacy Policy', 'Refund Policy'].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white text-sm transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-primary/0 group-hover:bg-primary transition-all"></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} ZyvenorMC. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm flex items-center gap-2">
            Made with <Heart className="w-4 h-4 text-red-500 fill-current" /> for the
            Minecraft Community
          </p>
        </div>
      </div>
    </footer>
  )
}
