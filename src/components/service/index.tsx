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
import { NavMyPractices } from './myPractice/navMyPractice'
import AboutUniversity from '../aboutUniversity/AboutUnversity'
import { NavPracticeTeacher } from './practiceTeacher/navMyPractice'
import { NavMessages } from './messages/navMessages'

export const Service = () => {
	const { pathname } = useLocation()
	const userData = localStorage.getItem('practice')
	const nav = useNavigate()

	const isEmployee = userData === 'practice'

	return (
		<div  className=" w-screen ">
			<div className=" flex h-auto   ">
				{pathname.includes('/services/schedule') && <NavSchedule />}
				{pathname.includes('/services/session') && <NavSession />}
				{pathname.includes('/services/aboutMe') && <NavAboutMe />}
				{pathname.includes('/services/electronicBook') && <NavElectronicBook />}
				{pathname.includes('/services/setting') && <NavSetting />}
				{/* {
					isEmployee
					&&
					pathname.includes('/services/practices')
						?
						<NavPractices/>
						:
						<Navigate to={'/user'}/>
				} */}
				{pathname.includes('/services/practices') && <NavPractices />}
				{pathname.includes('/services/mypractices') && <NavMyPractices />}
				{pathname.includes('/services/practiceteacher') && <NavPracticeTeacher />}

				{/*{pathname.includes('/services/businessTrip') && <NavBusinessTrip />}*/}
				{pathname.includes('/services/unifiedServiceCenter') && (
					<NavUnifiedServiceCenter />
				)}
				{pathname.includes('/services/aboutUniversity') && <AboutUniversity />}
				{pathname.includes('/services/messages') && <NavMessages />}
			</div>
		</div>
	)
}
