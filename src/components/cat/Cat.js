import React from 'react';
import { Button } from 'reactstrap';
import CatAnalyser from './CatAnalyser';
export default class Cat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          audio: null,
          color: "info"
        };
        this.toggleMicrophone = this.toggleMicrophone.bind(this);
    }
    async getMicrophone() {
        const audio = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: false
        });
        this.setState({ audio });
        this.setState({ color: "danger" })
    }
    stopMicrophone() {
        this.state.audio.getTracks().forEach(track => track.stop());
        this.setState({ audio: null });
        this.setState({ color: "info" })
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
            <br></br>
            <br></br>
            <Button color={this.state.color} size="lg" style={{width: '75%'}} onClick={this.toggleMicrophone} block>
              {this.state.audio ? 'Stop microphone' : 'Get microphone input'}
            </Button>
            {this.state.audio ? <CatAnalyser audio={this.state.audio} /> : ''}
        </header>
      )
    }
}