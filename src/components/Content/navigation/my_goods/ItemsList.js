import React from 'react';
import {Link, Redirect} from "react-router-dom";
import {compose, graphql, withApollo} from 'react-apollo';

import PageHeader from "../../Profiles/PageHeader";
import ItemsListCard from "./ItemsListCard";
import {queryMyGoods, queryAddNewStock, createUserMutation} from "../../../queries/queries";
import './ItemsList.css'
import FarmModel from "../../../Models/Farm.model";
import {connect} from "react-redux";

class ItemsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false
    };
    this.addNewItem = this.addNewItem.bind(this);
  }

  componentDidMount() {
    this.props.client.query({
      query: queryMyGoods,
      fetchPolicy: 'no-cache'
    })
      .then(({data}) => {
        console.log(data);
        this.setState({...data.me, isReady: true});
        console.log("State", this.state);

      })
      .catch(error => {
        console.log(error)
      })
  }

  getItemListCard() {
    let items = [];
    for (let i = 0; i < this.state.stocks.length; i++) {
          console.log(this.state.stocks);
          items.push(
            <ItemsListCard
              key={this.state.stocks[i].id}
              stock={this.state.stocks[i]}
              deleteElement={this.deleteElement}
            />
          )

    }
    return items;
  }

  deleteElement = id => {
    let arr = [...this.state.stocks];
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].id === id) {
        arr.splice(i, 1)
      }
    }
    this.setState({stocks: arr})
  };

  addNewItem() {
        this.props.queryAddNewStock({
         fetchPolicy: 'no-cache'
        })
          .then(result => {
             this.props.history.push(`/farm_item/${result.data.createStock.id}`);
          }
        )
  };

  render() {
    return(
      <div className="items-list-container">
        <PageHeader
          pagename="items list"/>
          <div className="items-list-box">
            {this.state.isReady &&
                  this.getItemListCard()
            }
          </div>
        <div className="items-list-button-box">
          {/*<Link to="/farm_item">*/}
            <button className="items-list-add-button"
            onClick={this.addNewItem}>
              Add new item
            </button>
          {/*</Link>*/}
        </div>


      </div>
    )
  }

}

export default withApollo(graphql(queryAddNewStock, {name: 'queryAddNewStock'})(ItemsList));