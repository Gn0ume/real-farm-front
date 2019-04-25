import React from 'react';
import Icon from "material-icons-react";
import './Slider.css';

class Slider extends React.Component {
    constructor(props) {
        super(props);
        this.len = this.props.photos.length;
        this.state = {
            activeBullet: 1,
            offsetToTheLeft: {
                left: 0
            }
        };
        this.onLeftArrowClick = this.onLeftArrowClick.bind(this);
        this.onRightArrowClick = this.onRightArrowClick.bind(this);
    }

    createSlides() {
        let slideItems = [];
        for (let i = 0; i < this.len; i++) {
            slideItems[i] =
                <img className={"slider slider" + (i + 1)}
                     key={i}
                     src={this.props.photos[i].url}
                     alt="farmFoto"/>;
        }
        return slideItems;
    }

    onBulletClick(event) {
        let id = event.target.id;
        let offset = (id - 1) * (-100);
        this.setState({
            ...this.state,
            activeBullet: id,
            offsetToTheLeft: {
                left: offset
            }
        });
    }

    isActiveBullet(i) {
        return (Number(this.state.activeBullet) === Number(i) ? "fill" : "")
    }

    isLeftArrowVisible() {
        return (Number(this.state.activeBullet) === 1 ? "hidden" : "")
    }

    isRightArrowVisible() {
        return (Number(this.state.activeBullet) === Number(this.len) ? "hidden" : "")
    }

    createBullets() {
        let bulletItems = [];
        for (let i = 0; i < this.len; i++) {
            bulletItems[i] = <div className={this.isActiveBullet(i + 1)} key={i} id={(i + 1)}
                                  onClick={(event) => this.onBulletClick(event)}/>;
        }
        return bulletItems;
    }

    createStyleOffset() {
        const offset = this.state.offsetToTheLeft.left;
        return ({left: + offset + '%'})
    }

    onLeftArrowClick() {
        this.setState({
            ...this.state,
            activeBullet: Number(this.state.activeBullet) - 1,
            offsetToTheLeft: {
                left: this.state.offsetToTheLeft.left + 100
            }
        });
    }

    onRightArrowClick() {
        this.setState({
            ...this.state,
            activeBullet: Number(this.state.activeBullet) + 1,
            offsetToTheLeft: {
                left: this.state.offsetToTheLeft.left - 100
            }
        });
    }

    render() {
        return (
            <div className="slider-box">
                <div id="slider" style={this.createStyleOffset()}>
                    <div className="slides">
                        {this.createSlides()}
                    </div>
                </div>
                <div
                    className={`right-arrow-box ${this.isRightArrowVisible()}`}
                     onClick={this.onRightArrowClick}>
                    <Icon className="material-icons md-24" id="right-arrow" color="#fff" icon="arrow_forward_ios"/>
                </div>
                <div
                    className={`left-arrow-box ${this.isLeftArrowVisible()}`}
                    onClick={this.onLeftArrowClick}>
                    <Icon className="material-icons md-24" id="left-arrow" color="#fff" icon="arrow_back_ios"/>
                </div>
                <div className="photo-nav"></div>
                <div className="photo-nav-circle-box">
                    {this.createBullets()}
                </div>
            </div>
        )
    }
}

export default Slider