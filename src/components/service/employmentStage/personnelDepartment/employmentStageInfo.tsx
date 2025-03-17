import { LoadingOutlined } from '@ant-design/icons'
import { Button, ConfigProvider, Modal, Spin } from 'antd'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { NocircleArrowIconHover } from '../../../../assets/svg/NocircleArrowIconHover'
import { useAppSelector } from '../../../../store'
import {
	useGetEmploymentReqStageStatusQuery,
	useGetEmploymentStageStatusQuery,
	useGetPersonnelStagesQuery,
	useMarkBankCardApplicationFormedMutation
} from '../../../../store/api/serviceApi'
import { setCurrentResponce } from '../../../../store/reducers/CurrentResponceSlice'
import { NocircleArrowIcon } from '../../jobSeeker/NoCircleArrowIcon'

import { DocumentElem } from './components/DocumentElem'
import { DepEmploymentStageItem } from './depEmploymentStageItem'

export const EmploymentStageInfo = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const currentUrl = window.location.pathname

	const match = currentUrl.match(/\/stages\/(\d+)$/)

	let id_from_url: string | undefined

	if (match) {
		id_from_url = match[1]
	} else {
		console.error('id miss')
	}

	const employmentSeekerName = useAppSelector(state => state.employmentSeeker.currentEmploymentSeekerName)
	const employmentSeekerVacancy = useAppSelector(state => state.employmentSeeker.currentEmploymentSeekerVacancy)
	const respondId = useAppSelector(state => state.currentResponce)

	const { data: stages, isLoading: loadingReq } = useGetEmploymentStageStatusQuery({ respondId: id_from_url })

	console.log(stages)

	const stagesArray = stages?.stages || [] // массив массивов c этапами
	const sortedStages = stagesArray.flat().sort((a, b) => a.id - b.id) // сортирую потому что приходит вперемешку

	console.log(sortedStages)
	if (loadingReq) {
		return (
			<>
				<div className="w-full h-full flex items-center">
					<div className="text-center ml-auto mr-auto">
						<Spin indicator={<LoadingOutlined style={{ fontSize: 36 }} spin />}></Spin>
						<p className="font-content-font font-normal text-black text-[18px]/[18px]">Идёт загрузка...</p>
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
						<div className="absolute mt-[3px] group-hover:opacity-100 group-hover:scale-100 opacity-0 scale-95 transition-all duration-200">
							<NocircleArrowIconHover />
						</div>

						{/* Иконка по умолчанию */}
						<div className="mt-[3px] group-hover:opacity-0 group-hover:scale-95 opacity-100 scale-100 transition-all duration-200">
							<NocircleArrowIcon />
						</div>
						<span className="group-hover:text-[#004EC2] transition-all duration-200 text-[14px] font-normal">
							Назад
						</span>
					</button>
				</div>
				<h1 className="font-normal text-[28px]/[28px]">{employmentSeekerName}</h1>
				<Button
					type="default"
					className="max-w-[102px] bg-[#F5F8FB] mt-[20px] py-[8px] px-[24px] text-[#333333] border-[#333333] border-[1px] rounded-[54.5px] text-[16px]"
					onClick={() => {
						dispatch(setCurrentResponce(respondId.respondId))
						navigate(`/services/personnelaccounting/personnel-department/employment/stages/${id_from_url}/seeker-info`)
					}}
				>
					Резюме
				</Button>
				<h3 className="mt-[53px] text-[18px] font-normal">
					Вакансия: <span className="font-bold">«{employmentSeekerVacancy}»</span>
				</h3>
				<div className="mt-[40px] mb-[100px] gap-[12px] flex flex-col ">
					{sortedStages?.[1] && (
						<DepEmploymentStageItem
							stage={sortedStages[1].id}
							type={sortedStages[1].type}
							role={'personnel'}
							comment={sortedStages[1].comment}
							stageStatus={sortedStages[1].status}
							documentArray={sortedStages[1].documents}
							bank={''}
						/>
					)}
					{sortedStages?.[2] && (
						<DepEmploymentStageItem
							stage={sortedStages[2].id}
							type={sortedStages[2].type}
							role={'personnel'}
							comment={sortedStages[2].comment}
							stageStatus={sortedStages[2].status}
							documentArray={sortedStages[2].documents}
							bank={''}
						/>
					)}

					{sortedStages?.[3] && (
						<DepEmploymentStageItem
							stage={sortedStages[3].id}
							type={sortedStages[3].type}
							role={'personnel'}
							comment={sortedStages[3].comment}
							stageStatus={sortedStages[3].status}
							documentArray={sortedStages[3].documents}
							bank={''}
						/>
					)}
					{sortedStages?.[4] && (
						<>
							{!sortedStages[4].hasRequisites && (
								<>
									{sortedStages?.[4] && (
										<>
											<DepEmploymentStageItem
												stage={sortedStages[4].id}
												type={sortedStages[4].type}
												role={'personnel'}
												comment={''}
												stageStatus={sortedStages[4].status}
												documentArray={sortedStages[4].documents}
												bank={sortedStages[4].bank}
											/>
										</>
									)}
								</>
							)}
						</>
					)}
				</div>
			</div>
		</>
	)
}
