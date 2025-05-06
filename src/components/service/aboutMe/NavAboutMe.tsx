import { useLocalStorageState } from 'ahooks'
import type { MenuProps } from 'antd'
import { Menu } from 'antd'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'

import { AboutMeSvg } from '../../../assets/svg/AboutMeSvg'
import { AddressSvg } from '../../../assets/svg/AddressSvg'
import { ContactInformationSvg } from '../../../assets/svg/ContactInformationSvg'
import { EducationSvg } from '../../../assets/svg/EducationSvg'
import { LanguagesSvgNew } from '../../../assets/svg/LanguagesSvgNew'
import { MyDocsSvg } from '../../../assets/svg/MyDocsSvg'
import { ScientificSvg } from '../../../assets/svg/ScientificSvg'
import { SocialSvg } from '../../../assets/svg/SocialSvg'
import { useAppSelector } from '../../../store'
import { Header } from '../../layout/Header'
import MainContact from '../setting/Contacts/MainContact'

import { AboutMe } from './AboutMe'
import AboutMeNew from './AboutMeNew'
import { Address } from './Address'
import { Document } from './Document'
import { Education } from './Education'
import EducationNew from './EducationNew'
import Languages from './Languages'
import Scientific from './Scientific'
import Social from './Social'

export const NavAboutMe = () => {
	const { pathname } = useLocation()
	const navigate = useNavigate()
	const role = useAppSelector(state => state.auth.user?.roles)
	const { t } = useTranslation()
	const [mainRole] = useLocalStorageState<any>('typeAcc', { defaultValue: 'STUD' })

	const handleNavigate = (url: string) => navigate(url)

	// const navItems = [
	//   {
	//     key: '/services/aboutMe/personalData',
	//     icon: <AboutMeSvg />,
	//     label: <p className="ml-[10px]">{ t('PersonalData')}</p>

	//   },
	//     {
	//     key: '/services/aboutMe/document',
	//     icon: <MyDocsSvg />,
	//     label: <p className="ml-[10px]">{ t('documents')}</p>

	//   },
	//   {
	//     key: '/services/aboutMe/address',
	//     icon: <AddressSvg />,
	//     label: <p className="ml-[10px]">{ t('adress')}</p>

	//   },
	// {
	// 	key: '/services/aboutMe/contactInformation',
	// 	icon: <ContactInformationSvg />,
	// 	label: (			<div className="ml-[10px] min-w-0">
	//     <p className="whitespace-normal break-words text-wrap text-sm leading-4">
	//     { t('contactInformation')}
	//     </p>
	//   </div>)

	//   },
	//   {
	//     key: '/services/aboutMe/education',
	//     icon: <EducationSvg />,
	//     label:<p className="ml-[10px]">{ t('education')}</p>

	//   },
	// // @ts-ignore
	// ].filter(item => item?.condition !== false)

	// Новый
	let navItems: any = []
	if (mainRole === 'STUD' || mainRole === 'EMPL') {
		navItems = [
			{
				key: '/services/aboutMe/personalData',
				icon: <AboutMeSvg />,
				label: <p className="ml-[10px]">{t('PersonalData')}</p>
			},
			{
				key: '/services/aboutMe/contactInformation',
				icon: <ContactInformationSvg />,
				label: (
					<div className="ml-[10px] min-w-0">
						<p className="whitespace-normal break-words text-wrap text-sm leading-4">{t('contactInformation')}</p>
					</div>
				)
			},
			{
				key: '/services/aboutMe/education',
				icon: <EducationSvg />,
				label: <p className="ml-[10px]">{t('education')}</p>
			},
			{
				key: '/services/aboutMe/languages',
				icon: <LanguagesSvgNew />,
				label: (
					<div className="ml-[10px] min-w-0">
						<p className="whitespace-normal break-words text-wrap text-sm leading-4">{t('langZnan')}</p>
					</div>
				)
			},

			{
				key: '/services/aboutMe/social',
				icon: <SocialSvg />,
				label: (
					<div className="ml-[10px] min-w-0">
						<p className="whitespace-normal break-words text-wrap text-sm leading-4">{t('socialTitle')}</p>
					</div>
				)
			},
			{
				key: '/services/aboutMe/scientific',
				icon: <ScientificSvg />,
				label: (
					<div className="ml-[10px] min-w-0">
						<p className="whitespace-normal break-words text-wrap text-sm leading-4">{t('scient')}</p>
					</div>
				)
			}
		]
	} else {
		navItems = [
			{
				key: '/services/aboutMe/personalData',
				icon: <AboutMeSvg />,
				label: <p className="ml-[10px]">{t('PersonalData')}</p>
			},
			{
				key: '/services/aboutMe/document',
				icon: <MyDocsSvg />,
				label: <p className="ml-[10px]">{t('documents')}</p>
			},
			{
				key: '/services/aboutMe/address',
				icon: <AddressSvg />,
				label: <p className="ml-[10px]">{t('adress')}</p>
			},
			{
				key: '/services/aboutMe/contactInformation',
				icon: <ContactInformationSvg />,
				label: (
					<div className="ml-[10px] min-w-0">
						<p className="whitespace-normal break-words text-wrap text-sm leading-4">{t('contactInformation')}</p>
					</div>
				)
			},
			{
				key: '/services/aboutMe/education',
				icon: <EducationSvg />,
				label: <p className="ml-[10px]">{t('education')}</p>
			}
			// @ts-ignore
		].filter(item => item?.condition !== false)
	}

	const onClick: MenuProps['onClick'] = e => {
		handleNavigate(e.key)
	}
	if (!role) return null

	return (
		<>
			<Header type="service" service={t('AboutMeService')} />

			<div className={`fixed left-0 top-[130px] h-[calc(100vh-144px)] z-50 ${'w-[230px]'}`}>
				<Menu
					selectedKeys={[pathname]}
					mode="inline"
					onClick={onClick}
					className="h-full shadow flex flex-col"
					items={navItems.map((item: any) => ({
						key: item.key,
						icon: item.icon,
						label: item.label
					}))}
				/>
			</div>

			<div className={`${'ml-[229px]'} bg-[#F5F8FB] w-full pt-[70px] min-h-screen`}>
				{/* {pathname === '/services/aboutMe/personalData' && <AboutMe />}
		   		{pathname === '/services/aboutMe/contactInformation' && <MainContact />}
				{pathname === '/services/aboutMe/document' && <Document />}
				{pathname === '/services/aboutMe/address' && <Address />}
				{pathname === '/services/aboutMe/education' && <Education />} */}

				{/* Новый */}
				{mainRole === 'STUD' || mainRole === 'EMPL' ? (
					<>
						{pathname === '/services/aboutMe/personalData' && <AboutMeNew />}
						{pathname === '/services/aboutMe/contactInformation' && <MainContact />}
						{pathname === '/services/aboutMe/education' && <EducationNew />}
						{pathname === '/services/aboutMe/languages' && <Languages />}
						{pathname === '/services/aboutMe/social' && <Social />}
						{pathname === '/services/aboutMe/scientific' && <Scientific />}
					</>
				) : (
					<>
						{pathname === '/services/aboutMe/personalData' && <AboutMe />}
						{pathname === '/services/aboutMe/contactInformation' && <MainContact />}
						{pathname === '/services/aboutMe/document' && <Document />}
						{pathname === '/services/aboutMe/address' && <Address />}
						{pathname === '/services/aboutMe/education' && <Education />}
					</>
				)}
			</div>
		</>
	)
}
