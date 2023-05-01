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
		<aside className="px-[2vh] z-20 min-h-screen bg-white shadow-md gap-[7vh] flex flex-col items-center">
			<div className=" mt-[2vh]">
				<MenuSvg />
			</div>
			<div className="flex flex-col gap-[3vh] items-center">
				<PersonCardSvg />
				<MapSvg />
				<PersonalizeSvg />
				<DocumentSvg />
			</div>
			<div className="flex flex-col gap-[2vh] items-center">
				<EyeSvg />
				<LangSvg />
			</div>
			<div>
				<QuestionFillSvg />
			</div>
		</aside>
	)
}
