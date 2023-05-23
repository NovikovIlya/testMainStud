import { ConfigProvider } from 'antd'
import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import { ApproveEmail } from './components/approve/ApproveEmail'
import { Login } from './components/login/Login'
import { Profile } from './components/profile/profile'
import { Registration } from './components/registration/Registration'
import { User } from './components/user/User'
import { useAppDispatch } from './store'
import { refreshToken } from './store/creators/MainCreators'

const App = () => {
	const [isLogIn, changeIsLogIn] = useState(false)

	const navigate = useNavigate()
	const dispatch = useAppDispatch()

	const dataApi = async () => {
		const res = await dispatch(refreshToken())
		if (res === 200) {
			changeIsLogIn(false)
			navigate('/profile')
		}
		if (res === 403) {
			navigate('/')
			changeIsLogIn(true)
		}
	}
	useEffect(() => {
		if (
			localStorage.getItem('userInfo') !== null &&
			localStorage.getItem('access') !== null
		) {
			dataApi()
		}
	})

	return (
		<>
			<ConfigProvider
				theme={{
					token: {
						colorPrimary: '#3073D7',
						colorPrimaryHover: '#004EC2'
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
						<Route path="/api/register/approve" element={<ApproveEmail />} />
					</Routes>
				</div>
			</ConfigProvider>
		</>
	)
}

export default App
