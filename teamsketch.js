// How many columns and rows?
var cols = 20;
var rows = 20;

// This will be the 2D array
var grid = new Array(rows);

// Open and closed set
var openSet = [];
var closeSet = [];

// Start and end
var start;
var end;

// Width and height of each cell of grid
var w, h;

// The road taken
var path = [];
var  Nosolution = false; 

var X = [1,-1,0,0 ,-1,1,-1,1];
var Y = [0,0,-1,1,-1,-1,1,1];

function heuristic(a,b){
  var d = dist(a.i, a.j, b.i , b.j);
  // var d = abs(a.i - b.i) + abs(a.j - b.j);
  return d;
}

function check(i,j){
  if(i<0 || j<0 || i>=cols || j>=rows){
    return false;
  }
  return true;
}

function setup(){
  createCanvas(300, 300); // p5.library

  //grid size
  w = width/cols;
  h = height/rows;

  // making a Arra
  for(var i = 0; i< rows; i++){
    grid[i] = new Array(cols);
  }

  for(var i = 0; i < rows; i++){
    for(var j = 0; j < cols; j++){
      grid[i][j] = new Spot(i,j);
    }
  }
  for(var i = 0; i < rows; i++){
    for(var j = 0; j < cols; j++){
      grid[i][j].addNeighbors(grid);
    }
  }
  start = grid[0][0];
  end   = grid[rows-1][cols-1];
  start.wall = false;
  end.wall   = false;

  openSet.push(start);
  console.log(grid);
}

function draw(){

  if(openSet.length > 0){
    var winner = 0;
    for(var i = 0; i < openSet.length; i++){
      if(openSet[i].f < openSet[winner].f){
        winner = i;
      }
    }
  current = openSet[winner];

  if(current === end){

    noLoop();
    console.log("Finish");
  }

  openSet.splice(winner,1);
  closeSet.push(current);

  var neighbors = current.neighbors;
  for(var i = 0; i <neighbors.length; i++){
    var nei = neighbors[i];
    if(!closeSet.includes(nei) && !nei.wall){
       var tempF = current.g + 1 + heuristic(nei,end) ;
       var bestF = false;
       if(openSet.includes(nei)){
         if(tempF < nei.f){
           bestF = true;
         }
       }
       else{
         openSet.push(nei);
         bestF = true;
       }
       if(bestF){
         nei.g = current.g + 1;
         nei.h = heuristic(nei,end);
         nei.f = nei.g + nei.h;
         nei.parent = current;
       }

    }
  }
  }else{
    // cannot move
    NoSolution = true;
    console.log("No Path Possible");
    noLoop();
    // return;
  }

  for(var i = 0; i < rows; i++){
    for(var j = 0; j < cols; j++){
      grid[i][j].show(color(255));
    }
  }


  for(var i = 0; i < openSet.length ; i++){
    openSet[i].show(color(0,255,0));
  }

  for(var i = 0; i < closeSet.length ; i++){
    closeSet[i].show(color(255,0,0));
  }
  console.log(Nosolution);
  if(!Nosolution){
	  path = [];
	  var temp =  current;
	  path.push(temp);
	  while(temp.parent){
	    path.push(temp.parent);
	    temp = temp.parent;
	  }

	  for(var i = 0; i < path.length ; i++){
	    path[i].show(color(0, 0, 255));
	  }
  }
  else {

  	return;
  }
}
