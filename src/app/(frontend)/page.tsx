'use client'

import SocketIndicator from '@/components/SocketIndicator'
import { useSocket } from '@/providers/SocketProvider'
import { useEffect, useState } from 'react'

export default function Home() {
  const { socket, isConnected } = useSocket()
  const [message, setMessage] = useState('N/A')

  useEffect(() => {
    if (!socket || !isConnected) return

    socket.on('chat:messages', ({ message }: { message: string }) => setMessage(message))

    return () => {
      socket.off('chat:messages')
    }
  }, [socket, isConnected])

  return (
    <div className="text-xl font-bold">
      <SocketIndicator />
      {message}
    </div>
  )
}
