/**
 * Shared Framer Motion animation presets for Vibrant Church.
 * Import these across pages instead of re-declaring inline.
 */

import type { Variants } from 'framer-motion';

/* ── Easing curves ── */
export const easeOutExpo = [0.22, 1, 0.36, 1] as const;
export const easeOutQuart = [0.25, 1, 0.5, 1] as const;
export const easeInOutCubic = [0.65, 0, 0.35, 1] as const;

/* ── Generic scroll-reveal props ── */
export const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.8, delay, ease: easeOutExpo },
});

export const fadeIn = (delay = 0) => ({
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true },
  transition: { duration: 1, delay },
});

export const scaleIn = (delay = 0) => ({
  initial: { opacity: 0, scale: 0.9 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { once: true },
  transition: { duration: 0.7, delay, ease: easeOutExpo },
});

export const slideInLeft = (delay = 0) => ({
  initial: { opacity: 0, x: -60 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, delay, ease: easeOutExpo },
});

export const slideInRight = (delay = 0) => ({
  initial: { opacity: 0, x: 60 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, delay, ease: easeOutExpo },
});

/* ── Stagger containers ── */
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOutExpo },
  },
};

/* ── Card hover lifts ── */
export const cardHover = {
  whileHover: { y: -6, transition: { duration: 0.3, ease: easeOutQuart } },
  whileTap: { scale: 0.98 },
};

/* ── Button micro-interactions ── */
export const buttonPress = {
  whileHover: { scale: 1.03, transition: { duration: 0.2 } },
  whileTap: { scale: 0.97 },
};

/* ── Image reveal ── */
export const imageReveal = (delay = 0) => ({
  initial: { opacity: 0, scale: 1.05 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { once: true },
  transition: { duration: 1.2, delay, ease: easeOutExpo },
});

/* ── Float animation for decorative elements ── */
export const floatY = (duration = 6, distance = 10) => ({
  animate: {
    y: [-distance, distance, -distance],
    transition: {
      duration,
      repeat: Infinity,
      ease: 'easeInOut' as const,
    },
  },
});

/* ── Gentle rotate for accents ── */
export const gentleRotate = (duration = 20) => ({
  animate: {
    rotate: [0, 3, -3, 0],
    transition: {
      duration,
      repeat: Infinity,
      ease: 'easeInOut' as const,
    },
  },
});

/* ── Pulse glow ── */
export const pulseGlow = {
  animate: {
    opacity: [0.4, 0.8, 0.4],
    scale: [1, 1.05, 1],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut' as const,
    },
  },
};

/* ── Counter / number animation helpers ── */
export const countUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay, ease: easeOutExpo },
});

/* ── Section heading reveal ── */
export const headingReveal: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeOutExpo },
  },
};

/* ── Parallax scroll multiplier helper ── */
export const parallaxRange = (
  inputRange: [number, number] = [0, 1],
  outputRange: [string, string] = ['0%', '20%'],
) => ({
  inputRange,
  outputRange,
});
