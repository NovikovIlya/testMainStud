import { LoadingOutlined } from '@ant-design/icons'
import { Spin } from 'antd'
import { useEffect, useState } from 'react'

import {
	useGetSupervisorRespondsQuery,
	useLazyGetResponcesByVacancyQuery,
	useLazyGetVacancyGroupedResponcesQuery
} from '../../../../store/api/serviceApi'
import { VacancyRespondItemType } from '../../../../store/reducers/type'
import { VacancyRespondItem } from '../VacancyRespondItem'

export const RespondsSupervisor = () => {
	//const [responds, setResponds] = useState<VacancyRespondItemType[]>([])
	// const [getGroupedResponds] = useLazyGetVacancyGroupedResponcesQuery()
	// const [getResponds] = useLazyGetResponcesByVacancyQuery()

	const { data: responds = [], isLoading: loading } =
		useGetSupervisorRespondsQuery()

	// useEffect(() => {
	// 	getGroupedResponds({ category: 'АУП', role: 'SUPERVISOR' })
	// 		.unwrap()
	// 		.then(grData => {
	// 			grData.map(vacResp => {
	// 				getResponds({ id: vacResp.vacancyId, status: '', role: 'SUPERVISOR' })
	// 					.unwrap()
	// 					.then(data => setResponds(prev => [...prev, ...data]))
	// 			})
	// 		})
	// }, [])

	if (loading) {
		return (
			<>
				<div className="w-full h-full flex items-center">
					<div className="text-center ml-auto mr-auto">
						<Spin
							indicator={<LoadingOutlined style={{ fontSize: 36 }} spin />}
						></Spin>
						<p className="font-content-font font-normal text-black text-[18px]/[18px]">
							Идёт загрузка...
						</p>
					</div>
				</div>
			</>
		)
	}

	return (
		<>
			<div className="pl-[54px] pr-[54px] pt-[120px] w-full bg-content-gray">
				<h1 className="font-content-font font-normal text-[28px]/[28px] text-black">
					Отклики
				</h1>
				<div className="flex mt-[60px] mb-[16px] pl-[20px] pr-[55px]">
					<h3 className="w-[25%] font-content-font text-black font-normal text-[14px]/[14px] opacity-[60%]">
						Соискатель
					</h3>
					<h3 className="ml-[5%] w-[25%] font-content-font text-black font-normal text-[14px]/[14px] opacity-[60%]">
						Вакансия
					</h3>
					<h3 className="ml-[5%] w-[8%] font-content-font text-black font-normal text-[14px]/[14px] opacity-[60%]">
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
