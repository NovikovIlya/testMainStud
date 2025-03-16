import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'

import { useGetSeekerRespondsQuery, useLazyGetSeekerChatPreviewsQuery } from '../../../store/api/serviceApi'
import VacancyView from '../jobSeeker/VacancyView'

import { ChatPage } from './ChatPage'
import { ChatPreview } from './ChatPreview'

const seekerToken =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJJQU1pdHJvZmFub3ZAc3R1ZC5rcGZ1LnJ1IiwiaWF0IjoxNzExNTc3OTMwLCJleHAiOjE3MTE1ODg3MzAsInNjb3BlIjoidXNlciIsInJvbGVzIjpbeyJ1c2VySWQiOiI2Iiwic2Vzc2lvbklkIjoiMjQwMzIyNzE0ODc1MTk0ODI5NzMzMDkwNDczNTM2NjciLCJzZXNzaW9uSGFzaCI6IkQyQTIyNUE3NDk5RjFDRTE2Q0JFMDJCOUY2QzkxN0UxIiwiZG9jdW1lbnRzSGFzaCI6IkIyNkNCMEMzRThBQzM2RDZBMENCNTEyQ0YzMDIzNzc3IiwibG9naW4iOiJJQU1pdHJvZmFub3YiLCJ0eXBlIjoiU0VFS0VSIn1dLCJzZXNzaW9uSWQiOiIyNDAzMjI3MTQ4NzUxOTQ4Mjk3MzMwOTA0NzM1MzY2NyIsInNlc3Npb25IYXNoIjoiRDJBMjI1QTc0OTlGMUNFMTZDQkUwMkI5RjZDOTE3RTEiLCJhbGxJZCI6IjE3ODQ0MCIsImVtYWlsIjoibWl0cm9fMDJAbWFpbC5ydSJ9.rbdEbs6b2NVFyFa65GW5rpy8VBd7TKpNxaTrVBMh5i0'
const personnelDeparmentToken =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJTdWJCQXNhZHVsbG9ldkBzdHVkLmtwZnUucnUiLCJpYXQiOjE3MTE3MjQ1NDQsImV4cCI6MTcxMTczNTM0NCwic2NvcGUiOiJ1c2VyIiwicm9sZXMiOlt7InVzZXJJZCI6IjciLCJzZXNzaW9uSWQiOiIyNDA0NzM4MTc3NzI3MjIwMTMzMDkwNzU0ODQ2ODU5MSIsInNlc3Npb25IYXNoIjoiNTZEMTZENTNDOTc5MDk5MTk0QTY4OEY4Qjk0M0I0N0MiLCJkb2N1bWVudHNIYXNoIjoiQTdCMkI0MUU4MjQ4NDYzNkY2ODZDNTQ3NEY0NEREMjYiLCJsb2dpbiI6IlNCQXNhZHVsbG9ldiIsInR5cGUiOiJQRVJTT05ORUxfREVQQVJUTUVOVCJ9LHsidXNlcklkIjoiMzQ4NTQxIiwic2Vzc2lvbklkIjoiMjQwNDczODA1NjYxMjc2MDM3NTM5NjI3MjY1MTM0OTQiLCJzZXNzaW9uSGFzaCI6IkUzQUZFMTUzNUVCMTU3NEUyMkZCNUJDNEYxNUFERkUwIiwiZG9jdW1lbnRzSGFzaCI6IiIsImxvZ2luIjoiU3ViQkFzYWR1bGxvZXYiLCJ0eXBlIjoiRU1QTCJ9LHsidXNlcklkIjoiMzM2MDM3Iiwic2Vzc2lvbklkIjoiMjQwNDczODI0NDUwMjI3MTM5NzgzNzQ5OTMwNjk4MDciLCJzZXNzaW9uSGFzaCI6IjcxMEExMTFFM0FCN0Q4NDczNTVFOEM0QkUxMDI4RTZBIiwiZG9jdW1lbnRzSGFzaCI6IkEyMkE3NURCRTBBNzg4MDE4OTY4NjZCQjgzNUIxNDQxIiwibG9naW4iOiJTdUJBc2FkdWxsb2V2IiwidHlwZSI6IlNUVUQifV0sInNlc3Npb25JZCI6IjI0MDQ3MzgxNzc3MjcyMjAxMzMwOTA3NTQ4NDY4NTkxIiwic2Vzc2lvbkhhc2giOiI1NkQxNkQ1M0M5NzkwOTkxOTRBNjg4RjhCOTQzQjQ3QyIsImFsbElkIjoiMjM5MTc0IiwiZW1haWwiOiJCYXN1YmhvbmJla0BnbWFpbC5jb20ifQ.MMK47Gd4AKG8tPzmPAwgNq79zVEmfzdFCuoZjcXeW_o'

