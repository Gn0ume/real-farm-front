import React from 'react';
import './Logo.css';

class Logo extends React.Component {
  render() {
    return (
        <div className="logo">
            <a href="#">
                <img src="img/farmer.png" alt="farmer" />
				<span className="logo_text">REAL<br/>FARM</span>
            </a>	
        </div>
    );
  }
}

export default Logo;
