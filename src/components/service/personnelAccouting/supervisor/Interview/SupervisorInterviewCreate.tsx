import { ThemeProvider } from '@material-tailwind/react'
import { Button, ConfigProvider, DatePicker, Form, Input, Modal, Select } from 'antd'
import React, { useEffect, useState } from 'react'

import { useAppSelector } from '../../../../../store'
import {
	useGetSupervisorVacancyQuery,
	useLazyGetResponcesByVacancyQuery,
	useLazyGetVacancyGroupedResponcesQuery,
	useRequestCreateInterviewMutation
} from '../../../../../store/api/serviceApi'
import { VacancyRespondItemType } from '../../../../../store/reducers/type'

import value = ThemeProvider.propTypes.value
import TextArea from 'antd/es/input/TextArea'

export const SupervisorInterviewCreate = () => {
	const [responds, setResponds] = useState<VacancyRespondItemType[]>([])

	const [requestCreateInterview] = useRequestCreateInterviewMutation()

	const respondId = useAppSelector(state => state.currentResponce)

	const { data: vacancies = [] } = useGetSupervisorVacancyQuery()

	const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)

	const [isUnsuccessModalOpen, setIsUnsuccessModalOpen] = useState(false)

	const [fio, setFIO] = useState('')

	const [getGroupedResponds] = useLazyGetVacancyGroupedResponcesQuery()
	const [getResponds] = useLazyGetResponcesByVacancyQuery()

	useEffect(() => {
		getGroupedResponds({ category: 'АУП', role: 'SUPERVISOR' })
			.unwrap()
			.then(grData => {
				grData.map(vacResp => {
					getResponds({
						id: vacResp.vacancyId,
						status: '',
						role: 'SUPERVISOR'
					})
						.unwrap()
						.then(data => setResponds(prev => [...prev, ...data]))
				})
			})
	}, [])

	let respondFIOSet = Array.from(
		new Set(
			responds.map(
				resp =>
					resp.userData?.firstname +
					' ' +
					resp.userData?.middlename +
					' ' +
					resp.userData?.lastname
			)
		)
	).map(fio => ({ value: fio, label: fio }))

	const respondPosSet = Array.from(
		new Set(
			responds
				.filter(
					resp =>
						resp.userData?.firstname === fio.split(' ')[0] &&
						resp.userData?.middlename === fio.split(' ')[1] &&
						resp.userData?.lastname === fio.split(' ')[2]
				)
				.map(resp => resp.vacancyName)
		)
	).map(resp => ({
		value: resp,
		label: resp
	}))
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
					}}
					title={null}
					footer={null}
					width={407}
				>
					<p className="font-content-font font-normal text-black text-[16px]/[20px] text-center">
						Собеседование успешно назначено.
					</p>
					<div className="mt-[40px] flex gap-[12px]">
						<Button
							className="ml-auto mr-auto"
							type="primary"
							onClick={() => {
								setIsSuccessModalOpen(false)
							}}
						>
							ОК
						</Button>
					</div>
				</Modal>
				<Modal
					bodyStyle={{ padding: 53 }}
					centered
					open={isUnsuccessModalOpen}
					onCancel={() => {
						setIsUnsuccessModalOpen(false)
					}}
					title={null}
					footer={null}
					width={407}
				>
					<p className="font-content-font font-normal text-black text-[16px]/[20px] text-center">
						Произошла ошибка или нет ответа от сервера.
					</p>
					<div className="mt-[40px] flex gap-[12px]">
						<Button
							className="ml-auto mr-auto"
							type="primary"
							onClick={() => {
								setIsUnsuccessModalOpen(false)
							}}
						>
							ОК
						</Button>
					</div>
				</Modal>
			</ConfigProvider>
			<div className="w-[40%] pl-[54px] pr-[54px] pt-[120px] bg-content-gray">
				<h1 className="mb-[50px] font-content-font font-normal text-[28px]/[28px] text-black">
					Назначить собеседование
				</h1>
				<Form
					layout="vertical"
					requiredMark={false}
					onFinish={values => {
						requestCreateInterview({
							date: values.date,
							format: values.format,
							respondId: respondId.respondId,
							address: values.extraInfo
						})
							.unwrap()
							.then(() => {
								setIsSuccessModalOpen(true)
							})
							.catch(() => {
								setIsUnsuccessModalOpen(true)
							})
					}}
				>
					<Form.Item
						name={'seeker_name'}
						label={
							<label className="text-black opacity-[80%] text-[18px]/[18px] font-content-font font-normal">
								Соискатель
							</label>
						}
						rules={[{ required: true, message: 'не выбран соискатель' }]}
					>
						<Select
							placeholder="Выбрать"
							options={respondFIOSet}
							onChange={value => {
								setFIO(value)
							}}
						></Select>
					</Form.Item>
					<Form.Item
						name={'post'}
						label={
							<label className="text-black opacity-[80%] text-[18px]/[18px] font-content-font font-normal">
								Должность
							</label>
						}
						rules={[{ required: true, message: 'не указана должность' }]}
					>
						<Select placeholder="Выбрать" options={respondPosSet}></Select>
					</Form.Item>
					<div className="flex flex-row w-full gap-[20px]">
						<Form.Item
							className="w-6/12"
							name={'date'}
							label={
								<label className="opacity-[80%] text-black text-[18px]/[18px] font-content-font font-normal">
									Дата
								</label>
							}
							rules={[{ required: true, message: 'Не указаны дата и время' }]}
						>
							<DatePicker
								format={'DD.MM.YYYY, h:mm'}
								showTime={{
									minuteStep: 15,
									disabledHours: () => {
										return [0, 1, 2, 3, 4, 5, 6, 7, 20, 21, 22, 23]
									},
									hideDisabledOptions: true
								}}
								className="w-full"
								onChange={(e, dateString) => {}}
								placeholder="Выбрать"
							></DatePicker>
						</Form.Item>
						<Form.Item
							className="w-6/12"
							name={'format'}
							label={
								<label className="opacity-[80%] text-black text-[18px]/[18px] font-content-font font-normal">
									Формат
								</label>
							}
							rules={[{ required: true, message: 'Не указан формат' }]}
						>
							<Select
								placeholder="-"
								options={[
									{ value: 'OFFLINE', label: 'Оффлайн' },
									{ value: 'ONLINE', label: 'Онлайн' }
								]}
							></Select>
						</Form.Item>
					</div>
					<Form.Item
						name={'extraInfo'}
						label={
							<label className="text-black opacity-[80%] text-[18px]/[18px] font-content-font font-normal">
								Адрес и дополнительная информация
							</label>
						}
						rules={[{ required: true, message: 'Адрес не указан' }]}
					>
						<TextArea autoSize={{minRows: 1, maxRows: 6}}></TextArea>
					</Form.Item>
					<Form.Item>
						<Button
							type="primary"
							className="rounded-[30px] w-[121px]"
							htmlType="submit"
						>
							Создать
						</Button>
					</Form.Item>
				</Form>
			</div>
		</>
	)
}
