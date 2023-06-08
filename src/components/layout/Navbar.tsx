import { DocumentSvg, EyeSvg, MapSvg, PersonCardSvg } from '../../assets/svg'

export const Navbar = () => {
	return (
		<aside className="fixed rounded-tr-[20px] z-20 min-h-screen max-sm:hidden bg-white shadow-lg flex flex-col items-center">
			<div className="flex flex-col mt-[100px] w-full">
				<div className="hover:bg-[#E3E8ED] cursor-pointer  px-[20px] py-[20px]">
					<PersonCardSvg />
				</div>
				<div className="hover:bg-[#E3E8ED]  px-[20px] cursor-pointer py-[20px]">
					<MapSvg />
				</div>
				<div className="hover:bg-[#E3E8ED]  px-[20px] py-[20px] cursor-pointer">
					<DocumentSvg />
				</div>
			</div>
			<div className="hover:bg-[#E3E8ED]  px-[20px] mt-[42px] py-[20px] cursor-pointer">
				<EyeSvg />
			</div>
			<div className="hover:bg-[#E3E8ED]  px-[20px] w-full py-[20px] cursor-pointer">
				<div className="text-[#1F5CB8] text-2xl font-bold text-center ">En</div>
			</div>
		</aside>
	)
}
