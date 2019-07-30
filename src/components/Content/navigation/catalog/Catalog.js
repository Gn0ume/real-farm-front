import React from "react";
import {withApollo} from "react-apollo";

import PageHeader from "../../Profiles/PageHeader";
import ProductCard from "./ProductCard";
import store from '../../../../img/icons/store.svg';
import CategoryPicker from "../CategoryPicker";
import location from "../../../../img/icons/location.svg";
import {queryAllGoods} from "../../../queries/queries";
import Paginator from "./Paginator";
import './Catalog.css';
import { PRODUCTS_PER_PAGE, getProductsPerPage } from "../../../../constants";
import ListPicker from "../ListPicker";

class Catalog extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.applyFilter = this.applyFilter.bind(this);
    this.cats = {
      name: "root",
      isOpened: true,
      children: [
        {
          name: "meal",
          isOpened: true,
          children: [
            {
              name: "pork",
              isOpened: false,
              children: []
            },
            {
              name: "chicken",
              isOpened: false,
              children: []
            }
          ]
        },
        {
          name: "fruits",
          isOpened: true,
          children: [
            {
              name: "apples",
              isOpened: false,
              children: [
                {
                  name: "antonovka",
                  isOpened: false,
                  children: [
                    {
                      name: "antonovka first cort",
                      isOpened: false,
                      children: []
                    }
                  ]
                },
                {
                  name: "golden",
                  isOpened: false,
                  children: []
                }
              ]
            }
          ]
        },
        {
          name: "dairy",
          isOpened: false,
          children: []
        }
      ]
    };
    this.state = {
      isReady: false,
      forFilter: {
        perPage: 0,
        page: 1,
        priceRangeMin: 0,
        priceRangeMax: 0,
        categories: []
      }
    };

    this.filters = {
      price_from: null,
      price_to: null
    };
    this.categories = JSON.stringify(this.cats);
  }

  componentDidMount() {
    this.props.client.query({
      query: queryAllGoods,
      fetchPolicy: 'no-cache',
      variables: {
        page: this.state.forFilter.page,
        perPage: +(getProductsPerPage() ? getProductsPerPage() : PRODUCTS_PER_PAGE)
      }
    })
      .then(({data}) => {
        this.setState({...data.stocks, isReady: true})
        console.log(this.state)

      })
      .catch(error => {
        console.log(error)
      })
  }

  applyFilter() {
    this.props.client.query({
      query: queryAllGoods,
      fetchPolicy: 'no-cache',
      variables: {
        page: this.state.forFilter.page,
        perPage: +this.state.forFilter.perPage

      }
    })
      .then(({data}) => {
        this.setState({...data.stocks, isReady: true})
        console.log(this.state)

      })
      .catch(error => {
        console.log(error)
      })
  }


  getProductCard() {
    let items = [];
    for (let i = 0; i < this.state.list.length; i++) {
      items.push(
        <ProductCard
          key={this.state.list[i].id}
          product={this.state.list[i]}
        />
      )
    }
    return items;
  }

  handleChange(event) {
    const {name, value} = event.target;
    if (name === "perPage") {
      localStorage.setItem('productsPerPage', value)
    }
    this.setState({forFilter: {...this.state.forFilter, [name]: value}});
  }

  render() {
    return (
      <div>
        <PageHeader
          pagename="catalog"
          icon={store}/>
        {this.state.isReady &&
        <div className="catalog-content">
          <div className="catalog-content-sidebar">
            <div className="catalog-content-sidebar-filters">
              <div className="catalog-content-sidebar-filters-title">
                <span>categories</span>
              </div>
              {console.log(JSON.parse(this.state.filter.categoriesJSON))}
              <div className="category-picker-box">
                <CategoryPicker
                  categories={JSON.parse(this.state.filter.categoriesJSON)}/>
              </div>
              <div className="price-range">
                <span className="form-fields-name">price</span>
                <div className="price-range-box">
                  <div>
                    <span className="price-range-from">from</span>
                    <input name="price_from"
                           type="text"
                           value={this.state.filter.priceRange.min}
                           onChange={this.handleChange}/>
                  </div>
                  <div>
                    <span className="price-range-to">to</span>
                    <input name="price_to"
                           type="text"
                           value={this.state.filter.priceRange.max}
                           onChange={this.handleChange}/>
                  </div>
                </div>
              </div>
              <button className="show-products-button"
              onClick={this.applyFilter}>
                <img src={location} alt=""/>
                show products
              </button>
              <a href="#" className="reset-filters-button">Reset Filters</a>
            </div>
            <div className="catalog-content-sidebar-reviews">
              <span>reviews</span>

            </div>

          </div>
          <div>
            <div className="catalog-content-select-box">
              <span className="form-fields-name">Show per page</span>
              <select className="products-per-page"
                      name="perPage"
                      onChange={this.handleChange}>
                <option value="2">2</option>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
            </div>
            <div className="catalog-content-items">
              {this.getProductCard()}
            </div>
            <Paginator
              currentPage={this.state.paginator.page}
              totalPages={this.state.paginator.totalPages}/>
          </div>
        </div>
        }
      </div>
    )
  }
}

export default withApollo(Catalog)