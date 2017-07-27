import {React, Component} from 'react';
import {withRouter, Link} from 'react-router-dom'
import axios from 'axios';


export default class SingleCat extends Component{
	constructor(){
		super();
		this.state = {
			cat: {}
		}
	}
	fetchCat(catId){
		axios.get(`/api/cats/${catId}`)
			.then( res => res.data)
			.then( cat => {
				this.setState({ cat });
			})
	}

	componentDidMount(){
		const catId = this.props.match.params.catId;
		this.fetchCat(catId);
	}

	render(){
		const cat = this.state.cat;
		return (
			<div>
				<h3>{ cat.name }</h3> 
				<img src={ cat.image } className="img-thumbnail" />
				<span>	
					Status: <span className="label label-default">{cat.status}</span>
				</span>
				<span>
					Age: <span className="label label-default"> {cat.age}</span>
				</span>
				<span>
					Gender: <span className="label label-default"> {cat.gender}</span>
				</span>
				<div>
					{ cat.specialNeeds ? <p background-color="ABE4FF">{cat.description}</p> : <p>{cat.description}</p>}
				</div> 
				{(cat.status === 'available')? <button type="button" className="btn btn-warning">Adopt Me!</button>:null}
			</div> 
			)
	}
}

