import AboutBlock from '@/components/welcomePage/About'
import ProjectsBlock from '@/components/welcomePage/Projects'
import SkillsBlock from '@/components/welcomePage/Skills'
import SpotifyBlock from '@/components/welcomePage/Spotify'
import TimeBlock from '@/components/welcomePage/Time'
import WakaBlock from '@/components/welcomePage/Waka'
import WeatherBlock from '@/components/welcomePage/Weather'

export default function HomePage() {
  return (
    <div className="mx-auto flex max-w-[100rem] flex-col px-4 py-8 sm:px-6 md:py-12 md:pt-30">
      <div className="grid grid-cols-1 gap-8 text-neutral-800 lg:grid-cols-[23%_50%_23%] dark:text-neutral-300">
        <div className="order-2 flex flex-col lg:order-1">
          <ProjectsBlock />
        </div>

        <div className="order-1 flex flex-col gap-6 lg:order-2">
          <div className="flex flex-col gap-5 sm:flex-row">
            <TimeBlock />
            <WeatherBlock />
            <WakaBlock />
          </div>
          <AboutBlock />
          <SpotifyBlock />
        </div>

        <div className="order-3 flex flex-col">
          <SkillsBlock />
        </div>
      </div>
    </div>
  )
}
