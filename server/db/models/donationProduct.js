const Sequelize = require('sequelize')
const db = require('../db')

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

module.exports = {
	db,
	DonationProduct
}
