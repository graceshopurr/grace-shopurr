const Sequelize = require('sequelize')
const db = require('../db')

// EI: keep track of quantity/inventory? make sure you can't have negative quantity. also make sure users can't purchase more than is in stock (that logic may not need to be in this model).
// EI: write tests for validations

const DonationProduct = db.define('donationProduct', {
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
      defaultValue: 0
      // CG: add min validation - don't want to have prices less than 0
    }, //leaving off 'rating field' -- virtual field derived from associated reviews?

  },

  {
    getterMethods: {
      dollarPrice: function() {
        return this.price / 100;
      }
    }
  }
)

module.exports = DonationProduct
