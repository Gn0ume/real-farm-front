class Point {
    constructor(x,y) {
        this.x = x;
        this.y = y
    }
}
class CoordsConverter {
    constructor(width,height) {
        this.width = width;
        this.height = height
    }
    //перевод в px
    getAbsCoords(point) {
        const absPoint = new Point();
        absPoint.x = this.width * point.x;
        absPoint.y = this.height * point.y;
        return absPoint;
    }
    //перевод вo float
    getRelCoords(point) {
        const relPoint = new Point();
        relPoint.x = (point.x / this.width).toFixed(3);
        relPoint.y = (point.y / this.height).toFixed(3);
        return relPoint;
    }
}

export {Point, CoordsConverter}