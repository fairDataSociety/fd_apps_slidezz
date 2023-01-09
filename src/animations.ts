import { Variants } from 'framer-motion'

export const CONTAINER_VARIANTS: Variants = {
  hide: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      duration: 0.5,
      delayChildren: 0.5,
      staggerChildren: 0.25,
    },
  },
}

export const TEXT_UNDERLINE_VRIANTS: Variants = {
  hide: { width: 0 },
  show: {
    width: '100%',
    transition: {
      duration: 0.7,
      ease: 'easeOut',
    },
  },
}

export const TEXT_VARIANTS: Variants = {
  hide: { y: '100%' },
  show: {
    y: 0,
    transition: {
      duration: 0.7,
      ease: 'easeOut',
    },
  },
}

export const WAVE_VARIANTS: Variants = {
  hide: {
    opacity: 0,
    scale: 2,
    translateY: '140%',
    translateX: '-40%',
    scaleY: 2.5,
  },
  show: {
    opacity: 1,
    scale: 1,
    translateY: '0%',
    translateX: '0%',
    scaleY: 1,

    transition: {
      duration: 2,
    },
  },
}
