/**
 * agent对象定义
 * @param x
 * @param y
 */
let Agent = function (i, j) {
  this.x = i ; // 初始位置x
  this.y = j ; // 初始位置y
  this.radius = (block_length ) / 2;
  this.posX = this.x * block_length+ this.radius ;
  this.posY = this.y * block_length+ this.radius ;
  this.speed = 512;

  this.color = '#49b626';
};

Agent.prototype.draw = function () {
  ctx.beginPath();
  ctx.arc(this.posX,this.posY, this.radius, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.fillStyle = this.color;
  ctx.fill();
}