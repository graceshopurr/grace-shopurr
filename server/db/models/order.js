const Sequelize = require('sequelize');
const db = require('../db');

const Order = db.define('order', {
  status: {
    type: Sequelize.ENUM,
    values: ['pending','shipped','delivered', 'canceled']
  },
  cats: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    defaultValue: []
  },
  products: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    defaultValue: []
  }
})

module.exports = Order;

