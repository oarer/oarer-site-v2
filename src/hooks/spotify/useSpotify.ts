import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

import type { CurrentlyPlaying } from '@/types/currentlyPlaying.type'

export const useSpotify = () => {
  return useQuery<CurrentlyPlaying>({
    queryKey: ['spotify', 'currently-playing'],
    queryFn: async () => {
      const res = await axios.get('/api/spotify')
      return res.data
    },
    refetchInterval: 5000,
  })
}
