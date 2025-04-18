import { ConfigProvider } from 'antd'
import ru_RU from 'antd/locale/ru_RU'
import { useEffect, useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { useTranslation } from 'react-i18next'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import ErrorFallback from './components/ErrorFallback'
import { NotFound } from './components/NotFound'
import { RequireAuth } from './components/RequireAuth'
import { User } from './components/User'
import { ApproveEmail } from './components/approve/ApproveEmail'
import { CheckEmail } from './components/checkEmail/checkEmail'
import { FormModal } from './components/formUser/AboutUserForm/UserForm'
import { DocumentForm } from './components/formUser/DocumentForm'
import { EducationForm } from './components/formUser/EducationForm'
import { InfoUser } from './components/formUser/InfoUser'
import { InfoUserUpdate } from './components/formUser/InfoUserUpdate'
import { ParentForm } from './components/formUser/ParentForm'
import { WorkForm } from './components/formUser/WorkForm'
import { Login } from './components/login/Login'
import { Notification } from './components/notification/Notification'
import { Redirect } from './components/redirect/Redirect'
import { Registration } from './components/registration/Registration'
import { Service } from './components/service'
import ShortLink from './components/service/ShortLink/ShortLink'
import EditSchedule from './components/service/practices/forming-schedule/EditSchedule'
import { blue004, blue307 } from './utils/color'
import LandingPage from './components/service/LandingPage'

const App = () => {
	const [email, changeEmail] = useState('')
	const [loadLanguage, setLoadLanguage] = useState(false)
	const { i18n } = useTranslation()
	const router = createBrowserRouter([
		{
			path: 'redirect/:id',
			element: <Redirect />
		},
		{
			path: 'registration',
			element: <Registration email={email} changeEmail={changeEmail} />
		},
		{
			path: 'registration/checkingEmail',
			element: <CheckEmail email={email} />
		},
		{
			path: 'api/register/approve/*',
			element: <ApproveEmail />
		},
		{
			path: '/',
			element: <Login />,
			children: [
				// { path: "redirect/:id", element: <Redirect /> },
				// { path: "registration", element: <Registration email={email} changeEmail={changeEmail} /> },
				// { path: "registration/checkingEmail", element: <CheckEmail email={email} /> },
				// { path: "api/register/approve/*", element: <ApproveEmail /> },
			]
		},
		{
			element: <RequireAuth />,
			errorElement: <ErrorFallback />,
			children: [
				{ path: 'user/*', element: <User /> },
				{ path: 'infoUser', element: <InfoUser /> },
				{ path: 'infoUserUpdate', element: <InfoUserUpdate /> },
				{ path: 'form', element: <FormModal /> },
				{ path: 'education', element: <EducationForm /> },
				{ path: 'documents', element: <DocumentForm /> },
				{ path: 'work', element: <WorkForm /> },
				{ path: 'parent', element: <ParentForm /> },
				{ path: 'services/*', element: <Service /> },
				{ path: '*', element: <NotFound /> },
				{ path: 'services/shorturl', element: <ShortLink /> },
				{ path: 'landing', element: <LandingPage /> }


				// { path: "services/practices/formingSchedule/edit/:id", element: <EditSchedule /> },
			]
		}
	])

	useEffect(() => {
		const onLanguageChanged = () => {
			setLoadLanguage(true)
			window.location.reload()
		}
		i18n.on('languageChanged', onLanguageChanged)
		return () => {
			i18n.off('languageChanged', onLanguageChanged)
		}
	}, [i18n])

	if (loadLanguage) {
		return (
			<div className="screen">
				<div className="loader">
					<div className="inner one"></div>
					<div className="inner two"></div>
					<div className="inner three"></div>
				</div>
			</div>
		)
	}

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
				<RouterProvider router={router} />
			</ConfigProvider>
			<Notification />
		</>
	)
}

export default App
