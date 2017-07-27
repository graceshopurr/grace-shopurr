import {React, Component} from 'react';
import {withRouter, Link} from 'react-router-dom'
import axios from 'axios';


export default class AllCats extends Component  {
	constructor(){
		super();
		this.state = {
			cats: []
		}
	}

	componentDidMount(){
		axios.get('/api/cats')
		.then( res => res.data)
		.then( cats => {
			this.setState({ cats });
		})

	}

	render(){
		const cats = this.state.cats; 
		return (
			<div>
		      <h3>Our Cats</h3>
		      <div className="row">
		        {
		          cats.map(cat => (
		            <div className="col-xs-4" key={ cat.id }>
		              <Link className="thumbnail" to={`/cats/${cat.id}`}>
		                <img src={ cat.image } />
		                <div className="caption">
		                  <h5>
		                    <span>{ cat.name }</span>
		                  </h5>
		              	 {cat.status === 'adopted'? <span className="label label-primary">{cat.status}</span> : <span className="label label-success">{cat.status}</span>}
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