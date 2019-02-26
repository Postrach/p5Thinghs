function setup() {
  createCanvas(400, 400);
	frameRate(1);
}

function draw() {
  background(255);
	translate(width/2, height/2);
	
	stroke(120);
	noFill();
	beginShape();
	for(let a = 0; a< TWO_PI; a+=0.01){
		let r = 100;
		let rand = random(10);
		
		let x = r * cos(a) * rand;
		let y = r * sin(a) * rand;
		vertex(x,y);
	}
	endShape();
	//noLoop();
}