import { ReactNode } from 'react'
import { useLocation } from 'react-router-dom'

import { NavAboutMe } from './aboutMe/NavAboutMe'
import { NavUnifiedServiceCenter } from './documentFlow/NavUnifiedServiceCenter'
import { NavElectronicBook } from './electronicBook/NavElectronicBook'
import { NavPractices } from './practices/NavPractices'
import { NavSchedule } from './schedule/NavSchedule'
import { NavSession } from './session/NavSession'
import { NavSetting } from './setting/NavSetting'
import {NavBusinessTrip} from "./businessTrip/NavBusinessTrip";

export const Service = () => {
	const { pathname } = useLocation()
	return (
		<div className="h-screen w-screen">
			<div className="flex min-h-full">
				{pathname.includes('/services/schedule') && <NavSchedule />}
				{pathname.includes('/services/session') && <NavSession />}
				{pathname.includes('/services/aboutMe') && <NavAboutMe />}
				{pathname.includes('/services/electronicBook') && <NavElectronicBook />}
				{pathname.includes('/services/setting') && <NavSetting />}
				{pathname.includes('/services/practices') && <NavPractices />}
				{pathname.includes('/services/businessTrip') && <NavBusinessTrip />}
				{pathname.includes('/services/unifiedServiceCenter') && (
					<NavUnifiedServiceCenter />
				)}
			</div>
		</div>
	)
}
