import React, { Component } from 'react';
import {withRouter, Link} from 'react-router-dom'
import store from '../store';



export default class AllProducts extends Component {

  constructor () {
    super();
    this.state = store.getState()
  }

    render() {

        const products = this.state.product;
        console.log(this.state);

        return (
            <div>
                <h3>Support Our Kitties!!!</h3>
                <br />
                <p> 
                    Want to show love for our cats, even if you can't bring one of them home with you? You can show your support by buying much-needed supplies for our shelter.  This way, you know exactly how your donations are helping our Kitties.
                </p>
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
                                        <span>${product.dollarPrice}</span>
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

//maybe add description of the page
//check out getter method working
// <span>${product.dollarPrice()}</span>
