import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'

import { BriefcaseSvg } from '../../../assets/svg/BriefcaseSvg'
import CalendarSvg from '../../../assets/svg/CalendarSvg'
import { Header } from '../../layout/Header'

import { Schedule } from './Schedule'
import { Services } from './Services'

const navList = [
	{
		id: '/services/schedule/schedule',
		icon: <CalendarSvg />,
		name: 'Мое расписание'
	}
	// {
	// 	id: '/services/schedule/services',
	// 	icon: <BriefcaseSvg />,
	// 	name: 'Расписание служб'
	// }
]
export const NavSchedule = () => {
	const { pathname } = useLocation()
	const { t } = useTranslation()

	const navigate = useNavigate()
	const handleNavigate = (url: string) => {
		navigate(url)
	}
	const handleList = navList.map(({ icon, name, id }, index) => {
		return (
			<li
				key={index}
				className={clsx(
					'w-full flex items-center py-2 pl-8 hover:bg-[#F5F8FB]  cursor-pointer',
					id === pathname && 'bg-[#F5F8FB]'
				)}
				onClick={() => handleNavigate(id)}
			>
				<div className="flex items-center gap-[10px]">
					{icon}
					<p className="text-base">{name}</p>
				</div>
			</li>
		)
	})
	return (
		<>
			<Header type="service" service={t('ScheduleService')} />
			<div className="shadowNav mt-20">
				<ul className="min-w-[230px] pt-14 flex flex-col gap-4 ">
					{handleList}
				</ul>
			</div>
			<div className="bg-[#F5F8FB] w-full mt-20">
				{pathname === navList[0].id && <Schedule />}
				{/* {pathname === navList[1].id && <Services />} */}
			</div>
		</>
	)
}
