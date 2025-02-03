import { ReactNode } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'

import { useCheckIsEmployeeQuery } from '../../store/api/practiceApi/contracts'
import { useGetContractsAllQuery } from '../../store/api/practiceApi/roster'
import AboutUniversity from '../aboutUniversity/AboutUnversity'

import ShortLink from './ShortLink/ShortLink'
import { NavAboutMe } from './aboutMe/NavAboutMe'
import { NavBusinessTrip } from './businessTrip/NavBusinessTrip'
import { NavUnifiedServiceCenter } from './documentFlow/NavUnifiedServiceCenter'
import { NavElectronicBook } from './electronicBook/NavElectronicBook'
import { NavForTeachers } from './forTeachers/navForTeachers'
import { NavJobSeeker } from './jobSeeker/NavJobSeeker'
import { NavMessages } from './messages/navMessages'
import { NavMyPractices } from './myPractice/navMyPractice'
import { NavMyResponds } from './myResponds/NavMyResponds'
import { NavPesonnelAccounting } from './personnelAccouting/NavPersonnelAccounting'
import { NavPracticeTeacher } from './practiceTeacher/navMyPractice'
import { NavPractices } from './practices/NavPractices'
import { NavSchedule } from './schedule/NavSchedule'
import { NavSession } from './session/NavSession'
import { NavSetting } from './setting/NavSetting'

export const Service = () => {
	const { pathname } = useLocation()
	const userData = localStorage.getItem('practice')
	const nav = useNavigate()

	const isEmployee = userData === 'practice'

	return (
		<div className=" w-screen h-screen">
			<div className=" flex min-h-full ">
				{pathname.includes('/services/schedule') && <NavSchedule />}
				{pathname.includes('/services/session') && <NavSession />}
				{pathname.includes('/services/aboutMe') && <NavAboutMe />}
				{pathname.includes('/services/electronicBook') && <NavElectronicBook />}
				{pathname.includes('/services/setting') && <NavSetting />}
				{pathname.includes('/services/forTeachers') && <NavForTeachers />}
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
				{pathname.includes('/services/jobseeker') && <NavJobSeeker />}
				{pathname.includes('/services/myresponds') && <NavMyResponds />}
				{pathname.includes('/services/personnelaccounting') && <NavPesonnelAccounting />}
				{pathname.includes('/services/mypractices') && <NavMyPractices />}
				{pathname.includes('/services/practiceteacher') && <NavPracticeTeacher />}

				{/*{pathname.includes('/services/businessTrip') && <NavBusinessTrip />}*/}
				{pathname.includes('/services/unifiedServiceCenter') && <NavUnifiedServiceCenter />}
				{pathname.includes('/services/aboutUniversity') && <AboutUniversity />}
				{pathname.includes('/services/messages') && <NavMessages />}
				{/* {pathname.includes('/services/shorturl') && <ShortLink />} */}
			</div>
		</div>
	)
}
