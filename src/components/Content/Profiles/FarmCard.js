import React from "react";
import {connect} from 'react-redux';
import './FarmCard.css';
import Icon from "material-icons-react";
import Slider from './Slider';
import {NavLink} from "react-router-dom";


class FarmCard extends React.Component {
    render() {
        return (
            <div className="farms-box-item">
                <Slider photos={this.props.photos}/>
                <div className="farms-box-item-info">
                    <div className="farm-settings-box">
                        <NavLink to={`/${this.props.globalLanguage}/edit_farm/${this.props.farmid}`}>
                            <Icon className="material-icons md-24 md-dark more"
                                  color="#8f90a0"
                                  icon="edit"/>
                        </NavLink>
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

const putStateToProps = (state) => {
    return {
        globalLanguage: state.globalLanguage
    }
};

export default connect(putStateToProps)(FarmCard);
