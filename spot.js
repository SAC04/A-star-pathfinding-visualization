function Spot(i,j){
  this.i=i;
  this.j=j;
  // f,g,h values for A*
  this.f = 0;
  this.h = 0;
  this.g = 0;
  this.neighbors = [];
  this.parent = undefined;
  this.addNeighbors = function(grid){

    for(var k = 0; k < 8; k++){
      if(check(i+X[k],j+Y[k])){
        this.neighbors.push(grid[i + X[k]][j + Y[k]]);
      }
    }
  }
  // this.previous = undefined;

  this.wall = false;
  if(random(1) < 0.3){
    this.wall = true;
  }

  this.show = function(col){
    fill(col);
    if(this.wall){
      fill(0);
    }
    noStroke();
    rect(this.i * w, this.j * h, w, h);
  }

}
