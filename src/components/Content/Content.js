import React from 'react';
import {connect} from 'react-redux';
import './Content.css';
import Icon from "material-icons-react";

class Content extends React.Component {

    isVisible() {
        return (this.props.passedRegister ? ' ' : 'hidden');
    }

    render() {
        const dispatch = this.props.dispatch;
        const actionOpenSignInAfterReg = {type: 'actionOpenSignInAfterReg'};
        return (
            <div className={this.isVisible()}>
                <div className="register_final">
                    <div className="reg_final_box">
                        <div className="circle_done">
                            <Icon className="material-icons md-24 md-dark" color="white" icon="done"/>
                        </div>
                        <span className="reg_final_phrase">You're All Set!</span>
                    </div>
                    <p className="reg_final_text">
                        Your Registration Was Succesfully Fulfilled!<br/>
                        Please <a href="#" onClick={() => {
                        dispatch(actionOpenSignInAfterReg)
                    }}>Sign in</a> for begining.
                    </p>
                </div>
            </div>
        );
    }
}

const putStateToProps = (state) => {
    return {
        passedRegister: state.passedRegister
    }
};

export default connect(putStateToProps)(Content);
