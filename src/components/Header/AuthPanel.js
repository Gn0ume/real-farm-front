import React from 'react';
import Menu from './Menu';
import './AuthPanel.css';
import {connect} from 'react-redux';
import default_avatar from '../../img/imageAvatar.jpg';
import Icon from "material-icons-react";
import {menuHeader} from '../../constants';
import {Link} from "react-router-dom";

class AuthPanel extends React.Component {
    chooseAvatar () {
        return (this.props.authUser.avatarUrl == null ? default_avatar : this.props.authUser.avatarUrl);
    };

    choosePage() {
        return (this.props.authUser.type === "FARMER" ? "/farmer" : "/catalog")
    }

    chooseName() {
        const { fullName, username } = this.props.authUser;
        return (fullName === " " ? username : fullName)
    }

    render() {
        let menuAuth = [
            {
                text: "Orders",
                link: "#"
            },
            {
                text: "Payments",
                link: "#"
            },
            {
                text: "My Farm",
                link: "#"
            },
            {
                text: "Help",
                link: "#"
            }
        ];
        return (
            <div className="auth-panel">
                <div className="top-menu">
                    {console.log(this.props.authUser)}
                    <Menu font_size_class={"menu_items menu-items-font-14"} items={menuHeader}/>
                    <span className="acc_type">{this.props.authUser.type}</span>
                    <div className="element_after"/>
                    <div className="user-box">
                    <Icon className="material-icons md-24 md-dark" color="grey" icon="expand_more"/>
                    <Link to={this.choosePage()} className="username"><span>{this.chooseName()}</span></Link>
                    <Icon className="material-icons md-24 md-dark" color="grey" icon="chat"/>
                        <Link to="/profile"><img src={this.chooseAvatar()} alt="avatar" className="avatar"/></Link>
                    </div>
                </div>
                <div className="bottom-menu">
                    <Menu font_size_class={"menu_items menu-items-font-18"}  items={menuAuth}/>
                    <div className="element_after"/>
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
