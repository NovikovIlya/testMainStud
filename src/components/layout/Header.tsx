import { Input } from 'antd'

import {
	LogoutSvg,
	MessageSvg,
	NotificationSvg,
	SettingSvg
} from '../../assets/svg'
import { LogoIasSvg } from '../../assets/svg/LogoIasSvg'
import { PersonSvg } from '../../assets/svg/PersonSvg'

import './Header.scss'

export const Header = () => {
	return (
		<div className="h-[7vw] w-full flex items-center px-[2vw] justify-between font-sans">
			<div className="flex wrapper items-center gap-[3vw] ">
				<div className="w-fit">
					<LogoIasSvg />
				</div>
				<div className="search flex items-center">
					<Input placeholder="Поиск" className="shadow" />
				</div>
			</div>
			<div>
				<div className="flex gap-[0.5vw] items-center">
					<PersonSvg />
					<div className="flex flex-col h-full justify-between">
						<div className="text-[1vw] font-bold">Мистер Бин Бинович</div>
						<span className="text-[0.8vw]">Пользователь</span>
					</div>
					<div className="flex gap-[1vw] ml-[5vw]">
						<SettingSvg />
						<MessageSvg />
						<NotificationSvg />
						<LogoutSvg />
					</div>
				</div>
			</div>
		</div>
	)
}
