import React from "react";
import './DirectoryEditor.css'
import Icon from "material-icons-react";
import ResourseCard from "./ResourseCard";
import axios from "axios";
import {getToken} from "../../../constants";
import {SortableHandle, SortableContainer, SortableElement} from 'react-sortable-hoc';
import arrayMove from 'array-move';
import {queryAboutNewResource, querySaveOrders} from "../../queries/queries";
import {withApollo} from "react-apollo";
import move_icon from "../../../img/icons/drag-handle.svg";
import config from '../../../config';
import moment from 'moment';

class DirectoryEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      resources: props.directory.resources
    };
    this.onSortEnd = this.onSortEnd.bind(this);
  }


  uploadToDirectory(file, directoryId) {
    const formData = new FormData();
    formData.append('directoryId', directoryId);
    formData.append('files[]', file);
    return axios({
      url: `${config.serverAddress}/uploadToDirectory`,
      method: 'POST',
      headers: {
        authorization: getToken() ? `Bearer ${getToken()}` : ''
      },
      data: formData
    })
      .then(({data: res}) => {
        if (res.success === true) {
          this.getNewResourceData(res.models[0])
            .then(resource => {
              const docs = [...this.state.resources];
              docs.push(resource);
              this.setState({resources: docs});
            });
        } else {
          console.log(res.errors)
        }
      });
  }

  handleFileUpload(e) {
    const files = e.target.files;
    let promise = Promise.resolve();
    for (let i = 0; i < files.length; i++) {
      promise = promise.then(() => {
        return this.uploadToDirectory(files[i], this.props.directory.id);
      })
    }
  }

  getNewResourceData(id) {
    return this.props.client.query({
      query: queryAboutNewResource,
      fetchPolicy: 'no-cache',
      variables: {
        id: id
      }
    })
      .then(({data}) => {
        return data.resource
      })
  }

  deleteElement = id => {
    let arr = [...this.state.resources];
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].id === id) {
        arr.splice(i, 1)
      }
    }
    this.setState({resources: arr})
  };

  onSortEnd({oldIndex, newIndex}) {
    let newResArray = arrayMove(this.state.resources, oldIndex, newIndex);
    for (let i = 0; i < newResArray.length; i++) {
      newResArray[i].order = i+1;
    }
    this.setState({resources: newResArray})
    let arrOfOrders = [];

    for (let i = 0; i < newResArray.length; i++) {
      let elem = {};
      elem.resourceId = newResArray[i].id;
      elem.order = newResArray[i].order;
      arrOfOrders.push(elem);
    }
    this.props.client.query({
      query: querySaveOrders,
      fetchPolicy: 'no-cache',
      variables: {
        id: this.props.directory.id,
        newOrders: arrOfOrders
      }
    })
      .then(({data}) => {
        console.log(data)
      })
      .catch(error => {
        console.log(error)
      })
  }

  getClassesForDate() {
    return (this.state.resources.length === 0) ? "hidden" : " "
  }

  getLastUpdate() {
    let dates = [];
    for (let i=0; i < this.state.resources.length; i++) {
      dates[i] = +this.state.resources[i].updatedAt;
    }
    return moment(Math.max(...dates)).format('LL')
  }

  getClassForAddElement() {
    return (this.state.resources.length >= this.props.directory.capacity) ? "hidden" : " "
  }

  render() {
    const DragHandle = SortableHandle(() =>
        <img src={move_icon} className="move-icon" alt="move+icon"/>
      );

    const SortableItem = SortableElement(({resource}) => {
      const metaData = JSON.parse(resource.metaData);
      return <ResourseCard
        dragHandle={DragHandle}
        resourcename={resource.name}
        resourcegeotag={metaData.geotag ? metaData.geotag : null}
        resourceurl={resource.preview.url}
        size={metaData.size / (1024 * 1024)}
        dataid={resource.id}
        deleteElement={this.deleteElement}
      />
    });

    const SortableList = SortableContainer(({resources}) => {
      return (
        <div id="sortable" className="farm-docs-loader-cards-box">
          {resources.map((resource, index) => (

            <SortableItem key={`item-${index}`} index={index} resource={resource}/>
          ))}
          <input type="file"
                 multiple
                 accept="image/jpeg,image/png"
                 className="upload-resource-input"
                 id="resource"
                 onChange={e => this.handleFileUpload(e)}/>
          <label htmlFor="resource">
            <div className={`farm-docs-loader-new-card  ${this.getClassForAddElement()}`}>
              <Icon className="material-icons md-48 md-dark" color="#FFB347"
                    icon="add_circle_outline"/>
              Add Resource
            </div>
          </label>
        </div>
      );
    });

    return (
      <div className="farm-docs-loader">
        <div className="farm-docs-loader-name">
                    <span>
                        Farm <span className="capitalize">{this.props.directory.name.toLowerCase()}</span>
                    </span>
        </div>
        <div className= {`farm-docs-loader-data-box ${this.getClassesForDate()}`}>
          <Icon className="material-icons md-24 md-dark more" color="lightgray" icon="event"/>
          <span className="farm-docs-loader-date">{this.getLastUpdate()}</span>
          <span className="farm-docs-loader-last-update">(last update)</span>
        </div>

        <SortableList axis={'xy'}
                      resources={this.state.resources}
                      onSortEnd={this.onSortEnd}
                      useDragHandle={true}/>


      </div>
    )
  }

}

export default withApollo(DirectoryEditor)
