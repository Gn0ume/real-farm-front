import React from 'react';
import './Logo.css';
import farmer from '../../img/farmer.png';

class Logo extends React.Component {
  render() {
    return (
        <div className={this.props.element_class}>
            <a href="#">
                <img src={farmer} alt="farmer" />
				<span className="logo_text">REAL<br/>FARM</span>
            </a>	
        </div>
    );
  }
}

export default Logo;
