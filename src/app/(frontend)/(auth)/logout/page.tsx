'use client'

/**
 * v0 by Vercel.
 * @see https://v0.dev/t/EXdet7CS2Qj
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Button } from '@/components/ui/button'
import { useAuth } from '@/providers/AuthProvider'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Page() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (user) {
      Promise.resolve(logout())
        .then(() => {
          setMessage('You have been successfully logged out.')
        })
        .catch((_) => {
          setMessage('An error occurred during logout.')
        })
    } else {
      setMessage('You are already logged out.')
    }
  }, [logout, user])

  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md text-center">
        <LogOutIcon className="mx-auto h-12 w-12 text-primary" />
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Logging Out
        </h1>
        <p className="mt-4 text-muted-foreground">
          You are about to log out of your account. Are you sure you want to continue?
        </p>
        <div className="mt-6">
          <Button
            className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            onClick={() => {
              router.push('/')
            }}
          >
            Home
          </Button>
        </div>
      </div>
    </div>
  )
}

function LogOutIcon(props: any) {
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
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" x2="9" y1="12" y2="12" />
    </svg>
  )
}
