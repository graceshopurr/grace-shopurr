import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const GET_CAT_LIST = 'GET_CAT_LIST';
const GET_SINGLE_CAT = 'GET_SINGLE_CAT';

/**
 * INITIAL STATE
 */
const intialState = {
    catList: [],
    singleCat: {}
};

/**
 * ACTION CREATORS
 */
const getCatList = (catList) => ({type: GET_CAT_LIST, catList});
const getSingleCat = (singleCat) => ({type: GET_SINGLE_CAT, singleCat});

/**
 * THUNK CREATORS
 */

export function fetchCatList () {
    return function thunk (dispatch){
        return axios.get('/api/cats')
        .then(res => dispatch(getCatList(res.data)))
        .catch(error => { console.log(error) });
    };
}

export function fetchSingleCat (catId) {
  console.log('fetch single cat');
    return function thunk (dispatch){
        return axios.get(`/api/cats/${catId}`)
        .then(res => {
          dispatch(getSingleCat(res.data))
        //   console.log(res.data);
        })
        .catch(error => { console.log(error) });
    };
}

export function createCat (cat ) {
    return function thunk (dispatch){
        return axios.post('/api/cats', {cat})
        .then(res => dispatch(getSingleCat(res.data)))
        .catch(error => { console.log(error) });
    };
}

export function changeCat (catId, cat) {
    return function thunk (dispatch){
        return axios.put(`/api/cats/${catId}`, {cat})
        .then(res => dispatch(getSingleCat(res.data)))
        .catch(error => { console.log(error) });
    }
}

export function deleteCat(catId){
    return function thunk(){
        return axios.delete(`/api/cats/${catId}`)
        .catch(error => { console.log( error) });
    };
}

/**
 * REDUCER
 */
export default function (state = intialState, action) {
  let newState = Object.assign({}, state);
  switch (action.type) {
    case GET_CAT_LIST:
      newState.catList = action.catList;
      break;
    case GET_SINGLE_CAT:
      newState.singleCat = action.singleCat;
      break;
    default:
      return state;
  }
  return newState;
}
