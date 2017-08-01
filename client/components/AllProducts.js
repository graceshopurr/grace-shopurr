import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

class AllProducts extends Component {

  constructor (props) {
    super(props);
  }

  render() {
    const products = this.props.product.products;
    // console.log('props here', this.props);

    return (
      <div className="AllProducts">
        <h3>Support Our Kitties!!!</h3>

        <p>
          Want to show love for our cats, even if you can’t bring one of them home with you? You can show your support by buying much-needed supplies for our shelter. This way, you know exactly how your donations are helping our Kitties.
        </p>

        <div className="row">
          {
            products.map(product => (
              <figure className="col-xs-4" key={product.id}>
                <Link to={`/products/${product.id}`}>
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
