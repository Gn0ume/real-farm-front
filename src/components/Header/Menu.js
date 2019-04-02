import React from 'react';
import './Menu.css';

class Menu extends React.Component {
  render() {
      const items = this.props.items.map((item, key) =>  <a href="#" key={key}><li>{item}</li></a>)
      return (
          <ul className="menu_items">
            {items}
          </ul>
      )
  }
}

export default Menu;
