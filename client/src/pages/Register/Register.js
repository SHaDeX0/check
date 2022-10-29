import React from 'react'
import './Register.css'

const Register = ({ query }) => {
	return (
		<div className='register'>
			<div className='container'>
				<div className='login'>
					<h2>Login</h2>
					<form>
						<input id='email' name='email' type={'email'} />
						<input id='password' name='password' type={'password'} />
					</form>
				</div>
				<div className='signup'>
					<h2>Sign Up</h2>
					<form>
						<input id='email' name='email' type={'email'} />
						<input id='password' name='password' type={'password'} />
					</form>
				</div>
			</div>
		</div>
	)
}

export default Register
