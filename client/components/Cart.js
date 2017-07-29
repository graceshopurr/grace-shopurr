import React, { Component } from 'react';
import {withRouter, Link} from 'react-router-dom'
import store from '../store';

export default class Cart extends Component{
	constructor(){
		super();
		this.state = store.getState();
	}

	render(){
		const cart = 
		return (
			    <div>
			      <h3>Your Cart</h3>
				  <button>
				  	Checkout
				  </button>
    			</div>

			)
	}
}