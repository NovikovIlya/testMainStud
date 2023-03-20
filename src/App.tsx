import { ConfigProvider } from 'antd'
import { Route, Routes } from 'react-router-dom'

import { Login } from './components/login/Login'
import { Registration } from './components/registration/Registration'

const App = () => {
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
					</Routes>
				</main>
			</ConfigProvider>
		</>
	)
}

export default App
