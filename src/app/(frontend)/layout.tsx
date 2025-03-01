import { ReactNode } from 'react'

type LayoutProps = {
  children: ReactNode
}

import './globals.css'
import { Providers } from '@/providers'
import { ModeToggle } from '@/components/ModeToggle'

export const metadata = {
  description: 'eDoctors - Your online doctor',
  title: 'eDoctors',
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <html>
      <head>
        <link href="/favicon.png" rel="icon" />
      </head>
      <Providers>
        <body>{children}</body>
        <ModeToggle />
      </Providers>
    </html>
  )
}

export default Layout
