import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Sparkles, Heart, ArrowRight, ArrowLeft } from 'lucide-react';
import { playBerrySound } from '../utils/audioEffects';

/**
 * Cute 3D-Inspired Kawaii Strawberry Character Component (SVG Illustration)
 * ===========================================================================
 * Adorable vector mascot featuring:
 * - Glossy red 3D body with radial light & specular highlights
 * - Tiny golden seeds with 3D indents
 * - 5 lush green leafy calyx lobes & curving stem
 * - Expressive kawaii anime eyes, blushing rosy cheeks, and smiling tongue
 * - Tiny cute waving arms and little feet
 * - Ambient floating & jumping tap animation
 */
export const Strawberry = ({
  size = 185,
  isInteractive = true,
  animate = true,
  mood = 'happy', // 'happy' | 'winking' | 'sparkle'
  jumpKey = 0,
}) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      key={jumpKey}
      className="dearly-strawberry-wrapper"
      initial={shouldReduceMotion ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 0.95 }}
      animate={
        shouldReduceMotion
          ? { opacity: 1, scale: 1 }
          : jumpKey > 0
          ? {
              opacity: 1,
              scale: [0.92, 1.15, 0.96, 1.05, 1],
              y: [0, -22, 4, -8, 0],
              rotate: [0, -6, 6, -3, 0],
              transition: { duration: 0.55, ease: [0.34, 1.56, 0.64, 1] },
            }
          : {
              opacity: 1,
              scale: [1, 1.025, 1],
              y: [0, -7, 0],
              rotate: [-1, 1.5, -1],
              transition: {
                duration: 3.6,
                repeat: Infinity,
                repeatType: 'mirror',
                ease: 'easeInOut',
              },
            }
      }
      whileHover={
        isInteractive && !shouldReduceMotion
          ? { scale: 1.06, rotate: 2, transition: { duration: 0.25 } }
          : undefined
      }
      whileTap={
        isInteractive && !shouldReduceMotion
          ? { scale: 0.94, rotate: -2, transition: { duration: 0.15 } }
          : undefined
      }
      style={{
        width: size,
        height: size,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: isInteractive ? 'pointer' : 'default',
        userSelect: 'none',
        position: 'relative',
        opacity: 1, // Explicit visibility guarantee
      }}
      aria-label="Cute 3D-inspired kawaii strawberry mascot"
      role="img"
    >
      <svg
        viewBox="0 0 220 220"
        width="100%"
        height="100%"
        style={{
          overflow: 'visible',
          filter: 'drop-shadow(0 14px 24px rgba(232, 91, 114, 0.28))',
          display: 'block',
        }}
      >
        <defs>
          {/* 3D Glossy Strawberry Body Gradient */}
          <radialGradient id="berry3dGrad" cx="35%" cy="30%" r="72%">
            <stop offset="0%" stopColor="#FFA6B8" />
            <stop offset="22%" stopColor="#FF5C78" />
            <stop offset="60%" stopColor="#E83D5D" />
            <stop offset="88%" stopColor="#C92545" />
            <stop offset="100%" stopColor="#9B1530" />
          </radialGradient>

          {/* Lush Green Leaf Gradient (Front) */}
          <linearGradient id="leaf3dGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#8CE498" />
            <stop offset="55%" stopColor="#4EAE5C" />
            <stop offset="100%" stopColor="#317D3D" />
          </linearGradient>

          {/* Deeper Green Leaf Gradient (Back) */}
          <linearGradient id="leafBackGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#439A50" />
            <stop offset="100%" stopColor="#25602E" />
          </linearGradient>

          {/* Golden Seed Gradient */}
          <linearGradient id="goldSeedGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFEE2" />
            <stop offset="50%" stopColor="#FFE07A" />
            <stop offset="100%" stopColor="#E5A638" />
          </linearGradient>

          {/* Cheerful Blushing Cheek Glow */}
          <radialGradient id="cheekBlush" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FF8FA3" stopOpacity="0.85" />
            <stop offset="60%" stopColor="#FF8FA3" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#FF8FA3" stopOpacity="0" />
          </radialGradient>

          {/* Soft Foot Gradient */}
          <linearGradient id="footGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FF5C78" />
            <stop offset="100%" stopColor="#B31A35" />
          </linearGradient>
        </defs>

        {/* --- TINY CUTE FEET --- */}
        <g id="feet">
          {/* Left Foot */}
          <path
            d="M 80 178 C 72 182 68 194 76 199 C 84 203 94 198 94 186 Z"
            fill="url(#footGrad)"
            stroke="#9B1530"
            strokeWidth="1.2"
          />
          {/* Right Foot */}
          <path
            d="M 140 178 C 148 182 152 194 144 199 C 136 203 126 198 126 186 Z"
            fill="url(#footGrad)"
            stroke="#9B1530"
            strokeWidth="1.2"
          />
        </g>

        {/* --- TINY CUTE ARMS (Behind/Beside Body) --- */}
        <g id="arms">
          {/* Left Arm (Cute resting nub) */}
          <path
            d="M 44 114 C 28 118 24 134 34 142 C 42 148 52 138 48 124 Z"
            fill="url(#footGrad)"
            stroke="#9B1530"
            strokeWidth="1.2"
          />

          {/* Right Arm (Playfully waving upwards!) */}
          <path
            d="M 176 114 C 190 106 202 92 196 82 C 188 74 176 86 170 102 Z"
            fill="url(#footGrad)"
            stroke="#9B1530"
            strokeWidth="1.2"
          />
          {/* Little waving paw ball */}
          <circle cx="196" cy="83" r="5" fill="#FFA6B8" stroke="#9B1530" strokeWidth="1" />
        </g>

        {/* --- 3D GLOSSY STRAWBERRY BODY --- */}
        <path
          d="M 110 186
             C 68 170 44 140 40 104
             C 36 72 54 46 84 44
             C 96 43.2 104 46.5 110 50
             C 116 46.5 124 43.2 136 44
             C 166 46 184 72 180 104
             C 176 140 152 170 110 186 Z"
          fill="url(#berry3dGrad)"
        />

        {/* 3D Specular Gloss Highlight (Left shoulder reflection) */}
        <path
          d="M 68 56 C 52 70 48 94 50 114 C 48 95 56 72 74 60 C 86 52 98 50 106 48 C 90 48 78 50 68 56 Z"
          fill="#FFFFFF"
          opacity="0.45"
        />
        {/* Soft Secondary Rim Light (Right edge) */}
        <path
          d="M 154 68 C 164 88 166 112 160 134 C 164 114 162 90 152 74 Z"
          fill="#FFA6B8"
          opacity="0.32"
        />

        {/* --- TINY GOLDEN SEEDS (with 3D depth shadows) --- */}
        <g id="golden-seeds">
          {[
            { cx: 76, cy: 76, r: -18 },
            { cx: 110, cy: 72, r: 0 },
            { cx: 144, cy: 76, r: 18 },
            { cx: 62, cy: 102, r: -22 },
            { cx: 158, cy: 102, r: 22 },
            { cx: 68, cy: 144, r: -16 },
            { cx: 152, cy: 144, r: 16 },
            { cx: 88, cy: 164, r: -10 },
            { cx: 132, cy: 164, r: 10 },
            { cx: 110, cy: 175, r: 0 },
          ].map((s, idx) => (
            <g key={idx} transform={`rotate(${s.r} ${s.cx} ${s.cy})`}>
              {/* Seed depth shadow */}
              <ellipse cx={s.cx} cy={s.cy + 0.8} rx="2.5" ry="3.8" fill="#880F25" opacity="0.6" />
              {/* Golden Seed */}
              <ellipse cx={s.cx} cy={s.cy} rx="2.2" ry="3.6" fill="url(#goldSeedGrad)" />
              {/* Seed tiny sparkle */}
              <circle cx={s.cx - 0.6} cy={s.cy - 1.2} r="0.8" fill="#FFFFFF" opacity="0.9" />
            </g>
          ))}
        </g>

        {/* --- KAWAII FACE --- */}
        <g id="face">
          {/* Big Rosy Cheeks */}
          <circle cx="76" cy="124" r="16" fill="url(#cheekBlush)" />
          <circle cx="144" cy="124" r="16" fill="url(#cheekBlush)" />

          {/* Expressive Kawaii Eyes */}
          {mood === 'winking' ? (
            <>
              {/* Left Eye: Open Glossy Anime Sparkle */}
              <ellipse cx="88" cy="112" rx="7.5" ry="8.5" fill="#2B131C" />
              <circle cx="86" cy="109" r="3.2" fill="#FFFFFF" />
              <circle cx="91.5" cy="115" r="1.5" fill="#FFFFFF" />
              <circle cx="86" cy="116" r="0.8" fill="#FFAEC0" />

              {/* Right Eye: Sweet Curved Wink Arc */}
              <path
                d="M 124 112 Q 133 103 142 112"
                stroke="#2B131C"
                strokeWidth="3.6"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M 140 109 L 145 106"
                stroke="#2B131C"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
            </>
          ) : (
            <>
              {/* Left Eye */}
              <ellipse cx="88" cy="112" rx="7.5" ry="8.5" fill="#2B131C" />
              <circle cx="86" cy="109" r="3.2" fill="#FFFFFF" />
              <circle cx="91.5" cy="115" r="1.5" fill="#FFFFFF" />
              {mood === 'sparkle' && (
                <path
                  d="M 88 107 L 89 110 L 92 111 L 89 112 L 88 115 L 87 112 L 84 111 L 87 110 Z"
                  fill="#FFF3B0"
                />
              )}

              {/* Right Eye */}
              <ellipse cx="132" cy="112" rx="7.5" ry="8.5" fill="#2B131C" />
              <circle cx="130" cy="109" r="3.2" fill="#FFFFFF" />
              <circle cx="135.5" cy="115" r="1.5" fill="#FFFFFF" />
              {mood === 'sparkle' && (
                <path
                  d="M 132 107 L 133 110 L 136 111 L 133 112 L 132 115 L 131 112 L 128 111 L 131 110 Z"
                  fill="#FFF3B0"
                />
              )}
            </>
          )}

          {/* Sweet Cheerful Smiling Mouth with Pink Tongue */}
          <path
            d="M 103 119 Q 110 130 117 119"
            stroke="#2B131C"
            strokeWidth="3"
            strokeLinecap="round"
            fill="#801226"
          />
          <path
            d="M 104 120 Q 110 128 116 120 Z"
            fill="#FFA3B4"
          />
        </g>

        {/* --- GREEN LEAFY CROWN (CALYX & STEM) --- */}
        <g id="leaf-crown">
          {/* Back Leaves */}
          <path
            d="M 110 42 C 90 28 72 32 60 44 C 74 48 90 46 102 44 Z"
            fill="url(#leafBackGrad)"
          />
          <path
            d="M 110 42 C 130 28 148 32 160 44 C 146 48 130 46 118 44 Z"
            fill="url(#leafBackGrad)"
          />

          {/* Playful Central Curved Stem */}
          <path
            d="M 110 40 C 108 24 114 12 122 8 C 124 7 125 9 123 11 C 117 16 114 26 114 40 Z"
            fill="#2A6834"
            stroke="#1D4E25"
            strokeWidth="1"
          />
          <circle cx="123" cy="8" r="2" fill="#8CE498" />

          {/* Front Center Drooping Leaves */}
          <path
            d="M 110 44 C 94 36 78 48 72 64 C 84 59 98 52 106 46 Z"
            fill="url(#leaf3dGrad)"
          />
          <path
            d="M 110 44 C 126 36 142 48 148 64 C 136 59 122 52 114 46 Z"
            fill="url(#leaf3dGrad)"
          />
          <path
            d="M 102 44 C 106 56 110 68 110 70 C 110 68 114 56 118 44 Z"
            fill="#52B861"
          />

          {/* Cute Little Ribbon Accessory on Stem */}
          <g transform="translate(142, 38) rotate(16)">
            <ellipse cx="-5" cy="0" rx="5" ry="3.5" fill="#FFF0F5" stroke="#E85B72" strokeWidth="1" />
            <ellipse cx="5" cy="0" rx="5" ry="3.5" fill="#FFF0F5" stroke="#E85B72" strokeWidth="1" />
            <circle cx="0" cy="0" r="2.8" fill="#E85B72" />
          </g>
        </g>

        {/* Ambient Gold Sparkles */}
        <path
          d="M 166 62 L 168 67 L 173 69 L 168 71 L 166 76 L 164 71 L 159 69 L 164 67 Z"
          fill="#FFD166"
          opacity="0.9"
        />
        <path
          d="M 40 82 L 41.5 86 L 45.5 87.5 L 41.5 89 L 40 93 L 38.5 89 L 34.5 87.5 L 38.5 86 Z"
          fill="#FFD166"
          opacity="0.8"
        />
      </svg>
    </motion.div>
  );
};

