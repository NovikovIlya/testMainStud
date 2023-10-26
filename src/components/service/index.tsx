import React, { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'

import { Header } from '../layout/Header'

import { NavAboutMe } from './aboutMe/NavAboutMe'
import { NavElectronicBook } from './electronicBook/NavElectronicBook'
import { NavSchedule } from './schedule/NavSchedule'
import { NavSession } from './session/NavSession'

export const Service = ({ children }: { children?: ReactNode }) => {
	const { pathname } = useLocation()
	const { t } = useTranslation()
	return (
		<div className="h-screen w-screen">
			<Header type="service" service={t('StudentService')} />
			<div className="flex min-h-full pt-20">
				{pathname.includes('/services/schedule') && <NavSchedule />}
				{pathname.includes('/services/session') && <NavSession />}
				{pathname.includes('/services/aboutMe') && <NavAboutMe />}
				{pathname.includes('/services/electronicBook') && <NavElectronicBook />}
			</div>
		</div>
	)
}
