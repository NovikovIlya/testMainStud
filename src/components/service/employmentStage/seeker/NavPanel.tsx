import { useDispatch } from 'react-redux'

import { useAppSelector } from '../../../../store'
import { setStage } from '../../../../store/reducers/CurrentEmploymentStage'

import { NavPanelElement } from './NavPanelElement'

export const NavPanel = () => {
	const stages: { id: number; text: string }[] = [
		{ id: 1, text: 'Направление на мед. осмотр' },
		{ id: 2, text: 'Прикрепление документов' },
		// { id: 3, text: 'Трудовые условия' },
		{ id: 3, text: 'Медицинский осмотр' },
		{ id: 4, text: 'Инструктаж' },
		{ id: 5, text: 'Реквизиты' },
		{ id: 6, text: 'Отправка' }
	]

	const dispatch = useDispatch()

	const { currentStage } = useAppSelector(state => state.currentEmploymentStage)

	return (
		<nav className="w-[80%] flex justify-between relative h-[68px] mt-[52px]">
			<div className="absolute bg-[#757778] opacity-[52%] h-[1px] left-[5%] right-[5%] z-[1] top-[20%]"></div>
			<div className="absolute bg-[#3073D7] h-[1px] left-[5%] right-[5%] z-[2] top-[20%]"></div>
			{stages.map(stage => (
				<NavPanelElement {...stage} />
			))}
		</nav>
	)
}