export const Chat = () => {
	const { pathname } = useLocation()

	const [requestData, setRequestData] = useState<{
		page: number
		pageSize: number
	}>({ page: 0, pageSize: 10 })

	const [blockPageAddition, setBlockPageAddition] = useState<boolean>(true)
	const [isBottomOfChatPreviewsVisible, setIsBottomOfChatPreviewsVisible] = useState<boolean>(true)
	const chatPreviewsBottomRef = useRef<null | HTMLLIElement>(null)

	const [chats, setChats] = useState<
		{
			chatId: number
			respondId: number
			vacancyId: number
			chatName: string
			lastMessageDate: string
			undreadCount: number
			respondStatus: string
		}[]
	>([])

	const [getChatPreviews, chatPreviewsQueryState] = useLazyGetSeekerChatPreviewsQuery()

	useEffect(() => {
		const lowerObserver = new IntersectionObserver(entries => {
			const target = entries[0]
			if (target.isIntersecting) {
				console.log('I see the depths of hell below')
				setIsBottomOfChatPreviewsVisible(true)
			}
			if (!target.isIntersecting) {
				setIsBottomOfChatPreviewsVisible(false)
			}
		})

		if (chatPreviewsBottomRef.current) {
			lowerObserver.observe(chatPreviewsBottomRef.current)
		}

		return () => {
			if (chatPreviewsBottomRef.current) {
				lowerObserver.unobserve(chatPreviewsBottomRef.current)
			}
		}
	}, [chats.length])

	useEffect(() => {
		if (requestData.page === 0) {
			getChatPreviews({
				page: requestData.page,
				pageSize: requestData.pageSize
			})
				.unwrap()
				.then(res => {
					setChats(res.content)
					setBlockPageAddition(false)
				})
		} else {
			getChatPreviews({
				page: requestData.page,
				pageSize: requestData.pageSize
			})
				.unwrap()
				.then(res => {
					setChats(prev => [...prev, ...res.content])
					setBlockPageAddition(false)
				})
		}
	}, [requestData])

	useEffect(() => {
		if (isBottomOfChatPreviewsVisible) {
			if (!blockPageAddition) {
				setRequestData(prev => ({ ...prev, page: prev.page + 1 }))
			}
		}
	}, [isBottomOfChatPreviewsVisible])

	const handleList = chats.map(chat => {
		return (
			<ChatPreview
				respondId={chat.respondId}
				vacancyId={chat.vacancyId}
				respName={chat.chatName}
				checkableStatus={chat.respondStatus}
				key={chat.chatId}
			/>
		)
	})

	return (
		<>
			{' '}
			<div className="bg-[#F5F8FB] flex w-full">
				{!pathname.includes('/services/myresponds/chat/vacancyview') && (
					<div className=" shadowNav bg-white relative z-[5]">
						<div className="sticky top-[80px]">
							<div className="">
								<p className="pl-[53px] pt-14 pb-[40px] font-content-font font-normal text-black text-[20px]/[20px] ">
									Все отклики
								</p>
							</div>
							<ul className="h-[75vh] w-[461px] flex flex-col gap-4 overflow-auto">
								{handleList}
								<li className="h-[1px]" ref={chatPreviewsBottomRef}></li>
							</ul>
						</div>
					</div>
				)}
				{pathname.match('services/myresponds/chat/id/*') && <ChatPage />}
				{pathname === '/services/myresponds/chat' && (
					<div className="w-full h-full flex flex-col">
						<p className="text-centerfont-content-font text-[20px]/[20px] text-black font-normal opacity-60 my-auto mx-auto">
							Выберите, кому бы вы хотели написать
						</p>
					</div>
				)}
				{pathname.includes('/services/myresponds/chat/vacancyview') && <VacancyView type="CHAT" />}
			</div>
		</>
	)
}
