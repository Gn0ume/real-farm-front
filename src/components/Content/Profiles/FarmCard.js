import React from "react";
import './FarmCard.css';
import Icon from "material-icons-react";
import Slider from './Slider';

class FarmCard extends React.Component {
    render() {
        return (
            <div className="farms-box-item">
                <Slider photos={this.props.photos}/>
                <div className="farms-box-item-info">
                    <div className="farm-settings-box">
                        <Icon className="material-icons md-36 md-dark more" color="#8f90a0" icon="more_horiz"/>
                    </div>
                    <span className="farm-name">{this.props.farmname}</span>
                    <span className="farm-address">
                        <Icon className="material-icons md-24 md-dark" color="#8f90a0" icon="location_on"/>
                        {this.props.address}
                    </span>
                </div>
            </div>
        )
    }
}

export default FarmCard