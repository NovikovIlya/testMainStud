import { Button, Divider } from 'antd'
import type { MenuProps } from 'antd'
import { Dropdown, Space } from 'antd'
import clsx from 'clsx'
import { useNavigate } from 'react-router-dom'

import {
	EyeSvg,
	LogoIasSvg,
	LogoutSvg,
	MapSvg,
	MenuSvg,
	MessageSvg,
	PersonCardSvg,
	PersonSvg,
	SearchSvg,
	SettingSvg
} from '../../assets/svg'
import { DocumentSvg } from '../../assets/svg/DocumentSvg'
import PersonalizationSvg from '../../assets/svg/PersonalizationSvg'
import { useAppDispatch, useAppSelector } from '../../store'
import { logout } from '../../store/creators/SomeCreators'

type TypeHeaderProps = {
	type?: 'service' | 'main'
	service?: string
}

export const Header = ({ type = 'main', service }: TypeHeaderProps) => {
	const dispatch = useAppDispatch()
	const user = useAppSelector(state => state.Profile.profileData.CurrentData)

	const items: MenuProps['items'] = [
		{
			label: (
				<div className="p-2 text-sm text-[#1F5CB8] font-bold cursor-default">
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
				<div className="flex items-center gap-[15px] px-[4px] py-[5px]">
					<PersonCardSvg />
					Обо мне
				</div>
			),
			key: '1'
		},
		{
			label: (
				<div className="flex items-center gap-[15px] px-[4px] py-[5px]">
					<SettingSvg />
					Настройки
				</div>
			),
			key: '3'
		},
		{
			label: (
				<div className="flex items-center gap-[15px] px-[4px] py-[5px]">
					<PersonalizationSvg />
					Персонализация
				</div>
			),
			key: '4'
		},
		{
			label: (
				<div
					className="flex items-center gap-[15px] px-[4px] py-[5px]"
					onClick={() => {
						dispatch(logout)
					}}
				>
					<LogoutSvg />
					Выйти
				</div>
			),
			key: '5'
		},
		{
			label: <div className="cursor-default" />,
			key: '6'
		}
	]
	const navigate = useNavigate()
	return (
		<header
			className={clsx(
				' z-50  h-[80px] fixed flex items-center justify-center w-full',
				type === 'main' ? 'bg-white' : 'bg-[#65A1FA]'
			)}
		>
			<div className="w-screen flex h-full justify-between px-8">
				<div className="flex gap-8 items-center">
					<Button
						onClick={() => navigate('/services/schedule')}
						className={clsx(
							'h-[40px] rounded-full  font-semibold bg-transparent border-2 flex items-center justify-center w-[130px] ',
							type === 'main'
								? 'text-[#1F5CB8] border-[#1F5CB8] '
								: 'text-white border-white hover:!border-white hover:!text-white'
						)}
						type="default"
						icon={<MenuSvg white={type === 'service'} />}
					>
						<span className="pl-2">Сервисы</span>
					</Button>
					<div className="flex items-center gap-5">
						<LogoIasSvg white={type === 'service'} />
						<Divider type="vertical" className="border-l-white h-10 m-0" />
						<div className="text-white text-base font-bold">{service}</div>
					</div>
				</div>
				<div className="flex gap-20 items-center h-full">
					<div className="flex h-full items-center">
						<div
							className={clsx(
								'h-full flex items-center px-3 cursor-pointer ',
								type === 'main' ? 'hover:bg-[#E3E8ED]' : 'hover:bg-[#3073D7]'
							)}
						>
							<SearchSvg white={type === 'service'} />
						</div>
						<div
							className={clsx(
								'h-full flex items-center px-3 cursor-pointer ',
								type === 'main' ? 'hover:bg-[#E3E8ED]' : 'hover:bg-[#3073D7]'
							)}
						>
							<MessageSvg white={type === 'service'} />
						</div>
						<div
							className={clsx(
								'h-full flex items-center px-3 cursor-pointer ',
								type === 'main' ? 'hover:bg-[#E3E8ED]' : 'hover:bg-[#3073D7]'
							)}
						>
							<MapSvg white={type === 'service'} />
						</div>
						<div
							className={clsx(
								'h-full flex items-center px-3 cursor-pointer ',
								type === 'main' ? 'hover:bg-[#E3E8ED]' : 'hover:bg-[#3073D7]'
							)}
						>
							<DocumentSvg white={type === 'service'} />
						</div>
						<div
							className={clsx(
								'h-full flex items-center px-3 cursor-pointer ',
								type === 'main' ? 'hover:bg-[#E3E8ED]' : 'hover:bg-[#3073D7]'
							)}
						>
							<EyeSvg white={type === 'service'} />
						</div>
					</div>
					<div
						className={clsx(
							'h-full flex items-center cursor-pointer bg-transparent',
							type === 'main'
								? 'hover:bg-[#E3E8ED]'
								: 'target:bg-[#3073D7] active:bg-[#3073D7] visited:bg-[#3073D7] focus-visible:bg-[#3073D7] focus-within:bg-[#3073D7] focus:bg-[#3073D7] hover:bg-[#3073D7]'
						)}
					>
						<Dropdown
							menu={{ items }}
							placement="bottom"
							trigger={['click']}
							className="cursor-pointer h-full  box-border"
						>
							<Space className="px-10">
								<PersonSvg white={type === 'service'} />
								<div
									className={clsx('h-full', type === 'service' && 'text-white')}
								>
									<div className="font-bold text-sm truncate max-w-[120px]">
										{user?.lastname}
									</div>
									<div className="text-sm">{user?.roles[0].type}</div>
								</div>
							</Space>
						</Dropdown>
					</div>
				</div>
			</div>
		</header>
	)
}
