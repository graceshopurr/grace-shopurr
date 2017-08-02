import React, {Component} from 'react';
import { connect } from 'react-redux';
import { writeReview } from '../store';

class ReviewForm extends Component{

  constructor(props){
    super(props);
    this.state = {
      submitted: false
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
      event.preventDefault();
      const rating = parseInt(event.target.friendlinessRating.value, 10);
      const review = {
        userId: Number(this.props.userId),
        catId: Number(this.props.catId),
        reviewText: event.target.reviewText.value,
        friendlinessRating: rating
      };
      this.setState({submitted: true});
      this.props.postReview(review);
    }

  render(){
    return (
          <div>
              <h4> New Review: </h4>
              <form onSubmit={this.handleSubmit}>
              Friendliness Rating: <br />
              <input type="radio" name="friendlinessRating" value="3" /> Friendly<br/>
              <input type="radio" name="friendlinessRating" value="2"  /> Neutral<br/>
              <input type="radio" name="friendlinessRating" value="1" /> A little prickly
              <br />
                Review: <input className="form-control" type="text" name="reviewText" placeholder="Say something!" />

                <button type="submit" className="btn btn-primary">Submit Changes</button>

              </form>
              {this.state.submitted ? <span> Your review was submitted :) </span> : null}
        </div>
      ) ;
  }
}


const mapState = (state) => ({
  userId: state.user.id
});

const mapDispatch = (dispatch) => {
  return {
    postReview(review) {
      dispatch(writeReview(review));
    }
  };
};

export default connect(mapState, mapDispatch)(ReviewForm);
