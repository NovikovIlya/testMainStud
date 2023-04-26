import React, { FC } from 'react'

import { Navbar } from './Navbar'

interface ILayoutProps {
	children: React.ReactNode
}

export const Layout: FC<ILayoutProps> = ({ children }) => {
	return (
		<div className="bg-[#AAB3C1] bg-opacity-20">
			<Navbar />
		</div>
	)
}
