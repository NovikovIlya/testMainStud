import { MessageReadSvg } from '../../../assets/svg/MessageReadSvg'
import { MessageUnreadSvg } from '../../../assets/svg/MessageUnreadSvg'
import { ChatMessageType } from '../../../store/type'

export const ChatMessage = (props: { msgData: ChatMessageType }) => {
	return (
		<>
			{' '}
			<div
				// ref={
				//     props.msgData.id === messages[messages.length - 1].id
				//         ? chatPageRef
				//         : undefined
				// }
				className="self-end w-[50%] rounded-[16px] rounded-br-none bg-[#4F6AFB1A] bg-opacity-10 p-[20px] flex flex-col font-content-font font-normal text-black text-[16px]/[19.2px]"
			>
				<p className="whitespace-pre-line">{props.msgData.text}</p>
				<div className="flex items-center gap-[12px]">
					<p className="ml-auto font-content-font font-normal text-black text-[12px]/[14.4px] opacity-[52%]">
						{/* {msg.sendDate.substring(11, 16)} */}
					</p>
					{props.msgData.read ? <MessageReadSvg /> : <MessageUnreadSvg />}
				</div>
			</div>
		</>
	)
}
