import React, { Component } from 'react';
import P5Wrapper from 'react-p5-wrapper';
import pineapplesketch from '../../pineapplesketch';
import globalAudio from '../../globalAudio';
class PineappleVisualiser extends Component {
    constructor(props) {
        super(props);
        this.canvas = React.createRef();
    }
    draw() {
        const { audioData } = this.props;
        globalAudio.audioData = audioData;
        //console.log(audioData);

        // const canvas = this.canvas.current;
        // const height = canvas.height;
        // const width = canvas.width;
        // const context = canvas.getContext('2d');
        // let x = 0;
        // const sliceWidth = (width * 1.0) / audioData.length;
        // context.lineWidth = 2;
        // context.strokeStyle = '#FFFFFF';
        // context.clearRect(0, 0, width, height);
        // context.beginPath();
        // context.moveTo(0, height / 2);
        // for (const item of audioData) {
        //     const y = (item / 255.0) * height;
        //     context.lineTo(x, y);
        //     x += sliceWidth;
        // }
        // context.lineTo(x, height / 2);
        // context.stroke();
    }
    componentDidUpdate() {
        this.draw();
    }
    render() {
        return (
            <div>
                <P5Wrapper sketch={pineapplesketch} />
            </div>
        )
    }
}

export default PineappleVisualiser;
