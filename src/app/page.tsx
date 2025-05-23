import AboutBlock from '@/components/welcomePage/About'
import LazyPage from './LazyPage'
import SpotifyBlock from '@/components/welcomePage/Spotify'
import ScrollDown from '@/components/welcomePage/components/ScrollDown'
import VSCodeBlock from '@/components/welcomePage/VSCode'

export default function HomePage() {
  return (
    <main className="mx-auto max-w-[80rem] px-4 py-8 text-neutral-800 sm:px-6 md:py-12 md:pt-30 dark:text-neutral-300">
      <header
        className="relative mb-8 flex min-h-[calc(95vh-4rem)] flex-col gap-6 sm:mb-0"
        id="main"
      >
        <AboutBlock />
        <section
          className="grid grid-cols-1 gap-6 xl:grid-cols-2"
          id="activity"
        >
          <SpotifyBlock />
          <VSCodeBlock />
        </section>
        <ScrollDown />
      </header>

      <LazyPage />
    </main>
  )
}
