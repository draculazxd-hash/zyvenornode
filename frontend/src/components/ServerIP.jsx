import { useState } from 'react'
import { Copy, Check, Box } from 'lucide-react'
import { useToast } from './Toasts/ToastContext.jsx'

export default function ServerIP({ ip = 'play.zyvenormc.com' }) {
  const [copied, setCopied] = useState(false)
  const { showToast } = useToast()

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(ip)
      setCopied(true)
      showToast('Server IP copied to clipboard!', 'success')
      setTimeout(() => setCopied(false), 2000)
    } catch {
      showToast('Failed to copy IP', 'error')
    }
  }

  return (
    <div className="inline-flex items-stretch overflow-hidden rounded-2xl glass mc-gradient-border animate-slideUp">
      <div className="flex items-center gap-3 px-5 py-4 bg-gradient-to-br from-primary/20 to-secondary/20">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/30">
          <Box className="w-5 h-5 text-white" />
        </div>
        <div className="pr-2">
          <p className="text-xs text-gray-400 uppercase tracking-wider font-medium">
            Server IP
          </p>
          <p className="font-display font-bold text-white text-lg tracking-wide">
            {ip}
          </p>
        </div>
      </div>
      <button
        onClick={handleCopy}
        className="px-5 flex items-center justify-center bg-white/5 hover:bg-white/10 border-l border-white/10 transition-all duration-300 group"
      >
        {copied ? (
          <Check className="w-5 h-5 text-green-400" />
        ) : (
          <Copy className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
        )}
      </button>
    </div>
  )
}
