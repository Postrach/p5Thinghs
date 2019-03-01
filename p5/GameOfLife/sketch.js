let columns;
let rows;
let cellSize = 20;
let grid;
let generation = 0;
let playing = false;

let frameRateSlider;
let cellSizeSlider;
let generationInfo;

var div;
let stopButtona;

let time = 0;

function setup() {
	let canvas = createCanvas(800, 500);
	canvas.position(width/2, height/2);
	frameRate(20);
	textSize(15);

	resetSketch()
	
	frameRateSlider = createSlider(-10, -1, -5);
	var divFRate = createDiv('speed').size(100,50);

	cellSizeSlider = createSlider(10, 30, 12);
	var divCSize = createDiv('cell').size(100,50);

	let button = createButton("reset");
	button.mousePressed(resetSketch);

	stopButton = createButton("pause");
	stopButton.mousePressed(stop);

	div = createDiv('').size(100,100);
}

function resetSketch(){
	//cellSize = cellSizeSlider.value();
	

	columns = width / cellSize;
	rows = height / cellSize;

	grid = makeGrid();
	//fillGridWithRandomStates();
	fillGridGlider();

	generation = 0;
}

function draw() {
	background(255);

	speed = frameRateSlider.value();
	//frameRate(speed);

	div.html('Generation: ' + generation);

	//draw grid
	for(let i = 1; i < columns - 1; i++){
		for(let j = 1; j < rows - 1; j++){
			if(grid[i][j] == 1){
				fill(0);
			}else if(grid[i][j] == 0){
				fill(255);
			}
			rect(i * cellSize, j * cellSize, cellSize - 1, cellSize - 1);
		}
	}

	if(millis() > time && playing == true){
		time = millis() + speed * -200;
		grid = createNewGeneration();

		//console.log("Generation: " + generation);
		generation++;
	}
}

function stop(){
	if(playing == true){
		playing = false;
		stopButton.html("play");
		//noLoop();
	}else{
		//loop();
		playing = true;
		stopButton.html("pause");
	}
}

//create empty 2d array
function makeGrid(){
	let arr = new Array(columns);
	 for (let i = 0; i < arr.length; i++) {
		 arr[i] = new Array(rows);
	 }
	 return arr;
}

//creates new generation based on previous onea
function createNewGeneration(){
	let newGrid = makeGrid();
	for(let i = 0; i < columns; i++){
		for(let j = 0; j < rows; j++){
			if(i==0 || j == 0 || i == columns -1 || j == rows -1){
				newGrid[i][j] = 3;
			}else{
				let count = checkNeighbors(i,j);
				let state = grid[i][j];
				if(state == 0 && count == 3){
					newGrid[i][j] = 1;
				}else if(state == 1 && (count > 3 || count < 2)){
					newGrid[i][j] = 0;
				}else{
					newGrid[i][j] = state;
				}

			}
		}
	}
	return newGrid;
}

//checks the amount of living neighbors
function checkNeighbors(x, y){
	let neighborCount = 0;
	for(let i=-1; i <= 1; i++){
		for(let j=-1; j <=1; j++){
			if(i==0 && j==0){
			
			}else{
				if(grid[x+i][y+j] == 1){
					neighborCount += 1;
				}
			}
		}
	}
	return neighborCount;
}

//----------------------------------------------//
//----------------Grid filling------------------//
//----------------------------------------------//

//fills edges
function fillEdges(){
	for(let i =0; i< columns; i++){
		for(let j = 0; j < rows; j++){
			if(i==0 || j == 0 || i == columns -1 || j == rows -1){
				grid[i][j] = 3;
			}
		}
	}
}

//fills grid with random states
function fillGridWithRandomStates(){
	for(let i = 1; i< columns - 1; i++){
		for(let j = 1; j < rows - 1; j++){
			let rand = floor(random(0, 2));
			if(rand == 1){
				grid[i][j] = 1;
			}
			
		}
	}
}

//fills grid in a way to obtain a "slider"
function fillGridGlider(){
	for(let i = 1; i < columns - 1; i++){
		for(let j = 1; j < rows - 1; j++){
			grid[i][j] = 0;
		}
	}

	let x = columns/2;
	let y = rows/2;
	grid[x][y+1] = 1;
	grid[x][y-1] = 1;
	grid[x+1][y] = 1;
	grid[x-1][y+1] = 1;
	grid[x+1][y+1] = 1;
}

function mousePressed(){
	console.log(mouseX + ", " + mouseY);
	if(mouseX > 1 && mouseX < width -1 && mouseY > 1 && mouseY < height -1){
		let x = floor(mouseX / cellSize);
		let y = floor(mouseY / cellSize);
		if(grid[x][y] == 0){
			grid[x][y] = 1;
		}else{
			grid[x][y] = 0;
		}
	}
}
