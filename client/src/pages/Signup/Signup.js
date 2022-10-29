import React, { Component } from 'react'
import Axios from 'axios'
import './Signup.css'
import { Navigate } from 'react-router-dom'

export class Signup extends Component {
	constructor() {
		super()
		this.state = {
			email: '',
			password: '',
			repassword: '',
			err: false,
			msg: false,
			redirect: false,
		}
		Axios.defaults.withCredentials = true
		Axios.get('http://localhost:5000/login')
			.then(res => {
				console.log(res.data.user._id)
				this.setState({ redirect: true })
			})
			.catch(err => {
				console.log(err)
			})
	}

	validator = e => {
		e.preventDefault()
		console.log(this.state)
		if (this.state.email === '' || this.state.password === '' || this.state.repassword === '') return
		if (this.state.password !== this.state.repassword) {
			this.setState({ err: "Passwords don't match" })
			return
		} else {
			this.setState({ err: false })
		}

		Axios.post('http://localhost:5000/createUser', { _id: this.state.email, password: this.state.password })
			.then(({ data }) => {
				if (data.err) {
					this.setState({ err: data.err, suc: false })
				}
				if (data.msg) {
					this.setState({ err: false, suc: data.msg, redirect: true })
				}
			})
			.catch(err => console.log(err))
	}

	render() {
		return (
			<div className='signup'>
				<div className='container'>
					<h2>Sign Up</h2>
					{this.state.err ? <p style={{ color: 'red' }}>{this.state.err}</p> : null}
					{this.state.suc ? <p style={{ color: '#54bab9' }}>{this.state.suc}</p> : null}
					{this.state.redirect ? <Navigate to={'/checklist'} replace={true} /> : null}
					<form onSubmit={this.validator}>
						<input
							type={'email'}
							placeholder='Email'
							required
							onChange={e => this.setState({ email: e.target.value })}
						/>
						<input
							type={'password'}
							placeholder='Password'
							required
							onChange={e => this.setState({ password: e.target.value })}
						/>
						<input
							type={'password'}
							placeholder='Re-Enter Password'
							required
							onChange={e => this.setState({ repassword: e.target.value })}
						/>
						<button>Sign Up</button>
					</form>
				</div>
			</div>
		)
	}
}

export default Signup
