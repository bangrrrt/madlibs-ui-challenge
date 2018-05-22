import React from 'react';
import madlibText from './madlibs/bill-of-rights';
import MadlibController from './components/madlibController';

const App = () => {
  return (
    <div>
      <MadlibController madlib={madlibText} regex={/%&(.*?)&%/gi} />
    </div>
  );
}

export default App;
