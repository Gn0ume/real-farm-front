import React from 'react';
import './Form_Sign_in.css';
import user from "../../svg/user.svg";
import Icon from 'material-icons-react';

class Form_Sign_in extends React.Component {
    render() {
        return (
            <div className="sign-in-box">
                <div className="sign_in_form">
                    <Icon className="material-icons md-24 md-dark close" icon="clear"/>
                    <img src={user} className="user_icon" alt="user"/>
                    <form className="reg_step_one" action="#">
                        <span className="reg_name_field">e-mail</span>
                        <input className="reg_field email" type="email" placeholder="example@real.farm"/>
                        <span className="reg_name_field">password</span>
                        <input className="reg_field password" type="password" placeholder="........"/>
                        <button className="sign_in_button" type="submit">sign in</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default Form_Sign_in;
