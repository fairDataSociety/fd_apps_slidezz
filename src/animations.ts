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
