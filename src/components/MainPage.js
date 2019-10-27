import React from 'react';
import { Button } from 'reactstrap';
import AudioAnalyser from './AudioAnalyser';
import CHeader from './CustomHeader';
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
            <Button color="danger" size="lg" onClick={this.toggleMicrophone} block></Button>
            <Button color="info" size="lg" onClick={this.toggleMicrophone} block>
              {this.state.audio ? 'Stop microphone' : 'Get microphone input'}
            </Button>
            {this.state.audio ? <AudioAnalyser audio={this.state.audio} /> : ''}
        </header>
      )
    }
}