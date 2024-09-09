import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { AlertMessage } from '../../../../utils/AlertMessage'
import { SecondStage } from './Stages/SecondStage'
import { ThirdStage } from './Stages/ThirdStage'
import { ForthStage } from './Stages/ForthStage'
import { FifthStage } from './Stages/FifthStage'

export const EmploymentStageInfo = () => {

	const navigate = useNavigate()

	return (
		<>
			<div className="w-full flex flex-col px-[53px] mt-[140px]">
				<h1 className="font-normal text-[28px]/[28px]">Алексеев Дмитрий Иванович</h1>
				<Button
					type="default"
					className="max-w-[102px] mt-[20px] py-[8px] px-[24px] text-[#333333] border-[#333333] border-[1px] rounded-[54.5px] text-[16px]"
					onClick={() => {
						{/*dispatch(setCurrentResponce(props.id))*/}
						navigate('/services/personnelaccounting/employment/stages/seekerinfo')
					}}
				>Резюме</Button>
				<h3 className="mt-[53px] text-[18px] font-normal">Вакансия: <span className="font-bold">Специалист отдела развития сотрудничества</span>
				</h3>
				<div className="mt-[40px] mb-[100px] gap-[12px] flex flex-col ">
					<SecondStage></SecondStage>
					<ThirdStage></ThirdStage>
					<ForthStage></ForthStage>
					<FifthStage></FifthStage>
				</div>
			</div>
		</>
	)
}