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
        console.log("Работает getRelCoords");
        console.log("Точка = ", point);
        console.log("Размеры = ", this.width, this.height);

        const relPoint = new Point();
        relPoint.x = (point.x / this.width).toFixed(3);
        if (relPoint.x > 1 || relPoint.x < 0) {
            console.log("Координата больше 1 или меньше 0");
        }
        relPoint.y = (point.y / this.height).toFixed(3);
        console.log("Точка для стейта = ", relPoint);
        return relPoint;
    }
}

export {Point, CoordsConverter}