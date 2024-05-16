import { useEffect, useState } from 'react'

import {
	useLazyGetResponcesByVacancyQuery,
	useLazyGetVacancyGroupedResponcesQuery
} from '../../../../store/api/serviceApi'
import { VacancyRespondItemType } from '../../../../store/type'
import { VacancyRespondItem } from '../VacancyRespondItem'

export const RespondsSupervisor = () => {
	const [responds, setResponds] = useState<VacancyRespondItemType[]>([])
	const [getGroupedResponds] = useLazyGetVacancyGroupedResponcesQuery()
	const [getResponds] = useLazyGetResponcesByVacancyQuery()

	useEffect(() => {
		getGroupedResponds({ category: 'АУП', role: 'SUPERVISOR' })
			.unwrap()
			.then(grData => {
				grData.map(vacResp => {
					getResponds({ id: vacResp.vacancyId, status: '', role: 'SUPERVISOR' })
						.unwrap()
						.then(data => setResponds(prev => [...prev, ...data]))
				})
			})
	}, [])

	return (
		<>
			<div className="pl-[54px] pr-[54px] pt-[60px] w-full bg-content-gray">
				<h1 className="font-content-font font-normal text-[28px]/[28px] text-black">
					Отклики
				</h1>
				<div className="flex mt-[60px] mb-[16px] pl-[20px]">
					<h3 className="w-[388px] font-content-font text-black font-normal text-[14px]/[14px] opacity-[60%]">
						Соискатель
					</h3>
					<h3 className="ml-[53px] font-content-font text-black font-normal text-[14px]/[14px] opacity-[60%]">
						Вакансия
					</h3>
					<h3 className="ml-[228px] font-content-font text-black font-normal text-[14px]/[14px] opacity-[60%]">
						Дата отклика
					</h3>
				</div>
				{responds.map(resp => (
					<VacancyRespondItem {...resp} itemType="SUPERVISOR" />
				))}
			</div>
		</>
	)
}
