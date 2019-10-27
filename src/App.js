import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import { Button } from 'reactstrap';
import MainPage from './components/MainPage';

const Home = () => (
  <header className="App-header">
    <Button color="danger" size="lg" href="/mainPage" block>Main Page</Button>
  </header>
)

function App() {
  return (
    <Router>
      <div className="App">
          <Route exact path="/" component={Home} />
          <Route exact path="/mainPage" component={MainPage} />
      </div>
    </Router>
  );
}

export default App;