const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const { getAll, createUser, login, isLoggedIn, logout, updateList } = require('./utils/Methods.js')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const session = require('express-session')
require('dotenv').config()

const app = express()
app.use(express.json())
app.use(
	cors({
		origin: ['http://localhost:3000'],
		methods: ['GET', 'POST'],
		credentials: true,
	})
)
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(
	session({
		key: 'user',
		secret: process.env.SECRET,
		resave: false,
		saveUninitialized: false,
		cookie: {
			expires: 7 * 24 * 60 * 60 * 1000,
		},
	})
)

mongoose.connect(process.env.MONGODB_CONNECTION_STRING)

app.get('/getUsers', getAll)

app.post('/createUser', createUser)

app.post('/login', login)

app.get('/login', isLoggedIn)

app.get('/logout', logout)

app.post('/updateList', updateList)

app.listen(process.env.PORT, () => {
	console.log(`Server running on port ${process.env.PORT}...`)
})
