import React from 'react';
import './Menu.css';
import {Link} from "react-router-dom";

class Menu extends React.Component {
  render() {
      const items = this.props.items.map((item, key) => <Link to={item.link} key={key}>{item.text}</Link>);
      return (
          <ul className={this.props.font_size_class}>
            {items}
          </ul>
      )
  }
}

export default Menu;
