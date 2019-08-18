import React from 'react';
import './Filter.css';
import CategoryPicker from "../Content/navigation/CategoryPicker";
import location from "../../img/icons/location.svg";

const Filter = props => {
    const onFilter = props.onFilter || (() => {});
    const onChangeCategories = () => {alert('Категории изменились!')};
    return <div className="catalog-content-sidebar-filters">
        <div className="catalog-content-sidebar-filters-title">
            <span>categories</span>
        </div>
        <div className="category-picker-box">
            <CategoryPicker
              checkedCategories={props.value.categories}
              categoriesTree={props.data.categories}
                onChange={onChangeCategories}
            />
        </div>
        <div className="price-range">
            <span className="form-fields-name">price</span>
            <div className="price-range-box">
                <div>
                    <span className="price-range-from">from</span>
                    <input name="price_from"
                           type="text"
                           value={props.data.priceRange.min}
                           onChange={onFilter()}/>
                </div>
                <div>
                    <span className="price-range-to">to</span>
                    <input name="price_to"
                           type="text"
                           value={props.data.priceRange.max}
                           onChange={onFilter()}/>
                </div>
            </div>
        </div>
        <button className="show-products-button"
                onClick={onFilter()}>
            <img src={location} alt=""/>
            show products
        </button>
        <a href="?" className="reset-filters-button">Reset Filters</a>
    </div>
};

export default Filter;
