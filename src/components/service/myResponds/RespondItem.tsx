import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'

import { DeleteSvg } from '../../../assets/svg/DeleteSvg'
import { RespondItemType, respondStatus } from '../../../store/type'

export const RespondItem = (props: RespondItemType & { refetch: Function }) => {
	const navigate = useNavigate()

	return (
		<>
			<div className="w-full mb-[12px] flex justify-between items-center bg-white shadow-custom-shadow pl-[20px] pr-[55px] pt-[20px] pb-[20px]">
				<p>{props.name}</p>
				<p>{props.respondDate.split('-').join('.')}</p>
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
					onClick={() => {
						navigate('/services/myresponds/chat')
					}}
					className="font-content-font font-normal text-black text-[16px]/[16px] rounded-[54.5px] py-[8px] px-[24px] border-black"
				>
					Перейти в чат
				</Button>
				<Button
					onClick={() => {
						props.refetch()
					}}
					type="text"
					icon={<DeleteSvg />}
				/>
			</div>
		</>
	)
}
