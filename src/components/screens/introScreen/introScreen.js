import React from 'react';

import './introScreen.css';

// Component that renders the intro screen when the app first loads
const IntroScreen = ({ isIntro, onStartClick }) => {
  if(!isIntro) {
    return null;
  }

  return (
    <div className="intro-screen-wrapper">
      <div>
        <div className="intro-screen-slide-in-down">
          <h1 className="intro-screen-header">Flocabulary Madlib</h1>
          <h2 className="intro-screen-sub-header">Fill out the form to create your madlib</h2>
        </div>
        <div className="intro-screen-slide-in-up">
          <h4 className="intro-screen-get-started">Get Started</h4>
          <i
            className="intro-screen-icon fas fa-play"
            onClick={() => onStartClick()}
          />
        </div>
      </div>
    </div>
  );
}

export default IntroScreen;
