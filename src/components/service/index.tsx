import React, { ReactNode } from 'react'
import { useLocation } from 'react-router-dom'

import { Header } from '../layout/Header'

import { NavSchedule } from './schedule/NavSchedule'
import { NavSession } from './session/NavSession'

const Service = ({ children }: { children?: ReactNode }) => {
	const { pathname } = useLocation()

	return (
		<div className="h-screen w-screen">
			<Header type="service" service="Сервис Студент" />
			<div className="flex min-h-full pt-20">
				{pathname.includes('/services/schedule') && <NavSchedule />}
				{pathname.includes('/services/session') && <NavSession />}
			</div>
		</div>
	)
}
export default Service
