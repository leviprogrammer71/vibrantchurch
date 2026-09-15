import { motion } from 'framer-motion';

/**
 * Loading fallback for code-split routes.
 * Church-themed animated cross spinner with pulse.
 */
export function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-cream">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col items-center gap-5"
      >
        {/* Animated cross spinner */}
        <motion.svg
          viewBox="0 0 48 48"
          fill="none"
          className="w-12 h-12"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        >
          <circle
            cx="24"
            cy="24"
            r="20"
            stroke="#d4a843"
            strokeWidth="2.5"
            strokeDasharray="90 40"
            strokeLinecap="round"
          />
        </motion.svg>

        {/* Cross icon pulsing inside */}
        <motion.div
          className="absolute"
          animate={{ scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg viewBox="0 0 24 32" fill="none" className="w-5 h-6">
            <rect x="10" y="0" width="4" height="32" rx="1" fill="#1a365d" />
            <rect x="2" y="8" width="20" height="4" rx="1" fill="#1a365d" />
          </svg>
        </motion.div>

        <motion.p
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="text-sm font-[Caveat] text-lg tracking-wide text-brand-navy/60"
        >
          Loading...
        </motion.p>
      </motion.div>
    </div>
  );
}
