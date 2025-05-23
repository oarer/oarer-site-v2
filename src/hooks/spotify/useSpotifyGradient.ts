import { useState, useEffect } from 'react'

function hexToHsl(hex: string): { h: number; s: number; l: number } {
  let r = 0,
    g = 0,
    b = 0
  if (hex.length === 4) {
    r = parseInt(hex[1] + hex[1], 16)
    g = parseInt(hex[2] + hex[2], 16)
    b = parseInt(hex[3] + hex[3], 16)
  } else if (hex.length === 7) {
    r = parseInt(hex.slice(1, 3), 16)
    g = parseInt(hex.slice(3, 5), 16)
    b = parseInt(hex.slice(5, 7), 16)
  }
  r /= 255
  g /= 255
  b /= 255
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b)
  let h = 0,
    s = 0,
    l = (max + min) / 2

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
    h *= 60
  }
  return { h, s, l }
}

export function useSpotifyGradient(
  coverImage: string,
  theme: 'light' | 'dark' = 'dark'
): string {
  const [gradientGlow, setGradient] = useState(
    'radial-gradient(circle, rgba(120,120,120,0.2) 20%, rgba(80,80,80,0.4) 60%, rgba(50,50,50,0.6) 90%)'
  )

  useEffect(() => {
    if (!coverImage) return

    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.src = coverImage

    const applyFallback = () =>
      setGradient(
        'radial-gradient(circle, rgba(120,120,120,0.2) 20%, rgba(80,80,80,0.4) 60%, rgba(50,50,50,0.6) 90%)'
      )

    img.onload = () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      if (!ctx) return applyFallback()

      const w = (canvas.width = img.naturalWidth)
      const h = (canvas.height = img.naturalHeight)
      ctx.drawImage(img, 0, 0, w, h)
      const data = ctx.getImageData(0, 0, w, h).data

      const samples = 30
      const colors: string[] = []
      for (let i = 0; i < samples; i++) {
        const idx = Math.floor(Math.random() * (w * h)) * 4
        const r = data[idx],
          g = data[idx + 1],
          b = data[idx + 2]
        const hex =
          '#' + [r, g, b].map((v) => v.toString(16).padStart(2, '0')).join('')
        colors.push(hex)
      }

      const filtered = colors.filter((hex) => {
        const { h, s } = hexToHsl(hex)
        const isGray = s < 0.1
        const isBadGreen = h > 90 && h < 160 && s > 0.3
        return !isGray && !isBadGreen
      })

      if (!filtered.length) return applyFallback()

      const stops = filtered.map((hex, i) => {
        const alpha = theme === 'light' ? 0.4 : 0.6

        const [r, g, b] = hex
          .slice(1)
          .match(/.{2}/g)!
          .map((c) => parseInt(c, 16))

        return `rgba(${r},${g},${b},${alpha}) ${((i + 1) * 100) / filtered.length}%`
      })

      setGradient(`radial-gradient(circle at center, ${stops.join(', ')})`)
    }

    img.onerror = applyFallback
  }, [coverImage, theme])

  return gradientGlow
}
