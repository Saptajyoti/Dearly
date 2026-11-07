import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, RotateCcw, Heart, Wand2, Trophy } from 'lucide-react';
import { playUnwrapSound } from '../../utils/audioEffects';

/**
 * Game 2: Scratch to Reveal
 * ==========================================
 * Interactive scratch card using HTML5 Canvas.
 * Supports mouse & touch scratching, threshold completion detection,
 * and an accessible "Scratch for me" button.
 */
export const ScratchCardGame = ({ config, onComplete, isCompleted }) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [isScratched, setIsScratched] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [scratchedPercent, setScratchedPercent] = useState(0);

  // Initialize Canvas with metallic pastel-pink coating
  const initCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // Reset composite mode
    ctx.globalCompositeOperation = 'source-over';

    // Pink metallic coating gradient
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, '#FFA8BA');
    grad.addColorStop(0.3, '#F8DCE8');
    grad.addColorStop(0.7, '#FFA1B2');
    grad.addColorStop(1, '#E85B72');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Decorative polka dots & sparkles on scratch layer
    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    for (let i = 0; i < 30; i++) {
      const x = (i * 37) % width;
      const y = (i * 29) % height;
      ctx.beginPath();
      ctx.arc(x, y, (i % 3) + 1.5, 0, Math.PI * 2);
      ctx.fill();
    }

    // Callout text on the scratch surface
    ctx.font = '600 15px "Playfair Display", Georgia, serif';
    ctx.fillStyle = '#684454';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('✨ ' + (config.scratchPrompt || 'Scratch here, Sushi! 🎀') + ' ✨', width / 2, height / 2 - 8);

    ctx.font = '400 12px "DM Sans", sans-serif';
    ctx.fillStyle = '#8C5A70';
    ctx.fillText('Use your finger or mouse to reveal', width / 2, height / 2 + 14);

    setIsScratched(false);
    setScratchedPercent(0);
  };

  useEffect(() => {
    initCanvas();
  }, []);

  // Calculate scratched area percentage
  const checkScratchPercentage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let transparentPixels = 0;
    const totalPixels = imgData.data.length / 4;

    // Sample every 16th pixel for speed
    for (let i = 3; i < imgData.data.length; i += 16 * 4) {
      if (imgData.data[i] === 0) {
        transparentPixels++;
      }
    }

    const percent = Math.min(100, Math.round((transparentPixels / (totalPixels / 16)) * 100));
    setScratchedPercent(percent);

    if (percent >= 38 && !isScratched) {
      revealAll();
    }
  };

  const scratchAt = (x, y) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 22, 0, Math.PI * 2);
    ctx.fill();
  };

  const getCoordinates = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    let clientX = e.clientX;
    let clientY = e.clientY;

    if (e.touches && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    }

    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY,
    };
  };

  const handlePointerDown = (e) => {
    setIsDrawing(true);
    const { x, y } = getCoordinates(e);
    scratchAt(x, y);
  };

  const handlePointerMove = (e) => {
    if (!isDrawing) return;
    const { x, y } = getCoordinates(e);
    scratchAt(x, y);
  };

  const handlePointerUp = () => {
    if (isDrawing) {
      setIsDrawing(false);
      checkScratchPercentage();
    }
  };

  const revealAll = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setIsScratched(true);
    setScratchedPercent(100);
    playUnwrapSound();
    if (onComplete) onComplete();
  };

  const handleReset = () => {
    initCanvas();
  };

  return (
    <div className="dearly-mini-game-card">
      <div className="dearly-game-header">
        <h3 className="dearly-game-title">{config.title || 'Scratch to Reveal ✨'}</h3>
        <p className="dearly-game-desc">{config.description}</p>
      </div>

      <div className="dearly-game-status-bar">
        <div className="dearly-status-pill">
          <span>Scratched:</span>
          <strong>{scratchedPercent}%</strong>
        </div>
        {isScratched ? (
          <div className="dearly-status-pill completed">
            <Trophy size={14} />
            <span>Revealed! 🌸</span>
          </div>
        ) : (
          <div className="dearly-status-pill highlight">
            <span>Keep Scratching!</span>
          </div>
        )}
      </div>

      {/* Scratch Card Canvas & Beneath Content */}
      <div className="dearly-scratch-container" ref={containerRef}>
        {/* Hidden Message Layer Underneath */}
        <div className="dearly-scratch-underlay">
          <div className="dearly-scratch-heart-deco" aria-hidden="true">
            <Heart size={36} fill="var(--color-strawberry)" color="var(--color-strawberry)" />
          </div>
          <p className="dearly-scratch-hidden-text">{config.hiddenMessage}</p>
          <div className="dearly-scratch-tagline">
            <Sparkles size={14} color="var(--color-gold)" />
            <span>Special note for Sushi</span>
            <Sparkles size={14} color="var(--color-gold)" />
          </div>
        </div>

        {/* Scratchable Canvas Layer */}
        <canvas
          ref={canvasRef}
          width={340}
          height={190}
          className={`dearly-scratch-canvas ${isScratched ? 'cleared' : ''}`}
          onMouseDown={handlePointerDown}
          onMouseMove={handlePointerMove}
          onMouseUp={handlePointerUp}
          onMouseLeave={handlePointerUp}
          onTouchStart={handlePointerDown}
          onTouchMove={handlePointerMove}
          onTouchEnd={handlePointerUp}
          aria-label="Scratch card area"
        />
      </div>

      {/* Action Buttons */}
      <div className="dearly-scratch-actions">
        {!isScratched ? (
          <motion.button
            type="button"
            className="dearly-secondary-button"
            onClick={revealAll}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            aria-label="Reveal scratch card immediately"
          >
            <Wand2 size={16} />
            <span>{config.revealButtonLabel || 'Scratch for Me ✨'}</span>
          </motion.button>
        ) : (
          <motion.button
            type="button"
            className="dearly-secondary-button"
            onClick={handleReset}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
          >
            <RotateCcw size={16} />
            <span>{config.replayLabel || 'Scratch Again 🔁'}</span>
          </motion.button>
        )}
      </div>
    </div>
  );
};

export default ScratchCardGame;

