import { Button, ConfigProvider, DatePicker, Input, Select } from 'antd'
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
	dayjs.locale(i18n.language)
	const [error, setError] = useState(false)
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const data = useAppSelector(state => state.Parent)

	const { data: documents } = useGetDocumentsQuery()

	const handleCancel = () => {
		navigate('/form')
	}
	const handleOk = () => {
		if (!saveInStore()) navigate('/user')
	}
	const handleSkip = () => {
		navigate('/user')
	}
	const saveInStore = () => {
		if (
			[
				data.FIO,
				data.dateIssue,
				data.divisionCode,
				data.eMail,
				data.inn,
				data.issuedBy,
				data.documentTypeId,
				data.passportNumber,
				data.passportSeries,
				data.phone,
				data.snils
			].some(el => el === '')
		) {
			setError(true)
			return true
		} else return false
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
					<Input
						placeholder="Безухов Пьер Кириллович"
						size="large"
						className={clsx(
							'mt-2 shadow',
							error && data.FIO === '' && 'border-rose-500'
						)}
						onChange={e => {
							dispatch(FIO(e.target.value))
						}}
						value={data.FIO}
					/>
					<div className="text-black text-[14px] font-normal mt-4">
						{t('parentPhone')}
					</div>
					<Input
						placeholder="+7 999 898-88-00"
						size="large"
						className={clsx(
							'mt-2 shadow',
							error && data.phone === '' && 'border-rose-500'
						)}
						onChange={e => dispatch(phone(e.target.value))}
						value={data.phone}
					/>
					<div className="text-black text-[14px] font-normal mt-4">
						{t('parentEmail')}
					</div>
					<Input
						placeholder="BezuPr@gmail.com"
						size="large"
						className={clsx(
							'mt-2 shadow',
							error && data.eMail === '' && 'border-rose-500'
						)}
						onChange={e => dispatch(eMail(e.target.value))}
						value={data.eMail}
					/>
					<div className="text-black text-[20px] mt-7 font-bold">
						{t('parentDocument')}
					</div>
					<div className="text-black text-[14px] mt-7 font-bold">
						{t('documentType')}
					</div>
					<Select
						className="mt-2 w-full shadow rounded-lg"
						size="large"
						defaultValue={data.documentTypeId}
						options={
							documents !== undefined
								? documents.map(el => ({ value: el.id, label: el.type }))
								: []
						}
						onChange={e => dispatch(documentTypeId(e))}
					/>
					<div className="w-[151px] h-[19px] text-black text-[14px] font-bold mt-4">
						{t('documentInfo')}
					</div>
					<div className="grid grid-cols-2 w-full gap-4">
						<div className="mt-4">
							<div className=" text-black text-[14px] font-normal">
								{t('divisionCode')}
							</div>
							<Input
								placeholder="000-000"
								size="large"
								className={clsx(
									'mt-2 shadow',
									error && data.divisionCode === '' && 'border-rose-500'
								)}
								onChange={e => dispatch(divisionCode(e.target.value))}
								value={data.divisionCode}
							/>
						</div>
						<div className="mt-4">
							<div className="text-black text-[14px] font-normal">
								{t('whenIssued')}
							</div>
							<ConfigProvider
								locale={i18n.language === 'ru' ? ruPicker : enPicker}
							>
								<DatePicker
									className={clsx(
										'mt-2 shadow w-full',
										error && data.dateIssue === '' && 'border-rose-500'
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
						</div>
						<div className="">
							<div className="text-black text-[14px] font-normal">
								{t('series')}
							</div>
							<Input
								placeholder="000-000"
								size="large"
								className={clsx(
									'mt-2 shadow',
									error && data.passportSeries === '' && 'border-rose-500'
								)}
								onChange={e => dispatch(passportSeries(e.target.value))}
								value={data.passportSeries}
							/>
						</div>
						<div className="">
							<div className="text-black text-[14px] font-normal">
								{t('number')}
							</div>
							<Input
								placeholder="0000"
								size="large"
								className={clsx(
									'mt-2 shadow',
									error && data.passportNumber === '' && 'border-rose-500'
								)}
								onChange={e => dispatch(passportNumber(e.target.value))}
								value={data.passportNumber}
							/>
						</div>
					</div>
					<div className="mt-4 w-full">
						<p>{t('issuedWhom')}</p>
						<Input
							placeholder={t('location')}
							size="large"
							className={clsx(
								'mt-2 shadow',
								error && data.issuedBy === '' && 'border-rose-500'
							)}
							onChange={e => dispatch(issuedBy(e.target.value))}
							value={data.issuedBy}
						/>
					</div>
					<div className="text-black text-[14px] mt-4 font-bold">
						{t('additionalDocuments')}
					</div>
					<div className="text-black text-[14px] font-normal mt-4">
						{t('snils')}
					</div>
					<Input
						placeholder="0000"
						size="large"
						className={clsx(
							'mt-2 shadow',
							error && data.snils === '' && 'border-rose-500'
						)}
						onChange={e => dispatch(snils(e.target.value))}
						value={data.snils}
					/>
					<div className="text-black text-[14px] font-normal mt-4">
						{t('inn')}
					</div>
					<Input
						placeholder="0000"
						size="large"
						className={clsx(
							'mt-2 shadow',
							error && data.inn === '' && 'border-rose-500'
						)}
						onChange={e => dispatch(inn(e.target.value))}
						value={data.inn}
					/>
					<div className="text-black text-[20px] font-bold mt-7">
						{t('adress')}
					</div>
					<div className="text-black text-[14px] font-normal mt-7">
						{t('RegAdress')}
					</div>
					<Input
						placeholder={t('AdressLocation')}
						size="large"
						className={clsx(
							'mt-2 shadow',
							error && data.registrationAddress === '' && 'border-rose-500'
						)}
						onChange={e => dispatch(registrationAddress(e.target.value))}
						value={data.registrationAddress}
					/>
					<div className="text-black text-[14px] mt-4 font-normal">
						{t('ResidenseAdress')}
					</div>
					<Input
						placeholder={t('AdressLocation')}
						size="large"
						className={clsx(
							'mt-2 shadow',
							error && data.residenceAddress === '' && 'border-rose-500'
						)}
						onChange={e => dispatch(residenceAddress(e.target.value))}
						value={data.residenceAddress}
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
