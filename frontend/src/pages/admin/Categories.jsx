import { Plus, Crown, Key, Coins, Gift, Edit2, Trash2 } from 'lucide-react'

const mockCats = [
  { id: 'ranks', name: 'Ranks', description: 'Premium server ranks', count: 12, color: 'from-amber-500 to-orange-600', icon: Crown },
  { id: 'keys', name: 'Keys', description: 'Crate keys & bundles', count: 8, color: 'from-purple-500 to-pink-600', icon: Key },
  { id: 'coins', name: 'Coins', description: 'In-game currency', count: 6, color: 'from-yellow-400 to-amber-600', icon: Coins },
  { id: 'specials', name: 'Specials', description: 'Seasonal & limited', count: 4, color: 'from-rose-500 to-red-600', icon: Gift },
]

export default function AdminCategories() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 animate-slideUp">
        <div>
          <h1 className="font-display font-bold text-2xl sm:text-3xl text-white mb-1">
            Categories
          </h1>
          <p className="text-sm text-gray-400">
            Organize your packages into categories
          </p>
        </div>
        <button className="mc-btn px-6 py-3 text-sm flex items-center justify-center gap-2 whitespace-nowrap">
          <Plus className="w-4 h-4" />
          New Category
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {mockCats.map((cat, i) => {
          const Icon = cat.icon
          return (
            <div key={cat.id} className="mc-card relative animate-slideUp" style={{ animationDelay: `${i * 0.08}s` }}>
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center shadow-lg mb-4`}>
                <Icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-display font-bold text-xl text-white mb-1">{cat.name}</h3>
              <p className="text-sm text-gray-400 mb-4">{cat.description}</p>
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-white/5 text-xs font-semibold text-gray-300">
                  {cat.count} packages
                </span>
                <div className="flex items-center gap-1">
                  <button className="p-2 rounded-lg text-gray-500 hover:text-primary hover:bg-primary/10 transition-all">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button className="p-2 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition-all">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )
        })}

        <div className="glass rounded-2xl p-6 border-2 border-dashed border-white/10 hover:border-primary/40 transition-all cursor-pointer flex flex-col items-center justify-center min-h-[200px] group animate-slideUp">
          <div className="w-14 h-14 rounded-2xl bg-white/5 group-hover:bg-primary/20 flex items-center justify-center mb-4 transition-all">
            <Plus className="w-7 h-7 text-gray-500 group-hover:text-primary transition-colors" />
          </div>
          <p className="font-semibold text-white mb-1">Add Category</p>
          <p className="text-xs text-gray-500">Create a new category</p>
        </div>
      </div>
    </div>
  )
}
