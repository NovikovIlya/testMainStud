import { Button } from 'antd'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useLocation } from 'react-router-dom'
import SockJS from 'sockjs-client'

import { MessageReadSvg } from '../../../assets/svg/MessageReadSvg'
import { MessageUnreadSvg } from '../../../assets/svg/MessageUnreadSvg'
import { useAppSelector } from '../../../store'
import {
	useLazyGetChatMessagesQuery,
	usePostChatMessageMutation,
	useReadChatMessageMutation
} from '../../../store/api/serviceApi'
import {
	ChatMessageDateDisplayEnum,
	ChatMessageType
} from '../../../store/type'
import { AttachIcon } from '../jobSeeker/AttachIcon'

import { ChatMessage } from './ChatMessage'

const Stomp = require('stompjs/lib/stomp').Stomp

const seekerToken =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJJQU1pdHJvZmFub3ZAc3R1ZC5rcGZ1LnJ1IiwiaWF0IjoxNzExNTc3OTMwLCJleHAiOjE3MTE1ODg3MzAsInNjb3BlIjoidXNlciIsInJvbGVzIjpbeyJ1c2VySWQiOiI2Iiwic2Vzc2lvbklkIjoiMjQwMzIyNzE0ODc1MTk0ODI5NzMzMDkwNDczNTM2NjciLCJzZXNzaW9uSGFzaCI6IkQyQTIyNUE3NDk5RjFDRTE2Q0JFMDJCOUY2QzkxN0UxIiwiZG9jdW1lbnRzSGFzaCI6IkIyNkNCMEMzRThBQzM2RDZBMENCNTEyQ0YzMDIzNzc3IiwibG9naW4iOiJJQU1pdHJvZmFub3YiLCJ0eXBlIjoiU0VFS0VSIn1dLCJzZXNzaW9uSWQiOiIyNDAzMjI3MTQ4NzUxOTQ4Mjk3MzMwOTA0NzM1MzY2NyIsInNlc3Npb25IYXNoIjoiRDJBMjI1QTc0OTlGMUNFMTZDQkUwMkI5RjZDOTE3RTEiLCJhbGxJZCI6IjE3ODQ0MCIsImVtYWlsIjoibWl0cm9fMDJAbWFpbC5ydSJ9.rbdEbs6b2NVFyFa65GW5rpy8VBd7TKpNxaTrVBMh5i0'

export const ChatPage = (props: { stompClient: any }) => {
	const chatIdState = useAppSelector(state => state.chatId)
	const [getChatMessages, chatMessages] = useLazyGetChatMessagesQuery()
	const [postMsg, postMsgResult] = usePostChatMessageMutation()
	const [readMsg, readMsgResult] = useReadChatMessageMutation()
	const chatPageRef = useRef<null | HTMLDivElement>(null)

	const { pathname } = useLocation()

	const [msgInputText, setMsgInputText] = useState<string>('')
	const msgDate = useRef<string>('')

	const scrollToBottom = () => {
		chatPageRef.current?.scrollIntoView()
	}

	// useEffect(() => {
	// 	console.log('I AM... SCROOOOOOLING')
	// 	console.log(chatPageRef.current)
	// 	scrollToBottom()
	// }, [chatPageRef])

	const [messages, setMessages] = useState<ChatMessageType[]>([])

	const [stompClient, setStompClient] = useState<any>(null)

	const [sessionId, setSessionId] = useState<string>('')

	useEffect(() => {
		const socket = new SockJS(
			`http://localhost:8082/employment-api/v1/ws?token=Bearer ${seekerToken}`
		)
		socket.onopen = () => {
			console.log('WS Open')
		}
		socket.onclose = () => {
			console.log('WS Close')
		}
		const client = Stomp.over(socket)

		client.heartbeat.outgoing = 0
		client.heartbeat.incoming = 0

		client.connect({}, (message: any) => {
			console.log(message.headers['user-name'])
			const sessionId = message.headers['user-name']
			setSessionId(message.headers['user-name'])
			client.subscribe(`/chat/topic/${chatIdState.chatId}`, (message: any) => {
				console.log(message)
				const msgBody = JSON.parse(message.body)
				msgBody.type === 'MESSAGE' &&
					(setMessages(prev => [msgBody.message as ChatMessageType, ...prev]),
					readMsg({
						chatId: chatIdState.chatId,
						messageId: msgBody.message.id,
						sessionId: sessionId
					}))
				msgBody.type === 'READ' &&
					(msgBody.message.ids as number[]).map(id => console.log(id))
			})
		})

		setStompClient(client)
		return () => {
			client.disconnect()
			socket.close()
		}
	}, [chatIdState])

	useEffect(() => {
		getChatMessages({ chatId: chatIdState.chatId, size: 60 })
			.unwrap()
			.then(msg => {
				setMessages(msg)
			})
	}, [chatIdState])

	const { control, handleSubmit } = useForm()

	const handleMessage = () => {
		postMsg({ id: chatIdState.chatId, text: msgInputText, name: sessionId })
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
							{/* {msg.sendDate.substring(0, 10) !== msgDate.current &&
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
								))} */}
							<ChatMessage key={msg.id} msgData={msg} />
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
