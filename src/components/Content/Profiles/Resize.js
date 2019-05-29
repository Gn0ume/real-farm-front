import React from 'react';
import './Resize.css';
import {CoordsConverter, Point} from "./convertCoords";

class Resize extends React.Component {
    constructor(props) {
        super(props);
        this.isReady = this.props.canvasSize && this.props.points;

        const {width, height} = this.props.canvasSize; //высота и ширина (300) аватара
        //const cropPoints = this.props.points;
        //const sizeCrop = width * (cropPoints[2] - cropPoints[0]); //сторона квадрата в котором нах-ся кропэлемент
        this.avatarConvert = new CoordsConverter(width, height);
       // const topLeftPointAbs = new Point(cropPoints[0], cropPoints[1]);
        //const topLeftPoint = this.avatarConvert.getAbsCoords(topLeftPointAbs);
        this.currentState = {
            width: 0,
            height: 0,
            top: 0,
            left: 0
        };

        this.state = {
            width: 0,
            height: 0,
            top: 0,
            left: 0
        };

        this.minCropSize = {
            width: 100,
            height: 100
        };
        this.multipliers = [[1,1], [-1,1], [-1,-1], [1,-1]];
        this.deltaX = 0;
        this.deltaY = 0;
        this.canvasSize = {
            width: 0,
            height: 0
        }
    }

    componentWillMount() {
        this.getParameters();
    }

    componentWillUpdate(nextProps, nextState, nextContext) {
       this.getParameters();
    }

    getParameters() {
        const {width, height} = this.props.canvasSize; //высота и ширина (300) аватара
        const cropPoints = this.props.points;
        const sizeCrop = width * (cropPoints[2] - cropPoints[0]); //сторона квадрата в котором нах-ся кропэлемент
        const avatarConvert = new CoordsConverter(width, height);
        const topLeftPointAbs = new Point(cropPoints[0], cropPoints[1]);
        const topLeftPoint = avatarConvert.getAbsCoords(topLeftPointAbs);
        this.currentState.width = sizeCrop;
        this.currentState.height = sizeCrop;
        this.currentState.top = topLeftPoint.y;
        this.currentState.left = topLeftPoint.x;
        this.canvasSize.width = width;
        this.canvasSize.height = height;
        console.log("Новый", this.currentState)
    }

    getPoints() {
        const {left, top, height, width} = this.currentState;
        const topLeftPoint = new Point(left, top);
        const topLeftPointForServer = this.avatarConvert.getRelCoords(topLeftPoint);
        const bottomRightPoint = new Point(parseFloat(left) + parseFloat(width), parseFloat(top) + parseFloat(height));
        const bottomRightPointForServer = this.avatarConvert.getRelCoords(bottomRightPoint);
        return [parseFloat(topLeftPointForServer.x),
            parseFloat(topLeftPointForServer.y),
            parseFloat(bottomRightPointForServer.x),
            parseFloat(bottomRightPointForServer.y)]

    }

    drawCropper() {
        this.cropElement.style.width = this.currentState.width + 'px';
        this.cropElement.style.height = this.currentState.height + 'px';
        this.cropElement.style.top = this.currentState.top + 'px';
        this.cropElement.style.left = this.currentState.left + 'px';
        this.props.onChange(this.getPoints())
    }


