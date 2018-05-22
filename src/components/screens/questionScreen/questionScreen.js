import React, { Component } from 'react';

import titleCase from '../helper';
import normalizeLabelText from './helper';
import validateField from './validateField';

import './questionScreen.css';

// Component that renders questions related to the madlib
class QuestionScreen extends Component {
  constructor(props) {
    super(props);

    this.textInput = React.createRef();

    this.state = {
      validationError: ''
    };
  }
  
  componentDidMount() {
    this.textInput.current.focus();
    this.textInput.current.addEventListener('keypress', this.handleEnterKeyPress);
  }
  
  componentWillUnmount() {
    this.textInput.current.removeEventListener('keypress', this.handleEnterKeyPress);
  }

  // Handles enter button presses
  handleEnterKeyPress = (e) => {
    const key = e.which || e.keyCode;
    const { field, currentQuestion, totalFields } = this.props;

    const fieldError = validateField(field, e.target.value);

    if (key === 13 && fieldError !== '') { // Show user input validation error
      e.preventDefault();
      this.setState({ validationError: fieldError });
    } else if (key === 13 && currentQuestion !== totalFields) { // Go to next question unless user is on the last one 
      this.setState({ validationError: '' }, this.props.onNextClick);
    }
  }

  // Handles the next button functionality
  handleOnNextClick = (e) => {
    const {
      field,
      userInput,
      onNextClick
    } = this.props;
    const userValue = userInput[field];
    const isDisabled = userValue === '' || userValue === undefined || validateField(field, userValue);

    if(isDisabled) {
      e.preventDefault();
    } else if(validateField(field, userValue) !== '') {
      e.preventDefault();
      this.setState({ validationError: validateField(field, userValue) });
    } else {
      this.setState({ validationError: '' });
      onNextClick();
    }
  }

  // Handles the back button functionality
  handleOnBackClick = (e) => {
    const { onNextClick, currentQuestion } = this.props;
    const isFirstQuestion = currentQuestion === 0;
    
    if(isFirstQuestion) {
      e.preventDefault();
    } else {
      onNextClick(false)
    }
  }

  // Renders previously entered user data
  renderEnteredData() {
    const {
      userInput,
      field
    } = this.props;

    if (Object.keys(userInput).length < 0) {
      return null;
    }
    
    return  Object.keys(userInput).map((input, index)  => {
      if (field === input) {
        return null;
      }

      return (
        <h2
          key={index}
          className="question-screen-entered-data"
        >
          {titleCase(normalizeLabelText(input))}: {userInput[input]}
        </h2>
      );
    });
  }

  // Render next or form submit button
  renderButtons() {
    const {
      totalFields,
      currentQuestion,
      field,
      userInput,
    } = this.props;
    const isFirstQuestion = currentQuestion === 0;
    const userValue = userInput[field];
    const isDisabled = userValue === '' || userValue === undefined || validateField(field, userValue);

    const renderBackButton = !isFirstQuestion ? (
      <button
        className="question-screen-back-button"
        type="button"
        onClick={this.handleOnBackClick}
      >
        <i className="question-screen-back-icon fas fa-long-arrow-alt-left" />
        Back
      </button>
    ) : null;

    // Render submit button when we are at the last question
    if(currentQuestion === totalFields) {
      return (
        <div className="question-screen-submit-buttons-wrapper">
          {renderBackButton}
          <div className="question-screen-submit-button-">
            <button
              style={{
                opacity: isDisabled ? 0.2 : 1,
                cursor: isDisabled ? 'not-allowed' : 'pointer'
              }}
              className="question-screen-make-madlib-button"
              type='submit' // Handles submitting the madlib form
              disabled={isDisabled}
            >
              Make Your Madlib
            </button>
          </div>
        </div>
      );
    }

    // Renders the back & next buttons
    return (
      <div
        className="question-screen-button-wrapper"
        style={{ justifyContent: isFirstQuestion ? 'flex-end' : 'space-between' }}
      >
        {renderBackButton}
        <button
          style={{
            opacity: isDisabled ? 0.2 : 1,
            cursor: isDisabled ? 'not-allowed' : 'pointer'
          }}
          className="question-screen-next-button"
          type="button"
          onClick={this.handleOnNextClick}
        >
          Next
          <i className="question-screen-next-icon fas fa-long-arrow-alt-right" />
        </button>
      </div>
    );
  }

  render() {
    const { validationError } = this.state;
    const {
      field,
      userInput,
      onInputChange,
      isIntro
    } = this.props;

    const inputType = field === 'number' ? 'number' : 'text';

    return (
      <div className="question-screen-wrapper question-screen-fade-in">
        <div>
          <div>
            <h2 className="question-screen-entered-data">Flocabulary Madlib</h2>
            {this.renderEnteredData()}
          </div>
          <div className="question-screen-question">
            <h1>{titleCase(normalizeLabelText(field))}</h1>
            <div className="question-screen-input-wrapper">
              <input
                ref={this.textInput}
                type={inputType}
                className="question-screen-input"
                value={userInput[field] || ''}
                onChange={onInputChange}
              />
              {validationError && (
                <span className='question-screen-input-error'>
                  {validationError}
                </span>
              )}
              {this.renderButtons()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default QuestionScreen;