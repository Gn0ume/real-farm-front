import React from 'react';
import './MenuFooter.css';
import {Link} from "react-router-dom";

class MenuFooter extends React.Component {
	render() {
		const items = this.props.items.map((item, key) =>
			<Link to={item.link} key={key}><span>{item.body ? item.body : item.text}</span></Link>);
		return (
		<div className={"navigation"}>
			<h2>{this.props.name}</h2>
			{items}
		</div>
		)
	}
}

export default MenuFooter;
