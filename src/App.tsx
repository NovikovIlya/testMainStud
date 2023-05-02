import { ConfigProvider } from 'antd'
import { useEffect, useRef, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import { Login } from './components/login/Login'
import { Profile } from './components/profile/profile'
import { Registration } from './components/registration/Registration'
import { User } from './components/user/User'
import { useAppDispatch } from './store'
import { RequestForTokens } from './store/creators/MainCreators'

const App = () => {
	const [isLogIn, changeIsLogIn] = useState(false)
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const firstShow = useRef(0)

	useEffect(() => {
		const dataApi = async () => {
			const res = await dispatch(RequestForTokens())
			if (res === '200') {
				changeIsLogIn(false)
				navigate('/profile')
			}
			if (res === '403') {
				navigate('/')
				changeIsLogIn(true)
				firstShow.current = 0
			}
		}
		if (firstShow.current === 0) {
			dataApi()
			firstShow.current = 1
		}
	}, [navigate, dispatch])

	return (
		<>
			<ConfigProvider
				theme={{
					token: {
						colorPrimary: '#004EC2',
						colorPrimaryHover: '#0E1F81'
					}
				}}
			>
				<div>
					<Routes>
						<Route
							path="/*"
							element={<Login changeIsLogIn={changeIsLogIn} />}
						/>
						<Route path="/registration/*" element={<Registration />} />
						<Route
							path="/profile/*"
							element={
								isLogIn ? <Login changeIsLogIn={changeIsLogIn} /> : <Profile />
							}
						/>
						<Route path="/user/*" element={<User />} />
					</Routes>
				</div>
			</ConfigProvider>
		</>
	)
}

export default App
