// import { UserSwitchOutlined } from '@ant-design/icons'
// import { useLocalStorageState } from 'ahooks'
// import { useClickAway } from 'ahooks'
// import { Avatar, Badge, Button, Divider, Drawer, Dropdown, Modal, Select, Space, Spin } from 'antd'
// import type { MenuProps } from 'antd'
// import clsx from 'clsx'
// import { useEffect, useRef, useState } from 'react'
// import { useTranslation } from 'react-i18next'
// import { useDispatch } from 'react-redux'
// import { useLocation, useNavigate } from 'react-router-dom'
// import { EyeSvg, LogoIasSvg, LogoutSvg, MenuSvg, PersonCardSvg, PersonSvg, SettingSvg } from '../../assets/svg'
// import { ArrowLeftBackInOldAccount } from '../../assets/svg/ArrowLeftBackInOldAccount'
// import { LogoIasSvgEn } from '../../assets/svg/LogoIasSvgEn'
// import { LogoSvgNew } from '../../assets/svg/LogoSvgNew'
// import { MessageModuleSvg } from '../../assets/svg/MessagesModuleSvg'
// import { TypeHeaderProps } from '../../models/layout'
// import { useAppSelector } from '../../store'
// import { useGetAvatarQuery } from '../../store/api/aboutMe/forAboutMe'
// import { useFakeLoginMutation } from '../../store/api/fakeLogin'
// import { useGetAllUnReadQuery } from '../../store/api/messages/messageApi'
// import { useGetRoleQuery } from '../../store/api/serviceApi'
// import { logOut } from '../../store/reducers/authSlice'
// import AccessibilityHelper from '../AccessibilityHelper/AccessibilityHelper'
// import { ModalNav } from '../service/ModalNav'
// import { getBaseUrlShelly } from '../../store/api/studentPractice/getBaseUrlShelly'
// export const Header = ({ type = 'main', service }: TypeHeaderProps) => {
// 	const [isModalOpen, setIsModalOpen] = useState(false)
// 	const dispatch = useDispatch()
// 	const navigate = useNavigate()
// 	const [openDrawer, setOpenDrawer] = useState(false)
// 	const [openMenu, setOpenMenu] = useState(false)
// 	const { t, i18n } = useTranslation()
// 	const location = useLocation()
// 	const searchParams = new URLSearchParams(location.search)
// 	const paramValue = searchParams.get('lan')
// 	const user = useAppSelector(state => state.auth.user)
// 	const isMobile = false
// 	const urlContainsPractice = location.pathname.includes('practice')
// 	const { data: dataSubRole, isSuccess: isSuccessSubRole, isLoading: isLoadingSubRole } = useGetRoleQuery(null)
// 	const roles = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '')?.roles : []
// 	const username = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '')?.username : ''
// 	const maiRole = roles.find((item: any) => item.login === username)?.type || ''
// 	const maiRoleArray = roles.find((item: any) => item.login === username)
// 	const [subRole, setSubrole] = useLocalStorageState<any>('subRole', { defaultValue: '' })
// 	const [mainRole, setmainRole] = useLocalStorageState<any>('typeAcc', { defaultValue: 'STUD' })
// 	const [login, { data: dataLogin, isSuccess, isLoading }] = useFakeLoginMutation()
// 	const [isOpen, setIsOpen] = useState(false)
// 	const [info, setInfo] = useLocalStorageState<any>('info', { defaultValue: '' })
// 	const ref = useRef<any>(null)
// 	const { unreadChatsCount } = useGetAllUnReadQuery(null, {
// 		pollingInterval: 2000,
// 		skipPollingIfUnfocused: true,
// 		selectFromResult: ({ data }) => ({
// 			unreadChatsCount: data?.unreadChatsCount
// 		})
// 	})
// 	const { data: avatarUrl, isLoading: isAvatarLoading ,isSuccess:isSuccesAvatar,error:errorAva,isFetching} = useGetAvatarQuery(undefined, {
// 		skip: !(['/services/aboutMe', '/user'].some(path => location.pathname.includes(path))),
// 	});
// 	const [avatarLocal, setAvatarLocal] = useLocalStorageState<any>('avatarLocal', { defaultValue: '' })
// 	const [avatarUrlLocal, setAvatarUrlLocal] = useState<any>({
// 		url: null,
// 		id: null,
// 	});
// 	useEffect(()=>{
// 		if(isSuccesAvatar){
// 			setAvatarLocal(avatarUrl?.url)
// 		}
// 	},[isSuccesAvatar])
// 	useEffect(() => {
// 		if (isSuccessSubRole) {
// 			if (mainRole === 'OTHER') {
// 				setSubrole(dataSubRole ? dataSubRole[0].role : '')
// 			}
// 		}
// 	}, [isSuccessSubRole, dataSubRole])
// 	useEffect(() => {
// 		if (isMobile) {
// 			showMobileMenuEffect()
// 		}
// 	}, [location])
// 	useClickAway(event => {
// 		setIsOpen(false)
// 	}, ref)
// 	useEffect(()=>{
// 	if(isFetching){
// 		console.log('test')
// 		setAvatarUrlLocal({
// 		url: avatarUrl?.url,
// 		id: Date.now(),
// 		})
// 	}
// 	},[isFetching])
// 	const getRole = (role: string | undefined) => {
// 		switch (role) {
// 			case 'ABIT':
// 				return t('ABIT')
// 			case 'ABITUR':
// 				return t('ABIT')
// 			case 'STUD':
// 				return t('STUD')
// 			case 'SCHOOL':
// 				return t('SCHOOL')
// 			case 'SEEKER':
// 				return t('SEEKER')
// 			case undefined:
// 				return t('ABIT')
// 			case 'GUEST':
// 				return t('GUEST')
// 			case 'ATTEND':
// 				return t('ATTEND')
// 			case 'EMPL':
// 				return t('EMPL')
// 			case 'OTHER':
// 				return ''
// 		}
// 	}
// 	const onClose = () => {
// 		setOpenDrawer(false)
// 	}
// 	const items: MenuProps['items'] = [
// 		// {
// 		// 	label: <div className={`p-2 text-sm text-blue1f5 font-bold cursor-default`}>{user?.email}</div>,
// 		// 	key: '0'
// 		// },
// 		// {
// 		// 	type: 'divider'
// 		// },
// 		...(maiRole === 'OTHER'
// 			? [
// 					{
// 						label: (
// 							<div
// 								onClick={() => {
// 									navigate('/infoUserUpdate')
// 								}}
// 								className={`${maiRole === 'OTHER' ? '' : 'hidden'} flex items-center gap-[15px] px-[4px] py-[5px]`}
// 							>
// 								<UserSwitchOutlined className="w-[22px] h-[22px] text-blue1f5 flex items-center justify-center" />
// 								{t('changeRole')}
// 							</div>
// 						),
// 						key: '7'
// 					}
// 			  ]
// 			: []),
// 		{
// 			label: (
// 				<div
// 					onClick={() => {
// 						setOpenMenu(false)
// 						navigate('/services/aboutMe/personalData')
// 					}}
// 					className="flex items-center gap-[15px] px-[4px] py-[5px]"
// 				>
// 					<PersonCardSvg />
// 					{t('AboutMe')}
// 				</div>
// 			),
// 			key: '1'
// 		},
// 		// {
// 		// 	label: (
// 		// 		<div
// 		// 			className="flex items-center gap-[15px] px-[4px] py-[5px]"
// 		// 			onClick={() => {
// 		// 				setOpenMenu(false)
// 		// 				navigate('/services/setting/contactInformation')
// 		// 			}}
// 		// 		>
// 		// 			<SettingSvg />
// 		// 			{t('Setting')}
// 		// 		</div>
// 		// 	),
// 		// 	key: '3'
// 		// },
// 		{
// 			label: (
// 				<div
// 					className="flex items-center gap-[15px] px-[4px] py-[5px]"
// 					onClick={() => {
// 						setOpenMenu(false)
// 						dispatch(logOut())
// 					}}
// 				>
// 					<LogoutSvg />
// 					{t('logout')}
// 				</div>
// 			),
// 			key: '5'
// 		}
// 	]
// 	const changeLanguage = (language: string) => {
// 		i18n.changeLanguage(language)
// 	}
// 	const showMobileMenu = () => {
// 		if (document.querySelector('.ant-menu-root')) {
// 			// @ts-ignore
// 			if (document.querySelector('.ant-menu-root').style.position === 'static') {
// 				// @ts-ignore
// 				document.querySelector('.ant-menu-root').style.position = 'fixed'
// 				// @ts-ignore
// 				document.querySelector('header').style.marginLeft = '0'
// 				return
// 			}
// 			// @ts-ignore
// 			document.querySelector('.ant-menu-root').style.position = 'static'
// 			// document.querySelector('header').style.marginLeft = '-100px'
// 		}
// 	}
// 	const showMobileMenuEffect = () => {
// 		if (document.querySelector('.ant-menu-root')) {
// 			// @ts-ignore
// 			if (document.querySelector('.ant-menu-root').style.position === 'static') {
// 				// @ts-ignore
// 				document.querySelector('.ant-menu-root').style.position = 'fixed'
// 				// @ts-ignore
// 				document.querySelector('header').style.marginLeft = '0'
// 				return
// 			}
// 			// document.querySelector('header').style.marginLeft = '-100px'
// 		}
// 	}
// 	const handleVisibleInspired = () => {
// 		// userhelperlibrary({ lang: 'ru'});
// 		setIsOpen(!isOpen)
// 	}
// 	const showModal = () => {
// 		setIsModalOpen(true)
// 	}
// 	const handleOk = () => {
// 		setIsModalOpen(false)
// 	}
// 	const handleCancel = () => {
// 		setIsModalOpen(false)
// 	}
// 	console.log('info', info)
// 	return (
// 		<header
// 			className={clsx(
// 				'shadow z-[1001] flex flex-wrap  h-[80px] fixed flex items-center justify-center w-full',
// 				type === 'main' ? 'bg-white ' : `bg-blue65A`
// 			)}
// 		>
// 			<div
// 				className={`w-screen flex h-full justify-between px-10 max-sm:px-5 ${
// 					type === 'main' ? 'max-w-[1680px] animate-fade-in' : 'animate-fade-in'
// 				} `}
// 			>
// 				<div className="flex gap-8 max-sm:gap-2 items-center">
// 					{user?.roles[0].type === 'ABITUR' || user?.roles[0].type === 'OTHER' ? (
// 						''
// 					) : (
// 						<>
// 							{/* <Button
// 						onClick={showDrawer}
// 						className={clsx(
// 							'py-2.5 rounded-full hover:!bg-transparent font-semibold bg-transparent border-2 flex items-center justify-center block lg:hidden',
// 							type === 'main'
// 								? `text-blue1f5 border-blue1f5 hover:!text-blue1f5`
// 								: 'text-white border-white '
// 						)}
// 						type="primary"
// 					>Сервисы
// 						<span className="pl-2 max-md:!hidden">{t('services')}</span>
// 					</Button> */}
// 							{/* <Button
// 						onClick={showDrawer}
// 						className={clsx(
// 							'h-[38px] py-2.5 rounded-full hover:!bg-transparent font-semibold bg-transparent border-2  items-center justify-center hidden md:flex',
// 							type === 'main'
// 								? `text-blue1f5 border-blue1f5 hover:!text-blue1f5`
// 								: 'text-white border-white '
// 						)}
// 						type="primary"
// 						// icon={<MenuSvg white={type === 'service'} />
// 					>
// 						<span className="w-[105px] pl-2 max-md:!hidden">{t('services')}</span>
// 					</Button> */}
// 						</>
// 					)}
// 					<div className={`flex items-center gap-5 hover:scale-105 duration-500`}>
// 						{/* бургер для сворачивания */}
// 						{/* {location?.pathname !== "/user" ? <Button
// 							onClick={setCollapsed}
// 							className={clsx(
// 								'!px-6  py-4 rounded-full hover:!bg-transparent font-semibold bg-transparent border-2 flex items-center justify-center ',
// 								type === 'main' ? `text-blue1f5 border-blue1f5 hover:!text-blue1f5` : 'text-white border-white '
// 							)}
// 							type="primary"
// 							icon={<MenuSvg white={type === 'service'} />}
// 						/> :''} */}
// 						{i18n.language === 'ru' ? (
// 							<LogoIasSvg white={type === 'service'} />
// 						) : (
// 							// <LogoIasSvgEn white={type === 'service'} />
// 							<LogoSvgNew white={type === 'service'} />
// 						)}
// 						<Divider type="vertical" className="border-l-white h-10 m-0 hidden sm:block" />
// 						<div onClick={showMobileMenu} className="text-white text-base font-bold hidden sm:block">
// 							{service}
// 						</div>
// 					</div>
// 				</div>
// 				<div className="flex gap-3 items-center h-full max-[1000px]:gap-0 w-fit justify-center">
// 					<div className="flex h-full items-center ">
// 						{maiRole === 'ABITUR' || maiRole === 'OTHER' ? (
// 							''
// 						) : (
// 							<a
// 								className={clsx(
// 									'h-full flex gap-2 items-center px-3 cursor-pointer no-underline',
// 									type === 'main' ? 'hover:bg-[#E3E8ED]' : 'hover:bg-blue307'
// 								)}
// 								href={`${
// 									maiRole === 'EMPL'
// 										? `${getBaseUrlShelly()}e-ksu/e_university.show_notification?p1=${maiRoleArray?.userId}&p2=${maiRoleArray?.sessionId}&p_h=${maiRoleArray?.sessionHash}&p_c_sess=1`
// 										: `${getBaseUrlShelly()}e-ksu/main_blocks.startpage`
// 								}`}
// 							>
// 								<ArrowLeftBackInOldAccount white={type === 'service'} />
// 								<span
// 									className={clsx(`text-[14px] text-[#3073D7]`, type === 'service' ? 'text-white' : 'text-[#3073D7]')}
// 								>
// 									{t('OldLk')}
// 								</span>
// 							</a>
// 						)}
// 						{/* <div
// 							className={clsx(
// 								'h-full flex items-center px-3 cursor-pointer ',
// 								type === 'main' ? 'hover:bg-[#E3E8ED]' : 'hover:bg-blue307'
// 							)}
// 						>
// 							<SearchSvg white={type === 'service'} />
// 						</div> */}
// 						{/*<div*/}
// 						{/*	className={clsx(*/}
// 						{/*		'h-full flex items-center px-3 cursor-pointer ',*/}
// 						{/*		type === 'main' ? 'hover:bg-[#E3E8ED]' : 'hover:bg-blue307'*/}
// 						{/*	)}*/}
// 						{/*>*/}
// 						{/*	<mainRoleSvg white={type === 'service'} />*/}
// 						{/*</div>*/}
// 						{/*<div*/}
// 						{/*	className={clsx(*/}
// 						{/*		'h-full flex items-center px-3 cursor-pointer ',*/}
// 						{/*		type === 'main' ? 'hover:bg-[#E3E8ED]' : 'hover:bg-blue307'*/}
// 						{/*	)}*/}
// 						{/*>*/}
// 						{/*	<MapSvg white={type === 'service'} />*/}
// 						{/*</div>*/}
// 						{/*<div*/}
// 						{/*	className={clsx(*/}
// 						{/*		'h-full flex items-center px-3 cursor-pointer ',*/}
// 						{/*		type === 'main' ? 'hover:bg-[#E3E8ED]' : 'hover:bg-blue307'*/}
// 						{/*	)}*/}
// 						{/*>*/}
// 						{/*	<DocumentSvg white={type === 'service'} />*/}
// 						{/*</div>*/}
// 						{/* <div
// 							className={clsx(
// 								'h-full flex items-center px-3 cursor-pointer ',
// 								type === 'main' ? 'hover:bg-[#E3E8ED]' : 'hover:bg-blue307'
// 							)}
// 						>
// 							<EyeSvg white={type === 'service'} />
// 						</div> */}
// 						<div
// 							id="messagesForTest"
// 							className={`cursor-pointer h-full p-2 flex items-center   ${
// 								type === 'main' ? 'hover:bg-[#E3E8ED]' : 'hover:bg-blue307'
// 							}`}
// 							onClick={() => {
// 								navigate('/services/messages')
// 							}}
// 						>
// 							<Badge className="" count={unreadChatsCount || null}>
// 								<MessageModuleSvg white={type === 'service'} />
// 							</Badge>
// 						</div>
// 						<div className="relative inline-block h-full">
// 							<div
// 								className={`cursor-pointer mx-3 p-2 h-full flex items-center ${
// 									type === 'main' ? 'hover:bg-[#E3E8ED]' : 'hover:bg-blue307'
// 								}`}
// 								onClick={e => {
// 									e.stopPropagation()
// 									handleVisibleInspired()
// 								}}
// 							>
// 								<EyeSvg white={type === 'service'} />
// 							</div>
// 							<div className="h-full ">
// 								<AccessibilityHelper ref={ref} isOpen={isOpen} lang={i18n.language} />
// 							</div>
// 						</div>
// 					</div>
// 					<Select
// 						defaultValue={paramValue === 'eng' ? 'en' : i18n.language}
// 						style={{ width: 70 }}
// 						variant="borderless"
// 						className={clsx(
// 							type === 'main' ? 'hover:bg-[#E3E8ED]' : 'hover:bg-blue307',
// 							'h-full flex items-center max-sm:hidden ',
// 							type === 'service' && 'text-white'
// 						)}
// 						dropdownStyle={{ color: 'white' }}
// 						popupClassName="text-white"
// 						onChange={e => changeLanguage(e.valueOf())}
// 						options={[
// 							{ value: 'ru', label: 'Рус' },
// 							{ value: 'en', label: 'Eng' }
// 						]}
// 					/>
// 					<div
// 						className={clsx(
// 							'h-full flex items-center cursor-pointer w-fit',
// 							type === 'main' && openMenu && 'bg-[#E3E8ED]',
// 							type !== 'main' && openMenu && 'bg-blue307',
// 							type === 'main' ? 'hover:bg-[#E3E8ED]' : 'target:bg-blue307'
// 						)}
// 					>
// 						<Dropdown
// 							menu={{ items }}
// 							placement="bottom"
// 							onOpenChange={() => setOpenMenu(prev => !prev)}
// 							trigger={['click']}
// 							className="cursor-pointer h-full  box-border"
// 						>
// 							<Space className="!border-none px-4  gap-5 flex justyfy-between">
// 								{isAvatarLoading ? '' : <Avatar
// 								 		key={avatarUrlLocal?.id}
// 										className='bg-[#cbdaf1] rounded-[50%] !w-[45px] !h-[45px] !border-none blur-[0.5px]  opacity-[0.8]'
// 										size={180}
// 										src={avatarLocal}
// 								// 		icon={
// 								// avatarUrl?.url==='There is no photo' ? <PersonSvg white={type === 'service'} />
// 								// : avatarUrl===null ? <PersonSvg white={type === 'service'} />
// 								// : errorAva ? <PersonSvg white={type === 'service'} />
// 								// : avatarUrl?.url
// 								// }
// 								/>}
// 								<div className={clsx('h-full max-[455px]:hidden', type === 'service' && 'text-white')}>
// 									<div className="font-bold text-sm truncate max-w-[120px]">
// 										{i18n.language === 'ru'
// 											? `${user?.lastname} ${user?.firstname?.charAt(0)}. ${
// 													user?.middlename === '' ? '' : user?.middleName?.charAt(0) ?? ''
// 											  }`
// 											: `${info?.engLastname} ${info?.engFirstname?.charAt(0)}. ${
// 													info?.engMiddlename === '' ? '' : info?.engMiddlename?.charAt(0) ?? ''
// 											  }`}
// 									</div>
// 									<div className="text-sm ">
// 										{user?.roles && user?.roles?.length > 1
// 											? user?.roles
// 													.filter(
// 														(item: any, index: any, self: any) =>
// 															index === self.findIndex((t: any) => t.type === item.type)
// 													)
// 													.toSorted((a: any, b: any) => (a.type === mainRole ? -1 : b.type === mainRole ? 1 : 0))
// 													.map((item: any) => (
// 														<div className={`${item.type === mainRole ? '' : 'text-gray-300'}`}>
// 															{getRole(item.type)}
// 														</div>
// 													))
// 											: String(user?.roles?.map((item: any) => getRole(item.type)))}
// 									</div>
// 									<div>{getRole(subRole)}</div>
// 								</div>
// 							</Space>
// 						</Dropdown>
// 						{/* <Drawer
// 							rootStyle={{ position: 'fixed', top: 75 }}
// 							placement="top"
// 							size="large"
// 							closable={false}
// 							className="!bg-[#F5F8FB]"
// 							onClose={onClose}
// 							open={openDrawer}
// 							key="top"
// 						>
// 							<ModalNav />
// 						</Drawer> */}
// 					</div>
// 				</div>
// 			</div>
// 			{urlContainsPractice ? (
// 				<div className="block lg:hidden  bg-blue65A  flex w-full mt-[1px] items-center p-1">
// 					<Button
// 						onClick={showMobileMenu}
// 						className={clsx(
// 							'py-2.5 ml-4 mr-4  rounded-full hover:!bg-transparent font-semibold bg-transparent border-2 flex items-center justify-center ',
// 							type === 'main' ? `text-blue1f5 border-blue1f5 hover:!text-blue1f5` : 'text-white border-white '
// 						)}
// 						type="primary"
// 						icon={<MenuSvg white={type === 'service'} />}
// 					>
// 						<span className="pl-2 max-md:!hidden">{t('services')}</span>
// 					</Button>
// 					<Divider type="vertical" className="border-l-white h-10 m-0 mr-4" />
// 					<div className="text-white text-base font-bold ">{service}</div>
// 				</div>
// 			) : (
// 				''
// 			)}
// 			<Modal footer={null} title="" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
// 				<div className="p-8 flex flex-col gap-2">
// 					{user?.roles && user?.roles?.length > 1
// 						? user?.roles?.map((item: any) => (
// 								<Button
// 									onClick={async () => {
// 										if (mainRole === item.type) {
// 											return
// 										}
// 										setmainRole(item.type)
// 										// логика для обновления куков в случае смены роли
// 										const storedPassword = localStorage.getItem('password')
// 										const password = storedPassword ? JSON.parse(storedPassword) : ''
// 										login({
// 											username: item.login,
// 											password: password
// 										})
// 											.unwrap()
// 											.then(data => {
// 												document.cookie = `refresh=${data.refreshToken}; max-age=31536000; domain=${
// 													document.domain !== 'localhost' ? 'kpfu.ru' : 'localhost'
// 												}; path=/; samesite=strict`
// 												document.cookie = `s_id=${data.user.sessionId}; max-age=31536000; domain=${
// 													document.domain !== 'localhost' ? 'kpfu.ru' : 'localhost'
// 												}; path=/; samesite=strict`
// 												document.cookie = `h_id=${data.user.sessionHash}; max-age=31536000; domain=${
// 													document.domain !== 'localhost' ? 'kpfu.ru' : 'localhost'
// 												}; path=/; samesite=strict`
// 												document.cookie = `a_id=${data.user.allId}; max-age=31536000; domain=${
// 													document.domain !== 'localhost' ? 'kpfu.ru' : 'localhost'
// 												}; path=/; samesite=strict`
// 												console.log('меняю роль')
// 												window.location.replace('/user')
// 												// window.location.reload()
// 											})
// 											.catch(error => {
// 												console.log(error)
// 												window.location.replace('/user')
// 											})
// 									}}
// 									className={`${item.type === mainRole ? 'font-extrabold' : ''} cursor-pointer`}
// 								>
// 									{getRole(item.type)}
// 								</Button>
// 						  ))
// 						: ''}
// 				</div>
// 			</Modal>
// 		</header>
// 	)
// }
import { CloseOutlined, MenuOutlined, UserSwitchOutlined } from '@ant-design/icons'
import { useLocalStorageState } from 'ahooks'
import { useClickAway } from 'ahooks'
import { Avatar, Badge, Button, Divider, Drawer, Dropdown, Modal, Select, Space, Spin } from 'antd'
import type { MenuProps } from 'antd'
import clsx from 'clsx'
import React, { useEffect, useRef, useState } from 'react'
// Импортируем React для React.isValidElement
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

