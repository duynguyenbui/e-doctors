import { ReactNode } from 'react'

type LayoutProps = {
  children: ReactNode
}

import './globals.css'
import { Providers } from '@/providers'

export const metadata = {
  description: 'eDoctors - Your online doctor',
  title: 'eDoctors',
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <html>
      <Providers>
        <body>{children}</body>
      </Providers>
    </html>
  )
}

export default Layout
