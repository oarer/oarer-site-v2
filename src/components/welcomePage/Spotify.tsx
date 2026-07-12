'use client'

import { domAnimation, LazyMotion, m } from 'motion/react'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { useTranslation } from 'react-i18next'
import Block from '@/components/UI/block/Block'
import { useLastfm } from '@/hooks/lastfm/useLastfm'
import { useLastfmGradient } from '@/hooks/lastfm/useLastfmGradient'
import { useLastfmProgress } from '@/hooks/lastfm/useLastfmProgress'
import { mono } from '@/lib/fonts'
import CoverBlur from './components/CoverBlur'

export default function LastFmBlock() {
	const { data } = useLastfm()
	const { t } = useTranslation()
	const { theme } = useTheme()

	const progress = useLastfmProgress(data)
	const imageUrl =
		data?.cover_image ??
		'https://images-ext-1.discordapp.net/external/UM-fH2hrLGfeKs0z0QrzUi12BoI1W0W59xCRDeO2-K4/https/ptc.pwn3t.ru/708555202512289802.gif'
	const gradientGlow = useLastfmGradient(
		imageUrl,
		theme === 'dark' ? 'dark' : 'light'
	)

	const formatTime = (ms = 0) => {
		const s = Math.floor(ms / 1000)
		return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`
	}

	const percent = data?.duration_ms ? (progress / data.duration_ms) * 100 : 0

	return (
		<Block className="z-2" heading="lastfm.json" icon="mdi:lastfm">
			{data?.is_playing ? (
				<div className="flex items-center gap-6">
					<CoverBlur gradient={gradientGlow} imageUrl={imageUrl} />

					<div className="flex w-full flex-col gap-2">
						<Link
							className="w-fit font-semibold text-md underline hover:opacity-80 dark:text-neutral-200"
							href={data.track_url || '#'}
						>
							{data.name}
						</Link>
						<p
							className={`${mono.className} font-semibold text-neutral-600 text-sm dark:text-neutral-400`}
						>
							{data.artists?.map((a) => a.name).join(', ') ||
								'None'}
						</p>

						<div
							className={`${mono.className} flex justify-between text-neutral-700 text-xs dark:text-neutral-500`}
						>
							<span>{formatTime(progress)}</span>
							<span>{formatTime(data.duration_ms)}</span>
						</div>

						<LazyMotion features={domAnimation}>
							<div className="relative h-1 overflow-hidden rounded bg-neutral-300/50 dark:bg-neutral-700/50">
								<m.div
									className="absolute inset-0 rounded bg-green-500"
									style={{ width: `${percent}%` }}
									transition={{
										ease: 'linear',
										duration: 0.5,
									}}
								/>
							</div>
						</LazyMotion>
					</div>
				</div>
			) : (
				<div className="flex items-center gap-4">
					<div className="size-25 animate-pulse rounded-xl bg-neutral-400/30 dark:bg-neutral-800/50" />
					<div>
						<h1 className="font-semibold text-md dark:text-neutral-200">
							{t('spotify.title.none')}
						</h1>
						<p
							className={`${mono.className} font-semibold text-neutral-600 text-xs`}
						>
							Not found
						</p>
					</div>
				</div>
			)}
		</Block>
	)
}
