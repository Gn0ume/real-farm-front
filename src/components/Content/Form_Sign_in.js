import React from 'react';
import './Form_Sign_in.css';
import user from "../../svg/user.svg";
import {connect} from 'react-redux';

class Form_Sign_in extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: null,
            pass: null
        }
    };

    onSubmitButton() {
        const dispatch = this.props.dispatch;
        const actionCloseModal = {type: 'actionCloseModal'};
        const passedUserSignIn = {type: 'passedUserSignIn'};

        dispatch(actionCloseModal);
        dispatch(passedUserSignIn);
        console.log(this.state);
    }

    render() {
        return (
            <div className="sign-in-box">
                <div className="sign_in_form">
                    <img src={user} className="user_icon" alt="user"/>
                    <form className="reg_step_one" action="#" onSubmit={(event => {
                        event.preventDefault();
                    })}>
                        <span className="reg_name_field">e-mail</span>
                        <input onChange={(event) => {
                            this.setState({...this.state, email: event.target.value})
                        }}
                               className="reg_field email" type="email" placeholder="example@real.farm"/>
                        <span className="reg_name_field">password</span>
                        <input onChange={(event) => {
                            this.setState({...this.state, pass: event.target.value})
                        }}
                               className="reg_field password" type="password" placeholder="........"/>
                        <button onClick={() => {
                            this.onSubmitButton()
                        }}
                                className="sign_in_button" type="submit">sign in
                        </button>
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

export default connect(putStateToProps)(Form_Sign_in);
