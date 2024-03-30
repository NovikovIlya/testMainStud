import clsx from 'clsx'
import { useLocation, useNavigate } from 'react-router-dom'

import { BriefcaseSvg } from '../../../assets/svg/BriefcaseSvg'
import { useAppSelector } from '../../../store'
import { Chat } from '../Chat/Chat'

import { ChatIcon } from './ChatIcon'
import { Responds } from './Responds'
import { RespondsIcon } from './RespondsIcon'
import { VacanciesIcon } from './VacanciesIcon'
import { VacancyResponces } from './VacancyResponces'

export const NavPesonnelAccounting = () => {
	const { pathname } = useLocation()
	const navigate = useNavigate()
	const roles = useAppSelector(state => state.auth.user?.roles)

	const handleNavigate = (url: string) => {
		navigate(url)
	}

	const isEmployee = roles?.find(role => role.type === 'EMPL')

	const navList = [
		{
			id: '/services/personnelaccounting/responds',
			icon: <RespondsIcon />,
			name: 'Отклики'
		},
		{
			id: '/services/personnelaccounting/chat',
			icon: <ChatIcon />,
			name: 'Сообщения'
		},
		{
			id: '/services/personnelaccounting/employment',
			icon: <BriefcaseSvg />,
			name: 'Этап трудоустройства'
		},
		{
			id: '/services/personnelaccounting/vacancies',
			icon: <VacanciesIcon />,
			name: 'Вакансии'
		},
		{
			id: '/services/personnelaccounting/reserve',
			icon: <RespondsIcon />,
			name: 'Кадровый резерв'
		}
	]

	const handleList = navList.map(({ id, icon, name }, index) => {
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

	if (!isEmployee) return <></>

	return (
		<>
			<div className="shadowNav">
				<ul className="min-w-[230px] pt-14 flex flex-col gap-4">
					{handleList}
				</ul>
			</div>
			<div className="bg-[#F5F8FB] flex w-full">
				{pathname === navList[0].id && <Responds />}
				{pathname.match(
					'services/personnelaccounting/responds/byvacancy/*'
				) && <VacancyResponces />}
				{pathname.includes(navList[1].id) && <Chat />}
				{pathname === navList[2].id && <></>}
				{pathname === navList[3].id && <></>}
				{pathname === navList[4].id && <></>}
			</div>
		</>
	)
}