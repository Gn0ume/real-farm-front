import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {getToken} from './constants';
import ApolloClient from "apollo-boost";
import config from "./config";
import {ApolloProvider} from "react-apollo";

const initialState = {
    isOpenModal: false,
    contentModal: null,
    passedRegister: false,
    passedUserSignIn: !!(getToken()),
    authUser: {
        id: ""
    }
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
        case 'infoAuthUser':
            return {...state, authUser: action.payload}

    }
    return state;
};

const store = createStore(reducer);

const client = new ApolloClient({
    uri: config.graphQlEndpoint,
    request: async operation => {
        const token = await localStorage.getItem('token');
        operation.setContext({
            headers: {
                authorization: token ? `Bearer ${token}` : ''
            }
        });
    },
    onError: ({ graphQLErrors, response }) => {
        response.errors = null;
        graphQLErrors.map( error => {
            switch (error.code) {
                case 409:
                    alert('Такой ресурс уже существует');
                    break;
                default:
                    alert('Произошла неизвестная ошибка! Извините!');
            }
        })
    }
});

ReactDOM.render( <ApolloProvider client={client}><Provider store={store}><App/></Provider></ApolloProvider>, document.getElementById('root'));

serviceWorker.unregister();
