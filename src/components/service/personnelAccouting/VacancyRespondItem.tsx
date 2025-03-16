import { LoadingOutlined } from '@ant-design/icons'
import { Button, ConfigProvider, Modal, Spin } from 'antd'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { useAppSelector } from '../../../store'
import {
	useLazyGetEmploymentDocsQuery,
	useLazyGetEmploymentStageStatusForSupervisorQuery,
	useLazyGetRespondFullInfoQuery
} from '../../../store/api/serviceApi'
import { setCurrentResponce } from '../../../store/reducers/CurrentResponceSlice'
import { setAllProgress } from '../../../store/reducers/EmploymentProgressSlice'
import { setDocs } from '../../../store/reducers/EmploymentSeekerDocsSlice'
import { VacancyRespondItemType, respondStatus } from '../../../store/reducers/type'
import { NavPanel } from '../employmentStage/seeker/NavPanel'

export const VacancyRespondItem = (
	props: VacancyRespondItemType & {
		itemType: 'PERSONNEL_DEPARTMENT' | 'SUPERVISOR'
	}
) => {
	const [getResponceInfo] = useLazyGetRespondFullInfoQuery()
	const navigate = useNavigate()
	const dispatch = useDispatch()

	//const { docs } = useAppSelector(state => state.employmentSeekerDocs)
	const [empStatus, setEmpStatus] = useState<string>('')

	const [getEmpData, empDataStatus] = useLazyGetEmploymentStageStatusForSupervisorQuery()
	const [getEmpDocs, empDocs] = useLazyGetEmploymentDocsQuery()

	const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

	return (
		<>
			<ConfigProvider
				theme={{
					token: {
						boxShadow: '0 0 19px 0 rgba(212, 227, 241, 0.6)'
					}
				}}
			>
				<Modal
					bodyStyle={{
						padding: '26px'
					}}
					className="pr-[52px] pl-[52px] pb-[52px] !w-[80%]"
					centered
					open={isModalOpen}
					title={null}
					footer={null}
					onCancel={() => {
						setIsModalOpen(false)
					}}
				>
					{empDataStatus.isFetching || empDataStatus.isLoading || empDocs.isFetching || empDocs.isLoading ? (
						<>
							<div className="w-full h-full flex items-center">
								<div className="text-center ml-auto mr-auto">
									<Spin indicator={<LoadingOutlined style={{ fontSize: 36 }} spin />}></Spin>
									<p className="font-content-font font-normal text-black text-[18px]/[18px]">Идёт загрузка...</p>
								</div>
							</div>
						</>
					) : (
						<div className="flex flex-col items-center">
							<p className="font-content-font font-normal text-black text-[24px]/[28.8px] mr-auto">
								<span className="font-bold">Этап трудоустройства: </span>
								{props.userData?.lastname + ' ' + props.userData?.firstname + ' ' + props.userData?.middlename}
							</p>
							<NavPanel type="SUPERVISOR" />
							<p className="font-content-font font-normal text-black text-[16px]/[16px] mr-auto mt-[25px]">
								{empStatus}
							</p>
						</div>
					)}
				</Modal>
			</ConfigProvider>
			<div className="w-full mb-[12px] flex items-center bg-white shadow-custom-shadow pl-[20px] pr-[55px] pt-[20px] pb-[20px]">
				<p className="w-[25%]">
					{props.userData
						? props.userData.lastname + ' ' + props.userData.firstname + ' ' + props.userData.middlename
						: 'Толстой Лев Николаевич'}
				</p>
				{props.itemType === 'PERSONNEL_DEPARTMENT' ? (
					<>
						<p className="ml-[10%] w-[8%]">{props.responseDate.split('-').reverse().join('.')}</p>
						<p className="ml-[1%] w-[25%]">
							{props.status === respondStatus[respondStatus.IN_PERSONNEL_DEPT_REVIEW]
								? 'на рассмотрении у отдела кадров'
								: props.status === respondStatus[respondStatus.IN_SUPERVISOR_REVIEW]
								? 'на рассмотрении у руководителя'
								: props.status === respondStatus[respondStatus.INVITATION]
								? 'приглашение'
								: props.status === respondStatus[respondStatus.REJECTED]
								? 'отклонено'
								: 'на рассмотрении'}
						</p>
					</>
				) : (
					<>
						<p className="ml-[1%] w-[15%]">{props.vacancyName}</p>
						<p className="ml-[10%] w-[8%]">{props.responseDate.split('-').reverse().join('.')}</p>
						{props.status === respondStatus[respondStatus.EMPLOYMENT] ? (
							<a
								className="ml-[5%] w-[15%] underline text-dasha-blue underline-offset-4 cursor-pointer"
								onClick={() => {
									setIsModalOpen(true)
									getEmpDocs(props.vacancyId)
										.unwrap()
										.then(res => {
											dispatch(setDocs(res))
											return res
										})
										.then(docs => {
											getEmpData({ respondId: props.id })
												.unwrap()
												.then(empData => {
													dispatch(
														setAllProgress(
															empData.stages.map(stage => {
																if (stage.status === 'FILLING') {
																	if (stage.workingConditionAccepted) {
																		return { ...stage, status: 'READY' }
																	} else if (stage.hasRequisites === false) {
																		return { ...stage, status: 'READY' }
																	} else if (stage.testPassed === true) {
																		return { ...stage, status: 'READY' }
																	} else if (
																		docs.filter(doc => doc.employmentStageType === stage.type).length !== 0 &&
																		stage.documents.length ===
																			docs.filter(doc => doc.employmentStageType === stage.type).length
																	) {
																		return { ...stage, status: 'READY' }
																	} else {
																		return stage
																	}
																} else if (stage.status === 'UPDATED') {
																	return { ...stage, status: 'READY' }
																} else {
																	return stage
																}
															})
														)
													)
													setEmpStatus(
														empData.status === 'VERIFYING'
															? 'Соискатель прошёл все этапы трудоустройства и отправил их на рассмотрение, ждёт подтверждения'
															: empData.status === 'REFINE'
															? 'Некоторые из этапов трудоустройства у соискателя были отправлены на доработку'
															: empData.status === 'ACCEPTED'
															? 'Соискатель успешно прошёл все этапы трудоустройства'
															: ''
													)
												})
										})
								}}
							>
								этап трудоустройства
							</a>
						) : (
							<p className="ml-[5%] w-[15%]">
								{props.status === respondStatus[respondStatus.IN_PERSONNEL_DEPT_REVIEW]
									? 'на рассмотрении у отдела кадров'
									: props.status === respondStatus[respondStatus.IN_SUPERVISOR_REVIEW]
									? 'на рассмотрении'
									: props.status === respondStatus[respondStatus.INVITATION] ||
									  props.status === respondStatus[respondStatus.EMPLOYMENT_REQUEST]
									? 'приглашение'
									: props.status === respondStatus[respondStatus.ARCHIVE]
									? 'отказано'
									: 'на рассмотрении'}
							</p>
						)}
					</>
				)}
				<Button
					onClick={() => {
						dispatch(setCurrentResponce(props.id))
						props.itemType === 'PERSONNEL_DEPARTMENT'
							? navigate(`services/personnelaccounting/responds/fullinfo/${props.id}`)
							: navigate(`services/personnelaccounting/supervisor/responds/fullinfo/${props.id}`)
					}}
					className="ml-auto max-w-[15%] font-content-font font-normal text-black text-[16px]/[16px] rounded-[54.5px] py-[8px] px-[24px] border-black"
				>
					Подробнее
				</Button>
			</div>
		</>
	)
}
