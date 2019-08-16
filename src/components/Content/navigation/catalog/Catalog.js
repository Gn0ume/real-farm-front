import React from "react";
import {withApollo} from "react-apollo";

import PageHeader from "../../Profiles/PageHeader";
import ProductCard from "./ProductCard";
import store from '../../../../img/icons/store.svg';
import CategoryPicker from "../CategoryPicker";
import location from "../../../../img/icons/location.svg";
import {queryAllGoods} from "../../../queries/queries";
import Paginator from "./Paginator";
import {PRODUCTS_PER_PAGE, PER_PAGE, getProductsPerPage} from "../../../../constants";
import './Catalog.css';

class Catalog extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.applyFilter = this.applyFilter.bind(this);
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
        this.setState({...data.stocks, isReady: true});
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
        this.setState({...data.stocks, isReady: true});
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

  getOptions() {
    const userChoice = localStorage.getItem('productsPerPage');
    const isSelected = userChoice ? userChoice : PRODUCTS_PER_PAGE;

    return PER_PAGE.map(item => {
        return <option key={item}
                       value={item}
                       selected={+item === +isSelected}>
          {item}
        </option>
      }
    )
  }

  render() {
    return (
      <div>
        Текущий язык {this.props.match.params.language}
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
                {this.getOptions()}
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