import React from 'react';
import './SectionName.css';
import file from '../../img/icons/file.svg'

class SectionName extends React.Component {
  render() {
    return(
      <div className="part-name-container">
        <img src={file} alt=""/>
        <span className="part-name">{this.props.partName}</span>
      </div>
    )
  }
}

export default SectionName