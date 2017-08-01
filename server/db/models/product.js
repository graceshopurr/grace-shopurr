const {STRING, TEXT, INTEGER} = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
    name: {
      type: STRING,
      unique: true,
      allowNull: false
    },
    description: {
      type: TEXT
    },
    price: {
      type: INTEGER, //price in cents,
      defaultValue: 0,
      validate: {
        min: 0
      }
    },
    inventory: {
      type: INTEGER,
      validate: {
        min: 0
      }
    },
    imageURL : {
      type: STRING,
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
