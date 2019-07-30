import React from 'react';
import folder from '../../../img/icons/folder.svg';
import './CategoryPicker.css';

class CategoryPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentWillMount() {
    this.setState({...this.props.categories});
  }

  toggle(event) {
    if (this.state.children.length === 0) {

    }
    this.setState({isOpened: !this.state.isOpened})
  }

  getChildren(children) {
    let allChildren = [];
    for (let i = 0; i < children.length; i++) {
      allChildren[i] =

      <CategoryPicker
     categories={children[i]}
      />
    }
    return allChildren;
  }

  render() {
    const folders = this.state;
    return(
      <div>
        {console.log("State of ", folders.name, "= ", this.state)}
        {folders.name !== "ROOT" &&
        <div className="filter-item"  onClick={(event) => this.toggle(event)}>
          <img src={folder} alt=""/>
          <span>{folders.name}</span>
        </div>
        }
        {
            folders.children !== undefined &&
            <ul>
            {this.getChildren(folders.children)}
          </ul>
        }


      </div>

    )
  }
}

export default CategoryPicker