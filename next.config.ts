import crypto from 'crypto'

import type { NextConfig } from 'next'
import utwm from 'unplugin-tailwindcss-mangle/webpack'

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

function generateWhyHash(original: string): string {
  const hash = crypto
    .createHash('sha256')
    .update(original)
    .digest('base64')
    .replace(/[^a-zA-Z0-9]/g, '')
    .slice(0, 6)

  return `why-${hash}`
}

const cache = new Map<string, string>()

const nextConfig: NextConfig = {
  webpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      config.plugins.push(
        utwm({
          classGenerator: {
            classPrefix: 'why-',
            customGenerate: (original) => {
              if (cache.has(original)) return cache.get(original)
              const hashed = generateWhyHash(original)
              cache.set(original, hashed)
              return hashed
            },
          },
        })
      )
      return config
    }
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.discordapp.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'media.discordapp.net',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'openweathermap.org',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.scdn.co',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'ptc.pwn3t.ru',
        pathname: '/**',
      },
    ],
  },
}

module.exports = withBundleAnalyzer(nextConfig)
