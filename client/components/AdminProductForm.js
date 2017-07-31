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

  const {displayName, error, existingRecord, handleSubmit} = props;

  return (
    <div>
      <form onSubmit={handleSubmit} className="form-horizontal">
        <div className="form-group">
          <label className="col-md-4 control-label" htmlFor="productName">* Name</label>
          <div className="col-md-5">
          <input id="productName" name="productName" type="text" placeholder="e.g., '40 lb. bag of litter'" className="form-control input-md" required="">
          <span className="help-block">A product name is required</span>
          </div>
        </div>

        <div className="form-group">
          <label className="col-md-4 control-label" htmlFor="productDescription">Description</label>
          <div className="col-md-4">
            <textarea className="form-control" id="productDescription" name="productDescription"></textarea>
          </div>
        </div>

        <div className="form-group">
          <label className="col-md-4 control-label" htmlFor="productPrice">Price</label>
          <div className="col-md-5">
          <input id="productPrice" name="productPrice" type="text" placeholder="e.g., '500' for $5; defaults to 0" className="form-control input-md">
          <span className="help-block">Enter the price in cents (until we find a better way to handle this)</span>
          </div>
        </div>

        <div className="form-group">
          <label className="col-md-4 control-label" htmlFor="productInventory">Inventory</label>
          <div className="col-md-5">
          <input id="productInventory" name="productInventory" type="text" placeholder="0" className="form-control input-md">
          <span className="help-block">How many units are available?</span>
          </div>
        </div>

        <div className="form-group">
          <label className="col-md-4 control-label" htmlFor="productImageURL">Image URL</label>
          <div className="col-md-8">
          <input id="productImageURL" name="productImageURL" type="text" placeholder="defaults to '/assets/images/package.png'" className="form-control input-md">
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

AuthForm.propTypes = {
  displayName: PropTypes.string.isRequired,
  error: PropTypes.object,
  existingRecord: PropTypes.object,
  handleSubmit: PropTypes.func.isRequired
};
