import React, { useState } from 'react';
import { birthdayData } from './data/birthdayData';
import { FloatingHearts } from './components/FloatingHearts';
import { MusicPlayer } from './components/MusicPlayer';
import { TransitionScreen } from './components/TransitionScreen';
import { Welcome } from './sections/Welcome';
import { BirthdaySurprise } from './sections/BirthdaySurprise';
import { StrawberrySection } from './sections/Strawberry';
import { Memories } from './sections/Memories';
import { BirthdayLetter } from './sections/BirthdayLetter';
import { FinalSurprise } from './sections/FinalSurprise';
import { MiniGames } from './sections/MiniGames';
import './App.css';

/**
 * Dearly - Root Application (Phase 2: Complete Interactive Birthday Journey)
 * =========================================================================
 * Orchestrates the full sequential storytelling experience:
 * Welcome -> Birthday Surprise -> Strawberry -> Memories -> Birthday Letter -> Final Surprise
 */
function App() {
  // Navigation stages: 'welcome' | 'surprise' | 'strawberry' | 'memories' | 'letter' | 'final'
  const [currentStage, setCurrentStage] = useState('welcome');
  const [journeyKey, setJourneyKey] = useState(0);

  // Stage steps metadata for optional progress pills
  const stages = [
    { key: 'welcome', label: 'Welcome', icon: '🎀' },
    { key: 'surprise', label: 'Surprise', icon: '🎁' },
    { key: 'strawberry', label: 'Berry', icon: '🍓' },
    { key: 'memories', label: 'Memories', icon: '📸' },
    { key: 'letter', label: 'Letter', icon: '💌' },
    { key: 'final', label: 'Wish', icon: '🎂' },
    { key: 'games', label: 'Games', icon: '🎮' },
  ];

  const currentIdx = stages.findIndex((s) => s.key === currentStage);

  // Forward Navigation Handlers
  const handleOpenSurprise = () => setCurrentStage('surprise');
  const handleGoToStrawberry = () => setCurrentStage('strawberry');
  const handleGoToMemories = () => setCurrentStage('memories');
  const handleGoToLetter = () => setCurrentStage('letter');
  const handleGoToFinal = () => setCurrentStage('final');
  const handleGoToGames = () => setCurrentStage('games');

  // Back Navigation Handlers
  const handleBackToWelcome = () => setCurrentStage('welcome');
  const handleBackToSurprise = () => setCurrentStage('surprise');
  const handleBackToStrawberry = () => setCurrentStage('strawberry');
  const handleBackToMemories = () => setCurrentStage('memories');
  const handleBackToLetter = () => setCurrentStage('letter');
  const handleBackToFinal = () => setCurrentStage('final');

  // Full Restart Handler
  const handleRestart = () => {
    setJourneyKey((k) => k + 1);
    setCurrentStage('welcome');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="dearly-app">
      {/* Ambient Floating Hearts Layer (Pointer-events: none) */}
      <FloatingHearts count={16} />

      {/* Background Music Player Controller */}
      <MusicPlayer musicConfig={birthdayData.music} />

      {/* Story Chapter Progress Indicator (Visible in journey stages) */}
      {currentStage !== 'welcome' && (
        <nav className="dearly-progress-nav" aria-label="Birthday journey chapters">
          <ol className="dearly-progress-list">
            {stages.map((stage, idx) => {
              const isPast = idx < currentIdx;
              const isCurrent = idx === currentIdx;

              return (
                <li
                  key={stage.key}
                  className={`dearly-progress-item ${isCurrent ? 'active' : ''} ${isPast ? 'completed' : ''}`}
                >
                  <button
                    type="button"
                    className="dearly-progress-dot-btn"
                    onClick={() => {
                      // Allow navigating back to any already unlocked/visited chapter
                      if (idx <= currentIdx) {
                        setCurrentStage(stage.key);
                      }
                    }}
                    disabled={idx > currentIdx}
                    aria-label={`Go to ${stage.label}`}
                    title={stage.label}
                  >
                    <span className="dearly-progress-icon">{stage.icon}</span>
                  </button>
                  {idx < stages.length - 1 && (
                    <span
                      className={`dearly-progress-connector ${isPast ? 'active' : ''}`}
                      aria-hidden="true"
                    />
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
      )}

      {/* Main Experience Container with Smooth Transitions */}
      <div className="dearly-content-container">
        <TransitionScreen transitionKey={`${currentStage}-${journeyKey}`} isVisible={true}>
          {currentStage === 'welcome' && (
            <Welcome data={birthdayData} onOpenSurprise={handleOpenSurprise} />
          )}

          {currentStage === 'surprise' && (
            <BirthdaySurprise
              data={birthdayData}
              onNext={handleGoToStrawberry}
              onBack={handleBackToWelcome}
            />
          )}

          {currentStage === 'strawberry' && (
            <StrawberrySection
              data={birthdayData}
              onNext={handleGoToMemories}
              onBack={handleBackToSurprise}
            />
          )}

          {currentStage === 'memories' && (
            <Memories
              data={birthdayData}
              onNext={handleGoToLetter}
              onBack={handleBackToStrawberry}
            />
          )}

          {currentStage === 'letter' && (
            <BirthdayLetter
              data={birthdayData}
              onNext={handleGoToFinal}
              onBack={handleBackToMemories}
            />
          )}

          {currentStage === 'final' && (
            <FinalSurprise
              data={birthdayData}
              onRestart={handleRestart}
              onBack={handleBackToLetter}
              onGoToGames={handleGoToGames}
            />
          )}

          {currentStage === 'games' && (
            <MiniGames
              data={birthdayData}
              onBack={handleBackToFinal}
              onRestart={handleRestart}
            />
          )}
        </TransitionScreen>
      </div>
    </div>
  );
}

export default App;
