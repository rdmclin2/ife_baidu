var canvas = document.getElementById("game");

var ctx = canvas.getContext("2d");

ctx.fillStyle = '#fee6ce';
ctx.fillRect(0, 0, canvas.width, canvas.height);
var keysDown = {};
var blocks = [];

var agent = {
    x: canvas.width / 2,
    y: 20,
    speed: 256,
    radius: 15,
    color: '#49b626',
    draw: function() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
    }
};

var file = {
    line: 30,
    x: canvas.width / 2 - 15,
    y: canvas.height - 30,
    color: '#f2ae3b',
    draw: function() {
        // 填充三角形
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + this.line, this.y);
        ctx.lineTo(this.x + this.line / 2, this.y + this.line / 2 * 1.7);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

var block = function() {
    this.x = 0;
    this.y = 0;
    this.height = 20;
    this.width = 20;
    this.color = '#2e1e1e';
}

block.prototype.draw = function() {
    ctx.fillStyle = this.color;
    // console.log(this.x);
    ctx.fillRect(this.x, this.y, this.width, this.height);
}

var reset = function() {
    agent.x = canvas.width / 2;
    agent.y = 20;

    blocks = [];
    var blockCount = 1 + Math.floor(Math.random() * 5);

    for (var i = 0; i < blockCount; i++) {
        var blockInstance = new block();
        var flag = true;
        while (flag) {
            blockInstance.width = 50 + Math.floor(Math.random() * 50);
            blockInstance.height = 50 + Math.floor(Math.random() * 50);
            blockInstance.x = Math.random() * canvas.width;
            blockInstance.y = Math.random() * canvas.width;

            // 文件碰撞检测
            if (blockInstance.x <= (file.x + file.line) && (blockInstance.x + blockInstance.width) >= file.x && blockInstance.y <= (file.y + file.line / 2 * 1.7) && (blockInstance.y + blockInstance.width) >= file.y) {
                continue;
            }
            // 特工碰撞检测
            if ((agent.x - agent.radius) <= (blockInstance.x + blockInstance.width) && (agent.x + agent.radius) >= blockInstance.x && (agent.y - agent.radius) <= (blockInstance.y + blockInstance.height) && (agent.y + agent.radius) >= blockInstance.y) {
                continue;
            }
            flag = false;
        }

        blocks.push(blockInstance);
    }

}

var update = function(modifier) {
    var length = agent.speed * modifier;
    var oldx = agent.x;
    var oldy = agent.y;

    //边框碰撞检测
    if (38 in keysDown) { // 用户按的是↑
        if (agent.y - length > agent.radius) {
            agent.y -= length;
        }
    }
    if (40 in keysDown) { // 用户按的是↓
        if (agent.y + length < canvas.height - agent.radius) {
            agent.y += length;
        }
    }
    if (37 in keysDown) { // 用户按的是←
        if (agent.x - length > agent.radius) {
            agent.x -= length;
        }
    }
    if (39 in keysDown) { // 用户按的是→
        if (agent.x + length < canvas.width - agent.radius) {
            agent.x += length;
        }
    }

    // 墙壁碰撞检测
    for (var i = blocks.length - 1; i >= 0; i--) {
        if ((agent.x - agent.radius) <= (blocks[i].x + blocks[i].width) && (agent.x + agent.radius) >= blocks[i].x && (agent.y - agent.radius) <= (blocks[i].y + blocks[i].height) && (agent.y + agent.radius) >= blocks[i].y) {
            agent.x = oldx;
            agent.y = oldy;
        }
    }

    // 是否拿到文件
    if ((agent.x - agent.radius) <= (file.x + file.line) && (agent.x + agent.radius) >= file.x && (agent.y - agent.radius) <= (file.y + file.line / 2 * 1.7) && (agent.y + agent.radius) >= file.y) {
        reset();
    }


}

addEventListener("keydown", function(e) {
    keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function(e) {
    delete keysDown[e.keyCode];
}, false);

function draw() {
    ctx.fillStyle = '#fee6ce';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    agent.draw();
    file.draw();

    for (var b of blocks) {
        b.draw();
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
reset();
main();