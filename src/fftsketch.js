import globalAudio from './globalAudio'
//import fftjs from 'fft-js'
//import fftUtil from 'fft-js.fftUtil'



export default function sketch (p) {
  p.setup = function () {
    p.createCanvas(p.windowWidth*0.99, p.windowHeight*0.8);
  }

  p.draw = function () {
    //let audioData = globalAudio.audioData;
    //let phasors = fftjs.fft(audioData);
    //console.log(phasors);
    /*
    let frequencies = fftjs.fftUtil.fftFreq(phasors, 8000) // Sample rate and coef is just used for length, and frequency step
    let magnitudes = fftjs.fftUtil.fftMag(phasors);

    var both = frequencies.map(function (f, ix) {
    return {frequency: f, magnitude: magnitudes[ix]};
    });


    console.log(both);
    */
  }

}
