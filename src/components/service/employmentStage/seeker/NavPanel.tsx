import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { useAppSelector } from '../../../../store'
import { useLazyCheckIfTestIsPassedQuery } from '../../../../store/api/serviceApi'
import { setStageProgressAsReady } from '../../../../store/reducers/EmploymentProgressSlice'

import { NavPanelElement } from './NavPanelElement'

export const NavPanel = (props: { type: 'SEEKER' | 'SUPERVISOR' }) => {
	const stages: { id: number; text: string }[] = [
		{ id: 1, text: 'Направление на мед. осмотр' },
		{ id: 2, text: 'Прикрепление документов' },
		// { id: 3, text: 'Трудовые условия' },
		{ id: 3, text: 'Медицинский осмотр' },
		{ id: 4, text: 'Инструктаж' },
		{ id: 5, text: 'Реквизиты' },
		{ id: 6, text: 'Отправка' }
	]

	const { empData } = useAppSelector(state => state.employmentData)
	const foundStage = empData.stages.find(stage => stage.testLink)
	const dispatch = useDispatch()

	const [check] = useLazyCheckIfTestIsPassedQuery()

	useEffect(() => {
		console.log('reeffect in navpanel')
		let interval = setInterval(() => {
			foundStage?.id &&
				check({ testStageId: foundStage.id })
					.unwrap()
					.then(res => {
						res.testPassed === true && dispatch(setStageProgressAsReady(foundStage?.id!))
					})
		}, 5000)
		return () => {
			clearInterval(interval)
		}
	}, [foundStage])

	return (
		<nav
			className={`${
				props.type === 'SEEKER' ? 'w-[80%]' : 'w-full pointer-events-none'
			} flex justify-between relative h-[68px] mt-[52px]`}
		>
			<div className="absolute bg-[#757778] opacity-[52%] h-[1px] left-[5%] right-[5%] z-[1] top-[20%]"></div>
			<div className="absolute bg-[#3073D7] h-[1px] left-[5%] right-[5%] z-[2] top-[20%]"></div>
			{stages.map(stage => (
				<NavPanelElement {...stage} />
			))}
		</nav>
	)
}
