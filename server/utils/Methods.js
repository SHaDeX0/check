import UserModel from '../models/Users.js'
import bcrypt from 'bcrypt'

const saltRounds = 10

export const getAll = (req, res) => {
	find({}, (err, result) => {
		if (err) res.send(err)
		else res.send(result)
	})
}

export const createUser = (req, res) => {
	const { _id, password } = req.body
	//hashing the user's password
	bcrypt.hash(password, saltRounds, async (err, hash) => {
		if (err) res.send({ err: 'Server hashing error!' })
		//creating new user with hashed password
		const newUser = new UserModel({ _id: _id, password: hash })
		await newUser
			.save()
			.then(err => res.send({ msg: 'Sign Up Success!' }))
			.catch(err => res.send({ err: 'User already exists!' }))
	})
}

export const login = (req, res) => {
	const { _id, password } = req.body
	//searching in the database for user having _id as email
	UserModel.find({ _id: _id }, (err, result) => {
		if (err) res.send({ err: 'Server error!' })
		else {
			if (result.length === 0) res.send({ err: 'User does not exist!' })
			else {
				//comparing user password and the hashed password in the database
				bcrypt.compare(password, result[0].password, (err, response) => {
					if (response) {
						//creating a session for a user for 24 hours
						req.session.user = result[0]
						console.log(req.session.user)
						res.send({ msg: 'Login successful' })
					} else res.send({ err: 'Wrong password!' })
				})
			}
		}
	})
}

export const isLoggedIn = (req, res) => {
	if (req.session.user) {
		res.send({ loggedIn: true, user: req.session.user })
	} else {
		res.send({ loggedIn: false })
	}
}

export default { getAll, createUser, login, isLoggedIn }
