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
    // 1 = 'friendly', 2 = 'neutral' (hence, default value), 3 = 'a little prickly'
    type: Sequelize.INTEGER,
    defaultValue: 2,
    validate: {
      min: 1,
      max: 3,
    }
  }
});

module.exports = Review;

