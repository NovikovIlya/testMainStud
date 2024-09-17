import { useLocation } from 'react-router-dom'

export const Stages = () => {
	const { pathname } = useLocation()

	console.log(pathname.substring(pathname.lastIndexOf('/') + 1))

	return (
		<>
			<div id="wrapper" className="px-[52px]">
				<div className="font-content-font font-normal text-[28px]/[28px] text-black mt-[120px]">
					Вакансия «Специалист отдела сотрудничества»
				</div>
			</div>
		</>
	)
}
