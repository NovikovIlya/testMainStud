import { Button, ConfigProvider, Form, Input, Modal, Select } from 'antd'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { ModalOkSvg } from '../../../../../assets/svg/ModalOkSvg'
import { useRequestCreateVacancyMutation } from '../../../../../store/api/serviceApi'
import { useAlert } from '../../../../../utils/Alert/AlertMessage'

export const SupervisorCreateVacancyForm = () => {
	const { openAlert } = useAlert()

	const [requestCreateVacancy, { isLoading }] = useRequestCreateVacancyMutation()

	const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)

	const navigate = useNavigate()

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
							Ваша заявка на создание вакансии успешно отправлена. Вакансия будет добавлена в сервис "Все вакансии"
							после рассмотрения заявки кадрами.
						</p>
						<Button
							className="rounded-[40px] mt-[40px]"
							type="primary"
							onClick={() => {
								setIsSuccessModalOpen(false)
								navigate('/services/personnelaccounting/supervisor/vacancies')
							}}
						>
							ОК
						</Button>
					</div>
				</Modal>
			</ConfigProvider>
			<div className="pl-[54px] pr-[54px] pb-[52px] pt-[120px] w-full bg-content-gray">
				<h1 className="font-content-font font-normal text-[28px]/[28px] text-black">Создать вакансию</h1>
				<Form
					layout="vertical"
					requiredMark={false}
					className="w-[52%] mt-[52px]"
					onFinish={async values => {
						try {
							await requestCreateVacancy(values).unwrap()
							setIsSuccessModalOpen(true)
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
								<label className="text-black text-[18px]/[18px] font-content-font font-normal opacity-80">
									Требуемый опыт работы
								</label>
							}
							rules={[{ required: true, message: 'Не указан опыт' }]}
						>
							<Select
								placeholder="Выбрать"
								options={[
									{ value: 'Нет опыта', label: 'Нет опыта' },
									{ value: 'Опыт от 1 до 3 лет', label: 'Опыт от 1 до 3 лет' },
									{ value: 'Опыт от 3 до 6 лет', label: 'Опыт от 3 до 6 лет' },
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
									{ value: 'Полный день', label: 'Полный день' },
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
						label={
							<label className="text-black text-[18px]/[18px] font-content-font font-normal opacity-80">Задачи</label>
						}
						rules={[
							{ required: true, message: 'Не указаны задачи' },
							{ max: 5000, message: 'Количество символов было превышено' }
						]}
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
						rules={[
							{ required: true, message: 'Не указаны требования' },
							{ max: 5000, message: 'Количество символов было превышено' }
						]}
					>
						<Input.TextArea autoSize className="!h-[107px]" placeholder="Ввести текст..."></Input.TextArea>
					</Form.Item>
					<Form.Item
						name={'conditions'}
						label={
							<label className="text-black text-[18px]/[18px] font-content-font font-normal opacity-80">Условия</label>
						}
						rules={[
							{ required: true, message: 'Не указаны условия' },
							{ max: 5000, message: 'Количество символов было превышено' }
						]}
					>
						<Input.TextArea autoSize className="!h-[107px]" placeholder="Ввести текст..."></Input.TextArea>
					</Form.Item>
					<Form.Item>
						<Button type="primary" htmlType="submit" loading={isLoading}>
							Отправить
						</Button>
					</Form.Item>
				</Form>
			</div>
		</>
	)
}
