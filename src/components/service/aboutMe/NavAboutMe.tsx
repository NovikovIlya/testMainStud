import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'

import { AboutMeSvg } from '../../../assets/svg/AboutMeSvg'
import { AddressSvg } from '../../../assets/svg/AddressSvg'
import { EducationSvg } from '../../../assets/svg/EducationSvg'
import { MyDocsSvg } from '../../../assets/svg/MyDocsSvg'
import { ParentSvg } from '../../../assets/svg/ParentSvg'
import { WorkSvg } from '../../../assets/svg/WorkSvg'
import { useAppSelector } from '../../../store'

import { AboutMe } from './AboutMe'
import { Address } from './Address'
import { Document } from './Document'
import { Education } from './Education'
import { Parent } from './Parent'
import { Work } from './Work'

export const NavAboutMe = () => {
	const { pathname } = useLocation()
	const navigate = useNavigate()
	const role = useAppSelector(state => state.auth.user?.roles)
	const handleNavigate = (url: string) => {
		navigate(url)
	}
	const { t } = useTranslation()
	const navList = [
		{
			id: '/services/aboutMe/aboutMe',
			icon: <AboutMeSvg />,
			name: t('aboutMe')
		},
		{
			id: '/services/aboutMe/document',
			icon: <MyDocsSvg />,
			name: t('documents')
		},
		{
			id: '/services/aboutMe/address',
			icon: <AddressSvg />,
			name: t('adress')
		},
		{
			id: '/services/aboutMe/education',
			icon: <EducationSvg />,
			name: t('education')
		},
		{
			id: '/services/aboutMe/work',
			icon: <WorkSvg />,
			name: t('work')
		},
		{
			id: '/services/aboutMe/parent',
			icon: <ParentSvg />,
			name: t('Parents')
		}
	]
	if (!role) return <></>
	const isStudent = role[0].type === 'STUD'
	const handleList = navList.map(({ icon, name, id }, index) => {
		if (isStudent && id === '/services/aboutMe/work') return null
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
			<div className="shadowNav ">
				<ul className="min-w-[230px] pt-14 flex flex-col gap-4 ">
					{handleList}
				</ul>
			</div>
			<div className="bg-[#F5F8FB] flex w-full">
				{pathname === navList[0].id && <AboutMe />}
				{pathname === navList[1].id && <Document />}
				{pathname === navList[2].id && <Address />}
				{pathname === navList[3].id && <Education />}
				{pathname === navList[4].id && <Work />}
				{pathname === navList[5].id && <Parent />}
			</div>
		</>
	)
}
