import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import './18n'
import App from './App'
import './index.scss'
import { store } from './store'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
	<BrowserRouter>
		<React.StrictMode>
			<Suspense fallback={<div>loading...</div>}>
				<Provider store={store}>
					<App />
				</Provider>
			</Suspense>
		</React.StrictMode>
	</BrowserRouter>
)
