import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import './18n'
import App from './App'
import './index.scss'
import { store } from './store'
import CookieConsent from './components/dnd/CookieConsent'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
	// <BrowserRouter>
		<React.StrictMode>
			<Suspense
				fallback={
					<div className="screen">
						<div className="loader">
							<div className="inner one"></div>
							<div className="inner two"></div>
							<div className="inner three"></div>
						</div>
					</div>
				}
			>
				<Provider store={store}>
					<App />
					<CookieConsent/>
				</Provider>
			</Suspense>
		</React.StrictMode>
	//  </BrowserRouter>
)
