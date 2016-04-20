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
}

/**
 * 获取指定位置的方块
 * @param  {[int]} position [description]
 * @return {Element}          [description]
 */
boxMap.prototype.get = function(x,y) {
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

    this.boxmap.get(this.posX,this.posY).appendChild(this.element);
    // this.element.style.transform = 'rotate(180deg)';
}

/**
 * 移动
 */
boxBot.prototype.move = function() {
  console.log(this.direct);
    if (this.direct === 0 && (this.posX - 1) >= 1) {
        this.posX--;
    } // UP
    if (this.direct === 1 && (this.posY + 1) <= this.columns) {
        this.posY++;
    } // RIGHT
    if (this.direct === 2 && (this.posX + 1) <= this.rows) {
        this.posX++;
    } // DOWN
    if (this.direct === 3 && (this.posY - 1) >= 1) {
        this.posY--;
    } // LEFT
    this.boxmap.get(this.posX,this.posY).appendChild(this.element);
}

/**
 * 左转
 */
boxBot.prototype.turnLeft= function(){
  this.direct = (this.direct - 1 + 4) % 4;
  this.turn();
}

/**
 * 右转
 */
boxBot.prototype.turnRight = function(){
  this.direct = (this.direct + 1) % 4;
  this.turn();
}

/**
 * 倒转
 */
boxBot.prototype.turnBack = function(){
  this.direct = (this.direct + 2) % 4;
  this.turn();
}

/**
 * 执行转动动作
 */
boxBot.prototype.turn = function(){
  this.element.style.transform = 'rotate('+this.direct*90+ 'deg)';
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
        if (value === "TUN LEFT") {
            bot.turnLeft();
        } else if (value === "TUN RIG") {
            bot.turnRight();
        } else if (value === "TUN BAC") {
            bot.turnBack();
        } else if (value === "GO") {
            bot.move();
        }
        // render_table();
    }

    var btnGo = document.getElementById('btn-go');
    var btnLeft = document.getElementById('btn-left');
    var btnRight = document.getElementById('btn-right');
    var btnBack = document.getElementById('btn-bak');

    btnGo.onclick = function() {
      bot.move();
    }

    btnLeft.onclick = function() {
        bot.turnLeft();
    }

    btnRight.onclick = function() {
        bot.turnRight();        
    }

    btnBack.onclick = function() {
      bot.turnBack();       
    }

}

function init() {
    var bot = new boxBot("#bot"); 
    init_buttons(bot);
}

window.onload = init;
