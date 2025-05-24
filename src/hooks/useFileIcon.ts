import { iconMap } from '@/constants/iconMap.const'

export function useFileIcon(fileName?: string): string {
  if (!fileName) return '/icons/default.png'

  const lower = fileName.toLowerCase()
  const ext = lower.split('.').pop()

  if (ext && iconMap[ext]) {
    return `https://raw.githubusercontent.com/leonardssh/vscord/main/assets/icons/${iconMap[ext]}.png`
  }

  for (const key in iconMap) {
    if (lower.includes(key)) {
      return `https://raw.githubusercontent.com/leonardssh/vscord/main/assets/icons/${iconMap[key]}.png`
    }
  }

  return '/icons/default.png'
}
