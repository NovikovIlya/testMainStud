import React, { FC } from 'react'

import { Header } from './Header'
import './Header.scss'
import { Navbar } from './Navbar'

interface ILayoutProps {
	children: React.ReactNode
}

export const Layout: FC<ILayoutProps> = ({ children }) => {
	return (
		<div className="grad flex">
			<Navbar />
			<Header />
		</div>
	)
}
