import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Modal from './components/Modal/Modal';
import Content from './components/Content/Content';
import {ApolloProvider} from 'react-apollo';
import ApolloClient from 'apollo-boost';
import config from './config';

const client = new ApolloClient({
    uri: config.graphQlEndpoint,
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

class App extends React.Component {
    render() {
        return (
            <ApolloProvider client={client}>
                <div className="main-page">
                    <Header/>
                    <Content/>
                    <Modal/>
                    <Footer/>
                </div>
            </ApolloProvider>
        );
    }
}

export default App;
