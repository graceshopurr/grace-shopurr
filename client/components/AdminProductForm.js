// This is a dumb form component, meant to be called by a higher-order component (HOAdminProductForm) that will supply a handleSubmit and, if the form is being used to edit an existing record, that record's previous values.

import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

/* -------------- COMPONENT -------------- */

const AdminProductForm = (props) => {
  const {displayName, error, existingRecord, handleChange, handleSubmit, name, formProduct} = props;

  return (
    <div className="AdminProductForm col-lg-9 offset-lg-3">
      <form onSubmit={(evt) => handleSubmit(evt, formProduct.id)} className="form-horizontal">
        <div className="form-group row">
          <label className="col-lg-6 col-md-8 col-form-label control-label" htmlFor="productName">* Name</label>
          <div className="col-lg-6 col-md-8">
            <input id="productName" name="productName" type="text" className="form-control input-md" required="" onChange={handleChange} value={formProduct.name} />
            <span className="help-block">A product name (e.g., '40 lb. bag of litter') is required</span>
          </div>
        </div>

        <div className="form-group row">
          <label className="col-lg-6 col-md-8 col-form-label control-label" htmlFor="productDescription">Description</label>
          <div className="col-lg-6 col-md-8">
            <textarea className="form-control" id="productDescription" name="productDescription" onChange={handleChange} value={formProduct.description}></textarea>
          </div>
        </div>

        <div className="form-group row">
          <label className="col-lg-6 col-md-8 col-form-label control-label" htmlFor="productPrice">Price</label>
          <div className="col-lg-6 col-md-8">
            <input id="productPrice" name="productPrice" type="text" placeholder="e.g., '500' for $5; defaults to 0" className="form-control input-md" onChange={handleChange} value={formProduct.price} />
            <span className="help-block">Enter the price in cents (until we find a better way to handle this)</span>
          </div>
        </div>

        <div className="form-group row">
          <label className="col-lg-6 col-md-8 col-form-label control-label" htmlFor="productInventory">Inventory</label>
          <div className="col-lg-6 col-md-8">
            <input id="productInventory" name="productInventory" type="text" placeholder="0" className="form-control input-md" onChange={handleChange} value={formProduct.inventory} />
            <span className="help-block">How many units are available?</span>
          </div>
        </div>

        <div className="form-group row">
          <label className="col-lg-6 col-md-8 col-form-label control-label" htmlFor="productImageURL">Image URL</label>
          <div className="col-lg-6 col-md-8">
            <input id="productImageURL" name="productImageURL" type="text" placeholder="defaults to '/assets/images/package.png'" className="form-control input-md" onChange={handleChange} value={formProduct.imageURL} />
            <span className="help-block">A fully qualified URL (http://…)</span>
          </div>
        </div>

        <div>
          <button type="submit">{displayName}</button>
        </div>
      </form>
    </div>
  );
};

/* -------------- PROP TYPES -------------- */

AdminProductForm.propTypes = {
  displayName: PropTypes.string.isRequired,
  error: PropTypes.object,
  existingRecord: PropTypes.object,
  handleSubmit: PropTypes.func.isRequired
};

export default AdminProductForm;
