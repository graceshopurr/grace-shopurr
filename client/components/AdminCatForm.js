// This is a dumb form component, meant to be called by a higher-order component that will supply a handleSubmit and, if the form is being used to edit an existing record, that record's previous values.

import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

/* --------- VALUES FOR TESTING ---------- */

// let props = {
//   error: state.user.error,
//   existingRecord: {},
//   handleSubmit: function() {},
//   displayName: 'Submit'
// };

/* -------------- COMPONENT -------------- */

const AdminCatForm = (props) => {

  const {error, existingRecord, handleSubmit, displayName} = props;

  return (
    <div>
      <form onSubmit={handleSubmit} className="form-horizontal">
        <div className="form-group">
          <label className="col-md-4 control-label" htmlFor="catName">* Name</label>
          <div className="col-md-5">
          <input id="catName" name="catName" type="text" placeholder="e.g., 'Gus'" className="form-control input-md" required="">
          <span className="help-block">A cat name is required</span>
          </div>
        </div>

        <div className="form-group">
          <label className="col-md-4 control-label" htmlFor="catImageURL">Image URL</label>
          <div className="col-md-8">
          <input id="catImageURL" name="catImageURL" type="text" placeholder="defaults to '/assets/images/smiling-cat-face-with-heart-shaped-eyes.png'" className="form-control input-md">
          <span className="help-block">A fully qualified URL (http://…)</span>
          </div>
        </div>

        <div className="form-group">
          <label className="col-md-4 control-label" htmlFor="catAge">Age</label>
          <div className="col-md-5">
          <input id="catAge" name="catAge" type="text" placeholder="e.g., '6 months' or '~4 years'" className="form-control input-md">
          </div>
        </div>

        <div className="form-group">
          <label className="col-md-4 control-label" htmlFor="catDescription">Description</label>
          <div className="col-md-4">
            <textarea className="form-control" id="catDescription" name="catDescription"></textarea>
          </div>
        </div>

        <div class="form-group">
          <label class="col-md-4 control-label" for="catGender">Gender</label>
          <div class="col-md-4">
            <select id="catGender" name="catGender" class="form-control">
              <option value="female">female</option>
              <option value="male">male</option>
              <option value="nonbinary">nonbinary</option>
            </select>
          </div>
        </div>

        <div class="form-group">
          <label class="col-md-4 control-label" for="catStatus">Status</label>
          <div class="col-md-4">
            <select id="catStatus" name="catStatus" class="form-control">
              <option value="available">available</option>
              <option value="adopted">adopted</option>
              <option value="pending">pending</option>
            </select>
          </div>
        </div>

        <div class="form-group">
          <label class="col-md-4 control-label" for="catSpecialNeeds">Has special needs</label>
          <div class="col-md-4">
          <div class="radio">
            <label for="catSpecialNeeds-0">
              <input type="radio" name="catSpecialNeeds" id="catSpecialNeeds-0" value="1" checked="checked">
              Yes
            </label>
          </div>
          <div class="radio">
            <label for="catSpecialNeeds-1">
              <input type="radio" name="catSpecialNeeds" id="catSpecialNeeds-1" value="0">
              No
            </label>
          </div>
          <span className="help-block">If yes, include details in the description field</span>
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
