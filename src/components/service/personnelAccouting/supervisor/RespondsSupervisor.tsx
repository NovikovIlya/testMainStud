import { LoadingOutlined } from '@ant-design/icons'
import { Radio, Spin } from 'antd'
import { useState } from 'react'

import { useGetSupervisorRespondsQuery } from '../../../../store/api/serviceApi'
import { respondStatus } from '../../../../store/reducers/type'
import { VacancyRespondItem } from '../VacancyRespondItem'

export const RespondsSupervisor = () => {
	const [status, setStatus] = useState('все')
	const { data: responds = [], isLoading: loading } = useGetSupervisorRespondsQuery()

	if (loading) {
		return (
			<>
				<div className="w-full h-full flex items-center">
					<div className="text-center ml-auto mr-auto">
						<Spin indicator={<LoadingOutlined style={{ fontSize: 36 }} spin />}></Spin>
						<p className="font-content-font font-normal text-black text-[18px]/[18px]">Идёт загрузка...</p>
					</div>
				</div>
			</>
		)
	}

	return (
		<>
			<div className="pl-[54px] pr-[54px] pt-[120px] w-full bg-content-gray">
				<h1 className="font-content-font font-normal text-[28px]/[28px] text-black">Отклики</h1>
				<div className="mt-[52px] mb-[60px] flex items-center gap-[16px]">
					<Radio.Group
						className="flex flex-wrap gap-[12px]"
						value={status}
						onChange={e => {
							setStatus(e.target.value)
							console.log(status)
						}}
					>
						<label
							className={`rounded-[54.5px] py-[8px] px-[16px] font-content-font ${
								status === 'все' ? 'text-white bg-dasha-blue' : 'text-black border-solid border-black border-[1px]'
							} font-normal text-[16px]/[16px]`}
						>
							<Radio value={'все'} className="hidden"></Radio>
							все
						</label>
						<label
							className={`rounded-[54.5px] py-[8px] px-[16px] font-content-font ${
								status === respondStatus[respondStatus.IN_PERSONNEL_DEPT_REVIEW]
									? 'text-white bg-dasha-blue'
									: 'text-black border-solid border-black border-[1px]'
							} font-normal text-[16px]/[16px]`}
						>
							<Radio value={respondStatus[respondStatus.IN_PERSONNEL_DEPT_REVIEW]} className="hidden"></Radio>
							на рассмотрении
						</label>
						<label
							className={`rounded-[54.5px] py-[8px] px-[16px] font-content-font ${
								status === respondStatus[respondStatus.INVITATION]
									? 'text-white bg-dasha-blue'
									: 'text-black border-solid border-black border-[1px]'
							} font-normal text-[16px]/[16px]`}
						>
							<Radio value={respondStatus[respondStatus.INVITATION]} className="hidden"></Radio>
							приглашение на собеседование
						</label>
						<label
							className={`rounded-[54.5px] py-[8px] px-[16px] font-content-font ${
								status === respondStatus[respondStatus.EMPLOYMENT_REQUEST]
									? 'text-white bg-dasha-blue'
									: 'text-black border-solid border-black border-[1px]'
							} font-normal text-[16px]/[16px]`}
						>
							<Radio value={respondStatus[respondStatus.EMPLOYMENT_REQUEST]} className="hidden"></Radio>
							этап трудоустройства
						</label>
						<label
							className={`rounded-[54.5px] py-[8px] px-[16px] font-content-font ${
								status ===
								`statuses=${respondStatus[respondStatus.IN_RESERVE]}&statuses=${respondStatus[respondStatus.ARCHIVE]}`
									? 'text-white bg-dasha-blue'
									: 'text-black border-solid border-black border-[1px]'
							} font-normal text-[16px]/[16px]`}
						>
							<Radio
								value={`statuses=${respondStatus[respondStatus.IN_RESERVE]}&statuses=${
									respondStatus[respondStatus.ARCHIVE]
								}`}
								className="hidden"
							></Radio>
							отказано
						</label>
					</Radio.Group>
				</div>
				<div className="flex mt-[60px] mb-[16px] pl-[20px] pr-[55px]">
					<h3 className="w-[25%] font-content-font text-black font-normal text-[14px]/[14px] opacity-[60%]">
						Соискатель
					</h3>
					<h3 className="ml-[1%] w-[15%] font-content-font text-black font-normal text-[14px]/[14px] opacity-[60%]">
						Вакансия
					</h3>
					<h3 className="ml-[10%] w-[8%] font-content-font text-black font-normal text-[14px]/[14px] opacity-[60%]">
						Дата отклика
					</h3>
					<h3 className="ml-[5%] w-[15%] font-content-font text-black font-normal text-[14px]/[14px] opacity-[60%]">
						Статус
					</h3>
				</div>
				{responds.map(resp => (
					<VacancyRespondItem {...resp} itemType="SUPERVISOR" />
				))}
			</div>
		</>
	)
}
