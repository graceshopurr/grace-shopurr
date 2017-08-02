import React, { Component} from 'react';
import { connect } from 'react-redux';
import { fetchSingleCat, fetchReviewList, incrementCat, makeCartOnLocalStorage } from '../store';
import Review from './Reviews';
import ReviewForm from './ReviewForm';

class SingleCat extends Component{

	constructor(props){
		super(props);
		this.state = {
			toggleReview: false
		}
		this.toggleReviewForm = this.toggleReviewForm.bind(this);
		this.addCatToCart = this.addCatToCart.bind(this);
		this.createNewCart = this.createNewCart.bind(this);
	}

	componentDidMount() {
		let catId = this.props.match.params.catId;
		this.props.loadData(catId);
	}

	toggleReviewForm () {
		this.setState({toggleReview: !this.state.toggleReview});
	}

	createNewCart(){
		let catId = this.props.match.params.catId;
		this.props.createCart(catId);
	}

	addCatToCart (){
		let catId = this.props.match.params.catId;
		this.props.addCat(catId);
	}

	render(){
		 const cat = this.props.cat.singleCat;
		 const reviews = this.props.review.reviewList;
		 const {isLoggedIn} = this.props;
		//   const addedCatIds = this.props.cart.addedCatIds;

		  
		 let newCart = true;
		  if (localStorage.cart){
			  newCart = false
		  }

			return (cat && reviews) ? (
			 <div className = "single-cat">
		   <div className="single-flex">
		   	<div className="single-cat-1">
					<h3>{ cat.name }</h3>
					<img src={ cat.imageURL } className="img-thumbnail" />
				</div>
				<div className="single-cat-2">
				<span>
					Status: <span className="label label-default">{cat.status} </span>
				</span> <br />
				<span>
					Age: <span className="label label-default"> {cat.age} </span>
				</span> <br />
				<span>
					Gender: <span className="label label-default"> {cat.gender} </span>
				</span>
				<br />
				<b>Who am I?</b>
				<br />
				<span>{ cat.description }</span>
				<br />
				{(cat.status === 'available') ? <button type="button" onClick={newCart ? this.createNewCart : this.addCatToCart } className="btn btn-primary">Adopt Me!</button>:null}
					</div>
				</div>
				<hr />
				<h3> Reviews </h3>
			 { isLoggedIn ? <div>
				<p> Have you interacted with this cat? <button type="button" className="btn btn-primary" onClick={this.toggleReviewForm}>Write Review</button>
				</p>
				{this.state.toggleReview ? <ReviewForm catId={cat.id} /> : null}
				</div> : null }
					{reviews.map( review => (
           <Review key={review.id} singleReview={review} />
           ))}
			</div>
			) : (<div />);

	}
}

const mapState = (state) => ({
	cat: state.cat,
	review: state.review,
	isLoggedIn: !!state.user.id
});

const mapDispatch = (dispatch) => {
	return {
		loadData(catId) {
			dispatch(fetchSingleCat(catId));
			dispatch(fetchReviewList(catId));
		}, 
		addCat(catId) {
			console.log("in add product");
			dispatch(incrementCat(catId))
		},
		createCart(catId){
			console.log('in create product')
			dispatch(makeCartOnLocalStorage());
			dispatch(incrementCat(catId));
		}
	};
};

export default connect(mapState, mapDispatch)(SingleCat);



