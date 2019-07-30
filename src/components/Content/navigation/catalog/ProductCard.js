import React from 'react';
import './ProductCard.css';
import Slider from "../../Profiles/Slider";
import cart from '../../../../img/icons/shopping_cart.svg';
import favorite from '../../../../img/icons/favorite.svg';
import folder from '../../../../img/icons/folder.svg';

class ProductCard extends React.Component {
  render() {
    return (
      <div className="product-card">
        <div className="slider">
          {console.log(this.props)}
          <img src={this.props.product.photo} width={343} height={213} alt=""/>
        </div>
        {/*<Slider/>*/}
        <div className="product-card-price">
          {this.props.product.currency}{this.props.product.price}/{this.props.product.units}
        </div>
        <div className="product-card-info">
          <span className="product-card-info-name">{this.props.product.name}</span>
          <div className="product-card-info-section">
            <img src={folder} alt=""/>
             <span>Meat / Beef</span>
          </div>
          <div className="product-card-button-panel">
            <button className="add-to-cart-button">
              <span>add to cart</span>
              <img src={cart} alt=""/>
            </button>
            <button className="add-to-favorite-button">
              <img src={favorite} alt=""/>
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default ProductCard