import { Button, Spin } from 'antd'
import { setCurrentResponce } from '../../../../store/reducers/CurrentResponceSlice'
import { useAppSelector } from '../../../../store'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { LoadingOutlined } from '@ant-design/icons'
import { useGetEmploymentStageStatusQuery } from '../../../../store/api/serviceApi'
import { DepEmploymentStageItem } from '../../employmentStage/personnelDepartment/depEmploymentStageItem'

export const RequisiteReviewInfo = () => {

	const respondId = useAppSelector(state => state.currentResponce)
	const seekerName  = useAppSelector(state => state.requisiteSeeker.currentRequisiteSeekerName)
	const seekerVacancy  = useAppSelector(state => state.requisiteSeeker.currentRequisiteSeekerVacancy)

	const dispatch = useDispatch()
	const navigate = useNavigate()

	const currentUrl = window.location.href
	const parts = currentUrl.split('/')
	const userIdStr = parts[parts.length - 1]
	const id = parseInt(userIdStr, 10)

	const { data: requisite_items, isLoading: loading } = useGetEmploymentStageStatusQuery({ respondId: id })
	console.log(requisite_items)
	const stagesArray = requisite_items?.stages || [] // массив массивов c этапами
	const sortedStages = stagesArray.flat().sort((a, b) => a.id - b.id) // сортирую потому что приходит вперемешку


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
	console.log(sortedStages?.[5])
	return (
		<>
			<div className="w-full flex flex-col px-[53px] mt-[140px]">
				<h1 className="font-normal text-[28px]/[28px]">{seekerName}</h1>
				<Button
					type="default"
					className="max-w-[102px] mt-[20px] bg-[#F5F8FB] py-[8px] px-[24px] text-[#333333] border-[#333333] border-[1px] rounded-[54.5px] text-[16px]"
					onClick={() => {
						dispatch(setCurrentResponce(respondId.respondId))
						navigate('/services/personnelaccounting/requisite/requisite-review/info/seekerinfo/')
					}}
				>Резюме</Button>
				<h3 className="mt-[53px] text-[18px] font-normal">
					Вакансия: <span className="font-bold">{seekerVacancy}</span>
				</h3>
				<div className="mt-[40px] mb-[100px] gap-[12px] flex flex-col ">
					{sortedStages?.[4] && (
						<DepEmploymentStageItem
							stage={6}
							comment={sortedStages[4].comment}
							stageStatus={sortedStages[4].status}
						/>
					)}
				</div>
			</div>
		</>
	)
}