interface Range {
  start: string
  end: string
  range: string
  days_including_holidays: number
  days_minus_holidays: number
  holidays: number
}

interface GrandTotal {
  daily_average: number
  daily_average_including_other_language: number
  human_readable_daily_average: string
  human_readable_daily_average_including_other_language: string
  human_readable_total: string
  human_readable_total_including_other_language: string
  total_seconds: number
  total_seconds_including_other_language: number
}

interface BestDay {
  date: string
  text: string
  total_seconds: number
}

interface TimeData {
  range: Range
  grand_total: GrandTotal
  best_day: BestDay
}

export interface ITimeData {
  data: TimeData
}
