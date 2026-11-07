import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Play, RotateCcw, Trophy, Sparkles } from 'lucide-react';
import { playBerrySound } from '../../utils/audioEffects';

/**
 * Game 1: Catch the Hearts
 * ==========================================
 * 20-second arcade mini-game. Hearts fall from top; player taps them
 * to collect points. Fully touch-friendly and responsive.
 */
export const CatchHeartsGame = ({ config, onComplete, isCompleted }) => {
  const [gameState, setGameState] = useState('idle'); // 'idle' | 'playing' | 'finished'
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(config.duration || 20);
  const [hearts, setHearts] = useState([]);
  const heartIdRef = useRef(0);
  const gameAreaRef = useRef(null);

  // Countdown timer
  useEffect(() => {
    let timer;
    if (gameState === 'playing' && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (gameState === 'playing' && timeLeft === 0) {
      setGameState('finished');
      if (onComplete) onComplete();
    }
    return () => clearInterval(timer);
  }, [gameState, timeLeft, onComplete]);

  // Heart spawner
  useEffect(() => {
    let spawner;
    if (gameState === 'playing') {
      spawner = setInterval(() => {
        const id = heartIdRef.current++;
        const left = Math.floor(Math.random() * 80) + 10; // 10% to 90%
        const speed = 2.2 + Math.random() * 1.5; // seconds to fall
        const size = 34 + Math.floor(Math.random() * 16); // 34px - 50px
        const colors = ['#E85B72', '#FF6F88', '#FFA1B2', '#C76B91'];
        const color = colors[Math.floor(Math.random() * colors.length)];

        setHearts((prev) => [...prev, { id, left, speed, size, color }]);

        // Auto remove if not clicked
        setTimeout(() => {
          setHearts((prev) => prev.filter((h) => h.id !== id));
        }, speed * 1000);
      }, 650);
    }
    return () => clearInterval(spawner);
  }, [gameState]);

  const startGame = () => {
    setScore(0);
    setTimeLeft(config.duration || 20);
    setHearts([]);
    setGameState('playing');
  };

  const catchHeart = (id, e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    playBerrySound();
    setScore((s) => s + 1);
    setHearts((prev) => prev.filter((h) => h.id !== id));
  };

  return (
    <div className="dearly-mini-game-card">
      <div className="dearly-game-header">
        <h3 className="dearly-game-title">{config.title || 'Catch the Hearts 💖'}</h3>
        <p className="dearly-game-desc">{config.description}</p>
      </div>

      {/* Game Status Bar */}
      <div className="dearly-game-status-bar">
        <div className="dearly-status-pill">
          <span>Time:</span>
          <strong>{timeLeft}s</strong>
        </div>
        <div className="dearly-status-pill highlight">
          <span>Score:</span>
          <strong>{score} 💖</strong>
        </div>
        {isCompleted && (
          <div className="dearly-status-pill completed">
            <Trophy size={14} />
            <span>Passed!</span>
          </div>
        )}
      </div>

      {/* Playfield Area */}
      <div className="dearly-catch-playfield" ref={gameAreaRef}>
        <AnimatePresence>
          {gameState === 'idle' && (
            <motion.div
              className="dearly-game-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="dearly-game-start-box">
                <Heart size={44} className="dearly-game-hero-icon" />
                <p>Tap as many falling hearts as you can in 20 seconds!</p>
                <motion.button
                  type="button"
                  className="dearly-primary-button"
                  onClick={startGame}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Play size={18} fill="currentColor" />
                  <span>Start Game</span>
                </motion.button>
              </div>
            </motion.div>
          )}

          {gameState === 'finished' && (
            <motion.div
              className="dearly-game-overlay"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="dearly-game-start-box">
                <div className="dearly-celebration-badge">
                  <Sparkles size={18} color="var(--color-gold)" />
                  <span>Time's Up!</span>
                  <Sparkles size={18} color="var(--color-gold)" />
                </div>
                <h4 className="dearly-game-final-score">
                  You caught <strong>{score}</strong> hearts!
                </h4>
                <p className="dearly-game-final-msg">
                  {config.completionMessage || 'Great job, Sushi! You caught so much love! 💖'}
                </p>
                <motion.button
                  type="button"
                  className="dearly-secondary-button"
                  onClick={startGame}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <RotateCcw size={16} />
                  <span>{config.replayLabel || 'Play Again 🔁'}</span>
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Falling Hearts */}
        {gameState === 'playing' &&
          hearts.map((h) => (
            <motion.button
              key={h.id}
              type="button"
              className="dearly-falling-heart"
              style={{
                left: `${h.left}%`,
                width: h.size,
                height: h.size,
                color: h.color,
              }}
              initial={{ top: '-10%', scale: 0.8 }}
              animate={{ top: '105%', scale: 1 }}
              transition={{ duration: h.speed, ease: 'linear' }}
              onPointerDown={(e) => catchHeart(h.id, e)}
              aria-label="Catch heart"
            >
              <Heart size="100%" fill="currentColor" />
            </motion.button>
          ))}
      </div>
    </div>
  );
};

export default CatchHeartsGame;

