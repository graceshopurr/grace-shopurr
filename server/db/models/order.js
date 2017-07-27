const Sequelize = require('sequelize');
const db = require('../db');

const Order = db.define('order', {
  status: {
    type: Sequelize.ENUM,
    values: ['pending','shipped','delivered', 'canceled']
  },
  cats: { // EI: this should be replaced with an association
    type: Sequelize.ARRAY(Sequelize.STRING),
    defaultValue: []
  },
  donationProducts: { // EI: this should be replaced with an association
    type: Sequelize.ARRAY(Sequelize.STRING),
    defaultValue: []
  }
})

// EI: getter method for total price, just make sure that the total price for orders that are already purchased don't change when products' prices get updated

module.exports = Order;

