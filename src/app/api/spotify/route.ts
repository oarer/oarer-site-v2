/* src/app/api/spotify/route.ts */
import { NextResponse } from 'next/server'

let accessToken: string | null = null

async function getAccessToken(): Promise<string> {
  if (accessToken !== null) return accessToken
  accessToken = await refreshAccessToken()
  return accessToken
}

async function refreshAccessToken(): Promise<string> {
  const clientId = process.env.SPOTIFY_CLIENT_ID
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET
  const refreshToken = process.env.SPOTIFY_RESRESH

  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error('Spotify env vars missing at runtime')
  }

  const creds = Buffer.from(`${clientId}:${clientSecret}`).toString('base64')
  const res = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${creds}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    }).toString(),
  })

  const text = await res.text()
  if (!res.ok) {
    console.error('Spotify token refresh failed response:', text)
    throw new Error(`Failed to refresh token: ${res.status} ${res.statusText}`)
  }

  let json: { access_token: string }
  try {
    json = JSON.parse(text)
  } catch {
    console.error('Invalid JSON from Spotify token endpoint:', text)
    throw new Error('Invalid token response from Spotify')
  }

  accessToken = json.access_token
  return accessToken
}

async function fetchCurrentlyPlayingRaw() {
  const token = await getAccessToken()
  let res = await fetch(
    'https://api.spotify.com/v1/me/player/currently-playing',
    { headers: { Authorization: `Bearer ${token}` } }
  )
  if (res.status === 401) {
    console.warn('Access token expired, refreshing...')
    const newToken = await refreshAccessToken()
    res = await fetch(
      'https://api.spotify.com/v1/me/player/currently-playing',
      { headers: { Authorization: `Bearer ${newToken}` } }
    )
  }
  if (res.status === 204) {
    return { is_playing: false, progress_ms: 0, item: null } as const
  }
  if (!res.ok) {
    const errText = await res.text()
    console.error('Spotify API error response:', errText)
    throw new Error(`Spotify API error: ${res.status} ${res.statusText}`)
  }
  return (await res.json()) as {
    is_playing: boolean
    progress_ms: number
    item: {
      name: string
      artists: Array<{ name: string }>
      album: {
        name: string
        external_urls: { spotify: string }
        images?: Array<{ url: string }>
      }
      external_urls: { spotify: string }
      duration_ms: number
    }
  }
}

export async function GET() {
  try {
    const data = await fetchCurrentlyPlayingRaw()
    if (!data.item) {
      return NextResponse.json({ is_active: false, track: null })
    }
    const item = data.item
    const result = {
      name: item.name,
      artists: item.artists,
      album: item.album.name,
      album_url: item.album.external_urls.spotify,
      cover_image: item.album.images?.[0]?.url || null,
      track_url: item.external_urls.spotify,
      duration_ms: item.duration_ms,
      progress_ms: data.progress_ms,
      is_playing: data.is_playing,
    }
    return NextResponse.json(result)
  } catch (error: unknown) {
    console.error('Spotify GET error:', error)
    let message = 'Failed to fetch currently playing'
    let status = 502
    if (error instanceof Error && error.message.includes('env vars')) {
      message = 'Server misconfiguration'
      status = 500
    }
    return new NextResponse(message, { status })
  }
}
