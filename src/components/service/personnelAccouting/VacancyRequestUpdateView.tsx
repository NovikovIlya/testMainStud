import { LoadingOutlined } from '@ant-design/icons'
import { Button, ConfigProvider, Form, Input, Modal, Select, Spin } from 'antd'
import { diff_match_patch } from 'diff-match-patch'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { ModalOkSvg } from '../../../assets/svg/ModalOkSvg'
import { useAppSelector } from '../../../store'
import {
	useAcceptUpdateVacancyRequestMutation,
	useAlterUpdateVacancyRequestMutation,
	useDenyVacancyRequestMutation,
	useGetVacancyRequestViewQuery,
	useGetVacancyRequestsQuery,
	useLazyGetVacancyRequestViewQuery, useLazyGetVacancyViewQuery
} from '../../../store/api/serviceApi'
import ArrowIcon from '../jobSeeker/ArrowIcon'

export const VacancyRequestUpdateView = () => {

	const currentUrl = window.location.pathname;

	// Ищем id из URL
	const match = currentUrl.match(/\/update\/(\d+)$/);

	let id_from_url: string | number;

	if (match) {
		id_from_url = match[1];
	} else {
		console.error('ID not found');
	}

	const { requestId } = useAppSelector(state => state.currentRequest)

	const { data: requestView } = useGetVacancyRequestViewQuery(id_from_url)

	const [getVacancyRequestView, queryStatus] = useLazyGetVacancyRequestViewQuery()
	const navigate = useNavigate()
	const [acceptRequest] = useAcceptUpdateVacancyRequestMutation()
	const [alterRequest] = useAlterUpdateVacancyRequestMutation()
	const [denyRequest] = useDenyVacancyRequestMutation()

	const { refetch } = useGetVacancyRequestsQuery('все')

	const [isEdit, setIsEdit] = useState<boolean>(false)
	const [isEdited, setIsEdited] = useState<boolean>(false)

	const [post, setPost] = useState<string | undefined>(undefined)
	const [experience, setExperience] = useState<string | undefined>(undefined)
	const [employment, setEmployment] = useState<string | undefined>(undefined)
	const [salary, setSalary] = useState<string | undefined>(undefined)

	const [responsibilities, setResponsibilities] = useState<string | undefined>(undefined)

	const [skills, setSkills] = useState<string | undefined>(undefined)

	const [conditions, setConditions] = useState<string | undefined>(undefined)

	const [isResultModalOpen, setIsResultModalOpen] = useState<boolean>(false)
	const [isVerifyModalOpen, setIsVerifyModalOpen] = useState<boolean>(false)
	const [resultModalText, setResultModalText] = useState<string>('')

	useEffect(() => {
		getVacancyRequestView(requestId)
			.unwrap()
			.then(req => {
				setPost(req.newData.post)
				setExperience(req.newData.experience)
				setEmployment(req.newData.employment)
				setSalary(req.newData.salary)
				setResponsibilities(
					req.newData.responsibilities
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
				setConditions(
					req.newData.conditions
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
				setSkills(
					req.newData.skills
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
			})
	}, [])

	const dmp = new diff_match_patch()

	dmp.diff_cleanupSemantic(dmp.diff_main('', ''))

	if (queryStatus.isLoading || queryStatus.isFetching) {
		return (
			<>
				<div className="w-full h-full flex items-center">
					<div className="text-center ml-auto mr-auto">
						<Spin indicator={<LoadingOutlined style={{ fontSize: 36 }} spin />}></Spin>
						<p className="font-content-font font-normal text-black text-[18px]/[18px]">Идёт загрузка...</p>
					</div>
				</div>
			</>
		)
	}

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
						navigate(-1)
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
						<p className="font-content-font font-normal text-black text-[16px]/[20px] text-center">
							Вы действительно хотите обновить описание вакансии?
						</p>
						<div className="mt-[40px] flex gap-[12px] w-full">
							<Button
								className="ml-auto w-full rounded-[54.5px] text-black font-content-font font-medium text-[16px]/[20px] border-black"
								onClick={() => {
									setIsVerifyModalOpen(false)
								}}
							>
								Отменить
							</Button>
							<Button
								type="primary"
								className="mr-auto w-full rounded-[54.5px]"
								onClick={
									isEdited
										? () => {
												alterRequest({
													post: post as string,
													experience: experience as string,
													salary: salary as string,
													employment: employment as string,
													responsibilities: responsibilities as string,
													skills: skills as string,
													conditions: conditions as string,
													vacancyRequestId: requestId
												})
													.unwrap()
													.then(() => {
														acceptRequest(requestId)
															.unwrap()
															.then(() => {
																refetch()
															})
															.then(() => {
																setResultModalText('Описание вакансии успешно обновлено')
																setIsVerifyModalOpen(false)
																setIsResultModalOpen(true)
															})
													})
										  }
										: () => {
												acceptRequest(requestId)
													.unwrap()
													.then(() => {
														refetch()
													})
													.then(() => {
														setResultModalText('Описание вакансии успешно обновлено')
														setIsVerifyModalOpen(false)
														setIsResultModalOpen(true)
													})
										  }
								}
							>
								Обновить
							</Button>
						</div>
					</div>
				</Modal>
			</ConfigProvider>
			{isEdit ? (
				<Form
					initialValues={{
						post: post,
						salary: salary,
						responsibilities: responsibilities,
						skills: skills,
						conditions: conditions,
						experience: experience,
						employment: employment
					}}
					layout="vertical"
					requiredMark={false}
					className="w-[50%] mt-[112px] ml-[52px] pb-[52px]"
					onFinish={values => {
						setPost(prev => values.post)
						setExperience(prev => values.experience)
						setEmployment(prev => values.employment)
						setSalary(prev => values.salary)
						setResponsibilities(prev => values.responsibilities)
						setSkills(prev => values.skills)
						setConditions(prev => values.conditions)
						setIsEdited(true)
						setIsEdit(false)
					}}
				>
					<div className="flex mb-[40px]">
						<button
							onClick={() => {
								setIsEdit(false)
							}}
							className="bg-inherit border-none cursor-pointer"
						>
							<ArrowIcon />
						</button>
						<p className="ml-[40px] font-content-font font-normal text-black text-[28px]/[33.6px]">
							{post !== undefined ? '«' + post + '»' : ''}
						</p>
					</div>
					<Form.Item
						name={'post'}
						label={
							<label className="text-black text-[18px]/[18px] font-content-font font-normal opacity-80">
								Должность
							</label>
						}
						rules={[{ required: true, message: 'Не указана должность' }]}
					>
						<Input placeholder="Ввести название"></Input>
					</Form.Item>
					<div className="flex gap-[20px] w-full">
						<Form.Item
							name={'experience'}
							label={
								<label className="text-black text-[18px]/[18px] font-content-font font-normal opacity-80">
									Требуемый опыт работы
								</label>
							}
							rules={[{ required: true, message: 'Не указана опыт' }]}
						>
							<Select
								placeholder="Выбрать"
								options={[
									{ value: '0', label: '0' },
									{ value: '1', label: '1' },
									{ value: '2', label: '2' }
								]}
							></Select>
						</Form.Item>
						<Form.Item
							name={'employment'}
							label={
								<label className="text-black text-[18px]/[18px] font-content-font font-normal opacity-80">
									Тип занятости
								</label>
							}
							rules={[{ required: true, message: 'Не указан тип' }]}
						>
							<Select
								placeholder="Выбрать"
								options={[
									{ value: 'Полный день', label: 'Полный день' },
									{ value: 'Пол ставки', label: 'Пол ставки' },
									{ value: 'Четверть ставки', label: 'Четверть ставки' }
								]}
							></Select>
						</Form.Item>
						<Form.Item
							name={'salary'}
							label={
								<label className="text-black text-[18px]/[18px] font-content-font font-normal opacity-80">
									Заработная плата
								</label>
							}
							rules={[{ required: true, message: 'Не указана зарплата' }]}
						>
							<Input placeholder="Ввести"></Input>
						</Form.Item>
					</div>
					<Form.Item
						name={'responsibilities'}
						label={
							<label className="text-black text-[18px]/[18px] font-content-font font-normal opacity-80">Задачи</label>
						}
						rules={[{ required: true, message: 'Не указаны задачи' }]}
					>
						<Input.TextArea autoSize className="!h-[107px]" placeholder="Ввести текст..."></Input.TextArea>
					</Form.Item>
					<Form.Item
						name={'skills'}
						label={
							<label className="text-black text-[18px]/[18px] font-content-font font-normal opacity-80">
								Требования
							</label>
						}
						rules={[{ required: true, message: 'Не указаны требования' }]}
					>
						<Input.TextArea autoSize className="!h-[107px]" placeholder="Ввести текст..."></Input.TextArea>
					</Form.Item>
					<Form.Item
						name={'conditions'}
						label={
							<label className="text-black text-[18px]/[18px] font-content-font font-normal opacity-80">Условия</label>
						}
						rules={[{ required: true, message: 'Не указаны условия' }]}
					>
						<Input.TextArea autoSize className="!h-[107px]" placeholder="Ввести текст..."></Input.TextArea>
					</Form.Item>
					<Form.Item>
						<Button type="primary" htmlType="submit">
							Сохранить
						</Button>
					</Form.Item>
				</Form>
			) : (
				<div id="wrapper" className="pl-[54px] pr-[54px] pt-[120px] w-full">
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
							{requestView !== undefined && requestView.oldData !== null ? (
								<>
									<span>«</span>
									{(() => {
										var test = dmp.diff_main(
											requestView.oldData.post,
											isEdited ? (post as string) : requestView.newData.post
										)
										dmp.diff_cleanupSemantic(test)
										return test
									})().map(diff =>
										diff[0] < 0 ? (
											<span className="bg-red-400 bg-opacity-60">{diff[1]}</span>
										) : diff[0] > 0 ? (
											<span className="bg-green-400 bg-opacity-60">{diff[1]}</span>
										) : (
											<span>{diff[1]}</span>
										)
									)}
									<span>»</span>
								</>
							) : (
								''
							)}
						</p>
					</div>
					<div className="w-[50%] mt-[52px] flex flex-col gap-[40px]">
						<div className="flex gap-[60px]">
							<div className="flex flex-col gap-[16px]">
								<p className="font-content-font font-bold text-black text-[18px]/[21px]">Требуемый опыт работы:</p>
								<p className="font-content-font font-normal text-black text-[18px]/[21px]">

									{requestView !== undefined && requestView.oldData !== null
										? (() => {
												var test = dmp.diff_main(
													requestView.oldData.experience,
													isEdited ? (experience as string) : requestView.newData.experience
												)
												dmp.diff_cleanupSemantic(test)
												return test
										  })().map(diff =>
												diff[0] < 0 ? (
													<span className="bg-red-400 bg-opacity-60">{diff[1]}</span>
												) : diff[0] > 0 ? (
													<span className="bg-green-400 bg-opacity-60">{diff[1]}</span>
												) : (
													<span>{diff[1]}</span>
												)
										  )
										: ''}
								</p>
							</div>
							<div className="flex flex-col gap-[16px]">
								<p className="font-content-font font-bold text-black text-[18px]/[21px]">Тип занятости:</p>
								<p className="font-content-font font-normal text-black text-[18px]/[21px]">

									{requestView !== undefined && requestView.oldData !== null
										? (() => {
												var test = dmp.diff_main(
													requestView.oldData.employment,
													isEdited ? (employment as string) : requestView.newData.employment
												)
												dmp.diff_cleanupSemantic(test)
												return test
										  })().map(diff =>
												diff[0] < 0 ? (
													<span className="bg-red-400 bg-opacity-60">{diff[1]}</span>
												) : diff[0] > 0 ? (
													<span className="bg-green-400 bg-opacity-60">{diff[1]}</span>
												) : (
													<span>{diff[1]}</span>
												)
										  )
										: ''}
								</p>
							</div>
							<div className="flex flex-col gap-[16px]">
								<p className="font-content-font font-bold text-black text-[18px]/[21px]">Заработная плата:</p>
								<p className="font-content-font font-normal text-black text-[18px]/[21px]">

									{requestView !== undefined && requestView.oldData !== null
										? (() => {
												var test = dmp.diff_main(
													requestView.oldData.salary,
													isEdited ? (salary as string) : requestView.newData.salary
												)
												dmp.diff_cleanupSemantic(test)
												return test
										  })().map(diff =>
												diff[0] < 0 ? (
													<span className="bg-red-400 bg-opacity-60">{diff[1]}</span>
												) : diff[0] > 0 ? (
													<span className="bg-green-400 bg-opacity-60">{diff[1]}</span>
												) : (
													<span>{diff[1]}</span>
												)
										  )
										: ''}
								</p>
							</div>
						</div>
						<div className="flex flex-col gap-[16px]">
							<p className="font-content-font font-bold text-black text-[18px]/[21px]">Задачи:</p>
							<p className="font-content-font font-normal text-black text-[18px]/[21px] whitespace-pre-line">

								{requestView !== undefined && requestView.oldData !== null
									? (() => {
											var test = dmp.diff_main(
												requestView.oldData.responsibilities,
												isEdited ? (responsibilities as string) : requestView.newData.responsibilities
											)
											dmp.diff_cleanupSemantic(test)
											return test
									  })().map(diff =>
											diff[0] < 0 ? (
												<span className="bg-red-400 bg-opacity-60">{diff[1]}</span>
											) : diff[0] > 0 ? (
												<span className="bg-green-400 bg-opacity-60">{diff[1]}</span>
											) : (
												<span>{diff[1]}</span>
											)
									  )
									: ''}
							</p>
						</div>
						<div className="flex flex-col gap-[16px]">
							<p className="font-content-font font-bold text-black text-[18px]/[21px]">Требования:</p>
							<p className="font-content-font font-normal text-black text-[18px]/[21px] whitespace-pre-line">

								{requestView !== undefined && requestView.oldData !== null
									? (() => {
											var test = dmp.diff_main(
												requestView.oldData.skills,
												isEdited ? (skills as string) : requestView.newData.skills
											)
											dmp.diff_cleanupSemantic(test)
											return test
									  })().map(diff =>
											diff[0] < 0 ? (
												<span className="bg-red-400 bg-opacity-60">{diff[1]}</span>
											) : diff[0] > 0 ? (
												<span className="bg-green-400 bg-opacity-60">{diff[1]}</span>
											) : (
												<span>{diff[1]}</span>
											)
									  )
									: ''}
							</p>
						</div>
						<div className="flex flex-col gap-[16px]">
							<p className="font-content-font font-bold text-black text-[18px]/[21px]">Условия:</p>
							<p className="font-content-font font-normal text-black text-[18px]/[21px] whitespace-pre-line">

								{requestView !== undefined && requestView.oldData !== null
									? (() => {
											var test = dmp.diff_main(
												requestView.oldData.conditions,
												isEdited ? (conditions as string) : requestView.newData.conditions
											)
											dmp.diff_cleanupSemantic(test)
											return test
									  })().map(diff =>
											diff[0] < 0 ? (
												<span className="bg-red-400 bg-opacity-60">{diff[1]}</span>
											) : diff[0] > 0 ? (
												<span className="bg-green-400 bg-opacity-60">{diff[1]}</span>
											) : (
												<span>{diff[1]}</span>
											)
									  )
									: ''}
							</p>
						</div>
						<div className="flex gap-[20px]">
							<Button
								onClick={() => {
									setIsEdit(true)
								}}
								className="w-[151px] font-content-font font-normal text-black text-[16px]/[16px] rounded-[54.5px] py-[8px] px-[24px] border-black bg-inherit"
							>
								Редактировать
							</Button>
							<Button
								onClick={() => {
									setIsVerifyModalOpen(true)
								}}
								type="primary"
								className="rounded-[54.5px] w-[121px]"
							>
								Принять
							</Button>
						</div>
					</div>
				</div>
			)}
		</>
	)
}
