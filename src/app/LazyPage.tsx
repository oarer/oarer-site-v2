'use client'

import dynamic from 'next/dynamic'

import LazySection from '@/components/LazySection'

const ProjectsBlock = dynamic(
  () => import('@/components/welcomePage/Projects'),
  { ssr: false }
)
const SkillsBlock = dynamic(() => import('@/components/welcomePage/Skills'), {
  ssr: false,
})
const TimeBlock = dynamic(() => import('@/components/welcomePage/Time'), {
  ssr: false,
})
const WakaBlock = dynamic(() => import('@/components/welcomePage/Waka'), {
  ssr: false,
})
const WeatherBlock = dynamic(() => import('@/components/welcomePage/Weather'), {
  ssr: false,
})

export default function LazyPage() {
  return (
    <LazySection className="grid gap-6">
      <section className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <TimeBlock />
        <WeatherBlock />
        <WakaBlock />
      </section>
      <section className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <SkillsBlock />
        <ProjectsBlock />
      </section>
    </LazySection>
  )
}
