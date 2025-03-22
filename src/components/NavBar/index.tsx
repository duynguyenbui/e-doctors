'use client'

import { useAuth } from '@/providers/AuthProvider'
/**
 * v0 by Vercel.
 * @see https://v0.dev/t/EhccAlv2fOc
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from 'next/link'
import { ModeToggle } from '../ModeToggle'
import { Button } from '../ui/button'
import { User } from 'lucide-react'
import { useRouter } from 'next/navigation'
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

  return (
    <header className="fixed top-0 z-50 w-full bg-white backdrop-blur-sm shadow-sm dark:bg-gray-950/80 mb-16">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2" prefetch={false}>
          <MountainIcon className="h-6 w-6" />
          <span className="text-lg font-bold">eDoctors</span>
        </Link>
        <nav className="hidden space-x-6 md:flex items-center">
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
              >
                {item.name}
              </Link>
            ))}

          {user && (
            <Button variant="ghost" className="text-sm font-bold hover:text-gray-900 dark:hover:text-gray-50" onClick={() => router.push('/profiles')}>
              <User className="h-4 w-4" />
              {user.name}
            </Button>
          )}
          <ModeToggle />
        </nav>
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
