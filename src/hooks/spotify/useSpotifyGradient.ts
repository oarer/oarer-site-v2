import { useState, useEffect } from 'react'
import { Vibrant } from 'node-vibrant/browser'
import tinycolor from 'tinycolor2'

export function useSpotifyGradient(
  coverImage: string,
  theme: string | undefined
): string {
  const [gradientGlow, setGradientGlow] = useState(
    'radial-gradient(circle, rgba(120,120,120,0.2) 20%, rgba(80,80,80,0.4) 60%, rgba(50,50,50,0.6) 90%)'
  )

  useEffect(() => {
    if (!coverImage) return

    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.src = coverImage

    const applyFallback = () =>
      setGradientGlow(
        'radial-gradient(circle, rgba(120,120,120,0.2) 20%, rgba(80,80,80,0.4) 60%, rgba(50,50,50,0.6) 90%)'
      )

    img.onload = () => {
      Vibrant.from(img)
        .getPalette()
        .then((palette) => {
          const raw = [
            palette.Vibrant?.hex,
            palette.LightVibrant?.hex,
            palette.DarkVibrant?.hex,
            palette.Muted?.hex,
            palette.LightMuted?.hex,
            palette.DarkMuted?.hex,
          ].filter(Boolean) as string[]

          const isGray = (hex: string) => tinycolor(hex).toHsl().s < 0.1
          const isBadGreen = (hex: string) => {
            const { h, s } = tinycolor(hex).toHsl()
            return h > 90 && h < 160 && s > 0.3
          }
          const cleaned = raw.filter((hex) => !isGray(hex) && !isBadGreen(hex))
          if (!cleaned.length) return applyFallback()

          const adjusted = cleaned.map((hex) => {
            const tc = tinycolor(hex)
            return theme === 'light'
              ? tc.desaturate(10).lighten(10).setAlpha(0.4).toRgbString()
              : tc.setAlpha(0.6).toRgbString()
          })

          const gradient = `radial-gradient(circle at center, ${adjusted
            .map((c, i) => `${c} ${(i + 1) * 15}%`)
            .join(', ')})`
          setGradientGlow(gradient)
        })
        .catch(applyFallback)
    }

    img.onerror = applyFallback
  }, [coverImage, theme])

  return gradientGlow
}