import { EyeSvg, LogoIasSvg, LogoutSvg, MenuSvg, PersonCardSvg, PersonSvg, SettingSvg } from '../../assets/svg'
import { ArrowLeftBackInOldAccount } from '../../assets/svg/ArrowLeftBackInOldAccount'
// import { LogoIasSvgEn } from '../../assets/svg/LogoIasSvgEn' // Убедитесь, что этот импорт нужен или удалите
import { LogoSvgNew } from '../../assets/svg/LogoSvgNew'
import { MessageModuleSvg } from '../../assets/svg/MessagesModuleSvg'
import { TypeHeaderProps } from '../../models/layout'
import { useAppSelector } from '../../store'
import { useGetAvatarQuery } from '../../store/api/aboutMe/forAboutMe'
import { useFakeLoginMutation } from '../../store/api/fakeLogin'
import { useGetAllUnReadQuery } from '../../store/api/messages/messageApi'
import { useGetRoleQuery } from '../../store/api/serviceApi'
import { getBaseUrlShelly } from '../../store/api/studentPractice/getBaseUrlShelly'
import { logOut } from '../../store/reducers/authSlice'
import AccessibilityHelper from '../AccessibilityHelper/AccessibilityHelper'
import { QrCode } from '../../assets/svg/QrCode'

