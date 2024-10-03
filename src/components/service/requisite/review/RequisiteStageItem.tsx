import React, { useState, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { Button, ConfigProvider, Input, Modal } from 'antd'
import { DocumentElem } from '../../employmentStage/personnelDepartment/components/DocumentElem'
import { Comment } from '../../employmentStage/personnelDepartment/components/Comment'
import {
	useChangeEmploymentStageStatusRequestMutation, useGetEmploymentStageStatusQuery,
} from '../../../../store/api/serviceApi'
import { useAppSelector } from '../../../../store'
import { setCurrentCommentVisibility } from '../../../../store/reducers/RequisiteReducers/StageCommentReducer'
import { setCurrentStageStatus } from '../../../../store/reducers/EmploymentStageReducers/StageStatusReducer'

export const RequisiteStageItem = ( ) => {

	const dispatch = useDispatch()

	const respondId = useAppSelector(state => state.currentResponce)
	const stageStatus = useAppSelector(state => state.currentStageStatus)

	const { data: requisite_items = [] } = useGetEmploymentStageStatusQuery(respondId)

	const stageWithId6 = requisite_items
		.flatMap(item => item.stages)
		.find(stage => stage.id === 6)
	const sixStageStatus = stageWithId6?.status
	const sixStageComment = stageWithId6?.comment

	const [changeStatus] = useChangeEmploymentStageStatusRequestMutation()

	const [isRevisionModalOpen, setIsRevisionModalOpen] = useState(false)

	const { TextArea } = Input

	const changeVisibility = (newVisibility: string) => {
		dispatch(setCurrentCommentVisibility(newVisibility))
	}

	const textRef = useRef('')
	const checkInputChange = (e:any) => {
		textRef.current = e.target.value
	};
	const StageStatusComponent = () => {
		return(
			<>
				{(sixStageStatus === 'VERIFYING') && (
					<div className="flex flex-row gap-[12px]">
						<Button
							className="text-[#FFFFFF] py-[8px] px-[24px] border-none rounded-[54.5px] text-[16px] font-normal"
							type="primary"
							onClick={() => {
								changeStatus({
									status: 'ACCEPTED',
									comment: '',
									subStageId: 6
								})
								dispatch(setCurrentStageStatus('COMPLETE'))
								changeVisibility('invisible')
							}}
						>
							Принять
						</Button>
						<Button
							type="default"
							className="min-w-[144px] py-[8px] px-[24px] text-[#333333] border-[#333333] border-[1px] rounded-[54.5px] text-[16px]"
							onClick={() => {
								dispatch(setCurrentStageStatus('REFINE'))
								setIsRevisionModalOpen(true)
							}}
						>На доработку</Button>
					</div>
				)}
				{((sixStageStatus === 'REFINE')  || (stageStatus.stageStatus === 'REFINE')) && (
					<div className="flex flex-row items-center gap-[12px] pr-[150px]">
						<div className="w-[11px] h-[11px] rounded-[100%] bg-[#FFD600]"></div>
						<span>Доработка</span>
					</div>
				)}
				{((sixStageStatus === 'COMPLETE')  || (stageStatus.stageStatus === 'COMPLETE')) && (
					<div className="flex flex-row items-center gap-[12px] pr-[150px]">
						<div className="w-[11px] h-[11px] rounded-[100%] bg-[#00AB30]"></div>
						<span>Принято</span>
					</div>
				)}
			</>
		)
	}
	const StageContentComponent = () => {
		return(
			<div className="flex flex-col gap-[12px]">
				{/*TODO не работает, исправить*/}
				{/*

        */}
				{(sixStageStatus === 'REFINE') && (
					<>
						{(typeof sixStageComment === 'string') && (
							<Comment commentText={sixStageComment}></Comment>
						)}
					</>
				)}
			</div>
		)
	}
	const StageStatusModal = () => {
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
					bodyStyle={{ padding: 52 }}
					centered
				open={isRevisionModalOpen}
				onCancel={() => {
				setIsRevisionModalOpen(false)
			}}
				onOk={() => {
				setIsRevisionModalOpen(false)}}
				title={null}
				footer={null}
				width={620}
				>
				<p
					className="font-content-font font-normal mb-[18px] flex items-start text-black opacity-[80%] text-[16px]/[20px]">
					Комментарий
				</p>
				<TextArea
					autoSize={{ minRows: 4, maxRows: 8 }}
					style={{ height: 107, resize: 'none', width: 520, }}
					onChange={checkInputChange}
				/>
				<div className="mt-[40px] flex gap-[12px] w-full justify-end ">
					<Button
						className="rounded-[54.5px] py-[12px] px-[24px]  text-[16px]"
						type="primary"
						onClick={() => {
							changeStatus({
								status: 'REFINE',
								comment: textRef.current,
								subStageId: 6
							})
							changeVisibility('visible')
							setIsRevisionModalOpen(false)
						}}
					>
						Ok
					</Button>
				</div>
			</Modal>
			</ConfigProvider>
	</>
	)
	}
	return (
		<>
			<StageStatusModal></StageStatusModal>
			<div className="p-[20px] pr-[40px] gap-[20px] flex flex-col w-full bg-[#FFFFFF]">
				<div className="flex flex-row items-center justify-between min-h-[32px]">
					<div className="flex flex-row gap-[37px]">
						<h3 className="font-bold text-[16px]/[19.2px]">6 ЭТАП</h3>
						<h3 className="font-normal text-[18px]/[21.6px]">«Реквизиты»</h3>
					</div>
					<StageStatusComponent></StageStatusComponent>
				</div>
				<StageContentComponent></StageContentComponent>
			</div>
		</>
	)
}