    moveCropCircle(evt) {
        this.cropContainer = document.getElementById('crop-element-container');
        this.cropElement = document.getElementById('cropElement');
        const {x, y} = this.cropContainer.getBoundingClientRect();
        console.log(this.cropContainer.getBoundingClientRect());
        const allowedRectangle = () => {
            return {
                x: (this.canvasSize.width - this.currentState.width).toFixed(0),
                y: (this.canvasSize.height - this.currentState.height).toFixed(0)
            }
        };
        const {pageX: mouseDownX, pageY: mouseDownY} = evt;
        this.deltaX = mouseDownX - (Number(this.currentState.left) + x);
        this.deltaY = mouseDownY - (Number(this.currentState.top) + y);

        const {x: maxBorderX, y: maxBorderY} = allowedRectangle();

        const moveHandler = (e) => {
            const {pageX: mouseX, pageY: mouseY} = e;
            const moveX = mouseX - x - this.deltaX;
            const moveY = mouseY - y - this.deltaY;
            let left, top;

            if (moveX < 0) {
                left = 0;
            } else if (moveX > maxBorderX) {
                left = maxBorderX;
            } else {
                left = moveX
            }

            if (moveY < 0) {
                top = 0;
            } else if (moveY > maxBorderY) {
                top = maxBorderY;
            } else {
                top = moveY
            }
            this.currentState.top = top;
            this.currentState.left = left;
            this.drawCropper();
        };
        document.addEventListener('mousemove', moveHandler);

        const upHandler = (e) => {
            e.preventDefault();
            document.removeEventListener('mousemove', moveHandler);
            document.removeEventListener('mouseup', upHandler);
        };
        document.addEventListener('mouseup', upHandler);
    }

    changeSize(evt) {
        const point = evt.target.getAttribute('data-pointnumber');
        this.cropContainer = document.getElementById('crop-element-container');
        this.cropElement = document.getElementById('cropElement');
        const {x, y} = this.cropContainer.getBoundingClientRect();
        const {width, height, top, left} = this.currentState;

        const centerX = left + parseFloat(width) / 2;
        const centerY = top + parseFloat(height) / 2;

        const minXOffset = Math.min(this.canvasSize.width - centerX, centerX);
        const minYOffset = Math.min(this.canvasSize.height - centerY, centerY);
        const maxDelta = Math.min(minXOffset, minYOffset);
        const minX = centerX - maxDelta;
        const minY = centerY - maxDelta;

        const moveHandler = (e) => {
            const mouseX = e.pageX - x;
            const mouseY = e.pageY - y;

            let deltaX, deltaY;

            if ((centerX - mouseX) * this.multipliers[point][0] > 0) {
                deltaX = centerX - mouseX;
            } else {
                deltaX = 0;
            }

            if ((centerY - mouseY) * this.multipliers[point][1] > 0) {
                deltaY = centerY - mouseY;
            } else {
                deltaY = 0;
            }

            const delta = Math.max(
                Math.abs(deltaX),
                Math.abs(deltaY)
            );
            const cornerX = Math.max(minX, centerX - delta);
            const cornerY = Math.max(minY, centerY - delta);

            if ((centerX - cornerX) * 2 >= this.minCropSize.width) {
                this.currentState.width = (centerX - cornerX) * 2;
                this.currentState.left = cornerX;
                this.currentState.top = cornerY
            } else {
                this.currentState.width = this.minCropSize.width;
            }

            if ((centerY - cornerY) * 2 >= this.minCropSize.height) {
                this.currentState.height = (centerX - cornerX) * 2;
                } else {
                this.currentState.height = this.minCropSize.height;
            }

            this.drawCropper();
        };
        document.addEventListener('mousemove', moveHandler);

        const upHandler = (e) => {
            e.preventDefault();
            document.removeEventListener('mousemove', moveHandler);
            document.removeEventListener('mouseup', upHandler);
        };

        document.addEventListener('mouseup', upHandler);
    }

    render() {
        return (
            <div id="crop-element-container"
                 className="noselect">

                {this.isReady &&
                <div id="cropElement"
                     className="square-crop"
                     style={{...this.currentState}}>
                    <div
                        id="top-left-crop-point"
                        data-pointnumber="0"
                        className="rectangles-crop top-left"
                        onMouseDown={(evt) => this.changeSize(evt)}/>
                    <div data-pointnumber="1"
                        className="rectangles-crop top-right"
                         onMouseDown={(evt) => this.changeSize(evt)}/>
                    <div data-pointnumber="2"
                        className="rectangles-crop bottom-right"
                         onMouseDown={(evt) => this.changeSize(evt)}/>
                    <div data-pointnumber="3"
                        className="rectangles-crop bottom-left"
                         onMouseDown={(evt) => this.changeSize(evt)}/>
                    <div id="circleCrop" className="circle-crop"
                         onMouseDown={(evt) => this.moveCropCircle(evt)}/>
                </div>
                }
            </div>
        )
    }
}

export default Resize