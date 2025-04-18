import { Button, ConfigProvider, Form, Input, Modal } from 'antd'
import { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'

import { GreenCheck } from '../../../../assets/svg/GreenCheck'
import { SuccessModalIconSvg } from '../../../../assets/svg/SuccessModalIconSvg'
import { useAppSelector } from '../../../../store'
import {
	useChangeEmploymentStageAccountingStatusRequestMutation,
	useChangeEmploymentStageStatusRequestMutation,
	useMarkBankCardApplicationFormedMutation
} from '../../../../store/api/serviceApi'
import { setFifthStageCommentVisibility } from '../../../../store/reducers/EmploymentStageReducers/comments/FifthStageCommentVisibilitySlice'
import { setSecondStageCommentVisibility } from '../../../../store/reducers/EmploymentStageReducers/comments/SecondStageCommentVisibilitySlice'
import { setThirdStageCommentVisibility } from '../../../../store/reducers/EmploymentStageReducers/comments/ThirdStageCommentVisibilitySlice'
import { setFifthStageStatus } from '../../../../store/reducers/EmploymentStageReducers/stages/FifthStageStatusSlice'
import { setForthStageStatus } from '../../../../store/reducers/EmploymentStageReducers/stages/ForthStageStatusSlice'
import { setSecondStageStatus } from '../../../../store/reducers/EmploymentStageReducers/stages/SecondStageStatusSlice'
import { setThirdStageStatus } from '../../../../store/reducers/EmploymentStageReducers/stages/ThirdStageStatusSlice'
import { useAlert } from '../../../../utils/Alert/AlertMessage'

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
	type: string
	role: string
	bank: string
	stageStatus: string
	comment: string
	documentArray: Document[] | undefined
}

