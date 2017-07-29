const Sequelize = require('sequelize');
const db = require('../db');

const Order = db.define('order', {
  status: {
    type: Sequelize.ENUM,
    values: ['cart','processing','pending','shipped','delivered', 'canceled']
  },
  date: {
    type: Sequelize.DATE, 
    defaultValue: null
  }
})

module.exports = Order;

  // cats: {
  //   type: Sequelize.ARRAY(Sequelize.STRING),
  //   defaultValue: []
  // },
  // products: {
  //   type: Sequelize.ARRAY(Sequelize.STRING),
  //   defaultValue: []
  // }
