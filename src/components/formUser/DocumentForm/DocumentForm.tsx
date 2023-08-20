import { Button, ConfigProvider, DatePicker, Input, Select } from 'antd'
import enPicker from 'antd/locale/en_US'
import ruPicker from 'antd/locale/ru_RU'
import clsx from 'clsx'
import dayjs from 'dayjs'
import 'dayjs/locale/en'
import 'dayjs/locale/ru'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { IError } from '../../../api/types'
import { useAppDispatch } from '../../../store'
import { useAppSelector } from '../../../store'
import { setDocument } from '../../../store/creators/MainCreators'
import {
	dateIssue,
	divisionCode,
	documentTypeId,
	inn,
	issuedBy,
	passportNumber,
	passportSeries,
	snils
} from '../../../store/reducers/FormReducers/DocumentReducer'
import { useGetDocumentsQuery } from '../../../store/slice/documentSlice'
import { ImagesLayout } from '../ImagesLayout'

export const DocumentForm = () => {
	const { t, i18n } = useTranslation()
	const [error, setError] = useState<IError | null>(null)

	dayjs.locale(i18n.language)
	const castDispatch = useAppDispatch()
	const dispatch = useDispatch()
	const userRole = useAppSelector(state => state.InfoUser.role)
	const data = useAppSelector(state => state.Document)

	const { data: documents } = useGetDocumentsQuery()

	const navigate = useNavigate()

	const handleCancel = () => {
		navigate('/form')
	}
	const handleOk = () => {
		if (!saveInStore()) {
			if (userRole === 'SCHOOL') navigate('/parent')
			else navigate('/education')
		}
	}
	const handleSkip = () => {
		navigate('/user')
	}
	useEffect(() => {
		setError(null)
	}, [i18n.language])

	const saveInStore = async () => {
		const response = await castDispatch(setDocument({ document: data }))
		if (response == null) return true
		else {
			setError(response)
			return false
		}
	}
	return (
		<ImagesLayout>
			<div className="w-full flex justify-center ">
				<div className="container max-w-2xl flex flex-col items-center justify-center px-5">
					<div className="flex w-full flex-col">
						<p className="text-xl font-bold">{t('documents')}</p>
						<span className="mt-4 text-sm">{t('documentType')}</span>
						<Select
							className="mt-2"
							size="large"
							onChange={e => dispatch(documentTypeId(e))}
							defaultValue={data.documentTypeId}
							options={
								documents !== undefined
									? documents.map(el => ({ value: el.id, label: el.type }))
									: []
							}
						/>
					</div>
					<div className="flex w-full flex-col mt-4 text-sm">
						<span>{t('passportData')}</span>
						<div className="grid grid-cols-2 gap-4 mt-4 max-sm:grid-cols-1 max-sm:gap-4">
							<div>
								<p>{t('divisionCode')}</p>
								<p>
									<Input
										placeholder="000-000"
										size="large"
										value={data?.divisionCode}
										className={clsx(
											'mt-2 shadow ',
											error !== null &&
												error.details.some(el => el.field === 'divisionCode') &&
												'border-rose-500'
										)}
										maxLength={7}
										onChange={e =>
											dispatch(divisionCode(e.currentTarget.value))
										}
									/>
									{error !== null && (
										<span className="text-red-500 text-sm">
											{error.details.map(el => {
												if (el.field === 'divisionCode')
													return <p>{el.message}</p>
												else return ''
											})}
										</span>
									)}
								</p>
							</div>
							<div>
								<p>{t('whenIssued')}</p>
								<p>
									<ConfigProvider
										locale={i18n.language === 'ru' ? ruPicker : enPicker}
									>
										<DatePicker
											className={clsx(
												'mt-2 shadow w-full',
												error !== null &&
													data.dateIssue === '' &&
													'border-rose-500'
											)}
											onChange={e =>
												dispatch(
													dateIssue(e == null ? '' : e?.format('YYYY-MM-DD'))
												)
											}
											size="large"
											placeholder={t('date')}
											format={'DD.MM.YYYY'}
											value={
												data.dateIssue !== ''
													? dayjs(
															data.dateIssue.split('-').reverse().join('.'),
															'DD.MM.YYYY'
													  )
													: null
											}
										/>
									</ConfigProvider>
									{error !== null && data.dateIssue === '' && (
										<p className="text-red-500 text-sm">{t('DateError')}</p>
									)}
								</p>
							</div>
							<div>
								<p>{t('series')}</p>
								<p>
									<Input
										placeholder="0000"
										size="large"
										className={clsx(
											'mt-2 shadow ',
											error &&
												error.details.some(
													el => el.field === 'passportSeries'
												) &&
												'border-rose-500'
										)}
										maxLength={4}
										onChange={e => dispatch(passportSeries(e.target.value))}
										value={
											data.passportSeries !== '' ? data.passportSeries : ''
										}
									/>
									{error !== null && (
										<span className="text-red-500 text-sm">
											{error.details.map(el => {
												if (el.field === 'passportSeries')
													return <p>{el.message}</p>
												else return ''
											})}
										</span>
									)}
								</p>
							</div>
							<div>
								<p>{t('number')}</p>
								<p>
									<Input
										placeholder="0000"
										size="large"
										className={clsx(
											'mt-2 shadow ',
											error !== null &&
												error.details.some(
													el => el.field === 'passportNumber'
												) &&
												'border-rose-500'
										)}
										maxLength={4}
										onChange={e => dispatch(passportNumber(e.target.value))}
										value={
											data.passportNumber !== '' ? data.passportNumber : ''
										}
									/>
									{error !== null && (
										<span className="text-red-500 text-sm">
											{error.details.map(el => {
												if (el.field === 'passportNumber')
													return <p>{el.message}</p>
												else return ''
											})}
										</span>
									)}
								</p>
							</div>
						</div>
						<div className="mt-4">
							<p>{t('issuedWhom')}</p>
							<p>
								<Input
									placeholder={t('location')}
									size="large"
									className={clsx(
										'mt-2 shadow ',
										error != null &&
											error.details.some(el => el.field === 'issuedBy') &&
											'border-rose-500'
									)}
									onChange={e => dispatch(issuedBy(e.target.value))}
									value={data.issuedBy !== '' ? data.issuedBy : ''}
								/>
								{error !== null && (
									<span className="text-red-500 text-sm">
										{error.details.map(el => {
											if (el.field === 'issuedBy') return <p>{el.message}</p>
											else return ''
										})}
									</span>
								)}
							</p>
						</div>
					</div>
					<div className="mt-4 w-full">
						<p className="text-sm">{t('additionalDocuments')}</p>
						<div className="flex text-sm flex-col w-full mt-4">
							<p>{t('snils')}</p>
							<p>
								<Input
									size="large"
									placeholder="0000"
									className={clsx(
										'mt-2 shadow ',
										error !== null &&
											error.details.some(el => el.field === 'snils') &&
											'border-rose-500'
									)}
									maxLength={4}
									onChange={e => dispatch(snils(e.target.value))}
									value={data.snils}
								/>
								{error !== null && (
									<span className="text-red-500 text-sm">
										{error.details.map(el => {
											if (el.field === 'snils') return <p>{el.message}</p>
											else return ''
										})}
									</span>
								)}
							</p>
							<p className="mt-4">{t('inn')}</p>
							<p>
								<Input
									size="large"
									placeholder="0000"
									maxLength={4}
									className={clsx(
										'mt-2 shadow ',
										error !== null &&
											error.details.some(el => el.field === 'inn') &&
											'border-rose-500'
									)}
									onChange={e => dispatch(inn(e.target.value))}
									value={data.inn}
								/>
								{error !== null && (
									<span className="text-red-500 text-sm">
										{error.details.map(el => {
											if (el.field === 'inn') return <p>{el.message}</p>
											else return ''
										})}
									</span>
								)}
							</p>
						</div>
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
							className="w-[200px] h-[50px]  font-bold rounded-full"
						>
							{t('next')}
						</Button>
					</div>
					<Button
						onClick={handleSkip}
						type="text"
						className="rounded-full w-[200px] h-[50px] mt-8"
					>
						{t('fillLater')}
					</Button>
				</div>
			</div>
		</ImagesLayout>
	)
}
