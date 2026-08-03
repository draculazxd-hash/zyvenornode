import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import api from '../lib/axios.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const savedToken = localStorage.getItem('zyvenormc_token')
    const savedUser = localStorage.getItem('zyvenormc_user')
    if (savedToken && savedUser) {
      setToken(savedToken)
      setUser(JSON.parse(savedUser))
    }
    setLoading(false)
  }, [])

  const login = useCallback(async (email, password) => {
    const res = await api.post('/auth/login', { email, password })
    const { token: newToken, user: newUser } = res.data
    localStorage.setItem('zyvenormc_token', newToken)
    localStorage.setItem('zyvenormc_user', JSON.stringify(newUser))
    setToken(newToken)
    setUser(newUser)
    return newUser
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('zyvenormc_token')
    localStorage.removeItem('zyvenormc_user')
    setToken(null)
    setUser(null)
  }, [])

  const me = useCallback(async () => {
    try {
      const res = await api.get('/auth/me')
      const newUser = res.data.user
      localStorage.setItem('zyvenormc_user', JSON.stringify(newUser))
      setUser(newUser)
      return newUser
    } catch (e) {
      logout()
      throw e
    }
  }, [logout])

  const isAdmin = user?.role === 'admin'

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout, me, isAdmin }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
