const Sequelize = require('sequelize')
const db = require('../db')

const Cat = db.define('cat', {
	name: {
		type: Sequelize.STRING,
		unique: true,
		allowNull: false
	},
	image : {
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
	ownerId: {
		type: Sequelize.INTEGER,
		defaultValue: null
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

module.exports = {
	db,
	Cat
}