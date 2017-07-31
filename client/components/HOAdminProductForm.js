import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

/* -------------- COMPONENT -------------- */

const HOAdminProductForm = (props) => {

  const {handleSubmit, error} = props;
  // const existingRecord = props.existingRecord ? props.existingRecord : {};
  return (
    <AdminProductForm handleSubmit={handleSubmit} error={error} />
  );
};

/* -------------- CONTAINER --------------
 We have two different sets of 'mapStateToProps' and 'mapDispatchToProps'functions—one for Change, and one for
 Create. They share the same form component, AdminProductForm.
*/
const mapCreateProduct = (state) => {
  return {
    name: 'createProduct',
    displayName: 'Create product',
    error: state.product.error
  };
};

const mapChangeProduct = (state) => {
  return {
    name: 'editProduct',
    displayName: 'Change product',
    error: state.product.error
  };
};

// It should be possible to combine the two dispatchers into a single one with a conditional, but I can't get my head around it right now. -IA
const mapDispatchChange = (dispatch) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const productName = evt.target.productName.value;
      const productDescription = evt.target.productDescription.value;
      const productPrice = evt.target.productPrice.value;
      const productInventory = evt.target.productInventory.value;
      const productImageURL = evt.target.productImageURL.value;
      dispatch(changeProduct(productName, productDescription, productPrice, productInventory, productImageURL));
    };
  };
};

const mapDispatchCreate = (dispatch) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const productName = evt.target.productName.value;
      const productDescription = evt.target.productDescription.value;
      const productPrice = evt.target.productPrice.value;
      const productInventory = evt.target.productInventory.value;
      const productImageURL = evt.target.productImageURL.value;
      dispatch(createProduct(productName, productDescription, productPrice, productInventory, productImageURL));
    };
  };
};

export const ChangeProduct = connect(mapChangeProduct, mapDispatchChange)(AdminProductForm);
export const CreateProduct = connect(mapCreateProduct, mapDispatchCreate)(AdminProductForm);

/* -------------- PROP TYPES -------------- */

HOAdminProductForm.propTypes = {
  error: PropTypes.object,
  existingRecord: PropTypes.object,
  handleSubmit: PropTypes.func.isRequired
};
