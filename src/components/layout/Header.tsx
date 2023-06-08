import { Button, Input } from 'antd'
import { AiOutlineMenu } from 'react-icons/ai'

import {
	EditSvg,
	LogoIasSvg,
	LogoutSvg,
	MessageSvg,
	PersonSvg,
	SettingSvg
} from '../../assets/svg'

export const Header = () => {
	return (
		<header className="bg-[#F5F8FB] max-xl:pr-3 max-xl:pl-[100px] max-sm:px-3 h-[100px] backdrop-blur-sm fixed pl-[180px] max-lg:pl-[100px] max-md:pl-[80px] pr-[80px] z-10 gap-[2vh] w-full flex items-center justify-between">
			<div className="flex wrapper  gap-[24px] max-md:justify-around max-md:gap-0 max-md:w-full">
				<div>
					<LogoIasSvg />
				</div>
				<Button
					className="h-[40px] flex items-center justify-center w-[130px]"
					type="primary"
					icon={<AiOutlineMenu />}
				>
					Сервисы
				</Button>
				<div className="search flex items-center max-xl:hidden w-[20vw]">
					<Input placeholder="Поиск" className="shadow  w-full h-[40px]" />
				</div>
			</div>
			<div className="flex h-full gap-[40px] max-sm:hidden">
				<div className="flex gap-[1vh] w-full items-center">
					<PersonSvg />
					<div className="flex flex-col justify-center max-lg:hidden">
						<div className="text-xs font-bold">Мистер Бин Бинович</div>
						<span className="text-xs">Гость</span>
					</div>
				</div>
				<div className="flex h-full w-full max-md:hidden">
					<div className="hover:bg-[#E3E8ED] cursor-pointer flex items-center px-[14px] h-full">
						<SettingSvg />
					</div>
					<div className="hover:bg-[#E3E8ED] cursor-pointer flex items-center px-[14px] h-full">
						<MessageSvg />
					</div>
					<div className="hover:bg-[#E3E8ED] cursor-pointer flex items-center px-[14px] h-full">
						<EditSvg />
					</div>
					<div className="hover:bg-[#E3E8ED] cursor-pointer flex items-center px-[14px] h-full">
						<LogoutSvg />
					</div>
				</div>
			</div>
		</header>
	)
}
