import { Select } from 'antd'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { useAppSelector } from '../../../store'
import { useGetResponcesByVacancyQuery } from '../../../store/api/serviceApi'
import { respondStatus } from '../../../store/reducers/type'
import ArrowIcon from '../jobSeeker/ArrowIcon'

import { VacancyRespondItem } from './VacancyRespondItem'

export const VacancyResponces = () => {
	const { pathname } = useLocation()
	const navigate = useNavigate()
	const currentVacancyTitle = useAppSelector(state => state.currentVacancyName)

	const pathVacancyId = pathname.split('/').pop() as string

	const vacancyId = parseInt(pathVacancyId)

	const [status, setStatus] = useState('')
	const { data: responds = [] } = useGetResponcesByVacancyQuery({
		id: vacancyId,
		status: status,
		role: 'PERSONNEL_DEPARTMENT'
	})

	return (
		<>
			<div className="w-full pl-[52px] pr-[52px] pt-[60px]">
				<div className="flex">
					<button
						onClick={() => {
							navigate('/services/personnelaccounting/responds')
						}}
						className="bg-white h-[38px] w-[46px] pt-[12px] pb-[12px] pr-[16px] pl-[16px] rounded-[50px] border border-black cursor-pointer"
					>
						<ArrowIcon />
					</button>
					<p className="ml-[40px] font-content-font font-normal text-black text-[28px]/[33.6px]">
						Отклики на вакансию «{currentVacancyTitle.vacancyTitle}»
					</p>
				</div>
				<div className="mt-[52px] mb-[60px] flex items-center gap-[16px]">
					<p className="font-content-font font-normal text-black text-[16px]/[16px]">
						Статус
					</p>
					<Select
						className="w-[301px]"
						options={[
							{ value: 'all', label: 'все' },
							{
								value: respondStatus.IN_PERSONNEL_DEPT_REVIEW,
								label: 'на рассмотрении у отдела кадров'
							},
							{
								value: respondStatus.IN_SUPERVISOR_REVIEW,
								label: 'на рассмотрении у руководителя'
							},
							{ value: respondStatus.INVITATION, label: 'приглашение' },
							{ value: respondStatus.REJECTED, label: 'отклонено' }
						]}
						onChange={(value: respondStatus) => {
							setStatus(respondStatus[value])
						}}
					/>
				</div>
				<div className="flex mb-[16px] pl-[20px] pr-[55px]">
					<h3 className="w-[25%] font-content-font text-black font-normal text-[14px]/[14px] opacity-[60%]">
						Вакансия
					</h3>

					<h3 className="ml-[5%] w-[8%] font-content-font text-black font-normal text-[14px]/[14px] opacity-[60%]">
						Дата отклика
					</h3>
					<h3 className="ml-[5%] w-[25%] font-content-font text-black font-normal text-[14px]/[14px] opacity-[60%]">
						Статус
					</h3>
				</div>
				{responds.map(respond => (
					<VacancyRespondItem {...respond} itemType="PERSONNEL_DEPARTMENT" />
				))}
			</div>
		</>
	)
}
