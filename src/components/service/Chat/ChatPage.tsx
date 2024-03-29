import { Button } from 'antd'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

import { MessageReadSvg } from '../../../assets/svg/MessageReadSvg'
import { MessageUnreadSvg } from '../../../assets/svg/MessageUnreadSvg'
import {
	useLazyGetChatMessagesQuery,
	usePostChatMessageMutation
} from '../../../store/api/serviceApi'
import {
	ChatMessageDateDisplayEnum,
	ChatMessageType
} from '../../../store/type'
import { AttachIcon } from '../jobSeeker/AttachIcon'

export const ChatPage = () => {
	const [getChatMessages, chatMessages] = useLazyGetChatMessagesQuery()
	const [postMsg, postMsgResult] = usePostChatMessageMutation()
	const chatPageRef = useRef<null | HTMLDivElement>(null)

	const [msgInputText, setMsgInputText] = useState<string>('')
	const msgDate = useRef<string>('')

	const scrollToBottom = () => {
		chatPageRef.current?.scrollIntoView()
	}

	useEffect(() => {
		console.log('I AM... SCROOOOOOLING')
		console.log(chatPageRef.current)
		scrollToBottom()
	}, [chatPageRef])

	const [messages, setMessages] = useState<ChatMessageType[]>([])

	useEffect(() => {
		getChatMessages({ chatId: 1, size: 5 })
			.unwrap()
			.then(msg => {
				setMessages(msg)
			})
	}, [])

	const { control, handleSubmit } = useForm()

	const handleMessage = () => {
		postMsg({ id: 1, text: msgInputText, name: 'Ilya' })
			.unwrap()
			.then(msgData => setMessages([msgData, ...messages]))
		setMsgInputText('')
		scrollToBottom()
	}

	console.log('Chat render')

	return (
		<>
			<div className="flex flex-col w-full">
				<div className="w-full h-full flex flex-col justify-between pt-[60px] pr-[85px] pl-[40px] overflow-auto">
					{[...messages].reverse().map(msg => (
						<>
							{msg.sendDate.substring(0, 10) !== msgDate.current &&
								((msgDate.current = msg.sendDate.substring(0, 10)),
								console.log(msg.sendDate.substring(0, 10)),
								(
									<div className="self-center font-content-font font-normal text-black text-[14px]/[16.8px] opacity-60">
										{parseInt(msg.sendDate.substring(8, 10)) +
											' ' +
											ChatMessageDateDisplayEnum[
												parseInt(msg.sendDate.substring(5, 7)) - 1
											]}
									</div>
								))}
							<div
								key={msg.id}
								ref={
									msg.id === messages[messages.length - 1].id
										? chatPageRef
										: undefined
								}
								className="self-end w-[50%] rounded-[16px] rounded-br-none bg-[#4F6AFB1A] bg-opacity-10 p-[20px] flex flex-col font-content-font font-normal text-black text-[16px]/[19.2px]"
							>
								<p className="whitespace-pre-line">{msg.text}</p>
								<div className="flex items-center gap-[12px]">
									<p className="ml-auto font-content-font font-normal text-black text-[12px]/[14.4px] opacity-[52%]">
										{msg.sendDate.substring(11, 16)}
									</p>
									{msg.read ? <MessageReadSvg /> : <MessageUnreadSvg />}
								</div>
							</div>
						</>
					))}
					{/* <div className="self-start w-[355px] rounded-[16px] rounded-bl-none bg-white p-[20px] flex flex-col font-content-font font-normal text-black text-[16px]/[19.2px]">
						<p className="w-full break-words hyphens-auto">
							АААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААА
						</p>
						<p className="ml-auto font-content-font font-normal text-black text-[12px]/[14.4px] opacity-[52%]">
							14:01
						</p>
					</div> */}
					<div key={'osobyi_kluch'} />
				</div>
				<div className="sticky bottom-0 h-[80px] w-full bg-white">
					<form
						onSubmit={handleSubmit(handleMessage)}
						className="w-full flex py-[24px] pl-[40px] pr-[85px]"
					>
						<textarea
							value={msgInputText}
							onChange={e => {
								setMsgInputText(e.target.value)
							}}
							className="w-full h-full font-content-font font-normal text-black text-[16px]/[16px] placeholder:opacity-50 resize-none border-none focus:outline-none pt-[8px]"
							placeholder="Ввести сообщение"
						></textarea>
						<div className="ml-auto flex gap-[8px]">
							<Button type="text" icon={<AttachIcon />} />
							<Button
								className="rounded-[54.5px] h-[32px] px-[24px]"
								type="primary"
								htmlType="submit"
							>
								Отправить
							</Button>
						</div>
					</form>
				</div>
			</div>
		</>
	)
}
