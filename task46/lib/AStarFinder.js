function AStarFinder(opt){
    opt = opt || {};
    this.allowDiagonal = opt.allowDiagonal;
    this.diagonalMovemnt = opt.diagonalMovemnt;
    this.weight = opt.weight || 1;
    this.heuristic = opt.heuristic || manhattan;
}

AStarFinder.prototype.findPath = function(startX, startY, endX, endY,grid){
    var openList = new Heap(function(nodeA,nodeB){
        return  nodeA.f - nodeB.f;
    }),
        startNode = grid.getNodeAt(startX,startY),
        endNode = grid.getNodeAt(endX,endY),
        diagonalMovement = this.diagonalMovemnt,
        heuristic = this.heuristic,
        weight = this.weight,
        abs = Math.abs,SQRT2 = Math.SQRT2,
        node,neighbors,neighbor,i,l,x,y,ng;

    startNode.g = 0 ;
    startNode.f = 0 ;

    openList.push(startNode);
    startNode.opened = true;

    while(!openList.empty()){
        node = openList.pop();
        node.closed = true;

        if(node === endNode) {
            return backtrace(endNode);
        }

        neighbors = grid.getNeighbors(node,diagonalMovement);

        for(i = 0,l=neighbors.length;i< l;++i){
            neighbor = neighbors[i];
            if(neighbor.closed){
                continue;
            }

            x = neighbor.x;
            y = neighbor.y;

            ng = node.g + ((x - node.x === 0  || y - node.y === 0 ) ?1: SQRT2);

            if(!neighbor.opened || ng < neighbor.g){
                neighbor.g = ng;
                neighbor.h = neighbor.h || weight * heuristic(abs(x - endX), abs(y - endY));
                neighbor.f = neighbor.g + neighbor.h;
                neighbor.parent = node;

                if(!neighbor.opened){
                    openList.push(neighbor);
                    neighbor.opened = true;
                }else {
                    openList.updateItem(neighbor);
                }
            }
        }
    }

    return [];
}

