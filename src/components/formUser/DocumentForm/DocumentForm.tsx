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
import '../GeneralStyles.scss'
import { ImagesLayout } from '../ImagesLayout'

export const DocumentForm = () => {
	const { t, i18n } = useTranslation()
	const [IsEmpty, changeIsEmpty] = useState<boolean>(false)

	dayjs.locale(i18n.language)
	const dispatch = useDispatch()
	const userRole = useAppSelector(state => state.InfoUser.role)
	const data = useAppSelector(state => state.Document)

	const { data: documents } = useGetDocumentsQuery()

	const navigate = useNavigate()

	const handleCancel = () => {
		navigate('/form')
	}
	const handleOk = async () => {
		if (await IsOK()) {
			if (userRole === 'SCHOOL') navigate('/parent')
			else navigate('/education')
		}
	}
	const handleSkip = () => {
		navigate('/user')
	}
	useEffect(() => {
		changeIsEmpty(false)
	}, [i18n.language])

	const IsOK = async () => {
		const IsCorrectPasswordData = [
			data.passportNumber,
			data.passportSeries
		].some(el => /^[0-9]{4}$/.test(el))

		const IsCorrectSNILS = /^[0-9]{3}\-[0-9]{3}\-[0-9]{3} [0-9]{2}$/.test(
			data.snils
		)
		const IsCorrectDivisionCode = /^[0-9]{3}\-[0-9]{3}$/.test(data.divisionCode)
		const IsCorrectINN = /^[0-9]{12}$/.test(data.inn)
		const IsCorrectWhomIssued =
			!/\s\s/.test(data.issuedBy) && /^[\p{L}\s]+$/u.test(data.issuedBy)
		if (
			!IsCorrectPasswordData ||
			!IsCorrectSNILS ||
			!IsCorrectINN ||
			!IsCorrectDivisionCode ||
			data.dateIssue === '' ||
			!IsCorrectWhomIssued
		) {
			changeIsEmpty(true)
			return false
		}
		const response = await setDocument({ document: data }, dispatch)
		if (response === 200) return true
		else {
			if (response === 403) {
				navigate('/')
			} else {
				return false
			}
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
							className="w-full mt-2 mb-4"
							size="large"
							onChange={e => dispatch(documentTypeId(e))}
							options={
								documents !== undefined
									? documents.map(el => ({ value: el.id, label: el.type }))
									: []
							}
							value={data.documentTypeId}
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
										value={data?.divisionCode}
										className={clsx(
											'shadow ',
											IsEmpty &&
												!/^[0-9]{3}\-[0-9]{3}$/.test(data.divisionCode) &&
												'border-rose-500'
										)}
										maxLength={7}
										onChange={e =>
											dispatch(divisionCode(e.currentTarget.value))
										}
									/>
									{IsEmpty &&
										!/^[0-9]{3}\-[0-9]{3}$/.test(data.divisionCode) && (
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
												IsEmpty && data.dateIssue === '' && 'border-rose-500'
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
									{IsEmpty && data.dateIssue === '' && (
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
												!/^[0-9]{4}$/.test(data.passportSeries) &&
												'border-rose-500'
										)}
										maxLength={4}
										onChange={e => dispatch(passportSeries(e.target.value))}
										value={
											data.passportSeries !== '' ? data.passportSeries : ''
										}
									/>
									{IsEmpty && !/^[0-9]{4}$/.test(data.passportSeries) && (
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
												!/^[0-9]{4}$/.test(data.passportNumber) &&
												'border-rose-500'
										)}
										maxLength={4}
										onChange={e => dispatch(passportNumber(e.target.value))}
										value={
											data.passportNumber !== '' ? data.passportNumber : ''
										}
									/>
									{IsEmpty && !/^[0-9]{4}$/.test(data.passportNumber) && (
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
										'shadow ',
										IsEmpty &&
											(!/^[\p{L}\s]+$/u.test(data.issuedBy) ||
												/\s\s/.test(data.issuedBy)) &&
											'border-rose-500'
									)}
									onChange={e => dispatch(issuedBy(e.target.value))}
									value={data.issuedBy !== '' ? data.issuedBy : ''}
								/>
								{IsEmpty &&
									(!/^[\p{L}\s]+$/u.test(data.issuedBy) ||
										/\s\s/.test(data.issuedBy)) && (
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
												data.snils
											) &&
											'border-rose-500'
									)}
									maxLength={14}
									onChange={e => dispatch(snils(e.target.value))}
									value={data.snils}
								/>
								{IsEmpty &&
									!/^[0-9]{3}\-[0-9]{3}\-[0-9]{3} [0-9]{2}$/.test(
										data.snils
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
											!/^[0-9]{12}$/.test(data.inn) &&
											'border-rose-500'
									)}
									onChange={e => dispatch(inn(e.target.value))}
									value={data.inn}
								/>
								{IsEmpty && !/^[0-9]{12}$/.test(data.inn) && (
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
