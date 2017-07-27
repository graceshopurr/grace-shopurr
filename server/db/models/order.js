const Sequelize = require('sequelize');
const db = require('../db');

// EI: write tests for validations

const Order = db.define('order', {
  status: {
    type: Sequelize.ENUM,
    values: ['pending','shipped','delivered', 'canceled']
  },
  cats: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    defaultValue: []
  },
  donationProducts: { // EI: what will the strings be? product names? ids?
    type: Sequelize.ARRAY(Sequelize.STRING),
    defaultValue: []
  }
})

module.exports = Order;

