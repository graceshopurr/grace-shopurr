import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import AdminProductForm from './AdminProductForm';
import { createProduct, changeProduct } from '../store/product.js';

/* --------- VALUES FOR TESTING ---------- */

// let props = {
//   displayName: 'Submit',
//   error: state.user.error,
//   existingRecord: {},
//   handleSubmit: function() {}
// };

/* -------- Misc. crap I'm not sure what to do with ---------- */

  // const {handleSubmit, error} = props;
  // const existingRecord = props.existingRecord ? props.existingRecord : {};
  // return (
  //   <AdminProductForm handleSubmit={handleSubmit} error={error} />
  // );

/* -------------- COMPONENT -------------- */

function HOAdminProductForm(Component, thunkCreator) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {};
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(evt) {
      this.setState({
        [evt.target.name]: evt.target.value
      })
    }

    handleSubmit(evt) {
      evt.preventDefault();
      console.log('this.state:', this.state);
      console.log('this.props:', this.props);
      const name = this.state.productName;
      const description = this.state.productDescription;
      const price = this.state.productPrice;
      const inventory = this.state.productInventory;
      const imageURL = this.state.productImageURL;
      store.dispatch(thunkCreator(name, description, price, inventory, imageURL));
      // this.setState({});
    }

    render() {
      return(
        <Component handleSubmit={this.handleSubmit} handleChange={this.handleChange} {...this.props} />
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
    error: state.product.error
  };
};

// It should be possible to combine the two dispatchers into a single one with a conditional, but I can't get my head around it right now. -IA
const mapDispatchEdit = (dispatch) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const productName = evt.target.productName.value;
      const productDescription = evt.target.productDescription.value;
      const productPrice = evt.target.productPrice.value;
      const productInventory = evt.target.productInventory.value;
      const productImageURL = evt.target.productImageURL.value;
      dispatch(changeProduct(productName, productDescription, productPrice, productInventory, productImageURL));
    }
  };
};

const mapDispatchAdd = (dispatch) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const productName = evt.target.productName.value;
      const productDescription = evt.target.productDescription.value;
      const productPrice = evt.target.productPrice.value;
      const productInventory = evt.target.productInventory.value;
      const productImageURL = evt.target.productImageURL.value;
      dispatch(createProduct(productName, productDescription, productPrice, productInventory, productImageURL));
    }
  };
};

export const EditProduct = connect(mapEditProduct, mapDispatchEdit)(HOAdminProductForm(AdminProductForm, changeProduct));
export const AddProduct = connect(mapAddProduct, mapDispatchAdd)(HOAdminProductForm(AdminProductForm, createProduct));

/* -------------- PROP TYPES -------------- */

// HOAdminProductForm.propTypes = {
//   error: PropTypes.object,
//   existingRecord: PropTypes.object,
//   handleSubmit: PropTypes.func.isRequired
// };
