/**
 *  面板的常量定义
 */
const block_length = 30;
const block_width = 16;
const block_height = 20;

// 生成墙壁的可能性
const probobility = 0.2;

// 定义方块类型
const BLOCK_WALL = 1;
const BLOCK_AGENT = 2;
const BLOCK_OBSTACLE = 3;
const BLOCK_FILE = 4;

/**
 *  变量定义
 */
let keysDown = {};
let obstacles = [];
let agent;
let file;
let finder = new AStarFinder();

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
 * agent对象定义
 * @param x
 * @param y
 */
let Agent = function (i, j) {
    this.x = i ;
    this.y = j ;
    this.radius = (block_length - 4) / 2;
    this.color = '#49b626';
};

Agent.prototype.draw = function () {
    var posX = this.x * block_length + block_length / 2;
    var posY = this.y* block_length + block_length / 2;
    ctx.beginPath();
    ctx.arc(posX,posY, this.radius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
}

/**
 * file对象定义
 * @param x
 * @param y
 */
let File = function (i, j) {
    this.x = i ;
    this.y = j ;
    this.color = '#f2ae3b';
};

File.prototype.draw = function () {
    var posX = this.x * block_length;
    var posY = this.y * block_length;
    // 填充三角形
    ctx.beginPath();
    ctx.moveTo(posX, posY);
    ctx.lineTo(posX + block_length, posY);
    ctx.lineTo(posX + block_length / 2, posY + block_length / 2 * Math.sqrt(3));
    ctx.fillStyle = this.color;
    ctx.fill();
};

let Block = function (i, j) {
    this.x = i ;
    this.y = j ;
    this.color = '#fee6ce';
}

Block.prototype.draw = function () {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x* block_length, this.y* block_length, block_length, block_length);
}

let Obstacle = function (i, j) {
    this.x = i ;
    this.y = j ;
    this.color = '#2e1e1e';
}

Obstacle.prototype.draw = function () {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x* block_length, this.y* block_length, block_length, block_length);
}

let Wall = function (i, j) {
    this.x = i ;
    this.y = j ;
    this.color = '#3e4958';
}

Wall.prototype.draw = function () {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x* block_length, this.y* block_length, block_length, block_length);
}

/**
 * 初始化面板
 * @type {Array}
 */
let init_canvas = function () {
    obstacles = [];
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
    let startY= 1;

    let endX = block_width / 2;
    let endY= block_height - 2;

    let path = findPath(startX,startY,endX,endY);
    if(path.length === 0 ){
        init_canvas();
        return [];
    }

    //特工,和文件
    agent = new Agent(startX, startY);
    file = new File(endX,endY);

}

function findPath(startX,startY,endX,endY){
    let grid = new Grid(block_width,block_height);

    for (let i = 0; i < block_height; i++) {
        for (let j = 0; j < block_width; j++) {
            if(boards[i][j] instanceof Wall || boards[i][j] instanceof Obstacle){
                grid.setWalkableAt(boards[i][j].x, boards[i][j].y, false);
            }
        }
    }
    let path = finder.findPath(startX, startY, endX, endY, grid);
    return path;
}

canvas.addEventListener("click",function(event){
    let e = event;
    let startX = agent.x;
    let startY= agent.y;

    let endX = Math.floor((e.clientX - canvas.offsetLeft)/ block_length);
    let endY= Math.floor((e.clientY - canvas.offsetTop)/block_length);

    let path = findPath(startX,startY,endX,endY);

    main(path);
});

function draw() {
    for (let i = 0; i < block_height; i++) {
        for (let j = 0; j < block_width; j++) {
            boards[i][j].draw();
        }
    }
    agent.draw();
    file.draw();
}

function main(path) {
   for(let i = 0 ; i < path.length; i++){
       (function(time){
           window.setTimeout(function () {
               agent.x = path[time][0];
               agent.y = path[time][1];
               requestAnimationFrame(draw);
               if(path[time][0] === file.x &&
                   path[time][1] === file.y){
                   init_canvas();
               }
           }, 1000/20 * time);
       })(i);
   }
}

// 少年，开始游戏吧！
init_canvas();
draw();
