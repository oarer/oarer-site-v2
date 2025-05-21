'use client'

import Image from 'next/image'

import { useWeather } from '@/hooks/useWeather'
import Block from '@/components/UI/block/Block'
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
        <p className="text-sm font-bold text-red-500">
          Не удалось загрузить погоду
        </p>
      ) : (
        <div className="flex min-h-[64px] items-center gap-5">
          <div className="flex flex-col">
            <p className={`${mono.className} text-lg font-medium`}>
              {data.temp}°C
            </p>
            <p className="text-[12px] font-semibold text-neutral-500">
              {data.condition}
            </p>
          </div>
          <div className="h-12 w-px bg-neutral-800 dark:bg-neutral-200" />
          <div className="flex h-[64px] w-[64px] items-center justify-center">
            <Image
              alt={data.condition}
              className="h-[64px] w-[64px] rounded-2xl bg-neutral-950/20 object-contain dark:bg-transparent"
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
