import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, RotateCcw, Trophy, CheckCircle2 } from 'lucide-react';
import { playBerrySound, playUnwrapSound } from '../../utils/audioEffects';

/**
 * Game 3: Memory Match
 * ==========================================
 * 8-card (4 pairs) matching game featuring strawberries, hearts,
 * cakes, and sakura flowers. Responsive 4x2 grid with move counter.
 */
export const MemoryMatchGame = ({ config, onComplete, isCompleted }) => {
  const defaultItems = [
    { id: 'strawberry', icon: '🍓', label: 'Strawberry' },
    { id: 'heart', icon: '💖', label: 'Pink Heart' },
    { id: 'cake', icon: '🎂', label: 'Birthday Cake' },
    { id: 'flower', icon: '🌸', label: 'Sakura Flower' },
  ];

  // Helper to generate a fresh shuffled deck of 8 cards
  const generateDeck = () => {
    const rawPairs = config.pairs || defaultItems;
    const cards = [];
    rawPairs.forEach((item, index) => {
      cards.push({ uniqueId: `${item.id}-a`, matchId: item.id, icon: item.emoji || item.icon, label: item.label });
      cards.push({ uniqueId: `${item.id}-b`, matchId: item.id, icon: item.emoji || item.icon, label: item.label });
    });
    // Shuffle
    return cards.sort(() => Math.random() - 0.5);
  };

  const [cards, setCards] = useState(generateDeck);
  const [flipped, setFlipped] = useState([]); // indices of currently flipped cards
  const [matched, setMatched] = useState([]); // matchIds of matched cards
  const [moves, setMoves] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  // Check for win condition
  useEffect(() => {
    const totalPairs = (config.pairs || defaultItems).length;
    if (matched.length === totalPairs && totalPairs > 0) {
      setIsGameOver(true);
      playUnwrapSound();
      if (onComplete) onComplete();
    }
  }, [matched, config.pairs, onComplete]);

  const handleCardClick = (index) => {
    // Prevent clicking already flipped, matched, or if 2 cards already being evaluated
    if (flipped.length === 2 || flipped.includes(index) || matched.includes(cards[index].matchId)) {
      return;
    }

    playBerrySound();
    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((m) => m + 1);
      const [firstIdx, secondIdx] = newFlipped;
      if (cards[firstIdx].matchId === cards[secondIdx].matchId) {
        // Matched pair!
        setMatched((prev) => [...prev, cards[firstIdx].matchId]);
        setFlipped([]);
      } else {
        // Mismatch: flip back after brief pause
        setTimeout(() => {
          setFlipped([]);
        }, 800);
      }
    }
  };

  const handleRestart = () => {
    setCards(generateDeck());
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setIsGameOver(false);
  };

  return (
    <div className="dearly-mini-game-card">
      <div className="dearly-game-header">
        <h3 className="dearly-game-title">{config.title || 'Memory Match 🍓'}</h3>
        <p className="dearly-game-desc">{config.description}</p>
      </div>

      {/* Status Bar */}
      <div className="dearly-game-status-bar">
        <div className="dearly-status-pill">
          <span>Moves:</span>
          <strong>{moves}</strong>
        </div>
        <div className="dearly-status-pill highlight">
          <span>Matched:</span>
          <strong>{matched.length} / {(config.pairs || defaultItems).length}</strong>
        </div>
        {(isGameOver || isCompleted) && (
          <div className="dearly-status-pill completed">
            <Trophy size={14} />
            <span>Completed!</span>
          </div>
        )}
      </div>

      {/* 4x2 Cards Grid */}
      <div className="dearly-memory-grid">
        {cards.map((card, index) => {
          const isCardFlipped = flipped.includes(index) || matched.includes(card.matchId);
          const isCardMatched = matched.includes(card.matchId);

          return (
            <motion.button
              key={card.uniqueId}
              type="button"
              className={`dearly-memory-card ${isCardFlipped ? 'flipped' : ''} ${isCardMatched ? 'matched' : ''}`}
              onClick={() => handleCardClick(index)}
              whileHover={isCardFlipped ? undefined : { scale: 1.05 }}
              whileTap={isCardFlipped ? undefined : { scale: 0.95 }}
              aria-label={isCardFlipped ? `${card.label}` : 'Hidden card, tap to reveal'}
            >
              <div className="dearly-memory-card-inner">
                {/* Back (Cover) */}
                <div className="dearly-memory-card-back">
                  <span className="dearly-card-back-pattern">🎀</span>
                </div>

                {/* Front (Revealed) */}
                <div className="dearly-memory-card-front">
                  <span className="dearly-card-icon">{card.icon}</span>
                  {isCardMatched && <CheckCircle2 size={12} className="dearly-card-check" />}
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Victory Celebration Message */}
      <AnimatePresence>
        {isGameOver && (
          <motion.div
            className="dearly-memory-win-banner"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <div className="dearly-celebration-badge">
              <Sparkles size={16} color="var(--color-gold)" />
              <span>All Pairs Found!</span>
              <Sparkles size={16} color="var(--color-gold)" />
            </div>
            <p className="dearly-memory-win-msg">
              {config.completionMessage || 'Sweet memory match, Sushi! Every pair found! 🎉'}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reset Action */}
      <div className="dearly-scratch-actions">
        <motion.button
          type="button"
          className="dearly-secondary-button"
          onClick={handleRestart}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
        >
          <RotateCcw size={16} />
          <span>{config.replayLabel || 'Match Again 🔁'}</span>
        </motion.button>
      </div>
    </div>
  );
};

export default MemoryMatchGame;

