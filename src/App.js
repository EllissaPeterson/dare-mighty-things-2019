import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, withRouter} from 'react-router-dom';
import { Button } from 'reactstrap';
import MainPage from './components/normalMode/MainPage';
import PulsingPineapple from './components/pulsingPineapple/PulsingPineapple';
import McD from './components/mcD/McD';
import P5Wrapper from 'react-p5-wrapper';
import sketch from './sketch';
import CHeader from './components/CustomHeader';
import Player from './components/Spotify/Spotify';
import Spotify from './components/Spotify/Spotify';
const Home = () => (
  <header className="App-header">
    <br></br>
    <br></br>
    <Spotify/>
    <Button color="info" size="lg" style={{width: '75%'}} href="/mainPage" block>Normal Mode</Button>
    <Button color="info" size="lg" style={{width: '75%'}} href="/pulsingPineapple" block>Pulsing Pineapple</Button>
    <Button color="info" size="lg" style={{width: '75%'}} href="/mcD" block>Mc D</Button>
    <P5Wrapper sketch={sketch} />
   
  </header>
)

function App() {
  return (
    <Router>
      <CHeader/>
      
      <div className="App">
      <Route exact path="/callback" component={withRouter(Home)} />
          <Route exact path="/" component={withRouter(Home)} />
          <Route exact path="/mainPage" component={MainPage} />
          <Route exact path="/pulsingPineapple" component={PulsingPineapple} />
          <Route exact path="/mcD" component={McD} />
      </div>
    </Router>
  );
}

export default App;
