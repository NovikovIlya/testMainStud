import {
	Button,
	ConfigProvider,
	DatePicker,
	Input,
	Space,
	Typography
} from 'antd'
import enPicker from 'antd/locale/en_US'
import ruPicker from 'antd/locale/ru_RU'
import clsx from 'clsx'
import dayjs from 'dayjs'
import 'dayjs/locale/en'
import 'dayjs/locale/ru'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import uuid from 'react-uuid'

import { useAppSelector } from '../../../store'
import {
	addWork,
	additionalInfo,
	deleteWork,
	endDate,
	name,
	portfolioLink,
	startDate
} from '../../../store/reducers/FormReducers/WorkReducer'
import { ImagesLayout } from '../ImagesLayout'

const { TextArea } = Input

export const WorkForm = () => {
	const { t, i18n } = useTranslation()
	dayjs.locale(i18n.language)
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const workData = useAppSelector(state => state.Work)

	const handleDeleteWork = (id: string) => {
		dispatch(deleteWork(id))
	}
	const handleAddWork = () => {
		dispatch(addWork(uuid()))
	}

	const handleCancel = () => {
		navigate('/documents')
	}
	const handleOk = () => {
		navigate('/user')
	}
	const handleSkip = () => {
		navigate('/user')
	}
	return (
		<ImagesLayout>
			<div className="w-full flex justify-center  text-sm">
				<div className="container max-w-2xl flex flex-col  pч-5">
					<h3 className="text-xl">{t('work')}</h3>
					<div className="flex flex-col gap-10 w-full">
						{workData.items.map((item, index) => (
							<div key={item.id}>
								<div className=" mt-5 w-full max-sm:gap-4">
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
									<div className="mt-2">
										<Input
											placeholder={t('placeholder')}
											size="large"
											maxLength={350}
											className="w-full"
											onChange={e =>
												dispatch(name({ id: item.id, name: e.target.value }))
											}
											value={item.name}
										/>
									</div>
								</div>
								<p className="mt-4 self-start">{t('periodOperation')}</p>
								<div className="grid grid-cols-2 gap-x-4 max-sm:grid-cols-1">
									<div className="mt-2">
										<ConfigProvider
											locale={i18n.language === 'ru' ? ruPicker : enPicker}
										>
											<DatePicker
												className="w-full"
												onChange={e =>
													dispatch(
														startDate({
															id: item.id,
															startDate:
																e !== null ? e.format('YYYY-MM-DD') : ''
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
									<div className="mt-2">
										<ConfigProvider
											locale={i18n.language === 'ru' ? ruPicker : enPicker}
										>
											<DatePicker
												className="w-full"
												onChange={e =>
													dispatch(
														endDate({
															id: item.id,
															endDate: e !== null ? e.format('YYYY-MM-DD') : ''
														})
													)
												}
												size="large"
												placeholder={t('End')}
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
								<div className="mt-4">
									<p className="text-black text-sm font-normal">
										{t('workExperience')}
									</p>
									<div className="mt-2">
										<TextArea
											placeholder={t('tellYourWorkExperience')}
											autoSize={{ minRows: 4, maxRows: 8 }}
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
									</div>
								</div>
							</div>
						))}
					</div>

					<div className="mt-10 flex flex-col items-center">
						<Button
							className="rounded-full text-center p-0 w-8 h-8 text-xl"
							type="primary"
							onClick={handleAddWork}
						>
							+
						</Button>
						<p className="opacity-40 text-sm mt-2">{t('add')}</p>
						<p className="opacity-40 text-sm lowercase">{t('work')}</p>
					</div>
					<p className="text-black text-sm font-normal mt-4">
						{t('linkPortfolio')}
					</p>
					<div className="mt-2">
						<Input
							placeholder={t('timeLine')}
							size="large"
							maxLength={500}
							className="w-full"
							onChange={e => dispatch(portfolioLink(e.target.value))}
							value={!workData.portfolioLink ? '' : workData.portfolioLink}
						/>
					</div>
					<div className="w-full flex justify-center items-center gap-8 mt-[60px]">
						<Button
							onClick={handleCancel}
							type="default"
							className="w-[200px] h-[50px] font-bold rounded-full border-[#3073D7] text-[#3073D7]"
						>
							{t('back')}
						</Button>
						<Button
							onClick={handleOk}
							type="primary"
							className="w-[200px] font-bold h-[50px] rounded-full"
						>
							{t('next')}
						</Button>
					</div>
					<div className="w-full flex justify-center">
						<Button
							onClick={handleSkip}
							type="text"
							className="rounded-full w-[200px]  h-[50px] mt-8"
						>
							{t('fillLater')}
						</Button>
					</div>
				</div>
			</div>
		</ImagesLayout>
	)
}
