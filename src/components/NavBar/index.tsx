'use client'

import { useAuth } from '@/providers/AuthProvider'
/**
 * v0 by Vercel.
 * @see https://v0.dev/t/EhccAlv2fOc
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from 'next/link'

const linkItems = [
  {
    name: 'Home',
    href: '/',
  },
  {
    name: 'Blogs',
    href: '/blogs',
  },
  {
    name: 'Chat',
    href: '/chat',
    isLoggedIn: true,
  },
  {
    name: 'Profile',
    href: '/profile',
    isLoggedIn: true,
  },
  {
    name: 'Contact',
    href: '/contact',
  },
  {
    name: 'About',
    href: '/about',
  },
  {
    name: 'Login',
    href: '/login',
    isLoggedIn: false,
  },
  {
    name: 'Register',
    href: '/register',
    isLoggedIn: false,
  },
  {
    name: 'Logout',
    href: '/logout',
    isLoggedIn: true,
  },
]

export default function NavBar() {
  const { user } = useAuth()

  return (
    <header className="fixed top-0 z-50 w-full bg-white/80 backdrop-blur-sm shadow-sm dark:bg-gray-950/80">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2" prefetch={false}>
          <MountainIcon className="h-6 w-6" />
          <span className="text-lg font-bold">Acme Inc</span>
        </Link>
        <nav className="hidden space-x-6 md:flex">
          {linkItems
            .filter((item) => {
              // Show link if no login condition or if user is logged in
              return item.isLoggedIn === undefined || item.isLoggedIn === !!user
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
