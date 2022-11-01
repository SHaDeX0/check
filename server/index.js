const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const { getAll, createUser, login, isLoggedIn, logout, updateList } = require('./utils/Methods.js')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const session = require('express-session')
const dotenv = require('dotenv')

dotenv.config()
const app = express()
app.use(express.json())
app.use(
	cors({
		origin: ['https://shadex-check.netlify.app', 'http://localhost:3000'],
		methods: ['GET', 'POST'],
		credentials: true,
	})
)
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(
	session({
		key: 'user',
		secret: 'ThisIsAVeryBigSecretKeyThatIAmKeepingJustDontLoseItUnderstoodYesUnderstood',
		resave: false,
		saveUninitialized: false,
		cookie: {
			expires: 24 * 60 * 60 * 1000,
		},
	})
)

mongoose.connect('mongodb+srv://root:root@check.zkip0sa.mongodb.net/check?retryWrites=true&w=majority')

app.get('/getUsers', getAll)

app.post('/createUser', createUser)

app.post('/login', login)

app.get('/login', isLoggedIn)

app.get('/logout', logout)

app.post('/updateList', updateList)

app.listen(process.env.PORT || 5000, () => {
	console.log('Server running on port 5000...')
})
