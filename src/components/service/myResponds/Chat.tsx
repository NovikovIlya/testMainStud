import clsx from 'clsx'
import { useLocation, useNavigate } from 'react-router-dom'
import uuid from 'react-uuid'

import { useGetSeekerRespondsQuery } from '../../../store/api/serviceApi'

import { ChatPage } from './ChatPage'

export const Chat = () => {
	const { data: responds = [] } = useGetSeekerRespondsQuery('')

	const { pathname } = useLocation()
	const navigate = useNavigate()

	const handleNavigate = (url: string) => {
		navigate(url)
	}

	const handleList = responds.map(resp => {
		return (
			<li
				key={resp.id}
				className={clsx(
					'w-full flex items-center py-2 pl-[53px] pr-[53px] pb-[16px] hover:bg-[#F5F8FB]  cursor-pointer',
					pathname.includes(resp.id.toString()) && 'bg-[#F5F8FB]'
				)}
				onClick={() => handleNavigate(`/services/myresponds/chat/${resp.id}`)}
			>
				<div className="w-full flex flex-col gap-[10px]">
					<p className=" font-content-font font-normal text-black text-[16px]/[19.2px] opacity-50">
						Просмотрен
					</p>
					<div className="w-full flex justify-between">
						<p className="text-base w-[60%]">{resp.name}</p>
						<p className=" font-content-font font-normal text-black text-[12px]/[14.4px] opacity-[52%]">
							5 окт 12:23
						</p>
					</div>
				</div>
			</li>
		)
	})

	return (
		<>
			{' '}
			<div className="shadowNav bg-white relative z-[5]">
				<div className="">
					<p className="pl-[53px] pt-14 pb-[40px] font-content-font font-normal text-black text-[20px]/[20px] ">
						Все отклики
					</p>
				</div>
				<ul className="w-[461px] flex flex-col gap-4 ">{handleList}</ul>
			</div>
			<ChatPage />
		</>
	)
}
