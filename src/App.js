import React from 'react';
import {BrowserRouter, Redirect, Route} from "react-router-dom";
import {connect} from "react-redux";

import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Modal from './components/Modal/Modal';
import {compose, withApollo} from 'react-apollo';
import {queryMe} from "./components/queries/queries";
import {getToken, getUserType} from './constants';
import Catalog from "./components/Content/navigation/catalog/Catalog";
import Documents from "./components/Content/navigation/Documents";
import News from "./components/Content/navigation/News";
import Home from "./components/Content/navigation/Home";
import WhoWeAre from "./components/Content/AboutUs/WhoWeAre";
import OurTeam from "./components/Content/AboutUs/OurTeam";
import ForInvestors from "./components/Content/AboutUs/ForInvestors";
import MyFarms from "./components/Content/Profiles/MyFarms";
import Profile from "./components/Content/Profiles/Profile";
import CreateEditFarm from "./components/Content/Profiles/CreateEditFarm";
import ItemsList from "./components/Content/navigation/my_goods/ItemsList";
import FarmItemForm from "./components/Content/navigation/FarmItemForm";

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
                    console.log('get me info');
                    const dispatch = this.props.dispatch;
                    const infoAuthUser = {type: 'infoAuthUser', payload: data.data.me};
                    dispatch(infoAuthUser);
                })
        }
    };

    static isFarmer() {
        return (getToken() && getUserType() === "FARMER") ? (
            <MyFarms />
        ) : (
            <Redirect to="/"/>
        )
    }

    render() {
        return (
            <BrowserRouter>
                <div className="main-page">
                    <Header/>
                    <div className="main-content">
                        <Route path="/catalog" component={Catalog}/>
                        <Route exact path="/" component={Home}/>
                        <Route path="/news" component={News}/>
                        <Route path="/documentation" component={Documents}/>
                        <Route path="/who_we_are" component={WhoWeAre}/>
                        <Route path="/our_team" component={OurTeam}/>
                        <Route path="/for_investors" component={ForInvestors}/>
                        <Route path="/farmer" render={() => (App.isFarmer())}/>
                        <Route path="/profile" component={Profile}/>
                        <Route path="/edit_farm/:id" component={CreateEditFarm}/>
                        <Route path="/items_list" component={ItemsList}/>
                        <Route path="/farm_item/:id" component={FarmItemForm}/>
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