import { ConfigProvider } from 'antd'
import { useEffect, useRef, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import { LayoutApp } from './components/dnd/layout/Layout'
import { Login } from './components/login/Login'
import { Profile } from './components/profile/profile'
import { Registration } from './components/registration/Registration'
import { useAppDispatch } from './store'
import { RequestForTokens } from './store/creators/MainCreators'

const App = () => {
	const [isLoginIn, ChangeIsLoginIn] = useState(false)
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const FirstShow = useRef(0)

	useEffect(() => {
		const dataApi = async () => {
			const res = await dispatch(RequestForTokens())
			if (res !== null) {
				ChangeIsLoginIn(false)
				navigate('/profile')
			}
			if (res === '403') {
				navigate('/')
				ChangeIsLoginIn(true)
				FirstShow.current = 0
			}
		}
		if (FirstShow.current === 0) {
			dataApi()
			FirstShow.current = 1
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
						<Route path="/*" element={<Login />} />
						<Route path="/registration/*" element={<Registration />} />
						<Route
							path="/profile/*"
							element={isLoginIn ? <Login /> : <Profile />}
						/>
						<Route path="/test/*" element={<LayoutApp />} />
					</Routes>
				</div>
			</ConfigProvider>
		</>
	)
}

export default App
