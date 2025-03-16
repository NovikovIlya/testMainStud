import { Button } from 'antd'
import clsx from 'clsx'
import dayjs from 'dayjs'
import { forwardRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

import { ArrowToTheRight } from '../../../assets/svg/ArrowToTheRight'
import { MessageReadSvg } from '../../../assets/svg/MessageReadSvg'
import { MessageUnreadSvg } from '../../../assets/svg/MessageUnreadSvg'
import { useAppSelector } from '../../../store'
import {
	useAnswerEmploymentRequestMutation,
	useAnswerToInivitationMainTimeMutation,
	useAnswerToInvitationReserveTimeRequestMutation,
	useLazyGetVacancyViewQuery
} from '../../../store/api/serviceApi'
import { setCurrentVacancy } from '../../../store/reducers/CurrentVacancySlice'
import { ChatMessageType } from '../../../store/reducers/type'

import { ChatMessageFile } from './ChatMessageFile'

type Props = { msgData: ChatMessageType } & { senderChange: boolean }
type Ref = HTMLDivElement

export const ChatMessage = forwardRef<Ref, Props>((props, ref) => {
	const { user } = useAppSelector(state => state.auth)
	const { vacancyTitle } = useAppSelector(state => state.currentVacancyName)
	const { respondId } = useAppSelector(state => state.respondId)
	const { currentVacancyId } = useAppSelector(state => state.currentVacancyId)
	const isSeeker = user?.roles[0].type === 'STUD'
	const isEmpDep = user?.roles.find(role => role.type === 'EMPL')
	const current_role = isSeeker === true ? 'SEEKER' : 'PERSONNEL_DEPARTMENT'

	const currentUrl = useLocation()
	const match = currentUrl.pathname.match(/\/id\/(\d+)$/)

	let id_from_url: string
	let page_id: number

	if (match) {
		id_from_url = match[1]
	} else {
		console.error('id miss')
	}
	page_id = Number(id_from_url)

	const [answerMainTime, { isLoading: answerMainTimeLoading }] = useAnswerToInivitationMainTimeMutation()
	const [getVacancy, result] = useLazyGetVacancyViewQuery()

	const [isResponsed, setIsResponsed] = useState<boolean>(props.msgData.responsed)

	const dispatch = useDispatch()
	const navigate = useNavigate()
	const [answerReserveTime, { isLoading: answerReserveTimeLoading }] = useAnswerToInvitationReserveTimeRequestMutation()
	const [answerEmploymentRequest, { isLoading: answerEmploymentRequestLoading }] = useAnswerEmploymentRequestMutation()

	return (
		<>
			{' '}
			<div
				ref={ref}
				className={clsx(
					'rounded-[16px] min-w-[50%] max-w-[50%] p-[20px] flex flex-col gap-[16px] font-content-font font-normal text-black text-[16px]/[19.2px]',
					{
						'self-start rounded-bl-none bg-white':
							(props.msgData.sender === 'SEEKER' && isEmpDep) ||
							(props.msgData.sender === 'PERSONNEL_DEPARTMENT' && !isEmpDep),
						'self-end rounded-br-none bg-[#4F6AFB1A] bg-opacity-10':
							(props.msgData.sender === 'SEEKER' && !isEmpDep) ||
							(props.msgData.sender === 'PERSONNEL_DEPARTMENT' && isEmpDep)
					},
					{
						'mt-[24px]': props.senderChange,
						'mt-[12px]': !props.senderChange
					},
					{
						'min-w-[50%]': props.msgData.type === 'RESPOND' || props.msgData.fileInfos
					}
				)}
			>
				{props.msgData.type === 'RESPOND' && (
					<div
						className="cursor-pointer"
						onClick={() => {
							getVacancy(currentVacancyId) /// TODO currentVacancyId умирает после f5, нужно либо брать запросом, либо закидывать в url
								.unwrap()
								.then(result => {
									dispatch(setCurrentVacancy(result))
									isEmpDep
										? navigate(`/services/personnelaccounting/chat/vacancyview/${currentVacancyId}`)
										: navigate(`/services/myresponds/chat/vacancyview/${currentVacancyId}`)
								})
						}}
					>
						<div className="flex items-center">
							<div>
								<p className="font-bold">Отклик на вакансию</p>
								<p>{vacancyTitle}</p>
							</div>
							<div className="ml-auto">
								<ArrowToTheRight />
							</div>
						</div>
						<div className="h-[1px] bg-black bg-opacity-[24%] mt-[16px]"></div>
					</div>
				)}
				<p className="whitespace-pre-line">{props.msgData.text}</p>
				{props.msgData.fileInfos && (
					<div className="flex flex-col gap-[8px]">
						{props.msgData.fileInfos.map(fileInfo => (
							<ChatMessageFile {...fileInfo} msgId={props.msgData.id} />
						))}
					</div>
				)}
				<div className="flex items-center gap-[12px]">
					<p className="ml-auto font-content-font font-normal text-black text-[12px]/[14.4px] opacity-[52%]">
						{/* {props.msgData.sendDate.substring(11, 16)} */}
						{dayjs(props.msgData.sendDate).format().substring(11, 16)}
					</p>
					{(props.msgData.sender === 'SEEKER' && !isEmpDep) ||
					(props.msgData.sender === 'PERSONNEL_DEPARTMENT' && isEmpDep) ? (
						props.msgData.read ? (
							<MessageReadSvg />
						) : (
							<MessageUnreadSvg />
						)
					) : (
						<></>
					)}
				</div>
			</div>
			{props.msgData.type === 'INVITATION' && (
				<div
					className={clsx('mt-[24px] w-[50%] grid grid-cols-2 grid-rows-[40px_40px] gap-[20px]', {
						'self-start':
							(props.msgData.sender === 'SEEKER' && isEmpDep) ||
							(props.msgData.sender === 'PERSONNEL_DEPARTMENT' && !isEmpDep),
						'self-end':
							(props.msgData.sender === 'SEEKER' && !isEmpDep) ||
							(props.msgData.sender === 'PERSONNEL_DEPARTMENT' && isEmpDep)
					})}
				>
					<Button
						onClick={() => {
							answerMainTime({ id: page_id, ans: 'YES', messageId: props.msgData.id }).then(() => {
								setIsResponsed(true)
							})
						}}
						loading={answerMainTimeLoading}
						disabled={isEmpDep || isResponsed}
						className={`rounded-[54.5px] h-full border-black bg-inherit outline-none border cursor-pointer ${
							isEmpDep || isResponsed ? 'select-none !cursor-not-allowed' : ''
						}`}
					>
						Да
					</Button>
					<Button
						onClick={() => {
							answerMainTime({ id: page_id, ans: 'NO', messageId: props.msgData.id }).then(() => {
								setIsResponsed(true)
							})
						}}
						disabled={isEmpDep || isResponsed}
						className={`rounded-[54.5px] h-full border-black bg-inherit outline-none border cursor-pointer ${
							isEmpDep || isResponsed ? 'select-none !cursor-not-allowed' : ''
						}`}
					>
						Не удобно
					</Button>
					<Button
						onClick={() => {
							answerMainTime({
								id: page_id,
								ans: 'NOT_RELEVANT',
								messageId: props.msgData.id
							}).then(() => {
								setIsResponsed(true)
							})
						}}
						disabled={isEmpDep || isResponsed}
						className={`col-span-2 rounded-[54.5px] h-full border-black bg-inherit outline-none border cursor-pointer ${
							isEmpDep || isResponsed ? 'select-none !cursor-not-allowed' : ''
						}`}
					>
						Вакансия не актуальна
					</Button>
				</div>
			)}
			{props.msgData.type === 'INVITATION_RESERVE' && props.msgData.reserveTimes !== null && (
				<div
					className={clsx('mt-[24px] w-[50%] grid grid-cols-3 grid-rows-[40px_40px] gap-[20px]', {
						'self-start':
							(props.msgData.sender === 'SEEKER' && isEmpDep) ||
							(props.msgData.sender === 'PERSONNEL_DEPARTMENT' && !isEmpDep),
						'self-end':
							(props.msgData.sender === 'SEEKER' && !isEmpDep) ||
							(props.msgData.sender === 'PERSONNEL_DEPARTMENT' && isEmpDep)
					})}
				>
					{props.msgData.reserveTimes.map(time => (
						<Button
							onClick={() => {
								answerReserveTime({
									respondId: page_id,
									time: time,
									messageId: props.msgData.id
								}).then(() => {
									setIsResponsed(true)
								})
							}}
							disabled={isEmpDep || isResponsed}
							loading={answerReserveTimeLoading}
							className={`w-full text-[16px]/[19.2px] text-wrap h-full border-black rounded-[54.5px] py-[12px] px-[20px] text-center bg-inherit outline-none border cursor-pointer test:px-[12px]  ${
								isEmpDep || isResponsed ? 'select-none !cursor-not-allowed' : ''
							}`}
						>
							{time.substring(0, 10).split('-').reverse().join('.') + ', ' + time.substring(11, 16)}
						</Button>
					))}
					<Button
						onClick={() => {
							answerReserveTime({ respondId: page_id, messageId: props.msgData.id }).then(() => {
								setIsResponsed(true)
							})
						}}
						loading={answerReserveTimeLoading}
						disabled={isEmpDep || isResponsed}
						className={`row-span-2 col-span-3 text-[16px]/[19.2px] h-full border-black rounded-[54.5px]  py-[12px] px-[56px] bg-inherit outline-none border cursor-pointer ${
							isEmpDep || isResponsed ? 'select-none !cursor-not-allowed' : ''
						}`}
					>
						Нет подходящего времени
					</Button>
				</div>
			)}
			{props.msgData.type === 'EMPLOYMENT_REQUEST' && (
				<div
					className={clsx('w-[50%] flex flex-col', {
						'self-start':
							(props.msgData.sender === 'SEEKER' && isEmpDep) ||
							(props.msgData.sender === 'PERSONNEL_DEPARTMENT' && !isEmpDep),
						'self-end':
							(props.msgData.sender === 'SEEKER' && !isEmpDep) ||
							(props.msgData.sender === 'PERSONNEL_DEPARTMENT' && isEmpDep)
					})}
				>
					<div className="mt-[24px] w-[100%] flex flex-row gap-[20px]">
						<Button
							onClick={() => {
								answerEmploymentRequest({
									respondId: page_id,
									answer: 'YES',
									messageId: props.msgData.id
								}).then(() => {
									setIsResponsed(true)
								})
							}}
							loading={answerEmploymentRequestLoading}
							disabled={isEmpDep || isResponsed}
							className={`w-6/12 text-[16px]/[19.2px] rounded-[54.5px] h-full border-black text-center bg-inherit outline-none border cursor-pointer ${
								isEmpDep || isResponsed ? 'select-none !cursor-not-allowed' : ''
							}`}
						>
							Да
						</Button>
						<Button
							onClick={() => {
								answerEmploymentRequest({
									respondId: page_id,
									answer: 'NO',
									messageId: props.msgData.id
								}).then(() => {
									setIsResponsed(true)
								})
							}}
							disabled={isEmpDep || isResponsed}
							loading={answerEmploymentRequestLoading}
							className={`w-6/12 text-[16px]/[19.2px] rounded-[54.5px] h-full border-black text-center py-[12px] bg-inherit outline-none border cursor-pointer ${
								isEmpDep || isResponsed ? 'select-none !cursor-not-allowed' : ''
							}`}
						>
							Нет
						</Button>
					</div>
				</div>
			)}
		</>
	)
})
