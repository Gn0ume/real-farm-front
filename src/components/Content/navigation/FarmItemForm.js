import React from 'react';
import './FarmItemForm.css';
import PageHeader from "../Profiles/PageHeader";
import DirectoryEditor from "../Profiles/DirectoryEditor";
import SectionName from "../SectionName";
import {queryAboutProduct, queryUpdateMyProduct} from "../../queries/queries";
import {withApollo} from 'react-apollo';
import RealFarmComponent from "../Profiles/RealFarmComponent";
import ListPicker from "./ListPicker";
import FarmModel from "../../Models/Farm.model"
import UnitModel from "../../Models/Unit.model";

class FarmItemForm extends RealFarmComponent {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      stock: {
        id: "",
        name: ""
      }
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeFarm = this.handleChangeFarm.bind(this);
    this.onClickSaveButton = this.onClickSaveButton.bind(this);

  }

  componentDidMount() {
    this.props.client.query({
      query: queryAboutProduct,
      fetchPolicy: 'no-cache',
      variables: {
        id: this.props.match.params.id
      }
    })
      .then(({data}) => {
        console.log(data)
        this.setState({...data.stock, isReady: true}, () => {
          this.refreshCurrentState();
        });
      })
      .catch(error => {
        console.log(error)
      })
  };

  handleChange(event) {
    const {name, value} = event.target;
    console.log("changeValue", name, value);
    console.log(this.state)
    this.setState({...this.state, [name]: value});
  }

  handleChangeFarm(event) {
    const {value} = event.target;
    console.log("changeValue", value);
    console.log(this.state)
    this.setState({farm: {...this.state.farm, id: value}});
  }

  onClickSaveButton() {
    this.props.client.query({
      query: queryUpdateMyProduct,
      variables: {
        id: this.state.id,
        name: this.state.name,
        price: parseFloat(this.state.price),
        quantity: parseInt(this.state.quantity),
        currency: this.state.currency,
        units: this.state.units,
        categoryId: this.state.categoryId,
        description: this.state.description,
        farmId: this.state.farm.id
      }
    })
      .then(() => {
        this.setState({...this.state}, () => {
          this.refreshCurrentState();
        });

      })
      .catch(err => {
        console.log(err)
      });
  }

  render() {
    return (
      <div>
        <PageHeader
          pagename="farm item"
          buttons="true"
          changed={this.dataChanged}
          onSave={this.onClickSaveButton}/>
        {this.state.isReady &&
        <div className="farm-item-form-container">
          {console.log(this.state)}
          <SectionName partName="item information"/>
          <div className="farm-item-box">
            <div className="farm-item-category-box">
              <span className="form-fields-name">category</span>
              <div className="farm-item-category"></div>
            </div>
            <div className="farm-item-info">
              <span className="form-fields-name">title</span>
              <input className="farm-item-info-title"
                     placeholder="Product name"
                     type="text"
                     name="name"
                     value={this.state.name}
                     onChange={this.handleChange}/>
              <span className="form-fields-name">description</span>
              <textarea className="farm-item-info-description"
                        placeholder="Type here..."
                        name="description"
                        value={this.state.description}
                        onChange={this.handleChange}/>
            </div>
            <div className="farm-item-param">
              <ListPicker listName="farm"
                          provider={FarmModel.getCurrentUserFarms()}
                          selectedItem={this.state.farm ? this.state.farm.id : ' '}
                          compareValue="id"
                          nameForUpdate="farmId"
                          onChangeItem={this.handleChangeFarm}/>

              <ListPicker listName="unit"
                          provider={UnitModel.getAllUnits()}
                          selectedItem={this.state.units}
                          compareValue="name"
                          nameForUpdate="units"
                          onChangeItem={this.handleChange}/>

              <span className="form-fields-name">stock quantity</span>
              <input type="text"
                     placeholder="Quantity"
                     name="quantity"
                     value={this.state.quantity}
                     className="farm-item-param-quantity"
                     onChange={this.handleChange}/>
              <span className="form-fields-name">currency</span>
              <select className="farm-item-param-price"
                      name="currency"
                      onChange={this.handleChange}>
                <option disabled selected>Select currency...</option>
                <option value="RUB">RUB</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
              </select>
              <span className="form-fields-name">price</span>
              <input type="number"
                     placeholder="Price"
                     name="price"
                     className="farm-item-param-price"
                     value={this.state.price}
                     onChange={this.handleChange}/>
            </div>
          </div>
          <SectionName partName="item resources"/>
          {this.state.isReady &&
          <DirectoryEditor
            key={this.state.directories[0].id}
            directory={this.state.directories[0]}/>
          }
        </div>
        }
      </div>
    )
  }
}

export default withApollo(FarmItemForm)