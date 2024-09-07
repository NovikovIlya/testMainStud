import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'

import { RespondItemType } from '../../../../store/reducers/type'

export const SeekerEmploymentItem = (props: RespondItemType) => {
	const navigate = useNavigate()

	return (
		<>
			<div className="w-full mb-[12px] flex items-center bg-white shadow-custom-shadow pl-[20px] pr-[55px] pt-[20px] pb-[20px]">
				<p className="w-[30%]">{props.name}</p>
				{props.employmentStageStatus === 'FILLING' ? (
					<p className="ml-[10%]">Прохождение</p>
				) : (
					<p className="ml-[10%]">Доработка</p>
				)}
				<div className="flex gap-[12px] ml-auto">
					<Button
						className="ml-[5%] rounded-[54px] font-content-font font-normal text-[16px]/[16px]"
						type="primary"
						onClick={() => {
							navigate(`/services/myresponds/employment/stages/${props.id}`)
						}}
					>
						Пройти этапы
					</Button>
					<Button className="font-content-font font-normal text-black text-[16px]/[16px] rounded-[54.5px] py-[8px] px-[24px] border-black">
						Перейти в чат
					</Button>
				</div>
			</div>
		</>
	)
}
