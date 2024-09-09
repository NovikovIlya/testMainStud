import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'

import { ChangePasswordSvg } from '../../../assets/svg/ChangePasswordSvg'
import { ContactInformationSvg } from '../../../assets/svg/ContactInformationSvg'
import { LanguageSvg } from '../../../assets/svg/LanguageSvg'
import { PhotoSvg } from '../../../assets/svg/PhotoSvg'
import { ThemeDesignSvg } from '../../../assets/svg/ThemeDesignSvg'
import { VisuallyImpairedSvg } from '../../../assets/svg/VisuallyImpairedSvg'
import { Header } from '../../layout/Header'

import { ChangePassword } from './ChangePassword'
import { ContactInformation } from './ContactInformation'
import { Language } from './Language'
import { Photo } from './Photo'
import { ThemeDesign } from './ThemeDesign'
import { VisuallyImpaired } from './VisuallyImpaired'

const navList = [
	{
		id: '/services/setting/contactInformation',
		icon: <ContactInformationSvg />,
		name: 'Контактные данные'
	},
	// {
	// 	id: '/services/setting/photo',
	// 	icon: <PhotoSvg />,
	// 	name: 'ID фото'
	// },
	{
		id: '/services/setting/changePassword',
		icon: <ChangePasswordSvg />,
		name: 'Изменить пароль'
	},
	// {
	// 	id: '/services/setting/themeDesign',
	// 	icon: <ThemeDesignSvg />,
	// 	name: 'Тема оформления'
	// },
	// {
	// 	id: '/services/setting/language',
	// 	icon: <LanguageSvg />,
	// 	name: 'Язык'
	// },
	// {
	// 	id: '/services/setting/visuallyImpaired',
	// 	icon: <VisuallyImpairedSvg />,
	// 	name: 'Для слабовидящих'
	// }
]

export const NavSetting = () => {
	const { pathname } = useLocation()
	const navigate = useNavigate()
	const { t } = useTranslation()

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
			<Header type="service" service={t('Setting')} />

			<div className="shadowNav mt-20">
				<ul className="min-w-[230px] pt-14 flex flex-col gap-4 ">
					{handleList}
				</ul>
			</div>
			<div className="bg-[#F5F8FB] w-full pt-14 px-14 mt-20">
				{pathname === navList[0].id && <ContactInformation />}
				{/* {pathname === navList[1].id && <Photo />} */}
				{pathname === navList[1].id && <ChangePassword />}
				{/* {pathname === navList[2].id && <ThemeDesign />} */}
				{/* {pathname === navList[3].id && <Language />} */}
				{/* {pathname === navList[4].id && <VisuallyImpaired />} */}
			</div>
		</>
	)
}
