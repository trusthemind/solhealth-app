import { createContext, useContext, useEffect, useState } from 'react'
import * as SecureStore from 'expo-secure-store'
import axios from 'axios'

interface IAuthContext {
  authState: { token?: string; authenticated: boolean }
  login: (token: string) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<IAuthContext>({
  authState: { token: undefined, authenticated: false },
  login: async () => {},
  logout: async () => {},
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authState, setAuthState] = useState<{
    token: string | undefined
    authenticated: boolean
  }>({
    token: undefined,
    authenticated: false,
  })

  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync('token')
      if (token) {
        setAuthState({ token, authenticated: true })
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      }
    }
    loadToken()
  }, [])

  const login = async (token: string) => {
    await SecureStore.setItemAsync('token', token)
    setAuthState({ token, authenticated: true })
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }

  const logout = async () => {
    await SecureStore.deleteItemAsync('token')
    setAuthState({ token: undefined, authenticated: false })
    delete axios.defaults.headers.common['Authorization']
  }

  return <AuthContext.Provider value={{ authState, login, logout }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
