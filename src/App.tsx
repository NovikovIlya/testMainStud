import { ConfigProvider } from 'antd'
import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import { Login } from './components/login/Login'
import { Profile } from './components/profile/profile'
import { Registration } from './components/registration/Registration'
import { useAppDispatch } from './store'
import { getAccessToken } from './store/auth/actionCreators'

const App = () => {
	const [isLoginIn, ChangeIsLoginIn] = useState(false)
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	useEffect(() => {
		const dataApi = async () => {
			const res = await dispatch(getAccessToken())
			if (res !== null) {
				navigate('/profile')
				ChangeIsLoginIn(false)
			} else {
				ChangeIsLoginIn(true)
			}
		}
		dataApi()
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
					</Routes>
				</main>
			</ConfigProvider>
		</>
	)
}

export default App
