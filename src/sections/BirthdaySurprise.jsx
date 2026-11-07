import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Sparkles, Heart, ArrowLeft, ArrowRight, Gift } from 'lucide-react';
import { Strawberry } from './Strawberry';
import { playUnwrapSound } from '../utils/audioEffects';

/**
 * BirthdaySurprise Component (Stage 2: Birthday Surprise)
 * ========================================================
 * Interactive birthday card that unfolds to reveal a heartfelt personalized
 * message, blooming hearts, and leads the user to meet their strawberry friend.
 */
export const BirthdaySurprise = ({ data, onNext, onBack }) => {
  const shouldReduceMotion = useReducedMotion();
  const [isOpened, setIsOpened] = useState(false);
  const surprise = data.surprise || {};

  const handleCardClick = () => {
    playUnwrapSound();
    setIsOpened(true);
  };

  return (
    <section className="dearly-surprise-section" aria-label="Birthday surprise reveal">
      <motion.div
        className="dearly-surprise-card"
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -20, scale: 0.98 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Decorative Top Badge */}
        <div className="dearly-badge-container">
          <span className="dearly-badge">
            <Sparkles size={14} className="dearly-badge-icon" aria-hidden="true" />
            <span>{surprise.badge || 'Special Delivery 🎀'}</span>
            <Sparkles size={14} className="dearly-badge-icon" aria-hidden="true" />
          </span>
        </div>

        {/* Personalized Stage Title & Subtitle */}
        <h2 className="dearly-surprise-heading">
          {surprise.title || 'Today is all about you.'}
        </h2>
        <p className="dearly-surprise-text">
          {surprise.subtitle ||
            'Someone made a little surprise to make your day extra special.'}
        </p>

        {/* Interactive Surprise Card / Box */}
        <div className="dearly-interactive-card-area">
          <AnimatePresence mode="wait">
            {!isOpened ? (
              /* Closed Gift Card State */
              <motion.div
                key="closed-gift"
                className="dearly-gift-box-interactive"
                onClick={handleCardClick}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleCardClick();
                  }
                }}
                tabIndex={0}
                role="button"
                aria-label="Tap to open the birthday surprise card"
                whileHover={shouldReduceMotion ? undefined : { scale: 1.04, y: -4 }}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.96 }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85, rotate: -4 }}
                transition={{ duration: 0.4 }}
              >
                <div className="dearly-gift-icon-bubble">
                  <Gift size={48} className="dearly-gift-icon" />
                  <motion.div
                    className="dearly-gift-sparkle"
                    animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Sparkles size={20} color="var(--color-gold)" />
                  </motion.div>
                </div>

                <p className="dearly-gift-prompt">
                  {surprise.cardPrompt || 'Tap to open your birthday surprise!'}
                </p>

                <div className="dearly-gift-ribbon-tag">
                  <Heart size={14} fill="currentColor" />
                  <span>For {data.recipientName}</span>
                </div>
              </motion.div>
            ) : (
              /* Opened Card State with Message & Burst Animation */
              <motion.div
                key="opened-gift"
                className="dearly-revealed-message-box"
                initial={{ opacity: 0, y: 16, scale: 0.92 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Floating mini hearts burst */}
                {!shouldReduceMotion && (
                  <div className="dearly-hearts-burst" aria-hidden="true">
                    {[
                      { x: -30, y: -40, delay: 0 },
                      { x: 35, y: -45, delay: 0.1 },
                      { x: -45, y: -10, delay: 0.15 },
                      { x: 40, y: -15, delay: 0.05 },
                    ].map((p, i) => (
                      <motion.span
                        key={i}
                        className="dearly-burst-heart"
                        initial={{ opacity: 0, x: 0, y: 0, scale: 0.5 }}
                        animate={{
                          opacity: [0, 1, 0],
                          x: p.x,
                          y: p.y,
                          scale: [0.5, 1.2, 0.8],
                        }}
                        transition={{ duration: 1.4, delay: p.delay, repeat: Infinity, repeatDelay: 1 }}
                      >
                        <Heart size={16} fill="var(--color-strawberry)" color="var(--color-strawberry)" />
                      </motion.span>
                    ))}
                  </div>
                )}

                <div className="dearly-revealed-icon">
                  <Strawberry size={120} mood="sparkle" isInteractive={false} animate={true} />
                </div>

                <h3 className="dearly-revealed-title">
                  {surprise.hiddenMessageTitle || 'You are truly cherished ✨'}
                </h3>

                <p className="dearly-revealed-text">
                  {surprise.hiddenMessage ||
                    'Every single moment ahead was gathered with love. Take your time, smile lots, and enjoy this little world created just for you.'}
                </p>

                <div className="dearly-revealed-actions">
                  <motion.button
                    type="button"
                    className="dearly-primary-button"
                    onClick={onNext}
                    whileHover={shouldReduceMotion ? undefined : { scale: 1.04 }}
                    whileTap={shouldReduceMotion ? undefined : { scale: 0.96 }}
                    aria-label={surprise.buttonLabel || 'Meet Your Strawberry Friend'}
                  >
                    <span>{surprise.buttonLabel || 'Meet Your Strawberry Friend 🍓'}</span>
                    <ArrowRight size={18} aria-hidden="true" />
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Back Navigation Button */}
        {onBack && (
          <div className="dearly-surprise-back-row">
            <button
              type="button"
              className="dearly-back-btn"
              onClick={onBack}
              aria-label="Back to welcome screen"
            >
              <ArrowLeft size={16} aria-hidden="true" />
              <span>Back to Greeting</span>
            </button>
          </div>
        )}
      </motion.div>
    </section>
  );
};

export default BirthdaySurprise;
