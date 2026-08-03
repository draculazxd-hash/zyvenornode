import { Save, Palette, Layout, Mail, MessageCircle, RefreshCw } from 'lucide-react'
import { useState } from 'react'

export default function AdminSettings() {
  const [settings, setSettings] = useState({
    serverName: 'ZyvenorMC',
    serverIP: 'play.zyvenormc.com',
    serverPort: '25565',
    supportEmail: 'support@zyvenormc.com',
    discordLink: 'https://discord.gg/zyvenormc',
    twitterLink: 'https://twitter.com/zyvenormc',
    youtubeLink: 'https://youtube.com/@zyvenormc',
    currencySymbol: '₹',
    currencyCode: 'INR',
    taxRate: '18',
    featuredLimit: '4',
    allowGuestCheckout: true,
    requireDiscord: false,
    instantDelivery: true,
    maintenanceMode: false,
  })

  const update = (k, v) => setSettings((p) => ({ ...p, [k]: v }))

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 animate-slideUp">
        <div>
          <h1 className="font-display font-bold text-2xl sm:text-3xl text-white mb-1">
            Settings
          </h1>
          <p className="text-sm text-gray-400">
            Configure your store settings
          </p>
        </div>
        <div className="flex gap-2">
          <button className="mc-btn-outline px-6 py-3 text-sm flex items-center justify-center gap-2 whitespace-nowrap">
            <RefreshCw className="w-4 h-4" />
            Reset
          </button>
          <button className="mc-btn px-6 py-3 text-sm flex items-center justify-center gap-2 whitespace-nowrap">
            <Save className="w-4 h-4" />
            Save Changes
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="mc-card !p-5 sm:!p-6 animate-slideUp">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Layout className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-display font-bold text-lg text-white">Server Settings</h2>
              <p className="text-xs text-gray-400">Basic server information</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Server Name" value={settings.serverName} onChange={(v) => update('serverName', v)} />
              <Field label="Server IP" value={settings.serverIP} onChange={(v) => update('serverIP', v)} />
              <Field label="Server Port" value={settings.serverPort} onChange={(v) => update('serverPort', v)} />
              <Field label="Currency Code" value={settings.currencyCode} onChange={(v) => update('currencyCode', v)} />
              <Field label="Currency Symbol" value={settings.currencySymbol} onChange={(v) => update('currencySymbol', v)} />
              <Field label="Tax Rate (%)" value={settings.taxRate} onChange={(v) => update('taxRate', v)} type="number" />
            </div>
          </div>
        </div>

        <div className="mc-card !p-5 sm:!p-6 animate-slideUp">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-display font-bold text-lg text-white">Links & Social</h2>
              <p className="text-xs text-gray-400">External URLs and contact info</p>
            </div>
          </div>
          <div className="space-y-4">
            <Field label="Support Email" value={settings.supportEmail} onChange={(v) => update('supportEmail', v)} type="email" />
            <Field label="Discord Invite Link" value={settings.discordLink} onChange={(v) => update('discordLink', v)} />
            <Field label="Twitter URL" value={settings.twitterLink} onChange={(v) => update('twitterLink', v)} />
            <Field label="YouTube URL" value={settings.youtubeLink} onChange={(v) => update('youtubeLink', v)} />
            <Field label="Featured Packages Limit" value={settings.featuredLimit} onChange={(v) => update('featuredLimit', v)} type="number" />
          </div>
        </div>

        <div className="lg:col-span-2 mc-card !p-5 sm:!p-6 animate-slideUp">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center">
              <Palette className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-display font-bold text-lg text-white">General Preferences</h2>
              <p className="text-xs text-gray-400">Store behavior toggles</p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { key: 'allowGuestCheckout', label: 'Allow Guest Checkout', desc: 'Customers can buy without account' },
              { key: 'requireDiscord', label: 'Require Discord', desc: 'Require Discord ID for orders' },
              { key: 'instantDelivery', label: 'Instant Delivery', desc: 'Auto-deliver on payment success' },
              { key: 'maintenanceMode', label: 'Maintenance Mode', desc: 'Disable store for visitors' },
            ].map((opt) => (
              <label
                key={opt.key}
                className="flex items-start gap-3 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/30 cursor-pointer transition-all"
              >
                <div className="relative mt-0.5">
                  <input
                    type="checkbox"
                    checked={settings[opt.key]}
                    onChange={(e) => update(opt.key, e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 rounded-full bg-gray-700 peer-checked:bg-gradient-to-r peer-checked:from-primary peer-checked:to-secondary transition-all"></div>
                  <div className="absolute left-0.5 top-0.5 w-5 h-5 rounded-full bg-white peer-checked:translate-x-5 transition-transform shadow"></div>
                </div>
                <div>
                  <p className="font-semibold text-sm text-white">{opt.label}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{opt.desc}</p>
                </div>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function Field({ label, value, onChange, type = 'text' }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-1.5">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mc-input"
      />
    </div>
  )
}
