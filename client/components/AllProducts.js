import React, { Component } from 'react';
import {withRouter, Link} from 'react-router-dom'
import store from '../store';

export default class AllProducts extends Component {

  constructor () {
    super();
    this.state = store.getState()
  }

  render () {

    const products = this.state.product.products;

    return (
        <div>
            <h3>Support Our Kitties!!!</h3>
            <div className="row">
                {
                    products.map(product => (
                        <div className="col-xs-4" key={product.id}>
                            <Link to={`/products/${product.id}`}>
                                <div className="caption">
                                    <h5>
                                        <span>{product.name}</span>
                                    </h5>
                                    <p>{product.description}</p>
                                    <span>$ {product.dollarPrice()} </span>
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
//maybe add description of the page and things 
//how to use the getter method of dollar price - to check 

