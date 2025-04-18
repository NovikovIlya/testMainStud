import { Badge } from 'antd'
import clsx from 'clsx'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

import { useAppSelector } from '../../../store'
import {
	useGetChatIdByRespondIdQuery,
	useGetEmploymentPossibleRolesQuery,
	useGetUnreadMessagesCountQuery
} from '../../../store/api/serviceApi'
import { closeChat, openChat } from '../../../store/reducers/ChatRespondStatusSlice'
import { setRespondId } from '../../../store/reducers/CurrentRespondIdSlice'
import { setCurrentVacancyId } from '../../../store/reducers/CurrentVacancyIdSlice'
import { setCurrentVacancyName } from '../../../store/reducers/CurrentVacancyNameSlice'
import { setChatId } from '../../../store/reducers/chatIdSlice'
import { ChatMessageDateDisplayEnum, respondStatus } from '../../../store/reducers/type'

export const ChatPreview = (props: {
	respondId: number
	vacancyId: number
	respName: string
	checkableStatus?: string
}) => {
	const user = useAppSelector(state => state.auth.user)
	const { data: rolesData = undefined } = useGetEmploymentPossibleRolesQuery()
	const isEmpDemp = rolesData?.find(role => role === 'PERSONNEL_DEPARTMENT')
	const {
		data: chatInfo = {
			id: 0,
			respondInfo: {},
			unreadCount: 0,
			lastMessageDate: ''
		},
		isLoading: isChatIdLoading
	} = useGetChatIdByRespondIdQuery({
		chatId: props.respondId,
		role: isEmpDemp ? 'PERSONNEL_DEPARTMENT' : 'SEEKER'
	})
	const { data: unreadCount, isLoading: isUnreadCountLoading } = useGetUnreadMessagesCountQuery({
		chatId: chatInfo.id,
		role: isEmpDemp ? 'PERSONNEL_DEPARTMENT' : 'SEEKER'
	})

	const { pathname } = useLocation()
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const handleNavigate = (url: string) => {
		if (props.checkableStatus) {
			if (
				props.checkableStatus === respondStatus[respondStatus.INVITATION] ||
				props.checkableStatus === respondStatus[respondStatus.EMPLOYMENT_REQUEST] ||
				props.checkableStatus === respondStatus[respondStatus.EMPLOYMENT]
			) {
				dispatch(openChat())
			} else {
				dispatch(closeChat())
			}
		} else {
			dispatch(openChat())
		}
		dispatch(setChatId(chatInfo.id))
		dispatch(setRespondId(props.respondId))
		dispatch(setCurrentVacancyId(props.vacancyId))
		navigate(url)
	}

	const ChatStatus = useAppSelector(state => state.chatResponceStatus)

	const [isChatOpen, setIsChatOpen] = useState<boolean>(false)
	const [lastMessageDate, setLastMessageDate] = useState<string>('')

	const smallhandler = (e: CustomEventInit) => {
		console.log('Отработка')
		console.log(pathname)
		pathname.includes(props.respondId.toString()) && console.log('Received a new message!')
		pathname.includes(props.respondId.toString()) && console.log(e.detail.date)
		pathname.includes(props.respondId.toString()) && setLastMessageDate(prev => e.detail.date as string)
	}

	useEffect(() => {
		setLastMessageDate(prev => chatInfo.lastMessageDate)
	}, [chatInfo.lastMessageDate])

	useEffect(() => {
		window.addEventListener('newmessage', smallhandler)
		return () => {
			window.removeEventListener('newmessage', smallhandler)
		}
	}, [])

	return (
		<>
			<li
				className={clsx(
					'w-full flex items-center py-2 pl-[53px] pr-[53px] pb-[16px] hover:bg-[#F5F8FB]  cursor-pointer',
					pathname.includes(props.respondId.toString()) && 'bg-[#F5F8FB]'
				)}
				onClick={() => {
					dispatch(setCurrentVacancyName(props.respName))
					handleNavigate(
						isEmpDemp
							? `/services/personnelaccounting/chat/id/${chatInfo.id}`
							: `/services/myresponds/chat/id/${chatInfo.id}`
					)
					setIsChatOpen(true)
				}}
			>
				<div className="w-full flex flex-col gap-[10px]">
					<p className=" font-content-font font-normal text-black text-[16px]/[19.2px] opacity-50">Просмотрен</p>
					<div className="w-full flex justify-between">
						<p className="text-base w-[60%]">{props.respName}</p>
						<div className="flex flex-col">
							{lastMessageDate && (
								<p className=" font-content-font font-normal text-black text-[12px]/[14.4px] opacity-[52%]">
									{lastMessageDate.substring(8, 10) +
										' ' +
										ChatMessageDateDisplayEnum[parseInt(lastMessageDate.substring(5, 7)) - 1].substring(0, 3) +
										' ' +
										dayjs(lastMessageDate).format().substring(11, 16)}
								</p>
							)}
							{unreadCount !== 0 && !isChatOpen && (
								<Badge className="ml-auto mt-[4px]" count={unreadCount} size="default" color="#D40000" />
							)}
						</div>
					</div>
				</div>
			</li>
		</>
	)
}
