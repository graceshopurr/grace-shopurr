import {React, Component} from 'react';
import {withRouter, Link} from 'react-router-dom'
import axios from 'axios';


export default class SingleProduct extends Component {
	constructor(){
		super();
		this.state = {
			product : {}, 
			quantity: 0;
		}

		this.plus = this.plus.bind(this);
		this.minus = this.minus.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	fetchProduct(productId){
		axios.get(`/api/products/${productId}`)
			.then( res => res.data)
			.then( product => {
				this.setState({ product })
			})
	}


//add inventory checks from store when we've worked out INVENTORY! 
	plus(){
		//if inventory check passes -- else disable button 
		this.setState({quantity:quantity++});

	}

	minus(){
		if (this.state.quantity > 0){
			this.setState({quantity:quantity--});
		}else{
			alert("That's not an amount, silly!"); //probably get rid of this, just illustrating the logic
		}
	}

	handleSubmit(e){
		e.preventDefault();
		//update cart logic here! 
	}
	componentDidMount(){
		const productId = this.props.match.params.productId;
		this.fetchProduct(productId);
	}
//product imageURL field does not currently exist but i'm writing this render as thought it does 
	render(){
		const product = this.state.product;

		return (
			<div>
				<h3>{ product.name }</h3>
				<img src={ product.imageURL } />
				<span>${product.dollarPrice()}<span> 
				<p>{ product.description }</p>
				<button type="submit" className="btn btn-primary" onSubmit={this.handleSubmit}>Buy our Kitties a { product.name } </button> 
				<button className="btn btn-success" onClick={this.plus}>+</button><span>{this.state.quantity}</span><button className="btn btn-danger" onClick={this.minus}>-</button>

			</div>

			)
	}
}