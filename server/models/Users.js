const { Schema, model } = require('mongoose')

const Users = new Schema({
	_id: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	checklist: {
		type: Array,
		required: true,
	},
})

const UserModel = model('users', Users)
module.exports = UserModel