/**
 * StrawberrySection Component (Stage 3: Interactive Strawberry Mascot)
 * ======================================================================
 * Features the large, adorable 3D-inspired kawaii mascot who speaks
 * charming birthday messages in an animated speech bubble, wiggles/jumps
 * on tap, bursts hearts & sparkles, and leads smoothly into memories.
 */
export const StrawberrySection = ({ data, onNext, onBack }) => {
  const shouldReduceMotion = useReducedMotion();
  const berryConfig = data.strawberry || {};

  const defaultMessages = [
    "You're berry special, Sushi! 🍓",
    "Happy 24th Birthday, Bhavna! 💖",
    "Thank you for always being you! ✨",
    "Never stop replying to random reels! 😭🌸",
    "May your day be filled with cake & joy! 🎂",
  ];

  const messages =
    berryConfig.messages && berryConfig.messages.length > 0
      ? berryConfig.messages
      : defaultMessages;

  const [messageIdx, setMessageIdx] = useState(0);
  const [mood, setMood] = useState('happy');
  const [clickCount, setClickCount] = useState(0);
  const [jumpCount, setJumpCount] = useState(0);
  const [tapParticles, setTapParticles] = useState([]);

  const handleBerryClick = () => {
    playBerrySound();
    setMessageIdx((prev) => (prev + 1) % messages.length);
    setMood((prev) => (prev === 'winking' ? 'happy' : 'winking'));
    setClickCount((c) => c + 1);
    setJumpCount((j) => j + 1);

    // Burst floating hearts & sparkles around strawberry
    const particles = [
      { id: Date.now() + 1, x: -45, y: -40, icon: '💖' },
      { id: Date.now() + 2, x: 45, y: -45, icon: '✨' },
      { id: Date.now() + 3, x: -60, y: -10, icon: '🌸' },
      { id: Date.now() + 4, x: 55, y: -15, icon: '🍓' },
      { id: Date.now() + 5, x: 0, y: -55, icon: '💕' },
    ];
    setTapParticles(particles);
    setTimeout(() => setTapParticles([]), 900);
  };

  return (
    <section className="dearly-strawberry-section" aria-label="Interactive Strawberry Mascot">
      <motion.div
        className="dearly-strawberry-stage-card"
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -20, scale: 0.98 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Decorative Top Badge */}
        <div className="dearly-badge-container" style={{ marginBottom: '10px' }}>
          <span className="dearly-badge">
            <Sparkles size={14} className="dearly-badge-icon" aria-hidden="true" />
            <span>{berryConfig.badge || 'Strawberry Sweet 🍓'}</span>
            <Sparkles size={14} className="dearly-badge-icon" aria-hidden="true" />
          </span>
        </div>

        <h2 className="dearly-surprise-heading" style={{ margin: '4px 0 6px 0', fontSize: 'clamp(1.5rem, 4vw, 2rem)' }}>
          {berryConfig.title || 'A Sweet Birthday Friend for Sushi'}
        </h2>
        <p className="dearly-surprise-text" style={{ margin: '0 auto 10px auto', fontSize: '0.92rem' }}>
          {berryConfig.subtitle ||
            'Tap the strawberry to hear sweet little birthday thoughts for Sushi!'}
        </p>

        {/* Speech Bubble Above Character */}
        <div className="dearly-speech-bubble-container">
          <AnimatePresence mode="wait">
            <motion.div
              key={messageIdx}
              className="dearly-speech-bubble"
              initial={{ opacity: 0, y: 8, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.9 }}
              transition={{ duration: 0.28 }}
            >
              <span className="dearly-speech-text">{messages[messageIdx]}</span>
              <div className="dearly-speech-tail" aria-hidden="true" />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Interactive Strawberry Mascot with Soft Pink Glow & Floating Particles */}
        <div className="dearly-strawberry-interactive-zone">
          {/* Floating Tap Particles on Click */}
          <AnimatePresence>
            {tapParticles.map((p) => (
              <motion.span
                key={p.id}
                className="dearly-tap-particle"
                initial={{ opacity: 1, scale: 0.6, x: 0, y: 0 }}
                animate={{
                  opacity: 0,
                  scale: 1.4,
                  x: p.x,
                  y: p.y,
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.85, ease: 'easeOut' }}
                aria-hidden="true"
              >
                {p.icon}
              </motion.span>
            ))}
          </AnimatePresence>

          <button
            type="button"
            className="dearly-strawberry-tap-target"
            onClick={handleBerryClick}
            aria-label="Tap the strawberry mascot for another sweet message"
          >
            {/* Soft Ambient Pink Glow */}
            <div className="dearly-strawberry-halo" aria-hidden="true" />

            {/* The Mascot */}
            <Strawberry size={185} mood={mood} isInteractive={true} jumpKey={jumpCount} />
          </button>

          {/* Click Prompt Hint */}
          <p className="dearly-strawberry-tap-hint">
            <Heart size={13} fill="currentColor" aria-hidden="true" />
            <span>
              {clickCount === 0
                ? (berryConfig.tapPrompt || 'Tap me, Sushi! 🍓')
                : 'Tap again for more love! 🌸'}
            </span>
          </p>
        </div>

        {/* Primary CTA Button */}
        <div className="dearly-cta-container" style={{ marginTop: '10px', marginBottom: '8px' }}>
          <motion.button
            type="button"
            className="dearly-primary-button"
            onClick={onNext}
            whileHover={shouldReduceMotion ? undefined : { scale: 1.04 }}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.96 }}
            aria-label={berryConfig.buttonLabel || 'Sushi 🎀'}
          >
            <span>{berryConfig.buttonLabel || 'Sushi 🎀'}</span>
            <ArrowRight size={18} aria-hidden="true" />
          </motion.button>
        </div>

        {/* Back Navigation Button */}
        {onBack && (
          <div className="dearly-surprise-back-row" style={{ marginTop: '4px' }}>
            <button
              type="button"
              className="dearly-back-btn"
              onClick={onBack}
              aria-label="Back to surprise card"
            >
              <ArrowLeft size={16} aria-hidden="true" />
              <span>Back to Surprise</span>
            </button>
          </div>
        )}
      </motion.div>
    </section>
  );
};

export default StrawberrySection;
