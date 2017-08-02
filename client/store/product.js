import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const GET_PRODUCTS = 'GET_PRODUCTS';
const GET_PRODUCT_BY_ID = 'GET_PRODUCT_BY_ID';
const ADD_PRODUCT = 'ADD_PRODUCT';
const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
const REMOVE_PRODUCT = 'REMOVE_PRODUCT';

/**
 * INITIAL STATE
 */
const intialState = {
  products: [],
  product: {}
};

/**
 * ACTION CREATORS
 */
const getProducts = (products) => ({ type: GET_PRODUCTS, products });
const getProductById = (product) => ({ type: GET_PRODUCT_BY_ID, product });
const addProduct = (product) => ({ type: ADD_PRODUCT, product });
const updateProduct = (product) => ({ type: UPDATE_PRODUCT, product });
const removeProduct = (productId) => ({ type: REMOVE_PRODUCT, productId });

/**
 * THUNK CREATORS
 */

export function fetchProducts() {
  return function thunk(dispatch) {
    //sends axios request to get all Products
    return axios.get('/api/products')
      .then(res => res.data)
      .then(products => {
        const action = getProducts(products);
        dispatch(action);
      })
      .catch(error => { console.log('this', error) });
  };
}

export function fetchProductsById(productId) {
  return function thunk(dispatch) {
    return axios.get(`/api/products/${productId}`)
      .then(res => res.data)
      .then(item => {
        const action = getProductById(item);
        dispatch(action);
      })
      .catch(error => { console.log(error) });
  };
}

export function createProduct(product) {
  return function thunk(dispatch) {
    return axios.post('/api/products', product)
      .then(res => res.data)
      .then(addedItem => {
        const action = addProduct(addedItem);
        dispatch(action);
      })
      .catch(error => { console.log(error) });
  };
}

export function changeProduct(productId, product) {
  return function thunk(dispatch) {
    return axios.put(`/api/products/${productId}`, product)
      .then(res => res.data)
      .then(changedItem => {
        const action = updateProduct(changedItem);
        dispatch(action);
      })
      .catch(error => { console.log(error) });
  };
}

export function deleteProduct(productId) {
  return function thunk(dispatch) {
    return axios.delete(`/api/products/${productId}`)
      .then(res => res.data)
      .then(deletedProduct => {
        const action = removeProduct(deletedProduct);
        alert("You have deleted a Product!");
        dispatch(action);
      })
      .catch(error => { console.log(error) });
  };
}

/**
 * REDUCER
 */
export default function(state = intialState, action) {
  let newState = Object.assign({}, state);
  switch (action.type) {
    case GET_PRODUCTS:
      newState.products = action.products;
      break;
    case GET_PRODUCT_BY_ID:
      newState.product = action.product;
      break;
    case ADD_PRODUCT:
      newState.products = [action.product, ...state.products];
      break;
    case UPDATE_PRODUCT:
      newState.products = state.products.map(product => (action.product.id === product.id ? action.product : product));
      break;
    case REMOVE_PRODUCT:
      newState.products = state.products.filter(product => product.id !== action.id);
      break;
    default:
      return state;
  }
  return newState;
}
