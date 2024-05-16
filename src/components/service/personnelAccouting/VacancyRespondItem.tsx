import { Button } from 'antd'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { useLazyGetRespondFullInfoQuery } from '../../../store/api/serviceApi'
import { setCurrentResponce } from '../../../store/reducers/CurrentResponceSlice'
import { VacancyRespondItemType, respondStatus } from '../../../store/type'

export const VacancyRespondItem = (
	props: VacancyRespondItemType & {
		itemType: 'PERSONNEL_DEPARTMENT' | 'SUPERVISOR'
	}
) => {
	const [getResponceInfo] = useLazyGetRespondFullInfoQuery()
	const navigate = useNavigate()
	const dispatch = useDispatch()

	return (
		<>
			<div className="w-full mb-[12px] flex justify-between items-center bg-white shadow-custom-shadow pl-[20px] pr-[55px] pt-[20px] pb-[20px]">
				<p className="w-[270px] shrink-0">
					{props.userData
						? props.userData.lastname +
						  ' ' +
						  props.userData.firstname +
						  ' ' +
						  props.userData.middlename
						: 'Толстой Лев Николаевич'}
				</p>
				{props.itemType === 'PERSONNEL_DEPARTMENT' ? (
					<div className="flex gap-[20px] mr-[312px]">
						<p className="w-[90px]">
							{props.responseDate.split('-').reverse().join('.')}
						</p>
						<p>
							{props.status ===
							respondStatus[respondStatus.IN_PERSONNEL_DEPT_REVIEW]
								? 'на рассмотрении у отдела кадров'
								: props.status ===
								  respondStatus[respondStatus.IN_SUPERVISOR_REVIEW]
								? 'на рассмотрении у руководителя'
								: props.status === respondStatus[respondStatus.INVITATION]
								? 'приглашение'
								: props.status === respondStatus[respondStatus.REJECTED]
								? 'отклонено'
								: 'на рассмотрении'}
						</p>
					</div>
				) : (
					<>
						<p>{props.vacancyName}</p>
						<p className="w-[90px]">
							{props.responseDate.split('-').reverse().join('.')}
						</p>
					</>
				)}
				<Button
					onClick={() => {
						dispatch(setCurrentResponce(props.id))
						props.itemType === 'PERSONNEL_DEPARTMENT'
							? navigate(`services/personnelaccounting/responds/fullinfo`)
							: navigate(
									'services/personnelaccounting/supervisor/responds/fullinfo'
							  )
					}}
					className="font-content-font font-normal text-black text-[16px]/[16px] rounded-[54.5px] py-[8px] px-[24px] border-black"
				>
					Подробнее
				</Button>
			</div>
		</>
	)
}
