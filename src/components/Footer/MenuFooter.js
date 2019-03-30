import React from 'react';
import './MenuFooter.css';

class MenuFooter extends React.Component {
  render() {
    return (
        <div className="navigation">
			<h2>Navigation</h2>
			<a href="#"><span className="navigation_item">About Us</span></a>
			<a href="#"><span className="navigation_item">News</span></a>
			<a href="#"><span className="navigation_item">Support</span></a>
		</div>
    );
  }
}

export default MenuFooter;
