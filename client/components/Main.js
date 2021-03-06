import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter, Link} from 'react-router-dom';
import {logout} from '../store';
import Sidebar from './Sidebar';
import NavBarCart from './NavBarCart';

/**
 * COMPONENT
 *  The Main component is our 'picture frame' - it displays the navbar and anything
 *  else common to our entire app. The 'picture' inside the frame is the space
 *  rendered out by the component's `children`.
 */
const Main = (props) => {
  // console.log(props);
  const {children, handleClick, isLoggedIn} = props;
  return (
     <div id = "main" className="container-fluid">
      <div className="container">
      <div className="row-offcanvas row-offcanvas-left">
          <div className="col-md-12">
            <h1 className="MainTitle">Grace Shopurr</h1>
            <nav>
              {
                isLoggedIn ?
                  <div>
                    {/* The navbar will show these links after you log in */}
                    <Link to="/user">Profile</Link>
                    <a href="#" onClick={handleClick}>Logout</a>
                  </div> :
                  <div>
                    {/* The navbar will show these links before you log in */}
                    <Link to="/login">Login</Link>
                    <Link to="/signup">Sign Up</Link>
                  </div>
              }
                <NavBarCart /> 
            </nav>

            <hr />

            </div>
            <Sidebar />

      </div>
      {children} {/*What is rendered in the center*/}
       </div>
       </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleClick () {
      dispatch(logout());
    }
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Main));

/**
 * PROP TYPES
 */
Main.propTypes = {
  children: PropTypes.object,
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
