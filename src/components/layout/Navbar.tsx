import { AiFillEdit, AiFillEye } from 'react-icons/ai'
import { BsFillPersonVcardFill, BsFillQuestionCircleFill } from 'react-icons/bs'
import { FaMapMarkerAlt } from 'react-icons/fa'
import { GiHamburgerMenu } from 'react-icons/gi'
import { IoDocument } from 'react-icons/io5'

export const Navbar = () => {
	return (
		<aside className="w-[4vw] text-[2vw] min-h-screen bg-white shadow-md gap-[5vh] flex flex-col items-center">
			<div className=" mt-[2vw]">
				<GiHamburgerMenu />
			</div>
			<div className="flex flex-col gap-[1.5vh]">
				<BsFillPersonVcardFill />
				<FaMapMarkerAlt />
				<AiFillEdit />
				<IoDocument />
			</div>
			<div className="flex flex-col gap-[1vh] items-center">
				<AiFillEye />
				<span className="font-semibold text-[1.5vw] font-sans">En</span>
			</div>
			<div>
				<BsFillQuestionCircleFill />
			</div>
		</aside>
	)
}
