import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Sparkles, Heart, Trophy, ArrowLeft, RotateCcw, Lock, Unlock } from 'lucide-react';
import { CatchHeartsGame } from './games/CatchHeartsGame';
import { ScratchCardGame } from './games/ScratchCardGame';
import { MemoryMatchGame } from './games/MemoryMatchGame';
import { Strawberry } from './Strawberry';
import { playBlowCandleSound } from '../utils/audioEffects';

/**
 * MiniGames Section: Little Games for Sushi 🍓
 * ===============================================
 * Features three playable pastel mini-games:
 * 1. Catch the Hearts
 * 2. Scratch to Reveal
 * 3. Memory Match
 * With a grand reward card & secret note when all three are cleared!
 */
export const MiniGames = ({ data, onBack, onRestart }) => {
  const shouldReduceMotion = useReducedMotion();
  const gamesConfig = data.miniGames || {};
  const recipientName = data.nickname || data.recipientName || 'Sushi';

  // Active game tab: 'catch' | 'scratch' | 'memory'
  const [activeTab, setActiveTab] = useState('catch');

  // Track completion of all 3 games
  const [completed, setCompleted] = useState({
    catchHearts: false,
    scratchCard: false,
    memoryMatch: false,
  });

  const [hasCelebratedAll, setHasCelebratedAll] = useState(false);

  const handleGameComplete = (gameKey) => {
    setCompleted((prev) => {
      const updated = { ...prev, [gameKey]: true };
      // Check if this newly unlocked all 3
      if (updated.catchHearts && updated.scratchCard && updated.memoryMatch && !hasCelebratedAll) {
        setHasCelebratedAll(true);
        playBlowCandleSound();
      }
      return updated;
    });
  };

  const allCompleted = completed.catchHearts && completed.scratchCard && completed.memoryMatch;

  const handleResetAllGames = () => {
    setCompleted({
      catchHearts: false,
      scratchCard: false,
      memoryMatch: false,
    });
    setHasCelebratedAll(false);
  };

  const tabs = [
    { key: 'catch', label: 'Catch Hearts', icon: '💖', completed: completed.catchHearts },
    { key: 'scratch', label: 'Scratch Card', icon: '✨', completed: completed.scratchCard },
    { key: 'memory', label: 'Memory Match', icon: '🍓', completed: completed.memoryMatch },
  ];

  return (
    <section className="dearly-games-section" aria-label="Little Games for Sushi">
      <motion.div
        className="dearly-games-stage-card"
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -20 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Floating Confetti Shower when all 3 games are cleared */}
        {allCompleted && !shouldReduceMotion && (
          <div className="dearly-confetti-shower" aria-hidden="true">
            {Array.from({ length: 24 }).map((_, i) => {
              const colors = ['#E85B72', '#FFA1B2', '#FFD166', '#76C980', '#C76B91', '#F8DCE8'];
              const color = colors[i % colors.length];
              const left = (i / 24) * 94 + 3;
              const delay = (i * 0.08) % 1.2;
              const size = 6 + (i % 6);
              const isRibbon = i % 2 === 0;

              return (
                <motion.span
                  key={i}
                  className="dearly-confetti-piece"
                  initial={{ opacity: 1, top: '-5%', left: `${left}%`, rotate: 0 }}
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

        {/* Section Badge & Title */}
        <div className="dearly-badge-container">
          <span className="dearly-badge">
            <Sparkles size={14} className="dearly-badge-icon" aria-hidden="true" />
            <span>{gamesConfig.badge || 'Bonus Birthday Fun 🍓'}</span>
            <Sparkles size={14} className="dearly-badge-icon" aria-hidden="true" />
          </span>
        </div>

        <h2 className="dearly-heading">{gamesConfig.title || 'Little Games for Sushi 🍓'}</h2>
        <p className="dearly-subtitle">
          {gamesConfig.subtitle ||
            'Three sweet little mini-games made especially to bring a smile to your 24th birthday!'}
        </p>

        {/* Overall Completion Progress Indicator */}
        <div className="dearly-games-progress-banner">
          <div className="dearly-games-trophy-status">
            <Trophy size={16} color="var(--color-gold)" />
            <span>
              Games Completed: {Object.values(completed).filter(Boolean).length} / 3
            </span>
          </div>
          {allCompleted && (
            <span className="dearly-all-unlocked-pill">
              <Sparkles size={12} /> All Unlocked!
            </span>
          )}
        </div>

        {/* Game Switcher Tabs */}
        <div className="dearly-game-tabs-nav" role="tablist" aria-label="Mini game selection">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.key}
              className={`dearly-game-tab-btn ${activeTab === tab.key ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.key)}
            >
              <span className="dearly-tab-icon">{tab.icon}</span>
              <span className="dearly-tab-label">{tab.label}</span>
              {tab.completed && <span className="dearly-tab-check">✓</span>}
            </button>
          ))}
        </div>

        {/* Active Game Display */}
        <div className="dearly-active-game-container">
          <AnimatePresence mode="wait">
            {activeTab === 'catch' && (
              <motion.div
                key="catch"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                <CatchHeartsGame
                  config={gamesConfig.catchHearts || {}}
                  onComplete={() => handleGameComplete('catchHearts')}
                  isCompleted={completed.catchHearts}
                />
              </motion.div>
            )}

            {activeTab === 'scratch' && (
              <motion.div
                key="scratch"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                <ScratchCardGame
                  config={gamesConfig.scratchCard || {}}
                  onComplete={() => handleGameComplete('scratchCard')}
                  isCompleted={completed.scratchCard}
                />
              </motion.div>
            )}

            {activeTab === 'memory' && (
              <motion.div
                key="memory"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                <MemoryMatchGame
                  config={gamesConfig.memoryMatch || {}}
                  onComplete={() => handleGameComplete('memoryMatch')}
                  isCompleted={completed.memoryMatch}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ALL 3 GAMES COMPLETED REWARD CARD */}
        <AnimatePresence>
          {allCompleted && (
            <motion.div
              className="dearly-games-reward-card"
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="dearly-reward-header">
                <div className="dearly-reward-trophy">
                  <Trophy size={32} color="var(--color-gold)" />
                </div>
                <h3 className="dearly-reward-title">
                  {gamesConfig.reward?.title ||
                    `You did it, ${recipientName}! Hope these little games made you smile. ❤️`}
                </h3>
              </div>

              {/* Secret Unlocked Birthday Message */}
              <div className="dearly-secret-note-box">
                <div className="dearly-secret-badge">
                  <Unlock size={14} />
                  <span>{gamesConfig.reward?.secretNoteTitle || 'Secret Birthday Message Unlocked ✨'}</span>
                </div>
                <p className="dearly-secret-note-text">
                  {gamesConfig.reward?.secretNote ||
                    "May your 24th year be your happiest and brightest one yet. Thank you for being such a wonderful person, Sushi! ❤️"}
                </p>
                <div style={{ marginTop: '14px', display: 'flex', justifyContent: 'center' }}>
                  <Strawberry size={110} mood="sparkle" isInteractive={true} animate={true} />
                </div>
              </div>

              <div style={{ marginTop: '16px' }}>
                <button
                  type="button"
                  className="dearly-secondary-button"
                  onClick={handleResetAllGames}
                  aria-label="Replay all mini games"
                >
                  <RotateCcw size={16} />
                  <span>{gamesConfig.reward?.replayAllLabel || 'Replay All Games 🔁'}</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Action Buttons */}
        <div className="dearly-games-nav-actions">
          {onBack && (
            <button
              type="button"
              className="dearly-back-btn"
              onClick={onBack}
              aria-label="Back to birthday cake"
            >
              <ArrowLeft size={16} aria-hidden="true" />
              <span>Back to Birthday Cake 🎂</span>
            </button>
          )}

          {onRestart && (
            <button
              type="button"
              className="dearly-back-btn"
              onClick={onRestart}
              aria-label="Start entire birthday experience over"
              style={{ color: 'var(--color-strawberry)' }}
            >
              <RotateCcw size={16} aria-hidden="true" />
              <span>Start Over From Beginning 🎀</span>
            </button>
          )}
        </div>
      </motion.div>
    </section>
  );
};

export default MiniGames;

