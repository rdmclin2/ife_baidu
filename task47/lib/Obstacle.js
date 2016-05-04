/**
 * 障碍物变量定义
 * @param i
 * @param j
 */
var Obstacle = function (i, j) {
  this.x = i ;
  this.y = j ;
  this.posX = this.x* block_length;
  this.posY = this.y* block_length;
  this.color = '#2e1e1e';
}

Obstacle.prototype.draw = function () {
  ctx.fillStyle = this.color;
  ctx.fillRect(this.posX, this.posY, block_length, block_length);
}