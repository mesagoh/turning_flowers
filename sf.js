/* Nice pastel color palette:
  https://www.rapidtables.com/web/color/white-color.html

  lightYellowOvary = color(255,222,173);
  pinkPetal = color(255,240,245);
*/

let flowers = [];
let numFlowers;
let theta = 0;
let paddlePopPallete;
let colorfulKuehPallete;

let bgCol;

function setup() {
  createCanvas(windowWidth, windowHeight);
  initFlowers(windowWidth, windowHeight);
  initPalettes();
}

function draw() {
  //bgCol = mouseX/7;
  background(0);

  for (var f of flowers) {
    f.render(sin(theta));
  }  
  theta += 0.05;
  printSignature();
}

function mouseClicked() {
  for (var f of flowers) {
    f.update(mouseX, mouseY);
  }

}

function initFlowers(w, h) {
  numFlowers = max(w, h) / min(w, h) * 10;

  console.log(max(w, h), numFlowers);
  for (let i=0; i < numFlowers; i++) {
      flowers.push(new Flower());
  }
}


function initPalettes() {
  //mint, salmon, lavendar
  paddlePopPallete = {
    ovary: color(252,226,174),
    petal: [color(182,255,234), color(255,179,179), color(255,220,247)]
  };

  colorfulKuehPallete = {
    ovary: color(248,87,181),
    petal: [color(247,129,188), color(253,255,220), color(197,236,190)]
  };
}

function printSignature() {
  push();
  translate(0, height);
  textSize(15);
  textStyle(ITALIC);
  fill(100);
  text('Made with <3 by ', 5, -5);
  fill(255,182,193);
  textStyle(BOLDITALIC);
  text('Melissa Goh ', 120, -5);
  fill(100);
  textStyle(ITALIC);
  text(', 2019 ', 210, -5);
  pop();
}


class Flower {
  constructor() {
    this.pos = createVector(random(10,windowWidth-10), random(10,windowHeight-10));
    this.dim = random(8,20);
    this.startAngle = random(1/6, 2);
    this.rotateAng = PI/4;
    this.ovaryColor = 255;
    this.petalColor = 255;
    this.isColored = false;
  }

  render(theta) {
    var petalW = this.dim + 3;
    var petalH = this.dim / 1.75;
    var adjust = this.dim * 0.9;

    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.startAngle);

    // draw petals
    stroke(this.petalColor);
    strokeWeight(2);
    noFill();

     for (let i = 0; i < 8; i++) {
       push();
       rotate(this.rotateAng + theta);
       ellipse(-adjust, 0, petalW, petalH);
       this.rotateAng += PI/3;
       pop();
     }

    // then draw ovary
    fill(this.ovaryColor);
    circle(0, 0, this.dim);
    pop();

  }

  update(x, y) {
    if (this.flowerSelected(x, y)) {
      this.ovaryColor = colorfulKuehPallete.ovary;
      this.petalColor = random(colorfulKuehPallete.petal);
      this.isColored = true;
    }
  }

  flowerSelected(x, y) {
    var d = dist(this.pos.x, this.pos.y, x, y);

    // TODO: return if statement after done debugging
    if (d < (this.dim/2)) {
      return true;
    }
    return false;
  }


}
