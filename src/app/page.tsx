import AboutBlock from '@/components/welcomePage/About'
import ScrollDown from '@/components/welcomePage/components/ScrollDown'
import LastFmBlock from '@/components/welcomePage/Spotify'
import VSCodeBlock from '@/components/welcomePage/VSCode'
import LazyPage from './LazyPage'

export default function HomePage() {
	return (
		<main className="mx-auto max-w-7xl px-4 py-8 text-neutral-800 sm:px-6 md:py-12 lg:pt-10 dark:text-neutral-300">
			<header
				className="relative flex min-h-[calc(101vh-4rem)] flex-col gap-6 pb-12"
				id="main"
			>
				<AboutBlock />
				<section
					className="grid grid-cols-1 gap-6 lg:grid-cols-2"
					id="activity"
				>
					<LastFmBlock />
					<VSCodeBlock />
				</section>
				<ScrollDown />
			</header>

			<LazyPage />
		</main>
	)
}
