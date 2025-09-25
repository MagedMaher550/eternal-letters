"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { User } from "@/lib/types"


interface AuthContextType {
  currentUser: User | null
  login: (user: User) => void
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check for stored user on mount
    const storedUser = localStorage.getItem("currentUser") as User | null
    if (storedUser && (storedUser === "maged" || storedUser === "alyana")) {
      setCurrentUser(storedUser)
    }
    setIsLoading(false)
  }, [])

  const login = (user: User) => {
    localStorage.setItem("currentUser", user)
    setCurrentUser(user)
  }

  const logout = () => {
    localStorage.removeItem("currentUser")
    setCurrentUser(null)
    router.push("/login")
  }

  return <AuthContext.Provider value={{ currentUser, login, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
