/**
 * 守卫对象定义
 * @param x
 * @param y
 */
let Guard= function (i, j) {
  this.x = i ;
  this.y = j ;
  this.radiusInner = (block_length) / 2;
  this.posX = this.x * block_length +this.radiusInner;
  this.posY = this.y* block_length +this.radiusInner;
  this.radiusOut = block_length * 2;
  this.colorInner = '#f3634f';
  this.colorOut= "rgba(231, 192, 174, 0.5)";
  this.colorBorder = '#ba8479';
  this.colorBullet  = '#f3634f';
  this.gunDelay = 256;
  this.gunFireTime = Date.now();
};

Guard.prototype.draw = function () {
  //画外圆
  ctx.beginPath();
  ctx.arc(this.posX,this.posY, this.radiusOut, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.fillStyle = this.colorOut;
  ctx.fill();

  //画边
  ctx.strokeStyle =this.colorBorder;
  ctx.stroke();

  //画内圆
  ctx.beginPath();
  ctx.arc(this.posX ,this.posY, this.radiusInner, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.fillStyle = this.colorInner;
  ctx.fill();
}

Guard.prototype.shoot = function(){
  let now = Date.now();
  let delta = now - this.gunFireTime;
  if(delta < this.gunDelay){
    return ;
  }

  let distance = euclidean((agent.posX - this.posX), (agent.posY - this.posY));
  let dirX = (agent.posX - this.posX) / distance;
  let dirY = (agent.posY - this.posY) / distance;
  let bullet = new Bullet(this.posX,this.posY,this.colorBullet,dirX,dirY);
  bullets.push(bullet);
  this.gunFireTime = Date.now();
}

Guard.prototype.detectAgent= function(){
  let distance = euclidean((agent.posX - this.posX), (agent.posY - this.posY));
  let sumRadius = agent.radius + this.radiusOut;
  if(distance < sumRadius) {
    return true;
  }else{
    return false;
  }
}