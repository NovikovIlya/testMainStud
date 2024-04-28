import { Collapse, CollapseProps, ConfigProvider } from 'antd'
import clsx from 'clsx'
import { useLocation, useNavigate } from 'react-router-dom'

import { BriefcaseSvg } from '../../../assets/svg/BriefcaseSvg'
import { useAppSelector } from '../../../store'
import { ChatEmpDemp } from '../Chat/ChatEmpDemp'

import { ChatIcon } from './ChatIcon'
import { RespondInfo } from './RespondInfo'
import { Responds } from './Responds'
import { RespondsIcon } from './RespondsIcon'
import { VacanciesIcon } from './VacanciesIcon'
import { VacancyResponces } from './VacancyResponces'
import { RespondsSupervisor } from './supervisor/RespondsSupervisor'
import { SupervisorCreateVacancyForm } from './supervisor/SupervisorCreateVacancyForm'
import { SupervisorVacancies } from './supervisor/SupervisorVacancies'

export const NavPesonnelAccounting = () => {
	const { pathname } = useLocation()
	const navigate = useNavigate()
	const roles = useAppSelector(state => state.auth.user?.roles)

	const handleNavigate = (url: string) => {
		navigate(url)
	}

	const isEmployee = roles?.find(role => role.type === 'EMPL')
	const isSupervisor = roles?.find(role => role.type === 'OTHER')

	const navEmployeeList = [
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

	const navSupervisorList = [
		{
			id: '/services/personnelaccounting/supervisor/responds',
			icon: <RespondsIcon />,
			name: 'Отклики'
		},
		{
			id: '/services/personnelaccounting/supervisor/invitation',
			icon: <BriefcaseSvg />,
			name: 'Собеседование'
		},
		{
			id: '/services/personnelaccounting/supervisor/vacancies',
			icon: <VacanciesIcon />,
			name: 'Вакансии'
		}
	]

	const navSupervisorListVacancyItems: CollapseProps['items'] = [
		{
			key: 'allVacancies',
			label: (
				<div className="flex items-center gap-[10px]">
					{<VacanciesIcon />}
					<p className="text-base">{'Вакансии'}</p>
				</div>
			),
			children: (
				<div>
					<p
						className="text-base"
						onClick={() => {
							navigate('/services/personnelaccounting/supervisor/vacancies')
						}}
					>
						Все вакансии
					</p>
					<p
						className="text-base"
						onClick={() => {
							navigate('/services/personnelaccounting/supervisor/createvacancy')
						}}
					>
						Создать вакансию
					</p>
				</div>
			)
		}
	]

	const handleList = navEmployeeList.map(({ id, icon, name }, index) => {
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

	const handleSupervisorList = navSupervisorList.map(
		({ id, icon, name }, index) => {
			if (name === 'Вакансии') {
				return (
					<li
						key={index}
						className={clsx(
							'w-full flex items-center py-2 pl-8 hover:bg-[#F5F8FB]  cursor-pointer',
							id === pathname && 'bg-[#F5F8FB]'
						)}
					>
						<ConfigProvider
							theme={{
								components: {
									Collapse: {
										headerBg: '#ffffff',
										headerPadding: '0px 20px 0px 0px'
									}
								}
							}}
						>
							<Collapse
								className="w-full"
								items={navSupervisorListVacancyItems}
								expandIconPosition="end"
								bordered={false}
								style={{}}
							/>
						</ConfigProvider>
					</li>
				)
			} else {
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
			}
		}
	)

	if (!(isEmployee || isSupervisor)) return <></>

	return (
		<>
			{isEmployee ? (
				<div className="shadowNav">
					<ul className="min-w-[230px] pt-14 flex flex-col gap-4 sticky top-[80px]">
						{handleList}
					</ul>
				</div>
			) : (
				<div className="shadowNav">
					<ul className="min-w-[230px] pt-14 flex flex-col gap-4 sticky top-[80px]">
						{handleSupervisorList}
					</ul>
				</div>
			)}
			<div className="bg-[#F5F8FB] flex w-full">
				{pathname === navEmployeeList[0].id && <Responds />}
				{pathname.match(
					'services/personnelaccounting/responds/byvacancy/*'
				) && <VacancyResponces />}
				{pathname.match('services/personnelaccounting/responds/fullinfo') && (
					<RespondInfo type="PERSONNEL_DEPARTMENT" />
				)}
				{pathname.match(
					'services/personnelaccounting/supervisor/responds/fullinfo'
				) && <RespondInfo type="SUPERVISOR" />}
				{pathname.includes(navEmployeeList[1].id) && <ChatEmpDemp />}
				{pathname === navEmployeeList[2].id && <></>}
				{pathname === navEmployeeList[3].id && <></>}
				{pathname === navEmployeeList[4].id && <></>}
				{pathname === navSupervisorList[0].id && <RespondsSupervisor />}
				{pathname === navSupervisorList[1].id && <></>}
				{pathname === navSupervisorList[2].id && <SupervisorVacancies />}
				{pathname ===
					'/services/personnelaccounting/supervisor/createvacancy' && (
					<SupervisorCreateVacancyForm />
				)}
			</div>
		</>
	)
}
