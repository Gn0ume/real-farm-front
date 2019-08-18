import React from 'react';
import './Logo.css';
import farmer from '../../img/farmer.png';
import {connect} from "react-redux";

class Logo extends React.Component {
  render() {
    return (
        <div className={this.props.element_class}>
            <a href={`/${this.props.globalLanguage}`}>
                <img src={farmer} alt="farmer" />
				<span className="logo_text">REAL<br/>FARM</span>
            </a>	
        </div>
    );
  }
}

const putStateToProps = (state) => {
  return {
    globalLanguage: state.globalLanguage
  }
};

export default connect(putStateToProps)(Logo);
