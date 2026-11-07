import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Sparkles, Heart, ArrowRight, ArrowLeft, Mail, Feather } from 'lucide-react';
import { playLetterSound } from '../utils/audioEffects';

/**
 * BirthdayLetter Component (Stage 5: Handwritten Birthday Letter)
 * ================================================================
 * Romantic stationery letter experience. Initially presented in a sealed pastel
 * envelope with a wax stamp. When unsealed, reveals the letter with authentic
 * cursive typography, multiline paragraphs, and the sender's signature.
 */
export const BirthdayLetter = ({ data, onNext, onBack }) => {
  const shouldReduceMotion = useReducedMotion();
  const [isOpen, setIsOpen] = useState(false);

  const letterConfig = data.letter || {};
  const recipientName = data.recipientName || 'Someone Special';
  const senderName = data.senderName || 'With all my love';

  // Support both paragraph array and newline-separated string
  const paragraphs =
    letterConfig.paragraphs && letterConfig.paragraphs.length > 0
      ? letterConfig.paragraphs
      : letterConfig.message
      ? letterConfig.message.split('\n\n')
      : [
          'Wishing you the happiest birthday filled with peace, love, and joyful laughter.',
          'May every moment ahead bring you reasons to smile.',
        ];

  return (
    <section className="dearly-letter-section" aria-label="Birthday letter">
      <motion.div
        className="dearly-letter-container"
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -20 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Top Header Badge */}
        <div className="dearly-badge-container">
          <span className="dearly-badge">
            <Feather size={14} className="dearly-badge-icon" aria-hidden="true" />
            <span>{letterConfig.badge || 'From the Heart 💌'}</span>
            <Feather size={14} className="dearly-badge-icon" aria-hidden="true" />
          </span>
        </div>

        <AnimatePresence mode="wait">
          {!isOpen ? (
            /* CLOSED ENVELOPE VIEW */
            <motion.div
              key="envelope"
              className="dearly-envelope-card"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, y: -10 }}
              transition={{ duration: 0.4 }}
            >
              <div className="dearly-envelope-illustration">
                {/* Envelope Flap Vector Shape */}
                <svg viewBox="0 0 240 160" width="100%" height="100%" className="dearly-envelope-svg">
                  {/* Envelope Base */}
                  <rect x="10" y="25" width="220" height="125" rx="14" fill="#FFF4F8" stroke="#F0D5E2" strokeWidth="2" />
                  {/* Flap lines */}
                  <path d="M 10 25 L 120 100 L 230 25" fill="#FFEBF2" stroke="#F0D5E2" strokeWidth="1.5" />
                  <path d="M 10 150 L 95 85" stroke="#F0D5E2" strokeWidth="1" strokeDasharray="3 3" />
                  <path d="M 230 150 L 145 85" stroke="#F0D5E2" strokeWidth="1" strokeDasharray="3 3" />
                  {/* Wax Seal */}
                  <circle cx="120" cy="100" r="22" fill="#E85B72" filter="drop-shadow(0 3px 6px rgba(206, 71, 94, 0.35))" />
                  <circle cx="120" cy="100" r="18" fill="none" stroke="#FFA1B2" strokeWidth="1.5" />
                  <path
                    d="M 120 106 C 117 103 112 99 112 95 C 112 92 114 90 117 90 C 118.5 90 119.5 91 120 92 C 120.5 91 121.5 90 123 90 C 126 90 128 92 128 95 C 128 99 123 103 120 106 Z"
                    fill="#FFF0F5"
                  />
                </svg>
              </div>

              <div className="dearly-envelope-address">
                <p className="dearly-envelope-label">Personal Letter For:</p>
                <h3 className="dearly-envelope-name">Dearest {recipientName}</h3>
                <p className="dearly-envelope-hint">
                  {letterConfig.envelopePrompt || 'Click the wax seal to open your letter'}
                </p>
              </div>

              <div className="dearly-cta-container">
                <motion.button
                  type="button"
                  className="dearly-primary-button"
                  onClick={() => {
                    playLetterSound();
                    setIsOpen(true);
                  }}
                  whileHover={shouldReduceMotion ? undefined : { scale: 1.04 }}
                  whileTap={shouldReduceMotion ? undefined : { scale: 0.96 }}
                  aria-label="Open your birthday letter"
                >
                  <Mail size={18} aria-hidden="true" />
                  <span>{letterConfig.openButtonLabel || 'Open Your Letter 💌'}</span>
                </motion.button>
              </div>
            </motion.div>
          ) : (
            /* OPENED LETTER STATIONERY VIEW */
            <motion.div
              key="letter"
              className="dearly-letter-paper"
              initial={{ opacity: 0, y: 24, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Stationery Header */}
              <div className="dearly-letter-header">
                <div>
                  <h3 className="dearly-letter-title">
                    {letterConfig.title || 'Happy Birthday, My Favorite Person'}
                  </h3>
                  <p className="dearly-letter-date">{letterConfig.date || 'Today & Always'}</p>
                </div>
                <div className="dearly-letter-stamp" aria-hidden="true">
                  <Heart size={16} fill="var(--color-strawberry)" color="var(--color-strawberry)" />
                </div>
              </div>

              {/* Salutation */}
              <p className="dearly-letter-salutation">Dearest {recipientName},</p>

              {/* Letter Paragraphs */}
              <div className="dearly-letter-body">
                {paragraphs.map((para, i) => (
                  <p key={i} className="dearly-letter-paragraph">
                    {para}
                  </p>
                ))}
              </div>

              {/* Postscript Note */}
              {letterConfig.postscript && (
                <p className="dearly-letter-postscript">{letterConfig.postscript}</p>
              )}

              {/* Sign-Off with Sender Name */}
              <div className="dearly-letter-signoff">
                <span className="dearly-signoff-text">{senderName}</span>
                <Heart size={18} fill="var(--color-strawberry)" color="var(--color-strawberry)" />
              </div>

              {/* CTA to Final Surprise */}
              <div className="dearly-cta-container" style={{ marginTop: '28px' }}>
                <motion.button
                  type="button"
                  className="dearly-primary-button"
                  onClick={onNext}
                  whileHover={shouldReduceMotion ? undefined : { scale: 1.04 }}
                  whileTap={shouldReduceMotion ? undefined : { scale: 0.96 }}
                  aria-label={letterConfig.buttonLabel || 'One Last Surprise'}
                >
                  <span>{letterConfig.buttonLabel || 'One Last Surprise 🎂'}</span>
                  <ArrowRight size={18} aria-hidden="true" />
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Back Navigation Button */}
        {onBack && (
          <div className="dearly-surprise-back-row">
            <button
              type="button"
              className="dearly-back-btn"
              onClick={onBack}
              aria-label="Back to photo memories"
            >
              <ArrowLeft size={16} aria-hidden="true" />
              <span>Back to Memories</span>
            </button>
          </div>
        )}
      </motion.div>
    </section>
  );
};

export default BirthdayLetter;
