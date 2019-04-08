import React from 'react';
import './MenuFooter.css';

class MenuFooter extends React.Component {
	constructor(props){
		super(props);
	}

	render() {
		const items = this.props.items.map((item, key) => <a href={item.link} key={key}><span>{item.body ? item.body : item.text}</span></a>);

		return (
		<div className={"navigation"}>
			<h2>{this.props.name}</h2>
			{items}
		</div>
		)
	}
}

export default MenuFooter;
