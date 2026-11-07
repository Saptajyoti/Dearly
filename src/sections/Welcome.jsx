import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';
import { Strawberry } from './Strawberry';

/**
 * Welcome Component (Stage 1: Initial Landing Screen)
 * ====================================================
 * Centered romantic birthday composition greeting the visitor with warmth,
 * personal touches, the strawberry character, and the primary call-to-action.
 */
export const Welcome = ({ data, onOpenSurprise }) => {
  const shouldReduceMotion = useReducedMotion();
  const [strawberryMood, setStrawberryMood] = useState('happy');

  const welcomeData = data.welcome || {};
  const badgeLabel = welcomeData.badgeLabel || data.badgeLabel || 'A Birthday Surprise 🎀';
  const greeting = welcomeData.greeting || data.greeting || 'Happy Birthday!';
  const subtitle = welcomeData.subtitle || data.subtitle || 'Someone made a little something just for you.';
  const buttonLabel = welcomeData.buttonLabel || data.buttonLabel || 'Open Your Surprise';

  // Staggered entrance animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.12,
        delayChildren: shouldReduceMotion ? 0 : 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <main className="dearly-welcome-section">
      <motion.div
        className="dearly-welcome-card"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Subtle Decorative Top Floral/Sparkle Accent */}
        <motion.div variants={itemVariants} className="dearly-badge-container">
          <span className="dearly-badge">
            <Sparkles size={14} className="dearly-badge-icon" aria-hidden="true" />
            <span>{badgeLabel}</span>
            <Sparkles size={14} className="dearly-badge-icon" aria-hidden="true" />
          </span>
        </motion.div>

        {/* Personalized Handwritten Recipient Callout */}
        <motion.div variants={itemVariants} className="dearly-recipient-wrapper">
          <p className="dearly-recipient-tag">
            Dearest <span className="dearly-recipient-name">{data.recipientName}</span>,
          </p>
        </motion.div>

        {/* Main Birthday Greeting Heading */}
        <motion.h1 variants={itemVariants} className="dearly-heading">
          {greeting}
        </motion.h1>

        {/* Soft Romantic Subtitle */}
        <motion.p variants={itemVariants} className="dearly-subtitle">
          {subtitle}
        </motion.p>

        {/* Strawberry Hero Illustration */}
        <motion.div
          variants={itemVariants}
          className="dearly-strawberry-container"
          onMouseEnter={() => setStrawberryMood('winking')}
          onMouseLeave={() => setStrawberryMood('happy')}
          onClick={() => setStrawberryMood((prev) => (prev === 'winking' ? 'happy' : 'winking'))}
          title="Click to give the strawberry a little love!"
        >
          <div className="dearly-strawberry-halo" aria-hidden="true" />
          <Strawberry size={170} mood={strawberryMood} isInteractive={true} />
        </motion.div>

        {/* Primary Call-to-Action Button */}
        <motion.div variants={itemVariants} className="dearly-cta-container">
          <motion.button
            type="button"
            className="dearly-primary-button"
            onClick={() => {
              window.dispatchEvent(new CustomEvent('dearly:start-music'));
              onOpenSurprise();
            }}
            whileHover={
              shouldReduceMotion
                ? undefined
                : {
                    scale: 1.04,
                    boxShadow: 'var(--shadow-button-hover)',
                  }
            }
            whileTap={shouldReduceMotion ? undefined : { scale: 0.96 }}
            aria-label={`${buttonLabel} for ${data.recipientName}`}
          >
            <Heart size={18} className="dearly-btn-icon" fill="currentColor" aria-hidden="true" />
            <span>{buttonLabel}</span>
            <Sparkles size={18} className="dearly-btn-icon-sparkle" aria-hidden="true" />
          </motion.button>
        </motion.div>

        {/* Music recommendation hint */}
        <motion.p variants={itemVariants} className="dearly-welcome-music-hint">
          <span>🎧 Best with music on (check top right ↗)</span>
        </motion.p>

        {/* Reassurance Footer Tagline */}
        <motion.p variants={itemVariants} className="dearly-foot-note">
          {data.tagline}
        </motion.p>
      </motion.div>
    </main>
  );
};

export default Welcome;
