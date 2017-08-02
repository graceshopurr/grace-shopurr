import axios from 'axios';

// ACTION TYPES
const GET_REVIEW_LIST = 'GET_REVIEW_LIST';

// INITIAL STATE
const initialState = {
  reviewList: []
};

// Action creators
const getReviewList = (reviewList) => ({type: GET_REVIEW_LIST, reviewList});

// Thunk creators
export function fetchReviewList (catId){
  return function thunk (dispatch) {
    return axios.get('/api/reviews')
    .then(res => {
      let reviews = res.data;
      reviews = reviews.filter(review => Number(review.catId) === Number(catId));
      dispatch(getReviewList(reviews));
    })
    .catch(error => {console.log(error)});
  };
}

export function writeReview(review){
  console.log('write review thunk', review);
  return function thunk (dispatch) {
    return axios.post('/api/reviews', review)
//how to reload page?
    .catch(error => {console.log(error)});
  }
}

//Reducer
export default function (state = initialState, action) {
  let newState = Object.assign({}, state);
  if (action.type === GET_REVIEW_LIST) {
    newState.reviewList = action.reviewList;
  }
  return newState;
}

