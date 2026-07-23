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
    <html lang="en" style={{ colorScheme: 'light' }}>
      <head>
        <meta name="theme-color" content="#FAF9F5" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Archivo:wght@500;600;700&family=IBM+Plex+Mono:wght@400;500&family=Inter:ital,wght@0,400;0,500;1,400&family=Fraunces:ital,wght@1,600&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  )
}
