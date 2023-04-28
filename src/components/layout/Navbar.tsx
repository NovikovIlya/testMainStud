import {
	DocumentSvg,
	EyeSvg,
	LangSvg,
	MapSvg,
	MenuSvg,
	PersonCardSvg,
	PersonalizeSvg,
	QuestionFillSvg
} from '../../assets/svg'

import './Header.scss'

export const Navbar = () => {
	return (
		<aside className="px-[2vh]  min-h-screen bg-white shadow-md gap-[5vh] flex flex-col items-center rounded-r-[1vh]">
			<div className=" mt-[2vh]">
				<MenuSvg />
			</div>
			<div className="flex flex-col gap-[1.5vh] items-center">
				<PersonCardSvg />
				<MapSvg />
				<PersonalizeSvg />
				<DocumentSvg />
			</div>
			<div className="flex flex-col gap-[1.5vh] items-center">
				<EyeSvg />
				<LangSvg />
			</div>
			<div>
				<QuestionFillSvg />
			</div>
		</aside>
	)
}
