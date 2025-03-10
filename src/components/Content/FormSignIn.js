import React from 'react';
import './FormSignIn.css';
import user from "../../img/svg/user.svg";
import {connect} from 'react-redux';
import {loginUserMutation} from "../queries/queries";
import {compose, withApollo} from "react-apollo";
import {withRouter} from "react-router-dom";

class FormSignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: null,
            pass: null
        };
        this.handleChange = this.handleChange.bind(this);
    };

    handleChange(event) {
        const {name, value} = event.target;
        this.setState({...this.state, [name]: value});
        return this.state;
    }

    onButtonFormClick(event) {
        event.preventDefault();
        const dispatch = this.props.dispatch;
        const actionCloseModal = {type: 'actionCloseModal'};
        const passedUserSignIn = {type: 'passedUserSignIn'};

        this.props.client.query ({
            query: loginUserMutation,
            variables: {
                email: this.state.email,
                password: this.state.pass
            }
        })
            .then(loginType => {
                let loginParam = loginType.data.login;
                if (loginParam.loginSuccess) {
                    dispatch(actionCloseModal);
                    localStorage.setItem('token', loginParam.token);
                    localStorage.setItem('user_type', loginParam.user.type);
                    if (loginParam.user.type === "FARMER")
                        this.props.history.push('/farmer');
                    window.location.reload();
                    dispatch(passedUserSignIn);
                } else {
                    const message = document.getElementById('wrong-sign-in');
                    message.classList.remove('hidden');
                    document.getElementById('password').value = '';
                }
            });
    };

    render() {
        return (
            <div className="sign-in-box">
                <div className="sign_in_form">
                    <img src={user} className="user_icon" alt="user"/>
                    <form id="sign-in-form" className="reg_step_one" action="#" onSubmit={(event) => this.onButtonFormClick(event)}>
                        <span className="reg_name_field">e-mail</span>
                        <input name="email"
                            onChange={this.handleChange}
                               className="reg_field email" type="email" placeholder="example@real.farm"/>
                        <span className="reg_name_field">password</span>
                        <input id="password" name="pass"
                            onChange={this.handleChange}
                               className="reg_field password" type="password" placeholder="........"/>
                               <div className="wrong-sign-in-box">
                                   <span id="wrong-sign-in" className="hidden">
                                       Invalid login or password
                                   </span>
                               </div>
                        <button className="sign_in_button" type="submit">sign in</button>
                    </form>
                </div>
            </div>
        );
    }
}

const putStateToProps = (state) => {
    return {
        isOpenModal: state.isOpenModal,
        passedUserSignIn: state.passedUserSignIn,
        authUser: state.authUser
    }
};

export default withRouter(withApollo(compose(connect(putStateToProps))(FormSignIn)));
