import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useTranslation } from 'react-i18next'

interface WeatherData {
	temp: number
	condition: string
	icon: string
}

export function useWeather() {
	const { i18n } = useTranslation()
	const lang = i18n.language

	return useQuery<WeatherData>({
		queryKey: ['weather', lang],
		queryFn: async () => {
			const res = await axios.get<WeatherData>(
				`/api/weather?lang=${lang}`
			)
			return res.data
		},
		staleTime: Infinity,
	})
}
