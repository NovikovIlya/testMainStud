import { LoadingOutlined } from '@ant-design/icons'
import { Button, ConfigProvider, Select, Spin } from 'antd'
import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

import { ChatCrossIcon } from '../../../assets/svg/ChatCrossIcon'
import { ChatFilterIcon } from '../../../assets/svg/ChatFilterIcon'
import { useAppSelector } from '../../../store'
import {
	useGetAllVacanciesQuery,
	useGetSeekerRespondsQuery,
	useGetVacancyGroupedResponcesQuery,
	useLazyGetChatIdByRespondIdQuery,
	useLazyGetChatPreviewsQuery,
	useLazyGetResponcesByVacancyQuery,
	useLazyGetVacancyGroupedResponcesQuery
} from '../../../store/api/serviceApi'
import { chatFilterType, setChatFilter } from '../../../store/reducers/ChatFilterSlice'
import { closeChat, openChat } from '../../../store/reducers/ChatRespondStatusSlice'
import { setRespondId } from '../../../store/reducers/CurrentRespondIdSlice'
import { setCurrentVacancyId } from '../../../store/reducers/CurrentVacancyIdSlice'
import { setCurrentVacancyName } from '../../../store/reducers/CurrentVacancyNameSlice'
import { setChatId } from '../../../store/reducers/chatIdSlice'
import { VacancyRespondItemType, respondStatus } from '../../../store/reducers/type'
import VacancyView from '../jobSeeker/VacancyView'

import { ChatEmpDempPreview } from './ChatEmpDempPreview'
import { ChatPage } from './ChatPage'

