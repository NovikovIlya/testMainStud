import { Input } from 'antd'
import { useEffect, useState } from 'react'

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
			className={`bg-[#f0f0f0] bg-opacity-50 fixed pl-[13vh] max-sm:pl-[8vh] z-10 py-[2vh] gap-[2vh] w-full flex items-center px-[3vh] justify-between font-sans `}
		>
			<div className="flex wrapper items-center gap-[8vh] max-lg:gap-[4vh]">
				<div>
					<LogoIasSvg />
				</div>
				<div className="search flex items-center max-md:hidden">
					<Input placeholder="Поиск" className="shadow" />
				</div>
			</div>
			<div>
				<div className="flex gap-[15vh] max-xl:gap-[5vh] max-lg:gap-[2vh] items-center">
					<div className="flex gap-[1vh]">
						<PersonSvg />
						<div className="flex flex-col  max-sm:hidden justify-center">
							<div className="text-[0.85vh] font-bold">Мистер Бин Бинович</div>
							<span className="text-[0.85vh]">Гость</span>
						</div>
					</div>
					<div className="flex gap-[3vh] max-sm:ml-[1vh] max-[426px]:hidden">
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
