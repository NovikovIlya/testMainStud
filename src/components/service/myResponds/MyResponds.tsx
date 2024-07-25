import { Select } from 'antd'
import { useState } from 'react'

import { useGetSeekerRespondsQuery } from '../../../store/api/serviceApi'
import { respondStatus } from '../../../store/reducers/type'

import { RespondItem } from './RespondItem'

export const MyResponds = () => {
	const [status, setStatus] = useState('')
	const { data: responds = [], refetch } = useGetSeekerRespondsQuery(status)

	return (
		<>
			<h1 className="font-content-font font-normal text-black text-[28px]/[28px]">
				Мои отклики
			</h1>
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
			<div className="w-full flex mb-[16px] pl-[20px] pr-[55px]">
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
				<RespondItem key={respond.id} {...respond} refetch={refetch} />
			))}
		</>
	)
}
