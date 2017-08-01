import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom'

import { fetchCartProduct,fetchCartCat, fetchOrders } from '../store/cart';



class Cart extends Component{
	constructor(props){
		super(props);
	}
	componentDidMount(){

	}

	render(){
		return(



			)
	} 
}

const mapState = (state) => ({

})
// const Cart = (props) => {

// 	var cart = [{name: 'thing'}, {name: 'thing'}, {name: 'thing'}, {name: 'thing'}]
// 	//make sure to add cart route 

// 	//check if items are in the cart 
// 	const hasItemsInCart = false  //products.length > 0;

// 	// condition rendering on whether items are in the cart or not 
// 	const cartItems = hasItemsInCart ?
// 		cart.map((item, idx) => (
// 			<div key={idx} className="panel panel-default">
// 				<div className="panel-body">
// 					Items for cart
// 					Name: {item.name}
// 				</div>
// 			</div>
// 		)
// 	) : (
// 		<h4> There are currently no items in your cart! </h4>
// 	)

// 	return (
// 		<div>
// 			<h3> Your Cart: </h3>
// 			<div> {cartItems} </div>
// 			<p> Total: </p>
// 			<Link to="/checkout"> <button type="button" className="btn btn-default">CHECKOUT</button> </Link >
// 		</div>
// 	)
// }



export default Cart;
 