import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AdminProductForm from './AdminProductForm';
import { createProduct, changeProduct, fetchSingleProduct } from '../store/product.js';
import store from '../store';

/* -------------- COMPONENT -------------- */

function HOAdminProductForm(Component, thunkCreator) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        productId: null,
        productToEdit: null,
        formProduct: {}
      }
      this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
      // console.log('this.props: ', this.props);
      // console.log('this.props.match.params.productId:', this.props.match.params.productId);
      if(this.props.match.params.productId) {
        this.state.productId = this.props.match.params.productId;
        // console.log('Component did mount. this.state:', this.state);
      }
      store.dispatch(fetchSingleProduct(this.state.productId));
    }

    componentWillReceiveProps(nextProps) {
      // console.log('nextProps: ', nextProps);
      if(nextProps.singleProduct !== this.props.singleProduct) {
        this.setState({
          formProduct: nextProps.singleProduct
        })
      }
    }

    handleChange(evt) {
      this.setState({
        formProduct: {[evt.target.name]: evt.target.value}
      })
    }

    render() {
      return (
        <Component handleSubmit={ this.handleSubmit } handleChange={ this.handleChange } formProduct={ this.state.formProduct } { ...this.props } />
      )
    }
  }
}

/* -------------- CONTAINER --------------
 We have two different sets of 'mapStateToProps' and 'mapDispatchToProps'functions—one for Change, and one for
 Create. They share the same form component, AdminProductForm.
*/
const mapAddProduct = (state) => {
  return {
    name: 'createProduct',
    displayName: 'Add product',
    error: state.product.singleProduct.error
  };
};

const mapEditProduct = (state) => {
  // console.log('state:', state)
  return {
    name: 'changeProduct',
    displayName: 'Edit product',
    error: state.product.singleProduct.error,
    singleProduct: state.product.singleProduct || {}
  };
};

const mapDispatchAdd = (dispatch) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const name = evt.target.productName.value;
      const description = evt.target.productDescription.value;
      const price = Number.parseInt(evt.target.productPrice.value);
      const inventory = Number.parseInt(evt.target.productInventory.value);
      const imageURL = evt.target.productImageURL.value;
      const newProduct = { name, description, price, inventory, imageURL };
      dispatch(createProduct(newProduct));
      // Need to do state.setState({formProduct: {}}); and then redirect somewhere.
    }
  };
};

const mapDispatchEdit = (dispatch) => {
  return {
    handleSubmit(evt, productId) {
      evt.preventDefault();
      const name = evt.target.productName.value;
      const description = evt.target.productDescription.value;
      const price = Number.parseInt(evt.target.productPrice.value);
      const inventory = Number.parseInt(evt.target.productInventory.value);
      const imageURL = evt.target.productImageURL.value;
      const changedProduct = { name, description, price, inventory, imageURL };
      dispatch(changeProduct(productId, changedProduct));
      // Need to do state.setState({formProduct: {}}); and then redirect somewhere.
    }
  };
};

export const AddProduct = connect(mapAddProduct, mapDispatchAdd)(HOAdminProductForm(AdminProductForm, createProduct));
export const EditProduct = connect(mapEditProduct, mapDispatchEdit)(HOAdminProductForm(AdminProductForm, changeProduct));
