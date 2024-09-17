import React, { useReducer, useState, useCallback } from 'react'
import { GreenCheck } from '../../../../assets/svg/GreenCheck'
import { Button, ConfigProvider, Input, Modal } from 'antd'
import { DocumentElem } from './components/DocumentElem'
import { Comment } from './components/Comment'
import { initialState, stageReducer } from '../../../../store/reducers/employmentStageReducers/StageStatusReducer'
import { useChangeEmploymentStageStatusRequestMutation } from '../../../../store/api/serviceApi'

interface DepEmploymentStageItemProps {
	stageNumber: number
	name: string
	stageContentType: string
	content: any
}

export const DepEmploymentStageItem = ( props: DepEmploymentStageItemProps) => {

	const [changeStatus] = useChangeEmploymentStageStatusRequestMutation()

	const [isRevisionModalOpen, setIsRevisionModalOpen] = useState(false)

	const [secondStageState, dispatch] = useReducer(stageReducer, initialState);

	const [comment, setComment] = useState('');

	const { TextArea } = Input
	const stageNumberStr : string = props.stageNumber + ' ' + 'ЭТАП'
	const stageNameStr : string = "«" + props.name + "»"

	const textChangeCheck = useCallback((e : any) => {
		setComment(e.target.value);
	}, []);

	const StageStatusComponent = () => {
		return(
			<>
				{(secondStageState.stageStatus === 'VERIFYING') && (
					<div className="flex flex-row gap-[12px]">
						<Button
							className="text-[#FFFFFF] py-[8px] px-[24px] border-none rounded-[54.5px] text-[16px] font-normal"
							type="primary"
							onClick={() => {
								try {
									changeStatus({
										status: 'ACCEPTED',
										comment: comment,
										subStageId: props.stageNumber
									});
									dispatch({ type: 'SET_COMPLETE' });
								} catch (error) {
									console.log('try/catch error', error);
								}
							}}
						>
							Принять
						</Button>
						<Button
							type="default"
							className="min-w-[144px] py-[8px] px-[24px] text-[#333333] border-[#333333] border-[1px] rounded-[54.5px] text-[16px]"
							onClick={() => {
								setIsRevisionModalOpen(true)
							}}
						>На доработку</Button>
					</div>
				)}
				{(secondStageState.stageStatus === 'REFINE') && (
					<div className="flex flex-row items-center gap-[12px] pr-[150px]">
						<div className="w-[11px] h-[11px] rounded-[100%] bg-[#FFD600]"></div>
						<span>Доработка</span>
					</div>
				)}
				{(secondStageState.stageStatus === 'COMPLETE') && (
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
			<>
				{(props.stageContentType === 'docs') && (
					<>
						{/*
						<div className="flex flex-row gap-[40px] pr-[150px]">
						<div className="flex flex-col gap-[12px] ">
							<DocumentElem name={'Скан паспорта'}></DocumentElem>
							<DocumentElem name={'Трудовая книжка'}></DocumentElem>
							<DocumentElem name={'СНИЛС'}></DocumentElem>
							<DocumentElem name={'ИНН'}></DocumentElem>
						</div>
						<div className="flex flex-col gap-[12px]">
							<DocumentElem name={'Копия документов об образовании'}></DocumentElem>
							<DocumentElem name={'Личный листок по учету кадров'}></DocumentElem>
							<DocumentElem name={'СНИЛС'}></DocumentElem>
							<DocumentElem name={'ИНН'}></DocumentElem>
						</div>
					</div>
						*/}
					</>
				)}
				{(props.stageContentType === 'text') && (
					<div className="flex flex-row gap-[12px]">
						<GreenCheck></GreenCheck>
						<span className="text-[16px]/[19.2px] font-normal">{props.content}</span>
					</div>
				)}
			</>
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
							value={comment}
							onChange={textChangeCheck}
						/>
						<div className="mt-[40px] flex gap-[12px] w-full justify-end ">
							<Button
								className="rounded-[54.5px] py-[12px] px-[24px]  text-[16px]"
								type="primary"
								onClick={() => {
									try {
										changeStatus({
											status: 'REFINE',
											comment: comment,
											subStageId: 0
										});
										dispatch({ type: 'SET_REFINE' });
										setIsRevisionModalOpen(false);
									} catch (error) {
										console.log('try/catch error', error);
									}
								}}
							>
								Отправить
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
						<h3 className="font-bold text-[16px]/[19.2px]">{stageNumberStr}</h3>
						<h3 className="font-normal text-[18px]/[21.6px]">{stageNameStr}</h3>
					</div>
					<StageStatusComponent></StageStatusComponent>
				</div>
				<StageContentComponent></StageContentComponent>
			</div>
		</>
	)
}
