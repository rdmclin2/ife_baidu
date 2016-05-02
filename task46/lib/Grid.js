function Grid(width_or_matrix, height, matrix) {
    var width;

    if (typeof width_or_matrix !== 'object') {
        width = width_or_matrix;
    } else {
        height = width_or_matrix.length;
        width = width_or_matrix[0].length;
        matrix = width_or_matrix;
    }

    /**
     *
     * @type number
     */
    this.width = width;

    /**
     *
     * @type number
     */
    this.height = height;

    this.nodes = this._buildNodes(width,height,matrix);
}

Grid.prototype._buildNodes = function (width, height, matrix) {
    var i, j, nodes = new Array(height);

    for (i = 0; i < height; ++i) {
        nodes[i] = new Array(width);
        for(j = 0; j < width; ++j){
            nodes[i][j] = new Node(j,i);
        }
    }

    if(matrix === undefined){
        return nodes;
    }

    if(matrix.length !== height || matrix[0].length !== width){
       throw new Error('Matrix size does not fit');
    }

    for(i = 0 ; i < height; ++i){
        for(j = 0 ; j< width; ++j){
            if(matrix[i][j]){
                nodes[i][j].walkable = false;
            }
        }
    }

    return nodes;
}

Grid.prototype.setWalkableAt = function(x,y,walkable){
    this.nodes[y][x].walkable = walkable;
}

Grid.prototype.isWalkableAt = function(x,y){
    return this.isInside(x,y) && this.nodes[y][x].walkable;
}

Grid.prototype.isInside = function(x,y){
    return (x >= 0 && x < this.width) && (y >= 0 && y < this.height);
};

Grid.prototype.getNodeAt = function(x,y){
    return this.nodes[y][x];
}

Grid.prototype.getNeighbors = function(node,diagonalMovement){
    var x = node.x,
        y = node.y,
        neighbors = [],
        s0 = false, d0 = false,
        s1 = false, d1 = false,
        s2 = false, d2 = false,
        s3 = false, d3 = false,
        nodes = this.nodes;

    //↑
    if(this.isWalkableAt(x,y-1)){
        neighbors.push(nodes[y-1][x]);
        s0 = true;
    }
    //→
    if(this.isWalkableAt(x+1,y)){
        neighbors.push(nodes[y][x+1]);
        s1 = true;
    }

    // ↓
    if (this.isWalkableAt(x, y + 1)) {
        neighbors.push(nodes[y + 1][x]);
        s2 = true;
    }
    // ←
    if (this.isWalkableAt(x - 1, y)) {
        neighbors.push(nodes[y][x - 1]);
        s3 = true;
    }

    if(diagonalMovement === DiagonalMovement.Never){
        return neighbors;
    }

    if (diagonalMovement === DiagonalMovement.OnlyWhenNoObstacles) {
        d0 = s3 && s0;
        d1 = s0 && s1;
        d2 = s1 && s2;
        d3 = s2 && s3;
    } else if (diagonalMovement === DiagonalMovement.IfAtMostOneObstacle) {
        d0 = s3 || s0;
        d1 = s0 || s1;
        d2 = s1 || s2;
        d3 = s2 || s3;
    } else if (diagonalMovement === DiagonalMovement.Always) {
        d0 = true;
        d1 = true;
        d2 = true;
        d3 = true;
    }

    // ↖
    if (d0 && this.isWalkableAt(x - 1, y - 1)) {
        neighbors.push(nodes[y - 1][x - 1]);
    }
    // ↗
    if (d1 && this.isWalkableAt(x + 1, y - 1)) {
        neighbors.push(nodes[y - 1][x + 1]);
    }
    // ↘
    if (d2 && this.isWalkableAt(x + 1, y + 1)) {
        neighbors.push(nodes[y + 1][x + 1]);
    }
    // ↙
    if (d3 && this.isWalkableAt(x - 1, y + 1)) {
        neighbors.push(nodes[y + 1][x - 1]);
    }

    return neighbors;
}

