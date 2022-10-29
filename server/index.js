import express, { json } from 'express'
import { connect } from 'mongoose'
import cors from 'cors'
import { getAll, createUser, login, isLoggedIn } from './utils/Methods.js'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import session from 'express-session'

const app = express()
app.use(json())
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
		secret: 'SHaDeX',
		resave: false,
		saveUninitialized: false,
		cookie: {
			expires: 24 * 60 * 60 * 1000,
		},
	})
)

connect('mongodb+srv://root:root@check.zkip0sa.mongodb.net/check?retryWrites=true&w=majority')

app.get('/getUsers', getAll)

app.post('/createUser', createUser)

app.post('/login', login)
app.get('/login', isLoggedIn)

app.listen(5000, () => {
	console.log('Server running on port 5000...')
})
