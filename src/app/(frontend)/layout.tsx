import { ReactNode } from 'react'

type LayoutProps = {
  children: ReactNode
}

import './globals.css'

export const metadata = {
  description: 'eDoctors - Your online doctor',
  title: 'eDoctors',
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <html>
      <body>{children}</body>
    </html>
  )
}

export default Layout