export const DepEmploymentStageItem = (props: DepEmploymentStageItemProps) => {
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
	const [isReqModalSuccessOpen, setIsReqModalSuccessOpen] = useState(false)

	const dispatch = useDispatch()

	const [markBankCardApplicationFormed, { isLoading: markBankCardApplicationFormedLoading }] =
		useMarkBankCardApplicationFormedMutation()
	const [changeStatus, { isLoading: changeStatusLoading }] = useChangeEmploymentStageStatusRequestMutation()
	const [changeStatusAccounting, { isLoading: changeStatusAccountingLoading }] =
		useChangeEmploymentStageAccountingStatusRequestMutation()

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
								className="rounded-[54.5px] text-[14px] w-full min-h-[40px] py-[13px]"
								type="primary"
								onClick={async () => {
									try {
										setIsReqModalOpen(false)
										await markBankCardApplicationFormed({ subStageId: props.stage })
											.unwrap()
											.then(() => {
												dispatch(setFifthStageStatus('ACCEPTED'))
												setIsReqModalSuccessOpen(true)
											})
									} catch (error: any) {
										openAlert({ type: 'error', text: 'Извините, что-то пошло не так...' })
									}
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

	const ReqModalSuccess = () => {
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
						open={isReqModalSuccessOpen}
						onCancel={() => {
							setIsReqModalSuccessOpen(false)
						}}
						title={null}
						footer={null}
						width={407}
					>
						<div className="flex flex-col items-center px-[15px] pt-[50px] pb-[30px] gap-[34px]">
							<SuccessModalIconSvg></SuccessModalIconSvg>
							<p className="text-center font-content-font font-normal flex items-start text-black text-[16px]/[20px]">
								Заявление успешно сформировано
							</p>
							<Button
								className="rounded-[54.5px] text-[14px] w-full min-h-[40px] py-[13px]"
								type="primary"
								onClick={() => {
									setIsReqModalSuccessOpen(false)
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
				{props.type === 'SECOND' && (
					<div className="min-w-[300px] items-left">
						{props.stageStatus === 'VERIFYING' && secondStageStatus.secondStageStatus === 'VERIFYING' && (
							<div className="flex flex-row gap-[12px]">
								<Button
									className="text-[#FFFFFF] py-[8px] px-[24px] border-none rounded-[54.5px] text-[16px] font-normal"
									type="primary"
									loading={changeStatusLoading}
									onClick={async () => {
										try {
											await changeStatus({
												status: 'ACCEPTED',
												comment: textRef.current,
												subStageId: props.stage
											})
												.unwrap()
												.then(() => {
													dispatch(setSecondStageStatus('ACCEPTED'))
													dispatch(setSecondStageCommentVisibility('invisible'))
													openAlert({ type: 'success', text: 'Этап успешно принят' })
												})
										} catch (error: any) {
											openAlert({ type: 'error', text: 'Извините, что-то пошло не так...' })
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
				{props.type === 'FOURTH' && (
					<div className="min-w-[300px] items-left">
						{props.stageStatus === 'VERIFYING' && thirdStageStatus.thirdStageStatus === 'VERIFYING' && (
							<div className="flex flex-row gap-[12px] items-left">
								<Button
									className="text-[#FFFFFF] py-[8px] px-[24px] border-none rounded-[54.5px] text-[16px] font-normal"
									type="primary"
									loading={changeStatusLoading}
									onClick={async () => {
										try {
											await changeStatus({
												status: 'ACCEPTED',
												comment: textRef.current,
												subStageId: props.stage
											})
												.unwrap()
												.then(() => {
													dispatch(setThirdStageStatus('ACCEPTED'))
													dispatch(setThirdStageCommentVisibility('invisible'))
													openAlert({ type: 'success', text: 'Этап успешно принят' })
												})
										} catch (error: any) {
											openAlert({ type: 'error', text: 'Извините, что-то пошло не так...' })
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
				{props.type === 'SIXTH' && props.role === 'accounting' && (
					<div className="min-w-[300px] items-left">
						{props.stageStatus === 'VERIFYING' && fifthStageStatus.fifthStageStatus === 'VERIFYING' && (
							<div className="flex flex-row gap-[12px]">
								<Button
									className="text-[#FFFFFF] py-[8px] px-[24px] border-none rounded-[54.5px] text-[16px] font-normal"
									type="primary"
									loading={changeStatusAccountingLoading}
									onClick={async () => {
										try {
											await changeStatusAccounting({
												status: 'ACCEPTED',
												comment: textRef.current,
												subStageId: props.stage
											})
												.unwrap()
												.then(() => {
													dispatch(setFifthStageStatus('ACCEPTED'))
													dispatch(setFifthStageCommentVisibility('invisible'))
													openAlert({ type: 'success', text: 'Этап успешно принят' })
												})
										} catch (error: any) {
											openAlert({ type: 'error', text: 'Извините, что-то пошло не так...' })
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
				{props.type === 'SIXTH' && props.role === 'personnel' && (
					<div className="min-w-[300px] items-left">
						{props.stageStatus === 'VERIFYING' && fifthStageStatus.fifthStageStatus === 'VERIFYING' && (
							<div className="flex flex-row gap-[12px]">
								<Button
									className="text-[#FFFFFF] py-[8px] px-[24px] border-none rounded-[54.5px] text-[16px] font-normal"
									type="primary"
									loading={markBankCardApplicationFormedLoading}
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
				{props.type === 'SECOND' && (
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
				{props.type === 'FOURTH' && (
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
				{props.type === 'FIFTH' && (
					<>
						<div className="flex flex-row gap-[12px]">
							<GreenCheck></GreenCheck>
							<span className="text-[16px]/[19.2px] font-normal">Соискатель прошел инструктаж</span>
						</div>
					</>
				)}
				{props.type === 'SIXTH' && props.role === 'accounting' && (
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
				{props.type === 'SIXTH' && props.role === 'personnel' && (
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
						<Form layout="vertical" requiredMark={false}>
							<p className="font-content-font font-normal mb-[18px] flex items-start text-black opacity-[80%] text-[16px]/[20px]">
								Комментарий
							</p>
							<Form.Item
								name={'comment'}
								rules={[
									{ required: true, message: 'Не написан комментарий' },
									{ max: 2000, message: 'Количество символов было превышено' },
									{ min: 1, message: 'Не написан комментарий' }
								]}
							>
								<TextArea
									autoSize={{ minRows: 4, maxRows: 8 }}
									style={{ height: 107, resize: 'none', width: 520 }}
									onChange={checkInputChange}
								/>
							</Form.Item>

							<div className="mt-[40px] flex gap-[12px] w-full justify-end ">
								{props.type === 'SECOND' && (
									<Button
										className="rounded-[54.5px] py-[12px] px-[24px]  text-[16px]"
										type="primary"
										loading={changeStatusLoading}
										onClick={async () => {
											try {
												setIsRevisionModalOpen(false)
												await changeStatus({
													status: 'REFINE',
													comment: textRef.current,
													subStageId: props.stage
												})
													.unwrap()
													.then(() => {
														dispatch(setSecondStageStatus('REFINE'))
														dispatch(setSecondStageCommentVisibility('visible'))
														openAlert({
															type: 'success',
															text: 'Этап успешно отправлен на доработку'
														})
													})
											} catch (error: any) {
												openAlert({ type: 'error', text: 'Извините, что-то пошло не так...' })
											}
										}}
									>
										Отправить
									</Button>
								)}
								{props.type === 'FOURTH' && (
									<Button
										className="rounded-[54.5px] py-[12px] px-[24px]  text-[16px]"
										type="primary"
										loading={changeStatusLoading}
										onClick={async () => {
											try {
												setIsRevisionModalOpen(false)
												await changeStatus({
													status: 'REFINE',
													comment: textRef.current,
													subStageId: props.stage
												})
													.unwrap()
													.then(() => {
														dispatch(setThirdStageStatus('REFINE'))
														dispatch(setThirdStageCommentVisibility('visible'))
														openAlert({
															type: 'success',
															text: 'Этап успешно отправлен на доработку'
														})
													})
											} catch (error: any) {
												openAlert({ type: 'error', text: 'Извините, что-то пошло не так...' })
											}
										}}
									>
										Отправить
									</Button>
								)}
								{props.type === 'FIFTH' && (
									<Button
										className="rounded-[54.5px] py-[12px] px-[24px]  text-[16px]"
										type="primary"
										loading={changeStatusLoading}
										onClick={async () => {
											try {
												setIsRevisionModalOpen(false)
												await changeStatus({
													status: 'REFINE',
													comment: textRef.current,
													subStageId: props.stage
												})
													.unwrap()
													.then(() => {
														dispatch(setForthStageStatus('REFINE'))
														openAlert({
															type: 'success',
															text: 'Этап успешно отправлен на доработку'
														})
													})
											} catch (error: any) {
												openAlert({ type: 'error', text: 'Извините, что-то пошло не так...' })
											}
										}}
									>
										Отправить
									</Button>
								)}
								{props.type === 'SIXTH' && props.role === 'accounting' && (
									<Button
										className="rounded-[54.5px] py-[12px] px-[24px]  text-[16px]"
										type="primary"
										loading={changeStatusAccountingLoading}
										onClick={async () => {
											try {
												await changeStatusAccounting({
													status: 'REFINE',
													comment: textRef.current,
													subStageId: props.stage
												})
													.unwrap()
													.then(() => {
														setIsRevisionModalOpen(false)
														dispatch(setFifthStageStatus('REFINE'))
														openAlert({
															type: 'success',
															text: 'Этап успешно отправлен на доработку'
														})
													})
											} catch (error: any) {
												openAlert({ type: 'error', text: 'Извините, что-то пошло не так...' })
											}
										}}
									>
										Отправить
									</Button>
								)}
							</div>
						</Form>
					</Modal>
				</ConfigProvider>
			</>
		)
	}

	return (
		<>
			<ReqModal></ReqModal>
			<ReqModalSuccess></ReqModalSuccess>
			<StageStatusModal></StageStatusModal>
			<div className="p-[20px] pr-[0px] gap-[20px] flex flex-col w-full bg-[#FFFFFF]">
				<div className="flex flex-row items-center justify-between min-h-[32px]">
					{props.type === 'SECOND' && (
						<div className="flex flex-row gap-[37px]">
							<h3 className="font-bold text-[16px]/[19.2px]">1 ЭТАП</h3>
							<h3 className="font-normal text-[18px]/[21.6px]">«Прикрепление документов»</h3>
						</div>
					)}
					{props.type === 'FOURTH' && (
						<div className="flex flex-row gap-[37px]">
							<h3 className="font-bold text-[16px]/[19.2px]">2 ЭТАП</h3>
							<h3 className="font-normal text-[18px]/[21.6px]">«Медицинский осмотр»</h3>
						</div>
					)}
					{props.type === 'FIFTH' && (
						<div className="flex flex-row gap-[37px]">
							<h3 className="font-bold text-[16px]/[19.2px]">3 ЭТАП</h3>
							<h3 className="font-normal text-[18px]/[21.6px]">«Инструктаж»</h3>
						</div>
					)}
					{props.type === 'SIXTH' && (
						<div className="flex flex-row gap-[37px]">
							<h3 className="font-bold text-[16px]/[19.2px]">4 ЭТАП</h3>
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
