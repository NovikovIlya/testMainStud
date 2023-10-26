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

import { RootState, useAppSelector } from '../../../store'
import { useGetMyDocumentsQuery } from '../../../store/api/formApi'
import {
	getDocumentItemRequest,
	postDocumentItemRequest
} from '../../../store/creators/MainCreators'
import {
	allData,
	dateIssue,
	divisionCode,
	documentTypeId,
	inn,
	issuedBy,
	passportNumber,
	passportSeries,
	snils
} from '../../../store/reducers/FormReducers/DocumentReducer'
import '../GeneralStyles.scss'
import { ImagesLayout } from '../ImagesLayout'

export const DocumentForm = () => {
	const { t, i18n } = useTranslation()
	const [IsEmpty, changeIsEmpty] = useState<boolean>(false)
	const [SkipCountriesQuery, changeQuerySkip] = useState<boolean>(true)
	dayjs.locale(i18n.language)
	const dispatch = useDispatch()
	const userRole = useAppSelector(state => state.InfoUser.role)
	const documentData = useAppSelector(state => state.Document)
	const documentStorage = useAppSelector(
		(state: RootState) => state.CountriesEducation.documents
	)
	const { data: documents } = useGetMyDocumentsQuery(i18n.language, {
		skip: SkipCountriesQuery
	})

	const navigate = useNavigate()
	const getData = async () => {
		const response = await getDocumentItemRequest()
		if (response) {
			dispatch(
				allData({
					documentTypeId: !response.documentTypeId
						? 1
						: response.documentTypeId,
					passportSeries: !response.passportSeries
						? ''
						: response.passportSeries,
					passportNumber: !response.passportNumber
						? ''
						: response.passportNumber,
					issuedBy: !response.issuedBy ? '' : response.issuedBy,
					dateIssue: !response.dateIssue ? '' : response.dateIssue,
					divisionCode: !response.divisionCode ? '' : response.divisionCode,
					inn: !response.inn ? '' : response.inn,
					snils: !response.snils ? '' : response.snils
				})
			)
		} else console.log('403')
	}

	useEffect(() => {
		getData()
	}, [])
	useEffect(() => {
		if (documentData) {
			changeQuerySkip(true)
		} else {
			changeQuerySkip(false)
		}
	}, [documentData])

	useEffect(() => {
		if (documents) {
			//dispatch(addDocuments(documents))
		}
	}, [documents])

	const handleCancel = () => {
		navigate('/form')
	}
	const navigating = () => {
		if (userRole === 'SCHOOL') navigate('/parent')
		else navigate('/education')
	}
	const handleOk = async () => {
		const response = await handleAddDocument()
		console.log(response)
		navigating()
	}
	const handleSkip = () => {
		navigate('/user')
	}
	const handleAddDocument = async () => {
		const IsCorrectPasswordData = [
			documentData.passportNumber,
			documentData.passportSeries
		].some(el => /^[0-9]{4}$/.test(el))

		const IsCorrectSNILS = /^[0-9]{3}\-[0-9]{3}\-[0-9]{3} [0-9]{2}$/.test(
			documentData.snils
		)
		const IsCorrectDivisionCode = /^[0-9]{3}\-[0-9]{3}$/.test(
			documentData.divisionCode
		)
		const IsCorrectINN = /^[0-9]{12}$/.test(documentData.inn)
		const IsCorrectWhomIssued =
			!/\s\s/.test(documentData.issuedBy) &&
			/^[\p{L}\s]+$/u.test(documentData.issuedBy)
		if (
			!IsCorrectPasswordData ||
			!IsCorrectSNILS ||
			!IsCorrectINN ||
			!IsCorrectDivisionCode ||
			documentData.dateIssue === '' ||
			!IsCorrectWhomIssued
		) {
			changeIsEmpty(true)
			return false
		}
		const response = await postDocumentItemRequest(documentData)
		if (response === 200) changeIsEmpty(false)
		else {
			console.log('403')
		}
	}
	useEffect(() => {
		if (!documentStorage) changeQuerySkip(false)
	}, [documentStorage])
	return (
		<ImagesLayout>
			<div className="w-full flex justify-center ">
				<div className="container max-w-2xl flex flex-col items-center justify-center px-5">
					<div className="flex w-full flex-col">
						<p className="text-xl font-bold">{t('documents')}</p>
						<span className="mt-4 text-sm">{t('documentType')}</span>

						<Select
							className="w-full mt-2 mb-4"
							size="large"
							onChange={e => dispatch(documentTypeId(e))}
							options={
								documentStorage !== null
									? documentStorage.map(el => ({
											value: el.id,
											label: el.type
									  }))
									: []
							}
							value={documentData.documentTypeId}
						/>
					</div>
					<div className="flex w-full flex-col mt-4 text-sm">
						<span>{t('passportData')}</span>
						<div className="grid grid-cols-2 gap-4 mt-4 max-sm:grid-cols-1 max-sm:gap-4">
							<div>
								<p>{t('divisionCode')}</p>
								<div className="mt-2">
									<Input
										placeholder="000-000"
										size="large"
										value={documentData?.divisionCode}
										className={clsx(
											'shadow ',
											IsEmpty &&
												!/^[0-9]{3}\-[0-9]{3}$/.test(
													documentData.divisionCode
												) &&
												'border-rose-500'
										)}
										maxLength={7}
										onChange={e =>
											dispatch(divisionCode(e.currentTarget.value))
										}
									/>
									{IsEmpty &&
										!/^[0-9]{3}\-[0-9]{3}$/.test(documentData.divisionCode) && (
											<span className="text-red-500 text-sm">
												{t('BadDivisionCode')}
											</span>
										)}
								</div>
							</div>
							<div>
								<p>{t('whenIssued')}</p>
								<div className="mt-2">
									<ConfigProvider
										locale={i18n.language === 'ru' ? ruPicker : enPicker}
									>
										<DatePicker
											className={clsx(
												'shadow w-full',
												IsEmpty &&
													documentData.dateIssue === '' &&
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
												documentData.dateIssue !== ''
													? dayjs(
															documentData.dateIssue
																.split('-')
																.reverse()
																.join('.'),
															'DD.MM.YYYY'
													  )
													: null
											}
										/>
									</ConfigProvider>
									{IsEmpty && documentData.dateIssue === '' && (
										<div className="text-red-500 text-sm">{t('DateError')}</div>
									)}
								</div>
							</div>
							<div>
								<p>{t('series')}</p>
								<div className="mt-2">
									<Input
										placeholder="0000"
										size="large"
										className={clsx(
											'shadow ',
											IsEmpty &&
												!/^[0-9]{4}$/.test(documentData.passportSeries) &&
												'border-rose-500'
										)}
										maxLength={4}
										onChange={e => dispatch(passportSeries(e.target.value))}
										value={
											documentData.passportSeries !== ''
												? documentData.passportSeries
												: ''
										}
									/>
									{IsEmpty &&
										!/^[0-9]{4}$/.test(documentData.passportSeries) && (
											<span className="text-red-500 text-sm">
												{t('BadPassport')}
											</span>
										)}
								</div>
							</div>
							<div>
								<p>{t('number')}</p>
								<div className="mt-2">
									<Input
										placeholder="0000"
										size="large"
										className={clsx(
											'shadow',
											IsEmpty &&
												!/^[0-9]{4}$/.test(documentData.passportNumber) &&
												'border-rose-500'
										)}
										maxLength={4}
										onChange={e => dispatch(passportNumber(e.target.value))}
										value={
											documentData.passportNumber !== ''
												? documentData.passportNumber
												: ''
										}
									/>
									{IsEmpty &&
										!/^[0-9]{4}$/.test(documentData.passportNumber) && (
											<span className="text-red-500 text-sm">
												{t('BadPassport')}
											</span>
										)}
								</div>
							</div>
						</div>
						<div className="mt-4">
							<p>{t('issuedWhom')}</p>
							<div className="mt-2">
								<Input
									placeholder={t('location')}
									size="large"
									maxLength={200}
									className={clsx(
										'shadow',
										IsEmpty &&
											(!/^[\p{L}\s]+$/u.test(documentData.issuedBy) ||
												/\s\s/.test(documentData.issuedBy)) &&
											'border-rose-500'
									)}
									onChange={e => dispatch(issuedBy(e.target.value))}
									value={
										documentData.issuedBy !== '' ? documentData.issuedBy : ''
									}
								/>
								{IsEmpty &&
									(!/^[\p{L}\s]+$/u.test(documentData.issuedBy) ||
										/\s\s/.test(documentData.issuedBy)) && (
										<span className="text-red-500 text-sm">
											{t('EmptyFolder')}
										</span>
									)}
							</div>
						</div>
					</div>
					<div className="mt-4 w-full">
						<p className="text-sm">{t('additionalDocuments')}</p>
						<div className="flex text-sm flex-col w-full mt-4">
							<p>{t('snils')}</p>
							<div className="mt-2">
								<Input
									size="large"
									placeholder="000-000-000 00"
									className={clsx(
										'shadow ',
										IsEmpty &&
											!/^[0-9]{3}\-[0-9]{3}\-[0-9]{3} [0-9]{2}$/.test(
												documentData.snils
											) &&
											'border-rose-500'
									)}
									maxLength={14}
									onChange={e => dispatch(snils(e.target.value))}
									value={documentData.snils}
								/>
								{IsEmpty &&
									!/^[0-9]{3}\-[0-9]{3}\-[0-9]{3} [0-9]{2}$/.test(
										documentData.snils
									) && (
										<span className="text-red-500 text-sm">
											{t('BadSnils')}
										</span>
									)}
							</div>
							<p className="mt-4">{t('inn')}</p>
							<div className="mt-2">
								<Input
									size="large"
									placeholder="000000000000"
									maxLength={12}
									className={clsx(
										'shadow ',
										IsEmpty &&
											!/^[0-9]{12}$/.test(documentData.inn) &&
											'border-rose-500'
									)}
									onChange={e => dispatch(inn(e.target.value))}
									value={documentData.inn}
								/>
								{IsEmpty && !/^[0-9]{12}$/.test(documentData.inn) && (
									<span className="text-red-500 text-sm">{t('BadInn')}</span>
								)}
							</div>
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
