import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, withRouter} from 'react-router-dom';
import { Button } from 'reactstrap';
import MainPage from './components/MainPage';
import PulsingPineapple from './components/PulsingPineapple';
import P5Wrapper from 'react-p5-wrapper';
import sketch from './sketch';
import CHeader from './components/CustomHeader';


const Home = () => (
  <header className="App-header">
    <br></br>
    <Button color="info" size="lg" style={{width: '75%'}} href="/mainPage" block>Normal Mode</Button>
    <Button color="info" size="lg" style={{width: '75%'}} href="/pulsingPineapple" block>Pulsing Pineapple</Button>
    <P5Wrapper sketch={sketch} />
  </header>
)

function App() {
  return (
    <Router>
      <CHeader/>
      <div className="App">
          <Route exact path="/" component={withRouter(Home)} />
          <Route exact path="/mainPage" component={MainPage} />
          <Route exact path="/pulsingPineapple" component={PulsingPineapple} />
      </div>
    </Router>
  );
}

export default App;
