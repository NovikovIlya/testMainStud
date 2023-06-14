import { ConfigProvider } from 'antd';
import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';



import { ApproveEmail } from './components/approve/ApproveEmail'
import { EducationForm } from './components/formUser/EducationForm/EducationForm'
import { FormModal } from './components/formUser/Form/UserForm'
import { InfoUser } from './components/formUser/InfoUser'
import { Login } from './components/login/Login'
import { Registration } from './components/registration/Registration'
import { User } from './components/user/User'
import { useAppDispatch } from './store'
import { refreshToken } from './store/creators/MainCreators'
import { logoutSuccess } from './store/reducers/AuthRegReducer'

const App = () => {
	const [isLogin, changeIsLogin] = useState(true)

	const navigate = useNavigate()
	const dispatch = useAppDispatch()

	const dataApi = async () => {
		const res = await dispatch(refreshToken())
		if (res === 200) {
			changeIsLogin(false)
			navigate('/infoUser')
		}
		if (res === 403) {
			navigate('/')
			changeIsLogin(true)
		}
	}
	useEffect(() => {
		if (
			localStorage.getItem('userInfo') !== null &&
			localStorage.getItem('access') !== null
		) {
			dataApi()
		} else {
			if (!isLogin) {
				dispatch(logoutSuccess())
				navigate('/')
			}
		}
	}, [])

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
							element={<Login changeIsLogin={changeIsLogin} />}
						/>
						<Route path="/registration/*" element={<Registration />} />
						<Route
							path="/profile/*"
							element={
								isLogin ? <Login changeIsLogin={changeIsLogin} /> : <InfoUser />
							}
						/>
						<Route path="/user/*" element={<User />} />
						<Route
							path="/api/register/approve"
							element={<ApproveEmail changeIsLogin={changeIsLogin} />}
						/>
						<Route path="/infoUser" element={<InfoUser />} />
						<Route path="/form" element={<FormModal />} />
						<Route path="/education" element={<EducationForm />} />
					</Routes>
				</div>
			</ConfigProvider>
		</>
	)
}

export default App