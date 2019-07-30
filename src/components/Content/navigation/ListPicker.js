import React from 'react';
import './ListPicker.css';

class ListPicker extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      list: []
    };
    props.provider
      .then(list => {
        this.setState({list})
      });
    this.changeValue = this.changeValue.bind(this);
    this.getOption = this.getOption.bind(this);
  }

  getOption(value) {
    let options = [];
    options.push(<option disabled>{`Select ${this.props.listName}...`}</option>);
    for (let i = 0; i < this.state.list.length; i++) {
      options.push(
        <option key={i + 1}
                selected={this.state.list[i][value] === this.props.selectedItem ? 'selected' : ''}
                value={this.state.list[i][value]}>
          {this.state.list[i].name}
        </option>
      )
    }
    return options
  }

  changeValue(e) {
    this.props.onChangeItem(e);
  }

  render() {
    return (
      <div className="listpicker-box">
        {console.log(this.props)}
        <span className="form-fields-name">{this.props.listName}</span>
        <select className="listpicker-select"
                name={this.props.nameForUpdate}
                onChange={this.changeValue}>
          {this.getOption(this.props.compareValue)}
        </select>
      </div>
    )
  }
}

export default ListPicker
