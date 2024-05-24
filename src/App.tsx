import { ConfigProvider } from 'antd'
import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'

import { RequireAuth } from './components/RequireAuth'
import { User } from './components/User'
import { ApproveEmail } from './components/approve/ApproveEmail'
import { CheckEmail } from './components/checkEmail/checkEmail'
import { FormModal } from './components/formUser/AboutUserForm/UserForm'
import { DocumentForm } from './components/formUser/DocumentForm'
import { EducationForm } from './components/formUser/EducationForm'
import { InfoUser } from './components/formUser/InfoUser'
import { ParentForm } from './components/formUser/ParentForm'
import { WorkForm } from './components/formUser/WorkForm'
import { Login } from './components/login/Login'
import { Registration } from './components/registration/Registration'
import { Service } from './components/service'
import { blue004, blue307 } from './utils/color'
import {Redirect} from "./components/redirect/Redirect";
import ru_RU from 'antd/locale/ru_RU';
const App = () => {
	const [email, changeEmail] = useState('')

	return (
		<>
			<ConfigProvider
				theme={{
					token: {
						colorPrimary: blue307,
						colorPrimaryHover: blue004
					}
				}}
				locale={ru_RU}
			>
				<Routes>
					<Route path="/">
						<Route path={"/redirect/:id"} element={<Redirect/>}/>
						<Route path="/" element={<Login />} />
						<Route
							path="/registration"
							element={<Registration email={email} changeEmail={changeEmail} />}
						/>
						<Route
							path="/registration/checkingEmail"
							element={<CheckEmail email={email} />}
						/>
						<Route path="/api/register/approve/*" element={<ApproveEmail />} />
					</Route>
					<Route element={<RequireAuth />}>
						<Route path="/user/*" element={<User />} />
						<Route path="/infoUser" element={<InfoUser />} />
						<Route path="/form" element={<FormModal />} />
						<Route path="/education" element={<EducationForm />} />
						<Route path="/documents" element={<DocumentForm />} />
						<Route path="/work" element={<WorkForm />} />
						<Route path="/parent" element={<ParentForm />} />
						<Route path="/services/*" element={<Service />} />
						<Route path="/*" element={null} />
					</Route>
				</Routes>
			</ConfigProvider>
		</>
	)
}

export default App
