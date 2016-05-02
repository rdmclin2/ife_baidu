function manhattan(dx,dy){
    return dx + dy;
}

function euclidean(dx,dy){
    return Math.sqrt(dx * dx + dy * dy);
}

function octile(dx,dy){
    var F = Math.SQRT2 -1;
    return (dx < dy)?F*dx+dy: F*dy+dx;
}

function chebyshev(dx,dy){
    return Math.max(dx,dy);
}