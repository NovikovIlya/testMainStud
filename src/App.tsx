import { ConfigProvider } from 'antd'
import { useEffect, useRef, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import { LayoutApp } from './components/dnd/layout/Layout'
import { Login } from './components/login/Login'
import { OtherUser } from './components/other-user/OtherUser'
import { Profile } from './components/profile/profile'
import { Registration } from './components/registration/Registration'
import { useAppDispatch } from './store'
import { RequestForTokens } from './store/creators/MainCreators'

const App = () => {
	const [isLogIn, ChangeIsLogIn] = useState(false)
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const FirstShow = useRef(0)

	useEffect(() => {
		const dataApi = async () => {
			const res = await dispatch(RequestForTokens())
			if (res === '200') {
				ChangeIsLogIn(false)
				navigate('/profile')
			}
			if (res === '403') {
				navigate('/')
				ChangeIsLogIn(true)
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
						<Route
							path="/*"
							element={<Login ChangeIsLogIn={ChangeIsLogIn} />}
						/>
						<Route path="/registration/*" element={<Registration />} />
						<Route
							path="/profile/*"
							element={
								isLogIn ? <Login ChangeIsLogIn={ChangeIsLogIn} /> : <Profile />
							}
						/>
						<Route path="/test/*" element={<LayoutApp />} />
						<Route path="/user/*" element={<OtherUser />} />
					</Routes>
				</div>
			</ConfigProvider>
		</>
	)
}

export default App
