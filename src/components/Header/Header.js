import React from 'react';
import './Header.css';
import Logo from './Logo';
import Menu from './Menu';
import {connect} from 'react-redux';
import FormSignIn from "../Content/FormSignIn";
import FormRegister from "../Content/FormRegister";

class Header extends React.Component {
    render() {
        const dispatch = this.props.dispatch;
        const actionOpenSignInModal = {type: 'actionOpenModal', payload: <FormSignIn />};
        const actionOpenRegisterModal = {type: 'actionOpenModal', payload: <FormRegister />};

        return (
            <header>
                <Logo element_class={"logo_header"}/>
                <div className="menu">
                    <Menu items={["Home", "About Us", "News", "Documentation"]}/>
                    <button
                        onClick={() => {
                            dispatch(actionOpenSignInModal)
                        }}
                        id="header_sign_in"
                        className="reg_buttons">sing in
                    </button>
                    <button
                        onClick={() => {
                            dispatch(actionOpenRegisterModal)
                        }}
                        id="header_register"
                        className="reg_buttons">register
                    </button>
                </div>
            </header>
        );
    }
}

const putStateToProps = (state) => {
    return {
        isOpenModal: state.isOpenModal,
        contentModal: state.contentModal
    }
};

export default connect(putStateToProps)(Header);
