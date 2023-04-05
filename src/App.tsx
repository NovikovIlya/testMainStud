import { ConfigProvider } from 'antd'
import { useEffect, useRef, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import DropDrag from './components/dnd/test2'
import { Login } from './components/login/Login'
import { Profile } from './components/profile/profile'
import { Registration } from './components/registration/Registration'
import { useAppDispatch } from './store'
import { getAccessToken } from './store/auth/actionCreators'

const App = () => {
	const [isLoginIn, ChangeIsLoginIn] = useState(false)
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const FirstShow = useRef(0)

	useEffect(() => {
		const dataApi = async () => {
			const res = await dispatch(getAccessToken())
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
				<main>
					<Routes>
						<Route path="/*" element={<Login />} />
						<Route path="/registration/*" element={<Registration />} />
						<Route
							path="/profile/*"
							element={isLoginIn ? <Login /> : <Profile />}
						/>
						<Route path="/test/*" element={<DropDrag />} />
					</Routes>
				</main>
			</ConfigProvider>
		</>
	)
}

export default App
