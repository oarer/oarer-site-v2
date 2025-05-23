'use client'

import { useTheme } from 'next-themes'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import Link from 'next/link'

import { useSpotify } from '@/hooks/spotify/useSpotify'
import { useSpotifyGradient } from '@/hooks/spotify/useSpotifyGradient'
import Block from '@/components/UI/block/Block'
import { mono } from '@/lib/fonts'
import { useSpotifyProgress } from '@/hooks/spotify/useSpotifyProgress'
import CoverBlur from './components/CoverBlur'

export default function SpotifyBlock() {
  const { data } = useSpotify()
  const { t } = useTranslation()
  const { theme } = useTheme()

  const progress = useSpotifyProgress(data)
  const imageUrl =
    data?.cover_image ??
    'https://images-ext-1.discordapp.net/external/UM-fH2hrLGfeKs0z0QrzUi12BoI1W0W59xCRDeO2-K4/https/ptc.pwn3t.ru/708555202512289802.gif'
  const gradientGlow = useSpotifyGradient(
    imageUrl,
    theme === 'dark' ? 'dark' : 'light'
  )

  const formatTime = (ms = 0) => {
    const s = Math.floor(ms / 1000)
    return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`
  }

  const percent = data?.duration_ms ? (progress / data.duration_ms) * 100 : 0

  return (
    <Block className="z-2" heading="spotify.json" icon="mdi:spotify">
      {data?.is_playing ? (
        <div className="flex items-center gap-6">
          <CoverBlur gradient={gradientGlow} imageUrl={imageUrl} />

          <div className="flex w-full flex-col gap-2">
            <Link
              className="text-md w-fit font-semibold underline hover:opacity-80 dark:text-neutral-200"
              href={data.track_url || '#'}
            >
              {data.name}
            </Link>
            <p
              className={`${mono.className} text-sm font-semibold text-neutral-600`}
            >
              {data.artists?.map((a) => a.name).join(', ') || 'None'}
            </p>

            <div
              className={`${mono.className} flex w-2/3 justify-between text-xs text-neutral-700`}
            >
              <span>{formatTime(progress)}</span>
              <span>{formatTime(data.duration_ms)}</span>
            </div>

            <div className="relative h-1 w-2/3 overflow-hidden rounded bg-neutral-300/50 dark:bg-neutral-700/50">
              <motion.div
                className="absolute inset-0 rounded bg-green-500"
                style={{ width: `${percent}%` }}
                transition={{ ease: 'linear', duration: 0.5 }}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <div className="h-20 w-20 animate-pulse rounded-xl bg-neutral-400/30 dark:bg-neutral-800/50" />
          <div>
            <h1 className="text-md font-semibold dark:text-neutral-200">
              {t('spotify.title.none')}
            </h1>
            <p
              className={`${mono.className} text-xs font-semibold text-neutral-600`}
            >
              Not found
            </p>
          </div>
        </div>
      )}
    </Block>
  )
}
