import React from 'react';
import './Header.css';
import Logo from './Logo';
import Menu from './Menu';

class Header extends React.Component {
  render() {
    return (
      <header>
		<Logo element_class={"logo_header"}/>
		<div className="menu">
			<Menu items={["Home", "About Us", "News", "Documentation"]} />
			<button id="header_sign_in" className="reg_buttons">sing in</button>
			<button id="header_register" className="reg_buttons">register</button>
		</div>
	</header>
    );
  }
}

export default Header;
