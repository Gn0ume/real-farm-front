import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {createStore} from 'redux';
import {Provider} from 'react-redux'

const initialState = {
    isOpenModal: false,
    contentModal: null,
    passedRegister: false,
    passedUserSignIn: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'actionOpenModal':
            document.body.style.overflow = 'hidden';
            document.addEventListener('keyup', (event) => {
                if (event.keyCode === 27){
                    store.dispatch({type: 'actionCloseModal'});
                }
            });
            return {...state, isOpenModal: true, contentModal: action.payload, passedRegister: false};
        case 'actionCloseModal':
            document.body.style.overflow = 'visible';
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
