import { Input } from 'antd'
import { AiTwotoneSetting } from 'react-icons/ai'
import { FaBell } from 'react-icons/fa'
import { RiMessage3Fill } from 'react-icons/ri'

import { LogoIasSvg } from '../../assets/svg/LogoIasSvg'
import { PersonSvg } from '../../assets/svg/PersonSvg'

import './Header.scss'

export const Header = () => {
	return (
		<div className="h-[8vw] w-full flex items-center px-[2vw] text-[2vw] justify-between font-sans">
			<div>
				<LogoIasSvg />
			</div>
			<div className="text-[1vw]">
				<Input
					placeholder="Поиск"
					className="w-[30vw] h-auto shadow-md rounded-md"
				/>
			</div>
			<div>
				<div className="flex gap-[0.5vw] items-center">
					<PersonSvg />
					<div className="flex flex-col items-start justify-center ">
						<span className="text-[1.3vw] font-semibold">
							Мистер Бин Бинович
						</span>
						<span className="text-[1vw]">Пользователь</span>
					</div>
					<div className="flex gap-[1vw] ml-[1.5vw]">
						<AiTwotoneSetting />
						<RiMessage3Fill />
						<FaBell />
					</div>
				</div>
			</div>
		</div>
	)
}
