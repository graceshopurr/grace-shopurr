const Sequelize = require('sequelize');
const db = require('../db');

const Review = db.define('review', {
  status: {
    type: Sequelize.ENUM,
    defaultValue: 'pending',
    values: ['pending', 'approved']
  },
  reviewText: {
    type: Sequelize.TEXT
  },
  friendlinessRating: {
    type: Sequelize.ENUM,
    values: ['friendly', 'neutral', 'a little prickly']
    //Make it a scale from 1-3 that can be averaged out? and translates to these words?
  }
});

module.exports = Review;

