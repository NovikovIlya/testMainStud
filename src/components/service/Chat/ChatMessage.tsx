import clsx from 'clsx'

import { MessageReadSvg } from '../../../assets/svg/MessageReadSvg'
import { MessageUnreadSvg } from '../../../assets/svg/MessageUnreadSvg'
import { useAppSelector } from '../../../store'
import { ChatMessageType } from '../../../store/type'

export const ChatMessage = (props: { msgData: ChatMessageType }) => {
	const { user } = useAppSelector(state => state.auth)
	const isSeeker = user?.roles[0].type === 'STUD'
	const isEmpDep = user?.roles.find(role => role.type === 'EMPL')

	return (
		<>
			{' '}
			<div
				// ref={
				//     props.msgData.id === messages[messages.length - 1].id
				//         ? chatPageRef
				//         : undefined
				// }
				// className="self-end w-[50%] rounded-[16px] rounded-br-none bg-[#4F6AFB1A] bg-opacity-10 p-[20px] flex flex-col font-content-font font-normal text-black text-[16px]/[19.2px]"
				className={clsx(
					'rounded-[16px] w-[50%] p-[20px] flex flex-col font-content-font font-normal text-black text-[16px]/[19.2px]',
					{
						'self-start rounded-bl-none bg-white':
							(props.msgData.sender === 'SEEKER' && isEmpDep) ||
							(props.msgData.sender === 'PERSONNEL_DEPARTMENT' && !isEmpDep),
						'self-end rounded-br-none bg-[#4F6AFB1A] bg-opacity-10':
							(props.msgData.sender === 'SEEKER' && !isEmpDep) ||
							(props.msgData.sender === 'PERSONNEL_DEPARTMENT' && isEmpDep)
					}
				)}
			>
				<p className="whitespace-pre-line">{props.msgData.text}</p>
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
		</>
	)
}
