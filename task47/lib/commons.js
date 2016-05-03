/**
 *  面板的常量定义
 */
const block_length = 30;
const block_width = 16;
const block_height = 20;

// 生成墙壁的可能性
const probobility = 0.1;

// 定义方块类型
const BLOCK_WALL = 1;
const BLOCK_AGENT = 2;
const BLOCK_OBSTACLE = 3;
const BLOCK_FILE = 4;

/**
 * 创建canvas
 */
let canvas = document.createElement("canvas");
canvas.width = block_width * block_length;
canvas.height = block_height * block_length;
document.getElementById("container").appendChild(canvas);

/**
 * 获取背景
 */
let ctx = canvas.getContext("2d");

let boards = new Array(block_height);
for (let i = 0; i < block_height; i++) {
  boards[i] = new Array(block_width);
}

/**
 * 初始化面板
 * @type {Array}
 */
let init_canvas = function () {
  obstacles = [];
  guards = [];
  //最底层 铺地和墙
  for (let i = 0; i < block_width; i++) {
    for (let j = 0; j < block_height; j++) {

      if (i == 0 || j == 0 || i == (block_width - 1) || j == (block_height - 1)) {
        boards[j][i] = new Wall(i, j);
      } else {
        boards[j][i] = new Block(i, j);
      }
    }
  }

  //第二层 铺障碍
  for (let i = 1; i < block_width - 1; i++) {
    for (let j = 1; j < block_height - 1; j++) {
      if (i == block_width / 2 && j == 1)continue;
      if (i == block_width / 2 && j == block_height - 2) continue;
      if (Math.random() < probobility) {
        boards[j][i] = new Obstacle(i, j);
        obstacles.push(boards[j][i]);
      }
    }
  }

  let startX = block_width / 2;
  let startY = 1;

  let endX = block_width / 2;
  let endY = block_height - 2;

  let path = findPath(startX, startY, endX, endY);
  if (path.length === 0) {
    init_canvas();
    return [];
  }

  //特工,和文件
  agent = new Agent(startX, startY);
  file = new File(endX, endY);

  //设置守卫
  let guardCount = 1 + Math.floor(Math.random() * 3);
  while ( guards.length < guardCount) {
    let x = Math.floor(block_width * Math.random());
    let y = Math.floor(block_height * Math.random());
    if (x == block_width / 2 && y == 1)continue;
    if (x == block_width / 2 && y == block_height - 2) continue;


    if( boards[y][x] instanceof Block){
      let isIn = false;
      for(let guard in guards){
        if(guard.x === x && guard.y === y){
          isIn = true;
        }
      }
      if(!isIn){
        guards.push(new Guard(x,y));
      }
    }
  }
}