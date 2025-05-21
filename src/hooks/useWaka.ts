import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

import type { ITimeData } from '@/types/waka.type'

export function useWaka() {
  return useQuery<ITimeData>({
    queryKey: ['wakatime'],
    queryFn: async () => {
      const res = await axios.get<ITimeData>(
        `https://wakatime.com/share/@oarer/c0a6eaf3-344b-40f2-9655-504209e07095.json`
      )
      return res.data
    },
    staleTime: 5 * 60 * 1000,
  })
}
