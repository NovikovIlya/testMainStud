// import { ConfigProvider } from 'antd'
// import { useEffect, useState } from 'react'
// import { Route, Routes } from 'react-router-dom'

// import { RequireAuth } from './components/RequireAuth'
// import { User } from './components/User'
// import { ApproveEmail } from './components/approve/ApproveEmail'
// import { CheckEmail } from './components/checkEmail/checkEmail'
// import { FormModal } from './components/formUser/AboutUserForm/UserForm'
// import { DocumentForm } from './components/formUser/DocumentForm'
// import { EducationForm } from './components/formUser/EducationForm'
// import { InfoUser } from './components/formUser/InfoUser'
// import { ParentForm } from './components/formUser/ParentForm'
// import { WorkForm } from './components/formUser/WorkForm'
// import { Login } from './components/login/Login'
// import { Registration } from './components/registration/Registration'
// import { Service } from './components/service'
// import { blue004, blue307 } from './utils/color'
// import {Redirect} from "./components/redirect/Redirect";
// import ru_RU from 'antd/locale/ru_RU';
// import { NotFound } from './components/NotFound'
// import { Notification } from './components/notification/Notification'
// import EditSchedule from './components/service/practices/forming-schedule/EditSchedule'
// import ErrorFallback from './components/ErrorFallback'
// import { checkAndResetStorage } from './utils/storageVersion'
// import { InfoUserUpdate } from './components/formUser/InfoUserUpdate'


// const App = () => {
// 	const [email, changeEmail] = useState('')


	
// 	useEffect(() => {
// 		const wasReset = checkAndResetStorage();
// 		if (wasReset) {
// 		  console.log('Локальное хранилище было сброшено из-за обновления версии');
// 		}
// 	  }, []);

// 	return (
// 		<>
// 			<ConfigProvider
// 				theme={{
// 					token: {
// 						colorPrimary: blue307,
// 						colorPrimaryHover: blue004
// 					}
// 				}}
// 				locale={ru_RU}
// 			>
		
// 					<Routes>
// 						<Route path="/">
// 							<Route path={"/redirect/:id"} element={<Redirect/>}/>
// 							<Route path="/" element={<Login />} />
// 							<Route
// 								path="/registration"
// 								element={<Registration email={email} changeEmail={changeEmail} />}
// 							/>
// 							<Route
// 								path="/registration/checkingEmail"
// 								element={<CheckEmail email={email} />
// 							}
// 							/>
// 							<Route path="/api/register/approve/*" element={<ApproveEmail />} />
// 						</Route>
// 						<Route element={<RequireAuth />}>
// 							<Route path="/user/*" element={<User />} />
// 							<Route path="/infoUser" element={<InfoUser />} />
// 							<Route path="/infoUserUpdate" element={<InfoUserUpdate />} />
// 							<Route path="/form" element={<FormModal />} />
// 							<Route path="/education" element={<EducationForm />} />
// 							<Route path="/documents" element={<DocumentForm />} />
// 							<Route path="/work" element={<WorkForm />} />
// 							<Route path="/parent" element={<ParentForm />} />
// 							<Route path="/services/*" element={<Service />} />
// 							<Route path="/*" element={<NotFound/>} />
// 							{/* <Route path="/services/practices/formingSchedule/edit/:id" element={<EditSchedule />} /> */}
// 						</Route>
// 					</Routes>
				
// 			</ConfigProvider>
// 			<Notification/>
// 		</>
// 	)
// }

// export default App










import { ConfigProvider } from 'antd';
import { useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { RequireAuth } from './components/RequireAuth';
import { User } from './components/User';
import { ApproveEmail } from './components/approve/ApproveEmail';
import { CheckEmail } from './components/checkEmail/checkEmail';
import { FormModal } from './components/formUser/AboutUserForm/UserForm';
import { DocumentForm } from './components/formUser/DocumentForm';
import { EducationForm } from './components/formUser/EducationForm';
import { InfoUser } from './components/formUser/InfoUser';
import { ParentForm } from './components/formUser/ParentForm';
import { WorkForm } from './components/formUser/WorkForm';
import { Login } from './components/login/Login';
import { Registration } from './components/registration/Registration';
import { Service } from './components/service';
import { blue004, blue307 } from './utils/color';
import { Redirect } from "./components/redirect/Redirect";
import ru_RU from 'antd/locale/ru_RU';
import { NotFound } from './components/NotFound';
import { Notification } from './components/notification/Notification';
import EditSchedule from './components/service/practices/forming-schedule/EditSchedule';
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from './components/ErrorFallback';


const App = () => {
    const [email, changeEmail] = useState('');

    const router = createBrowserRouter([
        {
            path: "redirect/:id",
            element: <Redirect />,
        },
        {
            path: "registration",
            element: <Registration email={email} changeEmail={changeEmail}  />,
        },
        {
            path: "registration/checkingEmail",
            element: <CheckEmail email={email}  />,
        },
        {
            path: "api/register/approve/*",
            element: <ApproveEmail  />,
        },
        {
            path: "/",
            element: <Login />,
            children: [
                // { path: "redirect/:id", element: <Redirect /> },
                // { path: "registration", element: <Registration email={email} changeEmail={changeEmail} /> },
                // { path: "registration/checkingEmail", element: <CheckEmail email={email} /> },
                // { path: "api/register/approve/*", element: <ApproveEmail /> },
            ],
        },
        {
            element: <RequireAuth />,
			errorElement: <ErrorFallback/>,
            children: [
                { path: "user/*", element: <User /> },
                { path: "infoUser", element: <InfoUser /> },
                { path: "form", element: <FormModal /> },
                { path: "education", element: <EducationForm /> },
                { path: "documents", element: <DocumentForm /> },
                { path: "work", element: <WorkForm /> },
                { path: "parent", element: <ParentForm /> },
                { path: "services/*", element: <Service /> },
                { path: "*", element: <NotFound /> },
			
                // { path: "services/practices/formingSchedule/edit/:id", element: <EditSchedule /> },
            ],
        },
    ]);

    return (
        <>
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: blue307,
                        colorPrimaryHover: blue004,
                    },
                }}
                locale={ru_RU}
            >
                    <RouterProvider router={router} />
            </ConfigProvider>
            <Notification />
        </>
    );
};

export default App;