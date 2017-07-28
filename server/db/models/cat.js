const Sequelize = require('sequelize')
const db = require('../db')

const Cat = db.define('cat', {
	name: {
		type: Sequelize.STRING,
		unique: true,
		allowNull: false
	},
  imageURL : {
    type: Sequelize.STRING,
    defaultValue: '/assets/images/smiling-cat-face-with-heart-shaped-eyes.png'
  },
	age : {
		type: Sequelize.STRING
	},
	description: {
		type: Sequelize.TEXT
	},
	gender: {
		type: Sequelize.ENUM,
		values: ['female', 'male', 'nonbinary']
	},
	status: {
		type: Sequelize.ENUM,
		values: ['available', 'adopted', 'pending']
	},
	specialNeeds : {
		type: Sequelize.BOOLEAN,
		defaultValue: false
	}
})

module.exports = Cat