// import { ModalNav } from '../service/ModalNav'; // Если ModalNav не используется, можно удалить

export const Header = ({ type = 'main', service }: TypeHeaderProps) => {
	const [isModalOpen, setIsModalOpen] = useState(false)
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const [openDrawer, setOpenDrawer] = useState(false)
	const [openMenu, setOpenMenu] = useState(false)
	const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false)
	const { t, i18n } = useTranslation()
	const location = useLocation()
	const searchParams = new URLSearchParams(location.search)
	const paramValue = searchParams.get('lan')
	const user = useAppSelector(state => state.auth.user)
	const urlContainsPractice = location.pathname.includes('practice')
	const { data: dataSubRole, isSuccess: isSuccessSubRole } = useGetRoleQuery(null)
	const roles = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '')?.roles : []
	const username = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '')?.username : ''
	const maiRole = roles.find((item: any) => item.login === username)?.type || ''
	const maiRoleArray = roles.find((item: any) => item.login === username)
	const [subRole, setSubrole] = useLocalStorageState<any>('subRole', { defaultValue: '' })
	const [mainRole, setmainRole] = useLocalStorageState<any>('typeAcc', { defaultValue: 'STUD' })
	const [login] = useFakeLoginMutation()
	const [isOpenAccessibility, setIsOpenAccessibility] = useState(false)
	const [info, setInfo] = useLocalStorageState<any>('info', { defaultValue: '' })
	const accessibilityRef = useRef<any>(null) // Переименовал ref для ясности
	const { unreadChatsCount } = useGetAllUnReadQuery(null, {
		pollingInterval: 2000,
		skipPollingIfUnfocused: true,
		selectFromResult: ({ data }) => ({
			unreadChatsCount: data?.unreadChatsCount
		})
	})
	const {
		data: avatarUrl,
		isLoading: isAvatarLoading,
		isSuccess: isSuccesAvatar,
		isFetching
	} = useGetAvatarQuery(undefined, {
		skip: !['/services/aboutMe', '/user'].some(path => location.pathname.includes(path))
	})
	const [avatarLocal, setAvatarLocal] = useLocalStorageState<any>('avatarLocal', { defaultValue: '' })
	const [avatarUrlLocal, setAvatarUrlLocal] = useState<any>({
		url: null,
		id: null
	})

	useEffect(() => {
		if (isSuccesAvatar && avatarUrl) {
			setAvatarLocal(avatarUrl.url)
		}
	}, [isSuccesAvatar, avatarUrl, setAvatarLocal])

	useEffect(() => {
		if (isSuccessSubRole && dataSubRole) {
			if (mainRole === 'OTHER') {
				setSubrole(dataSubRole.length > 0 ? dataSubRole[0].role : '')
			}
		}
	}, [isSuccessSubRole, dataSubRole, mainRole, setSubrole])

	useEffect(() => {
		if (location.pathname.includes('practice')) {
			showMobileMenuEffect()
		}
	}, [location])

	useClickAway(() => {
		setIsOpenAccessibility(false)
	}, accessibilityRef)

	useEffect(() => {
		if (isFetching && avatarUrl) {
			setAvatarUrlLocal({
				url: avatarUrl.url,
				id: Date.now()
			})
		}
	}, [isFetching, avatarUrl])

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
			default:
				return role || ''
		}
	}

	const onClosePracticeDrawer = () => {
		setOpenDrawer(false)
	}

	const showMobileBurgerMenu = () => {
		setIsMobileDrawerOpen(prev => !prev)
	}
	const onCloseMobileBurgerMenu = () => {
		setIsMobileDrawerOpen(false)
	}

	const profileMenuItems: MenuProps['items'] = [
		...(maiRole === 'OTHER'
			? [
					{
						// Это div будет обработан в renderMobileMenuItems
						label: (
							<div
								onClick={() => {
									// Этот onClick будет извлечен и использован
									setOpenMenu(false)
									onCloseMobileBurgerMenu()
									navigate('/infoUserUpdate')
								}}
								// Классы здесь будут проигнорированы в Drawer в пользу commonItemClass, но важны для Desktop Dropdown
								className="flex items-center gap-[15px] px-[4px] py-[5px]"
							>
								<UserSwitchOutlined className="w-[22px] h-[22px] text-blue1f5 flex items-center justify-center" />
								{t('changeRole')}
							</div>
						),
						key: '7'
					}
			  ]
			: []),
		{
			label: (
				<div
					onClick={() => {
						setOpenMenu(false)
						onCloseMobileBurgerMenu()
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
						onCloseMobileBurgerMenu()
						dispatch(logOut())
					}}
				>
					<LogoutSvg />
					{t('logout')}
				</div>
			),
			key: '5'
		}
	]

	const changeLanguage = (language: string) => {
		i18n.changeLanguage(language)
		onCloseMobileBurgerMenu()
	}

	const showMobileMenuPractice = () => {
		// Renamed for clarity, specific to practice page
		if (document.querySelector('.ant-menu-root')) {
			const menuRoot = document.querySelector('.ant-menu-root') as HTMLElement
			const headerElement = document.querySelector('header') as HTMLElement
			if (menuRoot.style.position === 'static') {
				menuRoot.style.position = 'fixed'
				if (headerElement) headerElement.style.marginLeft = '0'
				return
			}
			menuRoot.style.position = 'static'
		}
	}
	const showMobileMenuEffect = () => {
		// Specific to practice page
		if (document.querySelector('.ant-menu-root')) {
			const menuRoot = document.querySelector('.ant-menu-root') as HTMLElement
			const headerElement = document.querySelector('header') as HTMLElement
			if (menuRoot.style.position === 'static') {
				menuRoot.style.position = 'fixed'
				if (headerElement) headerElement.style.marginLeft = '0'
				return
			}
		}
	}

	const handleVisibleInspired = () => {
		setIsOpenAccessibility(!isOpenAccessibility)
		// Закрываем бургер меню, если открыли "глазик" из него
		if (isMobileDrawerOpen) {
			onCloseMobileBurgerMenu()
		}
	}

	const handleAccessibilityItemClick = () => {
		setIsOpenAccessibility(!isOpenAccessibility)
		onCloseMobileBurgerMenu() // Закрыть бургер меню
	}

	const showRoleChangeModal = () => {
		// Renamed for clarity
		setIsModalOpen(true)
	}
	const handleRoleChangeOk = () => {
		// Renamed for clarity
		setIsModalOpen(false)
	}
	const handleRoleChangeCancel = () => {
		// Renamed for clarity
		setIsModalOpen(false)
	}

	const commonItemClass =
		'text-[16px] flex items-center gap-x-3 px-4 py-3 cursor-pointer w-full text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100'
	const iconWrapperClass = 'text-xl text-gray-500 w-6 h-6 flex items-center justify-center' // Для консистентности размеров иконок

	const renderMobileMenuItems = () => (
		<>
			{/* Профиль */}
			<Space className="mt-12 mb-2 ml-2">
				{' '}
				{/* Уменьшил gap до gap-3, добавил items-center h-full */}
				{!isAvatarLoading && avatarLocal && (
					<Avatar
						key={avatarUrlLocal?.id || 'avatar'}
						className="bg-[#cbdaf1] rounded-[50%] !w-[40px] !h-[40px] !border-none" // Уменьшил размер аватара
						size={40}
						src={avatarLocal}
					/>
				)}
				{/* Аватар и ФИО скрыты в мобильной версии через родительский div "hidden sm:flex" */}
				<div
					className={clsx('h-full flex flex-col justify-center max-[455px]:hidden', type === 'service' && 'text-white')}
				>
					<div className="font-bold text-sm truncate max-w-[120px]">
						{i18n.language === 'ru'
							? `${user?.lastname || ''} ${user?.firstname?.charAt(0) || ''}. ${
									user?.middlename === '' || !user?.middleName ? '' : user?.middleName?.charAt(0) ?? ''
							  }`
									.trim()
									.replace(/\.\.$/, '.')
									.replace(/\.$/, '') // Убираем лишние точки
							: `${info?.engLastname || user?.lastname || ''} ${
									info?.engFirstname?.charAt(0) || user?.firstname?.charAt(0) || ''
							  }. ${info?.engMiddlename === '' || !info?.engMiddlename ? '' : info?.engMiddlename?.charAt(0) ?? ''}`
									.trim()
									.replace(/\.\.$/, '.')
									.replace(/\.$/, '')}
					</div>
					<div className="text-xs ">
						{' '}
						{/* Уменьшил размер шрифта для ролей */}
						{user?.roles && user?.roles?.length > 1
							? user?.roles
									.filter(
										(item: any, index: any, self: any) => index === self.findIndex((t: any) => t.type === item.type)
									)
									.toSorted((a: any, b: any) => (a.type === mainRole ? -1 : b.type === mainRole ? 1 : 0))
									.map((item: any, idx: number) => (
										<div
											key={idx}
											className={`${
												item.type === mainRole ? (type === 'service' ? 'text-white' : 'text-gray-800') : 'text-gray-400'
											}`}
										>
											{getRole(item.type)}
										</div>
									))
							: String(user?.roles?.map((item: any) => getRole(item.type)))}
					</div>
					{subRole && <div className="text-xs">{getRole(subRole)}</div>} {/* Отображаем subRole если есть */}
				</div>
			</Space>
			{/* Выбор языка */}
			<div className="px-4 py-3 mb-2 mt-2">
				{' '}
				{/* Контейнер для Select не должен быть сам по себе кликабельным как пункт меню */}
				<Select
					defaultValue={paramValue === 'eng' ? 'en' : i18n.language}
					style={{ width: '98%' }}
					dropdownMatchSelectWidth={false}

					onChange={e => changeLanguage(e.valueOf())} // changeLanguage уже вызывает onCloseMobileBurgerMenu
					options={[
						{ value: 'ru', label: 'Рус' },
						{ value: 'en', label: 'Eng' }
					]}
				/>
			</div>
			{/* <Divider className="my-0" /> */}

			{/* В старый ЛК */}
			{maiRole !== 'ABITUR' && maiRole !== 'OTHER' && (
				<>
					<a
						className={commonItemClass}
						href={`${
							maiRole === 'EMPL'
								? `${getBaseUrlShelly()}e-ksu/e_university.show_notification?p1=${maiRoleArray?.userId}&p2=${
										maiRoleArray?.sessionId
								  }&p_h=${maiRoleArray?.sessionHash}&p_c_sess=1`
								: `${getBaseUrlShelly()}e-ksu/main_blocks.startpage`
						}`}
						onClick={onCloseMobileBurgerMenu} // Закрытие меню при клике
					>
						<span className={iconWrapperClass}>
							<ArrowLeftBackInOldAccount white={false} />
						</span>
						<span>{t('OldLk')}</span>
					</a>
					<Divider className="my-0" />
				</>
			)}

			{/* Мессенджер */}
			<div
				className={commonItemClass}
				onClick={() => {
					navigate('/services/messages')
					onCloseMobileBurgerMenu()
				}}
				role="menuitem"
				tabIndex={0}
				onKeyDown={e => {
					if (e.key === 'Enter' || e.key === ' ') {
						navigate('/services/messages')
						onCloseMobileBurgerMenu()
					}
				}}
			>
				<Badge count={unreadChatsCount || null} size="small" className={iconWrapperClass}>
					<MessageModuleSvg white={false} />
				</Badge>
				<span>{t('messages.title', 'Мессенджер')}</span>
			</div>
			<Divider className="my-0" />

			{/* Глазик */}
			{/* <div
				className={commonItemClass}
				onClick={handleAccessibilityItemClick} // Используем новую функцию
				role="menuitem"
				tabIndex={0}
				onKeyDown={e => {
					if (e.key === 'Enter' || e.key === ' ') handleAccessibilityItemClick()
				}}
			>
				<span className={iconWrapperClass}>
					<EyeSvg white={false} />
				</span>
				<span>{t('accessibility.title', 'Версия для слабовидящих')}</span>
			</div> 
			<Divider className="my-0" /> */}

			{/* Profile items */}
			{profileMenuItems.map((item: any) => {
				// Используем Menu.ItemType или any для упрощения
				if (!item || item.type === 'divider') {
					// Добавил проверку на !item для безопасности
					return <Divider key={item?.key || Math.random()} className="my-0" />
				}

				// item.label это React элемент (div с onClick и детьми)
				if (React.isValidElement(item.label) && item.label.props) {
					const action = item.label.props.onClick // Это функция, которая УЖЕ включает onCloseMobileBurgerMenu
					const contentChildren = item.label.props.children // Это [ <Icon/>, "Текст" ]

					return (
						<>
						<div
							key={item.key}
							className={commonItemClass} // Применяем общий стиль
							onClick={() => {
								if (action) action() // Вызываем действие, которое уже содержит onCloseMobileBurgerMenu
							}}
							role="menuitem"
							tabIndex={0}
							onKeyDown={e => {
								if (e.key === 'Enter' || e.key === ' ') {
									if (action) action()
								}
							}}
						>
							{/* Рендерим детей напрямую, они уже содержат иконку и текст */}
							{contentChildren}
							
						</div>
						<Divider className="my-0" />
						</>
					)
				}
				// Резервный вариант, если структура item.label неожиданная (не должен срабатывать с текущими profileMenuItems)
				return (
					<div key={item.key} className={commonItemClass} onClick={onCloseMobileBurgerMenu}>
						{item.label}
					</div>
				)
			})}
		</>
	)

	return (
		<header
			className={clsx(
				'shadow z-[1001] flex flex-wrap h-[80px] fixed items-center justify-center w-full',
				type === 'main' ? 'bg-white ' : `bg-blue65A`
			)}
		>
			<div
				className={`w-screen flex h-full justify-between px-5 sm:px-10 max-sm:px-5 ${
					type === 'main' ? 'max-w-[1680px] animate-fade-in' : 'animate-fade-in'
				} `}
			>
				<div className="flex gap-8 max-sm:gap-2 items-center">
					<div
						className={`flex items-center gap-5 hover:scale-105 duration-500 cursor-pointer`}
						onClick={() => navigate('/user')}
					>
						{i18n.language === 'ru' ? (
							<LogoIasSvg white={type === 'service'} />
						) : (
							<LogoSvgNew white={type === 'service'} />
						)}

						<Divider
							type="vertical"
							className={clsx('h-10 m-0 hidden sm:block', type === 'service' ? 'border-l-white' : 'sm:hidden')}
						/>
						<div
							onClick={showMobileMenuPractice}
							className={clsx(
								'text-base font-bold hidden sm:block',
								type === 'service' ? 'text-white' : 'text-gray-700'
							)}
						>
							{service}
						</div>
					</div>
				</div>

				{/* Desktop Menu Items */}
				<div className="hidden sm:flex gap-3 items-center h-full max-[1000px]:gap-0 w-fit justify-center">
					<div className="flex h-full items-center ">
						{maiRole !== 'ABITUR' && maiRole !== 'OTHER' && (
							<a
								className={clsx(
									'h-full flex gap-2 items-center px-3 cursor-pointer no-underline',
									type === 'main' ? 'hover:bg-[#E3E8ED]' : 'hover:bg-blue307'
								)}
								href={`${
									maiRole === 'EMPL'
										? `${getBaseUrlShelly()}e-ksu/e_university.show_notification?p1=${maiRoleArray?.userId}&p2=${
												maiRoleArray?.sessionId
										  }&p_h=${maiRoleArray?.sessionHash}&p_c_sess=1`
										: `${getBaseUrlShelly()}e-ksu/main_blocks.startpage`
								}`}
							>
								<ArrowLeftBackInOldAccount white={type === 'service'} />
								<span className={clsx(`text-[14px]`, type === 'service' ? 'text-white' : 'text-[#3073D7]')}>
									{t('OldLk')}
								</span>
							</a>
						)}
						{<div className="hidden sm:flex relative inline-block h-full">
							<div
								className={`cursor-pointer p-3 h-full flex items-center ${
									// Увеличил немного паддинг
									type === 'main' ? 'hover:bg-[#E3E8ED]' : 'hover:bg-blue307'
								}`}
								onClick={e => {
									e.stopPropagation()
									setIsOpenAccessibility(!isOpenAccessibility) // Управляем состоянием для AccessibilityHelper
								}}
							>
								<QrCode white={type === 'service'} />
							</div>
							
						</div>}


						<div
							id="messagesForTest"
							className={`cursor-pointer h-full p-3 flex items-center ${
								// Увеличил немного паддинг для лучшего попадания
								type === 'main' ? 'hover:bg-[#E3E8ED]' : 'hover:bg-blue307'
							}`}
							onClick={() => {
								navigate('/services/messages')
							}}
						>
							<Badge className="" count={unreadChatsCount || null} size="default">
								<MessageModuleSvg white={type === 'service'} />
							</Badge>
						</div>
						<div className="relative inline-block h-full">
							<div
								className={`cursor-pointer p-3 h-full flex items-center ${
									// Увеличил немного паддинг
									type === 'main' ? 'hover:bg-[#E3E8ED]' : 'hover:bg-blue307'
								}`}
								onClick={e => {
									e.stopPropagation()
									setIsOpenAccessibility(!isOpenAccessibility) // Управляем состоянием для AccessibilityHelper
								}}
							>
								<EyeSvg white={type === 'service'} />
							</div>
							<div className="h-full ">
								<AccessibilityHelper ref={accessibilityRef} isOpen={isOpenAccessibility} lang={i18n.language}  onClose={() => setIsOpenAccessibility(false)} />
							</div>
						</div>
					</div>
					<Select
						defaultValue={paramValue === 'eng' ? 'en' : i18n.language}
						style={{ width: 70 }}
						variant="borderless"
						className={clsx(
							type === 'main' ? 'hover:bg-[#E3E8ED] text-gray-700' : 'hover:bg-blue307 text-white',
							'h-full flex items-center'
						)}
						popupClassName={clsx(type === 'main' ? '!text-gray-700' : '!text-white')}
						dropdownStyle={type === 'main' ? { color: '#333' } : { color: 'white' }}
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
							type === 'main' ? 'hover:bg-[#E3E8ED]' : 'hover:bg-blue307' // было target:bg-blue307
						)}
					>
						<Dropdown
							menu={{ items: profileMenuItems }} // Используем те же profileMenuItems
							placement="bottomRight" // Изменено для лучшего позиционирования
							onOpenChange={isOpen => setOpenMenu(isOpen)} // Явное управление состоянием
							open={openMenu} // Контролируем состояние открытия
							trigger={['click']}
							className="cursor-pointer h-full box-border"
						>
							<Space className="!border-none px-4 gap-3 flex justify-between items-center h-full">
								{' '}
								{/* Уменьшил gap до gap-3, добавил items-center h-full */}
								{!isAvatarLoading && avatarLocal && (
									<Avatar
										key={avatarUrlLocal?.id || 'avatar'}
										className="bg-[#cbdaf1] rounded-[50%] !w-[40px] !h-[40px] !border-none" // Уменьшил размер аватара
										size={40}
										src={avatarLocal}
									/>
								)}
								{/* Аватар и ФИО скрыты в мобильной версии через родительский div "hidden sm:flex" */}
								<div
									className={clsx(
										'h-full flex flex-col justify-center max-[455px]:hidden',
										type === 'service' && 'text-white'
									)}
								>
									<div className="font-bold text-sm truncate max-w-[120px]">
										{i18n.language === 'ru'
											? `${user?.lastname || ''} ${user?.firstname?.charAt(0) || ''}. ${
													user?.middlename === '' || !user?.middleName ? '' : user?.middleName?.charAt(0) ?? ''
											  }`
													.trim()
													.replace(/\.\.$/, '.')
													.replace(/\.$/, '') // Убираем лишние точки
											: `${info?.engLastname || user?.lastname || ''} ${
													info?.engFirstname?.charAt(0) || user?.firstname?.charAt(0) || ''
											  }. ${
													info?.engMiddlename === '' || !info?.engMiddlename ? '' : info?.engMiddlename?.charAt(0) ?? ''
											  }`
													.trim()
													.replace(/\.\.$/, '.')
													.replace(/\.$/, '')}
									</div>
									<div className="text-xs ">
										{' '}
										{/* Уменьшил размер шрифта для ролей */}
										{user?.roles && user?.roles?.length > 1
											? user?.roles
													.filter(
														(item: any, index: any, self: any) =>
															index === self.findIndex((t: any) => t.type === item.type)
													)
													.toSorted((a: any, b: any) => (a.type === mainRole ? -1 : b.type === mainRole ? 1 : 0))
													.map((item: any, idx: number) => (
														<div
															key={idx}
															className={`${
																item.type === mainRole
																	? type === 'service'
																		? 'text-white'
																		: 'text-gray-800'
																	: 'text-gray-400'
															}`}
														>
															{getRole(item.type)}
														</div>
													))
											: String(user?.roles?.map((item: any) => getRole(item.type)))}
									</div>
									{subRole && <div className="text-xs">{getRole(subRole)}</div>} {/* Отображаем subRole если есть */}
								</div>
							</Space>
						</Dropdown>
					</div>
				</div>

				{/* Burger Menu Icon (Mobile Only) */}
				<div className="sm:hidden flex items-center relative">
					<Avatar
						className={clsx(
							'bg-[#cbdaf1] rounded-[50%] !w-[40px] !h-[40px] !border-none transition-opacity duration-200',
							isMobileDrawerOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
						)}
						size={40}
						src={avatarLocal}
						onClick={showMobileBurgerMenu}
					/>
					<Button
						type="text"
						icon={<CloseOutlined />}
						onClick={showMobileBurgerMenu}
						className={clsx(
							'!w-[40px] !h-[40px] !p-0 bg-[#cbdaf100] hover:bg-[#b8cde8] text-[#1F5CB8] hover:text-gray-900 absolute transition-all duration-200 rounded-[50%] flex items-center justify-center !text-xl !border-none',
							isMobileDrawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
						)}
						aria-label="Закрыть меню"
					/>
				</div>
			</div>

			<Drawer
				title={<span className="text-lg font-semibold">{t('menuTitle', 'Меню')}</span>}
				placement="right"
				onClose={onCloseMobileBurgerMenu}
				open={isMobileDrawerOpen}
				bodyStyle={{ padding: 0 }}
				className="sm:hidden"
				width={'100%'}
				// Можно задать ширину для лучшего вида на мобильных
			>
				{renderMobileMenuItems()}
			</Drawer>

			{urlContainsPractice ? (
				<div className="block lg:hidden bg-blue65A flex w-full mt-[1px] items-center p-1">
					<Button
						onClick={showMobileMenuPractice}
						className={clsx(
							'py-2.5 ml-4 mr-4 rounded-full hover:!bg-transparent font-semibold bg-transparent border-2 flex items-center justify-center ',
							type === 'main' ? `text-blue1f5 border-blue1f5 hover:!text-blue1f5` : 'text-white border-white '
						)}
						type="primary" // AntD v5 primary может иметь фон, если нужен прозрачный, используйте default или text
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

			<Modal
				footer={null}
				title={t('roleChangeModalTitle', 'Смена роли')}
				open={isModalOpen}
				onOk={handleRoleChangeOk}
				onCancel={handleRoleChangeCancel}
			>
				<div className="p-4 flex flex-col gap-3">
					{' '}
					{/* Уменьшил паддинг, увеличил gap */}
					{user?.roles && user?.roles?.length > 1 ? (
						user?.roles
							.filter(
								(item: any, index: any, self: any) =>
									index === self.findIndex((t: any) => t.type === item.type && t.login === item.login)
							) // Более точный distinct
							.map((item: any) => (
								<Button
									key={item.login + item.type}
									block // Кнопки на всю ширину
									type={mainRole === item.type ? 'primary' : 'default'} // Выделяем активную роль
									onClick={async () => {
										if (mainRole === item.type) {
											handleRoleChangeCancel() // Просто закрыть если роль та же
											return
										}
										setmainRole(item.type)
										const storedPassword = localStorage.getItem('password')
										const password = storedPassword ? JSON.parse(storedPassword) : ''
										try {
											const data = await login({
												username: item.login,
												password: password
											}).unwrap()
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
											window.location.replace('/user')
										} catch (error) {
											console.error('Fake login error:', error)
											// Можно показать сообщение об ошибке пользователю
											window.location.replace('/user') // Перезагрузка в любом случае
										} finally {
											handleRoleChangeCancel()
										}
									}}
									className={clsx(mainRole !== item.type && 'hover:border-blue-500 hover:text-blue-500')}
								>
									{getRole(item.type)} ({item.login === username ? t('currentLogin', 'тек.') : item.login})
								</Button>
							))
					) : (
						<p>{t('noOtherRoles', 'Нет других доступных ролей для переключения.')}</p>
					)}
				</div>
			</Modal>
		</header>
	)
}
