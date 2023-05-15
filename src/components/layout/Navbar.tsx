import {
	DocumentSvg,
	EyeSvg,
	MapSvg,
	MenuSvg,
	PersonCardSvg,
	PersonalizeSvg
} from '../../assets/svg'

import './Header.scss'

export const Navbar = () => {
	return (
		<aside className="fixed w-[120px] rounded-tr-[20px] z-20 min-h-screen bg-white shadow-lg flex flex-col items-center">
			<div className="hover:bg-[#E3E8ED] mb-[10px] cursor-pointer w-full text-center rounded-tr-[20px]">
				<div className=" pt-[45px] pb-[55px]">
					<MenuSvg />
				</div>
			</div>
			<div className="flex flex-col w-full">
				<div className="hover:bg-[#E3E8ED] cursor-pointer w-full px-[38px] py-[20px]">
					<PersonCardSvg />
				</div>
				<div className="hover:bg-[#E3E8ED] w-full px-[38px] cursor-pointer py-[20px]">
					<MapSvg />
				</div>
				<div className="hover:bg-[#E3E8ED] w-full px-[38px] py-[20px] cursor-pointer">
					<PersonalizeSvg />
				</div>
				<div className="hover:bg-[#E3E8ED] w-full px-[38px] py-[20px] cursor-pointer">
					<DocumentSvg />
				</div>
			</div>
			<div className="hover:bg-[#E3E8ED] w-full px-[38px] mt-[42px] py-[20px] cursor-pointer">
				<EyeSvg />
			</div>
			<div className="hover:bg-[#E3E8ED] w-full px-[38px]  py-[20px] cursor-pointer">
				<div className="text-[#1F5CB8] text-2xl font-bold text-center ">En</div>
			</div>
		</aside>
	)
}
