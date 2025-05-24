import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

interface RawActivityData {
  id: number
  workplace: string
  file: string
  editor: string
  editor_code: string
  debugging: boolean
  start_time: Date
}

interface ActivityResponse {
  statusCode: number
  activities: RawActivityData[]
}

export function useActivity() {
  return useQuery<RawActivityData | undefined>({
    queryKey: ['activity'],
    queryFn: async () => {
      const res = await axios.get<ActivityResponse>(
        `https://activity.andcool.ru/kb2kbd`
      )
      const first = res.data.activities?.[0]
      if (!first) return undefined

      return first
    },
    refetchInterval: 10000,
  })
}
