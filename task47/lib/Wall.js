/**
 * 墙壁对象定义
 * @param x
 * @param y
 */
var Wall = function (i, j) {
  this.x = i ;
  this.y = j ;
  this.color = '#3e4958';
}

Wall.prototype.draw = function () {
  ctx.fillStyle = this.color;
  ctx.fillRect(this.x* block_length, this.y* block_length, block_length, block_length);
}