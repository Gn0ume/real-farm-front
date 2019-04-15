import React from 'react';
import './FormSignIn.css';
import user from "../../svg/user.svg";
import {connect} from 'react-redux';
import {loginUserMutation} from "../queries/queries";
import {compose, withApollo} from "react-apollo";

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

        dispatch(actionCloseModal);
        dispatch(passedUserSignIn);
        console.log(this.state);

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
                    localStorage.setItem('token', loginParam.token);
                    alert('Вы успешно авторизовались!')
                } else {
                    alert('Неверный логин или пароль');
                }
            });
    };

    render() {
        return (
            <div className="sign-in-box">
                <div className="sign_in_form">
                    <img src={user} className="user_icon" alt="user"/>
                    <form className="reg_step_one" action="#" onSubmit={(event) => this.onButtonFormClick(event)}>
                        <span className="reg_name_field">e-mail</span>
                        <input name="email"
                            onChange={this.handleChange}
                               className="reg_field email" type="email" placeholder="example@real.farm"/>
                        <span className="reg_name_field">password</span>
                        <input name="pass"
                            onChange={this.handleChange}
                               className="reg_field password" type="password" placeholder="........"/>
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
        passedUserSignIn: state.passedUserSignIn
    }
};

export default withApollo(compose(connect(putStateToProps))(FormSignIn));