export type CurrentlyPlaying = {
  name: string
  artists: { name: string }[]
  album: string
  album_url: string
  cover_image: string | null
  track_url: string
  duration_ms: number
  progress_ms: number
  is_playing: boolean
} | null
