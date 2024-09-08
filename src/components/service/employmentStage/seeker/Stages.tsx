import { useLocation } from 'react-router-dom'

import { NavPanel } from './NavPanel'

export const Stages = () => {
	const { pathname } = useLocation()

	console.log(pathname.substring(pathname.lastIndexOf('/') + 1))

	return (
		<>
			<div id="wrapper" className="px-[52px] w-full">
				<div className="font-content-font font-normal text-[28px]/[28px] text-black mt-[120px]">
					Вакансия «Специалист отдела сотрудничества»
				</div>
				<NavPanel />
			</div>
		</>
	)
}
