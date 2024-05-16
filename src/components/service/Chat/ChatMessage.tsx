import clsx from 'clsx'
import { forwardRef } from 'react'

import { ArrowToTheRight } from '../../../assets/svg/ArrowToTheRight'
import { MessageReadSvg } from '../../../assets/svg/MessageReadSvg'
import { MessageUnreadSvg } from '../../../assets/svg/MessageUnreadSvg'
import { useAppSelector } from '../../../store'
import { useAnswerToInivitationMainTimeMutation } from '../../../store/api/serviceApi'
import { ChatMessageType } from '../../../store/type'

import { ChatMessageFile } from './ChatMessageFile'

type Props = { msgData: ChatMessageType } & { senderChange: boolean }
type Ref = HTMLDivElement

export const ChatMessage = forwardRef<Ref, Props>((props, ref) => {
	const { user } = useAppSelector(state => state.auth)
	const { vacancyTitle } = useAppSelector(state => state.currentVacancyName)
	const { respondId } = useAppSelector(state => state.respondId)
	const isSeeker = user?.roles[0].type === 'STUD'
	const isEmpDep = user?.roles.find(role => role.type === 'EMPL')

	const [answerMainTime] = useAnswerToInivitationMainTimeMutation()

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
					}
				)}
			>
				{props.msgData.type === 'RESPOND' && (
					<div className="cursor-pointer" onClick={() => {}}>
						<div className="flex items-center justify-between">
							<div>
								<p className="font-bold">Отклик на вакансию</p>
								<p>{vacancyTitle}</p>
							</div>
							<ArrowToTheRight />
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
						{props.msgData.sendDate.substring(11, 16)}
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
				<div className="mt-[24px] max-w-[50%] grid grid-cols-2 grid-rows-[40px_40px] gap-[20px]">
					<button
						onClick={() => {
							answerMainTime({ id: respondId, ans: 'YES' })
						}}
						className="rounded-[54.5px] bg-inherit outline-none border cursor-pointer"
					>
						Да
					</button>
					<button
						onClick={() => {
							answerMainTime({ id: respondId, ans: 'NO' })
						}}
						className="rounded-[54.5px] bg-inherit outline-none border cursor-pointer"
					>
						Не удобно
					</button>
					<button
						onClick={() => {
							answerMainTime({ id: respondId, ans: 'NOT_RELEVANT' })
						}}
						className="col-span-2 rounded-[54.5px] bg-inherit outline-none border cursor-pointer"
					>
						Вакансия не актуальна
					</button>
				</div>
			)}
		</>
	)
})
