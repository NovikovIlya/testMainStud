import { Button } from 'antd';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd'
import clsx from 'clsx'
import { AiOutlineMenu } from 'react-icons/ai'
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
import PersonalizationSvg from '../../assets/svg/PersonalizationSvg'
import { useAppDispatch } from '../../store'
import { logout } from '../../store/creators/SomeCreators'

type TypeHeaderProps = {
	type?: 'service' | 'main'
}

const items: MenuProps['items'] = [
	{
		label: (
			<div className="p-2 text-sm text-[#1F5CB8] font-bold">
				User001@mail.com
			</div>
		),
		key: '0'
	},
	{
		type: 'divider'
	},
	{
		label: (
			<div className="flex items-center gap-3">
				<PersonCardSvg />
				Обо мне
			</div>
		),
		key: '1'
	},
	{
		label: (
			<div className="flex items-center gap-3">
				<SettingSvg />
				Настройки
			</div>
		),
		key: '3'
	},
	{
		label: (
			<div className="flex items-center gap-3">
				<PersonalizationSvg />
				Персонализация
			</div>
		),
		key: '4'
	},
	{
		label: (
			<div className="flex items-center gap-3">
				<LogoutSvg />
				Выйти
			</div>
		),
		key: '5'
	}
]

export const Header = ({ type = 'main' }: TypeHeaderProps) => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	return (
		<header
			className={clsx(
				' z-50  h-[80px] fixed flex items-center justify-center w-full',
				type === 'main' ? 'bg-white' : 'bg-[#65A1FA]'
			)}
		>
			<div className="w-screen max-w-[1600px] flex h-full justify-between px-8">
				<div className="flex gap-8 items-center">
					<Button
						className={clsx(
							'h-[40px] rounded-full font-semibold bg-transparent border-2 flex items-center justify-center w-[130px] ',
							type === 'main'
								? 'text-[#1F5CB8] border-[#1F5CB8]'
								: 'text-white border-white'
						)}
						icon={<MenuSvg white={type === 'service'} />}
					>
						Сервисы
					</Button>
					<LogoIasSvg white={type === 'service'} />
				</div>
				<div className="flex gap-20 items-center h-full">
					<div className="flex h-full items-center">
						<div className="h-full flex items-center px-3 cursor-pointer hover:bg-[#E3E8ED]">
							<MessageSvg white={type === 'service'} />
						</div>
						<div className="h-full flex items-center px-3 cursor-pointer hover:bg-[#E3E8ED]">
							<MapSvg white={type === 'service'} />
						</div>
						<div className="h-full flex items-center px-3 cursor-pointer hover:bg-[#E3E8ED]">
							<EyeSvg white={type === 'service'} />
						</div>
						<div className="h-full flex items-center px-3 cursor-pointer hover:bg-[#E3E8ED]">
							<SearchSvg white={type === 'service'} />
						</div>
					</div>
					<div className="h-full hover:bg-[#E3E8ED] w-[180px] flex items-center justify-center">
						<Dropdown
							menu={{ items }}
							placement="bottom"
							trigger={['click']}
							className="cursor-pointer h-full"
						>
							<Space>
								<PersonSvg white={type === 'service'} />
								<div
									className={clsx('h-full', type === 'service' && 'text-white')}
								>
									<div className="font-bold text-sm">User 001</div>
									<div className="text-sm">Guest</div>
								</div>
							</Space>
						</Dropdown>
					</div>
				</div>
			</div>
		</header>
	)
}