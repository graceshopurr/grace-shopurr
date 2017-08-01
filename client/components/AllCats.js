import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

class AllCats extends Component {

	constructor(props){
		super(props);
		this.state = {
			filter: ['available', 'adopted', 'all']
		};
		this.handleFilter = this.handleFilter.bind(this);
	}

	handleFilter (event){
		if (event.target.value === 'all') this.setState({filter: ['available', 'adopted', 'all']});
		else this.setState({filter: [event.target.value]});
	}

	render(){
		let cats = this.props.cat.catList;
		cats = cats.filter(cat => this.state.filter.includes(cat.status));
		return (
			<div className="AllCats">
		    <h3>Our Cats</h3>
		    <p>  &nbsp; Filter: &nbsp;
		    <button type="button" className='btn btn-primary' value="all" onClick={this.handleFilter}>All</button> &nbsp;
		    	<button type="button" className='btn btn-primary' value="available" onClick={this.handleFilter}>Available</button> &nbsp;

		    	<button type="button" className='btn btn-primary' value="pending" onClick={this.handleFilter}>Pending</button> &nbsp;

		    	<button type="button" className='btn btn-primary' value="adopted" onClick={this.handleFilter}>Adopted</button>
		    </p>
		    <hr />
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
