'use client'

import Image from 'next/image'
import Block from '@/components/UI/block/Block'
import { useWeather } from '@/hooks/useWeather'
import { mono } from '@/lib/fonts'

export default function WeatherBlock() {
	const { data, isLoading, isError } = useWeather()

	return (
		<Block heading="weather.json" icon="lucide:cloud-sun">
			{isLoading ? (
				<div className="flex animate-pulse items-center gap-4">
					<div className="h-14 w-14 rounded-md bg-neutral-300/40" />
					<div className="flex flex-col gap-2">
						<div className="h-4 w-20 rounded bg-neutral-300/40" />
						<div className="h-4 w-15 rounded bg-neutral-300/40" />
					</div>
				</div>
			) : isError || !data ? (
				<p className="font-bold text-red-500 text-sm">
					Не удалось загрузить погоду
				</p>
			) : (
				<div className="flex items-center gap-5">
					<div className="flex flex-col gap-1">
						<p
							className={`${mono.className} font-medium text-md sm:text-xl`}
						>
							{data.temp}°C
						</p>
						<p className="font-semibold text-neutral-700 text-sm dark:text-neutral-400">
							{data.condition}
						</p>
					</div>
					<div className="h-12 w-px bg-neutral-800 dark:bg-neutral-200" />
					<div className="flex size-16 items-center justify-center">
						<Image
							alt={data.condition}
							className="size-16 rounded-2xl bg-neutral-950/20 object-contain dark:bg-transparent"
							height={64}
							src={`https://openweathermap.org/img/wn/${data.icon}d@4x.png`}
							width={64}
						/>
					</div>
				</div>
			)}
		</Block>
	)
}
