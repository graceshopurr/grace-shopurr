import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

class AllCats extends Component {

	constructor(props){
		super(props);
	}

	render(){
		const cats = this.props.cat.catList;
		return (
			<div className="AllCats">
		    <h3>Our Cats</h3>
				<div className="row">
					{
						cats.map(cat => (
						  <figure className="col-xs-4" key={ cat.id }>
						    <Link className="thumbnail" to={`/cats/${cat.id}`}>
						      <img src={ cat.imageURL } alt="{ cat.name } the cat" />
						      <figcaption className="caption">
						        <h5>{ cat.name }</h5>
						    	 {cat.status === 'adopted' ? <span className="label label-primary">{cat.status}</span> : <span className="label label-success">{cat.status}</span>}
						      </figcaption>
						    </Link>
						  </figure>
						))
					}
				</div>
			</div>
		);
	}
}

const mapState = (state) => ({
	cat: state.cat
});

const mapDispatch = null;

export default connect(mapState, mapDispatch)(AllCats);
