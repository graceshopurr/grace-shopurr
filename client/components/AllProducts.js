import React, { Component } from 'react';
import axios from 'axios';


export default class AllProducts extends Component {

  constructor () {
    super();
    this.state = {
      products: []
    };
  }

  componentDidMount () {
    axios.get('/api/products')
      .then(res => res.data)
      .then(products => this.setState({ products }));
  }

  render () {

    const products = this.state.products;

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
                                    <small>{product.songs.length} songs</small>
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
