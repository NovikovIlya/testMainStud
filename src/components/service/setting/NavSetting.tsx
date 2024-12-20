import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'

import { ChangePasswordSvg } from '../../../assets/svg/ChangePasswordSvg'
import { ContactInformationSvg } from '../../../assets/svg/ContactInformationSvg'
import { LanguageSvg } from '../../../assets/svg/LanguageSvg'
import { PhotoSvg } from '../../../assets/svg/PhotoSvg'
import { ThemeDesignSvg } from '../../../assets/svg/ThemeDesignSvg'
import { VisuallyImpairedSvg } from '../../../assets/svg/VisuallyImpairedSvg'
import { Header } from '../../layout/Header'

import { ChangePassword } from './ChangePassword'
import { Language } from './Language'
import { Photo } from './Photo'
import { ThemeDesign } from './ThemeDesign'
import { VisuallyImpaired } from './VisuallyImpaired'
import MainContact from './Contacts/MainContact'
import { useLocalStorageState } from 'ahooks'

export const NavSetting = () => {
	const { pathname } = useLocation()
	const navigate = useNavigate()
	const { t } = useTranslation()
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const [mainRole, _] = useLocalStorageState<any>('typeAcc',{ defaultValue: 'STUD'})

	const handleNavigate = (url: string) => {
		navigate(url)
		setIsMenuOpen(false)
	}

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen)
	}

	const navList = [
		{
			id: '/services/setting/contactInformation',
			icon: <ContactInformationSvg />,
			name: t('contactInformation'),
			hidden: false,
		},
		{
			id: '/services/setting/changePassword',
			icon: <ChangePasswordSvg />,
			name: 'Изменить пароль',
			hidden: mainRole === 'OTHER' ? true : true,
		}
	]

	const handleList = navList.map(({ icon, name, id, hidden }, index) => {
		return (
			<li
				key={index}
				className={clsx(
					'w-full flex items-center py-2 pl-8 hover:bg-[#F5F8FB] cursor-pointer',
					id === pathname && 'bg-[#F5F8FB]',
					hidden ? 'hidden' : ''
				)}
				onClick={() => handleNavigate(id)}
			>
				<div className="flex items-center gap-[10px] p-1">
					{icon}
					<p className="text-base">{name}</p>
				</div>
			</li>
		)
	})

	return (
		<>
			<Header type="service" service={t('Setting')} />

			<div className="flex  w-full mt-20 h-full">
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
						'shadowNav h-[calc(100vh-80px)]   bg-white ',
						'w-[230px] ',
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
				<div className="bg-[#F5F8FB] w-full pt-14 px-14 ">
					{pathname === navList[0].id && <MainContact />}
					{pathname === navList[1].id && <ChangePassword />}
				</div>
			</div>
		</>
	)
}