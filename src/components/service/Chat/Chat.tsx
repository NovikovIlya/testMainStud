import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

import {
	useGetSeekerRespondsQuery,
	useLazyGetChatIdByRespondIdQuery,
	useLazyGetSeekerChatPreviewsQuery
} from '../../../store/api/serviceApi'
import { closeChat, openChat } from '../../../store/reducers/ChatRespondStatusSlice'
import { setRespondId } from '../../../store/reducers/CurrentRespondIdSlice'
import { setCurrentVacancyId } from '../../../store/reducers/CurrentVacancyIdSlice'
import { setCurrentVacancyName } from '../../../store/reducers/CurrentVacancyNameSlice'
import { setChatId } from '../../../store/reducers/chatIdSlice'
import { respondStatus } from '../../../store/reducers/type'
import VacancyView from '../jobSeeker/VacancyView'

import { ChatPage } from './ChatPage'
import { ChatPreview } from './ChatPreview'

export const Chat = () => {
	const { pathname } = useLocation()
	const dispatch = useDispatch()
	const navigate = useNavigate()

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
	const [getChat, getChatState] = useLazyGetChatIdByRespondIdQuery()

	useEffect(() => {
		const respondId = parseInt(pathname.substring(pathname.lastIndexOf('/') + 1))
		respondId &&
			getChat({ chatId: respondId, role: 'SEEKER' })
				.unwrap()
				.then(res => {
					dispatch(setCurrentVacancyName(res.respondInfo.vacancyName))
					if (res.respondInfo.status) {
						if (
							res.respondInfo.status === respondStatus[respondStatus.INVITATION] ||
							res.respondInfo.status === respondStatus[respondStatus.EMPLOYMENT_REQUEST] ||
							res.respondInfo.status === respondStatus[respondStatus.EMPLOYMENT]
						) {
							dispatch(openChat())
						} else {
							dispatch(closeChat())
						}
					} else {
						dispatch(openChat())
					}
					dispatch(setChatId(res.id))
					dispatch(setRespondId(res.respondInfo.id))
					dispatch(setCurrentVacancyId(res.respondInfo.vacancyId))
					navigate(`/services/myresponds/chat/id/${res.id}`)
				})
	}, [])

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
							<div className="flex items-center pt-[20px] pb-[20px]">
								<p className="pl-[53px] font-content-font font-normal text-black text-[20px]/[20px] ">Все отклики</p>
							</div>
							<div className="overflow-auto flex flex-col h-[calc(100vh-160px)]">
								<ul className="w-[461px] flex flex-col gap-4 overflow-auto">
									{handleList}
									<li className="h-[1px]" ref={chatPreviewsBottomRef}></li>
								</ul>
							</div>
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
