var UP = 0;
var RIGHT = 1;
var DOWN = 2;
var LEFT = 3;

/**
 * boxMap 构造函数
 */
var boxMap = function(selector) {
    this.element = document.querySelector(selector);
}

/**
 * 创建表格
 * @param  {[type]} rows    [description]
 * @param  {[type]} columns [description]
 * @return {[type]}         [description]
 */
boxMap.prototype.create = function(rows, columns) {
    var html = '';
    for (var y = 0; y <= rows; y++) {
        html += '<tr>';
        for (var x = 0; x <= columns; x++) {
            if (x === 0 && y === 0) {
                html += '<td></td>';
            } else {
                if (y === 0) {
                    html += '<td class="box" data-type="x-axis">' + x + '</td>';
                } else if (x === 0) {
                    html += '<td class="box" data-type="y-axis">' + y + '</td>';
                } else {
                    html += '<td class="box" data-type="null"></td>';
                }
            }
        }
        html += "</tr>";
    }

    this.columns = columns;
    this.rows = rows;
    this.element.innerHTML = html;
    this.boxs = this.element.getElementsByTagName('td');
    this.element.style.transform = 'rotate(0deg)'
}

/**
 * 获取指定位置的方块
 * @param  {[int]} position [description]
 * @return {Element}          [description]
 */
boxMap.prototype.get = function(x, y) {
    return this.boxs[x * (this.rows + 1) + y];
}

/**
 * boxBot 构造函数
 * @param  selector [description]
 */
var boxBot = function(selector) {
    this.element = document.querySelector(selector);
    this.posX = 1;
    this.posY = 1;
    this.direct = 0; // 0: UP 1: RIGHT  2: DOWN  3: LEFT

    this.columns = 10;
    this.rows = 10;
    this.boxmap = new boxMap('#box-map');
    this.boxmap.create(this.rows, this.columns);

    // this.boxmap.get(this.posX, this.posY).appendChild(this.element);

    this.move();
}

/**
 * 移动
 */
boxBot.prototype.go = function() {
    console.log(this.direct);
    var direction = this.getCurrentDirection();
    if (direction === UP && (this.posX - 1) >= 1) {
        this.posX--;
    } // UP
    if (direction === RIGHT && (this.posY + 1) <= this.columns) {
        this.posY++;
    } // RIGHT
    if (direction === DOWN && (this.posX + 1) <= this.rows) {
        this.posX++;
    } // DOWN
    if (direction === LEFT && (this.posY - 1) >= 1) {
        this.posY--;
    } // LEFT

    this.move();
}

boxBot.prototype.getCurrentDirection = function(){
    return (this.direct % 4 + 4) % 4;
}

/**
 * 移动动作渲染
 */
boxBot.prototype.move = function() {
    this.element.style.left = this.element.clientWidth * this.posY + 'px';
    this.element.style.top = this.element.clientHeight * this.posX + 'px';
}

/**
 * 向左平移一格，方向不变
 */
boxBot.prototype.traLeft = function() {
    if ((this.posY - 1) >= 1) {
        this.posY--;
        this.move();
    }
};

/**
 * 向右平移一格，方向不变
 */
boxBot.prototype.traRight = function() {
    if ((this.posY + 1) <= this.columns) {
        this.posY++;
        this.move();
    }
};

/**
 * 向上平移一格，方向不变
 */
boxBot.prototype.traTop = function() {
    if ((this.posX - 1) >= 1) {
        this.posX--;
        this.move();
    }
};

/**
 * 向下平移一格，方向不变
 */
boxBot.prototype.traBottom = function() {
    if ((this.posX + 1) <= this.rows) {
        this.posX++;
        this.move();
    }
};


/**
 * 方向转向屏幕左侧，并向屏幕的左侧移动一格
 */
boxBot.prototype.movLeft = function() {
    this.turn(LEFT);
    if ((this.posY - 1) >= 1) {
        this.posY--;
        this.move();
    }
};

