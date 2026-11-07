import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Sparkles, Heart, ArrowRight, ArrowLeft, Camera, ImagePlus, X, ZoomIn } from 'lucide-react';

/**
 * Memories Component (Stage 4: Photo Scrapbook)
 * ===============================================
 * Romantic scrapbook gallery styled like polaroid snapshots with washi tape,
 * handwritten captions, gentle rotations, and graceful local image placeholders.
 * Includes interactive modal zoom to view any memory up close.
 */
export const Memories = ({ data, onNext, onBack }) => {
  const shouldReduceMotion = useReducedMotion();
  const memoriesConfig = data.memories || {};
  const photos = memoriesConfig.photos || [];

  // Track failed/missing images to display tasteful placeholders instead of broken icons
  const [failedImages, setFailedImages] = useState({});
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const handleImageError = (id) => {
    setFailedImages((prev) => ({ ...prev, [id]: true }));
  };

  // Close lightbox modal on Escape key & manage body scroll
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedPhoto(null);
      }
    };

    if (selectedPhoto) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [selectedPhoto]);

  // Subtle polaroid rotations
  const rotations = [-2.5, 2, -1.8, 2.5, -2, 1.8];

  return (
    <section className="dearly-memories-section" aria-label="Photo Memories Scrapbook">
      <motion.div
        className="dearly-memories-container"
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -20 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Header Badge & Title */}
        <div className="dearly-section-header">
          <div className="dearly-badge-container">
            <span className="dearly-badge">
              <Camera size={14} className="dearly-badge-icon" aria-hidden="true" />
              <span>{memoriesConfig.badge || 'Cherished Moments 📸'}</span>
              <Camera size={14} className="dearly-badge-icon" aria-hidden="true" />
            </span>
          </div>

          <h2 className="dearly-heading">{memoriesConfig.title || 'Our Favorite Memories'}</h2>
          <p className="dearly-subtitle">
            {memoriesConfig.subtitle ||
              'A little scrapbook of moments that mean the entire world.'}
          </p>
        </div>

        {/* Polaroid Scrapbook Grid */}
        <div className="dearly-polaroids-grid">
          {photos.map((photo, index) => {
            const rot = shouldReduceMotion ? 0 : rotations[index % rotations.length];
            const isMissing = !photo.src || failedImages[photo.id];

            return (
              <motion.article
                key={photo.id}
                className="dearly-polaroid-item"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0, rotate: rot }}
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : {
                        rotate: 0,
                        scale: 1.03,
                        y: -6,
                        boxShadow: 'var(--shadow-elevated)',
                        zIndex: 5,
                        transition: { duration: 0.25 },
                      }
                }
                transition={{ duration: 0.4, delay: index * 0.1 }}
                style={{ transformOrigin: 'center center', cursor: 'pointer' }}
                onClick={() => setSelectedPhoto(photo)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedPhoto(photo);
                  }
                }}
                tabIndex={0}
                role="button"
                aria-label={`View memory: ${photo.caption || 'Photo memory'}`}
              >
                {/* Washi Tape Strip at top */}
                <div className="dearly-washi-tape" aria-hidden="true" />

                {/* Photo Frame / Image Area */}
                <div className="dearly-polaroid-frame">
                  {!isMissing ? (
                    <img
                      src={photo.src}
                      alt={photo.caption || `Memory ${index + 1}`}
                      className="dearly-polaroid-img"
                      style={photo.objectPosition ? { objectPosition: photo.objectPosition } : undefined}
                      onError={() => handleImageError(photo.id)}
                      loading="lazy"
                    />
                  ) : (
                    /* Tasteful Placeholder Card when user hasn't added photo yet */
                    <div className="dearly-polaroid-placeholder" role="img" aria-label="Photo placeholder">
                      <div className="dearly-placeholder-icon-wrap">
                        <ImagePlus size={28} className="dearly-placeholder-icon" />
                      </div>
                      <p className="dearly-placeholder-title">Your Photo Here</p>
                      <p className="dearly-placeholder-path">
                        {photo.src ? photo.src.replace('/', '') : `public/images/photo${photo.id}.jpg`}
                      </p>
                      <span className="dearly-placeholder-badge">
                        <Heart size={10} fill="currentColor" /> Ready for your photo
                      </span>
                    </div>
                  )}
                </div>

                {/* Handwritten Caption & Date */}
                <div className="dearly-polaroid-meta">
                  <p className="dearly-polaroid-caption">
                    {photo.caption || 'A moment we cherish'}
                  </p>
                  {photo.date && <p className="dearly-polaroid-date">{photo.date}</p>}
                </div>

                <div className="dearly-polaroid-zoom-hint" aria-hidden="true">
                  <ZoomIn size={13} />
                  <span>Tap to view</span>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Primary CTA Button */}
        <div className="dearly-cta-container" style={{ marginTop: '28px' }}>
          <motion.button
            type="button"
            className="dearly-primary-button"
            onClick={onNext}
            whileHover={shouldReduceMotion ? undefined : { scale: 1.04 }}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.96 }}
            aria-label={memoriesConfig.buttonLabel || 'Read Your Letter'}
          >
            <span>{memoriesConfig.buttonLabel || 'Read Your Letter 💌'}</span>
            <ArrowRight size={18} aria-hidden="true" />
          </motion.button>
        </div>

        {/* Back Navigation Button */}
        {onBack && (
          <div className="dearly-surprise-back-row">
            <button
              type="button"
              className="dearly-back-btn"
              onClick={onBack}
              aria-label="Back to strawberry friend"
            >
              <ArrowLeft size={16} aria-hidden="true" />
              <span>Back to Strawberry</span>
            </button>
          </div>
        )}
      </motion.div>

      {/* Interactive Photo Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            className="dearly-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            role="dialog"
            aria-modal="true"
            aria-label="Enlarged memory photo"
          >
            <motion.div
              className="dearly-modal-card"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="dearly-modal-close-btn"
                onClick={() => setSelectedPhoto(null)}
                aria-label="Close photo view"
                autoFocus
              >
                <X size={18} />
              </button>

              <div className="dearly-modal-washi" aria-hidden="true" />

              <div className="dearly-modal-frame">
                {selectedPhoto.src && !failedImages[selectedPhoto.id] ? (
                  <img
                    src={selectedPhoto.src}
                    alt={selectedPhoto.caption || 'Enlarged photo memory'}
                    className="dearly-modal-img"
                    style={selectedPhoto.objectPosition ? { objectPosition: selectedPhoto.objectPosition } : undefined}
                    onError={() => handleImageError(selectedPhoto.id)}
                  />
                ) : (
                  <div className="dearly-polaroid-placeholder" style={{ padding: '24px' }}>
                    <div className="dearly-placeholder-icon-wrap">
                      <ImagePlus size={36} className="dearly-placeholder-icon" />
                    </div>
                    <p className="dearly-placeholder-title" style={{ fontSize: '1.1rem' }}>
                      Photo Not Available
                    </p>
                    <p className="dearly-placeholder-path">
                      {selectedPhoto.src
                        ? selectedPhoto.src.replace('/', '')
                        : `public/images/photo${selectedPhoto.id}.jpg`}
                    </p>
                    <span className="dearly-placeholder-badge">
                      <Heart size={10} fill="currentColor" /> Ready for your photo
                    </span>
                  </div>
                )}
              </div>

              <div className="dearly-modal-meta">
                <p className="dearly-modal-caption">
                  {selectedPhoto.caption || 'A moment we cherish'}
                </p>
                {selectedPhoto.date && (
                  <p className="dearly-modal-date">{selectedPhoto.date}</p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Memories;
