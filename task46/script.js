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
    this.x = i * block_length + block_length / 2;
    this.y = j * block_length + block_length / 2;
    this.speed = 256;
    this.radius = (block_length - 4) / 2;
    this.color = '#49b626';
};

Agent.prototype.draw = function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
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
    this.x = i * block_length;
    this.y = j * block_length;
    this.color = '#f2ae3b';
};

File.prototype.draw = function () {
    // 填充三角形
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x + block_length, this.y);
    ctx.lineTo(this.x + block_length / 2, this.y + block_length / 2 * 1.7);
    ctx.fillStyle = this.color;
    ctx.fill();
};

let Block = function (i, j) {
    this.x = i * block_length;
    this.y = j * block_length;
    this.color = '#fee6ce';
}

Block.prototype.draw = function () {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, block_length, block_length);
}

let Obstacle = function (i, j) {
    this.x = i * block_length;
    this.y = j * block_length;
    this.color = '#2e1e1e';
}

Obstacle.prototype.draw = function () {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, block_length, block_length);
}

let Wall = function (i, j) {
    this.x = i * block_length;
    this.y = j * block_length;
    this.color = '#3e4958';
}

Wall.prototype.draw = function () {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, block_length, block_length);
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

    //特工,和文件
    agent = new Agent(block_width / 2, 1);
    file = new File(block_width / 2, block_height - 2);

}

//let update = function (modifier) {
//    let width = agent.speed * modifier;
//    let oldx = agent.x;
//    let oldy = agent.y;
//
//    //墙壁碰撞检测
//    if (38 in keysDown) { // 用户按的是↑
//        if (agent.y - width > agent.radius + block_length) {
//            agent.y -= width;
//        }
//    }
//    if (40 in keysDown) { // 用户按的是↓
//        if (agent.y + width < canvas.height - agent.radius - block_length) {
//            agent.y += width;
//        }
//    }
//    if (37 in keysDown) { // 用户按的是←
//        if (agent.x - width > agent.radius + block_length) {
//            agent.x -= width;
//        }
//    }
//    if (39 in keysDown) { // 用户按的是→
//        if (agent.x + width < canvas.width - agent.radius - block_length) {
//            agent.x += width;
//        }
//    }
//
//    //alert(obstacles.length);
//    // 墙壁碰撞检测
//    for (let i = obstacles.length - 1; i >= 0; i--) {
//        if ((agent.x - agent.radius) < (obstacles[i].x + block_length) && (agent.x + agent.radius) > obstacles[i].x && (agent.y - agent.radius) < (obstacles[i].y + block_length) && (agent.y + agent.radius) > obstacles[i].y) {
//            agent.x = oldx;
//            agent.y = oldy;
//        }
//    }
//
//    // 是否拿到文件
//    if ((agent.x - agent.radius) <= (file.x + block_length) && (agent.x + agent.radius) >= file.x && (agent.y - agent.radius) <= (file.y + block_length / 2 * 1.7) && (agent.y + agent.radius) >= file.y) {
//        init_canvas();
//    }
//}

//addEventListener("keydown", function (e) {
//    keysDown[e.keyCode] = true;
//}, false);
//
//addEventListener("keyup", function (e) {
//    delete keysDown[e.keyCode];
//}, false);


canvas.addEventListener("click",function(event){
    let e = event;
    let startX = Math.floor(agent.x /block_length);
    let startY= Math.floor(agent.y /block_length);

    let endX = Math.floor((e.clientX - canvas.offsetLeft)/ block_length);
    let endY= Math.floor((e.clientY - canvas.offsetTop)/block_length);

    let grid = new Grid(block_width,block_height);
    for (let i = 0; i < block_height; i++) {
        for (let j = 0; j < block_width; j++) {
            if(boards[i][j] instanceof Wall || boards[i][j] instanceof Obstacle){
                let x = boards[i][j].x / block_length;
                let y = boards[i][j].y / block_length;
                grid.setWalkableAt(x, y, false);
            }
        }
    }
    let path = finder.findPath(startX, startY, endX, endY, grid);
    console.log(JSON.stringify(path));
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
               agent.x = path[time][0] * block_length + block_length / 2;;
               agent.y = path[time][1] * block_length + block_length / 2;;
               requestAnimationFrame(draw);
               if(path[time][0] === file.x/block_length &&
                   path[time][1] === file.y/block_length){
                   init_canvas();
               }
           }, 1000/20 * time);
       })(i);
   }
}

// 少年，开始游戏吧！
init_canvas();
draw();