/**
 * 方向转向屏幕右侧，并向屏幕的右侧移动一格
 */
boxBot.prototype.movRight = function() {
    this.turn(RIGHT);
    if ((this.posY + 1) <= this.columns) {
        this.posY++;
        this.move();
    }
};

/**
 * 方向转向屏幕上侧，并向屏幕的上侧移动一格
 */
boxBot.prototype.movTop = function() {
    this.turn(UP);
    if ((this.posX - 1) >= 1) {
        this.posX--;
        this.move();
    }
};

/**
 * 方向转向屏幕下侧，并向屏幕的下侧移动一格
 */
boxBot.prototype.movBottom = function() {
    this.turn(DOWN);
    if ((this.posX + 1) <= this.rows) {
        this.posX++;
        this.move();
    }
};

/**
 * 左转
 */
boxBot.prototype.turnLeft = function() {
    this.direct = (this.direct - 1);
    this.rotate(); 
}

/**
 * 右转
 */
boxBot.prototype.turnRight = function() {
    this.direct = (this.direct + 1);
    this.rotate();
}

/**
 * 倒转
 */
boxBot.prototype.turnBack = function() {
    this.direct = (this.direct + 2);
    this.rotate();
}

/**
 * 执行转动动作
 */
boxBot.prototype.rotate= function() {
    this.element.style.transform = 'rotate(' + this.direct * 90 + 'deg)';
}


boxBot.prototype.turn = function(direction){
    var direct = this.getCurrentDirection();
    var rotateMap = {
        0: { 0: 0, 1 : 1 , 2 : 2, 3 : -1},
        1: { 0 : -1 , 1 : 0 , 2 : 1, 3 : 2},
        2: { 0 : 2 , 1 : -1 , 2 : 0, 3 : 1},
        3: { 0 : 1 , 1 : 2 , 2 : -1, 3 : 0}
    };

    this.direct += rotateMap[direct][direction];
    this.rotate();
}

function $(querySelector){
    return document.querySelector(querySelector);
}

/**
 * [init_buttons description]
 * @param  {[type]} bot [description]
 * @return {[type]}     [description]
 */
function init_buttons(bot) {
    var btnExe = document.getElementById('btn-execute');
    var inputCommand = document.getElementById('input-command');
    btnExe.onclick = function() {
        var value = inputCommand.value.trim();
        if (!value) return;
        switch(value){
            case "TUN LEF" : bot.turnLeft();break;
            case "TUN RIG" : bot.turnRight();break;
            case "TUN BAC" : bot.turnBack();break;
            case "GO"      : bot.go();break;
            case "TRA LEF" : bot.traLeft();break;
            case "TRA TOP" : bot.traTop();break;
            case "TRA RIG" : bot.traRight();break;
            case "TRA BOT" : bot.traBottom();break;
            case "MOV LEF" : bot.movLeft();break;
            case "MOV TOP" : bot.movTop();break;
            case "MOV RIG" : bot.movRight();break;
            case "MOV BOT" : bot.movBottom();break;

        }
    }

    $('#btn-go').onclick = function() { bot.go(); }
    $('#btn-left').onclick = function() { bot.turnLeft(); }
    $('#btn-right').onclick = function() { bot.turnRight(); }
    $('#btn-bak').onclick = function() { bot.turnBack(); }

    $('#btn-traleft').onclick = function() { bot.traLeft(); }
    $('#btn-tratop').onclick = function() { bot.traTop(); }
    $('#btn-trarig').onclick = function() { bot.traRight(); }
    $('#btn-trabot').onclick = function() { bot.traBottom(); }

    $('#btn-movleft').onclick = function() { bot.movLeft(); }
    $('#btn-movtop').onclick = function() { bot.movTop(); }
    $('#btn-movrig').onclick = function() { bot.movRight(); }
    $('#btn-movbot').onclick = function() { bot.movBottom(); }

}

function init() {
    var bot = new boxBot("#bot");
    init_buttons(bot);
}

window.onload = init;
