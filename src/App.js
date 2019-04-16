import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Modal from './components/Modal/Modal';
import Content from './components/Content/Content';
import {compose, withApollo} from 'react-apollo';
import {queryMe} from "./components/queries/queries";
import {connect} from "react-redux";
import TOKEN from './constants';

class App extends React.Component {
    getMeInfo() {
        if (TOKEN) {
            this.props.client.query({
                query: queryMe
            })
                .then(data => {
                    const dispatch = this.props.dispatch;
                    const infoAuthUser = {type: 'infoAuthUser', payload: data.data.me};
                    dispatch(infoAuthUser);
                })
        }
    };

    render() {
        const userInfo = this.getMeInfo();
        return (
                <div className="main-page">
                    {userInfo}
                    <Header/>
                    <Content/>
                    <Modal/>
                    <Footer/>
                </div>
        );
    }
}

const putStateToProps = (state) => {
    return {
        isOpenModal: state.isOpenModal,
        passedUserSignIn: state.passedUserSignIn,
        authUser: state.authUser
    }
};

export default withApollo(compose(connect(putStateToProps))(App));