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
    x: 0,
    y: 0,
    height: 20,
    width: 20,
    color: '#2e1e1e',
    draw: function() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

var reset = function() {
    agent.x = canvas.width / 2;
    agent.y = 20;

    var blockCount = 1 + Math.floor(Math.random() * 5);
    for (var i = 0; i < blockCount; i++) {
        var blockInstance = new block();
        var width = 50 + Math.floor(Math.random * 50);
        var height

    }
}

var update = function(modifier) {
    var length = agent.speed * modifier;
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

    if (
        (agent.x - agent.radius) <= (file.x + file.line) && (agent.x + agent.radius) >= file.x && (agent.y - agent.radius) <= (file.y + file.line / 2 * 1.7) && (agent.y + agent.radius) >= file.y
    ) {
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
    block.draw();

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