import { Radio } from 'antd'
import { useState } from 'react'

import { useGetVacancyRequestsQuery } from '../../../store/api/serviceApi'

import { VacancyRequestItem } from './VacancyRequestItem'

export const VacancyRequestsPage = () => {
	const [action, setAction] = useState<string>('все')

	const { data: requests = [] } = useGetVacancyRequestsQuery(action)

	return (
		<>
			<div
				id="wrapper"
				className="pl-[54px] pr-[54px] pt-[60px] w-full bg-content-gray"
			>
				<h1 className="font-content-font font-normal text-[28px]/[28px] text-black">
					Заявки от руководилей
				</h1>
				<Radio.Group
					className="mt-[80px] flex gap-[12px]"
					value={action}
					onChange={e => {
						setAction(e.target.value)
					}}
				>
					<label
						className={`rounded-[54.5px] py-[8px] px-[16px] font-content-font ${
							action === 'все'
								? 'text-white bg-dasha-blue'
								: 'text-black border-solid border-black border-[1px]'
						} font-normal text-[16px]/[16px]`}
					>
						<Radio value={'все'} className="hidden"></Radio>
						все
					</label>
					<label
						className={`rounded-[54.5px] py-[8px] px-[16px] font-content-font ${
							action === 'UPDATE'
								? 'text-white bg-dasha-blue'
								: 'text-black border-solid border-black border-[1px]'
						} font-normal text-[16px]/[16px]`}
					>
						<Radio value={'UPDATE'} className="hidden"></Radio>
						редактирование
					</label>
					<label
						className={`rounded-[54.5px] py-[8px] px-[16px] font-content-font ${
							action === 'CREATE'
								? 'text-white bg-dasha-blue'
								: 'text-black border-solid border-black border-[1px]'
						} font-normal text-[16px]/[16px]`}
					>
						<Radio value={'CREATE'} className="hidden"></Radio>
						создание
					</label>
					<label
						className={`rounded-[54.5px] py-[8px] px-[16px] font-content-font ${
							action === 'DELETE'
								? 'text-white bg-dasha-blue'
								: 'text-black border-solid border-black border-[1px]'
						} font-normal text-[16px]/[16px]`}
					>
						<Radio value={'DELETE'} className="hidden"></Radio>
						удаление
					</label>
				</Radio.Group>
				<div className="flex ml-[20px] mt-[60px] mb-[16px]">
					<h3 className="w-[388px] shrink-0 font-content-font font-normal text-[14px]/[14px] text-text-gray">
						Должность
					</h3>
					<h3 className="w-[388px] ml-[135px] shrink-0 font-content-font font-normal text-[14px]/[14px] text-text-gray">
						Заявка
					</h3>
				</div>
				{requests.map(req => (
					<VacancyRequestItem
						vacancyTitle={req.vacancy.post}
						action={req.action}
						vacancyId={req.vacancy.id}
						requestId={req.id}
					/>
				))}
			</div>
		</>
	)
}
