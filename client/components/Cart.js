import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux';

import { fetchCartProduct,fetchCartCat, fetchOrders } from '../store/cart';



class Cart extends Component{
	constructor(props){
		super(props);
	}

	componentDidMount(){

		const helper = (userId = null) => {
			if (userId){
				this.props.fetchOrders(userId);
			}
			this.props.fetchCartProduct();
			this.props.fetchCartCat();
		}

// conditional if local storage cart has user id, then run all three, 
//otherwise just run the two, set on state 
// FOR NOW (because we are running out of time), we are leaving combining the DB orders alone, and will work with the localStorage display items
		if (localStorage.cart){
			let theCart = JSON.parse(localStorage.cart); 
			let userId = theCart.userId; 	
			helper(userId);
		} else {
			helper();
		}
	}

	// function organizeData(){}

	render(){
		// console.log('THE PROPS', this.props)
	//make sure to add cart route 

	//check if items are in the cart 
	let hasItemsInCart = false  //products.length > 0;

	if (localStorage.cart){
		let theCart = JSON.parse(localStorage.cart); 
		if (theCart.addedCatIds.length > 0 || theCart.addedProductIds.length > 0){
			hasItemsInCart = true;
		}
	}

	// console.log("dataCats", this.props.cart.dataCats);
	var catObj = this.props.cart.dataCats;
	console.log('data products!!!!', this.props.cart.dataProducts);
	var productArr = this.props.cart.dataProducts

	console.log('product array zero',productArr[0]);

	let newArray = [];
	let catObjArray = [];

	 catObj.forEach(cat => {
		for (let key in cat){
			 newArray.push(key)
		}
	})
	// console.log("NEWARRAY", newArray);
	
	for (let i = 0; i < catObj.length; i++){
		catObjArray.push(catObj[i][newArray[i]])
	}
	// console.log('cat obj arr', catObjArray)

	
	
	// console.log('THE PROPS ',this.props.cart);
	// condition rendering on whether items are in the cart or not 
	const cartItems = hasItemsInCart ?

	( 
	<div>
	<h4>HI I AM A CART I HAVE THINGS IN ME</h4>
		<h4> Cats You Want To Adopt </h4>
		{catObjArray.map(item => (
			(<div key={Math.random()}>
				<div>
					Name: {item.name}
					<br/>
					<img src={item.imageURL} />
				</div>
			</div>)
		)) }
		<h4> Products You Are Donating </h4> 
		{productArr.map(item => (
			(<div key={Math.random()}>
				<div>
					Name: {item.product.name}
					<br/>
					<img src={item.product.imageURL} />
					<br/>
					<span> Quantity: {item.quantity}</span>
				</div>
			</div>)
		)) }
	</div>
	) : (
		<h4> There are currently no items in your cart! </h4>
	)

		return (
			<div>
				<h3> Your Cart: </h3>
				<div> {cartItems} </div>
				<p> Total: </p>
				<Link to="/checkout"> <button type="button" className="btn btn-default">CHECKOUT</button> </Link >
			</div>
			)
	} 
}


const mapDispatch = {fetchCartProduct, fetchCartCat, fetchOrders}

const mapState = (state) => ({
	cart: state.cart
})

export default connect(mapState, mapDispatch)(Cart)


