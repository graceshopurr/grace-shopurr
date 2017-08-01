import React, {Component} from 'react';
import { connect } from 'react-redux';
import { fetchReviewList } from '../store';

class Reviews extends Component{

  constructor(props){
    super(props);
  }

  componentDidMount() {
    let catId = this.props.catId;
    console.log('cat id', this.props.catId);
    this.props.loadData(catId);
  }

  render(){
    const reviews = this.props.review.reviewList;
    return (
       <div>
        <h3>Reviews </h3>
        {reviews.map( review => (
          <div>
          <hr />
          <p> Friendliness rating: {review.friendlinessRating} </p>
          <p> {review.reviewText} </p>
        </div>
          ))}
      </div>
      ) ;

  }
}

const mapState = (state) => ({
  review: state.review
});

const mapDispatch = (dispatch) => {
  return {
    loadData(catId) {
      dispatch(fetchReviewList(catId));
    }
  };
};

export default connect(mapState, mapDispatch)(Reviews);
