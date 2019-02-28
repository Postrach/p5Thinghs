 

function setup() { 
	createCanvas(400, 400);	
	frameRate(1);
	} 
function draw() { 
	background(0);		
	let randWidth = random(0, width);	
	let randHeight = random(0, height);	
	translate(mouseX, mouseY);			
	stroke(120);	
	noFill();		
	beginShape();	
	for(let a = 0; a< TWO_PI; a+=0.001){		
		let r = 100;		
		let rand = random(10);		
		let x = r * cos(a) * rand;		
		let y = r * sin(a) * rand;				
		let randStroke = random(100,250);		
		stroke(randStroke);		
		vertex(x,y);	
		}	
	endShape();	
	//noLoop();
}
	
	
