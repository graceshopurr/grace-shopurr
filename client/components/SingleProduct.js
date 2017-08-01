import React, { Component } from 'react';
import { connect } from 'react-redux';
import {withRouter, Link} from 'react-router-dom';
import { fetchSingleProduct } from '../store';


class SingleProduct extends Component {
	constructor(props){
		super(props);
		this.state = {
			quantity: 0
		};

		this.plus = this.plus.bind(this);
		this.minus = this.minus.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
		let productId = this.props.match.params.productId;
		this.props.loadData(productId);
	}

//add inventory checks from store when we've worked out INVENTORY!
	plus(){
		//if inventory check passes -- else disable button
		this.setState({quantity: this.state.quantity + 1});
	}

	minus(){
		if (this.state.quantity > 0){
			this.setState({quantity: this.state.quantity - 1});
		}else{
			alert("That's not an amount, silly!"); //probably get rid of this, just illustrating the logic
		}
	}

	handleSubmit(e){
		e.preventDefault();
		//update cart logic here!
	}

	render(){
		// const productId = this.props.match.params.productId;
		// const product = this.props.product.productList.filter( p => Number(p.id) === Number(productId))[0];
		const product = this.props.product.singleProduct;

		return (product) ? (
			<div>
				<h3> { product.name } </h3>
				<img src={ product.imageURL } />
				<br />
				<span>${product.dollarPrice}</span>
				<br />
				<p>{ product.description }</p>
				<button type="submit" className="btn btn-primary" onSubmit={this.handleSubmit}>Buy our Kitties a { product.name } </button>
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
		}
	};
};

export default connect(mapState, mapDispatch)(SingleProduct);





