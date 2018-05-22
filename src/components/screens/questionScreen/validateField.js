const _lyWord = 'word ending with ly';
const _numberField = 'number';

// Function that returns true if given word ends with ly characters
const isLyWord = (word = '') => {
  if (word.length <= 2) {
    return false;
  }

  const lastTwoChars = word.slice(word.length - 2);

  return lastTwoChars.toLowerCase() === 'ly';
};

// Validate a given field and it's value
const validateField = (fieldName = '', value = '') => {
  // Number must be entered for number field
  if (fieldName === _numberField && value === "") {
    return 'Please enter a number';
  } else if (value === '') { // Fields cannot be blank
    return 'Sorry, this field can\'t be blank';
  }

  // Check if the word ends in ly
  if (fieldName === _lyWord && !isLyWord(value)) {
    return 'Please enter a word that ends in ly';
  }

  return '';
};

export default validateField;
