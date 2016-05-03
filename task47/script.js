/**
 *  变量定义
 */
let keysDown = {};
let obstacles = [];
let agent;
let file;
let guards = [];
let bullets = [];
let finder = new AStarFinder();
let path = [];

function findPath(startX, startY, endX, endY) {
  let grid = new Grid(block_width, block_height);

  for (let i = 0; i < block_height; i++) {
    for (let j = 0; j < block_width; j++) {
      if (boards[i][j] instanceof Wall || boards[i][j] instanceof Obstacle) {
        grid.setWalkableAt(boards[i][j].x, boards[i][j].y, false);
      }
    }
  }
  return finder.findPath(startX, startY, endX, endY, grid);
}

canvas.addEventListener("click", function (event) {
  if(path.length !== 0 ){
    console.log("正在寻路中");
    return ;
  }
  let e = event;
  let startX = agent.x;
  let startY = agent.y;

  let endX = Math.floor((e.clientX - canvas.offsetLeft) / block_length);
  let endY = Math.floor((e.clientY - canvas.offsetTop) / block_length);

  path = findPath(startX, startY, endX, endY);

});

function draw() {
  for (let i = 0; i < block_height; i++) {
    for (let j = 0; j < block_width; j++) {
      boards[i][j].draw();
    }
  }
  agent.draw();
  file.draw();

  for(let guard of guards){
    guard.draw();
  }

  for(let bullet of bullets){
    bullet.draw();
  }
}

function update(modifier){
  //寻路
  if(path.length !== 0) {
    let dest = path[0];

    if(Math.floor(agent.posX / block_length) === dest[0] &&
      Math.floor(agent.posY / block_length) === dest[1]) {
      agent.x = dest[0];
      agent.y = dest[1];

      if(dest[0] === file.x && dest[1] === file.y) {
        init_canvas();
      }
      path.shift();
    }else {
      var dirX = dest[0] - agent.x;
      var dirY = dest[1] - agent.y;
      agent.posX += dirX * modifier * agent.speed;
      agent.posY += dirY * modifier * agent.speed;
    }
  }

}

function main() {
  var now = Date.now();
  var delta = now - then;

  update(delta / 1000);
  draw();

  then = now;
  requestAnimationFrame(main);
}

// 少年，开始游戏吧！
var then = Date.now();
init_canvas();
main();
