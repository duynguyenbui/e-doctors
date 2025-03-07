'use client'

import SocketIndicator from '@/components/SocketIndicator'
import { useAuth } from '@/providers/AuthProvider'
import { useSocket } from '@/providers/SocketProvider'
import { useEffect, useState } from 'react'

export default function Home() {
  const { user } = useAuth()
  const { socket, isConnected } = useSocket()
  const [message, setMessage] = useState('N/A')

  useEffect(() => {
    if (!socket) return

    socket.on('chat:messages', ({ message }: { message: string }) => setMessage(message))

    return () => {
      socket.off('chat:messages', () => setMessage('N/A'))
    }
  }, [socket])

  return (
    <div className="text-xl font-bold">
      <h1>Chào mừng bạn đã trở về</h1>
      <div> đặt lịch hẹn với bác sĩ nhé bà</div>
      {message}
    </div>
  )
}
