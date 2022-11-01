import React, { useEffect, useState } from 'react'
import './Login.css'
import Axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [err, setErr] = useState(false)
	const [suc, setSuc] = useState(false)
	const nav = useNavigate()

	Axios.defaults.withCredentials = true

	const validator = e => {
		e.preventDefault()
		if (email === '' || password === '') return
		Axios.post('http://localhost:5000/login', { _id: email, password: password })
			.then(({ data }) => {
				if (data.err) {
					setErr(data.err)
					setSuc(false)
				}
				if (data.msg) {
					setSuc(data.msg)
					setErr(false)
					nav('/checklist')
				}
			})
			.catch(err => setErr(err))
	}

	useEffect(() => {
		Axios.get('http://localhost:5000/login')
			.then(res => {
				console.log(res.data)
				if (res.data.loggedIn) nav('/checklist')
			})
			.catch(err => {
				console.log(err)
			})
	}, [nav])

	return (
		<div className='login'>
			<div className='container'>
				<h2>Log In</h2>
				{err ? <p style={{ color: 'red' }}>{err}</p> : null}
				{suc ? <p style={{ color: '#54bab9' }}>Login successful</p> : null}
				<form onSubmit={validator}>
					<input type={'email'} placeholder='Email' required onChange={e => setEmail(e.target.value)} />
					<input type={'password'} placeholder='Password' required onChange={e => setPassword(e.target.value)} />
					<button>Log In</button>
				</form>
				<Link to='/register'>
					<p>Don't have an account?</p>
				</Link>
			</div>
		</div>
	)
}

export default Login
