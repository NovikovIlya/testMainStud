import { Button, ConfigProvider, Input, Modal } from 'antd'
import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'

import { GreenCheck } from '../../../../assets/svg/GreenCheck'
import { useAppSelector } from '../../../../store'
import {
	useChangeEmploymentStageAccountingStatusRequestMutation,
	useChangeEmploymentStageStatusRequestMutation,
	useMarkBankCardApplicationFormedMutation
} from '../../../../store/api/serviceApi'
import { setFifthStageCommentVisibility } from '../../../../store/reducers/EmploymentStageReducers/comments/FifthStageCommentVisibilitySlice'
import { setForthStageCommentVisibility } from '../../../../store/reducers/EmploymentStageReducers/comments/ForthStageCommentVisibilitySlice'
import { setSecondStageCommentVisibility } from '../../../../store/reducers/EmploymentStageReducers/comments/SecondStageCommentVisibilitySlice'
import { setSixStageCommentVisibility } from '../../../../store/reducers/EmploymentStageReducers/comments/SixStageCommentVisibilitySlice'
import { setThirdStageCommentVisibility } from '../../../../store/reducers/EmploymentStageReducers/comments/ThirdStageCommentVisibilitySlice'
import { setFifthStageStatus } from '../../../../store/reducers/EmploymentStageReducers/stages/FifthStageStatusSlice'
import { setForthStageStatus } from '../../../../store/reducers/EmploymentStageReducers/stages/ForthStageStatusSlice'
import { setSecondStageStatus } from '../../../../store/reducers/EmploymentStageReducers/stages/SecondStageStatusSlice'
import { setSixStageStatusPersonnel } from '../../../../store/reducers/EmploymentStageReducers/stages/SixStageStatusPersonnelSlice'
import { setSixStageStatus } from '../../../../store/reducers/EmploymentStageReducers/stages/SixStageStatusSlice'
import { setThirdStageStatus } from '../../../../store/reducers/EmploymentStageReducers/stages/ThirdStageStatusSlice'
import { useAlert } from '../../../../utils/AlertMessage'

import { DocumentElem } from './components/DocumentElem'
import { StageComment } from './components/StageComment'

interface Document {
	id: number
	docType: string
	name: string
	status: 'ATTACHED' | 'NOT_ATTACHED'
}

interface DepEmploymentStageItemProps {
	stage: number
	role: string
	bank: string
	stageStatus: string
	comment: string
	documentArray: Document[] | undefined
}

