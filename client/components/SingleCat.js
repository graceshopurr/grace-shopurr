import React, { Component} from 'react';
import { connect } from 'react-redux';

class SingleCat extends Component{

	constructor(props){
		super(props);
	}
	componentDidMount() {
		props.getCatById(match.params.catId)
	}
	render(){
		const catId = this.props.match.params.catId;
		const cat = this.props.cat //this.props.cat.cats.filter(c => Number(c.id) === Number(catId))[0];

			return (cat) ? (
		   <div className='singlecat'>
				<h3>{ cat.name }</h3>
				<img src={ cat.imageURL } className="singlecat-img img-thumbnail" />
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
	cat: state.cat.selectedCat
});

const mapDispatch = (dispatch) => ({
	getCatById: (id) => dispatch(getCatById(id))
});

export default connect(mapState, mapDispatch)(SingleCat);
