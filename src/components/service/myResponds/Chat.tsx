import clsx from 'clsx'
import { useLocation, useNavigate } from 'react-router-dom'
import uuid from 'react-uuid'

import { useGetSeekerRespondsQuery } from '../../../store/api/serviceApi'

export const Chat = () => {
	const { data: responds = [], refetch } = useGetSeekerRespondsQuery('')

	const { pathname } = useLocation()
	const navigate = useNavigate()

	const handleNavigate = (url: string) => {
		navigate(url)
	}

	const handleList = responds.map(resp => {
		return (
			<li
				key={uuid()}
				className={clsx(
					'w-full flex items-center py-2 pl-[53px] hover:bg-[#F5F8FB]  cursor-pointer'
					// id === pathname && 'bg-[#F5F8FB]'
				)}
				// onClick={() => handleNavigate()}
			>
				<div className="flex items-center gap-[10px]">
					<p className="text-base">{resp.name}</p>
				</div>
			</li>
		)
	})

	return (
		<>
			{' '}
			<div className="shadowNav ">
				<div className="">
					<p className="pl-[53px] pt-14 pb-[40px] font-content-font font-normal text-black text-[20px]/[20px] ">
						Все отклики
					</p>
				</div>
				<ul className="min-w-[230px] flex flex-col gap-4 ">{handleList}</ul>
			</div>
			<div className="text-center">Здесь будет чат</div>
		</>
	)
}
