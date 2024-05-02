import { ConfigProvider, Radio } from 'antd'
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
				<ConfigProvider
					theme={{ components: { Radio: { dotSize: 0, radioSize: 0 } } }}
				>
					<Radio.Group
						className="mt-[80px]"
						value={action}
						onChange={e => {
							setAction(e.target.value)
						}}
					>
						<Radio
							value={'все'}
							className="rounded-[54.5px] py-[8px] px-[16px] border-solid border-black border-[1px] border-opacity-20 font-content-font text-black font-normal text-[16px]/[16px] checked:border-blue-500"
						>
							все
						</Radio>
						<Radio
							value={'UPDATE'}
							className="rounded-[54.5px] py-[8px] px-[16px] border-solid border-black border-[1px] border-opacity-20 font-content-font text-black font-normal text-[16px]/[16px] checked:border-blue-500"
						>
							редактирование
						</Radio>
						<Radio
							value={'CREATE'}
							className="rounded-[54.5px] py-[8px] px-[16px] border-solid border-black border-[1px] border-opacity-20 font-content-font text-black font-normal text-[16px]/[16px] checked:border-blue-500"
						>
							создание
						</Radio>
						<Radio
							value={'DELETE'}
							className="rounded-[54.5px] py-[8px] px-[16px] border-solid border-black border-[1px] border-opacity-20 font-content-font text-black font-normal text-[16px]/[16px] checked:border-blue-500"
						>
							удаление
						</Radio>
					</Radio.Group>
				</ConfigProvider>
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
