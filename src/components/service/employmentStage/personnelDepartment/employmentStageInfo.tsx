import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { SecondStage } from './Stages/SecondStage'
import { ThirdStage } from './Stages/ThirdStage'
import { ForthStage } from './Stages/ForthStage'
import { FifthStage } from './Stages/FifthStage'
import { useGetEmploymentStageStatusQuery} from '../../../../store/api/serviceApi'
import { useAppSelector} from '../../../../store'
import { setCurrentResponce } from '../../../../store/reducers/CurrentResponceSlice'
import { DepEmploymentStageItem } from './depEmploymentStageItem'

export const EmploymentStageInfo = () => {

	const respondId = useAppSelector(state => state.currentResponce)
	const employmentSeekerName  = useAppSelector(state => state.employmentSeeker.currentEmploymentSeekerName)
	const employmentSeekerVacancy  = useAppSelector(state => state.employmentSeeker.currentEmploymentSeekerVacancy)

	const { data: employment_stage_status = [] } = useGetEmploymentStageStatusQuery(respondId)

	const dispatch = useDispatch()
	const navigate = useNavigate()

	return (
		<>
			<div className="w-full flex flex-col px-[53px] mt-[140px]">
				<h1 className="font-normal text-[28px]/[28px]">Вакансия «{employmentSeekerVacancy}»</h1>
				<Button
					type="default"
					className="max-w-[102px] mt-[20px] py-[8px] px-[24px] text-[#333333] border-[#333333] border-[1px] rounded-[54.5px] text-[16px]"
					onClick={() => {
						dispatch(setCurrentResponce(respondId.respondId))
						navigate('/services/personnelaccounting/employment/stages/seekerinfo')
					}}
				>Резюме</Button>
				<h3 className="mt-[53px] text-[18px] font-normal">
					Соискатель: <span className="font-bold">{employmentSeekerName}</span>
				</h3>
				<div className="mt-[40px] mb-[100px] gap-[12px] flex flex-col ">
					<DepEmploymentStageItem name={'Прикрепление документов'} stageNumber={2} stageContentType={'docs'} content={''}></DepEmploymentStageItem>
					<DepEmploymentStageItem name={'Трудовые условия'} stageNumber={3} stageContentType={'text'} content={'Соискатель ознакомлен с трудовыми условиями'}></DepEmploymentStageItem>
					<DepEmploymentStageItem name={'Медицинский осмотр'} stageNumber={4} stageContentType={'docs'} content={''}></DepEmploymentStageItem>
					<DepEmploymentStageItem name={'Инструктаж'} stageNumber={5} stageContentType={'text'} content={'Соискатель прошел инструктаж'}></DepEmploymentStageItem>
				</div>
			</div>
		</>
	)
}