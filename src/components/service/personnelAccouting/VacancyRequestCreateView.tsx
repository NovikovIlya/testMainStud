import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'

import { useAppSelector } from '../../../store'
import {
	useAcceptVacancyRequestMutation,
	useDenyVacancyRequestMutation,
	useGetVacancyRequestViewQuery
} from '../../../store/api/serviceApi'
import ArrowIcon from '../jobSeeker/ArrowIcon'

export const VacancyRequestCreateView = () => {
	const { requestId } = useAppSelector(state => state.currentRequest)
	const { data: requestView } = useGetVacancyRequestViewQuery(requestId)
	const navigate = useNavigate()
	const [acceptRequest] = useAcceptVacancyRequestMutation()
	const [denyRequest] = useDenyVacancyRequestMutation()

	return (
		<>
			<div id="wrapper" className="pl-[54px] pr-[54px] pt-[60px] w-full">
				<div className="flex">
					<button
						onClick={() => {
							navigate('/services/personnelaccounting/vacancyrequests')
						}}
						className="bg-inherit h-[38px] w-[46px] pt-[12px] pb-[12px] pr-[16px] pl-[16px] rounded-[50px] border border-black cursor-pointer"
					>
						<ArrowIcon />
					</button>
					<p className="ml-[40px] font-content-font font-normal text-black text-[28px]/[33.6px]">
						{requestView !== undefined ? requestView.newData.post : ''}
					</p>
				</div>
				<div className="w-[50%] mt-[80px] flex flex-col gap-[40px]">
					<div className="flex gap-[60px]">
						<div className="flex flex-col gap-[16px]">
							<p className="font-content-font font-bold text-black text-[18px]/[21px]">
								Требуемый опыт работы:
							</p>
							<p className="font-content-font font-normal text-black text-[18px]/[21px]">
								{requestView?.newData.experience}
							</p>
						</div>
						<div className="flex flex-col gap-[16px]">
							<p className="font-content-font font-bold text-black text-[18px]/[21px]">
								Тип занятости:
							</p>
							<p className="font-content-font font-normal text-black text-[18px]/[21px]">
								{requestView?.newData.experience}
							</p>
						</div>
						<div className="flex flex-col gap-[16px]">
							<p className="font-content-font font-bold text-black text-[18px]/[21px]">
								Заработная плата:
							</p>
							<p className="font-content-font font-normal text-black text-[18px]/[21px]">
								{requestView?.newData.salary}
							</p>
						</div>
					</div>
					<div className="flex flex-col gap-[16px]">
						<p className="font-content-font font-bold text-black text-[18px]/[21px]">
							Задачи:
						</p>
						<p className="font-content-font font-normal text-black text-[18px]/[21px] whitespace-pre-line">
							{requestView?.newData.responsibilities}
						</p>
					</div>
					<div className="flex flex-col gap-[16px]">
						<p className="font-content-font font-bold text-black text-[18px]/[21px]">
							Требования:
						</p>
						<p className="font-content-font font-normal text-black text-[18px]/[21px] whitespace-pre-line">
							{requestView?.newData.skills}
						</p>
					</div>
					<div className="flex flex-col gap-[16px]">
						<p className="font-content-font font-bold text-black text-[18px]/[21px]">
							Условия:
						</p>
						<p className="font-content-font font-normal text-black text-[18px]/[21px] whitespace-pre-line">
							{requestView?.newData.conditions}
						</p>
					</div>
					<div className="flex gap-[40px]">
						<div className="flex flex-col gap-[16px]">
							<p className="font-content-font font-bold text-black text-[18px]/[21px]">
								Категория сотрудников
							</p>
							<p className="font-content-font font-normal text-black text-[18px]/[21px]">
								{requestView?.newData.category}
							</p>
						</div>
						<div className="flex flex-col gap-[16px]">
							<p className="font-content-font font-bold text-black text-[18px]/[21px]">
								Профобласть
							</p>
							<p className="font-content-font font-normal text-black text-[18px]/[21px]">
								{requestView?.newData.direction}
							</p>
						</div>
					</div>
					<div className="flex gap-[20px]">
						<Button
							onClick={() => {
								denyRequest(requestId)
									.unwrap()
									.then(() => {
										navigate('/services/personnelaccounting/vacancyrequests')
									})
							}}
							className="w-[151px] font-content-font font-normal text-black text-[16px]/[16px] rounded-[54.5px] py-[8px] px-[24px] border-black bg-inherit"
						>
							Отклонить
						</Button>
						<Button
							onClick={() => {
								acceptRequest(requestId)
									.unwrap()
									.then(() => {
										navigate('/services/personnelaccounting/vacancyrequests')
									})
							}}
							type="primary"
							className="rounded-[54.5px] w-[121px]"
						>
							Опубликовать
						</Button>
					</div>
				</div>
			</div>
		</>
	)
}
