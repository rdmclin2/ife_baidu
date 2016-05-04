

function findPath(startX, startY, endX, endY) {
  let grid = new Grid(block_width, block_height);

  for (let i = 0; i < block_height; i++) {
    for (let j = 0; j < block_width; j++) {
      if (boards[i][j] instanceof Wall || boards[i][j] instanceof Obstacle) {
        grid.setWalkableAt(boards[i][j].x, boards[i][j].y, false);
      }
    }
  }
  return finder.findPath(startX, startY, endX, endY, grid);
}

canvas.addEventListener("click", function (event) {
  if(pathes.length !== 0 ){
    console.log("正在寻路中");
    return ;
  }
  let e = event;
  let startX = agent.x;
  let startY = agent.y;

  let endX = Math.floor((e.clientX - canvas.offsetLeft) / block_length);
  let endY = Math.floor((e.clientY - canvas.offsetTop) / block_length);

  for(let guard of guards){
    if(guard.x === endX && guard.y === endY){
      agent.shoot(guard);
      return ;
    }
  }

  pathes = findPath(startX, startY, endX, endY);
  console.log(JSON.stringify(pathes));

});

function draw() {


  for (let i = 0; i < block_height; i++) {
    for (let j = 0; j < block_width; j++) {
      boards[i][j].draw();
    }
  }


  for(let guard of guards){
    guard.draw();
    guard.lineToAgent();
  }

  for(let bullet of bullets){
    bullet.draw();
  }

  agent.draw();
  file.draw();
}

function update(modifier){
  //寻路
  if(pathes.length !== 0) {
    let dest = pathes[0];
    //console.log("before : " + agent.x + " " + agent.y);

    if(Math.floor((agent.posX-agent.radius) / block_length) === dest[0] &&
      Math.floor((agent.posY-agent.radius) / block_length) === dest[1]) {
      agent.x = dest[0];
      agent.y = dest[1];
      //强制一致
      agent.posX = agent.x * block_length + agent.radius;
      agent.posY = agent.y * block_length + agent.radius;

      if(dest[0] === file.x && dest[1] === file.y) {
        init_canvas();
      }
      pathes.shift();
    }else {
      var dirX = dest[0] - agent.x;
      var dirY = dest[1] - agent.y;
      agent.posX += dirX * modifier * agent.speed;
      agent.posY += dirY * modifier * agent.speed;
    }
    //console.log("after: "  + agent.x + " " + agent.y);
  }

  //守卫检测特工,发射子弹
  for(let guard of guards){
    if(guard.detectAgent() ){
      guard.shoot();
    }
  }
  //让子弹飞
  for(let bullet of bullets){
    bullet.posX = bullet.posX + modifier* bullet.speed * bullet.dirX;
    bullet.posY = bullet.posY + modifier* bullet.speed * bullet.dirY;

    //判断有没有撞墙


    if(bullet.shooter instanceof Guard){
      //判断有没有子弹打中特工
      let distance = euclidean((agent.posX - bullet.posX), (agent.posY - bullet.posY));
      let sumRadius = agent.radius - bullet.radius;
      if(distance < sumRadius) {//打中
        alert("you are dead");
        init_canvas()
      }
    }else if(bullet.shooter instanceof Agent){
      //判断有没有子弹打中守卫
      for(let guard of guards){
        let distance = euclidean((guard.posX - bullet.posX), (guard.posY - bullet.posY));
        let sumRadius = guard.radiusInner - bullet.radius;
        if(distance < sumRadius) {//打中
          //消灭守卫
          //删除子弹
          guards.splice(guards.indexOf(guard),1);
          bullets.splice(bullets.indexOf(bullet),1);
          break;
        }
      }
    }




  }


}

function main() {
  let now = Date.now();
  let delta = now - then;

  update(delta / 1000);
  draw();

  then = now;
  requestAnimationFrame(main);
}

// 少年，开始游戏吧！
let then = Date.now();
init_canvas();
main();
