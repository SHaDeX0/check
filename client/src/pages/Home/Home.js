import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Home.css'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import GitHubIcon from '@mui/icons-material/GitHub'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Home = () => {
	const nav = useNavigate()
	Axios.defaults.withCredentials = true
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
		<div className='home' id='home'>
			<div className='navbar'>
				<h1>Check</h1>
				<div className='nav-container'>
					<div className='nav-item'>
						<a href='#home'>
							<h2>Home</h2>
						</a>
					</div>
					<div className='nav-item'>
						<a href='#about'>
							<h2>About</h2>
						</a>
					</div>
					<div className='nav-item'>
						<Link to='/login'>
							<h2>Login</h2>
						</Link>
					</div>
					<div className='nav-item'>
						<Link to='/register'>
							<h2>Sign Up</h2>
						</Link>
					</div>
				</div>
			</div>
			<div className='hero'>
				<p>Complete your daily checklist needs here</p>
				<form>
					<div>
						<input type={'checkbox'} id='first' name='first' />
						<label htmlFor='first'>Workout day 3</label>
					</div>

					<div>
						<input type={'checkbox'} id='second' name='second' />
						<label htmlFor='second'>Meeting at 7:30PM</label>
					</div>

					<div>
						<input type={'checkbox'} id='third' name='third' />
						<label htmlFor='third'>Buy groceries</label>
					</div>
				</form>
				<p>
					<span>👆</span>Try it out above!👆
				</p>
			</div>
			<div className='about' id='about'>
				<h2>About Me</h2>
				<h3 style={{ paddingTop: '2rem' }}>Suryanarayan Bhat</h3>
				<p>
					Hi! I'm a student at Canara Engineering College
					<br />I started developing this application on 28th October 2022
					<br />
					Technology used: MERN
				</p>
				<div className='icons'>
					<a
						href={'https://api.whatsapp.com/send/?phone=09869760456&text='
							.concat(encodeURI('Hello Surya, I reached here from your Check application.'))
							.concat('&app_absent=0')}
						rel='noreferrer'
						target='_blank'
					>
						<WhatsAppIcon sx={{ fontSize: '3rem' }} id='what' />
					</a>
					<a
						href='mailto:suryanarayanbhat1810@gmail.com?subject=Check&body=Hello Surya, I reached here from your Check application.'
						target='_blank'
						rel='noreferrer'
					>
						<MailOutlineIcon sx={{ fontSize: '3rem' }} id='gmail' />
					</a>
					<a href='https://github.com/SHaDeX0' target='_blank' rel='noreferrer'>
						<GitHubIcon sx={{ fontSize: '3rem' }} id='git' />
					</a>
				</div>
			</div>
		</div>
	)
}

export default Home
