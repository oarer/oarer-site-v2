import Tilt from 'react-parallax-tilt'
import Image from 'next/image'
import { LazyMotion, domAnimation, m, AnimatePresence } from 'motion/react'

interface CoverBlurProps {
  imageUrl: string
  gradient: string
}

const MotionImage = m.create(Image)

export default function CoverBlur({ imageUrl, gradient }: CoverBlurProps) {
  return (
    <LazyMotion features={domAnimation}>
      <div className="relative h-[90px] w-[90px]">
        {[30, 40, 60].map((b, i) => (
          <m.div
            animate={{ opacity: 1 }}
            className="absolute inset-0 -z-10 rounded-xl"
            initial={{ opacity: 0 }}
            key={i}
            style={{
              background: gradient,
              filter: `blur(${b}px)`,
              transform: `scale(${1 + i * 0.2})`,
            }}
            transition={{ duration: 1, ease: 'easeInOut' }}
          />
        ))}
        <AnimatePresence mode="popLayout">
          <Tilt scale={1.1} tiltReverse transitionSpeed={2000}>
            <MotionImage
              alt={imageUrl}
              animate={{ opacity: 1, scale: 1 }}
              className="overflow-hidden rounded-xl bg-neutral-200/30 dark:bg-neutral-900/50"
              exit={{ opacity: 0, scale: 1.05 }}
              height={90}
              initial={{ opacity: 0, scale: 0.95 }}
              key={imageUrl}
              quality={100}
              src={imageUrl}
              style={{
                maskImage:
                  'radial-gradient(circle, rgba(0,0,0,1) 0%, rgba(0,0,0,0.6) 60%, rgba(0,0,0,0.3) 80%, rgba(0,0,0,0) 90%)',
                WebkitMaskImage:
                  'radial-gradient(circle, rgba(0,0,0,1) 40%, rgba(0,0,0,0.6) 60%, rgba(0,0,0,0.3) 80%, rgba(0,0,0,0) 90%)',
                maskSize: 'cover',
                WebkitMaskSize: 'cover',
              }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              width={90}
            />
          </Tilt>
        </AnimatePresence>
      </div>
    </LazyMotion>
  )
}
