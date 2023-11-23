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
import enPicker from 'antd/locale/en_US'
import ruPicker from 'antd/locale/ru_RU'
import clsx from 'clsx'
import dayjs from 'dayjs'
import 'dayjs/locale/en'
import 'dayjs/locale/ru'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import uuid from 'react-uuid'

import { useAppSelector } from '../../../store'
import {
	useGetEducationQuery,
	useGetWorkQuery,
	useGetWorksQuery
} from '../../../store/api/formApi'
import {
	addWork,
	additionalInfo,
	allData,
	deleteWork,
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
	const dispatch = useDispatch()
	const { data: work } = useGetWorkQuery()
	const { data: works } = useGetWorksQuery()
	console.log(works, work, '=================work')

	const workData = useAppSelector(state => state.Work)
	//if (work !== undefined && work.items.length) dispatch(allData(work))
	const handleDeleteWork = (id: string) => {
		dispatch(deleteWork(id))
	}
	const handleAddWork = () => {
		dispatch(addWork(uuid()))
	}
	return (
		<div className="m-14 radio">
			<Space direction="vertical" size={20}>
				<Typography.Title level={3}>{t('work')}</Typography.Title>
				<Checkbox>{t('EmployedMoment')}</Checkbox>

				{workData.items.map((item, index) => (
					<div key={item.id} className="flex flex-col gap-[10px]">
						<Space>
							<Typography.Text className="text-black text-sm font-bold">
								{t('placeWork')}
							</Typography.Text>
							<Typography.Text
								onClick={() => handleDeleteWork(item.id)}
								className={clsx(
									'cursor-pointer opacity-40 text-center text-black text-sm font-normal leading-[18px]',
									index === 0 && 'hidden'
								)}
							>
								{t('Delete')}
							</Typography.Text>
						</Space>
						<Space direction="vertical" size={'small'}>
							<Typography.Text>{t('PreviousWork')} </Typography.Text>
							<Input
								size="large"
								className="w-[624px]"
								onChange={e =>
									dispatch(name({ id: item.id, name: e.target.value }))
								}
								value={item.name}
							/>
						</Space>
						<Space direction="vertical" size={'small'}>
							<Typography.Text>{t('periodOperation')}</Typography.Text>
							<div className="w-[624px] grid grid-cols-2 gap-x-4 max-sm:grid-cols-1">
								<div>
									<ConfigProvider
										locale={i18n.language === 'ru' ? ruPicker : enPicker}
									>
										<DatePicker
											className="w-full"
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
												item.startDate
													? dayjs(
															item.startDate.split('-').reverse().join('.'),
															'DD.MM.YYYY'
													  )
													: null
											}
										/>
									</ConfigProvider>
								</div>
								<div>
									<ConfigProvider
										locale={i18n.language === 'ru' ? ruPicker : enPicker}
									>
										<DatePicker
											className={clsx(' w-full')}
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
												item.endDate
													? dayjs(
															item.endDate.split('-').reverse().join('.'),
															'DD.MM.YYYY'
													  )
													: null
											}
										/>
									</ConfigProvider>
								</div>
							</div>
						</Space>
						<Space direction="vertical" size={'small'}>
							<Typography.Text>{t('Responsibilities')}</Typography.Text>
							<Input.TextArea
								className="w-[624px]"
								maxLength={100}
								style={{ height: 120, resize: 'none' }}
								placeholder={t('ResponsibilitiesDescription')}
								onChange={e =>
									dispatch(
										responsibilities({
											id: item.id,
											responsibilities: e.target.value
										})
									)
								}
								value={item.responsibilities}
							/>
						</Space>
						<Space direction="vertical" size={'small'}>
							<Typography.Text>{t('AdditionalInformation')}</Typography.Text>
							<Input.TextArea
								className="w-[624px]"
								maxLength={100}
								style={{ height: 120, resize: 'none' }}
								onChange={e =>
									dispatch(
										additionalInfo({
											id: item.id,
											additionalInfo: e.target.value
										})
									)
								}
								value={item.additionalInfo}
							/>
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
						{t('AddJob')}
					</Typography.Text>
				</Space>
				<Space direction="vertical" size={'small'}>
					<Space>
						<Typography.Text className="font-bold text-small text-black">
							{t('linkPortfolio')}
						</Typography.Text>
					</Space>
					<Input
						placeholder="https://disk.yandex.ru"
						size="large"
						className="w-[624px]"
						onChange={e => dispatch(portfolioLink(e.target.value))}
						value={!workData.portfolioLink ? '' : workData.portfolioLink}
					/>
				</Space>
				<Space size={'small'}>
					<Typography.Text className="text-black opacity-80 text-sm font-normal leading-none">
						{t('AttachDocuments')}
					</Typography.Text>
					<Tooltip title={t('YourWorks')}>
						<Button
							type="default"
							className="bg-transparent"
							icon={<QuestionOutlined className="text-xs" />}
						/>
					</Tooltip>
				</Space>

				<Upload {...props}>
					<Button icon={<UploadOutlined />}>{t('AddFile')}</Button>
				</Upload>
			</Space>
		</div>
	)
}
