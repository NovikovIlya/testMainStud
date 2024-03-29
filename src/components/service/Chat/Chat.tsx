import clsx from 'clsx'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import uuid from 'react-uuid'

import { useGetSeekerRespondsQuery } from '../../../store/api/serviceApi'

import { ChatPage } from './ChatPage'
import { ChatPreview } from './ChatPreview'

export const Chat = () => {
	const { data: responds = [] } = useGetSeekerRespondsQuery('')

	useEffect(() => {}, [])

	const { pathname } = useLocation()
	const navigate = useNavigate()

	const handleNavigate = (url: string) => {
		navigate(url)
	}

	const handleList = responds.map(resp => {
		return (
			<ChatPreview respondId={resp.id} respName={resp.name} key={resp.id} />
		)
	})

	return (
		<>
			{' '}
			<div className="shadowNav bg-white relative z-[5]">
				<div className="sticky top-[80px]">
					<div className="">
						<p className="pl-[53px] pt-14 pb-[40px] font-content-font font-normal text-black text-[20px]/[20px] ">
							Все отклики
						</p>
					</div>
					<ul className="w-[461px] flex flex-col gap-4">{handleList}</ul>
				</div>
			</div>
			{pathname.match('services/myresponds/chat/id/*') && <ChatPage />}
		</>
	)
}
