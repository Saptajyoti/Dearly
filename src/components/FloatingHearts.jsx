import React, { useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * FloatingHearts Component
 * ==========================================
 * Renders lightweight, ambient floating hearts that drift upwards with a
 * gentle romantic sway. Completely non-interactive (pointer-events: none)
 * and hidden from assistive technology for accessibility.
 */
export const FloatingHearts = ({ count = 14 }) => {
  const shouldReduceMotion = useReducedMotion();

  // Color palette for soft pastel variations
  const heartColors = [
    '#E85B72', // strawberry
    '#C76B91', // romantic rose
    '#FFA1B2', // light strawberry
    '#F8DCE8', // pastel pink
    '#E5849E', // blush rose
  ];

  // Pre-generate stable random parameters for each heart
  const hearts = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      // Deterministic spread across horizontal viewport
      const baseLeft = (i / count) * 94 + 3; // 3% to 97%
      const jitter = ((i * 17) % 7) - 3;
      const left = Math.min(Math.max(baseLeft + jitter, 2), 96);
      
      const size = 12 + ((i * 9) % 16); // 12px to 28px
      const duration = 12 + ((i * 7) % 10); // 12s to 22s
      const delay = (i * 1.3) % 10; // 0s to 9.1s staggered start
      const color = heartColors[i % heartColors.length];
      const opacity = 0.22 + (((i * 11) % 5) * 0.08); // 0.22 to 0.54
      const sway = 15 + ((i * 13) % 25); // sway amplitude px
      const isOutlined = i % 4 === 0;

      return {
        id: i,
        left: `${left}%`,
        size,
        duration,
        delay,
        color,
        opacity,
        sway,
        isOutlined,
      };
    });
  }, [count]);

  return (
    <div
      className="dearly-floating-hearts"
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: 1,
      }}
    >
      {hearts.map((h) => {
        if (shouldReduceMotion) {
          return (
            <div
              key={h.id}
              style={{
                position: 'absolute',
                bottom: `${(h.id * 7) % 80 + 10}%`,
                left: h.left,
                width: h.size,
                height: h.size,
                opacity: h.opacity * 0.7,
              }}
            >
              <HeartSvg color={h.color} isOutlined={h.isOutlined} />
            </div>
          );
        }

        return (
          <motion.div
            key={h.id}
            initial={{
              y: '105vh',
              x: 0,
              opacity: 0,
              rotate: (h.id % 2 === 0 ? -1 : 1) * 8,
              scale: 0.8,
            }}
            animate={{
              y: '-10vh',
              x: [0, h.sway, -h.sway, 0],
              opacity: [0, h.opacity, h.opacity, 0],
              rotate: [(h.id % 2 === 0 ? -12 : 12), (h.id % 2 === 0 ? 12 : -12)],
              scale: [0.8, 1.05, 0.95],
            }}
            transition={{
              y: {
                duration: h.duration,
                repeat: Infinity,
                ease: 'linear',
                delay: h.delay,
              },
              x: {
                duration: h.duration * 0.5,
                repeat: Infinity,
                repeatType: 'mirror',
                ease: 'easeInOut',
                delay: h.delay,
              },
              opacity: {
                duration: h.duration,
                repeat: Infinity,
                times: [0, 0.15, 0.85, 1],
                ease: 'easeInOut',
                delay: h.delay,
              },
              rotate: {
                duration: h.duration * 0.4,
                repeat: Infinity,
                repeatType: 'mirror',
                ease: 'easeInOut',
              },
            }}
            style={{
              position: 'absolute',
              bottom: 0,
              left: h.left,
              width: h.size,
              height: h.size,
            }}
          >
            <HeartSvg color={h.color} isOutlined={h.isOutlined} />
          </motion.div>
        );
      })}
    </div>
  );
};

// Reusable SVG Heart with soft rounded curves
const HeartSvg = ({ color, isOutlined }) => (
  <svg
    viewBox="0 0 24 24"
    width="100%"
    height="100%"
    style={{ display: 'block', overflow: 'visible', filter: 'drop-shadow(0 2px 6px rgba(199, 107, 145, 0.15))' }}
  >
    <path
      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
      fill={isOutlined ? 'none' : color}
      stroke={color}
      strokeWidth={isOutlined ? 1.8 : 0}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default FloatingHearts;

