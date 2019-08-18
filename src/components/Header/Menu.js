import React from 'react';
import './Menu.css';
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";

class Menu extends React.Component {
  render() {
      const items = this.props.items.map((item, key) => <NavLink exact={true} to={`/${this.props.globalLanguage}${item.link}`} activeClassName='active' key={key}>{item.text}</NavLink>);
      return (
          <ul className={this.props.font_size_class}>
            {items}
          </ul>
      )
  }
}

const putStateToProps = (state) => {
  return {
    globalLanguage: state.globalLanguage
  }
};

export default connect(putStateToProps)(Menu);
