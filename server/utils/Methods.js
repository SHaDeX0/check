const UserModel = require('../models/Users.js')
const bcrypt = require('bcrypt')

const saltRounds = 10

const getAll = (req, res) => {
	UserModel.find({}, (err, result) => {
		if (err) res.send(err)
		else res.send(result)
	})
}

const createUser = async (req, res) => {
	const { _id, name, password } = req.body
	//hashing the user's password
	await bcrypt.hash(password, saltRounds, async (err, hash) => {
		if (err) {
			res.send({ err: 'Server hashing error!' })
			return
		}
		req.session.user = { _id: _id, name: name, password: hash, checklist: [] }

		//creating new user with hashed password
		const newUser = new UserModel({ _id: _id, name: name, password: hash, checklist: [] })
		await newUser
			.save()
			.then(err => res.send({ msg: 'Sign Up Success!' }))
			.catch(err => res.send({ err: 'User already exists!' }))
	})
}

const login = (req, res) => {
	const { _id, password } = req.body
	//searching in the database for user having _id as email
	UserModel.find({ _id: _id }, (err, result) => {
		if (err || !result) res.send({ err: 'Server error!' })
		else {
			if (result.length === 0) res.send({ err: 'User does not exist!' })
			else {
				//comparing user password and the hashed password in the database
				bcrypt.compare(password, result[0].password, (err, response) => {
					if (response) {
						//creating a session for a user for 24 hours
						req.session.user = result[0]
						res.send({ msg: 'Login successful' })
					} else res.send({ err: 'Wrong password!' })
				})
			}
		}
	})
}

const isLoggedIn = (req, res) => {
	if (req.session.user) {
		UserModel.findOne({ _id: req.session.user._id }).then(response => {
			res.send({ loggedIn: true, user: response })
		})
	} else {
		res.send({ loggedIn: false })
	}
}

const logout = (req, res) => {
	req.session.destroy()
	res.send({ msg: 'logged out' })
}

const updateList = (req, res) => {
	if (req.session.user) {
		UserModel.findOneAndUpdate(
			{ _id: req.session.user._id },
			{ $set: { checklist: req.body } },
			{
				returnDocument: true,
			}
		)
			.then(result => {
				if (result) {
					req.session.user = result
					res.send({ msg: 'Updated successfully!', result: result })
					console.log('This is the result: ')
					console.log(result)
				} else res.send({ err: err })
			})
			.catch(err => res.send({ err: 'You must login first!' }))
	}
}

module.exports = { getAll, createUser, login, isLoggedIn, logout, updateList }
