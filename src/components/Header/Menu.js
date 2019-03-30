import React from 'react';
import './Menu.css';

class Menu extends React.Component {
  render() {
    const menus = [
        "Home",
        "About Us",
        "News",
        "Documtation"
      ]
    return <ul className="menu_items">
        {menus.map((value)=>{
         return <li>{value}</li>   
        })}
    </ul>
  }
}

export default Menu;
