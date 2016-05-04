/**
 * 守卫对象定义
 * @param x
 * @param y
 */
var Guard= function (i, j) {
  this.x = i ;
  this.y = j ;
  this.radiusInner = (block_length) / 2;
  this.posX = this.x * block_length +this.radiusInner;
  this.posY = this.y* block_length +this.radiusInner;
  this.radiusOut = block_length * 5;
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

Guard.prototype.lineToAgent = function(){
  ctx.fillStyle = this.colorBullet;
  ctx.beginPath();
  ctx.moveTo(this.posX,this.posY);
  ctx.lineTo(agent.posX ,agent.posY);
  ctx.closePath();
  ctx.stroke();
}

Guard.prototype.shoot = function(){
  var now = Date.now();
  var delta = now - this.gunFireTime;
  if(delta < this.gunDelay){
    return ;
  }

  var distance = euclidean((agent.posX - this.posX), (agent.posY - this.posY));
  var dirX = (agent.posX - this.posX) / distance;
  var dirY = (agent.posY - this.posY) / distance;
  var bullet = new Bullet(this.posX,this.posY,this.colorBullet,dirX,dirY,this);
  bullets.push(bullet);
  this.gunFireTime = Date.now();
}

Guard.prototype.detectAgent= function(){
  var distance = euclidean((agent.posX - this.posX), (agent.posY - this.posY));
  var sumRadius = agent.radius + this.radiusOut;
  if(distance < sumRadius) {
    var dirX = (agent.posX - this.posX) / distance;
    var dirY = (agent.posY - this.posY) / distance;
    var i  = this.posX;
    var j  = this.posY;
    console.log(dirX,dirY);

    while(true){
      var disLine=  euclidean((i - this.posX), (j - this.posY));
      if(disLine > distance){break;}
      i += dirX ;
      j += dirY ;
      var endX = Math.floor((i - canvasGame.offsetLeft) / block_length);
      var endY = Math.floor((j - canvasGame.offsetTop) / block_length);
      if(boards[endY][endX] instanceof Obstacle){
        return false;
      }
    }
    return true;
  }else{
    return false;
  }
}