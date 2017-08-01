import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

class AllProducts extends Component {

  constructor (props) {
    super(props);
    this.state = {
      filter: 'none'
    };
    this.handleFilter = this.handleFilter.bind(this);
    this.compare = this.compare.bind(this);
  }

  handleFilter (event) {
    this.setState({filter: event.target.value});
  }

  compare (a, b) {
    return a.price - b.price;
  }

  render() {
    // const products = this.props.product.productList;
    let products = this.props.product.productList;
    if (this.state.filter === 'low') products = products.sort(this.compare);
    if (this.state.filter === 'high') products = products.sort(this.compare).reverse();

    return (
      <div className="AllProducts">
        <h3>Support Our Kitties!!!</h3>

        <p>
          Want to show love for our cats, even if you can’t bring one of them home with you? You can show your support by buying much-needed supplies for our shelter. This way, you know exactly how your donations are helping our Kitties.
        </p>
        &nbsp; Sort: &nbsp;
        <button type="button" className='btn btn-primary' value="low" onClick={this.handleFilter}>Price: Low to High</button> &nbsp;
        <button type="button" className='btn btn-primary' value="high" onClick={this.handleFilter}>Price: High to Low</button> &nbsp;
        <hr />
        <div className="row">
          {
            products.map(product => (
              <figure className="col-xs-4" key={product.id}>
                <Link to={`/products/${product.id}`}>
                  <img src={ product.imageURL } />
                  <figcaption className="caption">
                    <h5>{product.name}</h5>
                    <span>{product.dollarPrice}</span>
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
  product: state.product
});

const mapDispatch = null; //for future use?

export default connect(mapState, mapDispatch)(AllProducts);
