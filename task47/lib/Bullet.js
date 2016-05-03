/**
 * 子弹对象定义
 * @param x
 * @param y
 *
 */
let Bullet = function (i, j,color) {
  this.x = i ;
  this.y = j ;
  this.speed = 256;
  this.radius = 4;
  this.color = color;
};

Bullet.prototype.draw = function () {
  ctx.beginPath();
  ctx.arc(this.x,this.y, this.radius, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.fillStyle = this.color;
  ctx.fill();
}