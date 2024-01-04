import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Super Soldiers',
  description: 'The best in modern XCOM mission-tracking',
}

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en">
    <head>
      <meta name="viewport" content="initial-scale=1, width=device-width" />
    </head>

    <body className={`container px-6 ${inter.className}`}>{children}</body>
  </html>
)

export default RootLayout
