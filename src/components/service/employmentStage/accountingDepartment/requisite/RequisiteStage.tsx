import { Button, Spin } from 'antd'
import { setCurrentResponce } from '../../../../../store/reducers/CurrentResponceSlice'
import { useAppSelector } from '../../../../../store'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { LoadingOutlined } from '@ant-design/icons'
import { useGetEmploymentReqStageStatusQuery } from '../../../../../store/api/serviceApi'
import { DepEmploymentStageItem } from '../../personnelDepartment/depEmploymentStageItem'
import {NocircleArrowIcon} from "../../../jobSeeker/NoCircleArrowIcon";
import {NocircleArrowIconHover} from "../../../../../assets/svg/NocircleArrowIconHover";

export const RequisiteStage = () => {

	const respondId = useAppSelector(state => state.currentResponce)
	const seekerName  = useAppSelector(state => state.requisiteSeeker.currentRequisiteSeekerName)
	const seekerVacancy  = useAppSelector(state => state.requisiteSeeker.currentRequisiteSeekerVacancy)

	const dispatch = useDispatch()
	const navigate = useNavigate()

	const currentUrl = window.location.pathname;
	const match = currentUrl.match(/\/requisite-review\/(\d+)$/);

	let id_from_url: string | undefined

	if (match) {
		id_from_url = match[1]
	} else {
		console.error('id miss')
	}

	const { data: req_data, isLoading : loading } = useGetEmploymentReqStageStatusQuery({ respondId: id_from_url })

	console.log(req_data)

	const reqArray = req_data?.stages || []
	const sortedReqData = reqArray.flat().sort((a, b) => a.id - b.id)

	if (loading) {
		return (
			<>
				<div className="w-full h-full flex items-center">
					<div className="text-center ml-auto mr-auto">
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
				<div>
					<button
						onClick={() => {
							window.history.back()
						}}
						className="
										   group
								 		   items-center
								 		   gap-[8px]
								 		   hover:border-[#004EC2]
								 		   outline-0
								 		   hover:bg-white
								 		   transition-all duration-200
								 		   flex bg-inherit
								 		   h-[38px]
								 		   mb-[30px]
								 		   pt-[12px]
								 		   pb-[12px]
								 		   pr-[16px]
								 		   pl-[16px]
								 		   rounded-[50px]
								 		   border
								 		   border-solid
								 		   border-black
								 		   cursor-pointer
								 		  "
					>
						{/* Иконка при наведении */}
						<div
							className="absolute mt-[3px] group-hover:opacity-100 group-hover:scale-100 opacity-0 scale-95 transition-all duration-200">
							<NocircleArrowIconHover/>
						</div>

						{/* Иконка по умолчанию */}
						<div
							className="mt-[3px] group-hover:opacity-0 group-hover:scale-95 opacity-100 scale-100 transition-all duration-200">
							<NocircleArrowIcon/>
						</div>
						<span
							className="group-hover:text-[#004EC2] transition-all duration-200 text-[14px] font-normal">
									Назад
								</span>
					</button>
				</div>
				<h1 className="font-normal text-[28px]/[28px]">{seekerName}</h1>
				<Button
					type="default"
					className="max-w-[102px] mt-[20px] bg-[#F5F8FB] py-[8px] px-[24px] text-[#333333] border-[#333333] border-[1px] rounded-[54.5px] text-[16px]"
					onClick={() => {
						dispatch(setCurrentResponce(respondId.respondId))
						navigate(`/services/personnelaccounting/accounting/requisite/requisite-review/${id_from_url}/seeker-info`)
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