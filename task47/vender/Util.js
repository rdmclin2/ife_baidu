function backtrace(node){
    var path = [[node.x,node.y]];
    while(node.parent) {
        node = node.parent;
        path.push([node.x,node.y]);
    }
    return path.reverse();
}

