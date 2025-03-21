'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { Bell } from 'lucide-react'
import Link from 'next/link'
import { useAuth } from '@/providers/AuthProvider'
import { motion, AnimatePresence } from 'framer-motion'

interface Notification {
  id: string
  message: string
  isRead: boolean
  recipient?: {
    name: string
  }
  diagnosisId?: {
    diagnosis: string
    diagnosisDate: string
    treatment: string
  }
}

async function fetchUnreadNotifications(): Promise<Notification[]> {
  try {
    const res = await fetch('/api/notifications')
    const data = await res.json()
    if (!Array.isArray(data.docs)) return []
    return data.docs.filter((n: Notification) => !n.isRead)
  } catch (error) {
    console.error('Lỗi lấy thông báo:', error)
    return []
  }
}

export default function NotificationBell() {
  const { user } = useAuth()
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const loadNotifications = useCallback(async () => {
    if (!user) return
    setLoading(true)
    const data = await fetchUnreadNotifications()
    setNotifications(data)
    setLoading(false)
  }, [user])

  useEffect(() => {
    loadNotifications()
    const interval = setInterval(loadNotifications, 30000)
    return () => clearInterval(interval)
  }, [loadNotifications])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => {
          setIsOpen((prev) => !prev)
          if (!isOpen) loadNotifications()
        }}
        className="relative p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
      >
        <Bell className="h-6 w-6 text-gray-600 dark:text-gray-200" />
        {notifications.length > 0 && (
          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white font-bold shadow">
            {notifications.length}
          </span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700"
          >
            <div className="p-2">
              {loading ? (
                <p className="text-center text-sm text-gray-500 py-3">Đang tải...</p>
              ) : notifications.length === 0 ? (
                <p className="text-center text-sm text-gray-500 py-3">Không có thông báo</p>
              ) : (
                <>
                  <ul className="max-h-60 overflow-auto">
                    {notifications.slice(0, 5).map((notif) => (
                      <li
                        key={notif.id}
                        className="p-3 border-b border-gray-200 dark:border-gray-700 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition cursor-pointer"
                      >
                        <p className="font-semibold">{notif.recipient?.name || 'Người dùng'}</p>
                        <div className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                          {notif.message}
                        </div>
                      </li>
                    ))}
                  </ul>
                  {notifications.length > 5 && (
                    <Link href="/notifications">
                      <p className="block text-center text-blue-500 py-2 font-medium hover:underline">
                        Xem tất cả
                      </p>
                    </Link>
                  )}
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
