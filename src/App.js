import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import {Container, Row, Col} from 'react-bootstrap';
import axios from 'axios';

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

export default class App extends React.Component {
  state = {
    persons: [],
    name: ""
  }
  componentDidMount() {
    //coms-309-bs-4.misc.iastate.edu:8080/test/hello
    axios.get(`https://jsonplaceholder.typicode.com/users`)
      .then(res => {
        console.log(res.data[0]);
        this.setState({persons : res.data});
        console.log(this.state.persons[0].name);
        this.setState({name : res.data[0].name});
      })
  }
  render() {
    return (
      <Router>
        <div className="App">
            <Route exact path="/" component={Home} />
        </div>
      </Router>
    );
  }
}