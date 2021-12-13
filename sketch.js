var cnv;
var box;
var n_rows = 14;
var n_cols = 14;
var colors = ['blue', 'red', 'green', 'yellow', 'pink', 'purple'];
var grid;
var boolgrid;
var numMoves = 0;
var playerChoice;
var moveCounter;
var blue_button;
var red_button;
var green_button;
var yellow_button;
var pink_button;
var purple_button;
var gameover = false;
var scene = "title";
var initialSelect = "";
var flashColor = 0;
var chosenCorner = false;
//Menu
{
var f_y = -100;
var l_y = -100;
var o_y = -100;
var o2_y = -100;
var d_y = -100;
var f2_y = -100;
var i_y = -100;
var l2_y = -100;
var l3_y = -100;
var menuTimer = 0;
var flashMenu = 0;
var playButton = 0;
}

function mouseClicked(){
	if(scene == "title" && mouseX > 400 && mouseX < 600 && mouseY > 300 && mouseY < 400)
		scene = "menu";
}

function drawMenuBG(){
	// Screen dimensions x: 200 - 800, y: 0 - 500
	var colorCount = 0;
	for(var i = 0; i < 12; i++){
		for(var j = 0; j < 10; j++){
			colorCount = (colorCount + 1) % 6;
			stroke(0);
			if(colorCount == 0)
				fill('rgba(0,0,255, 0.3)');
			if(colorCount == 1)
				fill('rgba(255,0,0, 0.3)');
			if(colorCount == 2)
				fill('rgba(0,255,0, 0.3)');
			if(colorCount == 3)
				fill('rgba(255,255,0, 0.3)');
			if(colorCount == 4)
				fill('rgba(255,0,255, 0.3)');
			if(colorCount == 5)
				fill('rgba(127,0,255, 0.3)');
			rect(50*i+200, 50*j, 49, 49);
		}
	}
}

function drawMenu(){
	background(255);
	fill(flashMenu);
	stroke(255);
	rect(200,0,600,500);
	if(menuTimer > 180){
		drawMenuBG();
	}
	stroke(0);
	textSize(100);
	fill('blue');
	if(menuTimer>180)
		fill(0);
	text("F", 290, f_y);
	text("l", 670, l3_y);
	fill('red');
	if(menuTimer>180)
		fill(0);
	text("l", 355, l_y);
	text("l", 640, l2_y);
	fill('green');
	if(menuTimer>180)
		fill(0);
	text("o", 380, o_y);
	text("i", 610, i_y);
	fill('yellow');
	if(menuTimer>180)
		fill(0);
	text("o", 440, o2_y);
	fill('pink');
	if(menuTimer>180)
		fill(0);
	text("d", 495, d_y);
	fill('purple');
	if(menuTimer>180)
		fill(0);
	text("F", 550, f2_y);
	menuTimer++;
	if(menuTimer > 15 && f_y < 150){
		f_y+=15;
	}
	if(menuTimer > 30 && l_y < 150){
		l_y+=15;
	}
	if(menuTimer > 45 && o_y < 150){
		o_y+=15;
	}
	if(menuTimer > 60 && o2_y < 150){
		o2_y+=15;
	}
	if(menuTimer > 75 && d_y < 150){
		d_y+=15;
	}
	if(menuTimer > 90 && f2_y < 150){
		f2_y+=15;
	}
	if(menuTimer > 105 && i_y < 150){
		i_y+=15;
	}
	if(menuTimer > 120 && l2_y < 150){
		l2_y+=15;
	}
	if(menuTimer > 135 && l3_y < 150){
		l3_y+=15;
	}
	if(menuTimer >160){
		flashMenu+=55;
	}
	if(menuTimer>200){
		fill(225);
		stroke(0);
		if(mouseX>400 && mouseX<600 && mouseY>300 && mouseY<400){
			fill(145);
		}
		rect(400, 300, 200, 100, 20);
		textSize(50);
		fill(55);
		stroke(55);
		if(mouseX>400 && mouseX<600 && mouseY>300 && mouseY<400){
			fill(25);
			stroke(55);
		}
		text("PLAY", 435,370);
	}
}

