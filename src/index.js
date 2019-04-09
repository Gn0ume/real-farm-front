import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {createStore} from 'redux';
import {Provider} from 'react-redux'
import Form_Sign_in from './components/Content/Form_Sign_in';
import Form_Register from './components/Content/Form_Register';

const initialState = {
    isOpenModal: false,
    contentModal: null,
    passedRegister: false,
    passedUserSignIn: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'actionOpenSignInModal':
            document.addEventListener('keyup', (event) => {
                if (event.keyCode === 27){
                    store.dispatch({type: 'actionCloseModal'});
                }
            });
            return {...state, isOpenModal: true, contentModal: <Form_Sign_in/>};
        case 'actionOpenSignInAfterReg':
            return {...state, isOpenModal: true, contentModal: <Form_Sign_in/>, passedRegister: false};
        case 'actionOpenRegisterModal':
            return {...state, isOpenModal: true, contentModal: <Form_Register/>};
        case 'actionCloseModal':
            return {...state, isOpenModal: false};
        case 'passedUserRegister':
            return {...state, passedRegister: true};
        case 'passedUserSignIn':
            return {...state, passedUserSignIn: true};
    }
    return state;
};

const store = createStore(reducer);

ReactDOM.render(<Provider store={store}><App/></Provider>, document.getElementById('root'));

serviceWorker.unregister();
