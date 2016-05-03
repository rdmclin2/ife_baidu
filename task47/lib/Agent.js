/**
 * agent对象定义
 * @param x
 * @param y
 */
let Agent = function (i, j) {
  this.x = i ; // 初始位置x
  this.y = j ; // 初始位置y
  this.posX = this.x * block_length ;
  this.posY = this.y * block_length ;
  this.speed = 512;
  this.radius = (block_length ) / 2;
  this.color = '#49b626';
};

Agent.prototype.draw = function () {
  ctx.beginPath();
  ctx.arc(this.posX+ this.radius,this.posY+ this.radius, this.radius, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.fillStyle = this.color;
  ctx.fill();
}