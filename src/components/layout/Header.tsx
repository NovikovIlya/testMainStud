import { Button, Divider, Drawer, Select } from 'antd'
import type { MenuProps } from 'antd'
import { Dropdown, Space } from 'antd'
import clsx from 'clsx'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import {
	EyeSvg,
	LogoIasSvg,
	LogoutSvg, MenuSvg, PersonCardSvg,
	PersonSvg,
	SearchSvg,
	SettingSvg
} from '../../assets/svg'
import PersonalizationSvg from '../../assets/svg/PersonalizationSvg'
import { useAppSelector } from '../../store'
import { logOut, setEdit } from '../../store/reducers/authSlice'
import { ModalNav } from '../service/ModalNav'
import { ArrowLeftBackInOldAccount } from "../../assets/svg/ArrowLeftBackInOldAccount"
import { TypeHeaderProps } from '../../models/layout'


export const Header = ({ type = 'main', service }: TypeHeaderProps) => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const [openDrawer, setOpenDrawer] = useState(false)
	const [openMenu, setOpenMenu] = useState(false)
	const { t, i18n } = useTranslation()

	const user = useAppSelector(state => state.auth.user)
	const showDrawer = () => {
		setOpenDrawer(!openDrawer)
	}

	const getRole = (role: string | undefined) => {
		switch (role) {
			case 'ABIT':
				return t('ABIT')
			case 'STUD':
				return t('STUD')
			case 'SCHOOL':
				return t('SCHOOL')
			case 'SEEKER':
				return t('SEEKER')
			case undefined:
				return t('ABIT')
			case 'GUEST':
				return t('GUEST')
			case 'ATTEND':
				return t('ATTEND')
		}
	}

	const onClose = () => {
		setOpenDrawer(false)
	}
	const items: MenuProps['items'] = [
		{
			label: (
				<div className={`p-2 text-sm text-blue1f5 font-bold cursor-default`}>
					{user?.email}
				</div>
			),
			key: '0'
		},
		{
			type: 'divider'
		},
		{
			label: (
				<div
					onClick={() => {
						setOpenMenu(false)
						navigate('/services/aboutMe/personalData')
					}}
					className="flex items-center gap-[15px] px-[4px] py-[5px]"
				>
					<PersonCardSvg />
					{t('AboutMe')}
				</div>
			),
			key: '1'
		},
		{
			label: (
				<div
					className="flex items-center gap-[15px] px-[4px] py-[5px]"
					onClick={() => {
						setOpenMenu(false)

						navigate('/services/setting/contactInformation')
					}}
				>
					<SettingSvg />
					{t('Setting')}
				</div>
			),
			key: '3'
		},
		{
			label: (
				<div
					onClick={() => {
						setOpenMenu(false)
						dispatch(setEdit())
					}}
					className="flex items-center gap-[15px] px-[4px] py-[5px]"
				>
					<PersonalizationSvg />
					{t('Personalization')}
				</div>
			),
			key: '4'
		},
		{
			label: (
				<div
					className="flex items-center gap-[15px] px-[4px] py-[5px]"
					onClick={() => {
						setOpenMenu(false)
						dispatch(logOut())
					}}
				>
					<LogoutSvg />
					{t('logout')}
				</div>
			),
			key: '5'
		},
		{
			label: <div className="cursor-default" />,
			key: '6'
		}
	]
	const changeLanguage = (language: string) => {
		i18n.changeLanguage(language)
	}

	return (
		<header
			className={clsx(
				' z-[1001]  h-[80px] fixed flex items-center justify-center w-full',
				type === 'main' ? 'bg-white' : `bg-blue65A`
			)}
		>
			<div className="w-screen flex h-full justify-between px-8 max-sm:px-5">
				<div className="flex gap-8 max-sm:gap-2 items-center">
					<Button
						onClick={showDrawer}
						className={clsx(
							'py-2.5 rounded-full hover:!bg-transparent font-semibold bg-transparent border-2 flex items-center justify-center ',
							type === 'main'
								? `text-blue1f5 border-blue1f5 hover:!text-blue1f5`
								: 'text-white border-white '
						)}
						type="primary"
						icon={<MenuSvg white={type === 'service'} />}
					>
						<span className="pl-2 max-md:!hidden">{t('services')}</span>
					</Button>
					<div className="flex items-center gap-5">
						<LogoIasSvg white={type === 'service'} />
						<Divider type="vertical" className="border-l-white h-10 m-0" />
						<div className="text-white text-base font-bold">{service}</div>
					</div>
				</div>
				<div className="flex gap-5 items-center h-full max-[1000px]:gap-0 w-fit justify-center">
					<div className="flex h-full items-center max-[1000px]:hidden">

						<a
							className={clsx(
								'h-full flex gap-2 items-center px-3 cursor-pointer no-underline',
								type === 'main' ? 'hover:bg-[#E3E8ED]' : 'hover:bg-blue307'
							)}
							href={'https://shelly.kpfu.ru/e-ksu/main_blocks.startpage'}
						>
							<ArrowLeftBackInOldAccount white={type === 'service'}/>
							<span className={clsx(
								`text-[14px]/[14px] text-[#3073D7]`
								&&
								type === 'service' ? 'text-white' : 'text-[#3073D7]'

							)}>
								в старый ЛК
							</span>
						</a>

						<div
							className={clsx(
								'h-full flex items-center px-3 cursor-pointer ',
								type === 'main' ? 'hover:bg-[#E3E8ED]' : 'hover:bg-blue307'
							)}
						>
							<SearchSvg white={type === 'service'} />
						</div>
						{/*<div*/}
						{/*	className={clsx(*/}
						{/*		'h-full flex items-center px-3 cursor-pointer ',*/}
						{/*		type === 'main' ? 'hover:bg-[#E3E8ED]' : 'hover:bg-blue307'*/}
						{/*	)}*/}
						{/*>*/}
						{/*	<MessageSvg white={type === 'service'} />*/}
						{/*</div>*/}
						{/*<div*/}
						{/*	className={clsx(*/}
						{/*		'h-full flex items-center px-3 cursor-pointer ',*/}
						{/*		type === 'main' ? 'hover:bg-[#E3E8ED]' : 'hover:bg-blue307'*/}
						{/*	)}*/}
						{/*>*/}
						{/*	<MapSvg white={type === 'service'} />*/}
						{/*</div>*/}
						{/*<div*/}
						{/*	className={clsx(*/}
						{/*		'h-full flex items-center px-3 cursor-pointer ',*/}
						{/*		type === 'main' ? 'hover:bg-[#E3E8ED]' : 'hover:bg-blue307'*/}
						{/*	)}*/}
						{/*>*/}
						{/*	<DocumentSvg white={type === 'service'} />*/}
						{/*</div>*/}
						<div
							className={clsx(
								'h-full flex items-center px-3 cursor-pointer ',
								type === 'main' ? 'hover:bg-[#E3E8ED]' : 'hover:bg-blue307'
							)}
						>
							<EyeSvg white={type === 'service'} />
						</div>
					</div>
					<Select
						defaultValue={i18n.language}
						style={{ width: 70 }}
						variant="borderless"
						className={clsx(
							'max-sm:hidden ',
							type === 'service' && 'text-white'
						)}
						dropdownStyle={{ color: 'white' }}
						popupClassName="text-white"
						onChange={e => changeLanguage(e.valueOf())}
						options={[
							{ value: 'ru', label: 'Рус' },
							{ value: 'en', label: 'Eng' }
						]}
					/>
					<div
						className={clsx(
							'h-full flex items-center cursor-pointer w-fit',
							type === 'main' && openMenu && 'bg-[#E3E8ED]',
							type !== 'main' && openMenu && 'bg-blue307',
							type === 'main' ? 'hover:bg-[#E3E8ED]' : 'target:bg-blue307'
						)}
					>
						<Dropdown
							menu={{ items }}
							placement="bottom"
							onOpenChange={() => setOpenMenu(prev => !prev)}
							trigger={['click']}
							className="cursor-pointer h-full  box-border"
						>
							<Space className="px-10 max-sm:px-5 max-[455px]:!gap-0 gap-2">
								<PersonSvg white={type === 'service'} />
								<div
									className={clsx(
										'h-full max-[455px]:hidden',
										type === 'service' && 'text-white'
									)}
								>
									<div className="font-bold text-sm truncate max-w-[120px]">
										{`${user?.lastname} ${user?.firstname.charAt(0)}. ${
											user?.middlename === ''
												? ''
												: user?.middlename.charAt(0) + '.'
										}`}
									</div>
									<div className="text-sm">{getRole(user?.roles[0].type)}</div>
								</div>
							</Space>
						</Dropdown>
						<Drawer
							rootStyle={{ position: 'fixed', top: 75 }}
							placement="top"
							size="large"
							closable={false}
							className="!bg-[#F5F8FB]"
							onClose={onClose}
							open={openDrawer}
							key="top"
						>
							<ModalNav />
						</Drawer>
					</div>
				</div>
			</div>
		</header>
	)
}
