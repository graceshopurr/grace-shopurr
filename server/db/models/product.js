const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
    name: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false
    },
    description: {
      type: Sequelize.TEXT
    },
    price: {
      type: Sequelize.INTEGER, //price in cents,
      defaultValue: 0,
      validate: {
        min: 0
      }
    },
    inventory: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
      validate: {
        min: 0
      }
    },
    imageURL : {
      type: Sequelize.STRING,
      defaultValue: '/assets/images/package.png'
    }
  },

  {
    getterMethods: {
      dollarPrice: function() {
        return (this.price / 100).toFixed(2);
      }
    }
  }
)

module.exports = Product
