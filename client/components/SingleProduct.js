import React, { Component } from 'react';
import { connect } from 'react-redux';
import {withRouter, Link} from 'react-router-dom';
import { fetchSingleProduct, incrementProduct, makeCartOnLocalStorage, decrementProduct } from '../store';


class SingleProduct extends Component {
	constructor(props){
		super(props);
		this.state = {
			quantity: 0
		};

		this.plus = this.plus.bind(this);
		this.minus = this.minus.bind(this);
		this.addProductToCart = this.addProductToCart.bind(this);
		this.createNewCart = this.createNewCart.bind(this);

	}

	componentDidMount() {
		let productId = this.props.match.params.productId;
		this.props.loadData(productId);

	}

//add inventory checks from store when we've worked out INVENTORY!
	plus(){
		//if inventory check passes -- else disable button
		let productId = this.props.match.params.productId;
		this.setState({quantity: this.state.quantity + 1});
		this.props.addProduct(productId);
	}

	minus(){
		let productId = this.props.match.params.productId;
		if (this.state.quantity > 0){
			this.setState({quantity: this.state.quantity - 1});
			this.removeProduct(productId)
		}else{
			alert("That's not an amount, silly!"); //probably get rid of this, just illustrating the logic
		}
	}


	createNewCart(){
		let productId = this.props.match.params.productId;
		this.props.createCart(productId);
	}

	addProductToCart (){
		let productId = this.props.match.params.productId;
		this.props.addProduct(productId);
	}


	render(){
		// const productId = this.props.match.params.productId;
		// const product = this.props.product.productList.filter( p => Number(p.id) === Number(productId))[0];
		const product = this.props.product.singleProduct;

		let newCart = true;
		  if (localStorage.cart){
			  newCart = false
		  }

		return (product) ? (
			<div class="SingleProduct col-lg-9 offset-lg-3">
				<h3> { product.name } </h3>
				<img src={ product.imageURL } />
				<br />
				<span>${product.dollarPrice}</span>
				<br />
				<p>{ product.description }</p>
				<button type="submit" className="btn btn-primary" onClick={newCart ? this.createNewCart : this.addProductToCart }>Buy our Kitties a { product.name } </button>
				<button className="btn btn-success" onClick={this.plus}>+</button><span>{this.state.quantity}</span><button className="btn btn-danger" onClick={this.minus}>-</button>
			</div>
			) : (<div />);
	}
}

const mapState = (state) => ({
  product: state.product
});

const mapDispatch = (dispatch) => {
	return {
		loadData(productId) {
			dispatch(fetchSingleProduct(productId));
		},
		addProduct(productId) {
			console.log("in add cat");
			dispatch(incrementProduct(productId))
		},
		createCart(productId){
			console.log('in create cart')
			dispatch(makeCartOnLocalStorage());
			dispatch(incrementProduct(productId));
		},
		removeProduct(productId){
			dispatch(decrementProduct());
		}
	}
};

export default connect(mapState, mapDispatch)(SingleProduct);
