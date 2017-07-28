import {React, Component} from 'react';
import {withRouter, Link} from 'react-router-dom'
import store from '../store';
import axios from 'axios';

export default class Order extends Component{
	constructor(){
		super();
		this.state = store.getState();
	}

	render(){
		const items = this.state.order.item
		const cats = this.state.order.cat //?????
		return (
			<div>
				<h3> Your Order </h3>
				{
					JSON.stringify(items) !== JSON.stringify([])? 
					items.map(item => <span>  {item.quantity} x {item.name}, at ${item.dollarPrice()} : ${item.quantity * item.dollarPrice()}) :
					<span>You have not ordered any items </span>
				}
				<h3>Cat Adoption </h3>
				{
					JSON.stringify(cats) !== JSON.stringify([])?
					cats.map(cat => <span> {cat.name}, age {cat.age}</span>)
				}
			<div> 
			)
	}

} 


