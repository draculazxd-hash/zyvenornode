import { useState } from 'react'
import { Save, RefreshCw, Palette, Type, LayoutGrid, Sparkles, Check2 } from 'lucide-react'

const presets = [
  { name: 'Default', primary: '#8b5cf6', secondary: '#06b6d4', bg: '#0f0a1e' },
  { name: 'Sunset', primary: '#f97316', secondary: '#ec4899', bg: '#1a0a14' },
  { name: 'Ocean', primary: '#0ea5e9', secondary: '#14b8a6', bg: '#0a1420' },
  { name: 'Emerald', primary: '#10b981', secondary: '#22c55e', bg: '#0a1a14' },
  { name: 'Ruby', primary: '#ef4444', secondary: '#f97316', bg: '#1a0a0a' },
  { name: 'Gold', primary: '#f59e0b', secondary: '#eab308', bg: '#1a1608' },
]

export default function AdminTheme() {
  const [theme, setTheme] = useState({
    primaryColor: '#8b5cf6',
    secondaryColor: '#06b6d4',
    bgColor: '#0f0a1e',
    cardBgColor: 'rgba(30, 20, 60, 0.7)',
    textColor: '#e2e8f0',
    borderRadius: '16px',
  })

  const [activePreset, setActivePreset] = useState('Default')

  const applyPreset = (preset) => {
    setActivePreset(preset.name)
    setTheme({
      ...theme,
      primaryColor: preset.primary,
      secondaryColor: preset.secondary,
      bgColor: preset.bg,
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 animate-slideUp">
        <div>
          <h1 className="font-display font-bold text-2xl sm:text-3xl text-white mb-1">
            Theme Editor
          </h1>
          <p className="text-sm text-gray-400">
            Customize colors, styling, and appearance
          </p>
        </div>
        <div className="flex gap-2">
          <button className="mc-btn-outline px-6 py-3 text-sm flex items-center justify-center gap-2 whitespace-nowrap">
            <RefreshCw className="w-4 h-4" />
            Reset
          </button>
          <button className="mc-btn px-6 py-3 text-sm flex items-center justify-center gap-2 whitespace-nowrap">
            <Save className="w-4 h-4" />
            Save & Apply
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="mc-card !p-5 sm:!p-6 animate-slideUp">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="font-display font-bold text-lg text-white">Color Presets</h2>
                <p className="text-xs text-gray-400">Choose from curated themes</p>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {presets.map((p) => (
                <button
                  key={p.name}
                  onClick={() => applyPreset(p)}
                  className="relative p-4 rounded-2xl border-2 transition-all group"
                  style={{
                    background: p.bg,
                    borderColor: activePreset === p.name ? p.primary : 'rgba(255,255,255,0.1)',
                  }}
                >
                  {activePreset === p.name && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white text-primary flex items-center justify-center shadow-lg">
                      <Check2 className="w-4 h-4" />
                    </div>
                  )}
                  <div className="flex gap-2 mb-3">
                    <div className="w-8 h-8 rounded-lg" style={{ backgroundColor: p.primary }}></div>
                    <div className="w-8 h-8 rounded-lg" style={{ backgroundColor: p.secondary }}></div>
                  </div>
                  <p className="text-sm font-semibold text-white">{p.name}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="mc-card !p-5 sm:!p-6 animate-slideUp">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Palette className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="font-display font-bold text-lg text-white">Custom Colors</h2>
                <p className="text-xs text-gray-400">Fine tune your brand colors</p>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { key: 'primaryColor', label: 'Primary Color' },
                { key: 'secondaryColor', label: 'Secondary Color' },
                { key: 'bgColor', label: 'Background' },
                { key: 'textColor', label: 'Text Color' },
                { key: 'cardBgColor', label: 'Card Background' },
                { key: 'borderRadius', label: 'Border Radius (px)', type: 'text' },
              ].map((f) => (
                <div key={f.key}>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">{f.label}</label>
                  {f.type === 'text' || !f.key.includes('Color') || f.key === 'cardBgColor' ? (
                    <input
                      type="text"
                      value={theme[f.key]}
                      onChange={(e) => setTheme({ ...theme, [f.key]: e.target.value })}
                      className="mc-input font-mono text-sm"
                    />
                  ) : (
                    <div className="flex gap-2">
                      <div className="relative">
                        <input
                          type="color"
                          value={theme[f.key]}
                          onChange={(e) => setTheme({ ...theme, [f.key]: e.target.value })}
                          className="w-12 h-12 rounded-xl cursor-pointer p-1 bg-white/5 border border-white/10"
                        />
                      </div>
                      <input
                        type="text"
                        value={theme[f.key]}
                        onChange={(e) => setTheme({ ...theme, [f.key]: e.target.value })}
                        className="mc-input font-mono text-sm flex-1"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="mc-card !p-5 sm:!p-6 animate-slideUp">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center">
                <LayoutGrid className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="font-display font-bold text-lg text-white">Live Preview</h2>
                <p className="text-xs text-gray-400">How your store looks</p>
              </div>
            </div>

            <div
              className="rounded-2xl p-4 min-h-[360px] border border-white/10"
              style={{ backgroundColor: theme.bgColor }}
            >
              <div
                className="flex items-center justify-between mb-4 p-3 rounded-xl backdrop-blur-xl border"
                style={{
                  background: theme.cardBgColor,
                  borderColor: 'rgba(255,255,255,0.1)',
                }}
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg, ${theme.primaryColor}, ${theme.secondaryColor})`,
                    }}
                  >
                    <span className="text-white text-xs font-bold">Z</span>
                  </div>
                  <span className="font-bold text-sm" style={{ color: theme.textColor }}>
                    Store
                  </span>
                </div>
                <div className="w-6 h-6 rounded-full bg-white/10"></div>
              </div>

              <div className="space-y-2 mb-4">
                <div
                  className="h-5 rounded-lg w-3/4 opacity-30"
                  style={{
                    background: `linear-gradient(90deg, ${theme.primaryColor}, ${theme.secondaryColor})`,
                  }}
                ></div>
                <div className="h-3 rounded-lg bg-white/10 w-1/2"></div>
              </div>

              <div className="grid grid-cols-2 gap-2 mb-4">
                {[1, 2].map((i) => (
                  <div
                    key={i}
                    className="rounded-xl p-3 backdrop-blur-xl border transition-all hover:-translate-y-0.5"
                    style={{
                      background: theme.cardBgColor,
                      borderColor: 'rgba(255,255,255,0.1)',
                    }}
                  >
                    <div className="w-full h-16 rounded-lg bg-white/10 mb-2"></div>
                    <div className="h-3 rounded bg-white/20 w-3/4 mb-1"></div>
                    <div
                      className="h-4 rounded mt-2"
                      style={{
                        background: `linear-gradient(90deg, ${theme.primaryColor}, ${theme.secondaryColor})`,
                        width: '40%',
                      }}
                    ></div>
                  </div>
                ))}
              </div>

              <button
                className="w-full py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:shadow-lg"
                style={{
                  background: `linear-gradient(135deg, ${theme.primaryColor}, ${theme.secondaryColor})`,
                  borderRadius: theme.borderRadius,
                }}
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
