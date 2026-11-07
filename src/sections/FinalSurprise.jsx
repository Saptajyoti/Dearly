import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Sparkles, Heart, RotateCcw, ArrowLeft, Gamepad2 } from 'lucide-react';
import { Strawberry } from './Strawberry';
import { playBlowCandleSound } from '../utils/audioEffects';

/**
 * FinalSurprise Component (Stage 6: Birthday Cake & Celebration Finale)
 * =====================================================================
 * The grand finale featuring an interactive birthday cake with flickering
 * candles to blow out, lightweight confetti burst, and the option to replay
 * the entire experience or continue to the bonus mini-games.
 */
export const FinalSurprise = ({ data, onRestart, onBack, onGoToGames }) => {
  const shouldReduceMotion = useReducedMotion();
  const [candlesBlown, setCandlesBlown] = useState(false);

  const finalConfig = data.finalSurprise || {};
  const recipientName = data.recipientName || 'Someone Special';

  const handleBlowCandles = () => {
    playBlowCandleSound();
    setCandlesBlown(true);
  };

  return (
    <section className="dearly-final-section" aria-label="Birthday finale and candle wish">
      <motion.div
        className="dearly-final-card"
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -20 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Confetti Particles on Candle Blow */}
        {candlesBlown && !shouldReduceMotion && (
          <div className="dearly-confetti-shower" aria-hidden="true">
            {Array.from({ length: 22 }).map((_, i) => {
              const colors = ['#E85B72', '#FFA1B2', '#FFD166', '#76C980', '#C76B91', '#F8DCE8'];
              const color = colors[i % colors.length];
              const left = (i / 22) * 94 + 3;
              const delay = (i * 0.08) % 1.2;
              const size = 6 + (i % 6);
              const isRibbon = i % 2 === 0;

              return (
                <motion.span
                  key={i}
                  className="dearly-confetti-piece"
                  initial={{
                    opacity: 1,
                    top: '-5%',
                    left: `${left}%`,
                    rotate: 0,
                    scale: 0.8,
                  }}
                  animate={{
                    opacity: [1, 1, 0],
                    top: '105%',
                    rotate: 360 * ((i % 2 === 0 ? 1 : -1) * 2),
                    x: [(i % 3 - 1) * 20, (1 - (i % 3)) * 30],
                  }}
                  transition={{
                    duration: 3 + (i % 2),
                    delay: delay,
                    ease: 'easeOut',
                    repeat: Infinity,
                    repeatDelay: 1.5,
                  }}
                  style={{
                    position: 'absolute',
                    width: isRibbon ? size * 1.5 : size,
                    height: isRibbon ? size * 0.6 : size,
                    backgroundColor: color,
                    borderRadius: isRibbon ? '2px' : '50%',
                    zIndex: 20,
                  }}
                />
              );
            })}
          </div>
        )}

        {/* Decorative Top Badge */}
        <div className="dearly-badge-container">
          <span className="dearly-badge">
            <Sparkles size={14} className="dearly-badge-icon" aria-hidden="true" />
            <span>{finalConfig.badge || 'Make a Wish ✨'}</span>
            <Sparkles size={14} className="dearly-badge-icon" aria-hidden="true" />
          </span>
        </div>

        {/* Main Heading */}
        <h2 className="dearly-heading">
          {finalConfig.title
            ? (finalConfig.title.includes('{name}')
                ? finalConfig.title.replace('{name}', recipientName)
                : finalConfig.title.includes(recipientName)
                ? finalConfig.title
                : `${finalConfig.title} ${recipientName}!`)
            : `Happy Birthday, ${recipientName}!`}
        </h2>

        {/* Subtitle */}
        <p className="dearly-subtitle">
          {finalConfig.subtitle || "You're one of the most special people in my life."}
        </p>

        {/* Birthday Cake Artwork */}
        <div className="dearly-cake-container">
          <svg
            viewBox="0 0 240 200"
            width="220"
            height="185"
            className="dearly-cake-svg"
            style={{ overflow: 'visible', filter: 'drop-shadow(0 12px 24px rgba(199, 107, 145, 0.18))' }}
          >
            <defs>
              <linearGradient id="cakeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FFF9FC" />
                <stop offset="100%" stopColor="#FCE7F0" />
              </linearGradient>
              <linearGradient id="icingGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FFAEC0" />
                <stop offset="100%" stopColor="#E85B72" />
              </linearGradient>
              <radialGradient id="flameGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FFF3B0" />
                <stop offset="50%" stopColor="#FFD166" />
                <stop offset="100%" stopColor="#E85B72" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Cake Plate */}
            <ellipse cx="120" cy="180" rx="90" ry="14" fill="#FFFFFF" stroke="#F0D5E2" strokeWidth="2" />

            {/* Bottom Tier */}
            <path
              d="M 50 135 C 50 135 50 170 120 170 C 190 170 190 135 190 135 L 190 125 C 190 125 190 140 120 140 C 50 140 50 125 50 125 Z"
              fill="url(#cakeGrad)"
              stroke="#F0D5E2"
              strokeWidth="1.5"
            />
            {/* Bottom Tier Frosting Drips */}
            <path
              d="M 50 125 Q 60 138 70 125 Q 85 142 95 125 Q 110 144 120 125 Q 135 144 145 125 Q 160 140 170 125 Q 180 136 190 125 L 190 115 C 190 115 190 125 120 125 C 50 125 50 115 50 115 Z"
              fill="url(#icingGrad)"
            />

            {/* Top Tier */}
            <path
              d="M 75 90 C 75 90 75 120 120 120 C 165 120 165 90 165 90 L 165 80 C 165 80 165 92 120 92 C 75 92 75 80 75 80 Z"
              fill="url(#cakeGrad)"
              stroke="#F0D5E2"
              strokeWidth="1.5"
            />
            {/* Top Tier Frosting Drips */}
            <path
              d="M 75 80 Q 85 92 95 80 Q 108 95 120 80 Q 132 95 145 80 Q 155 90 165 80 L 165 72 C 165 72 165 82 120 82 C 75 82 75 72 75 72 Z"
              fill="url(#icingGrad)"
            />

            {/* Cake Strawberries on Top */}
            <circle cx="95" cy="74" r="5" fill="#E85B72" />
            <circle cx="120" cy="75" r="5" fill="#E85B72" />
            <circle cx="145" cy="74" r="5" fill="#E85B72" />

            {/* Candles: Left, Center, Right */}
            {[
              { x: 95, y: 44, h: 26 },
              { x: 120, y: 38, h: 32 },
              { x: 145, y: 44, h: 26 },
            ].map((c, idx) => (
              <g key={idx}>
                {/* Candle Body */}
                <rect
                  x={c.x - 3}
                  y={c.y}
                  width="6"
                  height={c.h}
                  rx="2"
                  fill="#FFF0F5"
                  stroke="#E85B72"
                  strokeWidth="1"
                />
                {/* Candle Wick */}
                <line x1={c.x} y1={c.y} x2={c.x} y2={c.y - 4} stroke="#684454" strokeWidth="1.2" />

                {/* Candle Flame (Flickering if lit) */}
                {!candlesBlown ? (
                  <motion.g
                    animate={
                      shouldReduceMotion
                        ? undefined
                        : {
                            scaleY: [1, 1.15, 0.9, 1.1, 1],
                            scaleX: [1, 0.92, 1.08, 0.95, 1],
                            y: [0, -1, 0.5, -0.8, 0],
                          }
                    }
                    transition={{
                      duration: 0.8 + idx * 0.15,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    style={{ transformOrigin: `${c.x}px ${c.y - 4}px` }}
                  >
                    {/* Flame Outer Glow */}
                    <circle cx={c.x} cy={c.y - 10} r="10" fill="url(#flameGlow)" opacity="0.6" />
                    {/* Flame Core */}
                    <path
                      d={`M ${c.x} ${c.y - 4} Q ${c.x - 4} ${c.y - 12} ${c.x} ${c.y - 18} Q ${c.x + 4} ${c.y - 12} ${c.x} ${c.y - 4} Z`}
                      fill="#FFD166"
                    />
                    <path
                      d={`M ${c.x} ${c.y - 5} Q ${c.x - 2} ${c.y - 10} ${c.x} ${c.y - 14} Q ${c.x + 2} ${c.y - 10} ${c.x} ${c.y - 5} Z`}
                      fill="#FFF3B0"
                    />
                  </motion.g>
                ) : (
                  /* Smoke puff when blown out */
                  <motion.path
                    d={`M ${c.x} ${c.y - 6} Q ${c.x - 3} ${c.y - 12} ${c.x + 2} ${c.y - 18} Q ${c.x - 2} ${c.y - 24} ${c.x + 4} ${c.y - 30}`}
                    stroke="#C7B2BD"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    fill="none"
                    initial={{ opacity: 0.8, pathLength: 0 }}
                    animate={{ opacity: 0, pathLength: 1, y: -10 }}
                    transition={{ duration: 1.2 }}
                  />
                )}
              </g>
            ))}
          </svg>
        </div>

        {/* Interactive Candle Blow CTA or Celebratory Message */}
        <AnimatePresence mode="wait">
          {!candlesBlown ? (
            <motion.div
              key="wish-prompt"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ textAlign: 'center', width: '100%' }}
            >
              <p className="dearly-cake-prompt">
                {finalConfig.instruction ||
                  'Close your eyes, make a sweet wish, and blow out the candles! 🕯️'}
              </p>

              <div className="dearly-cta-container">
                <motion.button
                  type="button"
                  className="dearly-primary-button"
                  onClick={handleBlowCandles}
                  whileHover={shouldReduceMotion ? undefined : { scale: 1.05 }}
                  whileTap={shouldReduceMotion ? undefined : { scale: 0.95 }}
                  aria-label="Blow out the birthday candles"
                >
                  <Sparkles size={18} aria-hidden="true" />
                  <span>{finalConfig.blowButtonLabel || 'Blow Out the Candles 🌬️🎂'}</span>
                </motion.button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="wish-granted"
              initial={{ opacity: 0, y: 14, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              style={{ textAlign: 'center', width: '100%' }}
            >
              <div className="dearly-granted-banner">
                <h3 className="dearly-granted-title">
                  {finalConfig.blownTitle || 'May All Your Wishes Come True! 🎉💖'}
                </h3>
                <p className="dearly-granted-message">
                  {finalConfig.blownMessage ||
                    "Here's to another year filled with gentle mornings, big dreams, belly laughs, and infinite happiness."}
                </p>
              </div>

              {/* Celebrating Strawberry Mascot */}
              <div style={{ margin: '18px 0 12px 0' }}>
                <Strawberry size={150} mood="winking" isInteractive={true} animate={true} />
              </div>

              {/* Action Buttons: Games & Restart */}
              <div className="dearly-cta-container" style={{ flexDirection: 'column', gap: '12px' }}>
                {onGoToGames && (
                  <motion.button
                    type="button"
                    className="dearly-primary-button"
                    onClick={onGoToGames}
                    whileHover={shouldReduceMotion ? undefined : { scale: 1.04 }}
                    whileTap={shouldReduceMotion ? undefined : { scale: 0.96 }}
                    aria-label="Play little games for Sushi"
                  >
                    <Gamepad2 size={18} aria-hidden="true" />
                    <span>{finalConfig.gamesButtonLabel || 'Play Little Games for Sushi 🍓🎮'}</span>
                  </motion.button>
                )}

                <motion.button
                  type="button"
                  className="dearly-secondary-button"
                  onClick={onRestart}
                  whileHover={shouldReduceMotion ? undefined : { scale: 1.04 }}
                  whileTap={shouldReduceMotion ? undefined : { scale: 0.96 }}
                  aria-label="Start birthday experience again"
                >
                  <RotateCcw size={16} aria-hidden="true" />
                  <span>{finalConfig.replayButtonLabel || 'Start Again 🔁'}</span>
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Back Navigation Button */}
        {onBack && !candlesBlown && (
          <div className="dearly-surprise-back-row">
            <button
              type="button"
              className="dearly-back-btn"
              onClick={onBack}
              aria-label="Back to birthday letter"
            >
              <ArrowLeft size={16} aria-hidden="true" />
              <span>Back to Letter</span>
            </button>
          </div>
        )}
      </motion.div>
    </section>
  );
};

export default FinalSurprise;
