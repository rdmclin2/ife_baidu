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