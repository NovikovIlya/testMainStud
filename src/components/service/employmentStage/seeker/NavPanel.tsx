import { useDispatch } from 'react-redux'

import { useAppSelector } from '../../../../store'
import { setStage } from '../../../../store/reducers/CurrentEmploymentStage'

export const NavPanel = () => {
	const stages: { id: number; text: string }[] = [
		{ id: 1, text: 'Направление на мед. осмотр' },
		{ id: 2, text: 'Прикрепление документов' },
		{ id: 3, text: 'Трудовые условия' },
		{ id: 4, text: 'Медицинский осмотр' },
		{ id: 5, text: 'Инструктаж' },
		{ id: 6, text: 'Реквизиты' },
		{ id: 7, text: 'Отправка' }
	]

	const dispatch = useDispatch()

	const { currentStage } = useAppSelector(state => state.currentEmploymentStage)

	return (
		<nav className="w-[80%] flex justify-between relative h-[68px] mt-[52px]">
			<div className="absolute bg-[#757778] opacity-[52%] h-[1px] left-[5%] right-[5%] z-[1] top-[20%]"></div>
			<div className="absolute bg-[#3073D7] h-[1px] left-[5%] right-[5%] z-[2] top-[20%]"></div>
			{stages.map(stage => (
				<div
					className="flex flex-col items-center gap-[12px] h-full z-[3] w-[10%] font-content-font font-bold text-[14px]/[14px]"
					onClick={() => {
						dispatch(setStage(stage.id))
					}}
				>
					<div className="shrink-0 h-[28px] w-[28px] rounded-[32px] border-solid border-2 text-[#3073D7] border-[#3073D7] flex justify-center items-center bg-[#F5F8FB]">
						{stage.id}
					</div>
					<div className="text-[#3073D7] text-center">{stage.text}</div>
				</div>
			))}
		</nav>
	)
}
