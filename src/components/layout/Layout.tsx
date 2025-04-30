import React, { FC, useEffect } from 'react'

import { Footer } from './Footer'
import { Header } from './Header'
import { ILayoutProps } from '../../models/layout'
import CookieConsent from '../dnd/CookieConsent'
import { useLocation } from 'react-router-dom'

// const YandexMetrikaTracker = () => {
//   const location = useLocation();

//   useEffect(() => {
// 	// Проверка инициализации объекта ym
// 	// @ts-ignore
// 	if (typeof window.ym === 'function') {
// 		// @ts-ignore
// 	  window.ym(100713417, 'hit', location.pathname + location.search);
// 	}
//   }, [location]);

//   return null;
// };

export const Layout: FC<ILayoutProps> = ({ children }) => {
	return (
		<div className="flex flex-col w-full bg-[#F5F8FB]">
			{/* <YandexMetrikaTracker /> */}
			<div className=" flex w-full h-full min-h-screen">
				<div className="flex flex-col w-full">
					<Header />
					{children}
					
				</div>
			</div>
			<Footer />
		</div>
	)
}
