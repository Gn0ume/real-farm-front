import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Modal from './components/Modal/Modal';
import {compose, withApollo} from 'react-apollo';
import {queryMe} from "./components/queries/queries";
import {connect} from "react-redux";
import {TOKEN} from './constants';
import {BrowserRouter, Route} from "react-router-dom";
import Catalog from "./components/Content/Navigation/Catalog";
import Documents from "./components/Content/Navigation/Documents";
import News from "./components/Content/Navigation/News";
import Home from "./components/Content/Navigation/Home";
import WhoWeAre from "./components/Content/AboutUs/WhoWeAre";
import OurTeam from "./components/Content/AboutUs/OurTeam";
import ForInvestors from "./components/Content/AboutUs/ForInvestors";
import MyFarms from "./components/Content/Profiles/MyFarms";
import Profile from "./components/Content/Profiles/Profile";

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
            <BrowserRouter>
                <div className="main-page">
                    {userInfo}
                    <Header/>
                    <div className="main-content">
                        <Route path="/catalog" component={Catalog}/>
                        <Route exact path="/" component={Home}/>
                        <Route path="/news" component={News}/>
                        <Route path="/documentation" component={Documents}/>
                        <Route path="/who_we_are" component={WhoWeAre}/>
                        <Route path="/our_team" component={OurTeam}/>
                        <Route path="/for_investors" component={ForInvestors}/>
                        <Route path="/farmer" component={MyFarms}/>
                        <Route path="/profile" component={Profile}/>
                    </div>
                    <Modal/>
                    <Footer/>
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