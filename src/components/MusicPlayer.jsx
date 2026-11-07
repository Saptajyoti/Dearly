import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Volume2, VolumeX, Sparkles } from 'lucide-react';

/**
 * MusicPlayer Component
 * ==========================================
 * Elegant floating music controller.
 * Plays either an external audio file (if provided in musicConfig.src)
 * or generates a gentle, romantic music-box melody using the Web Audio API!
 */
export const MusicPlayer = ({ musicConfig = { enabled: true, src: '', title: '' } }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const audioCtxRef = useRef(null);
  const timerRef = useRef(null);

  // Auto-play listener for global trigger (e.g. clicking "Open Your Surprise")
  useEffect(() => {
    const handleGlobalPlay = () => {
      if (!isPlaying) {
        if (musicConfig.src && audioRef.current) {
          audioRef.current
            .play()
            .then(() => setIsPlaying(true))
            .catch(() => {
              startMusicBox();
              setIsPlaying(true);
            });
        } else {
          startMusicBox();
          setIsPlaying(true);
        }
      }
    };

    window.addEventListener('dearly:start-music', handleGlobalPlay);
    return () => {
      window.removeEventListener('dearly:start-music', handleGlobalPlay);
    };
  }, [isPlaying, musicConfig.src]);

  if (!musicConfig.enabled) {
    return null;
  }

  // Built-in Romantic Music Box Synth using Web Audio API
  const startMusicBox = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioContext();
      }

      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Gentle Pentatonic Birthday Music Box melody notes (Hz)
      const melody = [
        523.25, 523.25, 587.33, 523.25, 698.46, 659.25, // Happy birthday phrase 1
        523.25, 523.25, 587.33, 523.25, 783.99, 698.46, // phrase 2
        523.25, 523.25, 1046.5, 880.0, 698.46, 659.25, 587.33, // phrase 3
        932.33, 932.33, 880.0, 698.46, 783.99, 698.46, // phrase 4
      ];

      const noteLengths = [
        0.4, 0.4, 0.8, 0.8, 0.8, 1.4,
        0.4, 0.4, 0.8, 0.8, 0.8, 1.4,
        0.4, 0.4, 0.8, 0.8, 0.8, 0.8, 1.4,
        0.4, 0.4, 0.8, 0.8, 0.8, 1.6,
      ];

      let noteIdx = 0;

      const playNextNote = () => {
        if (!audioCtxRef.current || audioCtxRef.current.state === 'closed') return;

        const freq = melody[noteIdx];
        const duration = noteLengths[noteIdx];

        // Create oscillator with warm music box timbre
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        // Music box uses sine/triangle with quick attack and long decaying chime
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        // Soft harmonics
        gain.gain.setValueAtTime(0.001, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration * 1.5);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + duration * 1.5);

        noteIdx = (noteIdx + 1) % melody.length;
        timerRef.current = setTimeout(playNextNote, duration * 600);
      };

      playNextNote();
    } catch (e) {
      console.warn('Web Audio playback error:', e);
    }
  };

  const stopMusicBox = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
      audioCtxRef.current.suspend();
    }
  };

  const toggleMusic = () => {
    if (isPlaying) {
      // Pause
      if (musicConfig.src && audioRef.current) {
        audioRef.current.pause();
      } else {
        stopMusicBox();
      }
      setIsPlaying(false);
    } else {
      // Play
      if (musicConfig.src && audioRef.current) {
        audioRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch((err) => {
            console.warn('Audio playback error, falling back to music box:', err);
            startMusicBox();
            setIsPlaying(true);
          });
      } else {
        startMusicBox();
        setIsPlaying(true);
      }
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopMusicBox();
    };
  }, []);

  return (
    <div className="dearly-music-container">
      {musicConfig.src && <audio ref={audioRef} src={musicConfig.src} loop preload="auto" />}

      <div className="dearly-music-wrapper">
        <motion.button
          type="button"
          onClick={toggleMusic}
          className={`dearly-music-btn ${isPlaying ? 'playing' : ''}`}
          aria-label={isPlaying ? 'Pause romantic background music' : 'Play romantic background music'}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
        >
          {/* Subtle pulsing glow ring when music is not yet started */}
          {!isPlaying && (
            <motion.span
              className="dearly-music-pulse-glow"
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.8, 0, 0.8],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              aria-hidden="true"
            />
          )}

          <AnimatePresence mode="wait">
            {isPlaying ? (
              <motion.div
                key="playing"
                initial={{ rotate: -20, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 20, opacity: 0 }}
                style={{ display: 'flex', alignItems: 'center', gap: '5px' }}
              >
                <Volume2 size={16} />
                <span>Music On</span>
                <motion.span
                  animate={{ scale: [1, 1.25, 1], opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <Sparkles size={13} color="var(--color-gold)" />
                </motion.span>
              </motion.div>
            ) : (
              <motion.div
                key="muted"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <VolumeX size={16} />
                <span>Music Off</span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Floating Attention Hint Tooltip (disappears as soon as music starts) */}
        <AnimatePresence>
          {!isPlaying && (
            <motion.div
              className="dearly-music-hint-bubble"
              initial={{ opacity: 0, y: -4, scale: 0.92 }}
              animate={{
                opacity: 1,
                y: [0, 4, 0],
                scale: 1,
                transition: {
                  y: { duration: 1.8, repeat: Infinity, ease: 'easeInOut' },
                  opacity: { duration: 0.35 },
                },
              }}
              exit={{ opacity: 0, scale: 0.9, y: -6, transition: { duration: 0.25 } }}
              onClick={toggleMusic}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  toggleMusic();
                }
              }}
              aria-label="Tap here for music first"
              title="Click to start the birthday music!"
            >
              <span className="dearly-music-hint-arrow" aria-hidden="true" />
              <span>🎵 Tap for music first! ✨</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MusicPlayer;
