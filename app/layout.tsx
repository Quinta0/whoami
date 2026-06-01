import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Pietro Quintavalle',
  description: 'Systems Engineer · Developer · Homelabber. Economics student at USI Lugano with 5+ years building production-grade infrastructure.',
  keywords: ['Pietro Quintavalle', 'Systems Engineer', 'Homelab', 'SysAdmin', 'Economics', 'USI', 'Switzerland'],
  authors: [{ name: 'Pietro Quintavalle' }],
  openGraph: {
    title: 'Pietro Quintavalle',
    description: 'Systems Engineer · Developer · Homelabber',
    siteName: 'Pietro Quintavalle',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  )
}
