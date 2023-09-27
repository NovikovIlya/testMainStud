import { ConfigProvider } from 'antd'
import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'

import { RequireAuth } from './components/RequireAuth'
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

const App = () => {
	const [email, changeEmail] = useState('')

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
					<Route path="/">
						<Route path="/" element={<Login />}></Route>
						<Route
							path="/registration"
							element={<Registration email={email} changeEmail={changeEmail} />}
						></Route>
					</Route>
					<Route element={<RequireAuth />}>
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
					</Route>
				</Routes>
			</ConfigProvider>
		</>
	)
}

export default App
