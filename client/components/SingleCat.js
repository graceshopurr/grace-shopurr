import React, { Component} from 'react';
import { connect } from 'react-redux';
import { fetchSingleCat, incrementCat, fetchCartCat } from '../store';

class SingleCat extends Component{

	constructor(props){
		super(props);
		this.addToCart = this.addToCart.bind(this);
	}

	componentDidMount() {
		let catId = this.props.match.params.catId;
		this.props.loadData(catId);
	}

	addToCart(){
		let catId = this.props.match.params.catId;
		this.props.addingCat(catId);
	}

	render(){
		const cat = this.props.cat.singleCat;

			return (cat) ? (
		   <div>
				<h3>{ cat.name }</h3>
				<img src={ cat.imageURL } className="img-thumbnail" />
				<br />
				<span>
					Status: <span className="label label-default">{cat.status} </span>
				</span>
				<span>
					Age: <span className="label label-default"> {cat.age} </span>
				</span>
				<span>
					Gender: <span className="label label-default"> {cat.gender} </span>
				</span>
				<br />
				Who am I?
				<br />
				<span>{ cat.description }</span>
				<br />
				{(cat.status === 'available') ? <button onClick={this.addToCart} type="button" className="btn btn-warning">Adopt Me!</button>:null}
			</div>
			) : (<div />);

	}
}

const mapState = (state) => ({
	cat: state.cat
});

const mapDispatch = (dispatch) => {
	return {
		loadData(catId) {
			dispatch(fetchSingleCat(catId));
		},
		addingCat(catId){
			console.log('in here', catId);
			dispatch(fetchCartCat())
			//dispatchs a thunk creators that takes data and then dispatches an action creator
			//the action creator will cause the reducer to update the state
	
			//dispatch an action creator that will tell the reducer to do something
		}
	};
};

export default connect(mapState, mapDispatch)(SingleCat);

