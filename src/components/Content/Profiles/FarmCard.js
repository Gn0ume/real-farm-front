import React from "react";
import './FarmCard.css';
import Icon from "material-icons-react";
import Slider from './Slider';
import {Link} from "react-router-dom";


class FarmCard extends React.Component {
    render() {
        return (
            <div className="farms-box-item">
                <Slider photos={this.props.photos}/>
                <div className="farms-box-item-info">
                    <div className="farm-settings-box">
                        <Link to={`/edit_farm/${this.props.farmid}`}>
                            <Icon className="material-icons md-24 md-dark more"
                                  color="#8f90a0"
                                  icon="edit"/>
                        </Link>
                    </div>
                    <span className="farm-name">{this.props.farmname}</span>
                    <span className="farm-address">
                        <Icon className="material-icons md-24 md-dark"
                              color="#8f90a0"
                              icon="location_on"/>
                        {this.props.address}
                    </span>
                </div>
            </div>
        )
    }
}

export default FarmCard