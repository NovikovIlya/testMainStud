import { ReactNode } from 'react'
import {Navigate, useLocation, useNavigate} from 'react-router-dom'

import { NavAboutMe } from './aboutMe/NavAboutMe'
import { NavUnifiedServiceCenter } from './documentFlow/NavUnifiedServiceCenter'
import { NavElectronicBook } from './electronicBook/NavElectronicBook'
import { NavPractices } from './practices/NavPractices'
import { NavSchedule } from './schedule/NavSchedule'
import { NavSession } from './session/NavSession'
import { NavSetting } from './setting/NavSetting'
import {NavBusinessTrip} from "./businessTrip/NavBusinessTrip";
import {useCheckIsEmployeeQuery} from "../../store/api/practiceApi/contracts";
import {useGetContractsAllQuery} from "../../store/api/practiceApi/roster";

export const Service = () => {
	const { pathname } = useLocation()
	const userData = localStorage.getItem('practice')
	const nav = useNavigate()

	const isEmployee = userData === 'practice'

	return (
		<div className="h-screen w-screen">
			<div className="flex min-h-full">
				{pathname.includes('/services/schedule') && <NavSchedule />}
				{pathname.includes('/services/session') && <NavSession />}
				{pathname.includes('/services/aboutMe') && <NavAboutMe />}
				{pathname.includes('/services/electronicBook') && <NavElectronicBook />}
				{pathname.includes('/services/setting') && <NavSetting />}
				{
					isEmployee
					&&
					pathname.includes('/services/practices')
						?
						<NavPractices/>
						:
						<Navigate to={'/user'}/>
				}

				{/*{pathname.includes('/services/businessTrip') && <NavBusinessTrip />}*/}
				{pathname.includes('/services/unifiedServiceCenter') && (
					<NavUnifiedServiceCenter />
				)}
			</div>
		</div>
	)
}
