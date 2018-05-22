import React, { Component } from 'react';
import IntroSlide from './screens/introScreen/introScreen';
import QuestionScreen from './screens/questionScreen/questionScreen';
import ResultScreen from './screens/resultScreen/resultScreen';

// Component that renders madlib questions and its results
class MadlibController extends Component {
  state = this.getInitialState();

  getInitialState(isIntro = true) {
    return {
      fields: this.getFormFieldsFromMadlib(),
      totalFields: this.getFormFieldsFromMadlib().length - 1, // -1 to account for index 0
      userInput: {},
      isSubmitted: false,
      isIntro: isIntro,
      currentQuestion: 0
    };
  }

  // Gets fields from a madlib
  getFormFieldsFromMadlib() {
    const { regex, madlib } = this.props;

    const fields = [];
    let result = regex.exec(madlib);
    while (result) {
      // null represents value before user input
      fields.push(result[1]);
      result = regex.exec(madlib);
    }
    return fields;
  };

  // Function that resets the app
  initializeMadlibController() {
    this.setState(this.getInitialState(false));
  };

  // Handle disable intro screen
  handleIntroClick() {
    this.setState({
      isIntro: false
    });
  }

  // Handles user input changes
  handleOnInputChange = (e, field) => {
    this.setState({
      userInput: Object.assign(this.state.userInput, {[field]: e.target.value})
    });
  }

  // Handles next question screen button click
  handleOnNextClick = (isNextQuestion = true) => {
    const { currentQuestion } = this.state;

    // Advance to next question if next question, otherwise go back a question
    const direction = isNextQuestion ? currentQuestion + 1 : currentQuestion - 1;
    this.setState({ currentQuestion: direction });
  }

  // Renders the madlib questions
  renderMadlibQuestions() {
    const { fields, userInput, currentQuestion, isIntro, totalFields } = this.state;

    return fields.map(
      (field, index) => {
        // Hide all questions except for the current one
        if(currentQuestion !== index || isIntro) {
          return null;
        }

        return (
          <QuestionScreen
            key={index}
            totalFields={totalFields} // -1 to account for index 0
            isIntro={isIntro}
            currentQuestion={currentQuestion}
            screenIndex={index}
            field={field}
            userInput={userInput}
            onInputChange={(e) => this.handleOnInputChange(e, field)}
            onNextClick={this.handleOnNextClick}
          />
        );
      }
    )
  }

  // Renders the intro screen and question screens
  renderMadlibForm() {
    const { isIntro } = this.state;

    return (
      <div className='madlib-form'>
        <IntroSlide
          isIntro={isIntro}
          onStartClick={() => this.handleIntroClick()}
        />
        <form onSubmit={e => this.setState({ isSubmitted: true })}>
          {this.renderMadlibQuestions()}
        </form>
      </div>
    );
  };

  // Renders the result screen when questions form is submitted
  renderFilledInMadlib() {
    const { userInput, fields, currentQuestion } = this.state;
    const { madlib, regex } = this.props;

    return (
      <ResultScreen
        madlib={madlib}
        userInput={userInput}
        currentQuestion={currentQuestion}
        fields={fields}
        regex={regex}
        onReset={() => this.initializeMadlibController()}
      />
    );
  };

  render() {
    const {isSubmitted} = this.state;
    return (
      isSubmitted
      ? this.renderFilledInMadlib()
      : this.renderMadlibForm()
    );
  }
}

export default MadlibController;
