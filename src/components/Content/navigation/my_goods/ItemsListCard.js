import React from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import {NavLink} from "react-router-dom";
import {withApollo} from 'react-apollo';

import edit from '../../../../img/icons/edit.svg';
import delete_icon from '../../../../img/icons/delete-icon_white.svg';
import event from '../../../../img/icons/event.svg';
import folder from '../../../../img/icons/folder.svg'
import noPhoto from '../../../../img/no_photo.jpg'
import {queryDeleteProduct} from "../../../queries/queries";
import {CURRENCY_SIGN} from "../../../../constants";
import './ItemsListCard.css';

class ItemsListCard extends React.Component {
  constructor(props) {
    super(props);
    this.handleRemoveItem = this.handleRemoveItem.bind(this);
  }

  handleRemoveItem(e) {
    if (window.confirm('Delete this resource?')) {
      this.props.client.query({
        query: queryDeleteProduct,
        variables: {
          id: this.props.stock.id
        }
      })
        .then(({data}) => {
          if (data) {
            console.log(data)
            this.props.deleteElement(this.props.stock.id)
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }

  render() {
    return(
      <div className="items-list-card-container">
        {console.log(this.props)}
        <div className="items-list-card-preview">
        <img className="items-list-card-preview"  src={noPhoto}
             // src={this.props.stock.photos.length !== 0 ? this.props.stock.photos[0].preview.url : noPhoto}
             alt=""/>
        </div>

        <div className="items-list-card-maininfo">
        <span className="items-list-card-maininfo-name">{this.props.stock.name}</span>
        <span className="items-list-card-maininfo-category">
          <img src={folder} alt=""/>
          Meat / Beef
        </span>
        <span className="items-list-card-maininfo-price">
          <span>{this.props.stock.currency} </span>
          <span>{this.props.stock.price} </span>
          per
          <span> {this.props.stock.units} </span>
        </span>
        </div>

        <p className="items-list-card-description">{this.props.stock.description}</p>

        <div className="items-list-card-stockinfo">
          <span className="items-list-card-stockinfo-qty">
            <span>Quantity: </span>
            {this.props.stock.quantity}
          </span>
          <span className="items-list-card-stockinfo-farm">
            <span>Farm: </span>
            {this.props.stock.farm.name}
          </span>
        </div>

        <div className="items-list-card-date-and-button">
          <span className="items-list-card-date">
            <img src={event} alt=""/>
            <span>{moment(+this.props.stock.updatedAt).format('LL')}</span>
            <span>(last update)</span>
          </span>
          <div className="items-list-card-buttons-panel">
            <NavLink to={`/farm_item/${this.props.stock.id}`}>
              <button className="edit-button">
                <img src={edit} alt=""/>
                edit
              </button>
            </NavLink>
            <button className="delete-button"
            onMouseDown={this.handleRemoveItem}>
              <img src={delete_icon} alt=""/>
              delete
            </button>
          </div>

        </div>


      </div>
    )
  }

}

const putStateToProps = (state) => {
  return {
    globalLanguage: state.globalLanguage
  }
};

export default withApollo(connect(putStateToProps)(ItemsListCard))
