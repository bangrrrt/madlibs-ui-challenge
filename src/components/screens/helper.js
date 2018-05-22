// Function that takes a string of words and capitalizes the start of each word
const titleCase = (words = '') => {
  const wordsArray = words.split(' ');
  let titleCaseArray = [];

  // Get first character of all words and capitalize it then make the rest of the word lower case
  for(let word of wordsArray) {
    const firstLetter = word.slice(0, 1);
    const remainder = word.slice(1);
    const capitalizedWord = firstLetter.toUpperCase() + remainder.toLowerCase();
    titleCaseArray.push(capitalizedWord)
  }

  // Join all the capitalized words back to a string
  return titleCaseArray.join(' ');
}

export default titleCase;
