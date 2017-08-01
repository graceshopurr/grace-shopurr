// This is a dumb form component, meant to be called by a higher-order component that will supply a handleSubmit and, if the form is being used to edit an existing record, that record's previous values.

import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

/* --------- VALUES FOR TESTING ---------- */

// let props = {
//   displayName: 'Submit',
//   error: state.user.error,
//   existingRecord: {},
//   handleSubmit: function() {}
// };

/* -------------- COMPONENT -------------- */

const AdminProductForm = (props) => {
  // console.log('props:',props);
  const {displayName, error, existingRecord} = props;

  return (
    <div className="AdminProductForm">
      <form onSubmit={props.handleSubmit} className="form-horizontal">
        <div className="form-group row">
          <label className="col-lg-6 col-md-8 col-form-label control-label" htmlFor="productName">* Name</label>
          <div className="col-lg-6 col-md-8">
            <input id="productName" name="productName" type="text" placeholder="e.g., '40 lb. bag of litter'" className="form-control input-md" required="" onChange={props.handleChange} />
            <span className="help-block">A product name is required</span>
          </div>
        </div>

        <div className="form-group row">
          <label className="col-lg-6 col-md-8 col-form-label control-label" htmlFor="productDescription">Description</label>
          <div className="col-lg-6 col-md-8">
            <textarea className="form-control" id="productDescription" name="productDescription" onChange={props.handleChange}></textarea>
          </div>
        </div>

        <div className="form-group row">
          <label className="col-lg-6 col-md-8 col-form-label control-label" htmlFor="productPrice">Price</label>
          <div className="col-lg-6 col-md-8">
            <input id="productPrice" name="productPrice" type="text" placeholder="e.g., '500' for $5; defaults to 0" className="form-control input-md" onChange={props.handleChange} />
            <span className="help-block">Enter the price in cents (until we find a better way to handle this)</span>
          </div>
        </div>

        <div className="form-group row">
          <label className="col-lg-6 col-md-8 col-form-label control-label" htmlFor="productInventory">Inventory</label>
          <div className="col-lg-6 col-md-8">
            <input id="productInventory" name="productInventory" type="text" placeholder="0" className="form-control input-md" onChange={props.handleChange} />
            <span className="help-block">How many units are available?</span>
          </div>
        </div>

        <div className="form-group row">
          <label className="col-lg-6 col-md-8 col-form-label control-label" htmlFor="productImageURL">Image URL</label>
          <div className="col-lg-6 col-md-8">
            <input id="productImageURL" name="productImageURL" type="text" placeholder="defaults to '/assets/images/package.png'" className="form-control input-md" onChange={props.handleChange} />
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
