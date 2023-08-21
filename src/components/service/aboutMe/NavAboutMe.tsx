import clsx from 'clsx'
import { useLocation, useNavigate } from 'react-router-dom'

import { AboutMeSvg } from '../../../assets/svg/AboutMeSvg'
import { MyDocsSvg } from '../../../assets/svg/MyDocsSvg'

import { AboutMe } from './AboutMe'
import { Document } from './Document'

const navList = [
	{
		id: '/services/aboutMe/aboutMe',
		icon: <AboutMeSvg />,
		name: 'Обо мне'
	},
	{
		id: '/services/aboutMe/document',
		icon: <MyDocsSvg />,
		name: 'Документы'
	}
]

export const NavAboutMe = () => {
	const { pathname } = useLocation()
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
			<div className="shadowNav">
				<ul className="min-w-[230px] pt-14 flex flex-col gap-4 ">
					{handleList}
				</ul>
			</div>
			<div className="bg-[#F5F8FB] w-full">
				{pathname === navList[0].id && <AboutMe />}
				{pathname === navList[1].id && <Document />}
			</div>
		</>
	)
}
