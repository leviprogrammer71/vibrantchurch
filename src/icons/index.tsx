/**
 * Custom church-themed SVG icon set for Vibrant Church.
 * Hand-drawn watercolor style matching the brand palette.
 *
 * Brand colors used:
 *   Navy:  #1a365d / #233B5D
 *   Gold:  #d4a843 / #C79A4A
 *   Cream: #f5f0e8 / #F8F2E8
 *   Coral: #D9876C
 */

import { type SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

// ─── Cross ───────────────────────────────────────────
export function IconCross(props: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" {...props}>
      <path d="M27 6h10v52H27z" rx="3" fill="#C79A4A" />
      <path d="M11 20h42v10H11z" rx="3" fill="#C79A4A" />
      <path d="M29 8h6v48h-6z" rx="2" fill="#F8F2E8" />
      <path d="M13 22h38v6H13z" rx="2" fill="#F8F2E8" />
    </svg>
  );
}

// ─── Heart ───────────────────────────────────────────
export function IconHeart(props: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" {...props}>
      <path
        d="M32 55S8 38.5 8 22.8C8 14 14.9 8 22.5 8 27.2 8 31 10.5 32 14c1-3.5 4.8-6 9.5-6C49.1 8 56 14 56 22.8 56 38.5 32 55 32 55Z"
        fill="#D9876C"
      />
      <path
        d="M32 50S13 36 13 23.5C13 16.8 18.2 12 23.5 12c3.5 0 6.5 1.8 8.5 5 2-3.2 5-5 8.5-5C45.8 12 51 16.8 51 23.5 51 36 32 50 32 50Z"
        fill="#F8F2E8"
        opacity="0.5"
      />
    </svg>
  );
}

// ─── Bible / Book ────────────────────────────────────
export function IconBible(props: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" {...props}>
      <rect x="10" y="8" width="44" height="48" rx="4" fill="#233B5D" />
      <rect x="14" y="12" width="36" height="40" rx="2" fill="#F8F2E8" />
      <path d="M32 20v24M24 32h16" stroke="#C79A4A" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M10 14h4v36h-4" fill="#C79A4A" />
    </svg>
  );
}

// ─── Community / People ──────────────────────────────
export function IconCommunity(props: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" {...props}>
      <circle cx="32" cy="32" r="28" fill="#F8F2E8" stroke="#C79A4A" strokeWidth="2.5" />
      <circle cx="24" cy="26" r="5" stroke="#233B5D" strokeWidth="2.6" />
      <circle cx="40" cy="26" r="5" stroke="#233B5D" strokeWidth="2.6" />
      <path d="M14 46c1.6-7.4 6.2-11 10-11s8.4 3.6 10 11" stroke="#D9876C" strokeWidth="2.6" strokeLinecap="round" />
      <path d="M30 46c1.6-7.4 6.2-11 10-11s8.4 3.6 10 11" stroke="#D9876C" strokeWidth="2.6" strokeLinecap="round" />
    </svg>
  );
}

// ─── Location Pin ────────────────────────────────────
export function IconLocation(props: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" {...props}>
      <path
        d="M32 56s15-15.3 15-29A15 15 0 1 0 17 27c0 13.7 15 29 15 29Z"
        stroke="#C79A4A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
      />
      <circle cx="32" cy="27" r="5.5" fill="#D9876C" />
    </svg>
  );
}

// ─── Calendar ────────────────────────────────────────
export function IconCalendar(props: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" {...props}>
      <rect x="10" y="14" width="44" height="40" rx="5" fill="#F8F2E8" stroke="#C79A4A" strokeWidth="2.5" />
      <path d="M10 26h44" stroke="#C79A4A" strokeWidth="2.5" />
      <rect x="20" y="8" width="3" height="12" rx="1.5" fill="#233B5D" />
      <rect x="41" y="8" width="3" height="12" rx="1.5" fill="#233B5D" />
      <circle cx="24" cy="36" r="2.5" fill="#D9876C" />
      <circle cx="32" cy="36" r="2.5" fill="#C79A4A" />
      <circle cx="40" cy="36" r="2.5" fill="#233B5D" />
      <circle cx="24" cy="44" r="2.5" fill="#C79A4A" />
      <circle cx="32" cy="44" r="2.5" fill="#D9876C" />
    </svg>
  );
}

