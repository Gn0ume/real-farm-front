import React from 'react';
import {Route} from "react-router-dom";
import {connect} from 'react-redux';
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
    constructor(props){
        super(props);
        props.dispatch({
            type: 'setGlobalLanguage',
            payload: props.match.params.language
        })
    }
    render() {
        const path = this.props.match.path;
        return <div>
            <Header/>
            <div className="main-content">
                <Route exact path={`/${this.props.match.params.language}`} component={Home}/>
                <Route path={`${path}/catalog/:filters`} component={Catalog}/>
                <Route exact path={`${path}/catalog`} component={Catalog}/>
                <Route path={`${path}/news`} component={News}/>
                <Route path={`${path}/documentation`} component={Documents}/>
                <Route path={`${path}/who_we_are`} component={WhoWeAre}/>
                <Route path={`${path}/our_team`} component={OurTeam}/>
                <Route path={`${path}/for_investors`} component={ForInvestors}/>
                <Route path={`${path}/farmer`} render={() => (App.isFarmer())}/>
                <Route path={`${path}/profile`} component={Profile}/>
                <Route path={`${path}/edit_farm/:id`} component={CreateEditFarm}/>
                <Route path={`${path}/items_list`} component={ItemsList}/>
                <Route path={`${path}/farm_item/:id`} component={FarmItemForm}/>
            </div>
            <Modal/>
            <Footer/>
        </div>
    }
}

const putStateToProps = (state) => {
    return {
        passedRegister: state.passedRegister,
        globalLanguage: state.globalLanguage
    }
};

export default connect(putStateToProps)(MainContent);
