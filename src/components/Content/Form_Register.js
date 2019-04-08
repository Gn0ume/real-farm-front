import React from 'react';
import {connect} from 'react-redux';
import './Form_Register.css';
import captcha from '../../img/captcha.png';
import Icon from 'material-icons-react';

class Form_Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stepClass: 'slider step1',
            currentStep: 1,
            registerForm: {
                email: null,
                pass: null,
                repeat_pass: null,
                user_name: null,
                account_type: 'farmer'
            }
        }
    };

    onButtonClick() {
        if (this.state.currentStep === 2)
            return this.setState({stepClass: 'slider step3', currentStep: 3});
        else if (this.state.currentStep === 1)
            return this.setState({stepClass: 'slider step2', currentStep: 2});
    }

    onBackButtonClick() {
        if (this.state.currentStep === 3)
            return this.setState({stepClass: 'slider step2', currentStep: 2});
        else if (this.state.currentStep === 2)
            return this.setState({stepClass: 'slider step1', currentStep: 1});
    }

    onButtonFormClick(event) {
        event.preventDefault();
    };

    onSubmitButton() {
        const dispatch = this.props.dispatch;
        const actionCloseModal = {type: 'actionCloseModal'};
        const passedUserRegister = {type: 'passedUserRegister'};

        dispatch(actionCloseModal);
        dispatch(passedUserRegister);
        console.log(this.state.registerForm);
    }

    getCircleStyle(elStep) {
        if (elStep > this.state.currentStep)
            return 'step_box disactive';
        else if (elStep < this.state.currentStep)
            return 'step_box done';
        else
            return 'step_box active';
    }

    render() {
        return (
            <div className="sign-in-box">
                <div className="sign_in_form">
                    <div className="steps_box">
                        <div className={this.getCircleStyle(1)}>
                            <div className="step_box_item">
                                <span className="step_box_item_text">1</span>
                            </div>
                            <div
                                className="step_box_item done_step">
                                <Icon className="material-icons md-24 md-dark" color="white" icon="done"/>
                            </div>
                            <span
                                className="step_box_step_name">
                                Account
                            </span>
                            <div className="connector one-to-two"> </div>
                            <div className="connector one-to-two connector_animate connector_animate_position"> </div>
                        </div>
                        <div className={this.getCircleStyle(2)}>
                            <div className="step_box_item">
                                <span
                                    className="step_box_item_text">2</span>
                            </div>
                            <div
                                className="step_box_item done_step">
                                <Icon className="material-icons md-24 md-dark" color="white" icon="done"/>
                            </div>
                            <span
                                className="step_box_step_name">Profile</span>
                            <div className="connector two-to-three"> </div>
                            <div className="connector two-to-three connector_animate connector_animate_position"> </div>
                        </div>
                        <div className={this.getCircleStyle(3)}>
                            <div className="step_box_item">
                                <span
                                    className="step_box_item_text">3</span>
                            </div>
                            <span
                                className="step_box_step_name">Complete</span>
                        </div>
                    </div>
                    <div className={this.state.stepClass}>
                        <div>
                            <form className="reg_step_one" action="#"
                                  onSubmit={(event) => this.onButtonFormClick(event)}>
                                <span className="reg_name_field">e-mail</span>
                                <input
                                    onChange={(event) => {
                                        this.setState({
                                            registerForm: {
                                                ...this.state.registerForm,
                                                email: event.target.value
                                            }
                                        })
                                    }}
                                    className="reg_field email" type="email" placeholder="example@real.farm"/>
                                <span className="reg_name_field">password</span>
                                <input
                                    onChange={(event) => {
                                        this.setState({
                                            registerForm: {
                                                ...this.state.registerForm,
                                                pass: event.target.value
                                            }
                                        })
                                    }}
                                    className="reg_field password" type="password" placeholder="........"/>
                                <span className="reg_name_field">repeat password</span>
                                <input
                                    onChange={(event) => {
                                        this.setState({
                                            registerForm: {
                                                ...this.state.registerForm,
                                                repeat_pass: event.target.value
                                            }
                                        })
                                    }}
                                    className="reg_field password" type="password" placeholder="........"/>
                                <button
                                    onClick={() => this.onButtonClick()}
                                    className="next_step_button" type="submit">next step
                                    <Icon className="material-icons md-24 md-dark" color="white" icon="arrow_forward"/>
                                </button>
                            </form>
                        </div>
                        <div>
                            <form className="reg_step_one" onSubmit={(event) => this.onButtonFormClick(event)}>
                                <span className="reg_name_field">full name</span>
                                <input
                                    onChange={(event) => {
                                        this.setState({
                                            registerForm: {
                                                ...this.state.registerForm,
                                                user_name: event.target.value
                                            }
                                        })
                                    }}
                                    className="reg_field full_name" type="text" placeholder="Type here..."/>
                                <span className="reg_name_field">account type</span>
                                <select
                                    onChange={(event) => {
                                        this.setState({
                                            registerForm: {
                                                ...this.state.registerForm,
                                                account_type: event.target.value
                                            }
                                        })
                                    }}
                                    className="reg_field select_acc_type" name="" id="">
                                    <option className="option_acc_type" value="farmer">Farmer</option>
                                    <option className="option_acc_type" value="customer">Customer</option>
                                </select>
                                <button
                                    onClick={() => this.onButtonClick()}
                                    className="next_step_button" type="submit">next step
                                    <Icon className="material-icons md-24 md-dark" color="white" icon="arrow_forward"/>
                                </button>
                                <a href="#"
                                   onClick={() => {
                                       this.onBackButtonClick()
                                   }}
                                   className="button_back">Back</a>
                            </form>
                        </div>
                        <div>
                            <form className="reg_step_one" action="#" onSubmit={(event => {
                                event.preventDefault();
                            })}>
                                <span className="reg_name_field">please fill captcha</span>
                                <img className="captcha" src={captcha} alt="captcha"/>
                                <button
                                    onClick={() => {
                                        this.onSubmitButton()
                                    }}
                                    className="complete_button" type="submit">
                                    <span>complete</span>
                                    <Icon className="material-icons md-24 md-dark" color="white" icon="done"/>
                                </button>
                                <a href="#" onClick={() => {
                                    this.onBackButtonClick()
                                }}
                                   className="button_back">Back</a>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const putStateToProps = (state) => {
    return {
        isOpenModal: state.isOpenModal,
        passedRegister: state.passedRegister
    }
};

export default connect(putStateToProps)(Form_Register);
