import { QuestionOutlined, UploadOutlined } from '@ant-design/icons'
import {
	Button,
	Checkbox,
	ConfigProvider,
	DatePicker,
	Input,
	Space,
	Tooltip,
	Typography,
	Upload,
	message
} from 'antd'
import type { UploadProps } from 'antd'
import ruPicker from 'antd/locale/ru_RU'
import clsx from 'clsx'
import dayjs from 'dayjs'
import 'dayjs/locale/ru'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { IWorkError, workItem } from '../../../api/types'
import { RootState } from '../../../store'
import { useAppSelector } from '../../../store'
import {
	addJobItemRequest,
	deleteJobItemRequest,
	getAbUsJob,
	portfolioLinkRequest,
	updateJobItemRequest
} from '../../../store/creators/MainCreators'
import {
	additionalInfo,
	allData,
	endDate,
	name,
	portfolioLink,
	responsibilities,
	startDate
} from '../../../store/reducers/FormReducers/WorkReducer'

const props: UploadProps = {
	name: 'file',
	action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
	headers: {
		authorization: 'authorization-text'
	},
	onChange(info) {
		if (info.file.status !== 'uploading') {
			console.log(info.file, info.fileList)
		}
		if (info.file.status === 'done') {
			message.success(`${info.file.name} file uploaded successfully`)
		} else if (info.file.status === 'error') {
			message.error(`${info.file.name} file upload failed.`)
		}
	}
}

