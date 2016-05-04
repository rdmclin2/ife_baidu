/**
 * agent对象定义
 * @param x
 * @param y
 */
let Agent = function (i, j) {
  this.x = i; // 初始位置x
  this.y = j; // 初始位置y
  this.radius = (block_length ) / 2;
  this.posX = this.x * block_length + this.radius;
  this.posY = this.y * block_length + this.radius;
  this.speed = 512;

  this.color = '#49b626';

  this.colorBullet = '#49b626';
  this.gunDelay = 256;
  this.gunFireTime = Date.now();
};

Agent.prototype.draw = function () {
  ctx.beginPath();
  ctx.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.fillStyle = this.color;
  ctx.fill();
}

Agent.prototype.shoot = function (guard) {
  //子弹射击有间隔时间
  let now = Date.now();
  let delta = now - this.gunFireTime;
  if (delta < this.gunDelay) {
    return;
  }

  //判断有没有墙
  if(this.detectObstacle(guard)){
    return;
  }

  let distance = euclidean((guard.posX - this.posX), (guard.posY - this.posY));
  let dirX = (guard.posX - this.posX) / distance;
  let dirY = (guard.posY - this.posY) / distance;
  let bullet = new Bullet(this.posX, this.posY, this.colorBullet, dirX, dirY, this);
  bullets.push(bullet);
  this.gunFireTime = Date.now();
}

Agent.prototype.detectObstacle = function (guard) {
  let distance = euclidean((guard.posX - this.posX), (guard.posY - this.posY));
  let dirX = (guard.posX - this.posX) / distance;
  let dirY = (guard.posY - this.posY) / distance;
  let i = this.posX;
  let j = this.posY;
  console.log(dirX, dirY);

  while (true) {
    let disLine = euclidean((i - this.posX), (j - this.posY));
    if (disLine > distance) {
      break;
    }
    i += dirX;
    j += dirY;
    let endX = Math.floor((i - canvasGame.offsetLeft) / block_length);
    let endY = Math.floor((j - canvasGame.offsetTop) / block_length);
    if (boards[endY][endX] instanceof Obstacle) {
      return true;
    }
  }

  return false;
}