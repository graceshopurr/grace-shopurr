import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

class SearchResults extends Component {

  constructor(props){
    super(props);
  }

  componentDidMount() {
    const query = this.props.match.params.query;
    console.log(query);
  }

  render(){
    const query = this.props.match.params.query;
    const cats = this.props.cat.catList.filter(cat => cat.name.toLowerCase().includes(query) );
    const products = this.props.product.productList.filter(product => product.name.toLowerCase().includes(query) );
    return (
      <div className="SearchResults">
      <h2> Search Results: </h2>
      <hr />
        <h3>Cats</h3>
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
        <hr />
        <h3> Donations </h3>
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
  cat: state.cat,
  product: state.product
});

const mapDispatch = null;

export default connect(mapState, mapDispatch)(SearchResults);

