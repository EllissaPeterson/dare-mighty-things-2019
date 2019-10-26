import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import p5 from 'p5';
import P5Wrapper from 'react-p5-wrapper';
import sketch from './sketch';

var config = {
  apiKey: "AIzaSyDGcka-5SOrH54E4zUStNDkF345CPhOOdY",
  authDomain: "dare-mighty-things-2019.firebaseapp.com",
  databaseURL: "https://dare-mighty-things-2019.firebaseio.com",
  storageBucket: "dare-mighty-things-2019.appspot.com",
};

const Home = () => (
  <header className="App-header">
    <img src="logo.png" className="App-logo" alt="logo" />
    <P5Wrapper sketch={sketch} />
  </header>
)

function App() {
  return (
    <Router>
      <div className="App">
          <Route exact path="/" component={Home} />
      </div>
    </Router>
  );
}

export default App;
