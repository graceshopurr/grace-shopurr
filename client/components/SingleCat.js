import React, { Component} from 'react';
import { connect } from 'react-redux';
import { fetchSingleCat } from '../store';

class SingleCat extends Component{

	constructor(props){
		super(props);
	}

	componentDidMount() {
		let catId = this.props.match.params.catId;
		this.props.loadData(catId);
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
				{(cat.status === 'available') ? <button type="button" className="btn btn-warning">Adopt Me!</button>:null}
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
		}
	};
};

export default connect(mapState, mapDispatch)(SingleCat);