function createGrid(){
	var start_table = new Array (n_rows);
	for (var row = 0; row < n_rows; row++) {
	    start_table[row] = new Array (n_cols);
	}
	for (var i = 0; i < start_table.length; i++) {
	 for(var j = 0; j < start_table[i].length; j++){
		 start_table[i][j] = random(colors);
	 	}
 	}
	return start_table;
}

function createBoolGrid(){
	boolgrid = new Array(n_rows);
	for (var row = 0; row < n_rows; row++){
		boolgrid[row] = new Array(n_cols);
	}
	for (var i = 0; i < boolgrid.length; i++) {
		for (var j = 0; j < boolgrid[i].length; j++) {
			boolgrid[i][j] = 0;
		}
	}




}

// for debugging bool grid
function printboolgrid(){
	for (var i = 0; i < boolgrid.length; i++) {
	 	for (var j = 0; j < boolgrid[i].length; i++) {
	 		console.log(boolgrid[i][j]);
	 	}
	}
}

// create copy of boolgrid
function copyBoolGrid(){
	var b_grid = new Array(n_rows);
	for (var row = 0; row < n_rows; row++){
		b_grid[row] = new Array(n_cols);
	}
	for (var i = 0; i < boolgrid.length; i++) {
		for (var j = 0; j < boolgrid[i].length; j++) {
			b_grid[i][j] = boolgrid[i][j];
		}
	}

	return b_grid;
}

function centerCanvas(){
	cnv.position((windowWidth - width)/3,(windowHeight - height)/2);
}

//Called upon startup
function setup() {
	cnv = createCanvas(800, 500);
	centerCanvas();
	grid = createGrid();
	createBoolGrid();


	blue_button = createButton("blue");
	red_button = createButton("red");
	green_button = createButton("green");
	yellow_button = createButton("yellow");
	pink_button = createButton("pink");
	purple_button = createButton("purple");

	drawBox();


	blue_button.mouseClicked(blue_button_clicked);
	red_button.mouseClicked(red_button_clicked);
	green_button.mouseClicked(green_button_clicked);
	yellow_button.mouseClicked(yellow_button_clicked);
	pink_button.mouseClicked(pink_button_clicked);
	purple_button.mouseClicked(purple_button_clicked);

}

function drawGrid(){
	let boxDimension = 35;
	for(var i = 0; i < n_rows; i++){
		for(var j = 0; j < n_cols; j++){
			if(boolgrid[i][j] == 1){
				grid[i][j] = playerChoice;
			}
			fill(grid[i][j]);
			strokeWeight(0);
			stroke('black');
			rect(i * boxDimension + 200 , j * boxDimension, boxDimension, boxDimension);
		}
	}
}

function printGrid(){
	let line = "";
	for(var i = 0; i < grid.length; i++){
		for(var j = 0; j < grid[i].length; j++){
			line += grid[i][j] + " ";
		}
		console.log(line);
	}
}

