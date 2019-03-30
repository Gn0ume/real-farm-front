import React from 'react';
import './Footer.css';
import LogoFooter from './LogoFooter';
import MenuFooter from './MenuFooter';

class Footer extends React.Component {
  render() {
    return (
        <footer>
            <LogoFooter />
            <MenuFooter />
            <MenuFooter />
            <MenuFooter />
            <MenuFooter />
        </footer>
    );
  }
}

export default Footer;
