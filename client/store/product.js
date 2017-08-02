import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const GET_PRODUCT_LIST = 'GET_PRODUCT_LIST';
const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT';

/**
 * INITIAL STATE
 */
const intialState = {
    products: [],
    product: {}, // used by AdminProductForm & HOAdminProduct Form, and should probably be refactored to use singleProduct instead
    productList: [],
    singleProduct: {}
};

/**
 * ACTION CREATORS
 */
const getProductList = (productList) => ({type: GET_PRODUCT_LIST, productList});
const getSingleProduct = (singleProduct) => ({type: GET_SINGLE_PRODUCT, singleProduct});

/**
 * THUNK CREATORS
 */

export function fetchProductList () {
    return function thunk (dispatch){
        return axios.get('/api/products')
        .then(res => dispatch(getProductList(res.data)))
        .catch(error => { console.log(error) });
    };
}

export function fetchSingleProduct (productId) {
    return function thunk (dispatch){
        return axios.get(`/api/products/${productId}`)
        .then(res => dispatch(getSingleProduct(res.data)))
        .catch(error => { console.log(error) });
    };
}


export function createProduct ( product ) {
    return function thunk (dispatch){
        return axios.post('/api/products', {product})
        .then(res => dispatch(getSingleProduct(res.data)))
        .catch(error => { console.log( error) });
    };
}

export function changeProduct (productId, product) {
    return function thunk (dispatch){
        return axios.put(`/api/products/${productId}`, {product})
        .then(res => dispatch(getSingleProduct(res.data)))
        .catch(error => { console.log( error) });
    };
}

export function deleteProduct(productId){
    return function thunk(dispatch){
        return axios.delete(`/api/products/${productId}`)
        .catch(error => { console.log(error) });
    };
}

/**
 * REDUCER
 */
export default function(state = intialState, action) {
  let newState = Object.assign({}, state);
  switch (action.type) {
    case GET_PRODUCT_LIST:
      newState.productList = action.productList;
      break;
    case GET_SINGLE_PRODUCT:
      newState.singleProduct = action.singleProduct;
      break;
    // case ADD_PRODUCT:
    //   newState.products = [action.product, ...state.products];
    //   break;
    // case UPDATE_PRODUCT:
    //   newState.products = state.products.map(product => ( action.product.id === product.id ? action.product : product));
    //   break;
    // case REMOVE_PRODUCT:
    //   newState.products = state.products.filter(product => product.id !== action.id);
    //   break;
    default:
      return state;
  }
  return newState;
}
