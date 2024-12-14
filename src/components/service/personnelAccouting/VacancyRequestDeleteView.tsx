import { Button, ConfigProvider, Modal } from 'antd'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { ModalOkSvg } from '../../../assets/svg/ModalOkSvg'
import { WarningModalIconSvg } from '../../../assets/svg/WarningModalIconSvg'
import { useAppSelector } from '../../../store'
import { useAcceptDeleteVacancyRequestMutation, useGetVacancyRequestsQuery } from '../../../store/api/serviceApi'
import ArrowIcon from '../jobSeeker/ArrowIcon'

export const VacancyRequestDeleteView = () => {
	const { currentVacancy } = useAppSelector(state => state.currentVacancy)
	const { requestId } = useAppSelector(state => state.currentRequest)

	const navigate = useNavigate()
	const [acceptRequest] = useAcceptDeleteVacancyRequestMutation()

	const { refetch } = useGetVacancyRequestsQuery('все')

	const [post, setPost] = useState<string | undefined>(currentVacancy?.title.rendered)
	const [experience, setExperience] = useState<string | undefined>(currentVacancy?.acf.experience)
	const [employment, setEmployment] = useState<string | undefined>(currentVacancy?.acf.employment)
	const [salary, setSalary] = useState<string | undefined>(currentVacancy?.acf.salary)
	const [category, setCategory] = useState<string | undefined>(currentVacancy?.acf.category)
	const [direction, setDirection] = useState<string | undefined>(currentVacancy?.acf.direction)
	const [subdivision, setSubdivision] = useState<string | undefined>(currentVacancy?.acf.subdivision)

	const [responsibilities, setResponsibilities] = useState<string | undefined>(
		currentVacancy?.acf.responsibilities
			.replace(/<strong>/g, '')
			.replace(/<\/strong>/g, '')
			.replace(/<u>/g, '')
			.replace(/<\/u>/g, '')
			.replace(/<i>/g, '')
			.replace(/<\/i>/g, '')
			.replace(/<em>/g, '')
			.replace(/<\/em'>/g, '')
			.replace(/<ul>/g, '')
			.replace(/<\/ul>/g, '')
			.replace(/<li>/g, '')
			.replace(/<\/li>/g, '')
	)

	const [skills, setSkills] = useState<string | undefined>(
		currentVacancy?.acf.skills
			.replace(/<strong>/g, '')
			.replace(/<\/strong>/g, '')
			.replace(/<u>/g, '')
			.replace(/<\/u>/g, '')
			.replace(/<i>/g, '')
			.replace(/<\/i>/g, '')
			.replace(/<em>/g, '')
			.replace(/<\/em'>/g, '')
			.replace(/<ul>/g, '')
			.replace(/<\/ul>/g, '')
			.replace(/<li>/g, '')
			.replace(/<\/li>/g, '')
	)

	const [conditions, setConditions] = useState<string | undefined>(
		currentVacancy?.acf.conditions
			.replace(/<strong>/g, '')
			.replace(/<\/strong>/g, '')
			.replace(/<u>/g, '')
			.replace(/<\/u>/g, '')
			.replace(/<i>/g, '')
			.replace(/<\/i>/g, '')
			.replace(/<em>/g, '')
			.replace(/<\/em'>/g, '')
			.replace(/<ul>/g, '')
			.replace(/<\/ul>/g, '')
			.replace(/<li>/g, '')
			.replace(/<\/li>/g, '')
	)

	const [isResultModalOpen, setIsResultModalOpen] = useState<boolean>(false)
	const [isVerifyModalOpen, setIsVerifyModalOpen] = useState<boolean>(false)
	const [resultModalText, setResultModalText] = useState<string>('')

	return (
		<>
			<ConfigProvider
				theme={{
					token: {
						boxShadow: '0 0 19px 0 rgba(212, 227, 241, 0.6)'
					}
				}}
			>
				<Modal
					bodyStyle={{
						padding: '26px'
					}}
					width={407}
					className="pr-[52px] pl-[52px] pb-[52px]"
					open={isResultModalOpen}
					title={null}
					footer={null}
					centered
					onCancel={() => {
						setIsResultModalOpen(false)
					}}
				>
					<div className="flex flex-col">
						<div className="w-full flex justify-center">
							<ModalOkSvg />
						</div>
						<p className="text-center font-content-font text-black text-[16px]/[20px] font-normal mt-[22px]">
							{resultModalText}
						</p>
						<Button
							className="rounded-[40px] w-full !py-[13px] mt-[40px]"
							type="primary"
							onClick={() => {
								setIsResultModalOpen(false)
								navigate('/services/personnelaccounting/vacancyrequests')
							}}
						>
							Ок
						</Button>
					</div>
				</Modal>
			</ConfigProvider>
			<ConfigProvider
				theme={{
					token: {
						boxShadow: '0 0 19px 0 rgba(212, 227, 241, 0.6)'
					}
				}}
			>
				<Modal
					bodyStyle={{ padding: 53 }}
					centered
					open={isVerifyModalOpen}
					onCancel={() => {
						setIsVerifyModalOpen(false)
					}}
					title={null}
					footer={null}
					width={407}
				>
					<div className="flex flex-col">
						<div className="w-full flex justify-center">
							<WarningModalIconSvg />
						</div>
						<p className="font-content-font font-normal text-black text-[16px]/[20px] text-center mt-[22px]">
							Вы действительно хотите удалить вакансию?
						</p>
						<div className="mt-[40px] flex gap-[12px] w-full">
							<Button
								className="ml-auto w-full rounded-[54.5px] text-black font-content-font font-medium text-[16px]/[20px] border-black h-[40px]"
								onClick={() => {
									setIsVerifyModalOpen(false)
								}}
							>
								Оставить
							</Button>
							<button
								className="cursor-pointer flex items-center justify-center border-[1px] border-solid outline-0 border-[#FF5A5A] hover:border-[#FF8181] text-white rounded-[54.5px] bg-[#FF5A5A] hover:bg-[#FF8181] text-[14px] h-[40px] w-full py-[13px]"
								onClick={() => {
									acceptRequest(requestId)
										.unwrap()
										.then(() => {
											refetch().then(() => {
												setResultModalText('Вакансия успешно удалена')
												setIsVerifyModalOpen(false)
												setIsResultModalOpen(true)
											})
										})
								}}
							>
								Удалить
							</button>
						</div>
					</div>
				</Modal>
			</ConfigProvider>
			<div id="wrapper" className="pl-[54px] pr-[54px] pt-[120px] pb-[52px] w-full">
				<div className="flex">
					<button
						onClick={() => {
							navigate('/services/personnelaccounting/vacancyrequests')
						}}
						className="bg-inherit border-none cursor-pointer"
					>
						<ArrowIcon />
					</button>
					<p className="ml-[40px] font-content-font font-normal text-black text-[28px]/[33.6px]">
						{currentVacancy !== null ? currentVacancy.title.rendered : ''}
					</p>
				</div>
				<div className="w-[50%] mt-[52px] flex flex-col gap-[40px]">
					<div className="flex flex-col gap-[16px]">
						<p className="font-content-font font-bold text-black text-[18px]/[21px]">Должность:</p>
						<p className="font-content-font font-normal text-black text-[18px]/[21px]">{post && '«' + post + '»'}</p>
					</div>
					<div className="flex gap-[60px]">
						<div className="flex flex-col gap-[16px]">
							<p className="font-content-font font-bold text-black text-[18px]/[21px]">Требуемый опыт работы:</p>
							<p className="font-content-font font-normal text-black text-[18px]/[21px]">{experience && experience}</p>
						</div>
						<div className="flex flex-col gap-[16px]">
							<p className="font-content-font font-bold text-black text-[18px]/[21px]">Тип занятости:</p>
							<p className="font-content-font font-normal text-black text-[18px]/[21px]">{employment && employment}</p>
						</div>
						<div className="flex flex-col gap-[16px]">
							<p className="font-content-font font-bold text-black text-[18px]/[21px]">Заработная плата:</p>
							<p className="font-content-font font-normal text-black text-[18px]/[21px]">{salary && salary}</p>
						</div>
					</div>
					<div className="flex flex-col gap-[16px]">
						<p className="font-content-font font-bold text-black text-[18px]/[21px]">Задачи:</p>
						<p className="font-content-font font-normal text-black text-[18px]/[21px] whitespace-pre-line">
							{responsibilities && responsibilities}
						</p>
					</div>
					<div className="flex flex-col gap-[16px]">
						<p className="font-content-font font-bold text-black text-[18px]/[21px]">Требования:</p>
						<p className="font-content-font font-normal text-black text-[18px]/[21px] whitespace-pre-line">
							{skills && skills}
						</p>
					</div>
					<div className="flex flex-col gap-[16px]">
						<p className="font-content-font font-bold text-black text-[18px]/[21px]">Условия:</p>
						<p className="font-content-font font-normal text-black text-[18px]/[21px] whitespace-pre-line">
							{conditions && conditions}
						</p>
					</div>
					<div className="flex gap-[40px]">
						<div className="flex flex-col gap-[16px]">
							<p className="font-content-font font-bold text-black text-[18px]/[21px]">Категория сотрудников</p>
							<p className="font-content-font font-normal text-black text-[18px]/[21px]">{category && category}</p>
						</div>
						<div className="flex flex-col gap-[16px]">
							<p className="font-content-font font-bold text-black text-[18px]/[21px]">
								{direction && direction !== 'false' ? 'Профобласть' : subdivision && 'Подразделение'}
							</p>
							<p className="font-content-font font-normal text-black text-[18px]/[21px]">
								{direction && direction !== 'false' ? direction : subdivision && subdivision}
							</p>
						</div>
					</div>
					<Button
						onClick={() => {
							setIsVerifyModalOpen(true)
						}}
						type="primary"
						className="rounded-[54.5px] w-[121px]"
					>
						Удалить
					</Button>
				</div>
			</div>
		</>
	)
}
