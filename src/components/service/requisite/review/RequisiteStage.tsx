import { Button, Spin } from 'antd'
import { setCurrentResponce } from '../../../../store/reducers/CurrentResponceSlice'
import { useAppSelector } from '../../../../store'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { LoadingOutlined } from '@ant-design/icons'
import { useGetEmploymentReqStageStatusQuery } from '../../../../store/api/serviceApi'
import { DepEmploymentStageItem } from '../../employmentStage/personnelDepartment/depEmploymentStageItem'
import {NocircleArrowIcon} from "../../jobSeeker/NoCircleArrowIcon";

export const RequisiteStage = () => {

	const respondId = useAppSelector(state => state.currentResponce)
	const seekerName  = useAppSelector(state => state.requisiteSeeker.currentRequisiteSeekerName)
	const seekerVacancy  = useAppSelector(state => state.requisiteSeeker.currentRequisiteSeekerVacancy)

	const dispatch = useDispatch()
	const navigate = useNavigate()


	const { data: req_data, isLoading : loading } = useGetEmploymentReqStageStatusQuery({ respondId: respondId.respondId })

	console.log(req_data)

	const reqArray = req_data?.stages || []
	const sortedReqData = reqArray.flat().sort((a, b) => a.id - b.id)

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
				<Button
					onClick={() => {
						window.history.back()
					}}
					className="bg-inherit w-[102px] mb-[30px] pt-[12px] pb-[12px] pr-[16px] pl-[16px] rounded-[50px] border border-black cursor-pointer"
				>
					<NocircleArrowIcon />
					Назад
				</Button>
				<h1 className="font-normal text-[28px]/[28px]">{seekerName}</h1>
				<Button
					type="default"
					className="max-w-[102px] mt-[20px] bg-[#F5F8FB] py-[8px] px-[24px] text-[#333333] border-[#333333] border-[1px] rounded-[54.5px] text-[16px]"
					onClick={() => {
						dispatch(setCurrentResponce(respondId.respondId))
						navigate('/services/personnelaccounting/requisite/requisite-review/seeker-info')
					}}
				>Резюме</Button>
				<h3 className="mt-[53px] text-[18px] font-normal">
					Вакансия: <span className="font-bold">{seekerVacancy}</span>
				</h3>
				<div className="mt-[40px] mb-[100px] gap-[12px] flex flex-col ">
					{sortedReqData?.[0] && (
						<DepEmploymentStageItem
							stage={5}
							role={'accounting'}
							comment={sortedReqData[0].comment}
							stageStatus={sortedReqData[0].status}
							documentArray={sortedReqData[0].documents}
							bank={''}/>
					)}
				</div>
			</div>
		</>
	)
}