const Sequelize = require('sequelize')
const db = require('../db')

// EI: write tests for validations

const Cat = db.define('cat', {
	name: {
		type: Sequelize.STRING,
		unique: true,
		allowNull: false
	},
	image : { // EI: imageUrl
		type: Sequelize.STRING
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
