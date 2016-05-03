/**
 * 地板定义
 * @param i
 * @param j
 */
let Block = function (i, j) {
  this.x = i ;
  this.y = j ;
  this.color = '#fee6ce';
}

Block.prototype.draw = function () {
  ctx.fillStyle = this.color;
  ctx.fillRect(this.x* block_length, this.y* block_length, block_length, block_length);
}