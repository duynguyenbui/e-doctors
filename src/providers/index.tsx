'use client'

import React, { useEffect, useState } from 'react'

import { AuthProvider } from './AuthProvider'
import { SocketProvider } from './SocketProvider'
import { ThemeProvider } from './ThemeProvider'

export const Providers: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return null
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <AuthProvider>
        <SocketProvider>{children}</SocketProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}
