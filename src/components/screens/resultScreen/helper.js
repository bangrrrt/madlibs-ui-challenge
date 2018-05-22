import numbered from 'numbered';
import titleCase from '../helper';

// Function that normalizes the user's text input for the madlib
const normalizeText = (fields = '', userInput = {}, chunk = '') => {
  const isUserInput = userInput.hasOwnProperty(chunk); 
  if (!isUserInput){
    return chunk;
  }

  const userValue = userInput[chunk];

  if (chunk === 'number' && isUserInput) {
    return titleCase(numbered.stringify(userValue));
  }

  return userValue;
};

export default normalizeText;
