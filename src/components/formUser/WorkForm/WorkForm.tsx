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
import { useEffect } from 'react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { IWorkError, workItem } from '../../../api/types'
import { RootState } from '../../../store'
import { useAppSelector } from '../../../store'
import {
	deleteJobItemRequest,
	getAbUsJob,
	updateJobItemRequest
} from '../../../store/creators/MainCreators'
import { setJob } from '../../../store/creators/MainCreators'
import { allData } from '../../../store/reducers/FormReducers/WorkReducer'
import {
	additionalInfo,
	idAdd,
	name,
	portfolioLink,
	startDate
} from '../../../store/reducers/FormReducers/WorkReducer'
import { ImagesLayout } from '../ImagesLayout'

const { TextArea } = Input

export const WorkForm = () => {
	const data = useAppSelector(state => state.Work)
	const [IsEmpty, changeIsEmpty] = useState<boolean>(false)

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
		const response = await getAbUsJob()
		response !== null && dispatch(allData(response))
	}

	useEffect(() => {
		if (updateItems) {
			getData()
			setUpdate(false)
		}
	}, [updateItems])

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

	const handleDeleteWork = async (id: string) => {
		const response = await deleteJobItemRequest(id)
		if (response === 403) {
			console.log('403')
			//navigate("/")
		} else {
			setUpdate(true)
		}
	}
	const handleUpdateWork = async (id: string, item: workItem) => {
		if (!checkWorkItem(id, item)) {
			const response = await updateJobItemRequest(id, item)
			if (response === 403) {
				console.log('403')
				//navigate("/")
			} else {
				setUpdate(true)
			}
		}
	}

	const handleCancel = () => {
		navigate('/documents')
	}
	const handleOk = async () => {
		if (await IsOK()) {
			navigate('/user')
		}
	}
	const handleSkip = () => {
		navigate('/user')
	}

	const IsOK = async () => {
		const IsCorrectString = data.items.some(item =>
			[item.name, item.additionalInfo].some(
				el => !/\s\s/.test(el) && /^[\p{L}\s.,]+$/u.test(el)
			)
		)
		const IsCorrectDates = data.items.some(item =>
			[item.startDate, item.endDate].some(el => el !== '')
		)
		const IsCorrectLink = !data.portfolioLink
			? true
			: /^(?:https?:\/\/)?(?:www\.)?([a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*)(?:\/[^\s]*)?$/.test(
					data.portfolioLink
			  )
		if (!IsCorrectDates || !IsCorrectString || !IsCorrectLink) {
			changeIsEmpty(true)
			return false
		}
		const requestData = data.items.map(({ id, ...rest }) => rest)
		const response = await setJob({
			items: requestData,
			portfolioLink: data.portfolioLink
		})

		if (response === 200) return true
		else {
			if (response === 403) {
				navigate('/')
			}
		}
	}
	const addWork = () => {
		dispatch(idAdd(data.items[data.items.length - 1].id + 1))
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
											onClick={() => handleDeleteWork(item.id.toString())}
											className={clsx(
												'cursor-pointer opacity-40 text-center text-black text-sm font-normal leading-[18px]',
												index === 0 && 'hidden'
											)}
										>
											{t('Delete')}
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
											{t('Save')}
										</Typography.Text>
									</Space>
									<div className="mt-2">
										<Input
											placeholder={t('placeholder')}
											size="large"
											maxLength={350}
											className={clsx(
												'w-full',
												IsError.item &&
													IsError.item.id === item.id &&
													IsError.item.name &&
													'border-rose-500'
											)}
											onChange={e =>
												dispatch(name({ id: item.id, name: e.target.value }))
											}
											value={
												workData.items.filter(el => el.id === item.id)[0].name
											}
										/>
										{IsError.item &&
											IsError.item.id === item.id &&
											IsError.item.name && (
												<span className="text-rose-500 text-sm">
													{t('EmptyFolder')}
												</span>
											)}
									</div>
								</div>
								<p className="mt-4 self-start">{t('periodOperation')}</p>
								<div className="grid grid-cols-2 gap-x-4 max-sm:grid-cols-1">
									<div className="mt-2">
										<ConfigProvider
											locale={i18n.language === 'ru' ? ruPicker : enPicker}
										>
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
															startDate:
																e !== null ? e.format('YYYY-MM-DD') : ''
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
										{IsEmpty && item.startDate === '' && (
											<span className="text-rose-500 text-sm">
												{t('DateError')}
											</span>
										)}
									</div>
									<div className="mt-2">
										<ConfigProvider
											locale={i18n.language === 'ru' ? ruPicker : enPicker}
										>
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
															startDate:
																e !== null ? e.format('YYYY-MM-DD') : ''
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
												<span className="text-rose-500 text-sm">
													{t('EmptyFolder')}
												</span>
											)}
									</div>
								</div>
								<div className="mt-4">
									<p className="text-black text-sm font-normal">
										{t('workExperience')}
									</p>
									<div className="mt-2">
										<TextArea
											placeholder={t('tellYourWorkExperience')}
											className={clsx(
												'mt-2',
												IsEmpty &&
													(/\s\s/.test(item.additionalInfo) ||
														!/^[\p{L}\s.,]+$/u.test(item.additionalInfo)) &&
													'border-rose-500'
											)}
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
											value={
												workData.items.filter(el => el.id === item.id)[0]
													.additionalInfo
											}
										/>
										{IsEmpty &&
											(/\s\s/.test(item.additionalInfo) ||
												!/^[\p{L}\s.,]+$/u.test(item.additionalInfo)) && (
												<span className="text-red-500 text-sm">
													{t('EmptyFolder')}
												</span>
											)}
									</div>
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
					<div className="mt-2">
						<Input
							placeholder={t('timeLine')}
							size="large"
							maxLength={500}
							className={clsx(
								'w-full',
								IsEmpty &&
									data.portfolioLink &&
									!/^(?:https?:\/\/)?(?:www\.)?([a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*)(?:\/[^\s]*)?$/.test(
										data.portfolioLink
									) &&
									'border-rose-500'
							)}
							onChange={e => dispatch(portfolioLink(e.target.value))}
							value={!data.portfolioLink ? '' : data.portfolioLink}
						/>
						{IsEmpty &&
							data.portfolioLink &&
							!/^(?:https?:\/\/)?(?:www\.)?([a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*)(?:\/[^\s]*)?$/.test(
								data.portfolioLink
							) && <span className="text-red-500 text-sm">{t('BadLink')}</span>}
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
