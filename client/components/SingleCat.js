import React, { Component} from 'react';
import { connect } from 'react-redux';

class SingleCat extends Component{
	constructor(props){
		super(props);
	}

	render(){
		console.log(this.props);
		const catId = this.props.match.params.catId;
		const cat = this.props.cat.filter(cat => cat.id.toString() === catId.toString())[0];
		return (
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
		)
	}
}

const mapState = (state, ownProps) => ({
	//const paramId = Number(ownProps.match.params.id);
	// return {
	cat: state.cat
	// }
});

const mapDispatch = null;

export default connect(mapState, mapDispatch)(SingleCat);

