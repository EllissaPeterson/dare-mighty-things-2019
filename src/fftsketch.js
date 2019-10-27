import globalAudio from './globalAudio'
//import fftjs from 'fft-js'
//import fftUtil from 'fft-js.fftUtil'



export default function sketch (p) {
  p.setup = function () {
    p.createCanvas(p.windowWidth*0.99, p.windowHeight*0.8);
  }

  p.draw = function () {
    p.push()
    if (globalAudio.song != null && globalAudio.artist != null){
      let songString = globalAudio.song + ';' + globalAudio.artist;
      let lines = songString.split(";");
      p.textSize(16);
      p.noStroke();
      p.textAlign(p.LEFT, p.TOP);
      for (var i = 0; i < lines.length; i++) {
        var words = lines[i].split(" ");
        var currentOffset = 0;
        for (var j = 0; j < words.length; j++) {
          var wordWidth = p.textWidth(words[j]);
          p.fill(200-(15*j));
          p.rect(25+currentOffset - 1, 24+i*22, wordWidth + 2, 18);
          p.fill(0);
          p.text(words[j], 25+currentOffset, 24+i*22);
          // four pixels between words
          currentOffset += wordWidth + 6;
        }
      }

    }
    p.pop()
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
