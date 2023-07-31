import React, { ReactNode } from 'react'

import { Header } from '../layout/Header'

import { NavLayout } from './NavLayout'

export const Layout = ({ children }: { children: ReactNode }) => {
	return (
		<div className="h-screen w-screen">
			<Header type="service" />
			<div className="flex min-h-full pt-20">
				<NavLayout className="min-w-[230px] mt-14 flex flex-col gap-4" />
				<div className="bg-[#F5F8FB] w-full">{children}</div>
			</div>
		</div>
	)
}
