import { Badge } from 'antd'
import clsx from 'clsx'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

import { useAppSelector } from '../../../store'
import {
	useGetChatIdByRespondIdQuery,
	useGetUnreadMessagesCountQuery
} from '../../../store/api/serviceApi'
import { setChatId } from '../../../store/reducers/chatIdSlice'

export const ChatPreview = (props: { respondId: number; respName: string }) => {
	const { data: chatId = 0, isLoading: isChatIdLoading } =
		useGetChatIdByRespondIdQuery(props.respondId)
	const { data: unreadCount, isLoading: isUnreadCountLoading } =
		useGetUnreadMessagesCountQuery(chatId)

	const user = useAppSelector(state => state.auth.user)
	const isEmpDemp = user?.roles.find(role => role.type === 'EMPL')

	const { pathname } = useLocation()
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const handleNavigate = (url: string) => {
		dispatch(setChatId(chatId))
		navigate(url)
	}

	return (
		<>
			<li
				className={clsx(
					'w-full flex items-center py-2 pl-[53px] pr-[53px] pb-[16px] hover:bg-[#F5F8FB]  cursor-pointer',
					pathname.includes(props.respondId.toString()) && 'bg-[#F5F8FB]'
				)}
				onClick={() =>
					handleNavigate(
						isEmpDemp
							? `/services/personnelaccounting/chat/id/${chatId}`
							: `/services/myresponds/chat/id/${chatId}`
					)
				}
			>
				<div className="w-full flex flex-col gap-[10px]">
					<p className=" font-content-font font-normal text-black text-[16px]/[19.2px] opacity-50">
						Просмотрен
					</p>
					<div className="w-full flex justify-between">
						<p className="text-base w-[60%]">{props.respName}</p>
						<div className="flex flex-col">
							<p className=" font-content-font font-normal text-black text-[12px]/[14.4px] opacity-[52%]">
								5 окт 12:23
							</p>
							{unreadCount !== 0 && (
								<Badge
									className="ml-auto mt-[4px]"
									count={unreadCount}
									size="default"
									color="#D40000"
								/>
							)}
						</div>
					</div>
				</div>
			</li>
		</>
	)
}
