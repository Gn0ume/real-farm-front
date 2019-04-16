import React from 'react';
import Menu from './Menu';
import './AuthPanel.css';
import {connect} from 'react-redux';
import default_avatar from '../../img/imageAvatar.jpg';
import Icon from "material-icons-react";

class AuthPanel extends React.Component {
    chooseAvatar () {
        return (this.props.authUser.avatarUrl == null ? default_avatar : this.props.authUser.avatarUrl);
    };

    render() {
        return (
            <div className="auth-panel">
                <div className="top-menu">
                    <Menu font_size_class={"menu_items menu-items-font-14"} items={["Home", "About Us", "News", "Documentation"]}/>
                    <span className="acc_type">{this.props.authUser.type}</span>
                    <div className="element_after"></div>
                    <div className="user-box">
                    <Icon className="material-icons md-24 md-dark" color="grey" icon="expand_more"/>
                    <span className="username">{this.props.authUser.username}</span>
                    <Icon className="material-icons md-24 md-dark" color="grey" icon="chat"/>
                    <img src={this.chooseAvatar()} alt="avatar" className="avatar"/>
                    </div>
                </div>
                <div className="bottom-menu">
                    <Menu font_size_class={"menu_items menu-items-font-18"}  items={["Orders", "Payments", "My Farm", "Help"]}/>
                    <div className="element_after"></div>
                    <div className="rating-box">
                        <span className="rating">Rating: </span>
                        <span className="rating-number">3.5</span>
                        <Icon className="material-icons md-24 md-dark" color="#FFB347" icon="star"/>
                        <Icon className="material-icons md-24 md-dark" color="#FFB347" icon="star"/>
                        <Icon className="material-icons md-24 md-dark" color="#FFB347" icon="star"/>
                        <Icon className="material-icons md-24 md-dark" color="#FFB347" icon="star_half"/>
                        <Icon className="material-icons md-24 md-dark" color="#FFB347" icon="star_border"/>
                    </div>
                </div>
            </div>

        )
    }
}

const putStateToProps = (state) => {
    return {
        authUser: state.authUser
    }
};

export default connect(putStateToProps)(AuthPanel);
