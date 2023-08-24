import clsx from 'clsx'
import { useLocation, useNavigate } from 'react-router-dom'

import { ElectronicBookSvg } from '../../../assets/svg/ElectronicBookSvg'
import { TeachersWorkSvg } from '../../../assets/svg/TeachersWorkSvg'

import { Estimation } from './Estimation'

const navList = [
	{
		id: '/services/electronicBook/estimation',
		icon: <ElectronicBookSvg />,
		name: 'Электронная зачетная книжка'
	},
	{
		id: '/services/electronicBook/teachersWork',
		icon: <TeachersWorkSvg />,
		name: 'Оценка работы преподавателей'
	}
]
export const NavElectronicBook = () => {
	const { pathname } = useLocation()
	const navigate = useNavigate()
	const handleNavigate = (url: string) => {
		navigate(url)
	}
	const handleList = navList.map(({ icon, name, id }, index) => {
		return (
			<li
				key={index}
				className={clsx(
					'w-full flex items-center py-2 pl-8 hover:bg-[#F5F8FB]  cursor-pointer',
					id === pathname && 'bg-[#F5F8FB]'
				)}
				onClick={() => handleNavigate(id)}
			>
				<div className="flex items-center gap-[10px]">
					{icon}
					<p className="text-base">{name}</p>
				</div>
			</li>
		)
	})
	return (
		<>
			<div className="shadowNav">
				<ul className="min-w-[230px] pt-14 flex flex-col gap-4 ">
					{handleList}
				</ul>
			</div>
			<div className="bg-[#F5F8FB] w-full">
				{pathname === navList[0].id && <Estimation />}
			</div>
		</>
	)
}
