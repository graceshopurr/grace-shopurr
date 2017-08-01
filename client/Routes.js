import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Router} from 'react-router';
import {Route, Switch} from 'react-router-dom';
import PropTypes from 'prop-types';
import history from './history';
import { Login, Signup, UserHome, EditProduct, AddProduct} from './components';
import AllCats from './components/AllCats';
import SingleCat from './components/SingleCat';
import AllProducts from './components/AllProducts';
import SingleProduct from './components/SingleProduct';
import { store, me, fetchCats, fetchProducts } from './store';
import Main from './components/Main';

/**
 * COMPONENT
 */
class Routes extends Component {

  componentDidMount () {
    this.props.loadInitialData();
  }

  render () {

    const {isLoggedIn} = this.props;

    return (
      <Router history={history}>
        <Main>
          <Switch>
            {/* Routes placed here are available to all visitors */}
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route exact path ="/products" component = {AllProducts} />
            <Route exact path="/products/add" component={AddProduct} />
            <Route path="/products/edit" component={EditProduct} />
            <Route path="/products/:productId" component = {SingleProduct} />
            <Route exact path ="/cats" component = {AllCats} />
            <Route path ="/cats/:catId" component = {SingleCat} />
            {
              isLoggedIn ?
                <Switch>
                  {/* Routes placed here are only available after logging in */}
                  <Route path="/home" component={UserHome} />
                </Switch> : null
            }
            {/* Displays our Login component as a fallback */}
            <Route component={Login} />
          </Switch>
        </Main>
      </Router>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadInitialData () {
      dispatch(me());
      dispatch(fetchCats());
      dispatch(fetchProducts());
    }
  };
};

export default connect(mapState, mapDispatch)(Routes);

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
