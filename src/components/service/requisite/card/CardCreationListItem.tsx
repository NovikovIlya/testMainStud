import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { setCurrentResponce } from '../../../../store/reducers/CurrentResponceSlice'
import {
	setCurrentRequisiteSeekerName,
	setCurrentRequisiteSeekerVacancy
} from '../../../../store/reducers/RequisiteReducers/RequisiteSeekerReducer'
import { EmploymentStageItemType } from '../../../../store/reducers/type'
import { useDispatch } from 'react-redux'

export const CardCreationListItem = ( props : EmploymentStageItemType) => {

	const navigate = useNavigate()
	const dispatch = useDispatch()

	return (
		<div className="flex flex-col">
			<div className="flex flex-row items-center h-[80px] w-full bg-[#FFFFFF]">
				<div className="flex ml-[1.5%] w-[38.5%]">
					{props.applicant.firstName + ' ' + props.applicant.middleName + ' ' + props.applicant.lastName}
				</div>
				<div className="flex w-[20%] mr-[20%]">
					{props.vacancy.name}
				</div>
				<div className='flex w-[20%]'>
					<Button
						className='text-[#FFFFFF] py-[8px] px-[24px] border-none rounded-[54.5px] text-[16px] font-normal'
						type="primary"
						onClick={() => {
							dispatch(setCurrentResponce(props.respondId))
							dispatch(setCurrentRequisiteSeekerVacancy(props.vacancy.name))
							dispatch(setCurrentRequisiteSeekerName(props.applicant.firstName + ' ' + props.applicant.middleName + ' ' + props.applicant.lastName))
							navigate('/services/personnelaccounting/requisite/card-creation/info')
						}}>
						Подробнее
					</Button>
				</div>
			</div>
		</div>
	)
}
