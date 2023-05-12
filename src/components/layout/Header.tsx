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
		<div
			className={`bg-[#f0f0f0] h-[126px] backdrop-blur-sm fixed bg-opacity-50 pl-[200px]  z-10  gap-[2vh] w-full flex items-center px-[3vh] justify-between font-sans`}
		>
			<div className="flex wrapper items-center gap-[68px] ">
				<div>
					<LogoIasSvg />
				</div>
				<div className="search flex items-center max-md:hidden">
					<Input placeholder="Поиск" className="shadow" />
				</div>
			</div>
			<div className="flex gap-[1vh]">
				<PersonSvg />
				<div className="flex flex-col   justify-center">
					<div className="text-sm font-bold">Мистер Бин Бинович</div>
					<span className="text-sm">Гость</span>
				</div>
			</div>
			<div className="flex h-full ">
				<div className="hover:bg-[#E3E8ED] cursor-pointer flex items-center px-[14px] h-full">
					<SettingSvg />
				</div>
				<div className="hover:bg-[#E3E8ED] cursor-pointer flex items-center px-[14px] h-full">
					<MessageSvg />
				</div>
				<div className="hover:bg-[#E3E8ED] cursor-pointer flex items-center px-[14px] h-full">
					<NotificationSvg />
				</div>
				<div className="hover:bg-[#E3E8ED] cursor-pointer flex items-center px-[14px] h-full">
					<LogoutSvg />
				</div>
			</div>
		</div>
	)
}
