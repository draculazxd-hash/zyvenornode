import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import api from '../lib/axios.js'

export function useSettings() {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['settings'],
    queryFn: async () => {
      const res = await api.get('/settings')
      return res.data.data
    },
    staleTime: 5 * 60 * 1000,
  })

  useEffect(() => {
    if (data) {
      const root = document.documentElement
      root.style.setProperty('--primary', data.primaryColor || '#8b5cf6')
      root.style.setProperty('--secondary', data.secondaryColor || '#06b6d4')
      root.style.setProperty('--bg', data.bgColor || '#0f0a1e')
      root.style.setProperty('--card-bg', data.cardBgColor || 'rgba(30, 20, 60, 0.7)')
      root.style.setProperty('--text', data.textColor || '#e2e8f0')
      root.style.setProperty('--border-radius', data.borderRadius || '16px')
    }
  }, [data])

  return { settings: data, isLoading, error, refetch }
}