// ─── Clock ───────────────────────────────────────────
export function IconClock(props: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" {...props}>
      <circle cx="32" cy="32" r="26" fill="#F8F2E8" stroke="#C79A4A" strokeWidth="2.5" />
      <path d="M32 18v14l9 6" stroke="#233B5D" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="32" cy="32" r="2.5" fill="#D9876C" />
    </svg>
  );
}

// ─── Play Button ─────────────────────────────────────
export function IconPlay(props: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" {...props}>
      <circle cx="32" cy="32" r="26" fill="#233B5D" />
      <path d="M27 22.5 43 32 27 41.5V22.5Z" fill="#F8F2E8" />
    </svg>
  );
}

// ─── Arrow Right ─────────────────────────────────────
export function IconArrow(props: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" {...props}>
      <path d="M14 32h36M38 20l12 12-12 12" stroke="#C79A4A" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─── Quote Open ──────────────────────────────────────
export function IconQuoteOpen(props: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" {...props}>
      <path d="M8 38c0-11 6-20 16-24l2 4c-7 4-10 9-10 14h8a6 6 0 0 1 0 12H16a8 8 0 0 1-8-6Z" fill="#C79A4A" />
      <path d="M34 38c0-11 6-20 16-24l2 4c-7 4-10 9-10 14h8a6 6 0 0 1 0 12H42a8 8 0 0 1-8-6Z" fill="#C79A4A" opacity="0.6" />
    </svg>
  );
}

// ─── Quote Close ─────────────────────────────────────
export function IconQuoteClose(props: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" {...props}>
      <path d="M56 26c0 11-6 20-16 24l-2-4c7-4 10-9 10-14h-8a6 6 0 0 1 0-12h8a8 8 0 0 1 8 6Z" fill="#C79A4A" />
      <path d="M30 26c0 11-6 20-16 24l-2-4c7-4 10-9 10-14h-8a6 6 0 0 1 0-12h8a8 8 0 0 1 8 6Z" fill="#C79A4A" opacity="0.6" />
    </svg>
  );
}

// ─── Sparkles ────────────────────────────────────────
export function IconSparkles(props: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" {...props}>
      <path d="M24 9c1.2 7.8 5.2 11.8 13 13-7.8 1.2-11.8 5.2-13 13-1.2-7.8-5.2-11.8-13-13 7.8-1.2 11.8-5.2 13-13Z" fill="#C79A4A" />
      <path d="M43 30c.8 5.1 3.4 7.7 8.5 8.5-5.1.8-7.7 3.4-8.5 8.5-.8-5.1-3.4-7.7-8.5-8.5 5.1-.8 7.7-3.4 8.5-8.5Z" fill="#D9876C" />
      <circle cx="47" cy="16" r="2.3" fill="#233B5D" />
    </svg>
  );
}

// ─── Mail / Envelope ─────────────────────────────────
export function IconMail(props: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" {...props}>
      <rect x="8" y="16" width="48" height="32" rx="5" fill="#F8F2E8" stroke="#C79A4A" strokeWidth="2.5" />
      <path d="M8 20l24 16 24-16" stroke="#233B5D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 48l16-14M56 48L40 34" stroke="#C79A4A" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

// ─── Phone ───────────────────────────────────────────
export function IconPhone(props: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" {...props}>
      <path
        d="M14 10c2.6-.6 5.8.6 7 3l4.2 8.4a4.2 4.2 0 0 1-1 5L21 29c1.6 5 5 9.4 10 11l2.6-3.2a4.2 4.2 0 0 1 5-1L47 40c2.4 1.2 3.6 4.4 3 7-1 4.4-4.6 8-9.5 8C26.8 55 9 37.2 9 23.5 9 18.6 12.6 12 14 10Z"
        fill="#F8F2E8" stroke="#C79A4A" strokeWidth="2.5" strokeLinecap="round"
      />
    </svg>
  );
}

