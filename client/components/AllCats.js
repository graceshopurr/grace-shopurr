import React, {Component} from 'react';
import { connect } from 'react-redux';
import {withRouter, Link} from 'react-router-dom';

class AllCats extends Component  {

	constructor(props){
		super(props);
	}

	render(){
		 const cats = this.props.cat;
		return (
			<div>
		      <h3>Our Cats</h3>
		       <div className="row">
		         {
		          cats.map(cat => (
		            <div className="col-xs-4" key={ cat.id }>
		              <Link className="thumbnail" to={`/cats/${cat.id}`}>
		                <img src={ cat.imageURL } />
		                <div className="caption">
		                  <h5>
		                    <span>{ cat.name }</span>
		                  </h5>
		              	 {cat.status === 'adopted' ? <span className="label label-primary">{cat.status}</span> : <span className="label label-success">{cat.status}</span>}
		                </div>
		              </Link>
		            </div>
		          ))
		        }
		      </div>
    		</div>
			)
	}
}

const mapState = (state) => ({
	cat: state.cat
});

const mapDispatch = null;

export default connect(mapState, mapDispatch)(AllCats);


