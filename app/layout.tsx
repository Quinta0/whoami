import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Pietro Quintavalle - Economics Student & Developer',
  description: 'Economics student at USI with extensive data analytics and web development expertise. Google-certified in Data Analytics and IT Support.',
  keywords: ['Pietro Quintavalle', 'Economics', 'Data Analytics', 'Web Development', 'Switzerland', 'USI'],
  authors: [{ name: 'Pietro Quintavalle' }],
  openGraph: {
    title: 'Pietro Quintavalle',
    description: 'Economics student at USI with extensive data analytics and web development expertise.',
    url: 'https://your-domain.com',
    siteName: 'Pietro Quintavalle Portfolio',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pietro Quintavalle - Economics Student & Developer',
    description: 'Economics student at USI with extensive data analytics and web development expertise.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  )
}