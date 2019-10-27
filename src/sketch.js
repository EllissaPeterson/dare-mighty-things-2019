export default function sketch (p) {
    let t = 0; // time variable
    let inOut = false;
    let numPoints = 0;
    let stepTime = 0;
    let travelTime = 0.1;
    let totalTime = 1

    let data = [
        [87,61],
        [112,44],
        [140,28],
        [171,16],
        [208,7],
        [248,7],
        [282,15],
        [323,20],
        [356,33],
        [389,57],
        [419,85],
        [447,123],
        [462,154],
        [472,192],
        [478,233],
        [474,269],
        [468,296],
        [457,328],
        [445,357],
        [427,383],
        [407,406],
        [385,429],
        [356,444],
        [330,458],
        [297,468],
        [260,472],
        [228,472],
        [196,470],
        [168,461],
        [133,446],
        [102,429],
        [76,410],
        [55,385],
        [34,358],
        [21,325],
        [9,286],
        [5,249],
        [6,216],
        [13,182],
        [25,149],
        [38,122],
        [58,92],
        [145,242],
        [141,211],
        [149,182],
        [173,161],
        [194,171],
        [211,198],
        [216,239],
        [195,225],
        [181,220],
        [161,227],
        [275,239],
        [270,215],
        [273,180],
        [303,160],
        [335,174],
        [343,204],
        [344,237],
        [327,225],
        [305,214],
        [289,222],
        [96,278],
        [96,313],
        [119,355],
        [144,378],
        [172,399],
        [206,407],
        [244,413],
        [286,409],
        [318,397],
        [345,377],
        [365,358],
        [380,324],
        [392,293],
        [387,272],
        [364,274],
        [329,277],
        [300,286],
        [256,286],
        [225,285],
        [201,285],
        [173,281],
        [153,277],
        [126,273],
        [107,271]
    ]


    p.setup = function () {
      p.createCanvas(p.windowWidth, p.windowHeight);
      p.noStroke();
      p.fill(40, 200, 200);
        numPoints = data.length;
        stepTime = (totalTime - travelTime)/numPoints
    };

    p.draw = function () {
        p.background(10, 50); // translucent background (creates trails)
        p.stroke(255);
        if (p.mouseIsPressed === true) {
          p.line(p.mouseX, p.mouseY, p.pmouseX, p.pmouseY);
        }

        for (let s = 0; s < numPoints; s++) {
            let tempT = (t - s*stepTime)%(totalTime*2);

            let orginX = p.windowWidth/2;
            let orginY = p.windowHeight/2;

            let endX = data[s][0] - 250;
            let endY = data[s][1] - 250;

            let x = (tempT%travelTime)/travelTime*(endX) + orginX;
            let y = (tempT%travelTime)/travelTime*(endY) + orginY;

            if(tempT >= travelTime) {
                x = orginX + endX;
                y = orginY + endY;
            }

            if(tempT >= totalTime) {
                x = (1 - (tempT%travelTime)/travelTime)*(endX) + orginX;
                y = (1 - (tempT%travelTime)/travelTime)*(endY) + orginY;
            }

            if(tempT >= totalTime + travelTime) {
                x = orginX;
                y = orginY;
            }
                // each particle moves in a circle
                //const myX = x + 20 * Math.cos(2 * Math.PI * tempT);
                //const myY = y + 20 * Math.sin(2 * Math.PI * tempT);// + angle);

                //p.rect(myX, myY, 5, 5); // draw particle
                p.ellipse(x, y, 5); // draw particle
                //p.rotate(Math.PI * t);
        }
    t = t + 0.01; // update time

    if (t >= totalTime) {
        inOut = !inOut;
    }

    };
  };
