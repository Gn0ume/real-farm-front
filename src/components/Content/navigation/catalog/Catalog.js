import React from "react";
import {withApollo} from "react-apollo";
import {withRouter} from "react-router-dom";
import queryString from "query-string"

import PageHeader from "../../Profiles/PageHeader";
import ProductCard from "./ProductCard";
import store from '../../../../img/icons/store.svg';
import {queryAllGoods} from "../../../queries/queries";
import {PRODUCTS_PER_PAGE, PER_PAGE} from "../../../../constants";
import './Catalog.css';
import Filter from "../../../Filter/Filter";

class Catalog extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.applyFilter = this.applyFilter.bind(this);
    let filtrationValues = {
      filter: {},
      paginator: {
        page: 1,
        perPage: 10
      }
    };
    if (props.location.search !== ""){
      const searchParameters = queryString.parse(props.location.search);
      filtrationValues = {
        filter: {
          categories: searchParameters.categories,
          priceRange: {
            min: searchParameters.minPrice,
            max: searchParameters.maxPrice,
          }
        },
        paginator: {
          page: searchParameters.page,
          perPage: searchParameters.perPage
        }
      }
    }
    this.state = {
      isReady: false,
      list: [],
      filtration: {
        data: {
          filter: null,
          paginator: null
        },
        value: filtrationValues
      },
    };

  }

  componentDidMount() {
    const filterValues = this.state.filtration.value;
    this.props.client.query({
      query: queryAllGoods,
      fetchPolicy: 'no-cache',
      variables: {
        page: filterValues.paginator.page,
        perPage: filterValues.paginator.perPage,
        categories: filterValues.filter.categories,
        priceRange: filterValues.filter.priceRange
      }
    })
      .then(({data}) => {
        const stateCopy = {...this.state};
        stateCopy.list = data.stocks.list;
        stateCopy.filtration.data.filter = {
          categories: JSON.parse(data.stocks.filter.categoriesJSON),
          priceRange: data.stocks.filter.priceRange
        };
        stateCopy.filtration.data.paginator = data.stocks.paginator;
        stateCopy.isReady = true;
        console.log(stateCopy)
        this.setState(stateCopy);
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
        page: this.state.filters.page,
        perPage: +this.state.filters.perPage
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


  getProductsList() {
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
    this.setState({filters: {...this.state.filters, [name]: value}});
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
        <PageHeader
          pagename="catalog"
          icon={store}/>
        {this.state.isReady &&
        <div className="catalog-content">
          <div className="catalog-content-sidebar">
            <Filter data={this.state.filtration.data.filter} value={this.state.filtration.value.filter}/>
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
              {this.getProductsList()}
            </div>
            {/*<Paginator*/}
              {/*currentPage={this.state.paginator.page}*/}
              {/*totalPages={this.state.paginator.totalPages}/>*/}
          </div>
        </div>
        }
      </div>
    )
  }
}

export default withRouter(withApollo(Catalog))
