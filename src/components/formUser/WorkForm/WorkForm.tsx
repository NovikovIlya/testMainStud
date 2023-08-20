import { Button, ConfigProvider, DatePicker, Input } from 'antd'
import enPicker from 'antd/locale/en_US'
import ruPicker from 'antd/locale/ru_RU'
import clsx from 'clsx'
import dayjs from 'dayjs'
import 'dayjs/locale/en'
import 'dayjs/locale/ru'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { useAppSelector } from '../../../store'
import {
	additionalInfo,
	endDate,
	idAdd,
	idDelete,
	name,
	portfolioLink,
	responsibilities,
	startDate
} from '../../../store/reducers/FormReducers/WorkReducer'
import { ImagesLayout } from '../ImagesLayout'

const { TextArea } = Input

export const WorkForm = () => {
	const data = useAppSelector(state => state.Work)
	const { t, i18n } = useTranslation()
	dayjs.locale(i18n.language)
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const [error, setError] = useState(false)
	const handleCancel = () => {
		navigate('/documents')
	}
	const handleOk = () => {
		if (!saveInStore()) {
			navigate('/user')
		} else setError(true)
	}
	const handleSkip = () => {
		navigate('/user')
	}
	const saveInStore = () => {
		let IsEmpty = data.items.some(
			item =>
				item.name === '' ||
				item.startDate === '' ||
				item.startDate === '' ||
				item.additionalInfo === ''
		)
		return IsEmpty
	}
	const handleDeleteEducation = (id: number) => {
		dispatch(idDelete(id))
	}
	const addWork = () => {
		dispatch(idAdd(data.items[data.items.length - 1].id + 1))
	}
	console.log('work')
	return (
		<ImagesLayout>
			<div className="w-full flex justify-center  text-sm">
				<div className="container max-w-2xl flex flex-col  pч-5">
					<h3 className="text-xl">{t('work')}</h3>
					<div className="flex flex-col gap-10 w-full">
						{data.items.map(item => (
							<div key={item.id}>
								<div className=" mt-5 w-full max-sm:gap-4">
									<span className="flex">
										<p className="flex mr-5">{t('placeWork')}</p>
										{item.id !== 0 && (
											<p
												onClick={() => handleDeleteEducation(item.id)}
												className="opacity-40 text-sm cursor-pointer"
											>
												{t('remove')}
											</p>
										)}
									</span>

									<Input
										placeholder={t('placeholder')}
										size="large"
										className={clsx(
											'mt-2',
											error && item.name === '' && 'border-rose-500'
										)}
										onChange={e =>
											dispatch(
												name({
													id: item.id,
													name: e.target.value
												})
											)
										}
										value={data.items[item.id].name}
									/>
								</div>
								<p className="mt-4 self-start">{t('periodOperation')}</p>
								<div className="grid grid-cols-2 gap-x-4 max-sm:grid-cols-1">
									<ConfigProvider
										locale={i18n.language === 'ru' ? ruPicker : enPicker}
									>
										<DatePicker
											className={clsx(
												'mt-2 shadow w-full',
												error &&
													data.items[item.id].startDate === '' &&
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
											placeholder={t('date')}
											format={'DD.MM.YYYY'}
											value={
												data.items[item.id].startDate !== ''
													? dayjs(
															data.items[item.id].startDate
																.split('-')
																.reverse()
																.join('.'),
															'DD.MM.YYYY'
													  )
													: null
											}
										/>
									</ConfigProvider>
									<ConfigProvider
										locale={i18n.language === 'ru' ? ruPicker : enPicker}
									>
										<DatePicker
											className={clsx(
												'mt-2 shadow w-full',
												error &&
													data.items[item.id].endDate === '' &&
													'border-rose-500'
											)}
											onChange={e =>
												dispatch(
													endDate({
														id: item.id,
														endDate: e !== null ? e?.format('YYYY-MM-DD') : null
													})
												)
											}
											size="large"
											placeholder={t('date')}
											format={'DD.MM.YYYY'}
											value={
												data.items[item.id].endDate !== null
													? dayjs(
															data.items[item.id].endDate
																?.split('-')
																.reverse()
																.join('.'),
															'DD.MM.YYYY'
													  )
													: null
											}
										/>
									</ConfigProvider>
								</div>
								<div className="mt-4">
									<p className="text-black text-sm font-normal">
										{t('workExperience')}
									</p>
									<TextArea
										placeholder={t('tellYourWorkExperience')}
										className={clsx(
											'mt-2',
											error && item.additionalInfo === '' && 'border-rose-500'
										)}
										autoSize={{ minRows: 4, maxRows: 8 }}
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
						))}
					</div>

					<div className="mt-10 flex flex-col items-center">
						<Button
							className="rounded-full text-center p-0 w-8 h-8 text-xl"
							type="primary"
							onClick={addWork}
						>
							+
						</Button>
						<p className="opacity-40 text-sm mt-2">{t('add')}</p>
						<p className="opacity-40 text-sm lowercase">{t('work')}</p>
					</div>
					<p className="text-black text-sm font-normal mt-4">
						{t('linkPortfolio')}
					</p>
					<Input
						placeholder={t('timeLine')}
						size="large"
						className={clsx(
							'mt-2',
							error && data.portfolioLink === '' && 'border-rose-500'
						)}
						onChange={e => dispatch(portfolioLink(e.target.value))}
						value={data.portfolioLink}
					/>
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
