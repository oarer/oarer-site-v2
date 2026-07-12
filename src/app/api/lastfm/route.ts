import { NextResponse } from 'next/server'

const LASTFM_BASE = 'https://ws.audioscrobbler.com/2.0/'

interface LastFmImage {
	'#text': string
	size: string
}

interface LastFmTrack {
	name: string
	artist: { '#text': string; mbid?: string }
	album: { '#text': string; mbid?: string }
	image: LastFmImage[]
	url: string
	date?: { uts: string; '#text': string }
	'@attr'?: { nowplaying?: string }
}

interface RecentTracksResponse {
	recenttracks: {
		track: LastFmTrack[]
	}
}

interface TrackInfoResponse {
	track: {
		name: string
		duration: string
		artist: { name: string }
		album: { title: string; url: string }
		url: string
	}
}

async function getRecentTrack(): Promise<LastFmTrack | null> {
	const apiKey = process.env.LASTFM_API_KEY
	const username = process.env.LASTFM_USERNAME

	if (!apiKey || !username) {
		throw new Error('Last.fm env vars missing')
	}

	const res = await fetch(
		`${LASTFM_BASE}?method=user.getrecenttracks&user=${encodeURIComponent(username)}&api_key=${apiKey}&format=json&limit=1`,
	)

	if (!res.ok) {
		throw new Error(`Last.fm API error: ${res.status} ${res.statusText}`)
	}

	const data: RecentTracksResponse = await res.json()
	return data.recenttracks.track[0] ?? null
}

async function getTrackDuration(
	track: string,
	artist: string
): Promise<number> {
	const apiKey = process.env.LASTFM_API_KEY
	if (!apiKey) return 0

	const res = await fetch(
		`${LASTFM_BASE}?method=track.getInfo&track=${encodeURIComponent(track)}&artist=${encodeURIComponent(artist)}&api_key=${apiKey}&format=json`,
		{ headers: { 'User-Agent': 'oarer-site/1.0' } }
	)

	if (!res.ok) return 0

	const data: TrackInfoResponse = await res.json()
	return parseInt(data.track.duration) || 0
}

function getImage(images: LastFmImage[]): string | null {
	for (const size of ['extralarge', 'large', 'medium']) {
		const img = images.find((i) => i.size === size)
		if (img?.['#text']) return img['#text']
	}
	return null
}

export async function GET() {
	try {
		const track = await getRecentTrack()

		if (!track) {
			return NextResponse.json({ is_active: false, track: null })
		}

		const isPlaying = track['@attr']?.nowplaying === 'true'

		const durationMs = await getTrackDuration(
			track.name,
			track.artist['#text']
		)

		let progressMs = 0
		if (isPlaying && track.date?.uts) {
			const scrobbleTime = parseInt(track.date.uts) * 1000
			const elapsed = Date.now() - scrobbleTime
			progressMs = durationMs > 0 ? elapsed % durationMs : elapsed
		}

		return NextResponse.json({
			name: track.name,
			artists: [{ name: track.artist['#text'] }],
			album: track.album['#text'],
			album_url: track.url,
			cover_image: getImage(track.image),
			track_url: track.url,
			duration_ms: durationMs,
			progress_ms: progressMs,
			is_playing: isPlaying,
		})
	} catch (error: unknown) {
		console.error('Last.fm GET error:', error)
		let message = 'Failed to fetch recently played'
		let status = 502
		if (error instanceof Error && error.message.includes('env vars')) {
			message = 'Server misconfiguration'
			status = 500
		}
		return new NextResponse(message, { status })
	}
}
