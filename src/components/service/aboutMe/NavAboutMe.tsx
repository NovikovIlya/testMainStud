import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'

import { AboutMeSvg } from '../../../assets/svg/AboutMeSvg'
import { AddressSvg } from '../../../assets/svg/AddressSvg'
import { EducationSvg } from '../../../assets/svg/EducationSvg'
import { MyDocsSvg } from '../../../assets/svg/MyDocsSvg'
import { ParentSvg } from '../../../assets/svg/ParentSvg'
import { ProfessionalSkillsSvg } from '../../../assets/svg/ProfessionalSkillsSvg'
import { WorkSvg } from '../../../assets/svg/WorkSvg'
import { useAppSelector } from '../../../store'
import { Header } from '../../layout/Header'

import { AboutMe } from './AboutMe'
import { Address } from './Address'
import { Document } from './Document'
import { Education } from './Education'
import { Parent } from './Parent'
import { ProfessionalSkills } from './ProfessionalSkills'
import { Work } from './Work'
import { useLocalStorageState } from 'ahooks'

export const NavAboutMe = () => {
	const { pathname } = useLocation()
	const navigate = useNavigate()
	const role = useAppSelector(state => state.auth.user?.roles)
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const { t } = useTranslation()
	const [typeAcc] = useLocalStorageState<any>('typeAcc')

	const handleNavigate = (url: string) => {
		navigate(url)
		setIsMenuOpen(false)
	}

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen)
	}

	const navList = [
		{
			id: '/services/aboutMe/personalData',
			icon: <AboutMeSvg />,
			name: t('PersonalData')
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
			id: '/services/aboutMe/parent',
			icon: <ParentSvg />,
			name: t('Parents'),
			 condition: typeAcc !== 'EMPL'
		}
	].filter(item => item?.condition !== false)
	console.log('navList',navList)
	if (!role) return <></>
	const isStudent = role[0].type === 'STUD'

	const handleList = navList.map(({ icon, name, id }, index) => {
		if (isStudent && id === '/services/aboutMe/work') return null
		return (
			<li
				key={index}
				className={clsx(
					'w-full flex items-center py-2 pl-8 hover:bg-[#F5F8FB] cursor-pointer',
					id === pathname && 'bg-[#F5F8FB]'
				)}
				onClick={() => handleNavigate(id)}
			>
				<div className="flex items-center gap-[10px]">
					<div className="w-5 h-5">{icon}</div>
					<p className="text-base">{name}</p>
				</div>
			</li>
		)
	})

	return (
		<>
			<Header type="service" service={t('AboutMeService')} />

			<div className="flex flex-col md:flex-row w-full mt-20">
				{/* Кнопка меню для мобильных устройств */}
				<button
					className="md:hidden fixed top-24 left-7 z-50 bg-blue-500 text-white p-2 rounded-md border-none"
					onClick={toggleMenu}
				>
					{isMenuOpen ? '✕' : '☰'}
				</button>

				{/* Боковое меню */}
				<div
					className={clsx(
						' fixed md:relative z-40 bg-white transition-transform duration-300 ease-in-out',
						'w-[230px] h-[calc(100vh-80px)]',
						isMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
					)}
				>
					<ul className="pt-14 flex flex-col gap-4">{handleList}</ul>
				</div>

				{/* Затемнение фона при открытом меню на мобильных устройствах */}
				{isMenuOpen && (
					<div
						className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
						onClick={() => setIsMenuOpen(false)}
					/>
				)}

				{/* Основной контент */}
				<div className="bg-[#F5F8FB] flex w-full">
					{pathname === navList[0]?.id && <AboutMe />}
					{pathname === navList[1]?.id && <Document />}
					{pathname === navList[2]?.id && <Address />}
					{pathname === navList[3]?.id && <Education />}
					{pathname === navList[4]?.id && <Parent />}
				</div>
			</div>
		</>
	)
}