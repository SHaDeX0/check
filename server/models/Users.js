import { Schema, model } from 'mongoose'

const Users = new Schema({
	_id: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
})

const UserModel = model('users', Users)
export default UserModel
