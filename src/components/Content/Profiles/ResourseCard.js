import React from "react";
import Icon from "material-icons-react";
import './ResourseCard.css'
import {queryClearResource} from "../../queries/queries";
import {withApollo} from "react-apollo";
import delete_icon from "../../../img/icons/delete-icon.svg"

class ResourseCard extends React.Component {
  constructor(props) {
    super(props);
    this.handleRemoveResource = this.handleRemoveResource.bind(this);
  }

  handleRemoveResource(e) {
    e.stopPropagation();
    if (window.confirm('Delete this resource?')) {
      this.props.client.query({
        query: queryClearResource,
        variables: {
          id: this.props.dataid
        }
      })
        .then(({data}) => {
          if (data) {
            console.log(data)
            this.props.deleteElement(this.props.dataid)
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }

  getShortResourceName() {
    const str = this.props.resourcename;
    if (str.length > 20) {
      return str.substring(0,12) + "..." + str.substring(str.length-5)
    } else {
      return str
    }
  }

  render() {
    return (
      <div data-id={this.props.dataid} className="farm-docs-loader-card">
        <div className="farm-docs-loader-card-photo">
          <img className="farm-docs-loader-card-photo-img" src={this.props.resourceurl} alt="photo"/>
        </div>
        <div className="farm-docs-loader-card-info">
          <div className="farm-settings-box">
            <img src={delete_icon} alt="move_icon" onMouseDown={this.handleRemoveResource}/>
                  <this.props.dragHandle/>

          </div>
          <div className="resource-name">{this.getShortResourceName()}</div>
          {(this.props.resourcegeotag !== null) &&
          <span className="farm-address">
            <Icon className="material-icons md-24 md-dark" color="#8f90a0" icon="location_on"/>
            {this.props.resourcegeotag}
          </span>
          }
          <div className="horizontal-line"/>
          <div className="farm-docs-loader-card-info-size">
            <span>Size </span>
            <span className="farm-docs-loader-card-info-size-mb">
              {this.props.size.toFixed(1)} Mb
            </span>
          </div>
        </div>
      </div>
    )

  }
}

export default withApollo(ResourseCard)