import { Button, Spin } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useAppSelector} from '../../../../store'
import { setCurrentResponce } from '../../../../store/reducers/CurrentResponceSlice'
import { DepEmploymentStageItem } from './depEmploymentStageItem'
import { LoadingOutlined } from '@ant-design/icons'
import { useGetEmploymentStageStatusQuery } from '../../../../store/api/serviceApi'

export const EmploymentStageInfo = ( ) => {

	const respondId = useAppSelector(state => state.currentResponce)
	const employmentSeekerName  = useAppSelector(state => state.employmentSeeker.currentEmploymentSeekerName)
	const employmentSeekerVacancy  = useAppSelector(state => state.employmentSeeker.currentEmploymentSeekerVacancy)

	const { data: requisite_items, isLoading: loading } = useGetEmploymentStageStatusQuery(respondId)
	console.log(requisite_items)

	const stagesArray = requisite_items?.stages || []; // Получаем массив этапов

	console.log(stagesArray)



	const dispatch = useDispatch()
	const navigate = useNavigate()

	if (loading) {
		return (
			<>
				<div className="w-screen h-screen flex items-center">
					<div className="text-center ml-auto mr-[50%]">
						<Spin
							indicator={<LoadingOutlined style={{ fontSize: 36 }} spin />}
						></Spin>
						<p className="font-content-font font-normal text-black text-[18px]/[18px]">
							Идёт загрузка...
						</p>
					</div>
				</div>
			</>
		)
	}

	return (
		<>
			<div className="w-full flex flex-col px-[53px] mt-[140px]">
				<h1 className="font-normal text-[28px]/[28px]">Вакансия «{employmentSeekerVacancy}»</h1>
				<Button
					type="default"
					className="max-w-[102px] bg-[#F5F8FB] mt-[20px] py-[8px] px-[24px] text-[#333333] border-[#333333] border-[1px] rounded-[54.5px] text-[16px]"
					onClick={() => {
						dispatch(setCurrentResponce(respondId.respondId))
						navigate('/services/personnelaccounting/employment/stages/seekerinfo')
					}}
				>Резюме</Button>
				<h3 className="mt-[53px] text-[18px] font-normal">
					Соискатель: <span className="font-bold">{employmentSeekerName}</span>
				</h3>
				<div className="mt-[40px] mb-[100px] gap-[12px] flex flex-col ">
					<DepEmploymentStageItem  stage={2} comment={requisite_items?.stages[1].comment} stageStatus={requisite_items?.stages[1].status}></DepEmploymentStageItem>
					<DepEmploymentStageItem  stage={3} comment={requisite_items?.stages[2].comment} stageStatus={requisite_items?.stages[2].status}></DepEmploymentStageItem>
					<DepEmploymentStageItem  stage={4} comment={requisite_items?.stages[3].comment} stageStatus={requisite_items?.stages[3].status}></DepEmploymentStageItem>
					<DepEmploymentStageItem  stage={5} comment={requisite_items?.stages[4].comment} stageStatus={requisite_items?.stages[4].status}></DepEmploymentStageItem>
				</div>
			</div>
		</>
	)
}