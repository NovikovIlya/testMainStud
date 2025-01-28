import { Collapse, CollapseProps, ConfigProvider } from 'antd';
import clsx from 'clsx';
import { useLocation, useNavigate } from 'react-router-dom';



import { BriefcaseSvg } from '../../../assets/svg/BriefcaseSvg';
import { SignedIconSvg } from "../../../assets/svg/SignedIconSvg";
import { TestResultsIconSvg } from "../../../assets/svg/TestResultsIconSvg";
import { useAppSelector } from '../../../store';
import { useGetEmploymentPossibleRolesQuery } from '../../../store/api/serviceApi';
import { Header } from '../../layout/Header';
import { ChatEmpDemp } from '../Chat/ChatEmpDemp';
import { RequisiteMain } from '../employmentStage/accountingDepartment/requisite/RequisiteMain';
import { RequisiteSeeker } from '../employmentStage/accountingDepartment/requisite/RequisiteSeeker';
import { RequisiteStage } from '../employmentStage/accountingDepartment/requisite/RequisiteStage';
import { Signed } from "../employmentStage/laborProtectionDepartment/signed/Signed";
import { TestResults } from "../employmentStage/laborProtectionDepartment/testResults/TestResults";
import { DepEmployment } from '../employmentStage/personnelDepartment/depEmployment';
import { DepEmploymentSeekerInfo } from '../employmentStage/personnelDepartment/depEmploymentSeekerInfo';
import { EmploymentStageInfo } from '../employmentStage/personnelDepartment/employmentStageInfo';



import { Archive } from './Archive';
import { ArchiveRespondInfo } from './ArchiveRespondInfo';
import Catalog from './CatalogForEdit';
import { ChatIcon } from './ChatIcon';
import { Reserve } from './Reserve';
import { ReserveRespondInfo } from './ReserveRespondInfo';
import { RespondInfo } from './RespondInfo';
import { Responds } from './Responds';
import { RespondsIcon } from './RespondsIcon';
import { VacanciesIcon } from './VacanciesIcon';
import { VacancyEditView } from './VacancyEditView';
import { VacancyRequestCreateView } from './VacancyRequestCreateView';
import { VacancyRequestDeleteView } from './VacancyRequestDeleteView';
import { VacancyRequestUpdateView } from './VacancyRequestUpdateView';
import { VacancyRequestsPage } from './VacancyRequestsPage';
import { VacancyResponces } from './VacancyResponces';
import { SupervisorInterviewCreate } from './supervisor/Interview/SupervisorInterviewCreate';
import { SupervisorInterviewSeekerInfo } from './supervisor/Interview/SupervisorInterviewSeekerInfo';
import { SupervisorInterviews } from './supervisor/Interview/SupervisorInterviews';
import { RespondsSupervisor } from './supervisor/RespondsSupervisor';
import { SupervisorCreateVacancyForm } from './supervisor/vacancy/SupervisorCreateVacancyForm';
import { SupervisorUpdateVacancy } from './supervisor/vacancy/SupervisorUpdateVacancy';
import { SupervisorVacancies } from './supervisor/vacancy/SupervisorVacancies';


