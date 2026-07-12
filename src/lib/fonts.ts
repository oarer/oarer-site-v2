import { Montserrat, Raleway, Roboto_Mono, Unbounded } from 'next/font/google'

export const raleway = Raleway({
	weight: ['400', '500', '600', '700'],
	subsets: ['latin', 'cyrillic'],
})

export const unbounded = Unbounded({
	weight: ['400', '500', '600', '700'],
	subsets: ['latin', 'cyrillic'],
})

export const montserrat = Montserrat({
	weight: ['400', '500', '600', '700'],
	subsets: ['latin', 'cyrillic'],
})

export const mono = Roboto_Mono({
	weight: ['400', '700'],
	subsets: ['latin', 'cyrillic'],
})