export const DepEmploymentStageItem = (props: DepEmploymentStageItemProps) => {
	console.log(props.stageStatus)

	const { openAlert } = useAlert()

	const secondStageStatus = useAppSelector(state => state.secondStageStatus)
	const thirdStageStatus = useAppSelector(state => state.thirdStageStatus)
	const forthStageStatus = useAppSelector(state => state.forthStageStatus)
	const fifthStageStatus = useAppSelector(state => state.fifthStageStatus)
	const sixStageStatus = useAppSelector(state => state.sixStageStatus)
	const sixStageStatusPersonnel = useAppSelector(state => state.sixStageStatusPersonnel)
	const secondStageCommentVisibility = useAppSelector(state => state.secondStageCommentVisibility)
	const thirdStageCommentVisibility = useAppSelector(state => state.thirdStageCommentVisibility)
	const forthStageCommentVisibility = useAppSelector(state => state.forthStageCommentVisibility)
	const fifthStageCommentVisibility = useAppSelector(state => state.fifthStageCommentVisibility)
	const sixStageCommentVisibility = useAppSelector(state => state.sixStageCommentVisibility)

	const [isReqModalOpen, setIsReqModalOpen] = useState(false)

	const dispatch = useDispatch()

	const [markBankCardApplicationFormed] = useMarkBankCardApplicationFormedMutation()
	const [changeStatus] = useChangeEmploymentStageStatusRequestMutation()
	const [changeStatusAccounting] = useChangeEmploymentStageAccountingStatusRequestMutation()

	const [isRevisionModalOpen, setIsRevisionModalOpen] = useState(false)

	const { TextArea } = Input

	const textRef = useRef('')
	const checkInputChange = (e: any) => {
		textRef.current = e.target.value
	}

	const ReqModal = () => {
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
						centered
						open={isReqModalOpen}
						onCancel={() => {
							setIsReqModalOpen(false)
						}}
						title={null}
						footer={null}
						width={407}
					>
						<div className="flex flex-col px-[15px] pt-[50px] pb-[30px] gap-[34px]">
							<p className="text-center font-content-font font-normal flex items-start text-black text-[16px]/[20px]">
								Вы действительно хотите отметить заявление сформированным? Соискателю в чат придëт сообщение, что ему
								необходимо подойти и подписать его.
							</p>
							<Button
								className="rounded-[54.5px] text-[14px] w-full py-[13px]"
								type="primary"
								onClick={() => {
									markBankCardApplicationFormed({ subStageId: 5 })
									dispatch(setFifthStageStatus('ACCEPTED'))
									setIsReqModalOpen(false)
									openAlert({ type: 'info', text: 'Сообщение отправлено' })
								}}
							>
								Ок
							</Button>
						</div>
					</Modal>
				</ConfigProvider>
			</>
		)
	}
	const StageStatusComponent = () => {
		return (
			<>
				{props.stage === 2 && (
					<div className="min-w-[300px] items-left">
						{props.stageStatus === 'VERIFYING' && secondStageStatus.secondStageStatus === 'VERIFYING' && (
							<div className="flex flex-row gap-[12px]">
								<Button
									className="text-[#FFFFFF] py-[8px] px-[24px] border-none rounded-[54.5px] text-[16px] font-normal"
									type="primary"
									onClick={() => {
										changeStatus({
											status: 'ACCEPTED',
											comment: textRef.current,
											subStageId: props.stage
										})
										dispatch(setSecondStageStatus('ACCEPTED'))
										dispatch(setSecondStageCommentVisibility('invisible'))
										openAlert({ type: 'success', text: 'Этап успешно принят' })
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
								>
									На доработку
								</Button>
							</div>
						)}
						{(props.stageStatus === 'REFINE' || secondStageStatus.secondStageStatus === 'REFINE') && (
							<div className="flex flex-row items-center gap-[12px]">
								<div className="w-[11px] h-[11px] rounded-[100%] bg-[#FFD600]"></div>
								<span>Доработка</span>
							</div>
						)}
						{(props.stageStatus === 'ACCEPTED' || secondStageStatus.secondStageStatus === 'ACCEPTED') && (
							<div className="flex flex-row items-center gap-[12px]">
								<div className="w-[11px] h-[11px] rounded-[100%] bg-[#00AB30]"></div>
								<span>Принято</span>
							</div>
						)}
						{props.stageStatus === 'UPDATED' && (
							<div className="flex flex-row items-center gap-[12px]">
								<div className="w-[11px] h-[11px] rounded-[100%] bg-[#FFD600]"></div>
								<span>Доработка</span>
							</div>
						)}
					</div>
				)}
				{props.stage === 3 && (
					<div className="min-w-[300px] items-left">
						{props.stageStatus === 'VERIFYING' && thirdStageStatus.thirdStageStatus === 'VERIFYING' && (
							<div className="flex flex-row gap-[12px] items-left">
								<Button
									className="text-[#FFFFFF] py-[8px] px-[24px] border-none rounded-[54.5px] text-[16px] font-normal"
									type="primary"
									onClick={() => {
										changeStatus({
											status: 'ACCEPTED',
											comment: textRef.current,
											subStageId: props.stage
										})
										dispatch(setThirdStageStatus('ACCEPTED'))
										dispatch(setThirdStageCommentVisibility('invisible'))
										openAlert({ type: 'success', text: 'Этап успешно принят' })
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
								>
									На доработку
								</Button>
							</div>
						)}
						{(props.stageStatus === 'REFINE' || thirdStageStatus.thirdStageStatus === 'REFINE') && (
							<div className="flex flex-row items-center gap-[12px]">
								<div className="w-[11px] h-[11px] rounded-[100%] bg-[#FFD600]"></div>
								<span>Доработка</span>
							</div>
						)}
						{(props.stageStatus === 'ACCEPTED' || thirdStageStatus.thirdStageStatus === 'ACCEPTED') && (
							<div className="flex flex-row items-center gap-[12px]">
								<div className="w-[11px] h-[11px] rounded-[100%] bg-[#00AB30]"></div>
								<span>Принято</span>
							</div>
						)}
						{props.stageStatus === 'UPDATED' && (
							<div className="flex flex-row items-center gap-[12px]">
								<div className="w-[11px] h-[11px] rounded-[100%] bg-[#FFD600]"></div>
								<span>Доработка</span>
							</div>
						)}
					</div>
				)}
				{props.stage === 5 && props.role === 'accounting' && (
					<div className="min-w-[300px] items-left">
						{props.stageStatus === 'VERIFYING' && fifthStageStatus.fifthStageStatus === 'VERIFYING' && (
							<div className="flex flex-row gap-[12px]">
								<Button
									className="text-[#FFFFFF] py-[8px] px-[24px] border-none rounded-[54.5px] text-[16px] font-normal"
									type="primary"
									onClick={() => {
										changeStatusAccounting({
											status: 'ACCEPTED',
											comment: textRef.current,
											subStageId: props.stage
										})
										dispatch(setFifthStageStatus('ACCEPTED'))
										dispatch(setFifthStageCommentVisibility('invisible'))
										openAlert({ type: 'success', text: 'Этап успешно принят' })
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
								>
									На доработку
								</Button>
							</div>
						)}
						{(props.stageStatus === 'REFINE' || fifthStageStatus.fifthStageStatus === 'REFINE') && (
							<div className="flex flex-row items-center gap-[12px]">
								<div className="w-[11px] h-[11px] rounded-[100%] bg-[#FFD600]"></div>
								<span>Доработка</span>
							</div>
						)}
						{(props.stageStatus === 'ACCEPTED' || fifthStageStatus.fifthStageStatus === 'ACCEPTED') && (
							<div className="flex flex-row items-center gap-[12px]">
								<div className="w-[11px] h-[11px] rounded-[100%] bg-[#00AB30]"></div>
								<span>Принято</span>
							</div>
						)}
						{props.stageStatus === 'UPDATED' && (
							<div className="flex flex-row items-center gap-[12px]">
								<div className="w-[11px] h-[11px] rounded-[100%] bg-[#FFD600]"></div>
								<span>Доработка</span>
							</div>
						)}
					</div>
				)}
				{props.stage === 5 && props.role === 'personnel' && (
					<div className="min-w-[300px] items-left">
						{props.stageStatus === 'VERIFYING' && fifthStageStatus.fifthStageStatus === 'VERIFYING' && (
							<div className="flex flex-row gap-[12px]">
								<Button
									className="text-[#FFFFFF] py-[8px] px-[24px] border-none rounded-[54.5px] text-[16px] font-normal"
									type="primary"
									onClick={() => {
										setIsReqModalOpen(true)
									}}
								>
									Заявление сформированно
								</Button>
							</div>
						)}
						{(props.stageStatus === 'ACCEPTED' || fifthStageStatus.fifthStageStatus === 'ACCEPTED') && (
							<div className="flex flex-row items-center gap-[12px]">
								<div className="w-[11px] h-[11px] rounded-[100%] bg-[#00AB30]"></div>
								<span>Сформированно</span>
							</div>
						)}
					</div>
				)}
			</>
		)
	}
	const StageContentComponent = () => {
		return (
			<>
				{props.stage === 2 && (
					<>
						{props.documentArray?.map(document => (
							<DocumentElem key={document.id} name={document.docType} id={document.id} fileName={document.name} />
						))}
						{(props.stageStatus === 'REFINE' ||
							(props.stageStatus === 'VERIFYING' &&
								props.comment !== null &&
								props.comment !== undefined &&
								props.comment !== '') ||
							props.stageStatus === 'UPDATED' ||
							secondStageCommentVisibility.secondStageCommentVisibility === 'visible') && (
							<>
								<StageComment commentTextBd={props.comment} commentTextState={textRef.current}></StageComment>
							</>
						)}
					</>
				)}
				{props.stage === 3 && (
					<>
						{props.documentArray?.map(document => (
							<DocumentElem key={document.id} name={document.docType} id={document.id} fileName={document.name} />
						))}
						{(props.stageStatus === 'REFINE' ||
							(props.stageStatus === 'VERIFYING' &&
								props.comment !== null &&
								props.comment !== undefined &&
								props.comment !== '') ||
							props.stageStatus === 'UPDATED' ||
							thirdStageCommentVisibility.thirdStageCommentVisibility === 'visible') && (
							<>
								<StageComment commentTextBd={props.comment} commentTextState={textRef.current}></StageComment>
							</>
						)}
					</>
				)}
				{props.stage === 4 && (
					<>
						<div className="flex flex-row gap-[12px]">
							<GreenCheck></GreenCheck>
							<span className="text-[16px]/[19.2px] font-normal">Соискатель прошел инструктаж</span>
						</div>
					</>
				)}
				{props.stage === 5 && props.role === 'accounting' && (
					<>
						{props.documentArray?.map(document => (
							<DocumentElem key={document.id} name={document.docType} id={document.id} fileName={document.name} />
						))}
						{(props.stageStatus === 'REFINE' ||
							(props.stageStatus === 'VERIFYING' &&
								props.comment !== null &&
								props.comment !== undefined &&
								props.comment !== '') ||
							props.stageStatus === 'UPDATED' ||
							fifthStageCommentVisibility.fifthStageCommentVisibility === 'visible') && (
							<>
								<StageComment commentTextBd={props.comment} commentTextState={textRef.current}></StageComment>
							</>
						)}
					</>
				)}
				{props.stage === 5 && props.role === 'personnel' && (
					<>
						{props.documentArray?.map(document => (
							<DocumentElem key={document.id} name={document.docType} id={document.id} fileName={document.name} />
						))}
						<span className="text-[14px]/[16.8px] text-black opacity-[60%] font-normal">
							Соискателю необходимо завести банковскую карту
							{props.bank === 'SBER' ? ' Сбербанк' : ''}
							{props.bank === 'VTB' ? ' ВТБ' : ''}
						</span>
					</>
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
						<p className="font-content-font font-normal mb-[18px] flex items-start text-black opacity-[80%] text-[16px]/[20px]">
							Комментарий
						</p>
						<TextArea
							autoSize={{ minRows: 4, maxRows: 8 }}
							style={{ height: 107, resize: 'none', width: 520 }}
							onChange={checkInputChange}
						/>
						<div className="mt-[40px] flex gap-[12px] w-full justify-end ">
							{props.stage === 2 && (
								<Button
									className="rounded-[54.5px] py-[12px] px-[24px]  text-[16px]"
									type="primary"
									onClick={() => {
										changeStatus({
											status: 'REFINE',
											comment: textRef.current,
											subStageId: props.stage
										})
										dispatch(setSecondStageStatus('REFINE'))
										dispatch(setSecondStageCommentVisibility('visible'))
										openAlert({ type: 'info', text: 'Этап успешно отправлен на доработку' })
										setIsRevisionModalOpen(false)
									}}
								>
									Отправить
								</Button>
							)}
							{props.stage === 3 && (
								<Button
									className="rounded-[54.5px] py-[12px] px-[24px]  text-[16px]"
									type="primary"
									onClick={() => {
										changeStatus({
											status: 'REFINE',
											comment: textRef.current,
											subStageId: props.stage
										})
										dispatch(setThirdStageStatus('REFINE'))
										dispatch(setThirdStageCommentVisibility('visible'))
										openAlert({ type: 'info', text: 'Этап успешно отправлен на доработку' })
										setIsRevisionModalOpen(false)
									}}
								>
									Отправить
								</Button>
							)}
							{props.stage === 4 && (
								<Button
									className="rounded-[54.5px] py-[12px] px-[24px]  text-[16px]"
									type="primary"
									onClick={() => {
										changeStatus({
											status: 'REFINE',
											comment: textRef.current,
											subStageId: props.stage
										})
										dispatch(setForthStageStatus('REFINE'))
										openAlert({ type: 'info', text: 'Этап успешно отправлен на доработку' })
										setIsRevisionModalOpen(false)
									}}
								>
									Отправить
								</Button>
							)}
							{props.stage === 5 && props.role === 'accounting' && (
								<Button
									className="rounded-[54.5px] py-[12px] px-[24px]  text-[16px]"
									type="primary"
									onClick={() => {
										changeStatusAccounting({
											status: 'REFINE',
											comment: textRef.current,
											subStageId: props.stage
										})
										dispatch(setFifthStageStatus('REFINE'))
										openAlert({ type: 'info', text: 'Этап успешно отправлен на доработку' })
										setIsRevisionModalOpen(false)
									}}
								>
									Отправить
								</Button>
							)}
						</div>
					</Modal>
				</ConfigProvider>
			</>
		)
	}

	return (
		<>
			<ReqModal></ReqModal>
			<StageStatusModal></StageStatusModal>
			<div className="p-[20px] pr-[0px] gap-[20px] flex flex-col w-full bg-[#FFFFFF]">
				<div className="flex flex-row items-center justify-between min-h-[32px]">
					{props.stage === 2 && (
						<div className="flex flex-row gap-[37px]">
							<h3 className="font-bold text-[16px]/[19.2px]">2 ЭТАП</h3>
							<h3 className="font-normal text-[18px]/[21.6px]">«Прикрепление документов»</h3>
						</div>
					)}
					{props.stage === 3 && (
						<div className="flex flex-row gap-[37px]">
							<h3 className="font-bold text-[16px]/[19.2px]">3 ЭТАП</h3>
							<h3 className="font-normal text-[18px]/[21.6px]">«Медицинский осмотр»</h3>
						</div>
					)}
					{props.stage === 4 && (
						<div className="flex flex-row gap-[37px]">
							<h3 className="font-bold text-[16px]/[19.2px]">4 ЭТАП</h3>
							<h3 className="font-normal text-[18px]/[21.6px]">«Инструктаж»</h3>
						</div>
					)}
					{props.stage === 5 && (
						<div className="flex flex-row gap-[37px]">
							<h3 className="font-bold text-[16px]/[19.2px]">5 ЭТАП</h3>
							<h3 className="font-normal text-[18px]/[21.6px]">«Реквизиты»</h3>
						</div>
					)}
					<StageStatusComponent></StageStatusComponent>
				</div>
				<StageContentComponent></StageContentComponent>
			</div>
		</>
	)
}
