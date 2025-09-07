import type { Metadata } from 'next'
import { SpeedInsights } from '@vercel/speed-insights/next'

import '@/shared/styles/globals.css'

import { raleway } from '@/lib/fonts'
import Providers from '@/lib/providers'
import Footer from '@/components/Footer'
import TransitionEffect from '@/shared/TransitionsEffect'

export const metadata: Metadata = {
  title: 'oarer | biography',
  description:
    'Developer from Russia specializing in modern web technologies. I build Frontend with Next.js and Backend with Bun (ElysiaJS).',
  keywords: [
    'oarer',
    'developer',
    'FullStack',
    'Next.js',
    'Bun',
    'ElysiaJS',
    'DevOps',
    'web development',
    'frontend',
    'backend',
  ],
  metadataBase: new URL('https://oarer.fun'),
  robots: {
    index: true,
    follow: true,
    nocache: false,
  },
  openGraph: {
    type: 'website',
    title: 'oarer | biography',
    description:
      'Developer from Russia specializing in modern web technologies. I build Frontend with Next.js and Backend with Bun (ElysiaJS).',
    url: 'https://oarer.fun',
    siteName: 'oarer | biography',
    images: [
      {
        url: 'https://cdn.discordapp.com/avatars/708555202512289802/9141920a00169ecf7fed5c4ecb390578.png?size=512',
        alt: 'oarer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'oarer | biography',
    description:
      'Developer from Russia specializing in modern web technologies. I build Frontend with Next.js and Backend with Bun (ElysiaJS).',
    images: [
      'https://cdn.discordapp.com/avatars/708555202512289802/9141920a00169ecf7fed5c4ecb390578.png?size=512',
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html className="dark" lang="en">
      <body
        className={`${raleway.className} bg-neutral-100 transition-colors duration-800 ease-in-out dark:bg-neutral-950`}
      >
        <SpeedInsights />
        <Providers>
          <TransitionEffect>
            {children}
            <Footer />
          </TransitionEffect>
        </Providers>
      </body>
    </html>
  )
}
