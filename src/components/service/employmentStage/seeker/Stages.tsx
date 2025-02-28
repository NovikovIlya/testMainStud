import { LoadingOutlined } from '@ant-design/icons'
import { Spin } from 'antd'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'

import { useAppSelector } from '../../../../store'
import { useLazyGetEmploymentDataQuery, useLazyGetEmploymentDocsQuery } from '../../../../store/api/serviceApi'
import { setAllData } from '../../../../store/reducers/EmploymentDataSlice'
import { setAllProgress, setStageProgressAsReady } from '../../../../store/reducers/EmploymentProgressSlice'
import { setDocs } from '../../../../store/reducers/EmploymentSeekerDocsSlice'

import { EmplDocAttachment } from './EmplDocAttachment'
import { EmplInstruction } from './EmplInstruction'
import { EmplMedExam } from './EmplMedExam'
import { EmplMedInvite } from './EmplMedInvite'
import { EmplRequisites } from './EmplRequisites'
import { EmplSend } from './EmplSend'
import { EmplWorkConditions } from './EmplWorkConditions'
import { NavPanel } from './NavPanel'

export const Stages = () => {
	const { pathname } = useLocation()
	const dispatch = useDispatch()

	const respondId = parseInt(pathname.substring(pathname.lastIndexOf('/') + 1))

	const vacancyId = parseInt(pathname.substring(pathname.substring(0, pathname.lastIndexOf('/')).lastIndexOf('/') + 1))

	const { currentStage } = useAppSelector(state => state.currentEmploymentStage)
	// TODO обсудить возможность закидывать номер текущего этапа в url	
	const { docs } = useAppSelector(state => state.employmentSeekerDocs)
	const { empData } = useAppSelector(state => state.employmentData)

	const [getEmpData, empDataStatus] = useLazyGetEmploymentDataQuery()
	const [getEmpDocs, empDocs] = useLazyGetEmploymentDocsQuery()

	useEffect(() => {
		getEmpDocs(vacancyId)
			.unwrap()
			.then(data => {
				dispatch(setDocs(data))
			})
	}, [])

	useEffect(() => {
		getEmpData(respondId)
			.unwrap()
			.then(data => {
				dispatch(setAllData(data))
			})
	}, [])

	useEffect(() => {
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
							stage.documents.length === docs.filter(doc => doc.employmentStageType === stage.type).length
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
		dispatch(setStageProgressAsReady(1))
	}, [empData])

	if (currentStage === 0 && (empDataStatus.isFetching || empDataStatus.isLoading)) {
		return (
			<>
				<div className="w-full h-full flex items-center">
					<div className="text-center ml-auto mr-auto">
						<Spin indicator={<LoadingOutlined style={{ fontSize: 36 }} spin />}></Spin>
						<p className="font-content-font font-normal text-black text-[18px]/[18px]">
							Идёт загрузка этапа трудоустройства...
						</p>
					</div>
				</div>
			</>
		)
	}

	return (
		<>
			<div id="wrapper" className="px-[52px] pb-[52px] w-full">
				<div className="font-content-font font-normal text-[28px]/[28px] text-black mt-[120px]">
					Вакансия «Специалист отдела сотрудничества»
				</div>
				<NavPanel type="SEEKER" />
				<div
					className={`w-full mt-[40px] ${
						(empData.status === 'VERIFYING' || empData.status === 'ACCEPTED') && 'pointer-events-none'
					}`}
				>
					{currentStage === 0 && (
						<div className="w-full h-full flex flex-col">
							<p className="text-centerfont-content-font text-[20px]/[20px] text-black font-normal opacity-60 mt-[15%] mx-auto">
								Выберите этап, который вы бы хотели пройти
							</p>
						</div>
					)}
					{/* {currentStage === 1 && <EmplMedInvite respondId={respondId} stageId={1} stageName="FIRST" />} */}
					{currentStage === 2 && <EmplDocAttachment respondId={respondId} stageId={2} stageName="SECOND" />}
					{/* {currentStage === 3 && (
						<EmplWorkConditions
							respondId={respondId}
							stageId={3}
							stageName="THIRD"
						/>
					)} */}
					{currentStage === 3 && <EmplMedExam respondId={respondId} stageId={3} stageName="FOURTH" />}
					{currentStage === 4 && <EmplInstruction respondId={respondId} stageId={4} stageName="FIFTH" />}
					{currentStage === 5 && <EmplRequisites respondId={respondId} stageId={5} stageName="SIXTH" />}
					{currentStage === 6 && <EmplSend respondId={respondId} stageId={7} stageName="SEVENTH" />}
				</div>
			</div>
		</>
	)
}
