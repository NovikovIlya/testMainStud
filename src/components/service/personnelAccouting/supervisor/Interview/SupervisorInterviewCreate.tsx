import { ThemeProvider } from '@material-tailwind/react'
import {Button, ConfigProvider, DatePicker, Form, Input, Modal, Select, Spin} from 'antd'
import React, { useEffect, useState } from 'react'
import moment from 'moment';

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
import {LoadingOutlined} from "@ant-design/icons";

export const SupervisorInterviewCreate = () => {
	const [responds, setResponds] = useState<VacancyRespondItemType[]>([])

	const [requestCreateInterview] = useRequestCreateInterviewMutation()

	const respondId = useAppSelector(state => state.currentResponce)

	const { data: vacancies = [], isLoading: loading } = useGetSupervisorVacancyQuery()

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
					resp.userData?.lastname +
					' ' +
					resp.userData?.firstname +
					' ' +
					resp.userData?.middlename
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

	const vacancyNameArray = vacancies.map(vacancy => vacancy.title)

	const formattedJobs = vacancyNameArray.map(title => ({
		value: title,
		label: title
	}));

	if (loading) {
		return (
			<>
				<div className="w-full h-full flex items-center">
					<div className="text-center ml-auto mr-auto">
						<Spin
							indicator={<LoadingOutlined style={{ fontSize: 36 }} spin />}
						></Spin>
						<p className="font-content-font font-normal text-black text-[18px]/[18px]">
							Идёт загрузка...
						</p>
					</div>
				</div>
			</>
		)
	}

	const validateDateTime = (_ : any, value : any) => {
		if (value && value.isBefore(moment())) {
			return Promise.reject(new Error('Выбранное время уже наступило'));
		}
		return Promise.resolve();
	};

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
						rules={[
							{ required: true, message: 'Не выбран соискатель' },
							{ max: 500, message: 'Количество символов было превышено'}
						]}
					>
						<Select
							placeholder="Выбрать"
							options={respondFIOSet}
							showSearch
							optionFilterProp="label"
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
						rules={[
							{ required: true, message: 'Не выбрана должность' },
							{ max: 500, message: 'Количество символов было превышено'}
						]}
					>
						<Select
							placeholder="Выбрать"
							showSearch
							optionFilterProp="label"
							options={formattedJobs}
						></Select>
					</Form.Item>
					<div className="flex flex-row w-full gap-[20px]">
						<Form.Item
							className="w-6/12"
							name="date"
							label={
								<label className="opacity-[80%] text-black text-[18px]/[18px] font-content-font font-normal">
									Дата и время
								</label>
							}
							rules={[
								{ required: true, message: 'Не выбраны дата и время' },
								{ validator: validateDateTime },
							]}
						>
							<DatePicker
								format={'DD.MM.YYYY, h:mm'}
								showTime={{
									minuteStep: 15,
									disabledHours: () => {
										return [0, 1, 2, 3, 4, 5, 6, 7, 21, 22, 23];
									},
									hideDisabledOptions: true,
								}}
								className="w-full"
								placeholder="Выбрать"
							/>
						</Form.Item>
						<Form.Item
							className="w-6/12"
							name={'format'}
							label={
								<label className="opacity-[80%] text-black text-[18px]/[18px] font-content-font font-normal">
									Формат собеседования
								</label>
							}
							rules={[{ required: true, message: 'Не выбран формат собеседования' }]}
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
						rules={[
							{ required: true, message: 'Адрес не указан' },
							{ max: 1000, message: 'Количество символов было превышено'}
						]}
					>
						<TextArea
							placeholder="Ввести текст"
							autoSize={{minRows: 1, maxRows: 6}}></TextArea>
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
