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
		<aside className="px-[1vw]  min-h-screen bg-white shadow-md gap-[4vw] flex flex-col items-center rounded-r-[1vw]">
			<div className=" mt-[2vw]">
				<MenuSvg />
			</div>
			<div className="flex flex-col gap-[1.2vw] items-center">
				<PersonCardSvg />
				<MapSvg />
				<PersonalizeSvg />
				<DocumentSvg />
			</div>
			<div className="flex flex-col gap-[1vw] items-center">
				<EyeSvg />
				<LangSvg />
			</div>
			<div>
				<QuestionFillSvg />
			</div>
		</aside>
	)
}
