/**
 * 守卫对象定义
 * @param x
 * @param y
 */
let Guard= function (i, j) {
  this.x = i ;
  this.y = j ;
  this.posX = this.x * block_length;
  this.posY = this.y* block_length;
  this.radiusInner = (block_length) / 2;
  this.radiusOut = block_length * 2;
  this.colorInner = '#f3634f';
  this.colorOut= "rgba(231, 192, 174, 0.5)";
  this.colorBorder = '#ba8479';
};

Guard.prototype.draw = function () {
  //画外圆
  ctx.beginPath();
  ctx.arc(this.posX+this.radiusInner,this.posY+this.radiusInner, this.radiusOut, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.fillStyle = this.colorOut;
  ctx.fill();

  //画边
  ctx.strokeStyle =this.colorBorder;
  ctx.stroke();

  //画内圆
  ctx.beginPath();
  ctx.arc(this.posX + this.radiusInner,this.posY+ this.radiusInner, this.radiusInner, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.fillStyle = this.colorInner;
  ctx.fill();
}

Guard.prototype.shoot = function(){

}

Guard.prototype.detectAgent= function(){
  let distance = euclidean((agent.posX - this.posX), (agent.posY - this.posY));
  let sumRadius = agent.radius + this.radiusOut;
  if(distance < sumRadius) {
    console.log("检测到Agent");
  }
}