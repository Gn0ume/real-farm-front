import React from 'react';
import {BrowserRouter, Redirect, Route} from "react-router-dom";
import {connect} from 'react-redux';

// import './Content.css';
import Header from "../../Header/Header";
import Catalog from "../navigation/catalog/Catalog";
import Home from "../navigation/Home";
import News from "../navigation/News";
import Documents from "../navigation/Documents";
import WhoWeAre from "../AboutUs/WhoWeAre";
import OurTeam from "../AboutUs/OurTeam";
import ForInvestors from "../AboutUs/ForInvestors";
import Profile from "../Profiles/Profile";
import CreateEditFarm from "../Profiles/CreateEditFarm";
import ItemsList from "../navigation/my_goods/ItemsList";
import FarmItemForm from "../navigation/FarmItemForm";
import Modal from "../../Modal/Modal";
import Footer from "../../Footer/Footer";
import App from "../../../App"


class MainContent extends React.Component {
    render() {
        return <div>
            Язык
            {this.props.match.params.language}
            <Header/>
            <BrowserRouter>
                <div className="main-content">
                    <Route path={`${this.props.match.path}/catalog`} component={Catalog}/>
                    <Route exact path="/" component={Home}/>
                    <Route path="/news" component={News}/>
                    <Route path="/documentation" component={Documents}/>
                    <Route path="/who_we_are" component={WhoWeAre}/>
                    <Route path="/our_team" component={OurTeam}/>
                    <Route path="/for_investors" component={ForInvestors}/>
                    <Route path="/farmer" render={() => (App.isFarmer())}/>
                    <Route path="./profile" component={Profile}/>
                    <Route path="/edit_farm/:id" component={CreateEditFarm}/>
                    <Route path={`${this.props.match.path}/items_list`} component={ItemsList}/>
                    <Route path="/farm_item/:id" component={FarmItemForm}/>
                </div>
            </BrowserRouter>
            <Modal/>
            <Footer/>
        </div>
    }
}

const putStateToProps = (state) => {
    return {
        passedRegister: state.passedRegister
    }
};

export default connect(putStateToProps)(MainContent);
