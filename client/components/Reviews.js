import React, {Component} from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

class Reviews extends Component{

  constructor(props){
    super(props);
    this.state = {
      user: {}
    };
  }

  componentDidMount () {
    const userId = this.props.singleReview.userId;
    this.fetchUserbyId(userId);
  }

  fetchUserbyId(id) {
    axios.get(`/api/users/${id}`)
    .then(res => this.setState({user: res.data}))
    .catch(error => {console.log(error)});
  }

  render(){
    const review = this.props.singleReview;
    return (
          <div>
          <hr />
          <p> <b>{this.state.user.firstName}</b>
          &nbsp; &nbsp; Friendliness rating: {ratingConverter(review.friendlinessRating)} </p>
          <p> {review.reviewText} </p>
        </div>
      ) ;
  }
}

function ratingConverter(num){
  if (num === 1) return 'a little prickly';
  else if (num === 3) return 'friendly';
  else return 'neutral';

}

const mapState = (state) => ({
});

const mapDispatch = null;

export default connect(mapState, mapDispatch)(Reviews);
