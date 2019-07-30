import React from "react";
import './CreateEditFarm.css';
import Icon from "material-icons-react";
import AddressPicker from "./AddressPicker";
import {queryAboutMyFarm, queryUpdateMyFarm} from "../../queries/queries";
import {withApollo} from "react-apollo";
import DirectoryEditor from "./DirectoryEditor";
import PageHeader from "./PageHeader";
import RealFarmComponent from "./RealFarmComponent";
import SectionName from "../SectionName";

class CreateEditFarm extends RealFarmComponent {
  constructor(props) {
    super(props);
    this.pointChangeHandler = this.pointChangeHandler.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onClickSaveButton = this.onClickSaveButton.bind(this);
    this.state = {
      isReady: false,
      geoPosition: []
    };
  }

  componentDidMount() {
    this.props.client.query({
      query: queryAboutMyFarm,
      fetchPolicy: 'no-cache',
      variables: {
        id: this.props.match.params.id
      }
    })
      .then(({data}) => {
        this.setState({...data.farm, isReady: true}, () => {
          this.refreshCurrentState();
        });
      })
      .catch(error => {
        console.log(error)
      })
  }

  handleChange(event) {
    const {name, value} = event.target;
    this.setState({...this.state, [name]: value});

  }

  pointChangeHandler = (point, address) => {
    this.setState({
        ...this.state,
        geoPosition: [parseFloat(point.latitude), parseFloat(point.longitude)],
        address: address
      })
  };

  changeFarmName = farmname => {
    this.setState({...this.state, name: farmname});
  };

  drawDirectories() {
    return this
      .state
      .directories
      .map(directory => <DirectoryEditor key={directory.id} directory={directory}/>)
  }

  onClickSaveButton() {
    this.props.client.query({
      query: queryUpdateMyFarm,
      variables: {
        id: this.state.id,
        name: this.state.name,
        address: this.state.address,
        description: this.state.description,
        TIN: this.state.TIN,
        geoPosition: this.state.geoPosition
      }
    })
      .then(() => {
        this.setState({...this.state}, () => {
          this.refreshCurrentState();
        })
      })
      .catch(err => {
        console.log(err)
      });
  }

  render() {
    return (
      <div>
        {this.state.isReady &&
        <div className="farm-profile-page">
          <div className="page-name-box">
            <div className="farm-name-box">
              <PageHeader pagename="farm"
                          inputName="true"
                          inputNameValue={this.state.name}
                          buttons="true"
                          changed={this.dataChanged}
                          onChangeFarmName={this.changeFarmName}
                          onSave={this.onClickSaveButton}/>
            </div>
          </div>
          <div className="create-edit-content">
            <div className="farm-data">
              <SectionName partName="farm registration data"/>
              <div className="farm-data-container">
                <div className="farm-data-map-container">
                  <AddressPicker
                    farmaddress={this.state.address}
                    point={this.state.geoPosition}
                    onChange={this.pointChangeHandler}/>
                </div>
                <div className="farm-data-info-container">
                                <span className="form-fields-name">
                                    taxpayer identification number
                                </span>
                  <input className="farm-data-tin"
                         name="TIN"
                         placeholder="Type Here..."
                         type="text"
                         value={this.state.TIN}
                         onChange={this.handleChange}/>
                  <span className="form-fields-name">description</span>
                  <textarea className="farm-data-disc"
                            placeholder="Type Here..."
                            name="description"
                            value={this.state.description}
                            onChange={this.handleChange}/>
                </div>
              </div>
            </div>
            <div className="farm-docs">
              <SectionName partName="your farm documents"/>
              {this.drawDirectories()}
            </div>
          </div>
        </div>}
      </div>
    )
  }
}

export default withApollo(CreateEditFarm)