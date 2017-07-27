const Sequelize = require('sequelize');
const db = require('../db');

const Review = db.define('review', {
  status: {
    type: Sequelize.ENUM,
    defaultValue: 'pending',
    values: ['pending', 'approved']
  },
  review: {
    type: Sequelize.TEXT
  },
  rating: {
    type: Sequelize.ENUM,
    values: ['friendly', 'neutral', 'a little prickly']
    //Make it a scale from 1-3 that can be averaged out? and translates to these words?
    // EI: if updating to numbers, add min/max validation
  }
  // EI: getter method for average review score
  // some sort of method to translate a score to a particular word - or maybe just have a utility func on the frontend?
});

module.exports = Review;

