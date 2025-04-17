import { LoadingOutlined } from '@ant-design/icons'
import { Button, ConfigProvider, Form, Input, Modal, Select, Spin } from 'antd'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { ModalOkSvg } from '../../../assets/svg/ModalOkSvg'
import { WarningModalIconSvg } from '../../../assets/svg/WarningModalIconSvg'
import {
	useDeleteVacancyAsPerDepartmentMutation,
	useEditVacancyAsPerDepartmentMutation,
	useGetCategoriesQuery,
	useLazyGetVacancyViewQuery
} from '../../../store/api/serviceApi'
import { useAlert } from '../../../utils/Alert/AlertMessage'
import styles from '../../../utils/deleteOverwriteAntButton.module.css'
import ArrowIcon from '../jobSeeker/ArrowIcon'

export const VacancyEditView = () => {
	const [getVacancy, { data, isLoading }] = useLazyGetVacancyViewQuery()

	useEffect(() => {
		// Получаем текущий URL
		const currentUrl = window.location.pathname

		// Ищем id из URL
		const match = currentUrl.match(/\/vacancyedit\/(\d+)$/)

		let id_from_url: string | undefined

		if (match) {
			id_from_url = match[1]
		} else {
			console.error('ID not found')
			return // Возвращаемся, если id нет
		}

		// Если id найден, запускаем запрос
		if (id_from_url) {
			getVacancy(parseInt(id_from_url))
		}
	}, [getVacancy])

	console.log(data)

	const { data: categories = [] } = useGetCategoriesQuery()
	const [categoryTitle, setCategoryTitle] = useState<string>(data?.acf.category as string)

	const { openAlert } = useAlert()

	const navigate = useNavigate()
	const [editVacancy, { isLoading: editVacancyLoading }] = useEditVacancyAsPerDepartmentMutation()
	const [deleteVacancy, { isLoading: deleteVacancyLoading }] = useDeleteVacancyAsPerDepartmentMutation()

	const [isEdit, setIsEdit] = useState<boolean>(false)
	const [isSendRequestButtonActivated, setIsSendRequestButtonActivated] = useState<boolean>(false)

	const [post, setPost] = useState<string | undefined>(data?.title.rendered)
	const [experience, setExperience] = useState<string | undefined>(data?.acf.experience)
	const [employment, setEmployment] = useState<string | undefined>(data?.acf.employment)
	const [salary, setSalary] = useState<string | undefined>(data?.acf.salary)
	const [category, setCategory] = useState<string | undefined>(data?.acf.category)
	const [direction, setDirection] = useState<string | undefined>(data?.acf.direction)
	const [subdivision, setSubdivision] = useState<string | undefined>(data?.acf.subdivision)
	const [categoryOption, setCategoryOption] = useState<string | undefined>(data?.acf.category)

	useEffect(() => {
		setPost(data?.title.rendered)
		setExperience(data?.acf.experience)
		setEmployment(data?.acf.employment)
		setSalary(data?.acf.salary)
		setCategory(data?.acf.category)
		setDirection(data?.acf.direction)
		setSubdivision(data?.acf.subdivision)
		setCategoryTitle(data?.acf.category!)
		setCategoryOption(data?.acf.category)
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

	useEffect(() => {
		setResponsibilities(data?.acf.responsibilities)
		setSkills(data?.acf.skills)
		setConditions(data?.acf.conditions)
	}, [data])

	const [isSuccessModalOpen, setIsSuccessModalOpen] = useState<boolean>(false)
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false)
	const [resultModalText, setResultModalText] = useState<string>('')

	const [editForm] = Form.useForm()
	console.log(categories)
	console.log(categoryTitle)

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
					open={isDeleteModalOpen}
					onCancel={() => {
						setIsDeleteModalOpen(false)
					}}
					title={null}
					footer={null}
					width={407}
				>
					<div className="w-full flex justify-center">
						<WarningModalIconSvg />
					</div>
					<p className="font-content-font font-normal text-black text-[16px]/[20px] text-center mt-[22px]">
						Вы действительно хотите удалить вакансию?
					</p>
					<div className="mt-[40px] flex gap-[12px]">
						<Button
							className="ml-auto w-full rounded-[54.5px] text-black font-content-font font-medium text-[16px]/[20px] border-black h-[40px]"
							onClick={() => {
								setIsDeleteModalOpen(false)
							}}
						>
							Оставить
						</Button>
						<Button
							className={`${styles.customAntButton}`}
							onClick={async () => {
								try {
									await deleteVacancy(data?.id as number)
										.unwrap()
										.then(() => {
											setResultModalText('Вакансия успешно удалена.')
											setIsDeleteModalOpen(false)
											setIsSuccessModalOpen(true)
										})
								} catch (error: any) {
									openAlert({ type: 'error', text: 'Извините, что-то пошло не так...' })
								}
							}}
							loading={deleteVacancyLoading}
						>
							Удалить
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
					open={isSuccessModalOpen}
					onCancel={() => {
						setIsSuccessModalOpen(false)
						navigate(-1)
					}}
					title={null}
					footer={null}
					width={407}
				>
					<div className="w-full flex justify-center">
						<ModalOkSvg />
					</div>
					<p className="font-content-font font-normal text-black text-[16px]/[20px] text-center mt-[22px]">
						{resultModalText}
					</p>
					<Button
						className="mt-[40px] rounded-[40px] w-full"
						type="primary"
						onClick={() => {
							navigate(-1)
						}}
					>
						ОК
					</Button>
				</Modal>
			</ConfigProvider>
			<div id="wrapper" className="pl-[54px] pr-[54px] pt-[120px] pb-[52px] w-full">
				<div className="flex">
					<button
						onClick={() => {
							isEdit ? setIsEdit(false) : navigate('/services/personnelaccounting/vacancies')
						}}
						className="bg-inherit border-none cursor-pointer"
					>
						<ArrowIcon />
					</button>
					<p className="ml-[40px] font-content-font font-normal text-black text-[28px]/[33.6px]">
						{post !== undefined ? '«' + post + '»' : ''}
					</p>
				</div>
				{isEdit ? (
					<Form
						form={editForm}
						initialValues={{
							post: post,
							salary: salary,
							responsibilities: responsibilities,
							skills: skills,
							conditions: conditions,
							category: category,
							direction: categories.find(cat => cat.title === data?.acf.category)?.direction ? direction : subdivision,
							experience: experience,
							employment: employment
						}}
						layout="vertical"
						requiredMark={false}
						className="w-[50%] mt-[52px]"
						onFinish={values => {
							setPost(prev => values.post)
							setExperience(prev => values.experience)
							setEmployment(prev => values.employment)
							setSalary(prev => values.salary)
							setCategory(prev => values.category)
							setDirection(prev => values.direction)
							setResponsibilities(prev => values.responsibilities)
							setSkills(prev => values.skills)
							setConditions(prev => values.conditions)
							editForm.isFieldsTouched() && setIsSendRequestButtonActivated(true)
							setIsEdit(false)
						}}
					>
						<Form.Item
							name={'post'}
							label={<label className="text-black text-[18px]/[18px] font-content-font font-normal">Должность</label>}
							rules={[
								{ required: true, message: 'Не указана должность' },
								{ max: 500, message: 'Количество символов было превышено' }
							]}
						>
							<Input placeholder="Ввести название"></Input>
						</Form.Item>
						<div className="flex gap-[20px] w-full">
							<Form.Item
								name={'experience'}
								label={
									<label className="text-black text-[18px]/[18px] font-content-font font-normal">
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
									<label className="text-black text-[18px]/[18px] font-content-font font-normal">Тип занятости</label>
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
									<label className="text-black text-[18px]/[18px] font-content-font font-normal">
										Заработная плата
									</label>
								}
								rules={[
									{ required: true, message: 'Не указана зарплата' },
									{ max: 70, message: 'Количество символов было превышено' }
								]}
							>
								<Input placeholder="Ввести"></Input>
							</Form.Item>
						</div>
						<Form.Item
							name={'responsibilities'}
							label={<label className="text-black text-[18px]/[18px] font-content-font font-normal">Задачи</label>}
							rules={[
								{ required: true, message: 'Не указаны задачи' },
								{ max: 5000, message: 'Количество символов было превышено' }
							]}
						>
							<Input.TextArea autoSize className="!h-[107px]" placeholder="Ввести текст..."></Input.TextArea>
						</Form.Item>
						<Form.Item
							name={'skills'}
							label={<label className="text-black text-[18px]/[18px] font-content-font font-normal">Требования</label>}
							rules={[
								{ required: true, message: 'Не указаны требования' },
								{ max: 5000, message: 'Количество символов было превышено' }
							]}
						>
							<Input.TextArea autoSize className="!h-[107px]" placeholder="Ввести текст..."></Input.TextArea>
						</Form.Item>
						<Form.Item
							name={'conditions'}
							label={<label className="text-black text-[18px]/[18px] font-content-font font-normal">Условия</label>}
							rules={[
								{ required: true, message: 'Не указаны условия' },
								{ max: 5000, message: 'Количество символов было превышено' }
							]}
						>
							<Input.TextArea autoSize className="!h-[107px]" placeholder="Ввести текст..."></Input.TextArea>
						</Form.Item>
						<div className="flex gap-[20px] w-full">
							<Form.Item
								name={'category'}
								label={
									<label className="text-black text-[18px]/[18px] font-content-font font-normal">
										Категория сотрудников
									</label>
								}
								rules={[{ required: true, message: 'Не указана категория' }]}
							>
								<Select
									placeholder="Выбрать"
									options={categories.map(category => ({
										value: category.title,
										label: category.title
									}))}
									onChange={e => {
										setCategoryOption(e)
										console.log('test log')
										editForm.setFieldValue(['direction'], null)
									}}
								></Select>
							</Form.Item>
							<Form.Item
								name={'direction'}
								label={
									<label className="text-black text-[18px]/[18px] font-content-font font-normal">
										{categories.find(cat => cat.title === categoryOption)?.directions.length !== 0
											? 'Профобласть'
											: 'Подразделение'}
									</label>
								}
								rules={[{ required: true, message: 'Не указана подкатегория' }]}
							>
								<Select
									placeholder="Выбрать"
									options={(() => {
										let cat = categories.find(category => category.title === categoryOption)
										return cat && cat.directions.length !== 0
											? [
													{ value: 'Все', label: 'Все' },
													...cat.directions.map(dir => ({
														value: dir,
														label: dir
													}))
											  ]
											: cat && cat.subdivisionsList.length !== 0
											? [
													...cat.subdivisionsList.map(sub => ({
														value: sub,
														label: sub
													}))
											  ]
											: []
									})()}
								></Select>
							</Form.Item>
						</div>
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
									{categories.find(cat => cat.title === categoryOption)?.directions.length !== 0
										? 'Профобласть'
										: 'Подразделение'}
								</p>
								<p className="font-content-font font-normal text-black text-[18px]/[21px]">
									{categories.find(cat => cat.title === categoryOption)?.directions.length !== 0
										? direction
										: subdivision}
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
							{!isSendRequestButtonActivated && (
								<Button
									onClick={() => {
										setIsDeleteModalOpen(true)
									}}
									className="w-[151px] font-content-font font-normal text-black text-[16px]/[16px] rounded-[54.5px] py-[8px] px-[24px] border-black bg-inherit"
								>
									Удалить
								</Button>
							)}
							{isSendRequestButtonActivated && (
								<Button
									onClick={async () => {
										try {
											await editVacancy({
												post: post as string,
												experience: experience as string,
												salary: salary as string,
												employment: employment as string,
												responsibilities: responsibilities as string,
												skills: skills as string,
												conditions: conditions as string,
												category: category as string,
												direction:
													categories.find(cat => cat.title === categoryOption)?.directions.length !== 0
														? (direction as string)
														: (direction as string),
												subdivision:
													categories.find(cat => cat.title === categoryOption)?.subdivisionsList.length !== 0
														? (direction as string)
														: (direction as string),
												vacancyId: data?.id as number
											})
												.unwrap()
												.then(() => {
													setResultModalText('Описание вакансии успешно обновлено.')
													setIsSuccessModalOpen(true)
												})
										} catch (error: any) {
											openAlert({ type: 'error', text: 'Извините, что-то пошло не так...' })
										}
									}}
									type="primary"
									className="rounded-[54.5px] w-[121px]"
									loading={editVacancyLoading}
								>
									Сохранить
								</Button>
							)}
						</div>
					</div>
				)}
			</div>
		</>
	)
}
