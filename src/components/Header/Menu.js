import React from 'react';
import './Menu.css';

class Menu extends React.Component {
  render() {
      const items = this.props.items.map((item, key) =>  <a href="#" key={key}><li>{item}</li></a>)
      return (
          <ul className={this.props.font_size_class}>
            {items}
          </ul>
      )
  }
}

export default Menu;
