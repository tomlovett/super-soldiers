import type { Metadata } from 'next'
import ThemeRegistry from '@components/ThemeRegistry/ThemeRegistry'
import './globals.css'

export const metadata: Metadata = {
  title: 'Super Soldiers',
  description: 'The best in modern XCOM mission-tracking',
}

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en">
    <head>
      <meta name="viewport" content="initial-scale=1, width=device-width" />
    </head>

    <body>
      <ThemeRegistry>{children}</ThemeRegistry>
    </body>
  </html>
)

export default RootLayout