// ─── Speech Bubble ───────────────────────────────────
export function IconSpeechBubble(props: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" {...props}>
      <path
        d="M10 16a6 6 0 0 1 6-6h32a6 6 0 0 1 6 6v22a6 6 0 0 1-6 6H28l-10 10V44h-2a6 6 0 0 1-6-6V16Z"
        fill="#F8F2E8" stroke="#C79A4A" strokeWidth="2.5"
      />
      <circle cx="24" cy="27" r="2.5" fill="#233B5D" />
      <circle cx="32" cy="27" r="2.5" fill="#D9876C" />
      <circle cx="40" cy="27" r="2.5" fill="#C79A4A" />
    </svg>
  );
}

// ─── Music Note ──────────────────────────────────────
export function IconMusic(props: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" {...props}>
      <path d="M24 46V16l24-8v30" stroke="#C79A4A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="18" cy="46" r="6" fill="#233B5D" />
      <circle cx="42" cy="38" r="6" fill="#D9876C" />
    </svg>
  );
}

// ─── Dove / Peace ────────────────────────────────────
export function IconDove(props: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" {...props}>
      <path
        d="M12 42c4-6 10-10 18-10 2 0 4 .5 6 1.5L50 18c1-1.5 3-1 3 1v12c0 8-6 16-16 18l-4 1-6 6v-8c-8-1-14-4-15-6Z"
        fill="#F8F2E8" stroke="#C79A4A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
      />
      <circle cx="44" cy="26" r="2" fill="#233B5D" />
    </svg>
  );
}

// ─── Sun / Sunrise ───────────────────────────────────
export function IconSunrise(props: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" {...props}>
      <path d="M8 44h48" stroke="#C79A4A" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M32 12v6M16 28l4 4M48 28l-4 4M10 40h4M50 40h-4" stroke="#D9876C" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M16 44a16 16 0 0 1 32 0" fill="#C79A4A" opacity="0.3" />
      <path d="M16 44a16 16 0 0 1 32 0" stroke="#C79A4A" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

// ─── Hands Praying ───────────────────────────────────
export function IconPrayer(props: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" {...props}>
      <path
        d="M32 8L22 30v18a4 4 0 0 0 4 4h12a4 4 0 0 0 4-4V30L32 8Z"
        fill="#F8F2E8" stroke="#C79A4A" strokeWidth="2.5" strokeLinejoin="round"
      />
      <path d="M32 8v44M22 30h20" stroke="#233B5D" strokeWidth="2" strokeLinecap="round" />
      <path d="M25 14l7 8 7-8" stroke="#D9876C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─── Globe / World ───────────────────────────────────
export function IconGlobe(props: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" {...props}>
      <circle cx="32" cy="32" r="24" fill="#F8F2E8" stroke="#C79A4A" strokeWidth="2.5" />
      <ellipse cx="32" cy="32" rx="10" ry="24" stroke="#233B5D" strokeWidth="2" />
      <path d="M10 24h44M10 40h44" stroke="#D9876C" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

// ─── Leaf Divider ────────────────────────────────────
export function IconDividerLeafy(props: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 24" fill="none" {...props}>
      <path d="M20 12h160" stroke="#C79A4A" strokeWidth="1" opacity="0.4" />
      <path d="M90 4c4 4 4 12 0 16M110 4c-4 4-4 12 0 16" stroke="#C79A4A" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <circle cx="100" cy="12" r="2" fill="#D9876C" />
      <path d="M80 12c3-6 8-6 10 0M110 12c3-6 8-6 10 0" stroke="#C79A4A" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}
