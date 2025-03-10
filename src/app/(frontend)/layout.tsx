import { ReactNode } from 'react'
import './globals.css'
import { Providers } from '@/providers'
import NavBar from '@/components/NavBar'
import { Toaster } from 'sonner'
import { getServerSideURL } from '@/utilities/getURL'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { Metadata } from 'next'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import { cn } from '@/lib/utils'

type LayoutProps = {
  children: ReactNode
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html className={cn(GeistSans.variable, GeistMono.variable)} lang="vi" suppressHydrationWarning>
      <head>
        <link href="/favicon.png" rel="icon" />
      </head>
      <body>
        <Providers>
          <NavBar />
          <main className="min-h-[calc(100vh-4rem)] mt-16">{children}</main>
          <Toaster position="top-left" />
        </Providers>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    creator: '@eDoctors',
  },
}
