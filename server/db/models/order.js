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
  },
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
    validate: {
      min: 1,
      max: 100
    }
  }
})

module.exports = Order;
