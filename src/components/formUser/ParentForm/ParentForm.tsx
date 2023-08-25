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
import { setParent } from '../../../store/creators/MainCreators'
import {
	FIO,
	dateIssue,
	divisionCode,
	documentTypeId,
	eMail,
	inn,
	issuedBy,
	passportNumber,
	passportSeries,
	phone,
	registrationAddress,
	residenceAddress,
	snils
} from '../../../store/reducers/FormReducers/ParentReducer'
import { useGetDocumentsQuery } from '../../../store/slice/documentSlice'
import { ImagesLayout } from '../ImagesLayout'

export const ParentForm = () => {
	const { t, i18n } = useTranslation()
	const dispatch = useDispatch()
	const navigate = useNavigate()
	dayjs.locale(i18n.language)
	const [IsEmpty, changeIsEmpty] = useState<boolean>(false)
	const data = useAppSelector(state => state.Parent)

	const { data: documents } = useGetDocumentsQuery()

	const handleCancel = () => {
		navigate('/form')
	}
	const handleOk = async () => {
		if (await IsOK()) navigate('/user')
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
		const IsCorrectFIO = /^([\p{L}]+)\s([\p{L}]+)\s?([\p{L}]*)$/u.test(data.FIO)
		const IsCorrectAddresses = [
			data.registrationAddress,
			data.residenceAddress
		].some(el => !/\s\s/.test(el) && /^[\p{L}\s.,-:0-9]+$/u.test(el))
		const isCorrectPhone =
			/^\+[0-9]\s[0-9]{3}\s[0-9]{3}\-[0-9]{2}\-[0-9]{2}$/.test(data.phone)
		const isCorrectEmail =
			/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(data.eMail)
		if (
			!IsCorrectPasswordData ||
			!IsCorrectSNILS ||
			!IsCorrectINN ||
			!IsCorrectDivisionCode ||
			data.dateIssue === '' ||
			!IsCorrectWhomIssued ||
			!IsCorrectFIO ||
			!IsCorrectAddresses ||
			!isCorrectPhone ||
			!isCorrectEmail
		) {
			changeIsEmpty(true)
			return false
		}

		var user = data.FIO.split(' ')
		const response = await setParent(
			{
				parent: {
					name: user[0],
					surName: user[1],
					patronymic: user.length > 2 ? user[2] : '',
					dateIssue: data.dateIssue,
					divisionCode: data.divisionCode,
					eMail: data.eMail,
					issuedBy: data.issuedBy,
					documentTypeId: data.documentTypeId,
					phone: data.phone,
					passportSeries: data.passportSeries,
					passportNumber: data.passportNumber,
					registrationAddress: data.registrationAddress,
					residenceAddress: data.residenceAddress,
					inn: data.inn,
					snils: data.snils
				}
			},
			dispatch
		)

		if (response == null) return true
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
				<div className="container max-w-2xl flex flex-col items-start justify-center p-5">
					<div className="text-black text-[20px] font-bold">
						{t('infoParents')}
					</div>
					<div className="text-black text-[14px] mt-7 font-normal self-start">
						{t('parentFIO')}
					</div>
					<div className="mt-2 w-full">
						<Input
							placeholder="Безухов Пьер Кириллович"
							size="large"
							maxLength={250}
							className={clsx(
								'shadow',
								IsEmpty &&
									!/^([\p{L}]+)\s([\p{L}]+)\s?([\p{L}]*)$/u.test(data.FIO) &&
									'border-rose-500'
							)}
							onChange={e => {
								dispatch(FIO(e.target.value))
							}}
							value={data.FIO}
						/>
						{IsEmpty &&
							!/^([\p{L}]+)\s([\p{L}]+)\s?([\p{L}]*)$/u.test(data.FIO) && (
								<span className="text-red-500 text-sm">
									{t('BadDivisionCode')}
								</span>
							)}
					</div>
					<div className="text-black text-[14px] font-normal mt-4">
						{t('parentPhone')}
					</div>
					<div className="mt-2 w-full">
						<Input
							placeholder="+7 999 898-88-00"
							size="large"
							className={clsx(
								'shadow',
								IsEmpty &&
									!/^\+[0-9]\s[0-9]{3}\s[0-9]{3}\-[0-9]{2}\-[0-9]{2}$/.test(
										data.phone
									) &&
									'border-rose-500'
							)}
							onChange={e => dispatch(phone(e.target.value))}
							value={data.phone}
							maxLength={16}
						/>
						{IsEmpty &&
							!/^\+[0-9]\s[0-9]{3}\s[0-9]{3}\-[0-9]{2}\-[0-9]{2}$/.test(
								data.phone
							) && (
								<span className="text-red-500 text-sm">{t('BadPhone')}</span>
							)}
					</div>
					<div className="text-black text-[14px] font-normal mt-4">
						{t('parentEmail')}
					</div>
					<div className="mt-2 w-full">
						<Input
							placeholder="BezuPr@gmail.com"
							size="large"
							className={clsx(
								'mt-2 shadow',
								IsEmpty &&
									!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(
										data.eMail
									) &&
									'border-rose-500'
							)}
							onChange={e => dispatch(eMail(e.target.value))}
							value={data.eMail}
						/>
						{IsEmpty &&
							!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(
								data.eMail
							) && (
								<span className="text-red-500 text-sm">{t('BadEmail')}</span>
							)}
					</div>
					<div className="text-black text-[20px] mt-7 font-bold">
						{t('parentDocument')}
					</div>
					<div className="text-black text-[14px] mt-7 font-bold">
						{t('documentType')}
					</div>

					<Select
						className="w-full shadow rounded-lg mt-2"
						placeholder={t('documentType')}
						size="large"
						options={
							documents !== undefined
								? documents.map(el => ({ value: el.id, label: el.name }))
								: []
						}
						onChange={e => dispatch(documentTypeId(e))}
						value={data.documentTypeId}
					/>

					<div className="w-[151px] h-[19px] text-black text-[14px] font-bold mt-4">
						{t('documentInfo')}
					</div>
					<div className="grid grid-cols-2 w-full gap-4">
						<div className="mt-4">
							<div className=" text-black text-[14px] font-normal">
								{t('divisionCode')}
							</div>
							<div className="mt-2">
								<Input
									placeholder="000-000"
									maxLength={7}
									size="large"
									className={clsx(
										'shadow',
										IsEmpty &&
											!/^[0-9]{3}\-[0-9]{3}$/.test(data.divisionCode) &&
											'border-rose-500'
									)}
									onChange={e => dispatch(divisionCode(e.target.value))}
									value={data.divisionCode}
								/>
								{IsEmpty && !/^[0-9]{3}\-[0-9]{3}$/.test(data.divisionCode) && (
									<span className="text-red-500 text-sm">
										{t('BadDivisionCode')}
									</span>
								)}
							</div>
						</div>
						<div className="mt-4">
							<div className="text-black text-[14px] font-normal">
								{t('whenIssued')}
							</div>
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
									<span className="text-red-500 text-sm">{t('DateError')}</span>
								)}
							</div>
						</div>
						<div className="">
							<div className="text-black text-[14px] font-normal">
								{t('series')}
							</div>
							<div className="mt-2"></div>
							<Input
								placeholder="0000"
								size="large"
								className={clsx(
									'shadow',
									IsEmpty &&
										!/^[0-9]{4}$/.test(data.passportSeries) &&
										'border-rose-500'
								)}
								onChange={e => dispatch(passportSeries(e.target.value))}
								value={data.passportSeries}
								maxLength={4}
							/>
							{IsEmpty && !/^[0-9]{4}$/.test(data.passportSeries) && (
								<span className="text-red-500 text-sm">{t('BadPassport')}</span>
							)}
						</div>
						<div className="">
							<div className="text-black text-[14px] font-normal">
								{t('number')}
							</div>
							<div className="mt-2">
								<Input
									placeholder="0000"
									size="large"
									maxLength={4}
									className={clsx(
										'shadow',
										IsEmpty &&
											!/^[0-9]{4}$/.test(data.passportNumber) &&
											'border-rose-500'
									)}
									onChange={e => dispatch(passportNumber(e.target.value))}
									value={data.passportNumber}
								/>
								{IsEmpty && !/^[0-9]{4}$/.test(data.passportNumber) && (
									<span className="text-red-500 text-sm">
										{t('BadPassport')}
									</span>
								)}
							</div>
						</div>
					</div>
					<div className="mt-4 w-full">
						<p>{t('issuedWhom')}</p>
						<div className="mt-2">
							<Input
								placeholder={t('location')}
								maxLength={200}
								size="large"
								className={clsx(
									'shadow',
									IsEmpty &&
										(/\s\s/.test(data.issuedBy) ||
											!/^[\p{L}\s]+$/u.test(data.issuedBy)) &&
										'border-rose-500'
								)}
								onChange={e => dispatch(issuedBy(e.target.value))}
								value={data.issuedBy}
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
					<div className="text-black text-[14px] mt-4 font-bold">
						{t('additionalDocuments')}
					</div>
					<div className="text-black text-[14px] font-normal mt-4">
						{t('snils')}
					</div>
					<div className="mt-2 w-full">
						<Input
							placeholder="000-000-000 00"
							size="large"
							className={clsx(
								'shadow',
								IsEmpty &&
									!/^[0-9]{3}\-[0-9]{3}\-[0-9]{3} [0-9]{2}$/.test(data.snils) &&
									'border-rose-500'
							)}
							onChange={e => dispatch(snils(e.target.value))}
							value={data.snils}
							maxLength={14}
						/>
						{IsEmpty &&
							!/^[0-9]{3}\-[0-9]{3}\-[0-9]{3} [0-9]{2}$/.test(data.snils) && (
								<span className="text-red-500 text-sm">{t('BadSnils')}</span>
							)}
					</div>
					<div className="text-black text-[14px] font-normal mt-4">
						{t('inn')}
					</div>
					<div className="mt-2 w-full">
						<Input
							placeholder="000000000000"
							maxLength={12}
							size="large"
							className={clsx(
								'mt-2 shadow',
								IsEmpty && !/^[0-9]{12}$/.test(data.inn) && 'border-rose-500'
							)}
							onChange={e => dispatch(inn(e.target.value))}
							value={data.inn}
						/>
						{IsEmpty && !/^[0-9]{12}$/.test(data.inn) && (
							<span className="text-red-500 text-sm">{t('BadInn')}</span>
						)}
					</div>
					<div className="text-black text-[20px] font-bold mt-7">
						{t('adress')}
					</div>
					<div className="text-black text-[14px] font-normal mt-7">
						{t('RegAdress')}
					</div>
					<div className="mt-2 w-full">
						<Input
							placeholder={t('AdressLocation')}
							size="large"
							maxLength={400}
							className={clsx(
								'shadow',
								IsEmpty &&
									(/\s\s/.test(data.registrationAddress) ||
										!/^[\p{L}\s.,-:0-9]+$/u.test(data.registrationAddress)) &&
									'border-rose-500'
							)}
							onChange={e => dispatch(registrationAddress(e.target.value))}
							value={data.registrationAddress}
						/>
						{IsEmpty &&
							(/\s\s/.test(data.registrationAddress) ||
								!/^[\p{L}\s.,-:0-9]+$/u.test(data.registrationAddress)) && (
								<span className="text-red-500 text-sm">{t('EmptyFolder')}</span>
							)}
					</div>
					<div className="text-black text-[14px] mt-4 font-normal">
						{t('ResidenseAdress')}
					</div>
					<div className="mt-2 w-full">
						<Input
							placeholder={t('AdressLocation')}
							size="large"
							maxLength={400}
							className={clsx(
								'shadow',
								IsEmpty &&
									(/\s\s/.test(data.registrationAddress) ||
										!/^[\p{L}\s.,-:0-9]+$/u.test(data.registrationAddress)) &&
									'border-rose-500'
							)}
							onChange={e => dispatch(residenceAddress(e.target.value))}
							value={data.residenceAddress}
						/>
						{IsEmpty &&
							(/\s\s/.test(data.residenceAddress) ||
								!/^[\p{L}\s.,-:0-9]+$/u.test(data.residenceAddress)) && (
								<span className="text-red-500 text-sm">{t('EmptyFolder')}</span>
							)}
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
							className="w-[200px] h-[50px] rounded-full"
						>
							{t('next')}
						</Button>
					</div>
					<Button
						onClick={handleSkip}
						type="text"
						className="rounded-full w-[200px] font-bold h-[50px] mt-8 self-center"
					>
						{t('fillLater')}
					</Button>
				</div>
			</div>
		</ImagesLayout>
	)
}
