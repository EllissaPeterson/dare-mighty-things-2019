import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route} from 'react-router-dom';

var config = {
  apiKey: "AIzaSyDGcka-5SOrH54E4zUStNDkF345CPhOOdY",
  authDomain: "dare-mighty-things-2019.firebaseapp.com",
  databaseURL: "https://dare-mighty-things-2019.firebaseio.com",
  storageBucket: "dare-mighty-things-2019.appspot.com",
};

const Home = () => (
  <header className="App-header">
    <img src="logo.jpg" className="App-logo" alt="logo" />
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