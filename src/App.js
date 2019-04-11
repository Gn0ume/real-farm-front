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
    uri: config.graphQlEndpoint
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
