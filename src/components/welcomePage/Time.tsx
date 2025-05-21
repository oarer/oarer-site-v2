import Block from '@/components/UI/block/Block'
import TimeView from './components/TimeView'
import { mono } from '@/lib/fonts'

export default function TimeBlock() {
  return (
    <Block heading="time.tsx" icon="lucide:clock">
      <div className="flex flex-col justify-center gap-2">
        <TimeView timeZone="Asia/Yekaterinburg" />
        <p
          className={`${mono.className} text-[12px] text-neutral-700 opacity-80 sm:text-[14px] dark:text-neutral-300`}
        >
          UTC+5
        </p>
      </div>
    </Block>
  )
}
