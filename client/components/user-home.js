import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */

export const UserHome = (props) => {

  const user = props.user;

  return (
    <div>
      <h3>Welcome {user.firstName}</h3>
      <hr />
      Name: {user.firstName} {user.lastName} <br />
      Email: {user.email} <br />
      Shipping Address: {user.shippingAddress} <br />
      Billing Address: {user.billingAddress} <br />

      <hr/>

      <h4> Order History: </h4>

    </div>
  );
};


/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
