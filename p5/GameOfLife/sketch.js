let columns;
let rows;
let cellSize = 10;
let grid;
let generation = 0;

function setup() {
  createCanvas(800, 800);
	frameRate(5);

	columns = width / cellSize;
	rows = height / cellSize;

	grid = makeGrid();
	fillGridWithRandomStates();
	//fillGridGlider();
}

function draw() {
	background(255);


	//draw grid
	for(let i = 0; i < columns; i++){
		for(let j = 0; j < rows; j++){
			if(grid[i][j] == 1){
				fill(0);
			}else{
				fill(255);
			}
			rect(i * cellSize, j * cellSize, cellSize - 1, cellSize - 1);
		}
	}

	
	grid = createNewGeneration();


	console.log("Generation: " + generation);
	generation++;
}

function makeGrid(){
	let arr = new Array(columns);
	 for (let i = 0; i < arr.length; i++) {
		 arr[i] = new Array(rows);
	 }
	 return arr;
}

function createNewGeneration(){
	let newGrid = makeGrid();
	for(let i = 0; i < columns; i++){
		for(let j = 0; j < rows; j++){
			if(i==0 || j == 0 || i == columns -1 || j == rows -1){
				newGrid[i][j] = 0;
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

//for testing 
function fillGridWithRandomStates(){
	for(let i =0; i< columns; i++){
		for(let j = 0; j < rows; j++){
			if(i==0 || j == 0 || i == columns -1 || j == rows -1){
				grid[i][j] = 0;
			}else{
				let rand = floor(random(0, 2));
				if(rand == 1){
					grid[i][j] = 1;
				}
			}
		}
	}
}

function fillGridGlider(){
	for(let i = 0; i < columns; i++){
		for(let j = 0; j < rows; j++){
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