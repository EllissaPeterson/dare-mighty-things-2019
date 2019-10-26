import React from 'react';
// import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <p>
          {/* Edit <code>src/App.js</code> and save to reload. */}
          Hello World
          <br/>
          My First React App "HELLO WORLD"
        </p>
        Want to Learn React Click on this link Thanks!
        <a
          className="App-link"
          href="https://drive.google.com/file/d/1J74__LDksIHpfQnEZFitW4LRNMLXlp2Y/view?fbclid=IwAR0PyhFWSWhaY8iHsFpYfKOFbiBP1raJHBIk9rVNfIuC_WVALBc0d9ntS7c"
          target="_blank"
          rel="noopener noreferrer"
        >
         The Road to Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
