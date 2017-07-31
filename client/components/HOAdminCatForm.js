import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

/* -------------- COMPONENT -------------- */

const HOAdminCatForm = (props) => {

  const {handleSubmit, error} = props;
  // const existingRecord = props.existingRecord ? props.existingRecord : {};
  return (
    <AdminCatForm handleSubmit={handleSubmit} error={error} />
  );
};

/* -------------- CONTAINER --------------
 We have two different sets of 'mapStateToProps' and 'mapDispatchToProps'functions—one for Change, and one for
 Create. They share the same form component, AdminCatForm.
*/
const mapCreateCat = (state) => {
  return {
    name: 'createCat',
    displayName: 'Create cat',
    error: state.cat.error
  };
};

const mapChangeCat = (state) => {
  return {
    name: 'editCat',
    displayName: 'Change cat',
    error: state.cat.error
  };
};

// It should be possible to combine the two dispatchers into a single one with a conditional, but I just can't even. -IA
const mapDispatchChange = (dispatch) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const catName = evt.target.catName.value;
      const catImageURL = evt.target.catImageURL.value;
      const catAge = evt.target.catAge.value;
      const catDescription = evt.target.catDescription.value;
      const catGender = evt.target.catGender.value;
      const catStatus = evt.target.catStatus.value;
      const catSpecialNeeds = evt.target.catSpecialNeeds.value;
      dispatch(changeCat(catName, catImageURL, catAge, catDescription, catGender, catStatus, catSpecialNeeds));
    };
  };
};

const mapDispatchCreate = (dispatch) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const catName = evt.target.catName.value;
      const catImageURL = evt.target.catImageURL.value;
      const catAge = evt.target.catAge.value;
      const catDescription = evt.target.catDescription.value;
      const catGender = evt.target.catGender.value;
      const catStatus = evt.target.catStatus.value;
      const catSpecialNeeds = evt.target.catSpecialNeeds.value;
      dispatch(createCat(catName, catImageURL, catAge, catDescription, catGender, catStatus, catSpecialNeeds));
    };
  };
};

export const ChangeCat = connect(mapChangeCat, mapDispatchChange)(AdminCatForm);
export const CreateCat = connect(mapCreateCat, mapDispatchCreate)(AdminCatForm);

/* -------------- PROP TYPES -------------- */

HOAdminCatForm.propTypes = {
  error: PropTypes.object,
  existingRecord: PropTypes.object,
  handleSubmit: PropTypes.func.isRequired
};
