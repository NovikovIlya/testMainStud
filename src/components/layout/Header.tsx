import { UserSwitchOutlined } from '@ant-design/icons'
import { useLocalStorageState } from 'ahooks'
import { Button, Divider, Drawer, Modal, Select ,Dropdown, Space} from 'antd'
import type { MenuProps } from 'antd'

import clsx from 'clsx'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

import logo from '../../assets/images/logo.svg'
import {
	EyeSvg,
	LogoIasSvg,
	LogoutSvg,
	MenuSvg,
	PersonCardSvg,
	PersonSvg,
	SearchSvg,
	SettingSvg
} from '../../assets/svg'
import { ArrowLeftBackInOldAccount } from '../../assets/svg/ArrowLeftBackInOldAccount'
import PersonalizationSvg from '../../assets/svg/PersonalizationSvg'
import { TypeHeaderProps } from '../../models/layout'
import { useAppSelector } from '../../store'
import { useGetRoleQuery } from '../../store/api/serviceApi'
import { logOut, setEdit, setIsCollapsed } from '../../store/reducers/authSlice'
import { isMobileDevice } from '../../utils/hooks/useIsMobile'
import { ModalNav } from '../service/ModalNav'
import { useFakeLoginMutation } from '../../store/api/fakeLogin'
import { LogoIasSvgEn } from '../../assets/svg/LogoIasSvgEn'
import AccessibilityHelper from '../AccessibilityHelper/AccessibilityHelper'
import { useClickAway } from 'ahooks';



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
	// const subRole = useAppSelector(state => state.auth.subRole)
	const isMobile = isMobileDevice()
	const urlContainsPractice = location.pathname.includes('practice')
	const { data: dataSubRole, isSuccess: isSuccessSubRole, isLoading: isLoadingSubRole } = useGetRoleQuery(null)
	const roles = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '')?.roles : []
	const username = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '')?.username : ''
	const maiRole = roles.find((item: any) => item.login === username)?.type || ''
	const [subRole, setSubrole] = useLocalStorageState<any>('subRole', { defaultValue: '' })
	const [mainRole, setmainRole] = useLocalStorageState<any>('typeAcc', {
		defaultValue: 'STUD'
	})
	const [login,{ data:dataLogin,isSuccess, isLoading }] = useFakeLoginMutation()
	const [isOpen, setIsOpen] = useState(false);
	const ref = useRef<any>(null);

	useEffect(() => {
		if (isSuccessSubRole) {
			if (mainRole === 'OTHER') {
				setSubrole(dataSubRole ? dataSubRole[0].role : '')
				// setSubrole(dataSubRole ? dataSubRole : '')
			}
		}
	}, [isSuccessSubRole, dataSubRole])

	useEffect(() => {
		if (isMobile) {
			showMobileMenuEffect()
		}
	}, [location])

	useClickAway((event) => {
	
		console.log('333')
		setIsOpen(false)
	  }, ref);


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
				return 'Other'
		}
	}

	const onClose = () => {
		setOpenDrawer(false)
	}
	const items: MenuProps['items'] = [
		{
			label: <div className={`p-2 text-sm text-blue1f5 font-bold cursor-default`}>{user?.email}</div>,
			key: '0'
		},
		{
			type: 'divider'
		},
		{
			label: (
				<div
					onClick={() => {
						navigate('/infoUserUpdate')
					}}
					className={`${maiRole === 'OTHER' ? '' : 'hidden'} flex items-center gap-[15px] px-[4px] py-[5px]`}
				>
					<UserSwitchOutlined className="w-[22px] h-[22px] text-blue1f5 flex items-center justify-center" />
					Изменить роль
				</div>
			),
			key: '7'
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
		// ...(user?.roles && user?.roles.length > 1
		// 	? [
		// 			{
		// 				label: (
		// 					<div
		// 						className="flex items-center gap-[15px] px-[4px] py-[5px]"
		// 						onClick={() => {
		// 							showModal()
		// 						}}
		// 					>
		// 						<UserSwitchOutlined className="w-[22px] h-[22px] text-blue1f5 flex items-center justify-center" />
		// 						Сменить роль
		// 					</div>
		// 				),
		// 				key: '9'
		// 			}
		// 	  ]
		// 	: []),

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
	const handleVisibleInspired = () =>{
		// userhelperlibrary({ lang: 'ru'});
		setIsOpen(!isOpen)
		console.log('123123')
	}

	console.log('i18n.language,i18n.language', i18n.language)
	const showModal = () => {
		setIsModalOpen(true)
	}

	const handleOk = () => {
		setIsModalOpen(false)
	}

	const handleCancel = () => {
		setIsModalOpen(false)
	}
	const setCollapsed = () => {
		dispatch(setIsCollapsed())
	}

	return (
		<header
			className={clsx(
				' z-[1001] flex flex-wrap  h-[80px] fixed flex items-center justify-center w-full',
				type === 'main' ? 'bg-white' : `bg-blue65A`
			)}
		>
			<div className="w-screen flex h-full justify-between px-8 max-sm:px-5">
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
					<div className="flex items-center gap-5">
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
						{i18n.language === 'ru' ? <LogoIasSvg white={type === 'service'} /> : <LogoIasSvgEn white={type === 'service'} />}
						<Divider type="vertical" className="border-l-white h-10 m-0 hidden sm:block" />
						<div onClick={showMobileMenu} className="text-white text-base font-bold hidden sm:block">
							 {service}
						</div>
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
							<ArrowLeftBackInOldAccount white={type === 'service'} />
							<span
								className={clsx(`text-[14px] text-[#3073D7]`, type === 'service' ? 'text-white' : 'text-[#3073D7]')}
							>
								
								{t('OldLk')}
							</span>
						</a>

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
					<div className='cursor-pointer mx-3' onClick={(e)=>{
						e.stopPropagation();
						handleVisibleInspired()}}>
						<EyeSvg  white={type === 'service'}  />
						
					</div>
					<div  ><AccessibilityHelper ref={ref} isOpen={isOpen} lang={i18n.language}/></div>
					</div>
					<Select
						defaultValue={paramValue === 'eng' ? 'en' : i18n.language}
						style={{ width: 70 }}
						variant="borderless"
						className={clsx('max-sm:hidden ', type === 'service' && 'text-white')}
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
								<div className={clsx('h-full max-[455px]:hidden', type === 'service' && 'text-white')}>
									<div className="font-bold text-sm truncate max-w-[120px]">
										{`${user?.lastname} ${user?.firstname.charAt(0)}. ${
											user?.middlename === '' ? '' : user?.middlename.charAt(0) + '.'
										}`}
									</div>
									<div className="text-sm">
										{user?.roles && user?.roles?.length > 1
											? user?.roles
													.toSorted((a:any, b:any) => (a.type === mainRole ? -1 : b.type === mainRole ? 1 : 0))
													.map((item:any) => (
														<div className={`${item.type === mainRole ? '' : 'text-gray-300'}`}>
															{getRole(item.type)}
														</div>
													))
											: String(user?.roles?.map((item:any) => getRole(item.type)))}
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
						? user?.roles?.map((item:any) => (
								<Button
									onClick={async () => {
										if (mainRole === item.type) {
											return
										}
										setmainRole(item.type)
											
										// логика для обновления куков в случае смены роли
										const storedPassword = localStorage.getItem('password');
										const password = storedPassword ? JSON.parse(storedPassword) : '';
										login({
											username: item.login,
											password: password
										}).unwrap()
										.then((data)=>{
											document.cookie = `refresh=${
												data.refreshToken
											}; max-age=31536000; domain=${
												document.domain !== 'localhost' ? 'kpfu.ru' : 'localhost'
											}; path=/; samesite=strict`
											document.cookie = `s_id=${
												data.user.sessionId
											}; max-age=31536000; domain=${
												document.domain !== 'localhost' ? 'kpfu.ru' : 'localhost'
											}; path=/; samesite=strict`
											document.cookie = `h_id=${
												data.user.sessionHash
											}; max-age=31536000; domain=${
												document.domain !== 'localhost' ? 'kpfu.ru' : 'localhost'
											}; path=/; samesite=strict`
											document.cookie = `a_id=${
												data.user.allId
											}; max-age=31536000; domain=${
												document.domain !== 'localhost' ? 'kpfu.ru' : 'localhost'
											}; path=/; samesite=strict`
											console.log('меняю роль')
											window.location.replace('/user');
											

											// window.location.reload()
										})
										.catch((error)=>{
											console.log(error)
											window.location.replace('/user');
										})
										
									}}									className={`${item.type === mainRole ? 'font-extrabold' : ''} cursor-pointer`}
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