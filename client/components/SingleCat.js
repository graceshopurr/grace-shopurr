import React , { Component} from 'react';
import {withRouter, Link} from 'react-router-dom'
import store from '../store';
import { fetchCatById } from '../store/cat'

export default class SingleCat extends Component{
	constructor(){
		super();
		this.state = store.getState();
	}

	//unable to figure out how call fetchCatById

	render(){
		console.log(this.state);
		const catId = this.props.match.params.catId;
		const cat = this.state.cat.filter( cat => cat.id == catId)[0];
		console.log(cat);
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

