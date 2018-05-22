import React, { Component } from 'react';

import normalizeText from './helper';

import './resultScreen.css';

// Component that renders the madlib with the user's input
class ResultScreen extends Component {
  // Renders a chunk of text from the madlib line
  renderMadlibChunk(line) {
    const { userInput, regex, fields, currentQuestion } = this.props;

    return line.split(regex).map(
      (chunk, index2) => {
        return (
          <span
            key={index2}
            className={
              userInput[chunk]
              ? 'result-screen-user-value'
              : ''
            }
          >
            {normalizeText(fields[currentQuestion], userInput, chunk)}
          </span>
        );
      }
    );
  }

  // Renders a single line from the madlib 
  renderMadlibLine() {
    const { madlib } = this.props;

    return madlib.split('\n').map(
      (line, index1) => {
        if (index1 === 0) {
          return null;
        }

        return (
          <span
            key={index1}
            className='result-screen-madlib-line'
          >
            {this.renderMadlibChunk(line)}
          </span>
        );
      }
    );
  }

  render() {
    const { onReset } = this.props;

    return (
      <div className='result-screen-wrapper result-screen-slide-in-up'>
        <div className="result-screen-header">
          <h1 className="result-screen-header-title">Flocabulary Madlib</h1>
          <button
            className="result-screen-header-reset-button"
            onClick={() => onReset()}
          >
            Start Over
          </button>
        </div>
        <div className="result-screen-madlib">
          {this.renderMadlibLine()}
        </div>
      </div>
    );
  }
}

export default ResultScreen;
