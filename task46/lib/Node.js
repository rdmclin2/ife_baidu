/**
 * A node in grid.
 * @param x The x coordinate of the node on the grid.
 * @param y The y coordinate of the node on the grid.
 * @param walkable Wheather this node is walkable.
 * @constructor
 */
function Node(x,y,walkable){
    /**
     * The x coordinate of the node on the grid.
     * @type number
     */
    this.x = x;

    this.y = y;

    this.walkable = (walkable === undefined ? true: walkable);
}
