/**
 * 墙壁对象定义
 * @param x
 * @param y
 */
var Wall = function (i, j) {
  this.x = i ;
  this.y = j ;
  this.posX  =this.x* block_length;
  this.posY = this.y* block_length;
  this.color = '#3e4958';
}

Wall.prototype.draw = function () {
  ctx.fillStyle = this.color;
  ctx.fillRect( this.posX, this.posY, block_length, block_length);
}