'use client'

import Hero from '@/components/Hero'
import { useSocket } from '@/providers/SocketProvider'
import { useEffect, useState } from 'react'

export default function Page() {
  const { socket, isConnected } = useSocket()
  const [message, setMessage] = useState('N/A')

  useEffect(() => {
    if (!socket || !isConnected) return

    socket.on('chat:messages', ({ message }: { message: string }) => setMessage(message))

    return () => {
      socket.off('chat:messages')
    }
  }, [socket, isConnected])

  return <Hero />
}
