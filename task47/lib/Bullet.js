/**
 * 子弹对象定义
 * @param x
 * @param y
 *
 */
let Bullet = function (i, j,color,dirX,dirY,shooter) {
  this.posX = i ;
  this.posY = j ;
  this.dirX = dirX;
  this.dirY = dirY;
  this.speed = 256;
  this.radius = 4;
  this.color = color;
  this.shooter= shooter;
};

Bullet.prototype.draw = function () {
  ctx.beginPath();
  ctx.arc(this.posX,this.posY, this.radius, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.fillStyle = this.color;
  ctx.fill();
}