import { UserSwitchOutlined } from '@ant-design/icons'
import { useLocalStorageState } from 'ahooks'
import { useClickAway } from 'ahooks'
import { Avatar, Badge, Button, Divider, Drawer, Dropdown, Modal, Select, Space, Spin } from 'antd'
import type { MenuProps } from 'antd'
import clsx from 'clsx'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

import {
	EyeSvg,
	LogoIasSvg,
	LogoutSvg,
	MenuSvg,
	PersonCardSvg,
	PersonSvg, SettingSvg
} from '../../assets/svg'
import { ArrowLeftBackInOldAccount } from '../../assets/svg/ArrowLeftBackInOldAccount'
import { LogoIasSvgEn } from '../../assets/svg/LogoIasSvgEn'
import { MessageModuleSvg } from '../../assets/svg/MessagesModuleSvg'
import { TypeHeaderProps } from '../../models/layout'
import { useAppSelector } from '../../store'
import { useFakeLoginMutation } from '../../store/api/fakeLogin'
import { useGetRoleQuery } from '../../store/api/serviceApi'
import { logOut } from '../../store/reducers/authSlice'
import AccessibilityHelper from '../AccessibilityHelper/AccessibilityHelper'
import { ModalNav } from '../service/ModalNav'
import { useGetAllUnReadQuery } from '../../store/api/messages/messageApi'
import { LogoSvgNew } from '../../assets/svg/LogoSvgNew'
import { useGetAvatarQuery } from '../../store/api/aboutMe/forAboutMe'



