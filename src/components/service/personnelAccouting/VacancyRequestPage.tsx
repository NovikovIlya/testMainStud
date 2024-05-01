import { Button, Form, Input, Select } from 'antd'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAppSelector } from '../../../store'
import {
	useGetCategoriesQuery,
	useGetDirectionsQuery,
	useGetSubdivisionsQuery,
	useRequestUpdateVacancyMutation
} from '../../../store/api/serviceApi'
import ArrowIcon from '../jobSeeker/ArrowIcon'

export const VacancyRequestPage = (props: {
	role: 'PERSONNEL_DEPARTMENT' | 'SUPERVISOR'
	type: 'CREATE' | 'DELETE' | 'UPDATE'
}) => {
	const { currentVacancy } = useAppSelector(state => state.currentVacancy)

	const { data: categories = [] } = useGetCategoriesQuery()
	const [categoryTitle, setCategoryTitle] = useState<string>('')
	const { data: directions = [] } = useGetDirectionsQuery(categoryTitle)
	const { data: subdivisions = [] } = useGetSubdivisionsQuery(categoryTitle)

	const navigate = useNavigate()
	const [requestUpdate] = useRequestUpdateVacancyMutation()

	const [isEdit, setIsEdit] = useState<boolean>(false)
	const [isSendRequestButtonActivated, setIsSendRequestButtonActivated] =
		useState<boolean>(false)

	const [post, setPost] = useState<string | undefined>(
		currentVacancy?.title.rendered
	)
	const [experience, setExperience] = useState<string | undefined>(
		currentVacancy?.acf.experience
	)
	const [employment, setEmployment] = useState<string | undefined>(
		currentVacancy?.acf.employment
	)
	const [salary, setSalary] = useState<string | undefined>(
		currentVacancy?.acf.salary
	)
	const [category, setCategory] = useState<string | undefined>(
		currentVacancy?.acf.category
	)
	const [direction, setDirection] = useState<string | undefined>(
		currentVacancy?.acf.direction
	)
	const [subdivision, setSubdivision] = useState<string | undefined>(
		currentVacancy?.acf.subdivision
	)

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

	return (
		<>
			<div id="wrapper" className="pl-[54px] pr-[54px] pt-[60px] w-full">
				<div className="flex">
					<button
						onClick={() => {
							navigate('/services/personnelaccounting/supervisor/vacancies')
						}}
						className="bg-inherit h-[38px] w-[46px] pt-[12px] pb-[12px] pr-[16px] pl-[16px] rounded-[50px] border border-black cursor-pointer"
					>
						<ArrowIcon />
					</button>
					<p className="ml-[40px] font-content-font font-normal text-black text-[28px]/[33.6px]">
						{currentVacancy !== null ? currentVacancy.title.rendered : ''}
					</p>
				</div>
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
							employmentType: employment
						}}
						layout="vertical"
						requiredMark={false}
						className="w-[50%] mt-[52px]"
						onFinish={values => {
							setPost(prev => values.post)
							setIsSendRequestButtonActivated(true)
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
								name={'employmentType'}
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
										categories.find(cat => cat.title === categoryTitle)
											?.direction
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
								Отправить
							</Button>
						</Form.Item>
					</Form>
				) : (
					<div className="w-[50%] mt-[80px] flex flex-col gap-[40px]">
						<div className="flex flex-col gap-[16px]">
							<p className="font-content-font font-bold text-black text-[18px]/[21px]">
								Должность:
							</p>
							<p className="font-content-font font-normal text-black text-[18px]/[21px]">
								{post && post}
							</p>
						</div>
						<div className="flex gap-[60px]">
							<div className="flex flex-col gap-[16px]">
								<p className="font-content-font font-bold text-black text-[18px]/[21px]">
									Требуемый опыт работы:
								</p>
								<p className="font-content-font font-normal text-black text-[18px]/[21px]">
									{experience && experience}
								</p>
							</div>
							<div className="flex flex-col gap-[16px]">
								<p className="font-content-font font-bold text-black text-[18px]/[21px]">
									Тип занятости:
								</p>
								<p className="font-content-font font-normal text-black text-[18px]/[21px]">
									{employment && employment}
								</p>
							</div>
							<div className="flex flex-col gap-[16px]">
								<p className="font-content-font font-bold text-black text-[18px]/[21px]">
									Заработная плата:
								</p>
								<p className="font-content-font font-normal text-black text-[18px]/[21px]">
									{salary && salary}
								</p>
							</div>
						</div>
						<div className="flex flex-col gap-[16px]">
							<p className="font-content-font font-bold text-black text-[18px]/[21px]">
								Задачи:
							</p>
							<p className="font-content-font font-normal text-black text-[18px]/[21px] whitespace-pre-line">
								{responsibilities && responsibilities}
							</p>
						</div>
						<div className="flex flex-col gap-[16px]">
							<p className="font-content-font font-bold text-black text-[18px]/[21px]">
								Требования:
							</p>
							<p className="font-content-font font-normal text-black text-[18px]/[21px] whitespace-pre-line">
								{skills && skills}
							</p>
						</div>
						<div className="flex flex-col gap-[16px]">
							<p className="font-content-font font-bold text-black text-[18px]/[21px]">
								Условия:
							</p>
							<p className="font-content-font font-normal text-black text-[18px]/[21px] whitespace-pre-line">
								{conditions && conditions}
							</p>
						</div>
						<div className="flex gap-[40px]">
							<div className="flex flex-col gap-[16px]">
								<p className="font-content-font font-bold text-black text-[18px]/[21px]">
									Категория сотрудников
								</p>
								<p className="font-content-font font-normal text-black text-[18px]/[21px]">
									{category && category}
								</p>
							</div>
							<div className="flex flex-col gap-[16px]">
								<p className="font-content-font font-bold text-black text-[18px]/[21px]">
									{direction && direction !== 'false'
										? 'Профобласть'
										: subdivision && 'Подразделение'}
								</p>
								<p className="font-content-font font-normal text-black text-[18px]/[21px]">
									{direction && direction !== 'false'
										? direction
										: subdivision && subdivision}
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
									onClick={() => {
										requestUpdate({
											post: post as string,
											experience: experience as string,
											salary: salary as string,
											employmentType: employment as string,
											responsibilities: responsibilities as string,
											skills: skills as string,
											conditions: conditions as string,
											category: category as string,
											direction: direction as string,
											vacancyId: currentVacancy?.id as number
										})
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
