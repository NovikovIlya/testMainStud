import { Button, Form, Input, Modal, Select } from 'antd'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAppSelector } from '../../../store'
import {
	useAcceptCreateVacancyRequestMutation,
	useAlterCreateVacancyRequestMutation,
	useGetCategoriesQuery,
	useGetDirectionsQuery,
	useGetSubdivisionsQuery,
	useGetVacancyRequestsQuery,
	useLazyGetVacancyRequestViewQuery
} from '../../../store/api/serviceApi'
import ArrowIcon from '../jobSeeker/ArrowIcon'

export const VacancyRequestCreateView = () => {
	const { requestId } = useAppSelector(state => state.currentRequest)
	const navigate = useNavigate()
	const [getVacancyRequestView] = useLazyGetVacancyRequestViewQuery()
	const [acceptRequest] = useAcceptCreateVacancyRequestMutation()
	const [alterRequest] = useAlterCreateVacancyRequestMutation()

	const { refetch } = useGetVacancyRequestsQuery('все')

	const { data: categories = [] } = useGetCategoriesQuery()
	const [categoryTitle, setCategoryTitle] = useState<string>('')
	const { data: directions = [] } = useGetDirectionsQuery(categoryTitle)
	const { data: subdivisions = [] } = useGetSubdivisionsQuery(categoryTitle)

	const [isEdit, setIsEdit] = useState<boolean>(false)
	const [isEdited, setIsEdited] = useState<boolean>(false)

	const [post, setPost] = useState<string | undefined>(undefined)
	const [experience, setExperience] = useState<string | undefined>(undefined)
	const [employment, setEmployment] = useState<string | undefined>(undefined)
	const [salary, setSalary] = useState<string | undefined>(undefined)
	const [category, setCategory] = useState<string | undefined>(undefined)
	const [direction, setDirection] = useState<string | undefined>(undefined)
	const [subdivision, setSubdivision] = useState<string | undefined>(undefined)

	const [responsibilities, setResponsibilities] = useState<string | undefined>(
		undefined
	)

	const [skills, setSkills] = useState<string | undefined>(undefined)

	const [conditions, setConditions] = useState<string | undefined>(undefined)

	const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

	useEffect(() => {
		getVacancyRequestView(requestId)
			.unwrap()
			.then(req => {
				setPost(req.newData.post)
				setExperience(req.newData.experience)
				setEmployment(req.newData.employment)
				setSalary(req.newData.salary)
				setCategory(req.newData.category)
				setDirection(req.newData.direction)
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

	return (
		<>
			<Modal
				centered
				open={isModalOpen}
				bodyStyle={{
					padding: '26px'
				}}
				className="pr-[52px] pl-[52px] pb-[52px]"
				footer={null}
				title={null}
				width={622}
				onCancel={() => {
					setIsModalOpen(false)
				}}
			>
				<Form
					layout="vertical"
					requiredMark={false}
					onFinish={() => {
						isEdited
							? alterRequest({
									post: post as string,
									experience: experience as string,
									salary: salary as string,
									employment: employment as string,
									responsibilities: responsibilities as string,
									skills: skills as string,
									conditions: conditions as string,
									category: category as string,
									direction: direction as string,
									vacancyRequestId: requestId
							  })
									.unwrap()
									.then(() => {
										acceptRequest(requestId)
											.unwrap()
											.then(() => {
												refetch()
												navigate(
													'/services/personnelaccounting/vacancyrequests'
												)
											})
									})
							: acceptRequest(requestId)
									.unwrap()
									.then(() => {
										refetch()
										navigate('/services/personnelaccounting/vacancyrequests')
									})
					}}
				>
					<p className="font-content-font font-bold text-[18px]/[21.6px] text-black opacity-80 mb-[40px]">
						Выберите необходимые документы для трудоустройства
					</p>
					<Form.Item
						name={'category'}
						label={
							<label className="text-black text-[18px]/[18px] font-content-font font-normal opacity-80">
								Категория сотрудников
							</label>
						}
						rules={[{ required: true, message: 'Не указана категория' }]}
					>
						<Select
							className="mt-[16px]"
							options={categories.map(category => ({
								value: category.title,
								label: category.title
							}))}
							onChange={(value: string) => {
								;(() => {
									setCategoryTitle(value)
								})()
							}}
							placeholder="Выбрать"
						/>
					</Form.Item>
					<Form.Item
						name={'direction'}
						label={
							<label className="text-black text-[18px]/[18px] font-content-font font-normal opacity-80">
								{categories.find(cat => cat.title === categoryTitle)?.direction
									? 'Профобласть'
									: 'Подразделение'}
							</label>
						}
						rules={[{ required: true, message: 'Не указана подкатегория' }]}
					>
						<Select
							placeholder="Выбрать"
							options={
								categories.find(cat => cat.title === categoryTitle)?.direction
									? directions.map(dir => ({
											value: dir.title,
											label: dir.title
									  }))
									: subdivisions.map(sub => ({
											value: sub.title,
											label: sub.title
									  }))
							}
							value={
								categories.find(cat => cat.title === categoryTitle)?.direction
									? direction
									: subdivision
							}
						></Select>
					</Form.Item>
					<Form.Item>
						<div style={{ textAlign: 'right', marginTop: 20 }}>
							<Button
								type="primary"
								className="rounded-[54.5px] w-[121px] ml-auto"
								htmlType="submit"
								disabled={categoryTitle === ''}
							>
								Опубликовать
							</Button>
						</div>
					</Form.Item>
				</Form>
			</Modal>
			{isEdit ? (
				<Form
					initialValues={{
						post: post,
						salary: salary,
						responsibilities: responsibilities,
						skills: skills,
						conditions: conditions,
						category: category,
						direction: direction,
						experience: experience,
						employment: employment
					}}
					layout="vertical"
					requiredMark={false}
					className="w-[50%] mt-[112px] ml-[52px]"
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
						setIsEdited(true)
						setIsEdit(false)
					}}
				>
					<Form.Item
						name={'post'}
						label={
							<label className="text-black text-[18px]/[18px] font-content-font font-normal">
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
								<label className="text-black text-[18px]/[18px] font-content-font font-normal">
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
								<label className="text-black text-[18px]/[18px] font-content-font font-normal">
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
								<label className="text-black text-[18px]/[18px] font-content-font font-normal">
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
							<label className="text-black text-[18px]/[18px] font-content-font font-normal">
								Задачи
							</label>
						}
						rules={[{ required: true, message: 'Не указаны задачи' }]}
					>
						<Input.TextArea
							autoSize
							className="!h-[107px]"
							placeholder="Ввести текст..."
						></Input.TextArea>
					</Form.Item>
					<Form.Item
						name={'skills'}
						label={
							<label className="text-black text-[18px]/[18px] font-content-font font-normal">
								Требования
							</label>
						}
						rules={[{ required: true, message: 'Не указаны требования' }]}
					>
						<Input.TextArea
							autoSize
							className="!h-[107px]"
							placeholder="Ввести текст..."
						></Input.TextArea>
					</Form.Item>
					<Form.Item
						name={'conditions'}
						label={
							<label className="text-black text-[18px]/[18px] font-content-font font-normal">
								Условия
							</label>
						}
						rules={[{ required: true, message: 'Не указаны условия' }]}
					>
						<Input.TextArea
							autoSize
							className="!h-[107px]"
							placeholder="Ввести текст..."
						></Input.TextArea>
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
								onChange={e => setCategoryTitle(e)}
							></Select>
						</Form.Item>
						<Form.Item
							name={'direction'}
							label={
								<label className="text-black text-[18px]/[18px] font-content-font font-normal">
									{categories.find(cat => cat.title === categoryTitle)
										?.direction
										? 'Профобласть'
										: 'Подразделение'}
								</label>
							}
							rules={[{ required: true, message: 'Не указана подкатегория' }]}
						>
							<Select
								placeholder="Выбрать"
								options={
									categories.find(cat => cat.title === categoryTitle)?.direction
										? directions.map(dir => ({
												value: dir.title,
												label: dir.title
										  }))
										: subdivisions.map(sub => ({
												value: sub.title,
												label: sub.title
										  }))
								}
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
				<div
					id="wrapper"
					className="pl-[54px] pr-[54px] pt-[60px] w-full mt-[60px]"
				>
					<div className="flex">
						<button
							onClick={() => {
								navigate('/services/personnelaccounting/vacancyrequests')
							}}
							className="bg-inherit h-[38px] w-[46px] pt-[12px] pb-[12px] pr-[16px] pl-[16px] rounded-[50px] border border-black cursor-pointer"
						>
							<ArrowIcon />
						</button>
						<p className="ml-[40px] font-content-font font-normal text-black text-[28px]/[33.6px]">
							{post !== undefined ? post : ''}
						</p>
					</div>
					<div className="w-[50%] mt-[80px] flex flex-col gap-[40px]">
						<div className="flex gap-[60px]">
							<div className="flex flex-col gap-[16px]">
								<p className="font-content-font font-bold text-black text-[18px]/[21px]">
									Требуемый опыт работы:
								</p>
								<p className="font-content-font font-normal text-black text-[18px]/[21px]">
									{experience !== undefined ? experience : ''}
								</p>
							</div>
							<div className="flex flex-col gap-[16px]">
								<p className="font-content-font font-bold text-black text-[18px]/[21px]">
									Тип занятости:
								</p>
								<p className="font-content-font font-normal text-black text-[18px]/[21px]">
									{employment !== undefined ? employment : ''}
								</p>
							</div>
							<div className="flex flex-col gap-[16px]">
								<p className="font-content-font font-bold text-black text-[18px]/[21px]">
									Заработная плата:
								</p>
								<p className="font-content-font font-normal text-black text-[18px]/[21px]">
									{salary !== undefined ? salary : ''}
								</p>
							</div>
						</div>
						<div className="flex flex-col gap-[16px]">
							<p className="font-content-font font-bold text-black text-[18px]/[21px]">
								Задачи:
							</p>
							<p className="font-content-font font-normal text-black text-[18px]/[21px] whitespace-pre-line">
								{responsibilities !== undefined ? responsibilities : ''}
							</p>
						</div>
						<div className="flex flex-col gap-[16px]">
							<p className="font-content-font font-bold text-black text-[18px]/[21px]">
								Требования:
							</p>
							<p className="font-content-font font-normal text-black text-[18px]/[21px] whitespace-pre-line">
								{skills !== undefined ? skills : ''}
							</p>
						</div>
						<div className="flex flex-col gap-[16px]">
							<p className="font-content-font font-bold text-black text-[18px]/[21px]">
								Условия:
							</p>
							<p className="font-content-font font-normal text-black text-[18px]/[21px] whitespace-pre-line">
								{conditions !== undefined ? conditions : ''}
							</p>
						</div>
						{/* <div className="flex gap-[40px]">
							<div className="flex flex-col gap-[16px]">
								<p className="font-content-font font-bold text-black text-[18px]/[21px]">
									Категория сотрудников
								</p>
								<p className="font-content-font font-normal text-black text-[18px]/[21px]">
									{category !== undefined ? category : ''}
								</p>
							</div>
							<div className="flex flex-col gap-[16px]">
								<p className="font-content-font font-bold text-black text-[18px]/[21px]">
									Профобласть
								</p>
								<p className="font-content-font font-normal text-black text-[18px]/[21px]">
									{direction !== undefined ? direction : ''}
								</p>
							</div>
						</div> */}
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
									setIsModalOpen(true)
								}}
								type="primary"
								className="rounded-[54.5px] w-[121px]"
							>
								Опубликовать
							</Button>
						</div>
					</div>
				</div>
			)}
		</>
	)
}
