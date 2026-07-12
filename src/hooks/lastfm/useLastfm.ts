import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

import type { CurrentlyPlaying } from '@/types/currentlyPlaying.type'

export const useLastfm = () => {
	return useQuery<CurrentlyPlaying>({
		queryKey: ['lastfm', 'recently-played'],
		queryFn: async () => {
			const res = await axios.get('/api/lastfm')
			return res.data
		},
		refetchInterval: 5000,
	})
}
