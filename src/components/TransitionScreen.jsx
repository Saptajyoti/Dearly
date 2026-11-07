import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * TransitionScreen Component
 * ==========================================
 * Provides seamless, romantic page transitions with soft pink veil effects.
 * Designed for swapping between Dearly's birthday story chapters.
 */
export const TransitionScreen = ({ children, isVisible = true, transitionKey = 'screen' }) => {
  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          key={transitionKey}
          initial={{ opacity: 0, y: 16, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -16, scale: 0.98 }}
          transition={{
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1], // Smooth custom ease
          }}
          className="dearly-transition-wrapper"
          style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TransitionScreen;