export const Work = () => {
	const { t, i18n } = useTranslation()
	dayjs.locale(i18n.language)
	const [IsError, setError] = useState<IWorkError>({
		item: null,
		portfolio: false
	})
	const navigate = useNavigate()
	const [updateItems, setUpdate] = useState<boolean>(true)
	const dispatch = useDispatch()
	const workData = useAppSelector((state: RootState) => state.Work)

	const getData = async () => {
		const response = await getAbUsJob(dispatch)
		response !== null && dispatch(allData(response))
	}

	useEffect(() => {
		if (updateItems) {
			getData()
			setUpdate(false)
		}
	}, [updateItems])

	const convertToString = (field: any): string => {
		if (typeof field === 'string') {
			return field
		} else {
			return ''
		}
	}

	const checkPortfolio = (data: string): boolean => {
		const IsCorrectLink =
			/^(?:https?:\/\/)?(?:www\.)?([a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*)(?:\/[^\s]*)?$/.test(
				data
			)
		if (!IsCorrectLink) {
			setError({ ...IsError, portfolio: true })
			return true
		} else {
			IsError.portfolio && setError({ ...IsError, portfolio: false })
			return false
		}
	}

	const checkWorkItem = (id: string, item: workItem): boolean => {
		var haveError = false
		var errorPattern = {
			id: parseInt(id),
			name: false,
			startDate: false,
			responsibilities: false,
			additionalInfo: false
		}

		if (
			!item.name ||
			(item.name &&
				(/\s\s/.test(item.name) || !/^[\p{L}\s.,]+$/u.test(item.name)))
		) {
			haveError = true
			errorPattern.name = true
		}
		if (
			!item.additionalInfo ||
			(item.additionalInfo &&
				(/\s\s/.test(item.additionalInfo) ||
					!/^[\p{L}\s.,]+$/u.test(item.additionalInfo)))
		) {
			haveError = true
			errorPattern.additionalInfo = true
		}
		if (
			!item.responsibilities ||
			(item.responsibilities &&
				(/\s\s/.test(item.responsibilities) ||
					!/^[\p{L}\s.,]+$/u.test(item.responsibilities)))
		) {
			haveError = true
			errorPattern.responsibilities = true
		}
		if (!item.startDate) {
			haveError = true
			errorPattern.startDate = true
		}

		haveError && setError({ ...IsError, item: errorPattern })
		IsError.item !== null && !haveError && setError({ ...IsError, item: null })

		return haveError
	}

	const handleUpdatePortfolio = async (data: string) => {
		if (!checkPortfolio(data)) {
			const response = await portfolioLinkRequest(
				{ portfolioLink: data },
				dispatch
			)
			if (response === 403) {
				console.log('403')
				//navigate("/")
			} else {
				setUpdate(true)
			}
		}
	}

	const handleAddWork = async () => {
		const response = await addJobItemRequest(
			{
				name: '',
				startDate: '',
				endDate: null,
				responsibilities: null,
				additionalInfo: ''
			},
			dispatch
		)
		if (response === 403) {
			console.log('403')
			//navigate("/")
		} else {
			setUpdate(true)
		}
	}
	const handleDeleteWork = async (id: string) => {
		const response = await deleteJobItemRequest(id, dispatch)
		if (response === 403) {
			console.log('403')
			//navigate("/")
		} else {
			setUpdate(true)
		}
	}
	const handleUpdateWork = async (id: string, item: workItem) => {
		if (!checkWorkItem(id, item)) {
			const response = await updateJobItemRequest(id, item, dispatch)
			if (response === 403) {
				console.log('403')
				//navigate("/")
			} else {
				setUpdate(true)
			}
		}
	}
	return (
		<div className="m-14 radio">
			<Space direction="vertical" size={20}>
				<Typography.Title level={3}>Работа</Typography.Title>
				<Checkbox>Я трудоустроен на данный момент</Checkbox>

				{workData.items.map((item, index) => (
					<div key={item.id} className="flex flex-col gap-[10px]">
						<Space>
							<Typography.Text className="text-black text-sm font-bold">
								Место работы
							</Typography.Text>
							<Typography.Text
								onClick={() => handleDeleteWork(item.id.toString())}
								className={clsx(
									'cursor-pointer opacity-40 text-center text-black text-sm font-normal leading-[18px]',
									index === 0 && 'hidden'
								)}
							>
								Удалить
							</Typography.Text>
							<Typography.Text
								onClick={() =>
									handleUpdateWork(item.id.toString(), {
										name: item.name,
										startDate: item.startDate,
										endDate: item.endDate,
										responsibilities: item.responsibilities,
										additionalInfo: item.additionalInfo
									})
								}
								className={clsx(
									'cursor-pointer opacity-40 text-center text-black text-sm font-normal leading-[18px]',
									item.id === 0 && 'hidden'
								)}
							>
								Сохранить
							</Typography.Text>
						</Space>
						<Space direction="vertical" size={'small'}>
							<Typography.Text>
								Предыдущее/нынешнее место работы
							</Typography.Text>
							<Input
								placeholder="Калифорнийский университет в Беркли"
								size="large"
								className={clsx(
									'w-[624px] shadow ',
									IsError.item &&
										IsError.item.id === item.id &&
										IsError.item.name &&
										'border-rose-500'
								)}
								onChange={e =>
									dispatch(name({ id: item.id, name: e.target.value }))
								}
								value={workData.items.filter(el => el.id === item.id)[0].name}
							/>
							{IsError.item &&
								IsError.item.id === item.id &&
								IsError.item.name && (
									<span className="text-red-500 text-sm">
										{t('EmptyFolder')}
									</span>
								)}
						</Space>
						<Space direction="vertical" size={'small'}>
							<Typography.Text>Период работы</Typography.Text>
							<div className="w-[624px] grid grid-cols-2 gap-x-4 max-sm:grid-cols-1">
								<div>
									<ConfigProvider locale={ruPicker}>
										<DatePicker
											className={clsx(
												'shadow w-full',
												IsError.item &&
													IsError.item.id === item.id &&
													IsError.item.startDate &&
													'border-rose-500'
											)}
											onChange={e =>
												dispatch(
													startDate({
														id: item.id,
														startDate: e !== null ? e.format('YYYY-MM-DD') : ''
													})
												)
											}
											size="large"
											placeholder={t('Start')}
											format={'DD.MM.YYYY'}
											value={
												workData.items.filter(el => el.id === item.id)[0]
													.startDate
													? dayjs(
															workData.items
																.filter(el => el.id === item.id)[0]
																.startDate.split('-')
																.reverse()
																.join('.'),
															'DD.MM.YYYY'
													  )
													: null
											}
										/>
									</ConfigProvider>
									{IsError.item &&
										IsError.item.id === item.id &&
										IsError.item.startDate && (
											<span className="text-red-500 text-sm">
												{t('EmptyFolder')}
											</span>
										)}
								</div>
								<div>
									<ConfigProvider locale={ruPicker}>
										<DatePicker
											className={clsx('shadow w-full')}
											onChange={e =>
												dispatch(
													endDate({
														id: item.id,
														endDate: e !== null ? e.format('YYYY-MM-DD') : null
													})
												)
											}
											size="large"
											placeholder={t('Start')}
											format={'DD.MM.YYYY'}
											value={
												workData.items.filter(el => el.id === item.id)[0]
													.endDate
													? dayjs(
															convertToString(
																workData.items.filter(
																	el => el.id === item.id
																)[0].endDate
															)
																.split('-')
																.reverse()
																.join('.'),
															'DD.MM.YYYY'
													  )
													: null
											}
										/>
									</ConfigProvider>
									{IsError.item &&
										IsError.item.id === item.id &&
										IsError.item.startDate && (
											<span className="text-red-500 text-sm"></span>
										)}
								</div>
							</div>
						</Space>
						<Space direction="vertical" size={'small'}>
							<Typography.Text>Обязанности</Typography.Text>
							<Input.TextArea
								className={clsx(
									'w-[624px] shadow ',
									IsError.item &&
										IsError.item.id === item.id &&
										IsError.item.responsibilities &&
										'border-rose-500'
								)}
								maxLength={100}
								style={{ height: 120, resize: 'none' }}
								placeholder="Расскажите в чем заключались ваши рабочие обязанности, напишите о Вашем опыте работы."
								onChange={e =>
									dispatch(
										responsibilities({
											id: item.id,
											responsibilities: e.target.value
										})
									)
								}
								value={convertToString(
									workData.items.filter(el => el.id === item.id)[0]
										.responsibilities
								)}
							/>
							{IsError.item &&
								IsError.item.id === item.id &&
								IsError.item.responsibilities && (
									<span className="text-red-500 text-sm">
										{t('BadSymbols')}
									</span>
								)}
						</Space>
						<Space direction="vertical" size={'small'}>
							<Typography.Text>Дополнительная информация</Typography.Text>
							<Input.TextArea
								className={clsx(
									'w-[624px] shadow ',
									IsError.item &&
										IsError.item.id === item.id &&
										IsError.item.additionalInfo &&
										'border-rose-500'
								)}
								maxLength={100}
								style={{ height: 120, resize: 'none' }}
								placeholder="Введите текст"
								onChange={e =>
									dispatch(
										additionalInfo({
											id: item.id,
											additionalInfo: e.target.value
										})
									)
								}
								value={
									workData.items.filter(el => el.id === item.id)[0]
										.additionalInfo
								}
							/>
							{IsError.item &&
								IsError.item.id === item.id &&
								IsError.item.additionalInfo && (
									<span className="text-red-500 text-sm">
										{t('EmptyFolder')}
									</span>
								)}
						</Space>
					</div>
				))}

				<Space
					direction="vertical"
					size={'small'}
					className="w-full flex items-center"
				>
					<Button
						className="rounded-full text-center p-0 w-8 h-8 text-xl"
						type="primary"
						onClick={handleAddWork}
					>
						+
					</Button>
					<Typography.Text className="opacity-40 text-center text-black text-sm font-normal leading-[18px]">
						добавить работу
					</Typography.Text>
				</Space>
				<Space direction="vertical" size={'small'}>
					<Space>
						<Typography.Text className="font-bold text-small text-black">
							Ссылка на портфолио
						</Typography.Text>
						<Typography.Text
							onClick={() =>
								handleUpdatePortfolio(
									!workData.portfolioLink ? '' : workData.portfolioLink
								)
							}
							className="cursor-pointer opacity-40 text-center text-black text-sm font-normal leading-[18px]"
						>
							Сохранить
						</Typography.Text>
					</Space>
					<Input
						placeholder="https://disk.yandex.ru"
						size="large"
						className={clsx(
							'w-[624px] shadow ',
							IsError.portfolio && 'border-rose-500'
						)}
						onChange={e => dispatch(portfolioLink(e.target.value))}
						value={!workData.portfolioLink ? '' : workData.portfolioLink}
					/>
					{IsError.portfolio && (
						<span className="text-red-500 text-sm">{t('BadLink')}</span>
					)}
				</Space>
				<Space size={'small'}>
					<Typography.Text className="text-black opacity-80 text-sm font-normal leading-none">
						Прикрепить документы
					</Typography.Text>
					<Tooltip title="Ваши работы">
						<Button
							type="default"
							className="bg-transparent"
							icon={<QuestionOutlined className="text-xs" />}
						/>
					</Tooltip>
				</Space>

				<Upload {...props}>
					<Button icon={<UploadOutlined />}>Добавить файл</Button>
				</Upload>
			</Space>
		</div>
	)
}