export const ChatEmpDemp = () => {
	const { pathname } = useLocation()
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const [isFilterWindowOpen, setIsFilterWindowOpen] = useState<boolean>(true)

	const { filter } = useAppSelector(state => state.chatFilter)

	const [requestData, setRequestData] = useState<{
		vacancyId: number | null
		status: string | null
		sort: 'ALL' | 'UNREAD' | null
		page: number
		pageSize: number
	}>({ vacancyId: null, status: filter, sort: null, page: 0, pageSize: 10 })

	// const [getResponds] = useLazyGetResponcesByVacancyQuery()
	// const [responds, setResponds] = useState<VacancyRespondItemType[]>([])
	// const [getGroupedResponds] = useLazyGetVacancyGroupedResponcesQuery()

	const [blockPageAddition, setBlockPageAddition] = useState<boolean>(true)
	const [isBottomOfChatPreviewsVisible, setIsBottomOfChatPreviewsVisible] = useState<boolean>(true)
	const chatPreviewsBottomRef = useRef<null | HTMLLIElement>(null)

	const [chats, setChats] = useState<
		{
			id: number
			respondInfo: VacancyRespondItemType
			unreadCount: number
			lastMessageDate: string
			chatName: string
		}[]
	>([])

	const [getChatPreviews, chatPreviewsQueryState] = useLazyGetChatPreviewsQuery()
	const [getChat, getChatState] = useLazyGetChatIdByRespondIdQuery()
	const { data: vacancies = [] } = useGetAllVacanciesQuery()

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
					navigate(`/services/personnelaccounting/chat/id/${res.id}`)
				})
	}, [])

	useEffect(() => {
		const lowerObserver = new IntersectionObserver(entries => {
			const target = entries[0]
			if (target.isIntersecting) {
				console.log('I see the depths of hell below review version')
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
				vacancyId: requestData.vacancyId,
				status: requestData.status,
				sort: requestData.sort,
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
				vacancyId: requestData.vacancyId,
				status: requestData.status,
				sort: requestData.sort,
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
	}, [isBottomOfChatPreviewsVisible, blockPageAddition])

	// useEffect(() => {
	// 	getGroupedResponds({ category: 'АУП', role: 'PERSONNEL_DEPARTMENT' })
	// 		.unwrap()
	// 		.then(grData => {
	// 			grData.map(vacResp => {
	// 				getResponds({
	// 					id: vacResp.vacancyId,
	// 					status: '',
	// 					role: 'PERSONNEL_DEPARTMENT'
	// 				})
	// 					.unwrap()
	// 					.then(data => setResponds(prev => [...prev, ...data]))
	// 			})
	// 		})
	// }, [])

	const handleList = chats.map(chat => {
		return (
			// <ChatPreview
			// 	respondId={chat.id}
			// 	vacancyId={chat.respondInfo.id}
			// 	respName={chat.respondInfo.vacancyName}
			// 	key={chat.id}
			// />
			<ChatEmpDempPreview
				chatId={chat.id}
				vacancyId={chat.respondInfo.vacancyId}
				respName={chat.chatName}
				surname="Митрофанов"
				name="Илья"
				status={chat.respondInfo.status}
				unreadCount={chat.unreadCount}
				lastMessageDate={chat.lastMessageDate}
			/>
		)
	})

	return (
		<>
			{' '}
			<div className="bg-[#F5F8FB] flex w-full">
				{!pathname.includes('/services/personnelaccounting/chat/vacancyview') && (
					<div className="shadowNav bg-white relative z-[5] w-[461px]">
						<div className="sticky top-[80px]">
							<div className="flex items-center px-[30px] pt-[20px] pb-[20px]">
								<p className="font-content-font font-normal text-black text-[20px]/[20px] ">Все сообщения</p>
								<ConfigProvider theme={{ components: { Button: { textHoverBg: '#ffffff' } } }}>
									<Button
										type="text"
										onClick={() => {
											setIsFilterWindowOpen(prev => !prev)
										}}
										className="ml-auto underline font-content-font font-normal text-[14px]/[14px] text-black opacity-60 !px-0"
									>
										<ChatFilterIcon />
										Скрыть
									</Button>
								</ConfigProvider>
							</div>
							<div className="overflow-auto flex flex-col h-[calc(100vh-160px)]">
								{isFilterWindowOpen && (
									<>
										<div className="px-[30px] pb-[40px] flex flex-col gap-[20px] w-full h-[200px]">
											<div className="flex flex-col gap-[8px]">
												<p className="font-content-font font-normal text-[14px]/[14px] text-black opacity-80">
													Вакансия
												</p>
												<Select
													showSearch
													optionFilterProp="label"
													options={vacancies.map(vac => ({
														value: vac.id,
														label: vac.post
													}))}
													value={requestData.vacancyId}
													onChange={value =>
														setRequestData(prev => ({
															...prev,
															vacancyId: value,
															page: 0
														}))
													}
													className="w-full h-[40px]"
													placeholder="Выбрать"
												/>
											</div>
											<div className="flex flex-col gap-[8px]">
												<p className="font-content-font font-normal text-[14px]/[14px] text-black opacity-80">
													Статус отклика
												</p>
												<Select
													options={[
														{
															value: 'IN_PERSONNEL_DEPT_REVIEW',
															label: 'На рассмотрении'
														},
														{
															value: 'IN_SUPERVISOR_REVIEW',
															label: 'На рассмотрении у руководителя'
														},
														{
															value: 'INVITATION',
															label: 'Приглашение'
														},
														{
															value: 'EMPLOYMENT',
															label: 'Трудоустройство'
														},
														{
															value: 'IN_RESERVE',
															label: 'Резерв'
														},
														{
															value: 'ARCHIVE',
															label: 'Архив'
														}
													]}
													value={requestData.status}
													onChange={value => {
														setRequestData(prev => ({
															...prev,
															status: value,
															page: 0
														}))
														dispatch(setChatFilter(value as chatFilterType))
													}}
													className="w-full h-[40px]"
													placeholder="Выбрать"
												/>
											</div>
											<div className="flex items-center gap-[12px] w-full">
												<p className="font-content-font font-normal text-[14px]/[14px] text-black opacity-80">
													Сортировка
												</p>
												<Select
													options={[
														{ value: 'ALL', label: 'Все' },
														{ value: 'UNREAD', label: 'Непрочитанные' }
													]}
													value={requestData.sort}
													onChange={value => {
														setRequestData(prev => ({
															...prev,
															sort: value,
															page: 0
														}))
													}}
													className="w-[40%] h-[32px]"
													placeholder="Все"
												/>
												<Button
													onClick={() => {
														setRequestData(prev => ({
															vacancyId: null,
															status: null,
															sort: null,
															page: 0,
															pageSize: 10
														}))
													}}
													type="text"
													className="ml-auto !pr-0 !pl-0 font-content-font font-normal text-[14px]/[14px] text-black"
												>
													Сбросить <ChatCrossIcon />
												</Button>
											</div>
										</div>
									</>
								)}
								<ul
									// className={`h-[calc(100vh-${
									// 	isFilterWindowOpen ? '400' : '340'
									// }px)] w-[461px] flex flex-col gap-4 overflow-auto`}
									className="w-[461px] flex flex-col gap-4 overflow-auto"
								>
									{handleList}
									<li className="h-[1px]" ref={chatPreviewsBottomRef}></li>
								</ul>
							</div>
						</div>
					</div>
				)}
				{pathname.match('services/personnelaccounting/chat/id/*') && <ChatPage />}
				{pathname.includes('/services/personnelaccounting/chat/vacancyview') && <VacancyView type="CHAT" />}
			</div>
		</>
	)
}
