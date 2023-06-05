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
		<div className="bg-[#F5F8FB] h-[100px] backdrop-blur-sm fixed pl-[180px] pr-[80px] z-10 gap-[2vh] w-full flex items-center justify-between">
			<div className="flex wrapper items-center gap-[24px] ">
				<div>
					<LogoIasSvg />
				</div>
				<Button
					className="h-[40px] flex items-center justify-center gap-2 w-[130px]"
					type="primary"
					icon={<AiOutlineMenu />}
				>
					Меню
				</Button>
				<div className="search flex items-center max-md:hidden">
					<Input placeholder="Поиск" className="shadow w-[488px] h-[40px]" />
				</div>
			</div>
			<div className="flex h-full gap-[40px]">
				<div className="flex gap-[1vh] w-full items-center">
					<PersonSvg />
					<div className="flex flex-col justify-center">
						<div className="text-xs font-bold">Мистер Бин Бинович</div>
						<span className="text-xs">Гость</span>
					</div>
				</div>
				<div className="flex h-full w-full">
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
		</div>
	)
}
