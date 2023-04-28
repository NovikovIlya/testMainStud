import React, { FC } from 'react'

import { Footer } from './Footer'
import { Header } from './Header'
import './Header.scss'
import { Navbar } from './Navbar'

interface ILayoutProps {
	children: React.ReactNode
}

export const Layout: FC<ILayoutProps> = ({ children }) => {
	return (
		<>
			<div className="bg-[#f1f1f1] flex w-full">
				<Navbar />
				<div className="w-full">
					<Header />
					{children}
				</div>
			</div>
			<Footer />
		</>
	)
}
