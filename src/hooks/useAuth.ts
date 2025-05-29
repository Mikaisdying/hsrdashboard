import React, { createContext, useContext, useState, useCallback } from 'react'
import type { ReactNode } from 'react'

type IUser = {
  id: string | number
  username: string
  fullName: string
  email: string
  avatar?: string
  [key: string]: any
}

interface AuthContextProps {
  isAuthenticated: boolean
  userInfo: IUser | null
  login: (username: string, password: string) => Promise<boolean>
  logout: () => void
  updateUserInfo: (user: Partial<IUser>) => void
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined)

export const AuthProvider = (props: { children: ReactNode }) => {
  const [userInfo, setUserInfo] = useState<IUser | null>(null)
  const isAuthenticated = !!userInfo

  const login = useCallback(async (email: string, password: string) => {
    try {
      const res = await fetch(`/users?q=${email}`)
      const users: IUser[] = await res.json()
      const user = users.find((u) => u.email === email && u.password === password)
      if (user) {
        setUserInfo(user)
        return true
      }
      return false
    } catch {
      return false
    }
  }, [])

  const logout = useCallback(() => {
    setUserInfo(null)
  }, [])

  const updateUserInfo = useCallback((user: Partial<IUser>) => {
    setUserInfo((prev) => (prev ? { ...prev, ...user } : prev))
  }, [])

  return React.createElement(
    AuthContext.Provider,
    { value: { isAuthenticated, userInfo, login, logout, updateUserInfo } },
    props.children
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