// change if spaces adjacent to boolgrid true are player color
function updateBoolGrid(){
	if(initialSelect == "TL")
		updateBoolGridTL();
	else if(initialSelect == "TR")
		updateBoolGridTR();
	else if (initialSelect == "BL")
		updateBoolGridBL();
	else {
		updateBoolGridBR();
	}
}
function updateBoolGridBL(){
	for(var i = 0; i < boolgrid.length; i++){
		for(var j = boolgrid.length-1; j >= 0; j--){
			if(boolgrid[i][j] == 1){

				// corner cases
				// top left
				if(i == 0 && j == 0){
					if(grid[i][j+1] == playerChoice){
						boolgrid[i][j+1] = 1;
					}
					if(grid[i+1][j] == playerChoice){
						boolgrid[i+1][j] = 1;
					}
				// bottom left
				} else if(i == 0 && j == boolgrid[i].length - 1){

					if(grid[i][j-1] == playerChoice){
						boolgrid[i][j-1] = 1;
					}
					if(grid[i+1][j] == playerChoice){
						boolgrid[i+1][j] = 1;
					}
				// top right
				} else if(i == boolgrid.length - 1 && j == 0){
					if(grid[i-1][j] == playerChoice){
						boolgrid[i-1][j] = 1;
					}
					if(grid[i][j+1] == playerChoice){
						boolgrid[i][j+1] = 1;
					}
					// bottom right
				} else if(i == boolgrid.length - 1 && j == boolgrid[i].length - 1){
					if(grid[i-1][j] == playerChoice){
						boolgrid[i-1][j] = 1;
					}
					if(grid[i][j-1] == playerChoice){
						boolgrid[i][j-1] = 1;
					}

				// edge cases
				// left column
				} else if(i == 0){
					if(grid[i+1][j] == playerChoice) boolgrid[i+1][j] = 1;
					if(grid[i][j-1] == playerChoice) boolgrid[i][j-1] = 1;
					if(grid[i][j+1] == playerChoice) boolgrid[i][j+1] = 1;
				// right column
			} else if(i == boolgrid.length - 1){
					if(grid[i-1][j] == playerChoice) boolgrid[i-1][j] = 1;
					if(grid[i][j-1] == playerChoice) boolgrid[i][j-1] = 1;
					if(grid[i][j+1] == playerChoice) boolgrid[i][j+1] = 1;
				// top row
				} else if(j == 0){
					if(grid[i-1][j] == playerChoice) boolgrid[i-1][j] = 1;
					if(grid[i+1][j] == playerChoice) boolgrid[i+1][j] = 1;
					if(grid[i][j+1] == playerChoice) boolgrid[i][j+1] = 1;
				// last row
			} else if(j == boolgrid[i].length - 1){
					if(grid[i-1][j] == playerChoice) boolgrid[i-1][j] = 1;
					if(grid[i+1][j] == playerChoice) boolgrid[i+1][j] = 1;
					if(grid[i][j-1] == playerChoice) boolgrid[i][j-1] = 1;
				}
				else{
					if(grid[i-1][j] == playerChoice) boolgrid[i-1][j] = 1;
					if(grid[i+1][j] == playerChoice) boolgrid[i+1][j] = 1;
					if(grid[i][j+1] == playerChoice) boolgrid[i][j+1] = 1;
					if(grid[i][j-1] == playerChoice) boolgrid[i][j-1] = 1;
				}
			}
		}
	}
}
function updateBoolGridBR(){
	for(var i = boolgrid.length -1; i >= 0; i--){
		for(var j = boolgrid.length -1; j >=0; j--){
			if(boolgrid[i][j] == 1){

				// corner cases
				// top left
				if(i == 0 && j == 0){
					if(grid[i][j+1] == playerChoice){
						boolgrid[i][j+1] = 1;
					}
					if(grid[i+1][j] == playerChoice){
						boolgrid[i+1][j] = 1;
					}
				// bottom left
				} else if(i == 0 && j == boolgrid[i].length - 1){

					if(grid[i][j-1] == playerChoice){
						boolgrid[i][j-1] = 1;
					}
					if(grid[i+1][j] == playerChoice){
						boolgrid[i+1][j] = 1;
					}
				// top right
				} else if(i == boolgrid.length - 1 && j == 0){
					if(grid[i-1][j] == playerChoice){
						boolgrid[i-1][j] = 1;
					}
					if(grid[i][j+1] == playerChoice){
						boolgrid[i][j+1] = 1;
					}
					// bottom right
				} else if(i == boolgrid.length - 1 && j == boolgrid[i].length - 1){
					if(grid[i-1][j] == playerChoice){
						boolgrid[i-1][j] = 1;
					}
					if(grid[i][j-1] == playerChoice){
						boolgrid[i][j-1] = 1;
					}

				// edge cases
				// left column
				} else if(i == 0){
					if(grid[i+1][j] == playerChoice) boolgrid[i+1][j] = 1;
					if(grid[i][j-1] == playerChoice) boolgrid[i][j-1] = 1;
					if(grid[i][j+1] == playerChoice) boolgrid[i][j+1] = 1;
				// right column
			} else if(i == boolgrid.length - 1){
					if(grid[i-1][j] == playerChoice) boolgrid[i-1][j] = 1;
					if(grid[i][j-1] == playerChoice) boolgrid[i][j-1] = 1;
					if(grid[i][j+1] == playerChoice) boolgrid[i][j+1] = 1;
				// top row
				} else if(j == 0){
					if(grid[i-1][j] == playerChoice) boolgrid[i-1][j] = 1;
					if(grid[i+1][j] == playerChoice) boolgrid[i+1][j] = 1;
					if(grid[i][j+1] == playerChoice) boolgrid[i][j+1] = 1;
				// last row
			} else if(j == boolgrid[i].length - 1){
					if(grid[i-1][j] == playerChoice) boolgrid[i-1][j] = 1;
					if(grid[i+1][j] == playerChoice) boolgrid[i+1][j] = 1;
					if(grid[i][j-1] == playerChoice) boolgrid[i][j-1] = 1;
				}
				else{
					if(grid[i-1][j] == playerChoice) boolgrid[i-1][j] = 1;
					if(grid[i+1][j] == playerChoice) boolgrid[i+1][j] = 1;
					if(grid[i][j+1] == playerChoice) boolgrid[i][j+1] = 1;
					if(grid[i][j-1] == playerChoice) boolgrid[i][j-1] = 1;
				}
			}
		}
	}
}
function updateBoolGridTR(){
	for(var i = boolgrid.length -1; i >= 0; i--){
		for(var j = 0; j < boolgrid.length; j++){
			if(boolgrid[i][j] == 1){

				// corner cases
				// top left
				if(i == 0 && j == 0){
					if(grid[i][j+1] == playerChoice){
						boolgrid[i][j+1] = 1;
					}
					if(grid[i+1][j] == playerChoice){
						boolgrid[i+1][j] = 1;
					}
				// bottom left
				} else if(i == 0 && j == boolgrid[i].length - 1){

					if(grid[i][j-1] == playerChoice){
						boolgrid[i][j-1] = 1;
					}
					if(grid[i+1][j] == playerChoice){
						boolgrid[i+1][j] = 1;
					}
				// top right
				} else if(i == boolgrid.length - 1 && j == 0){
					if(grid[i-1][j] == playerChoice){
						boolgrid[i-1][j] = 1;
					}
					if(grid[i][j+1] == playerChoice){
						boolgrid[i][j+1] = 1;
					}
					// bottom right
				} else if(i == boolgrid.length - 1 && j == boolgrid[i].length - 1){
					if(grid[i-1][j] == playerChoice){
						boolgrid[i-1][j] = 1;
					}
					if(grid[i][j-1] == playerChoice){
						boolgrid[i][j-1] = 1;
					}

				// edge cases
				// left column
				} else if(i == 0){
					if(grid[i+1][j] == playerChoice) boolgrid[i+1][j] = 1;
					if(grid[i][j-1] == playerChoice) boolgrid[i][j-1] = 1;
					if(grid[i][j+1] == playerChoice) boolgrid[i][j+1] = 1;
				// right column
			} else if(i == boolgrid.length - 1){
					if(grid[i-1][j] == playerChoice) boolgrid[i-1][j] = 1;
					if(grid[i][j-1] == playerChoice) boolgrid[i][j-1] = 1;
					if(grid[i][j+1] == playerChoice) boolgrid[i][j+1] = 1;
				// top row
				} else if(j == 0){
					if(grid[i-1][j] == playerChoice) boolgrid[i-1][j] = 1;
					if(grid[i+1][j] == playerChoice) boolgrid[i+1][j] = 1;
					if(grid[i][j+1] == playerChoice) boolgrid[i][j+1] = 1;
				// last row
			} else if(j == boolgrid[i].length - 1){
					if(grid[i-1][j] == playerChoice) boolgrid[i-1][j] = 1;
					if(grid[i+1][j] == playerChoice) boolgrid[i+1][j] = 1;
					if(grid[i][j-1] == playerChoice) boolgrid[i][j-1] = 1;
				}
				else{
					if(grid[i-1][j] == playerChoice) boolgrid[i-1][j] = 1;
					if(grid[i+1][j] == playerChoice) boolgrid[i+1][j] = 1;
					if(grid[i][j+1] == playerChoice) boolgrid[i][j+1] = 1;
					if(grid[i][j-1] == playerChoice) boolgrid[i][j-1] = 1;
				}
			}
		}
	}
}
function updateBoolGridTL(){
	for (var i = 0; i < boolgrid.length; i++){
		for(var j = 0; j < boolgrid[i].length; j++){

			if(boolgrid[i][j] == 1){

				// corner cases
				// top left
				if(i == 0 && j == 0){
					if(grid[i][j+1] == playerChoice){
						boolgrid[i][j+1] = 1;
					}
					if(grid[i+1][j] == playerChoice){
						boolgrid[i+1][j] = 1;
					}
				// bottom left
				} else if(i == 0 && j == boolgrid[i].length - 1){

					if(grid[i][j-1] == playerChoice){
						boolgrid[i][j-1] = 1;
					}
					if(grid[i+1][j] == playerChoice){
						boolgrid[i+1][j] = 1;
					}
				// top right
				} else if(i == boolgrid.length - 1 && j == 0){
					if(grid[i-1][j] == playerChoice){
						boolgrid[i-1][j] = 1;
					}
					if(grid[i][j+1] == playerChoice){
						boolgrid[i][j+1] = 1;
					}
					// bottom right
				} else if(i == boolgrid.length - 1 && j == boolgrid[i].length - 1){
					if(grid[i-1][j] == playerChoice){
						boolgrid[i-1][j] = 1;
					}
					if(grid[i][j-1] == playerChoice){
						boolgrid[i][j-1] = 1;
					}

				// edge cases
				// left column
				} else if(i == 0){
					if(grid[i+1][j] == playerChoice) boolgrid[i+1][j] = 1;
					if(grid[i][j-1] == playerChoice) boolgrid[i][j-1] = 1;
					if(grid[i][j+1] == playerChoice) boolgrid[i][j+1] = 1;
				// right column
			} else if(i == boolgrid.length - 1){
					if(grid[i-1][j] == playerChoice) boolgrid[i-1][j] = 1;
					if(grid[i][j-1] == playerChoice) boolgrid[i][j-1] = 1;
					if(grid[i][j+1] == playerChoice) boolgrid[i][j+1] = 1;
				// top row
				} else if(j == 0){
					if(grid[i-1][j] == playerChoice) boolgrid[i-1][j] = 1;
					if(grid[i+1][j] == playerChoice) boolgrid[i+1][j] = 1;
					if(grid[i][j+1] == playerChoice) boolgrid[i][j+1] = 1;
				// last row
			} else if(j == boolgrid[i].length - 1){
					if(grid[i-1][j] == playerChoice) boolgrid[i-1][j] = 1;
					if(grid[i+1][j] == playerChoice) boolgrid[i+1][j] = 1;
					if(grid[i][j-1] == playerChoice) boolgrid[i][j-1] = 1;
				}
				else{
					if(grid[i-1][j] == playerChoice) boolgrid[i-1][j] = 1;
					if(grid[i+1][j] == playerChoice) boolgrid[i+1][j] = 1;
					if(grid[i][j+1] == playerChoice) boolgrid[i][j+1] = 1;
					if(grid[i][j-1] == playerChoice) boolgrid[i][j-1] = 1;
				}
			}
		}
	}
}

