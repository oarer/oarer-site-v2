import { useState, useEffect, useCallback } from 'react'
import { Vibrant } from 'node-vibrant/browser'

export function useSpotifyGradient(
  coverImage: string,
  theme: string | undefined
): string {
  const [gradientGlow, setGradientGlow] = useState(
    'radial-gradient(circle, rgba(120,120,120,0.2) 20%, rgba(80,80,80,0.4) 60%, rgba(50,50,50,0.6) 90%)'
  )

  function hexToHsl(hex: string) {
    hex = hex.replace('#', '')
    const r = parseInt(hex.substring(0, 2), 16) / 255
    const g = parseInt(hex.substring(2, 4), 16) / 255
    const b = parseInt(hex.substring(4, 6), 16) / 255

    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    let h = 0,
      s = 0
    const l = (max + min) / 2

    if (max !== min) {
      const d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0)
          break
        case g:
          h = (b - r) / d + 2
          break
        case b:
          h = (r - g) / d + 4
          break
      }
      h /= 6
    }
    return { h: h * 360, s, l }
  }

  function hslToRgba(h: number, s: number, l: number, a: number) {
    s = Math.min(Math.max(s, 0), 1)
    l = Math.min(Math.max(l, 0), 1)

    function hue2rgb(p: number, q: number, t: number) {
      if (t < 0) t += 1
      if (t > 1) t -= 1
      if (t < 1 / 6) return p + (q - p) * 6 * t
      if (t < 1 / 2) return q
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
      return p
    }

    let r: number, g: number, b: number
    if (s === 0) {
      r = g = b = l // серый
    } else {
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s
      const p = 2 * l - q
      r = hue2rgb(p, q, h / 360 + 1 / 3)
      g = hue2rgb(p, q, h / 360)
      b = hue2rgb(p, q, h / 360 - 1 / 3)
    }

    return `rgba(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(
      b * 255
    )}, ${a})`
  }

  function desaturate(
    hsl: { h: number; s: number; l: number },
    amountPercent: number
  ) {
    return { ...hsl, s: Math.max(0, hsl.s - amountPercent / 100) }
  }

  function lighten(
    hsl: { h: number; s: number; l: number },
    amountPercent: number
  ) {
    return { ...hsl, l: Math.min(1, hsl.l + amountPercent / 100) }
  }

  const isGray = useCallback((hex: string) => {
    return hexToHsl(hex).s < 0.1
  }, [])

  const isBadGreen = useCallback((hex: string) => {
    const { h, s } = hexToHsl(hex)
    return h > 90 && h < 160 && s > 0.3
  }, [])

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

          const cleaned = raw.filter((hex) => !isGray(hex) && !isBadGreen(hex))
          if (!cleaned.length) return applyFallback()

          const adjusted = cleaned.map((hex) => {
            let hsl = hexToHsl(hex)
            if (theme === 'light') {
              hsl = desaturate(hsl, 10)
              hsl = lighten(hsl, 10)
              return hslToRgba(hsl.h, hsl.s, hsl.l, 0.4)
            } else {
              return hslToRgba(hsl.h, hsl.s, hsl.l, 0.6)
            }
          })

          const gradient = `radial-gradient(circle at center, ${adjusted
            .map((c, i) => `${c} ${(i + 1) * 15}%`)
            .join(', ')})`
          setGradientGlow(gradient)
        })
        .catch(applyFallback)
    }

    img.onerror = applyFallback

    return () => {
      img.onload = null
      img.onerror = null
    }
  }, [coverImage, theme, isGray, isBadGreen])

  return gradientGlow
}
