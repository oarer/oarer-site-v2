import { Raleway, Unbounded, Space_Mono, Montserrat } from 'next/font/google'
import localFont from 'next/font/local'

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

export const mono = Space_Mono({
  weight: ['400', '700'],
  subsets: ['latin'],
})

export const zed = localFont({
  src: '../../public/fonts/zed/zed.ttf',
  weight: '400',
  style: 'normal',
})
