import { Button, Form, Input, Select } from 'antd'
import { useState } from 'react'

import {
	useGetCategoriesQuery,
	useGetDirectionsQuery,
	useGetSubdivisionsQuery,
	useRequestCreateVacancyMutation
} from '../../../../store/api/serviceApi'

export const SupervisorCreateVacancyForm = () => {
	const { data: categories = [] } = useGetCategoriesQuery()
	const [categoryTitle, setCategoryTitle] = useState<string>('')
	const { data: directions = [] } = useGetDirectionsQuery(categoryTitle)
	const { data: subdivisions = [] } = useGetSubdivisionsQuery(categoryTitle)

	const [requestCreateVacancy] = useRequestCreateVacancyMutation()

	return (
		<>
			<div className="pl-[54px] pr-[54px] pt-[60px] w-full bg-content-gray">
				<h1 className="font-content-font font-normal text-[28px]/[28px] text-black">
					Создать вакансию
				</h1>
				<Form
					layout="vertical"
					requiredMark={false}
					className="w-[50%] mt-[52px]"
					onFinish={values => requestCreateVacancy(values)}
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
							Отправить
						</Button>
					</Form.Item>
				</Form>
			</div>
		</>
	)
}
