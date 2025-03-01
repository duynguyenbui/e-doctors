import React from 'react'

import { AuthProvider } from './AuthProvider'
import { SocketProvider } from './SocketProvider'

export const Providers: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <AuthProvider>
      <SocketProvider>{children}</SocketProvider>
    </AuthProvider>
  )
}
