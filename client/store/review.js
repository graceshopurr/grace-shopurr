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
      reviews.filter(review => review.catId === catId);
      dispatch(getReviewList(reviews));
    })
    .catch(error => {console.log(error)});
  };
}

//Reducer
export default function (state = initialState, action) {
  let newState = Object.assign({}, state);
  if (action.type === GET_REVIEW_LIST) {
    newState.reviewList = action.reviewList;
  }
  return newState;
}

