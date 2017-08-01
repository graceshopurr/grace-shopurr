import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const GET_CATS = 'GET_CATS';
const GET_CAT_BY_ID = 'GET_CAT_BY_ID';
// const ADD_CAT = 'ADD_CAT';
// const UPDATE_CAT = 'UPDATE_CAT';
// const REMOVE_CAT = 'REMOVE_CAT';


/**
 * INITIAL STATE
 */
const intialState = {
    cats: [],
    selectedCat: {}
};

/**
 * ACTION CREATORS
 */
const getCats = (cats) => ({type: GET_CATS, cats});
const getCatById = (cat) => ({type: GET_CAT_BY_ID, cat});
// const addCat = (cat) => ({type: ADD_CAT, cat});
// const updateCat = (cat) => ({type: UPDATE_CAT, cat});
// const removeCat = (catId) => ({type: REMOVE_CAT, catId});

/**
 * THUNK CREATORS
 */

export function fetchCats () {
    return function thunk (dispatch){
        //sends axios request to get all cats
        return axios.get('/api/cats')
        .then(res => res.data)
        .then(cats => {
            const action = getCats(cats);
            dispatch(action);
        })
        .catch(error => { console.log(error) });
    };
}

export function fetchCatsById (catId) {
    return function thunk (dispatch){
        return axios.get(`/api/cat/${catId}`)
        .then(res => res.data)
        .then(cat => {
            const action = getCatById(cat);
            dispatch(action);
        })
        .catch(error => { console.log(error) });
    };
}


export function createCat (cat ) {
    return function thunk (dispatch){
        return axios.post('/api/cats', {cat})
        // .then(res => res.data)
        .then(() => {
            // const action = addCat(addedCat);
            // dispatch(action);
            dispatch(fetchCats())
        })
        .catch(error => { console.log(error) });
    };
}

export function changeCat (catId, cat) {
    return function thunk (dispatch){
        return axios.put(`/api/cats/${catId}`, {cat})
        .then(res => res.data)
        .then(addedCat => {
            const action = updateCat(addedCat);
            dispatch(action);
        })
        .catch(error => { console.log( error) });
    }
}

export function deleteCat(catId){
    return function thunk(dispatch){
        return axios.delete(`/api/cats/${catId}`)
        .then(res => res.data)
        .then(deletedCat => {
            const action = removeCat(deletedCat);
            alert('You have deleted a Cat!');
            dispatch(action);
        })
        .catch(error => { console.log( error) });
    };
}


/**
 * REDUCER
 */
export default function (state = intialState, action) {
  let newState = Object.assign({}, state);
  switch (action.type) {
    case GET_CATS:
      newState.cats = action.cats;
      break;
    case GET_CAT_BY_ID:
      newState.cat = action.cat;
      break;
    // case ADD_CAT:
    //   newState.cats = [action.cat, ...state.cats];
    //   break;
    // case UPDATE_CAT:
    //   newState.cats = state.cats.map(cat => (action.cat.id === cat.id ? action.cat : cat));
    //   break;
    // case REMOVE_CAT:
    //   newState.cats = state.cats.filter(cat => cat.id !== action.id);
      break;
    default:
      return state;
  }
  return newState;
}