function checkWin(){
	for(var i = 0; i < boolgrid.length; i++){
		for (var j = 0; j < boolgrid[i].length; j++){
			if(boolgrid[i][j] == 0){
				return false;
			}
		}
	}
	return true;
}

function drawBox(){
	box = createElement("div");
	secondbox = createElement("div");
	let bigbox = createElement("div");
	blue_button.parent(box);
	red_button.parent(box);
	green_button.parent(box);
	yellow_button.parent(secondbox);
	pink_button.parent(secondbox);
	purple_button.parent(secondbox);


	box.position(100,200);
	secondbox.position(100,225);
	box.parent(bigbox);
	secondbox.parent(bigbox);

	bigbox.style("border", 'black');
	bigbox.style("border-radius", "50px");
}

// Buttons Clicked
function blue_button_clicked(){
	if(playerChoice != "blue" && gameover == false && scene == "game"){
		numMoves += 1;
		playerChoice = "blue";
		updateBoolGrid();
	}
}
function red_button_clicked(){
	if(playerChoice != "red" && gameover == false && scene == "game"){
		numMoves += 1;
		playerChoice = "red";
		updateBoolGrid();
	}
}
function green_button_clicked(){
	if(playerChoice != "green" && gameover== false && scene == "game"){
		numMoves += 1;
		playerChoice = "green";
		updateBoolGrid();
	}
}
function yellow_button_clicked(){
	if(playerChoice != "yellow" && gameover == false && scene == "game"){
		numMoves += 1;
		playerChoice = "yellow";
		updateBoolGrid();
	}
}
function pink_button_clicked(){
	if(playerChoice != "pink" && gameover == false && scene == "game"){
		numMoves += 1;
		playerChoice = "pink";
		updateBoolGrid();
	}
}
function purple_button_clicked(){
	if(playerChoice != "purple" && gameover == false && scene == "game"){
		numMoves += 1;
		playerChoice = "purple";
		updateBoolGrid();
	}
}

