import React from 'react';
import './LogoFooter.css';


class LogoFooter extends React.Component {
  render() {
    return (
        <div className="logo_footer">
			<a href="#">
				<img src="img/farmer_b&w.png" alt="farmer" />
				<span className="logo_text">REAL<br/>FARM</span>
			</a>
			<span className="logo_footer_text">Copyright &copy 2019 www.real.farm</span>
			<span className="logo_footer_text">All rights reserved.</span>
		</div>
    );
  }
}

export default LogoFooter;
