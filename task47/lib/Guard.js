/**
 * 守卫对象定义
 * @param x
 * @param y
 */
let Guard= function (i, j) {
  this.x = i ;
  this.y = j ;
  this.radiusInner = (block_length - 4) / 2;
  this.radiusOut = block_length * 2;
  this.colorInner = '#f3634f';
  this.colorOut= "rgba(231, 192, 174, 0.5)";
  this.colorBorder = '#ba8479';
};

Guard.prototype.draw = function () {
  var posX = this.x * block_length + block_length / 2;
  var posY = this.y* block_length + block_length / 2;

  //画外圆
  ctx.beginPath();
  ctx.arc(posX,posY, this.radiusOut, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.fillStyle = this.colorOut;
  ctx.fill();

  //画边
  ctx.strokeStyle =this.colorBorder;
  ctx.stroke();

  //画内圆
  ctx.beginPath();
  ctx.arc(posX,posY, this.radiusInner, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.fillStyle = this.colorInner;
  ctx.fill();
}

Guard.prototype.shoot = function(){

}

Guard.prototype.detectAgent= function(){
  let distance = euclidean((agent.x - this.x), (agent.y - this.y));
  let sumRadius = agent.radius + this.radiusOut;
  if(distance < sumRadius) {
    alert("检测到Agent");
  }
}