function chooseCorner(){
	if(initialSelect == "TL"){
			boolgrid[0][0] = 1;
			playerChoice = grid[0][0];
	}
	if(initialSelect == "BL"){
		boolgrid[0][n_cols-1] = 1;
		playerChoice = grid[0][n_cols-1];
	}
	if(initialSelect == "TR"){
		boolgrid[n_rows-1][0] = 1;
		playerChoice = grid[n_rows-1][0];
	}
	if(initialSelect == "BR"){
		boolgrid[n_rows-1][n_cols-1] = 1;
		playerChoice = grid[n_rows-1][n_cols-1];
	}
}

// Called Every few seconds
function draw() {
	if(scene == "title"){
		drawMenu();
	}

	if(scene != "title"){
		background('white');
		drawGrid();
	}

	if(scene == "menu"){
		flashColor += 1.5;
		if(flashColor >= 150)
			flashColor = 0;
		textSize(30);
		fill(0);
		text("Choose\na corner!", 60,25);
		fill(112,112,112);
		// Top Left
		if(mouseX>200 && mouseX < 200+245 && mouseY>0 && mouseY<245){
			fill('rgba(115,115,115, 0.35)');
			rect(200,0, 245, 245);
			fill(flashColor);
			rect(200, 0, 35, 35);
			if(mouseIsPressed){
				initialSelect = "TL";
				scene = "game";
			}
		}
		// Top Right
		if(mouseX>200+245 && mouseX < 200+2*245 && mouseY>0 && mouseY<245){
			fill('rgba(115,115,115, 0.35)');
			rect(200+245, 0, 245, 245);
			fill(flashColor);
			rect(200+245+35*6, 0, 35, 35);
			if(mouseIsPressed){
				initialSelect = "TR";
				scene = "game";
			}
		}
		// Bottom Left
		if(mouseX>200 && mouseX < 200+245 && mouseY>245 && mouseY<245+245){
			fill('rgba(115,115,115, 0.35)');
			rect(200,245, 245, 245);
			fill(flashColor);
			rect(200, 245+35*6, 35, 35);
			if(mouseIsPressed){
				initialSelect = "BL";
				scene = "game";
			}
		}
		// Bottom Right
		if(mouseX>200+245 && mouseX < 200+2*245 && mouseY>245 && mouseY<+245+245){
			fill('rgba(115,115,115, 0.35)');
			rect(200+245, 245, 245, 245);
			fill(flashColor);
			rect(200+245+35*6, 245+35*6, 35, 35);
			if(mouseIsPressed){
				initialSelect = "BR";
				scene = "game";
			}
		}

	}

	if(scene == "game"){
		if(chosenCorner == false){
			chooseCorner();
			updateBoolGrid();
			chosenCorner = true;
		}
		textSize(30);
		fill(0);
		text("Moves: " + numMoves+"/25",30, 50);
		if(checkWin()){
			if(gameover == false)
				alert("You Win! Press F5 to restart!")
			gameover = true;
		}
		else if(numMoves == 25){
			if(gameover == false)
				alert("You Lose! Delete system 32 to restart!")
			gameover = true;
		}
	}

}
