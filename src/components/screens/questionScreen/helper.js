// Function that normalizes the question labels
const normalizeLabelText = (text = '') => {
  if (text === 'your favorite right') {
    return 'your favorite constitutional right';
  }

  return text;
}

export default normalizeLabelText;
