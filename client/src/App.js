import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Error from './pages/Error/Error'
// import Register from './pages/Register'
import Login from './pages/Login/Login'
import Signup from './pages/Signup/Signup'
import Checklist from './pages/Checklist/Checklist'

const App = () => {
	return (
		<>
			<Router>
				<Routes>
					<Route path='/' element={<Home />} />
					{/* <Route path='/login' element={<Register query='login' />} />
					<Route path='/register' element={<Register query='register' />} />
					<Route path='/profile' element={<Profile />} /> */}
					<Route path='/login' element={<Login />} />
					<Route path='/register' element={<Signup />} />
					<Route path='/checklist' element={<Checklist />} />
					<Route path='*' element={<Error />} />
				</Routes>
			</Router>
		</>
	)
}

export default App
