import React, { FC, useEffect } from 'react'

import { Footer } from './Footer'
import { Header } from './Header'
import { ILayoutProps } from '../../models/layout'
import { useLocation } from 'react-router-dom'



export const Layout: FC<ILayoutProps> = ({ children }) => {
	return (
		<div className="flex flex-col w-full bg-[#F5F8FB]">
			 
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