export const Header = ({ type = 'main', service }: TypeHeaderProps) => {
	const [isModalOpen, setIsModalOpen] = useState(false)
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const [openDrawer, setOpenDrawer] = useState(false)
	const [openMenu, setOpenMenu] = useState(false)
	const { t, i18n } = useTranslation()
	const location = useLocation()
	const searchParams = new URLSearchParams(location.search)
	const paramValue = searchParams.get('lan')
	const user = useAppSelector(state => state.auth.user)
	const isMobile = false
	const urlContainsPractice = location.pathname.includes('practice')
	const { data: dataSubRole, isSuccess: isSuccessSubRole, isLoading: isLoadingSubRole } = useGetRoleQuery(null)
	const roles = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '')?.roles : []
	const username = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '')?.username : ''
	const maiRole = roles.find((item: any) => item.login === username)?.type || ''
	const maiRoleArray = roles.find((item: any) => item.login === username)
	const [subRole, setSubrole] = useLocalStorageState<any>('subRole', { defaultValue: '' })
	const [mainRole, setmainRole] = useLocalStorageState<any>('typeAcc', {defaultValue: 'STUD'})
	const [login, { data: dataLogin, isSuccess, isLoading }] = useFakeLoginMutation()
	const [isOpen, setIsOpen] = useState(false)
	const [info, setInfo] = useLocalStorageState<any>('info',{  defaultValue: '',},);
	const ref = useRef<any>(null)
	const { unreadChatsCount } = useGetAllUnReadQuery(null, {
		pollingInterval: 2000,
		skipPollingIfUnfocused: true,
		selectFromResult: ({ data }) => ({
		  unreadChatsCount: data?.unreadChatsCount
		}),
	})
	const { data: avatarUrl, isLoading: isAvatarLoading } = useGetAvatarQuery();
	
	useEffect(() => {
		if (isSuccessSubRole) {
			if (mainRole === 'OTHER') {
				setSubrole(dataSubRole ? dataSubRole[0].role : '')
			}
		}
	}, [isSuccessSubRole, dataSubRole])

	useEffect(() => {
		if (isMobile) {
			showMobileMenuEffect()
		}
	}, [location])

	useClickAway(event => {
		setIsOpen(false)
	}, ref)

	const getRole = (role: string | undefined) => {
		switch (role) {
			case 'ABIT':
				return t('ABIT')
			case 'ABITUR':
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
			case 'EMPL':
				return t('EMPL')
			case 'OTHER':
				return ''
		}
	}

	const onClose = () => {
		setOpenDrawer(false)
	}
	const items: MenuProps['items'] = [
		// {
		// 	label: <div className={`p-2 text-sm text-blue1f5 font-bold cursor-default`}>{user?.email}</div>,
		// 	key: '0'
		// },
		// {
		// 	type: 'divider'
		// },

		...(maiRole === 'OTHER' ? [
			{
			label: (
				<div
					onClick={() => {
						navigate('/infoUserUpdate')
					}}
					className={`${maiRole === 'OTHER' ? '' : 'hidden'} flex items-center gap-[15px] px-[4px] py-[5px]`}
				>
					<UserSwitchOutlined className="w-[22px] h-[22px] text-blue1f5 flex items-center justify-center" />
					{t("changeRole")}
				</div>
			),
			key: '7'
		}]:[]),
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

		// {
		// 	label: (
		// 		<div
		// 			className="flex items-center gap-[15px] px-[4px] py-[5px]"
		// 			onClick={() => {
		// 				setOpenMenu(false)

		// 				navigate('/services/setting/contactInformation')
		// 			}}
		// 		>
		// 			<SettingSvg />
		// 			{t('Setting')}
		// 		</div>
		// 	),
		// 	key: '3'
		// },


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
		
	]
	const changeLanguage = (language: string) => {
		i18n.changeLanguage(language)
	}
	const showMobileMenu = () => {
		if (document.querySelector('.ant-menu-root')) {
			// @ts-ignore
			if (document.querySelector('.ant-menu-root').style.position === 'static') {
				// @ts-ignore
				document.querySelector('.ant-menu-root').style.position = 'fixed'
				// @ts-ignore
				document.querySelector('header').style.marginLeft = '0'
				return
			}
			// @ts-ignore
			document.querySelector('.ant-menu-root').style.position = 'static'
			// document.querySelector('header').style.marginLeft = '-100px'
		}
	}
	const showMobileMenuEffect = () => {
		if (document.querySelector('.ant-menu-root')) {
			// @ts-ignore
			if (document.querySelector('.ant-menu-root').style.position === 'static') {
				// @ts-ignore
				document.querySelector('.ant-menu-root').style.position = 'fixed'
				// @ts-ignore
				document.querySelector('header').style.marginLeft = '0'
				return
			}

			// document.querySelector('header').style.marginLeft = '-100px'
		}
	}
	const handleVisibleInspired = () => {
		// userhelperlibrary({ lang: 'ru'});
		setIsOpen(!isOpen)

	}


	const showModal = () => {
		setIsModalOpen(true)
	}

	const handleOk = () => {
		setIsModalOpen(false)
	}

	const handleCancel = () => {
		setIsModalOpen(false)
	}
	console.log('info',info)

	return (
		<header
			className={clsx(
				'shadow z-[1001] flex flex-wrap  h-[80px] fixed flex items-center justify-center w-full',
				type === 'main' ? 'bg-white ' : `bg-blue65A`
			)}
		>
			<div className={`w-screen flex h-full justify-between px-10 max-sm:px-5 ${type === 'main' ? 'max-w-[1680px] animate-fade-in' : 'animate-fade-in'} `}>
				<div className="flex gap-8 max-sm:gap-2 items-center">
					{user?.roles[0].type === 'ABITUR' || user?.roles[0].type === 'OTHER' ? (
						''
					) : (
						<>
							{/* <Button
						onClick={showDrawer}
						className={clsx(
							'py-2.5 rounded-full hover:!bg-transparent font-semibold bg-transparent border-2 flex items-center justify-center block lg:hidden',
							type === 'main'
								? `text-blue1f5 border-blue1f5 hover:!text-blue1f5`
								: 'text-white border-white '
						)}
						type="primary"
						
					>Сервисы
						<span className="pl-2 max-md:!hidden">{t('services')}</span>
					</Button> */}

							{/* <Button
						onClick={showDrawer}
						className={clsx(
							'h-[38px] py-2.5 rounded-full hover:!bg-transparent font-semibold bg-transparent border-2  items-center justify-center hidden md:flex',
							type === 'main'
								? `text-blue1f5 border-blue1f5 hover:!text-blue1f5`
								: 'text-white border-white '
						)}
						type="primary"
						// icon={<MenuSvg white={type === 'service'} />
					>
						<span className="w-[105px] pl-2 max-md:!hidden">{t('services')}</span>
					</Button> */}
						</>
					)}
					<div className={`flex items-center gap-5 hover:scale-105 duration-500`}>
						{/* бургер для сворачивания */}
						{/* {location?.pathname !== "/user" ? <Button
							onClick={setCollapsed}
							className={clsx(
								'!px-6  py-4 rounded-full hover:!bg-transparent font-semibold bg-transparent border-2 flex items-center justify-center ',
								type === 'main' ? `text-blue1f5 border-blue1f5 hover:!text-blue1f5` : 'text-white border-white '
							)}
							type="primary"
							icon={<MenuSvg white={type === 'service'} />}
						/> :''} */}
						{i18n.language === 'ru' ? (
							<LogoIasSvg white={type === 'service'}  />
						) : (
							// <LogoIasSvgEn white={type === 'service'} />
							<LogoSvgNew white={type === 'service'}  />
						)}

						<Divider type="vertical" className="border-l-white h-10 m-0 hidden sm:block" />
						<div onClick={showMobileMenu} className="text-white text-base font-bold hidden sm:block">
							{service}
						</div>
					</div>
				</div>
				<div className="flex gap-3 items-center h-full max-[1000px]:gap-0 w-fit justify-center">
					<div className="flex h-full items-center ">
						{maiRole==='ABITUR' || maiRole==='OTHER' ? '':
						<a
							className={clsx(
								'h-full flex gap-2 items-center px-3 cursor-pointer no-underline',
								type === 'main' ? 'hover:bg-[#E3E8ED]' : 'hover:bg-blue307'
							)}
							href={`${maiRole==='EMPL' ? `https://shelly.kpfu.ru/e-ksu/e_university.show_notification?p1=${maiRoleArray?.userId}&p2=${maiRoleArray?.sessionId}&p_h=${maiRoleArray?.sessionHash}&p_c_sess=1` : 'https://shelly.kpfu.ru/e-ksu/main_blocks.startpage'}`}
						>
							<ArrowLeftBackInOldAccount white={type === 'service'} />
							<span
								className={clsx(`text-[14px] text-[#3073D7]`, type === 'service' ? 'text-white' : 'text-[#3073D7]')}
							>
								{t('OldLk')}
							</span>
						</a>}

						{/* <div
							className={clsx(
								'h-full flex items-center px-3 cursor-pointer ',
								type === 'main' ? 'hover:bg-[#E3E8ED]' : 'hover:bg-blue307'
							)}
						>
							<SearchSvg white={type === 'service'} />
						</div> */}

						{/*<div*/}
						{/*	className={clsx(*/}
						{/*		'h-full flex items-center px-3 cursor-pointer ',*/}
						{/*		type === 'main' ? 'hover:bg-[#E3E8ED]' : 'hover:bg-blue307'*/}
						{/*	)}*/}
						{/*>*/}
						{/*	<mainRoleSvg white={type === 'service'} />*/}
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

						{/* <div
							className={clsx(
								'h-full flex items-center px-3 cursor-pointer ',
								type === 'main' ? 'hover:bg-[#E3E8ED]' : 'hover:bg-blue307'
							)}
						>
							<EyeSvg white={type === 'service'} />
						</div> */}

						<div
							id='messagesForTest'
							className={`cursor-pointer h-full p-2 flex items-center   ${type === 'main' ? 'hover:bg-[#E3E8ED]' : 'hover:bg-blue307'}`}
							onClick={() => {
								navigate('/services/messages')
							}}
						>
							<Badge className="" count={unreadChatsCount || null}>
								<MessageModuleSvg white={type === 'service'} />
							</Badge>
						</div>
						<div className="relative inline-block h-full">
						<div
							className={`cursor-pointer mx-3 p-2 h-full flex items-center ${type === 'main' ? 'hover:bg-[#E3E8ED]' : 'hover:bg-blue307'}`}
							onClick={e => {
								e.stopPropagation()
								handleVisibleInspired()
							}}
						>
							<EyeSvg white={type === 'service'} />
						</div>
						<div className='h-full '>
							<AccessibilityHelper ref={ref} isOpen={isOpen} lang={i18n.language} />
						</div>
						</div>
					</div>
					<Select
						defaultValue={paramValue === 'eng' ? 'en' : i18n.language}
						style={{ width: 70 }}
						variant="borderless"
						className={clsx(type === 'main' ? 'hover:bg-[#E3E8ED]' : 'hover:bg-blue307', 'h-full flex items-center max-sm:hidden ', type === 'service' && 'text-white')}
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
							<Space className="px-4  gap-5 flex justyfy-between">
								{!avatarUrl?.url ?<PersonSvg white={type === 'service'} /> : <Avatar src={avatarUrl?.url}/>}
								<div className={clsx('h-full max-[455px]:hidden', type === 'service' && 'text-white')}>
									<div className="font-bold text-sm truncate max-w-[120px]">
										
										{i18n.language === 'ru' ?
											`${user?.lastname} ${user?.firstname?.charAt(0)}. ${
											user?.middlename === '' ? '' : (user?.middleName?.charAt(0) ?? '') }`  : 
											`${info?.engLastname} ${info?.engFirstname?.charAt(0)}. ${
											info?.engMiddlename === '' ? '' : (info?.engMiddlename?.charAt(0) ?? '') }`
									}
									</div>
									<div className="text-sm ">
										{user?.roles && user?.roles?.length > 1
											? user?.roles
													.filter((item:any, index:any, self:any) => 
														index === self.findIndex((t:any) => (
															t.type === item.type
														))
													) 
													.toSorted((a: any, b: any) => (a.type === mainRole ? -1 : b.type === mainRole ? 1 : 0))
													.map((item: any) => (
														<div className={`${item.type === mainRole ? '' : 'text-gray-300'}`}>
															{getRole(item.type)}
														</div>
													))
											: String(user?.roles?.map((item: any) => getRole(item.type)))}
									</div>

									<div>{getRole(subRole)}</div>
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

			{urlContainsPractice ? (
				<div className="block lg:hidden  bg-blue65A  flex w-full mt-[1px] items-center p-1">
					<Button
						onClick={showMobileMenu}
						className={clsx(
							'py-2.5 ml-4 mr-4  rounded-full hover:!bg-transparent font-semibold bg-transparent border-2 flex items-center justify-center ',
							type === 'main' ? `text-blue1f5 border-blue1f5 hover:!text-blue1f5` : 'text-white border-white '
						)}
						type="primary"
						icon={<MenuSvg white={type === 'service'} />}
					>
						<span className="pl-2 max-md:!hidden">{t('services')}</span>
					</Button>
					<Divider type="vertical" className="border-l-white h-10 m-0 mr-4" />
					<div className="text-white text-base font-bold ">{service}</div>
				</div>
			) : (
				''
			)}
			<Modal footer={null} title="" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
				<div className="p-8 flex flex-col gap-2">
					{user?.roles && user?.roles?.length > 1
						? user?.roles?.map((item: any) => (
								<Button
									onClick={async () => {
										if (mainRole === item.type) {
											return
										}
										setmainRole(item.type)

										// логика для обновления куков в случае смены роли
										const storedPassword = localStorage.getItem('password')
										const password = storedPassword ? JSON.parse(storedPassword) : ''
										login({
											username: item.login,
											password: password
										})
											.unwrap()
											.then(data => {
												document.cookie = `refresh=${data.refreshToken}; max-age=31536000; domain=${
													document.domain !== 'localhost' ? 'kpfu.ru' : 'localhost'
												}; path=/; samesite=strict`
												document.cookie = `s_id=${data.user.sessionId}; max-age=31536000; domain=${
													document.domain !== 'localhost' ? 'kpfu.ru' : 'localhost'
												}; path=/; samesite=strict`
												document.cookie = `h_id=${data.user.sessionHash}; max-age=31536000; domain=${
													document.domain !== 'localhost' ? 'kpfu.ru' : 'localhost'
												}; path=/; samesite=strict`
												document.cookie = `a_id=${data.user.allId}; max-age=31536000; domain=${
													document.domain !== 'localhost' ? 'kpfu.ru' : 'localhost'
												}; path=/; samesite=strict`
												console.log('меняю роль')
												window.location.replace('/user')

												// window.location.reload()
											})
											.catch(error => {
												console.log(error)
												window.location.replace('/user')
											})
									}}
									className={`${item.type === mainRole ? 'font-extrabold' : ''} cursor-pointer`}
								>
									{getRole(item.type)}
								</Button>
						  ))
						: ''}
				</div>
			</Modal>
		</header>
	)
}
