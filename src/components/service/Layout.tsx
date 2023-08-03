import React, { ReactNode } from 'react'

import { Header } from '../layout/Header'

import { NavLayout } from './NavLayout'

export const Layout = ({ children }: { children?: ReactNode }) => {
	return (
		<div className="h-screen w-screen">
			<Header type="service" service="Сервис Студент" />
			<div className="flex min-h-full pt-20">
				<NavLayout  />
			</div>
		</div>
	)
}
