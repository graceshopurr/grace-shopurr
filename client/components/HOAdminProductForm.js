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
/
/ We have two different sets of 'mapStateToProps' functions -
/ one for Edit, and one for Add. However, they share the same
/ 'mapDispatchToProps' function, and share the same Component.
/
*/
const mapEditProduct = (state) => {
  return {
    name: 'addProduct',
    displayName: 'Add product',
    error: state.product.error
  };
};

const mapAddProduct = (state) => {
  return {
    name: 'editProduct',
    displayName: 'Edit product',
    error: state.product.error
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const productName = evt.target.productName.value;
      const productDescription = evt.target.productDescription.value;
      const productPrice = evt.target.productPrice.value;
      const productInventory = evt.target.productInventory.value;
      const productImageURL = evt.target.productImageURL.value;
      dispatch(productName, productDescription, productPrice, productInventory, productImageURL)
    }
  };
};

export const EditProduct = connect(mapEditProduct, mapDispatch)(AdminProductForm);
export const AddProduct = connect(mapAddProduct, mapDispatch)(AdminProductForm);

/* -------------- PROP TYPES -------------- */

HOAdminProductForm.propTypes = {
  error: PropTypes.object,
  existingRecord: PropTypes.object,
  handleSubmit: PropTypes.func.isRequired
};
