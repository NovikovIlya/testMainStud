import clsx from 'clsx'
import { useLocation, useNavigate } from 'react-router-dom'

import { BriefcaseSvg } from '../../../assets/svg/BriefcaseSvg'
import CalendarSvg from '../../../assets/svg/CalendarSvg'
import { MyDocsSvg } from '../../../assets/svg/MyDocsSvg'
import { Header } from '../../layout/Header'
import { Chat } from '../Chat/Chat'
import { NavSeekerEmployment } from '../employmentStage/seeker/NavSeekerEmployment'
import { RespondInfo } from '../personnelAccouting/RespondInfo'
import { VacancyRequestDeleteView } from '../personnelAccouting/VacancyRequestDeleteView'

import { MyResponds } from './MyResponds'

export const NavMyResponds = () => {
	const { pathname } = useLocation()
	const navigate = useNavigate()

	const handleNavigate = (url: string) => {
		navigate(url)
	}

	const navList = [
		{
			id: '/services/myresponds/responds',
			icon: <BriefcaseSvg />,
			name: 'Мои отклики'
		},
		{
			id: '/services/myresponds/chat',
			icon: <MyDocsSvg />,
			name: 'Сообщения'
		},
		{
			id: '/services/myresponds/employment',
			icon: <CalendarSvg />,
			name: 'Этап трудоустройства'
		}
	]

	const handleList = navList.map(({ id, icon, name }, index) => {
		if (name === 'Мои отклики') {
			return (
				<li
					key={index}
					className={clsx(
						'w-full flex items-center py-2 pl-8 hover:bg-[#F5F8FB]  cursor-pointer',
						(pathname === '/services/myresponds/responds' ||
							/\/services\/myresponds\/responds\/fullinfo\/\d+/.test(pathname)) &&
							'bg-[#F5F8FB]'
					)}
					onClick={() => handleNavigate(id)}
				>
					<div className="flex items-center gap-[10px]">
						{icon}
						<p className="text-base">{name}</p>
					</div>
				</li>
			)
		} else if (name === 'Сообщения') {
			return (
				<li
					key={index}
					className={clsx(
						'w-full flex items-center py-2 pl-8 hover:bg-[#F5F8FB]  cursor-pointer',
						(pathname === '/services/myresponds/chat' ||
							/\/services\/myresponds\/chat\/id\/\d+/.test(pathname) ||
							/\/services\/myresponds\/chat\/vacancyview\/\d+/.test(pathname)) &&
							'bg-[#F5F8FB]'
					)}
					onClick={() => handleNavigate(id)}
				>
					<div className="flex items-center gap-[10px]">
						{icon}
						<p className="text-base">{name}</p>
					</div>
				</li>
			)
		} else if (name === 'Этап трудоустройства') {
			return (
				<li
					key={index}
					className={clsx(
						'w-full flex items-center py-2 pl-8 hover:bg-[#F5F8FB]  cursor-pointer',
						(pathname === '/services/myresponds/employment' ||
							/\/services\/myresponds\/employment\/stages\/\d+\/\d+/.test(pathname)) &&
							'bg-[#F5F8FB]'
					)}
					onClick={() => handleNavigate(id)}
				>
					<div className="flex items-center gap-[10px]">
						{icon}
						<p className="text-base">{name}</p>
					</div>
				</li>
			)
		}
	})

	return (
		<>
			<Header type="service" service="Мои отклики" />
			<div className="shadowNav bg-white relative">
				<ul className="min-w-[230px] pt-14 flex flex-col gap-4 sticky top-[80px]">{handleList}</ul>
			</div>
			<div className="bg-[#F5F8FB] flex w-full">
				{pathname === navList[0].id && <MyResponds />}
				{pathname.match(/\/services\/myresponds\/responds\/fullinfo\/\d+/) && <RespondInfo type="SEEKER" />}
				{pathname.includes(navList[1].id) && <Chat />}
				{pathname.includes(navList[2].id) && <NavSeekerEmployment />}
			</div>
		</>
	)
}