export const NavPesonnelAccounting = () => {
	const { pathname } = useLocation()
	const navigate = useNavigate()
	const roles = useAppSelector(state => state.auth.user?.roles)
	const respondId = useAppSelector(state => state.currentResponce)

	const handleNavigate = (url: string) => {
		navigate(url)
	}

	const { data: rolesData = undefined } = useGetEmploymentPossibleRolesQuery()
	const isPersonnelDepartment = rolesData?.find(
		role => role === 'PERSONNEL_DEPARTMENT'
	)
	const isSupervisor = rolesData?.find(role => role === 'SUPERVISOR')

	const isAccounting = rolesData?.find(role => role === 'ACCOUNTING')

	const isLaborProtection = rolesData?.find(role => role === 'LABOR_PROTECTION_DEPARTMENT')


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
			id: '/services/personnelaccounting/personnel-department/employment',
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

	const navAccountingList = [
		{
		id: '/services/personnelaccounting/accounting/requisite',
		icon: <VacanciesIcon />,
		name: 'Реквизиты'
		},
	]

	const navLaborProtectionList = [
		{
			id: '/services/personnelaccounting/labor-protection/test-results',
			icon: <TestResultsIconSvg />,
			name: 'Результаты тестов'
		},
		{
			id: '/services/personnelaccounting/labor-protection/signed',
			icon: <SignedIconSvg />,
			name: 'Подписанные'
		},
	]

	const navEmployeeListVacancyItems: CollapseProps['items'] = [
		{
			key: 'allVacancies',
			label: (
				<div className="flex items-center gap-[10px]">
					{<VacanciesIcon />}
					<p className="text-base">{'Вакансии'}</p>
				</div>
			),
			children: (
				<div className="flex flex-col gap-[12px] ml-[24px]">
					<p
						className={clsx(
							'font-content-font text-black text-[14px]/[14px] font-normal',
							(!(
								pathname === '/services/personnelaccounting/vacancies'
									||
								pathname.match(/\/services\/personnelaccounting\/vacancies\/vacancyedit\/\d+/)

								) && 'opacity-[52%]')
						)}
						onClick={() => {
							navigate('/services/personnelaccounting/vacancies')
						}}
					>
						Все вакансии
					</p>
					<p
						className={clsx(
							'font-content-font text-black text-[14px]/[14px] font-normal',
							(!(
								pathname === '/services/personnelaccounting/vacancyrequests' ||
								pathname.match(/\/services\/personnelaccounting\/request\/create\/\d+/) ||
								pathname.match(/\/services\/personnelaccounting\/request\/update\/\d+/) ||
								pathname.match(/\/services\/personnelaccounting\/request\/(\d+)\/delete\/(\d+)/)

								) && 'opacity-[52%]')
						)}
						onClick={() => {
							navigate('/services/personnelaccounting/vacancyrequests')
						}}
					>
						Заявки от руководилей
					</p>
				</div>
			)
		}
	]

	const navEmployeeListReserveItems: CollapseProps['items'] = [
		{
			key: 'allVacancies',
			label: (
				<div className="flex items-center gap-[10px]">
					{<VacanciesIcon />}
					<p className="text-base">{'Кадровый резерв'}</p>
				</div>
			),
			children: (
				<div className="flex flex-col gap-[12px] ml-[24px]">
					<p
						className={clsx(
							'font-content-font text-black text-[14px]/[14px] font-normal',
							!(
								(pathname === '/services/personnelaccounting/reserve') ||
								pathname.match(/\/services\/personnelaccounting\/reserve\/fullinfo\/\d+/)
							)
							&&
							'opacity-[52%]'
						)}
						onClick={() => {
							navigate('/services/personnelaccounting/reserve')
						}}
					>
						Резерв
					</p>
					<p
						className={clsx(
							'font-content-font text-black text-[14px]/[14px] font-normal',
							!(
								(pathname === '/services/personnelaccounting/archive') ||
								pathname.match(/\/services\/personnelaccounting\/archive\/fullinfo\/\d+/)
							)
							&&
								'opacity-[52%]'
						)}
						onClick={() => {
							navigate('/services/personnelaccounting/archive')
						}}
					>
						Архив
					</p>
				</div>
			)
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
				<div className="flex flex-col gap-[12px] ml-[24px]">
					<p
						className={clsx(
							'font-content-font text-black text-[14px]/[14px] font-normal',
							!(
								pathname === '/services/personnelaccounting/supervisor/vacancies' ||
								pathname.match(/\/services\/personnelaccounting\/supervisor\/vacancyview\/\d+/)

							) &&
								'opacity-[52%]'
						)}
						onClick={() => {
							navigate('/services/personnelaccounting/supervisor/vacancies')
						}}
					>
						Все вакансии
					</p>
					<p
						className={clsx(
							'font-content-font text-black text-[14px]/[14px] font-normal',
							!(
								pathname === '/services/personnelaccounting/supervisor/createvacancy'
							) &&
								'opacity-[52%]'
						)}
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

	const navSupervisorListInterviewItems: CollapseProps['items'] = [
		{
			key: 'allInterviews',
			label: (
				<div className="flex items-center gap-[10px]">
					{<BriefcaseSvg />}
					<p className="text-base">{'Собеседование'}</p>
				</div>
			),
			children: (
				<div className="flex flex-col gap-[12px] ml-[24px]">
					<p
						className={clsx(
							'font-content-font text-black text-[14px]/[14px] font-normal',
							!(
								pathname === '/services/personnelaccounting/supervisor/invitation' ||
								pathname.match(/\/services\/personnelaccounting\/supervisor\/invitation\/seekerinfo\/\d+/)
							) && 'opacity-[52%]'
						)}
						onClick={() => {
							navigate('/services/personnelaccounting/supervisor/invitation')
						}}
					>
						Все собеседования
					</p>
					<p
						className={clsx(
							'font-content-font text-black text-[14px]/[14px] font-normal',
							!(
								pathname === '/services/personnelaccounting/supervisor/scheduleinvitation'
							) && 'opacity-[52%]'
						)}
						onClick={() => {
							navigate('/services/personnelaccounting/supervisor/scheduleinvitation')
						}}
					>
						Назначить собеседование
					</p>
				</div>
			)
		}
	]

	const handleList = navEmployeeList.map(({ id, icon, name }, index) => {
		if (name === 'Вакансии') {
			return (
				<li
					key={index}
					className={clsx(
						'w-full flex items-center pl-[16px] hover:bg-[#F5F8FB] cursor-pointer',
						(
							pathname === '/services/personnelaccounting/vacancies' ||
							pathname.match(/\/services\/personnelaccounting\/vacancies\/vacancyedit\/\d+/) ||
							pathname === '/services/personnelaccounting/vacancyrequests' ||
							pathname.match(/\/services\/personnelaccounting\/request\/create\/\d+/) ||
							pathname.match(/\/services\/personnelaccounting\/request\/update\/\d+/) ||
							pathname.match(/\/services\/personnelaccounting\/request\/delete\/\d+/)
						) && 'bg-[#F5F8FB]'
					)}
				>
					<ConfigProvider
					// theme={{
					// 	components: {
					// 		Collapse: {
					// 			headerBg: '#ffffff',
					// 			headerPadding: '0px 20px 0px 0px'
					// 		}
					// 	}
					// }}
					>
						<Collapse
							className="w-full !bg-inherit"
							items={navEmployeeListVacancyItems}
							expandIconPosition="end"
							bordered={false}
							style={{}}
						/>
					</ConfigProvider>
				</li>
			)
		} else if (name === 'Кадровый резерв') {
			return (
				<li
					key={index}
					className={clsx(
						'w-full flex items-center pl-[16px] hover:bg-[#F5F8FB] cursor-pointer',
						(
							pathname === '/services/personnelaccounting/reserve' ||
							pathname === '/services/personnelaccounting/archive' ||
							pathname.match(/\/services\/personnelaccounting\/reserve\/fullinfo\/\d+/) ||
							pathname.match(/\/services\/personnelaccounting\/archive\/fullinfo\/\d+/)
						) && 'bg-[#F5F8FB]'
					)}
				>
					<ConfigProvider>
						<Collapse
							className="w-full !bg-inherit"
							items={navEmployeeListReserveItems}
							expandIconPosition="end"
							bordered={false}
							style={{}}
						/>
					</ConfigProvider>
				</li>
			)
		}
		else if (name === 'Этап трудоустройства') {
			return (
				<li
					key={index}
					className={clsx(
						'w-full flex items-center py-2 pl-8 hover:bg-[#F5F8FB] cursor-pointer',
						(
							pathname === '/services/personnelaccounting/personnel-department/employment' ||
							pathname.match(/\/services\/personnelaccounting\/personnel-department\/employment\/stages\/\d+/) ||  // Для пути с произвольным ID
							pathname.match(/\/services\/personnelaccounting\/personnel-department\/employment\/stages\/\d+\/seeker-info/)  // Для пути с ID и seeker-info
						) && 'bg-[#F5F8FB]'
					)}
					onClick={() => handleNavigate(id)}
				>
					<div className="flex items-center gap-[10px]">
						{icon}
						<p className="text-base">{name}</p>
					</div>
				</li>
			)
		} else if (name === 'Сообщения') {
			return (
				<li
					key={index}
					className={clsx(
						'w-full flex items-center py-2 pl-8 hover:bg-[#F5F8FB] cursor-pointer',
						(
							pathname === '/services/personnelaccounting/chat' ||
							/\/services\/personnelaccounting\/chat\/id\/\d+/.test(pathname) ||
							pathname === '/services/personnelaccounting/chat/vacancyview'
						) && 'bg-[#F5F8FB]'
					)}
					onClick={() => handleNavigate(id)}
				>
					<div className="flex items-center gap-[10px]">
						{icon}
						<p className="text-base">{name}</p>
					</div>
				</li>
			)
		} else if (name === 'Отклики') {
			return (
				<li
					key={index}
					className={clsx(
						'w-full flex items-center py-2 pl-8 hover:bg-[#F5F8FB] cursor-pointer',
						(
							pathname === '/services/personnelaccounting/responds' ||
							/\/services\/personnelaccounting\/responds\/byvacancy\/\d+/.test(pathname) ||
							/\/services\/services\/personnelaccounting\/responds\/fullinfo\/\d+/.test(pathname)
						) && 'bg-[#F5F8FB]'
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
		else if (name === 'Отклики') {
			return (
				<li
					key={index}
					className={clsx(
						'w-full flex items-center py-2 pl-8 hover:bg-[#F5F8FB] cursor-pointer',
						(
							pathname === 'services/personnelaccounting/personnel-department/employment' ||
							pathname === 'services/personnelaccounting/personnel-department/employment/stages' ||
							pathname === 'services/personnelaccounting/personnel-department/employment/stages/seeker-info'
						) && 'bg-[#F5F8FB]'
					)}
					onClick={() => handleNavigate(id)}
				>
					<div className="flex items-center gap-[10px]">
						{icon}
						<p className="text-base">{name}</p>
					</div>
				</li>
			)
		} else if (name === 'Сообщения') {
			return (
				<li
					key={index}
					className={clsx(
						'w-full flex items-center py-2 pl-8 hover:bg-[#F5F8FB] cursor-pointer',
						(
							pathname === 'services/personnelaccounting/personnel-department/employment' ||
							pathname === 'services/personnelaccounting/personnel-department/employment/stages' ||
							pathname === 'services/personnelaccounting/personnel-department/employment/stages/seeker-info'
						) && 'bg-[#F5F8FB]'
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
	})

	const handleSupervisorList = navSupervisorList.map(
		({ id, icon, name }, index) => {
			if (name === 'Вакансии') {
				return (
					<li
						key={index}
						className={clsx(
							'w-full flex items-center pl-4 hover:bg-[#F5F8FB]  cursor-pointer',
							(
								id === pathname ||
								pathname === '/services/personnelaccounting/supervisor/vacancies' ||
								pathname === '/services/personnelaccounting/supervisor/createvacancy' ||
								pathname.match(/\/services\/personnelaccounting\/supervisor\/vacancyview\/\d+/)
							) && 'bg-[#F5F8FB]'
						)}
					>
						<ConfigProvider
						// theme={{
						// 	components: {
						// 		Collapse: {
						// 			headerBg: '#ffffff',
						// 			headerPadding: '0px 20px 0px 0px'
						// 		}
						// 	}
						// }}
						>
							<Collapse
								className="w-full !bg-inherit"
								items={navSupervisorListVacancyItems}
								expandIconPosition="end"
								bordered={false}
								style={{}}
							/>
						</ConfigProvider>
					</li>
				)
			} else if (name === 'Собеседование') {
				return (
					<li
						key={index}
						className={clsx(
							'w-full flex pl-4 items-center hover:bg-[#F5F8FB]  cursor-pointer',
							(
								id === pathname ||
								pathname === '/services/personnelaccounting/supervisor/invitation' ||
								pathname.match(/\/services\/personnelaccounting\/supervisor\/invitation\/seekerinfo\/\d+/) ||
								pathname === '/services/personnelaccounting/supervisor/scheduleinvitation'
							) && 'bg-[#F5F8FB]'
						)}
					>
						<ConfigProvider
						// theme={{
						// 	components: {
						// 		Collapse: {
						// 			headerBg: '#ffffff',
						// 			headerPadding: '0px 20px 0px 0px'
						// 		}
						// 	}
						// }}
						>
							<Collapse
								className="w-full !bg-inherit"
								items={navSupervisorListInterviewItems}
								expandIconPosition="end"
								bordered={false}
								style={{}}
							/>
						</ConfigProvider>
					</li>
				)
			} else if (name === 'Отклики') {
				return (
					<li
						key={index}
						className={clsx(
							'w-full flex items-center py-2 pl-8 hover:bg-[#F5F8FB]  cursor-pointer',
							(
								pathname === '/services/personnelaccounting/supervisor/responds' ||
								pathname.match(/\/services\/personnelaccounting\/supervisor\/responds\/fullinfo\/\d+/)
							) && 'bg-[#F5F8FB]'
						)}
						onClick={() => handleNavigate(id)}
					>
						<div className="flex items-center gap-[10px]">
							{icon}
							<p className="text-base">{name}</p>
						</div>
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
	const handleAccountingList = navAccountingList.map(
		({ id, icon, name }, index) => {
			if (name === "Реквизиты") {
				return (
					<li
						key={index}
						className={clsx(
							'w-full flex items-center py-2 pl-8 hover:bg-[#F5F8FB]  cursor-pointer',
							(
								pathname === '/services/personnelaccounting/accounting/requisite' ||
								pathname.match(/\/services\/personnelaccounting\/accounting\/requisite\/requisite-review\/\d+/) ||  // Для пути с произвольным ID
								pathname.match(/\/services\/personnelaccounting\/accounting\/requisite\/requisite-review\/\d+\/seeker-info/)  // Для пути с ID и seeker-info
							) && 'bg-[#F5F8FB]'
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
	const handleLaborProtectionList = navLaborProtectionList.map(
		({ id, icon, name }, index) => {
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
	)
	if (!(isPersonnelDepartment || isSupervisor || isAccounting || isLaborProtection))
		return (
			<>
				<Header type="service" service="employment" />
			</>
		)

	return (
		<>
			<Header type="service" service="employment" />
			<div className="shadowNav">
				<ul className="min-w-[230px] pt-14 flex flex-col gap-4 sticky top-[80px]">
					{isPersonnelDepartment ? handleList : <></>}
					{isSupervisor ? handleSupervisorList : <></>}
					{isAccounting ? handleAccountingList : <></>}
					{isLaborProtection ? handleLaborProtectionList : <></>}
				</ul>
			</div>
			<div className="bg-[#F5F8FB] flex w-full">
				{pathname === navEmployeeList[0].id && <Responds />}
				{pathname.match(
					'services/personnelaccounting/responds/byvacancy/*'
				) && <VacancyResponces />}
				{pathname.match('services/personnelaccounting/responds/fullinfo') && (
					<RespondInfo type="PERSONNEL_DEPARTMENT" />
				)}
				{pathname.match(/\/services\/personnelaccounting\/supervisor\/responds\/fullinfo\/\d+/) && (
					<RespondInfo type="SUPERVISOR" />
				)}
				{pathname.includes(navEmployeeList[1].id) && <ChatEmpDemp />}
				{pathname === navEmployeeList[2].id && <DepEmployment />}
				{pathname === navEmployeeList[3].id && <Catalog />}
				{pathname.match(
					'services/personnelaccounting/vacancies/vacancyedit'
				) && <VacancyEditView />}
				{pathname === '/services/personnelaccounting/vacancyrequests' && (
					<VacancyRequestsPage />
				)}

				{pathname.match(/\/services\/personnelaccounting\/request\/create\/\d+/) && (
					<VacancyRequestCreateView />
				)}
				{pathname.match(/\/services\/personnelaccounting\/request\/update\/\d+/) && (
					<VacancyRequestUpdateView />
				)}
				{pathname.match(/\/services\/personnelaccounting\/request\/(\d+)\/delete\/(\d+)/) && (
					<VacancyRequestDeleteView />
				)}

				{pathname === navEmployeeList[4].id && <Reserve />}
				{pathname.match(/\/services\/personnelaccounting\/reserve\/fullinfo\/\d+/)  && (
					<ReserveRespondInfo type="PERSONNEL_DEPARTMENT" />
				)}
				{pathname === '/services/personnelaccounting/archive' && <Archive />}
				{pathname.match(/\/services\/personnelaccounting\/archive\/fullinfo\/\d+/)  && (
					<ArchiveRespondInfo type="PERSONNEL_DEPARTMENT" />
				)}
				{pathname === navSupervisorList[0].id && <RespondsSupervisor />}
				{pathname === navSupervisorList[1].id && <></>}
				{pathname === navSupervisorList[2].id && <SupervisorVacancies />}
				{pathname ===
					'/services/personnelaccounting/supervisor/createvacancy' && (
					<SupervisorCreateVacancyForm />
				)}
				{pathname.match(/\/services\/personnelaccounting\/supervisor\/vacancyview\/\d+/) && (
					<SupervisorUpdateVacancy />
				)}
				{pathname === '/services/personnelaccounting/supervisor/invitation' && (
					<SupervisorInterviews />
				)}
				{pathname ===
					'/services/personnelaccounting/supervisor/scheduleinvitation' && (
					<SupervisorInterviewCreate />
				)}
				{pathname.match(/\/services\/personnelaccounting\/supervisor\/invitation\/seekerinfo\/\d+/) && (
					<SupervisorInterviewSeekerInfo />
				)}
				{pathname.match(/\/services\/personnelaccounting\/personnel-department\/employment\/stages\/\d+/) && !pathname.includes('/seeker-info') && (
					<EmploymentStageInfo />
				)}
				{pathname.match(/\/services\/personnelaccounting\/personnel-department\/employment\/stages\/\d+\/seeker-info/) && (
					<DepEmploymentSeekerInfo />
				)}
				{pathname === '/services/personnelaccounting/accounting/requisite' && (
					<RequisiteMain/>
				)}
				{pathname.match(/\/services\/personnelaccounting\/accounting\/requisite\/requisite-review\/\d+/) && !pathname.includes('/seeker-info') && (
					<RequisiteStage/>
				)}
				{pathname.match(/\/services\/personnelaccounting\/accounting\/requisite\/requisite-review\/\d+\/seeker-info/) && (
					<RequisiteSeeker/>
				)}
				{pathname === '/services/personnelaccounting/labor-protection/test-results' && (
					<TestResults/>
				)}
				{pathname === '/services/personnelaccounting/labor-protection/signed' && (
					<Signed/>
				)}
			</div>
		</>
	)
}
