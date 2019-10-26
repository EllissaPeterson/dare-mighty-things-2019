import React from 'react';
import AudioAnalyser from './AudioAnalyser';

var config = {
  apiKey: "AIzaSyDGcka-5SOrH54E4zUStNDkF345CPhOOdY",
  authDomain: "dare-mighty-things-2019.firebaseapp.com",
  databaseURL: "https://dare-mighty-things-2019.firebaseio.com",
  storageBucket: "dare-mighty-things-2019.appspot.com",
};

export default class MainPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          audio: null
        };
        this.toggleMicrophone = this.toggleMicrophone.bind(this);
    }
    async getMicrophone() {
        const audio = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: false
        });
        this.setState({ audio });
    }
    stopMicrophone() {
        this.state.audio.getTracks().forEach(track => track.stop());
        this.setState({ audio: null });
    }
    toggleMicrophone() {
        if (this.state.audio) {
          this.stopMicrophone();
        } else {
          this.getMicrophone();
        }
    }
    render() {
      return (
        <header className="App-header">
            <button color= "primary" onClick={this.toggleMicrophone}>
              {this.state.audio ? 'Stop microphone' : 'Get microphone input'}
            </button>
            {this.state.audio ? <AudioAnalyser audio={this.state.audio} /> : ''}
        </header>
      )
    }
}