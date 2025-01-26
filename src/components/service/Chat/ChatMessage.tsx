import clsx from 'clsx'
import dayjs from 'dayjs'
import { forwardRef, useEffect, useState } from 'react'
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
	useGetRespondFullInfoQuery
} from '../../../store/api/serviceApi'
import { useLazyGetVacancyViewQuery } from '../../../store/api/serviceApi'
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

	const currentUrl = useLocation()
	const match = currentUrl.pathname.match(/\/id\/(\d+)$/)

	let id_from_url: string | number

	if (match) {
		id_from_url = match[1]
	} else {
		console.error('id miss')
	}

	const [answerMainTime] = useAnswerToInivitationMainTimeMutation()
	const [getVacancy, result] = useLazyGetVacancyViewQuery()

	const { data: respond_data, isLoading: loading, refetch } = useGetRespondFullInfoQuery(id_from_url)

	console.log(respond_data?.status)

	const [isSeekerOnStatusInvitation, setIsSeekerOnStatusInvitation] = useState<boolean>(
		respond_data?.status === 'INVITATION'
	)

	const [isSeekerOnStatusEmploymentRequest, setIsSeekerOnStatusEmploymentRequest] = useState<boolean>(
		respond_data?.status === 'EMPLOYMENT_REQUEST'
	)

	console.log(isSeekerOnStatusEmploymentRequest)
	console.log(isSeekerOnStatusInvitation)

	useEffect(() => {
		setIsSeekerOnStatusInvitation(respond_data?.status === 'INVITATION')
		setIsSeekerOnStatusEmploymentRequest(respond_data?.status === 'EMPLOYMENT_REQUEST')
	}, [respond_data])

	const dispatch = useDispatch()
	const navigate = useNavigate()
	const [answerReserveTime] = useAnswerToInvitationReserveTimeRequestMutation()
	const [answerEmploymentRequest] = useAnswerEmploymentRequestMutation()

	return (
		<>
			{' '}
			<div
				ref={ref}
				className={clsx(
					'rounded-[16px] max-w-[50%] p-[20px] flex flex-col gap-[16px] font-content-font font-normal text-black text-[16px]/[19.2px]',
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
							getVacancy(currentVacancyId)
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
					<button
						onClick={() => {
							answerMainTime({ id: respondId, ans: 'YES' }).then(() => {
								setIsSeekerOnStatusInvitation(false)
							})
						}}
						disabled={isEmpDep || !isSeekerOnStatusInvitation}
						className="rounded-[54.5px] bg-inherit outline-none border cursor-pointer"
					>
						Да
					</button>
					<button
						onClick={() => {
							answerMainTime({ id: respondId, ans: 'NO' }).then(() => {
								setIsSeekerOnStatusInvitation(false)
							})
						}}
						disabled={isEmpDep || !isSeekerOnStatusInvitation}
						className="rounded-[54.5px] bg-inherit outline-none border cursor-pointer"
					>
						Не удобно
					</button>
					<button
						onClick={() => {
							answerMainTime({ id: respondId, ans: 'NOT_RELEVANT' }).then(() => {
								setIsSeekerOnStatusInvitation(false)
							})
						}}
						disabled={isEmpDep || !isSeekerOnStatusInvitation}
						className="col-span-2 rounded-[54.5px] bg-inherit outline-none border cursor-pointer"
					>
						Вакансия не актуальна
					</button>
				</div>
			)}
			{props.msgData.type === 'INVITATION_RESERVE' && props.msgData.reserveTimes !== null && (
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
					<div className="mt-[24px] w-[100%] flex flex-col gap-[14px]">
						<div className="flex flex-row gap-[20px] justify-between ">
							{props.msgData.reserveTimes.map(time => (
								<button
									onClick={() => {
										answerReserveTime({
											respondId: respondId,
											time: time
										}).then(() => {
											setIsSeekerOnStatusInvitation(false)
										})
									}}
									disabled={isEmpDep || !isSeekerOnStatusInvitation}
									className="w-full text-[16px]/[19.2px] rounded-[54.5px] py-[12px] px-[20px] text-center bg-inherit outline-none border cursor-pointer test:px-[12px]"
								>
									{time.substring(0, 10).split('-').reverse().join('.') + ', ' + time.substring(11, 16)}
								</button>
							))}
						</div>
						<button
							onClick={() => {
								answerReserveTime({ respondId: respondId }).then(() => {
									setIsSeekerOnStatusInvitation(false)
								})
							}}
							disabled={isEmpDep || !isSeekerOnStatusInvitation}
							className="text-[16px]/[19.2px]  rounded-[54.5px]  py-[12px] px-[56px] bg-inherit outline-none border cursor-pointer"
						>
							Нет подходящего времени
						</button>
					</div>
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
						<button
							onClick={() => {
								answerEmploymentRequest({ respondId: respondId, answer: 'YES' }).then(() => {
									setIsSeekerOnStatusEmploymentRequest(false)
								})
							}}
							disabled={isEmpDep || !isSeekerOnStatusEmploymentRequest}
							className="w-6/12 text-[16px]/[19.2px] rounded-[54.5px]  text-center bg-inherit outline-none border cursor-pointer"
						>
							Да
						</button>
						<button
							onClick={() => {
								answerEmploymentRequest({ respondId: respondId, answer: 'NO' }).then(() => {
									setIsSeekerOnStatusEmploymentRequest(false)
								})
							}}
							disabled={isEmpDep || !isSeekerOnStatusEmploymentRequest}
							className="w-6/12 text-[16px]/[19.2px] rounded-[54.5px] text-center py-[12px] bg-inherit outline-none border cursor-pointer"
						>
							Нет
						</button>
					</div>
				</div>
			)}
		</>
	)
})
