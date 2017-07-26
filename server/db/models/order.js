const Sequelize = require('sequelize');
const db = require('../db');

const Order = db.define('order', {
  userId: {
    type: Sequelize.STRING,
    defaultValue: null
  },
  status: {
    type: Sequelize.ENUM,
    values: ['pending','shipped','delivered', 'canceled']
  },
  cats: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    defaultValue: []
  },
  donationProducts: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    defaultValue: []
  }
})

module.exports = Order;

