/**
 *  面板的常量定义
 */
var block_length = 30;
var block_width = 16;
var block_height = 20;

// 生成墙壁的可能性
var probobility = 0.1;

// 定义方块类型
var BLOCK_WALL = 1;
var BLOCK_AGENT = 2;
var BLOCK_OBSTACLE = 3;
var BLOCK_FILE = 4;

/**
 *  变量定义
 */
var keysDown = {};
var obstacles = [];
var agent;
var file;
var guards = [];
var bullets = [];
var finder = new AStarFinder();
var pathes = [];

/**
 * 创建canvas
 */
var canvasGame = document.createElement("canvas");
canvasGame.width = block_width * block_length;
canvasGame.height = block_height * block_length;
document.getElementById("container").appendChild(canvasGame);

/**
 * 获取背景
 */
var ctx = canvasGame.getContext("2d");

var boards = new Array(block_height);
for (var i = 0; i < block_height; i++) {
  boards[i] = new Array(block_width);
}

/**
 * 初始化面板
 * @type {Array}
 */
init_canvas = function () {
  obstacles = [];
  guards = [];
  bullets = [];
  pathes = [];


  //最底层 铺地和墙
  for (var i = 0; i < block_width; i++) {
    for (var j = 0; j < block_height; j++) {

      if (i == 0 || j == 0 || i == (block_width - 1) || j == (block_height - 1)) {
        boards[j][i] = new Wall(i, j);
      } else {
        boards[j][i] = new Block(i, j);
      }
    }
  }

  //第二层 铺障碍
  for (var i = 1; i < block_width - 1; i++) {
    for (var j = 1; j < block_height - 1; j++) {
      if (i == block_width / 2 && j == 1)continue;
      if (i == block_width / 2 && j == block_height - 2) continue;
      if (Math.random() < probobility) {
        boards[j][i] = new Obstacle(i, j);
        obstacles.push(boards[j][i]);
      }
    }
  }

  var startX = block_width / 2;
  var startY = 1;

  var endX = block_width / 2;
  var endY = block_height - 2;

  var path = findPath(startX, startY, endX, endY);
  if (path.length === 0) {
    init_canvas();
    return [];
  }

  //特工,和文件
  agent = new Agent(startX, startY);
  file = new File(endX, endY);

  //设置守卫
  var guardCount = 1 + Math.floor(Math.random() * 3);
  while ( guards.length < guardCount) {
    var x = Math.floor(block_width * Math.random());
    var y = Math.floor(block_height * Math.random());
    if (x == block_width / 2 && y == 1)continue;
    if (x == block_width / 2 && y == block_height - 2) continue;


    if( boards[y][x] instanceof Block){
      var isIn = false;
      for(var guard in guards){
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