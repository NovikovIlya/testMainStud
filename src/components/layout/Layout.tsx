import React, { FC } from 'react';



import { Footer } from './Footer'
import { Header } from './Header'

interface ILayoutProps {
	children: React.ReactNode
}

export const Layout: FC<ILayoutProps> = ({ children }) => {
	return (
		<div className="flex flex-col w-full ">
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