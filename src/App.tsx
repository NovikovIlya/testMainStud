import { ConfigProvider } from 'antd'
import { useEffect, useState } from 'react'
import { Cookies } from 'react-cookie'
import { Route, Routes } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

import { ApproveEmail } from './components/approve/ApproveEmail'
import { CheckEmail } from './components/checkEmail/checkEmail'
import { FormModal } from './components/formUser/AboutUserForm/UserForm'
import { DocumentForm } from './components/formUser/DocumentForm/DocumentForm'
import { EducationForm } from './components/formUser/EducationForm/EducationForm'
import { InfoUser } from './components/formUser/InfoUser'
import { ParentForm } from './components/formUser/ParentForm/ParentForm'
import { WorkForm } from './components/formUser/WorkForm/WorkForm'
import { Login } from './components/login/Login'
import { Registration } from './components/registration/Registration'
import Service from './components/service'
import { User } from './components/user/User'
import { useAppDispatch } from './store'
import { refreshToken } from './store/creators/MainCreators'

const App = () => {
	const cookies = new Cookies()
	const [email, changeEmail] = useState('')

	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const currentUrl = useLocation()

	const dataApi = async () => {
		const res = await refreshToken(dispatch)
		if (res === 200) {
			const isTrue = [
				'/form',
				'/parent',
				'/work',
				'/documents',
				'/education'
			].some(el => el === currentUrl.pathname)
			// if (isTrue) {
			// 	navigate('/infoUser')
			// } else {
			// 	navigate(currentUrl.pathname)
			// }
		}
		if (res === 403) {
			navigate('/')
		}
	}
	useEffect(() => {
		console.log('here')
		if (
			localStorage.getItem('access') !== null ||
			localStorage.getItem('userInfo') !== null ||
			cookies.get('refresh') !== undefined
		) {
			dataApi()
		} else {
			console.log('here')
			const isBasePages = [
				'/',
				'/login',
				'/registration',
				'/api/register/approve',
				'/registration/checkingEmail'
			].some(el => el === currentUrl.pathname)
			console.log(isBasePages)
			isBasePages ? navigate(currentUrl.pathname) : navigate('/')
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
				<Routes>
					<Route path="/*" element={<Login />} />
					<Route
						path="/registration/*"
						element={<Registration changeEmail={changeEmail} />}
					/>
					<Route path="/user/*" element={<User />} />
					<Route path="/api/register/approve" element={<ApproveEmail />} />
					<Route path="/infoUser" element={<InfoUser />} />
					<Route path="/form" element={<FormModal />} />
					<Route path="/education" element={<EducationForm />} />
					<Route path="/documents" element={<DocumentForm />} />
					<Route path="/work" element={<WorkForm />} />
					<Route path="/parent" element={<ParentForm />} />
					<Route
						path="/registration/checkingEmail"
						element={<CheckEmail email={email} />}
					/>
					<Route path="/services/*" element={<Service />} />
				</Routes>
			</ConfigProvider>
		</>
	)
}

export default App
