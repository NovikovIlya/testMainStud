import { Button } from 'antd'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { FileIconSvg } from '../../../../assets/svg/FileIconSvg'
import { FileIconSvgHover } from '../../../../assets/svg/FileIconSvgHover'
import { useGetChatIdByRespondIdQuery } from '../../../../store/api/serviceApi'
import { setChatFilter } from '../../../../store/reducers/ChatFilterSlice'
import { setCurrentResponce } from '../../../../store/reducers/CurrentResponceSlice'
import {
	setCurrentEmploymentSeekerName,
	setCurrentEmploymentSeekerVacancy
} from '../../../../store/reducers/EmploymentStageReducers/EmploymentStageSeekerReducer'
import { setChatId } from '../../../../store/reducers/chatIdSlice'
import { EmploymentStageItemType } from '../../../../store/reducers/type'

export const DepEmploymentItem = (props: EmploymentStageItemType) => {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const {
		data: chatId = {
			id: 0,
			respondInfo: {},
			unreadCount: 0,
			lastMessageDate: ''
		},
		isLoading: isChatIdLoading
	} = useGetChatIdByRespondIdQuery({
		chatId: props.respondId,
		role: 'PERSONNEL_DEPARTMENT'
	})

	return (
		<div className="flex flex-col">
			<div className="flex flex-row items-center h-[80px] w-full bg-[#FFFFFF]">
				<div className="flex ml-[1.5%] w-[24%]">
					{props.applicant.lastName + ' ' + props.applicant.firstName + ' ' + props.applicant.middleName}
				</div>
				<div className="flex w-[20%] mr-[5%]">{props.vacancy.name}</div>
				{props.status === 'REFINE' && (
					<div className="flex items-center w-[16%] gap-[12px]">
						<div className="w-[11px] h-[11px] rounded-[100%] bg-[#FFD600]"></div>
						<span>Доработка</span>
					</div>
				)}
				{props.status === 'VERIFYING' && (
					<div className="flex items-center w-[16%] gap-[12px]">
						<div className="w-[11px] h-[11px] rounded-[100%] bg-[#009DCE]"></div>
						<span>На проверке</span>
					</div>
				)}
				{props.status === 'ACCEPTED' && (
					<div className="flex items-center w-[16%] gap-[12px]">
						<div className="w-[11px] h-[11px] rounded-[100%] bg-[#00AB30]"></div>
						<span>Принято</span>
					</div>
				)}
				<div className="flex mr-[5%] w-[28.5%] flex-row justify-between">
					<Button
						className="text-[#FFFFFF] py-[8px] px-[24px] border-none rounded-[54.5px] text-[16px] font-normal"
						type="primary"
						onClick={() => {
							dispatch(setCurrentResponce(props.respondId))
							dispatch(setCurrentEmploymentSeekerVacancy(props.vacancy.name))
							dispatch(
								setCurrentEmploymentSeekerName(
									props.applicant.lastName + ' ' + props.applicant.firstName + ' ' + props.applicant.middleName
								)
							)
							navigate(`/services/personnelaccounting/personnel-department/employment/stages/${props.respondId}`)
						}}
					>
						Подробнее
					</Button>
					<Button
						className="bg-[#FFFFFF] py-[8px] px-[24px] text-[#333333] border-[#333333] border-[1px] rounded-[54.5px] text-[16px] font-normal cursor-pointer"
						onClick={() => {
							dispatch(setCurrentResponce(props.respondId))
							navigate(
								`/services/personnelaccounting/personnel-department/employment/stages/${props.respondId}/seeker-info`
							)
						}}
					>
						Резюме
					</Button>
					<button
						className="group w-[100px] h-[32px] flex items-center hover:border-[#004EC2] gap-[4px] outline-0 bg-[#FFFFFF] py-[8px] px-[24px] text-[#333333] border-[#333333] border-solid border-[1px] rounded-[54.5px] cursor-pointer transition-all duration-200"
						onClick={() => {
							dispatch(setChatFilter('EMPLOYMENT'))
							dispatch(setChatId(chatId.id))
							navigate(`/services/personnelaccounting/chat/id/${chatId.id}`)
						}}
					>
						<div className="absolute mr-[32px] mt-[4px] group-hover:opacity-100 group-hover:scale-100 opacity-0 scale-95 transition-all duration-200">
							<FileIconSvgHover />
						</div>

						{/* Иконка по умолчанию */}
						<div className="mt-[3px] group-hover:opacity-0 group-hover:scale-95 opacity-100 scale-100 transition-all duration-200">
							<FileIconSvg />
						</div>
						<span className="group-hover:text-[#004EC2] transition-all duration-200 text-[16px] font-normal">Чат</span>
					</button>
				</div>
			</div>
		</div>
	)
}
