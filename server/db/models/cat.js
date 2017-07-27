const Sequelize = require('sequelize')
const db = require('../db')

const Cat = db.define('cat', {
	name: {
		type: Sequelize.STRING,
		unique: true,
		allowNull: false
	},
	image : {
		type: Sequelize.STRING,
		defaultValue: 'https://emojipedia-us.s3.amazonaws.com/thumbs/120/google/80/smiling-cat-face-with-heart-shaped-eyes_1f63b.png'
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
