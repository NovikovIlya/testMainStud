import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'

import { VacancyRespondItemType, respondStatus } from '../../../store/type'

export const VacancyRespondItem = (props: VacancyRespondItemType) => {
	const navigate = useNavigate()

	return (
		<>
			<div className="w-full mb-[12px] flex justify-between items-center bg-white shadow-custom-shadow pl-[20px] pr-[55px] pt-[20px] pb-[20px]">
				<p>
					{props.userData
						? props.userData.lastname +
						  ' ' +
						  props.userData.firstname +
						  ' ' +
						  props.userData.middlename
						: 'Толстой Лев Николаевич'}
				</p>
				<p>{props.responseDate.split('-').reverse().join('.')}</p>
				<p>
					{props.status ===
					respondStatus[respondStatus.IN_PERSONNEL_DEPT_REVIEW]
						? 'на рассмотрении у отдела кадров'
						: props.status === respondStatus[respondStatus.IN_SUPERVISOR_REVIEW]
						? 'на рассмотрении у руководителя'
						: props.status === respondStatus[respondStatus.INVITATION]
						? 'приглашение'
						: props.status === respondStatus[respondStatus.REJECTED]
						? 'отклонено'
						: 'отклонено'}
				</p>
				<Button
					onClick={() => {}}
					className="font-content-font font-normal text-black text-[16px]/[16px] rounded-[54.5px] py-[8px] px-[24px] border-black"
				>
					Подробнее
				</Button>
			</div>
		</>
	)
}
