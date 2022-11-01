import Axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import './Checklist.css'
import { Link, useNavigate } from 'react-router-dom'

const Checklist = () => {
	const [user, setUser] = useState(null)
	const [itemName, setItemName] = useState('')
	const [list, setList] = useState([])
	const nav = useNavigate()
	const firstRun = useRef(true)

	Axios.defaults.withCredentials = true

	const logout = () => {
		Axios.post('http://localhost:5000/updateList', list)
			.then(res => {
				if (res.data.err) return
				if (res.data.msg) {
					Axios.get('http://localhost:5000/logout')
						.then(res => {
							nav('/login')
						})
						.catch(err => console.log(err))
				}
			})
			.catch(err => console.log(err))
	}

	const addItem = e => {
		e.preventDefault()
		if (!itemName || itemName.length === 0) return
		if (itemName.length < 55) {
			setList(list => [...list, { item: itemName, checked: false }])
			setItemName(null)
			document.getElementById('itemname').value = ''
		} else {
			setItemName(null)
			document.getElementById('itemname').value = ''
		}
	}

	const itemChecked = e => {
		setList(list =>
			list.map((item, i) => {
				if (i === parseInt(e.target.id)) item.checked = e.target.checked
				return item
			})
		)
	}

	useEffect(() => {
		Axios.get('http://localhost:5000/login')
			.then(res => {
				if (res.data.loggedIn) {
					setUser(res.data.user.name)
					if (res.data.user.checklist.length > 0) setList(res.data.user.checklist)
				} else nav('/login')
			})
			.catch(err => {
				console.log(err)
			})
		window.addEventListener('unload', () => {})
	}, [nav])

	useEffect(() => {
		if (!firstRun.current)
			Axios.post('http://localhost:5000/updateList', list)
				.then(res => {
					if (res.data.err) {
						if (res.data.err.includes('login')) nav('/login')
						else {
							console.log(res.data.err)
							return
						}
					}
					if (res.data.msg) {
						console.log(res.data.result.checklist)
					}
				})
				.catch(err => console.log(err))
		else firstRun.current = false
	}, [list])

	return (
		<>
			<div className='checklist'>
				<div className='navbar'>
					<h1>Checklist</h1>
					<div className='nav-container'>
						<div className='nav-item' style={{ color: '#ffd369' }}>
							<h2>{user}</h2>
						</div>
						<div className='nav-item'>
							<Link to='/login' onClick={() => logout()}>
								<h2>Log Out</h2>
							</Link>
						</div>
					</div>
				</div>
				<div className='hero'>
					<form className='add-new-item'>
						<input
							id='itemname'
							type={'text'}
							onChange={e => setItemName(e.target.value.trim())}
							placeholder='Add item...'
							required
						/>
						<button onClick={e => addItem(e)}>+</button>
					</form>
					{list ? (
						<div className='item-list'>
							{list
								? list.map((item, i) => {
										return (
											<form key={i}>
												<input
													id={i}
													name={i}
													type={'checkbox'}
													onChange={e => itemChecked(e)}
													defaultChecked={item.checked}
												/>
												<label htmlFor={i}>{item.item}</label>
											</form>
										)
								  })
								: null}
						</div>
					) : null}
				</div>
			</div>
		</>
	)
}

export default Checklist
