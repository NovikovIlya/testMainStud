import { LoadingOutlined } from '@ant-design/icons'
import { Button, ConfigProvider, Form, Input, Modal, Select, Spin } from 'antd'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { ModalOkSvg } from '../../../../../assets/svg/ModalOkSvg'
import { useAppSelector } from '../../../../../store'
import {
	useGetCategoriesQuery,
	useGetDirectionsQuery,
	useGetSubdivisionsQuery,
	useLazyGetVacancyViewQuery,
	useRequestUpdateVacancyMutation
} from '../../../../../store/api/serviceApi'
import { VacancyViewResponceType } from '../../../../../store/reducers/type'
import { useAlert } from '../../../../../utils/Alert/AlertMessage'
import ArrowIcon from '../../../jobSeeker/ArrowIcon'

export const SupervisorUpdateVacancy = () => {
	const [getVacancy, { data, isLoading, error }] = useLazyGetVacancyViewQuery()

	useEffect(() => {
		// Получаем текущий URL
		const currentUrl = window.location.pathname

		// Ищем id из URL
		const match = currentUrl.match(/\/vacancyview\/(\d+)$/)

		let id_from_url: string | undefined

		if (match) {
			id_from_url = match[1]
		} else {
			console.error('ID not found')
			return // Возвращаемся, если id нет
		}

		// Если id найден, запускаем запрос
		if (id_from_url) {
			getVacancy(id_from_url)
		}
	}, [getVacancy])

	console.log(data)

	const { openAlert } = useAlert()

	const { currentVacancy } = useAppSelector(state => state.currentVacancy)

	const { data: categories = [] } = useGetCategoriesQuery()
	const [categoryTitle, setCategoryTitle] = useState<string>('')
	const { data: directions = [] } = useGetDirectionsQuery(categoryTitle)
	const { data: subdivisions = [] } = useGetSubdivisionsQuery(categoryTitle)

	const navigate = useNavigate()
	const [requestUpdate] = useRequestUpdateVacancyMutation()

	const [isEdit, setIsEdit] = useState<boolean>(false)
	const [isSendRequestButtonActivated, setIsSendRequestButtonActivated] = useState<boolean>(false)

	const [post, setPost] = useState<string | undefined>(data?.title.rendered)
	const [experience, setExperience] = useState<string | undefined>(data?.acf.experience)
	const [employment, setEmployment] = useState<string | undefined>(data?.acf.employment)
	const [salary, setSalary] = useState<string | undefined>(data?.acf.salary)
	const [category, setCategory] = useState<string | undefined>(data?.acf.category)
	const [direction, setDirection] = useState<string | undefined>(data?.acf.direction)
	const [subdivision, setSubdivision] = useState<string | undefined>(data?.acf.subdivision)

	useEffect(()=>{
		setPost(data?.title.rendered)
		setExperience(data?.acf.experience)
		setEmployment(data?.acf.employment)
		setSalary(data?.acf.salary)
		setCategory(data?.acf.category)
		setDirection(data?.acf.direction)
		setSubdivision(data?.acf.subdivision)
	}, [data])

	const [responsibilities, setResponsibilities] = useState<string | undefined>(
		data?.acf.responsibilities
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
	console.log(responsibilities)
	const [skills, setSkills] = useState<string | undefined>(
		data?.acf.skills
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
		data?.acf.conditions
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

	useEffect(()=>{
		setResponsibilities(data?.acf.responsibilities)
		setSkills(data?.acf.skills)
		setConditions(data?.acf.conditions)
	}, [data])

	const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)

	const [form] = Form.useForm()

	if (isLoading) {
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
					bodyStyle={{ padding: 53 }}
					centered
					open={isSuccessModalOpen}
					onCancel={() => {
						setIsSuccessModalOpen(false)
						navigate('/services/personnelaccounting/supervisor/vacancies')
					}}
					title={null}
					footer={null}
					width={407}
				>
					<div className="flex flex-col">
						<div className="w-full flex justify-center">
							<ModalOkSvg />
						</div>
						<p className="font-content-font font-normal text-black text-[16px]/[20px] text-center mt-[22px]">
							Ваша заявка на редактирование вакансии успешно отправлена. Описание вакансии будет обновлено после
							рассмотрения заявки кадрами.
						</p>
						<Button
							className="rounded-[40px] mt-[40px]"
							type="primary"
							onClick={() => {
								setIsSuccessModalOpen(false)
								navigate(-1)
							}}
						>
							ОК
						</Button>
					</div>
				</Modal>
			</ConfigProvider>
			<div id="wrapper" className="pl-[54px] pr-[54px] pt-[60px] mt-[60px] mb-[52px] w-full">
				<div className="flex">
					<button
						onClick={() => {
							isEdit ? setIsEdit(false) : navigate('/services/personnelaccounting/supervisor/vacancies')
						}}
						className="bg-inherit border-none cursor-pointer"
					>
						<ArrowIcon />
					</button>
					<p className="ml-[32px] font-content-font font-normal text-black text-[28px]/[33.6px]">
						{'«' + post + '»'}
					</p>
				</div>
				{isEdit ? (
					<Form
						form={form}
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
						className="w-[50%] mt-[52px]"
						onFinish={async values => {
							try {
								setPost(prev => values.post)
								setExperience(prev => values.experience)
								setEmployment(prev => values.employment)
								setSalary(prev => values.salary)
								setResponsibilities(prev => values.responsibilities)
								setSkills(prev => values.skills)
								setConditions(prev => values.conditions)
								form.isFieldsTouched() && setIsSendRequestButtonActivated(true)
								setIsEdit(false)
							} catch (error: any) {
								openAlert({ type: 'error', text: 'Извините, что-то пошло не так...' })
							}
						}}
					>
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
										{ value: 'Нет опыта', label: 'Нет опыта' },
										{
											value: 'Опыт от 1 до 3 лет',
											label: 'Опыт от 1 до 3 лет'
										},
										{
											value: 'Опыт от 3 до 6 лет',
											label: 'Опыт от 3 до 6 лет'
										},
										{ value: 'Опыт более 6 лет', label: 'Опыт более 6 лет' }
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
										{ value: 'Полный график', label: 'Полный график' },
										{ value: 'Гибкий график', label: 'Гибкий график' },
										{ value: 'Сменный график', label: 'Сменный график' },
										{ value: 'Удалённая работа', label: 'Удалённая работа' }
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
								<label className="text-black text-[18px]/[18px] font-content-font font-normal opacity-80">
									Условия
								</label>
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
					<div className="w-[50%] mt-[52px] flex flex-col gap-[40px]">
						<div className="flex gap-[60px]">
							<div className="flex flex-col gap-[16px]">
								<p className="font-content-font font-bold text-black text-[18px]/[21px]">Требуемый опыт работы:</p>
								<p className="font-content-font font-normal text-black text-[18px]/[21px]">{experience}</p>
							</div>
							<div className="flex flex-col gap-[16px]">
								<p className="font-content-font font-bold text-black text-[18px]/[21px]">Тип занятости:</p>
								<p className="font-content-font font-normal text-black text-[18px]/[21px]">{employment}</p>
							</div>
							<div className="flex flex-col gap-[16px]">
								<p className="font-content-font font-bold text-black text-[18px]/[21px]">Заработная плата:</p>
								<p className="font-content-font font-normal text-black text-[18px]/[21px]">{salary}</p>
							</div>
						</div>
						<div className="flex flex-col gap-[16px]">
							<p className="font-content-font font-bold text-black text-[18px]/[21px]">Задачи:</p>
							<p className="font-content-font font-normal text-black text-[18px]/[21px] whitespace-pre-line">
								{responsibilities}
							</p>
						</div>
						<div className="flex flex-col gap-[16px]">
							<p className="font-content-font font-bold text-black text-[18px]/[21px]">Требования:</p>
							<p className="font-content-font font-normal text-black text-[18px]/[21px] whitespace-pre-line">
								{skills}
							</p>
						</div>
						<div className="flex flex-col gap-[16px]">
							<p className="font-content-font font-bold text-black text-[18px]/[21px]">Условия:</p>
							<p className="font-content-font font-normal text-black text-[18px]/[21px] whitespace-pre-line">
								{conditions}
							</p>
						</div>
						<div className="flex gap-[40px]">
							<div className="flex flex-col gap-[16px]">
								<p className="font-content-font font-bold text-black text-[18px]/[21px]">Категория сотрудников </p>
								<p className="font-content-font font-normal text-black text-[18px]/[21px]">{category}</p>
							</div>
							<div className="flex flex-col gap-[16px]">
								<p className="font-content-font font-bold text-black text-[18px]/[21px]">
									{direction === "" ? "Подразделение" : "Профобласть"}
								</p>
								<p className="font-content-font font-normal text-black text-[18px]/[21px]">
									{direction === "" ? subdivision : direction}
								</p>
							</div>
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
							{isSendRequestButtonActivated && (
								<Button
									onClick={async () => {
										try {
											await requestUpdate({
												post: post as string,
												experience: experience as string,
												salary: salary as string,
												employment: employment as string,
												responsibilities: responsibilities as string,
												skills: skills as string,
												conditions: conditions as string,
												vacancyId: data?.id as number
											})
												.unwrap()
												.then(() => {
													setIsSuccessModalOpen(true)
												})
										} catch (error: any) {
											openAlert({ type: 'error', text: 'Извините, что-то пошло не так...' })
										}
									}}
									type="primary"
									className="rounded-[54.5px] w-[121px]"
								>
									Отправить
								</Button>
							)}
						</div>
					</div>
				)}
			</div>
		</>
	)
}
