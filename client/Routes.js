import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Router} from 'react-router';
import {Route, Switch} from 'react-router-dom';
import PropTypes from 'prop-types';
import history from './history';
import { Login, Signup, UserHome, ChangeProduct, CreateProduct} from './components';
import AllCats from './components/AllCats';
import SingleCat from './components/SingleCat';
import AllProducts from './components/AllProducts';
import SingleProduct from './components/SingleProduct';
import { store, me, fetchCatList, fetchProductList } from './store';
import Cart from './components/Cart';
import Main from './components/Main';
import SearchResults from './components/SearchResults';

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
            <Route exact path="/products/add" component={CreateProduct} />
            <Route path="/products/edit" component={ChangeProduct} />
            <Route exact path ="/products" component={AllProducts} />
            <Route path="/products/:productId" component={SingleProduct} />
            <Route path ="/cats/:catId" component={SingleCat} />
            <Route exact path ="/cats" component={AllCats} />
            <Route exact path = "/cart" component={Cart} />
            <Route path ="/search/:query" component={SearchResults} />
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
      dispatch(fetchCatList());
      dispatch(fetchProductList());
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
