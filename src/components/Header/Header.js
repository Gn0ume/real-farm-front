import React from 'react';
import './Header.css';
import Logo from './Logo';
import Menu from './Menu';
import {connect} from 'react-redux';
import FormSignIn from "../Content/FormSignIn";
import FormRegister from "../Content/FormRegister";
import {compose, withApollo} from "react-apollo";
import AuthPanel from "./AuthPanel";
import {menuHeader} from "../../constants";


class Header extends React.Component {
    buttonVisibility() {
        return(this.props.passedUserSignIn ? "reg_buttons hidden" : "reg_buttons")
    };

    chooseMenu() {
        const MenuForAll = <Menu font_size_class={"menu_items menu-items-font-14"} items={menuHeader}/>;
        return (this.props.passedUserSignIn ? <AuthPanel /> : MenuForAll)
    };

    chooseHeaderClass() {
        return ((this.props.passedUserSignIn) ? "no-shadow" :" ")
    }

    render() {
        const dispatch = this.props.dispatch;
        const actionOpenSignInModal = {type: 'actionOpenModal', payload: <FormSignIn />};
        const actionOpenRegisterModal = {type: 'actionOpenModal', payload: <FormRegister />};

        return (
            <header className={this.chooseHeaderClass()}>
                <Logo element_class={"logo_header"}/>
                <div className="menu">
                    {this.chooseMenu()}
                    <button
                        onClick={() => {
                            dispatch(actionOpenSignInModal)
                        }}
                        id="header_sign_in"
                        className={this.buttonVisibility()}>sign in
                    </button>
                    <button
                        onClick={() => {
                            dispatch(actionOpenRegisterModal)
                        }}
                        id="header_register"
                        className={this.buttonVisibility()}>register
                    </button>
                </div>
            </header>
        );
    }
}

const putStateToProps = (state) => {
    return {
        isOpenModal: state.isOpenModal,
        contentModal: state.contentModal,
        passedUserSignIn: state.passedUserSignIn
    }
};

export default withApollo(compose(connect(putStateToProps))(Header));
