import React from 'react';
import './Header.css';
import Logo from './Logo';
import Menu from './Menu';
import Button from './Button';

class Header extends React.Component {
  render() {
    return (
      <header>
			<Logo />
			<div className="menu">
				<Menu />
				<Button />
				<Button />
            </div>
	</header>
    );
  }
}

export default Header;
