'use client'

import { useAuth } from '@/providers/AuthProvider'
import Link from 'next/link'
import { ModeToggle } from '../ModeToggle'
import { Button } from '../ui/button'
import { User, Menu } from 'lucide-react' // Thêm Menu icon từ lucide-react
import { useRouter } from 'next/navigation'
import { useState } from 'react' // Thêm useState để toggle menu

const linkItems = [
  {
    name: 'Trang chủ',
    href: '/',
  },
  {
    name: 'Bài viết',
    href: '/posts',
  },
  {
    name: 'Tìm kiếm',
    href: '/search',
  },
  {
    name: 'Hồ sơ bệnh án',
    href: '/medical-records',
    isLoggedIn: true,
  },
  {
    name: 'Hỗ trợ bệnh nhân',
    href: '/conversations/respondent',
    isLoggedIn: true,
    isDoctor: true,
  },
  {
    name: 'Trò chuyện',
    href: '/conversations',
    isLoggedIn: true,
  },
  {
    name: 'Đăng nhập',
    href: '/login',
    isLoggedIn: false,
  },
  {
    name: 'Đăng ký',
    href: '/register',
    isLoggedIn: false,
  },
  {
    name: 'Quản trị',
    href: '/admin',
    isLoggedIn: true,
    isAdmin: true,
  },
  {
    name: 'Đăng xuất',
    href: '/logout',
    isLoggedIn: true,
  },
]

export default function NavBar() {
  const { user } = useAuth()
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false) // State để toggle menu mobile

  return (
    <header className="fixed top-0 z-50 w-full bg-[#AFCAD3] backdrop-blur-sm shadow-sm dark:bg-gray-950/80 mb-16">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2" prefetch={false}>
          <MountainIcon className="h-5 w-5 sm:h-6 sm:w-6" />
          <span className="text-base sm:text-lg font-bold">eDoctors</span>
        </Link>

        {/* Hamburger Button cho mobile */}
        <Button
          variant="ghost"
          className="sm:hidden" // Chỉ hiển thị trên mobile
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Menu className="h-6 w-6" />
        </Button>

        {/* Menu điều hướng cho desktop */}
        <nav className="hidden sm:flex space-x-4 lg:space-x-6 items-center">
          {linkItems
            .filter((item) => {
              const loginCondition = item.isLoggedIn === undefined || item.isLoggedIn === !!user
              const adminCondition = item.isAdmin === undefined || (item.isAdmin && user?.roles?.includes('admin'))
              const doctorCondition = item.isDoctor === undefined || (item.isDoctor && user?.roles?.includes('doctor'))
              return loginCondition && adminCondition && doctorCondition
            })
            .map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-xs sm:text-sm font-medium hover:text-gray-900 dark:hover:text-gray-50"
              >
                {item.name}
              </Link>
            ))}
          {user && (
            <Button
              variant="ghost"
              className="text-xs sm:text-sm font-bold hover:text-gray-900 dark:hover:text-gray-50"
              onClick={() => router.push('/profiles')}
            >
              <User className="h-3 w-3 sm:h-4 sm:w-4" />
              {user.name}
            </Button>
          )}
          <ModeToggle />
        </nav>

        {/* Menu mobile (dropdown) */}
        {isMenuOpen && (
          <nav className="sm:hidden absolute top-16 left-0 w-full bg-[#AFCAD3] dark:bg-gray-950/80 flex flex-col items-center py-4 space-y-4">
            {linkItems
              .filter((item) => {
                const loginCondition = item.isLoggedIn === undefined || item.isLoggedIn === !!user
                const adminCondition = item.isAdmin === undefined || (item.isAdmin && user?.roles?.includes('admin'))
                const doctorCondition = item.isDoctor === undefined || (item.isDoctor && user?.roles?.includes('doctor'))
                return loginCondition && adminCondition && doctorCondition
              })
              .map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium hover:text-gray-900 dark:hover:text-gray-50"
                  onClick={() => setIsMenuOpen(false)} // Đóng menu khi click link
                >
                  {item.name}
                </Link>
              ))}
            {user && (
              <Button
                variant="ghost"
                className="text-sm font-bold hover:text-gray-900 dark:hover:text-gray-50"
                onClick={() => {
                  router.push('/profiles')
                  setIsMenuOpen(false) // Đóng menu khi click
                }}
              >
                <User className="h-4 w-4" />
                {user.name}
              </Button>
            )}
            <ModeToggle />
          </nav>
        )}
      </div>
    </header>
  )
}

function MountainIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  )
}