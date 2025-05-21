import { useEffect, useReducer, useState } from 'react'

import type { CurrentlyPlaying } from '@/types/currentlyPlaying.type'

export function useSpotifyProgress(data?: CurrentlyPlaying) {
  const [fetchedAt, setFetchedAt] = useState(0)
  const [, forceUpdate] = useReducer((x) => x + 1, 0)

  useEffect(() => {
    if (data?.progress_ms != null) {
      setFetchedAt(Date.now())
    }
  }, [data?.progress_ms])

  useEffect(() => {
    if (!data?.is_playing) return
    const id = setInterval(() => forceUpdate(), 1000)
    return () => clearInterval(id)
  }, [data?.is_playing])

  if (!data?.duration_ms || data.progress_ms == null) return 0

  const prog = data.progress_ms + (Date.now() - fetchedAt)
  return Math.min(prog, data.duration_ms)
}
