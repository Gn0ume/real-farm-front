import React from 'react';
import {BrowserRouter, Redirect, Route, withRouter} from "react-router-dom";
import {connect} from "react-redux";

import './App.css';
import {compose, withApollo} from 'react-apollo';
import {queryMe} from "./components/queries/queries";
import {getToken, getUserType} from './constants';
import MyFarms from "./components/Content/Profiles/MyFarms";
import MainContent from "./components/Content/main_content/MainContent";

class App extends React.Component {
    constructor(props){
        super(props);
        this.getMeInfo();
    }
    getMeInfo() {
        if (getToken()) {
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

    static isFarmer() {
        console.log('hi')
        return (getToken() && getUserType() === "FARMER") ? (
            <MyFarms />
        ) : (
            <Redirect to={`${this.props.globalLanguage}/`}/>
        )
    }

    render() {
        return (
            <BrowserRouter>
                <div className="main-page">
                    <Route exact path="/" render={() => (
                      <Redirect to="/en/"/>
                    )}/>
                    <Route path="/:language" component={MainContent}/>
                </div>
            </BrowserRouter>
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
