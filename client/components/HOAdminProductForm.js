import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AdminProductForm from './AdminProductForm';
import { createProduct, changeProduct, fetchProductsById } from '../store/product.js';
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
      if(this.props.match.params.productId) {
        this.productId = this.props.match.params.productId;
        store.dispatch(fetchProductsById(this.productId));
      }
    }

    componentWillReceiveProps(nextProps) {
      if(nextProps.product !== this.props.product) {
        this.setState({
          formProduct: nextProps.product
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
    error: state.product.error
  };
};

const mapEditProduct = (state) => {
  return {
    name: 'changeProduct',
    displayName: 'Edit product',
    error: state.product.error,
    product: state.product.product || {}
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
