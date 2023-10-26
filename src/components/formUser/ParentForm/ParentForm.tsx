import {
	Button,
	ConfigProvider,
	DatePicker,
	Input,
	Select,
	Space,
	Typography
} from 'antd'
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

import { IParent, IParentError, IParentState } from '../../../api/types'
import { RootState, useAppSelector } from '../../../store'
import { useGetMyDocumentsQuery } from '../../../store/api/formApi'
import {
	deleteParentItemRequest,
	getParentItemRequest,
	postParentItemRequest,
	putParentItemRequest
} from '../../../store/creators/MainCreators'
import { addDocuments } from '../../../store/reducers/FormReducers/CountriesEducationReducer'
import {
	FIO,
	allData,
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
import { ImagesLayout } from '../ImagesLayout'

export const ParentForm = () => {
	const { t, i18n } = useTranslation()
	const dispatch = useDispatch()
	const navigate = useNavigate()
	dayjs.locale(i18n.language)
	const [IsError, setError] = useState<IParentError | null>(null)
	const [SkipCountriesQuery, changeQuerySkip] = useState<boolean>(true)
	const [updateItems, setUpdate] = useState<boolean>(true)
	const parentData = useAppSelector(state => state.Parent)
	const documentStorage = useAppSelector(
		(state: RootState) => state.CountriesEducation.documents
	)

	const { data: documents } = useGetMyDocumentsQuery(i18n.language, {
		skip: SkipCountriesQuery
	})

	useEffect(() => {
		if (updateItems) {
			getData()
			setUpdate(false)
		}
	}, [updateItems])

	useEffect(() => {
		if (!documentStorage) {
			changeQuerySkip(false)
		}
	}, [documentStorage])

	useEffect(() => {
		if (documents) {
			//	dispatch(addDocuments(documents))
			changeQuerySkip(true)
		}
	}, [documents])

	const convertToString = (field: any): string => {
		if (typeof field === 'string') {
			return field
		} else {
			return ''
		}
	}

	const handleCancel = () => {
		navigate('/form')
	}
	const handleOk = async () => {
		if (parentData.length > 0 && IsError) navigate('/user')
	}
	const handleSkip = () => {
		navigate('/user')
	}

	const checkParentItem = (item: IParentState) => {
		var errorPattern = {
			id: item.id,
			FIO: false,
			dateIssue: false,
			divisionCode: false,
			eMail: false,
			issuedBy: false,
			phone: false,
			passportSeries: false,
			passportNumber: false,
			registrationAddress: false,
			residenceAddress: false,
			inn: false,
			snils: false
		}
		var hasError = false
		if (
			!item.FIO ||
			(item.FIO && !/^([\p{L}]+)\s([\p{L}]+)\s?([\p{L}]*)$/u.test(item.FIO))
		) {
			hasError = true
			errorPattern.FIO = true
		}
		if (!item.dateIssue) {
			hasError = true
			errorPattern.dateIssue = true
		}
		if (
			!item.divisionCode ||
			(item.divisionCode && !/^[0-9]{3}\-[0-9]{3}$/.test(item.divisionCode))
		) {
			hasError = true
			errorPattern.divisionCode = true
		}
		if (
			!item.eMail ||
			(item.eMail &&
				!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(item.eMail))
		) {
			hasError = true
			errorPattern.eMail = true
		}
		if (!item.inn || (item.inn && !/^[0-9]{12}$/.test(item.inn))) {
			hasError = true
			errorPattern.inn = true
		}
		if (
			!item.issuedBy ||
			(item.issuedBy &&
				(/\s\s/.test(item.issuedBy) || !/^[\p{L}\s]+$/u.test(item.issuedBy)))
		) {
			hasError = true
			errorPattern.issuedBy = true
		}
		if (
			!item.passportNumber ||
			(item.passportNumber && !/^[0-9]{4}$/.test(item.passportNumber))
		) {
			hasError = true
			errorPattern.passportNumber = true
		}
		if (
			!item.passportSeries ||
			(item.passportSeries && !/^[0-9]{4}$/.test(item.passportSeries))
		) {
			hasError = true
			errorPattern.passportSeries = true
		}
		if (
			!item.phone ||
			(item.phone &&
				!/^\+[0-9]\s[0-9]{3}\s[0-9]{3}\-[0-9]{2}\-[0-9]{2}$/.test(item.phone))
		) {
			hasError = true
			errorPattern.phone = true
		}
		if (
			!item.snils ||
			(item.snils &&
				!/^[0-9]{3}\-[0-9]{3}\-[0-9]{3} [0-9]{2}$/.test(item.snils))
		) {
			hasError = true
			errorPattern.snils = true
		}
		if (
			!item.registrationAddress ||
			(item.registrationAddress &&
				(/\s\s/.test(item.registrationAddress) ||
					!/^[\p{L}\s.,-:0-9]+$/u.test(item.registrationAddress)))
		) {
			hasError = true
			errorPattern.registrationAddress = true
		}
		if (
			!item.residenceAddress ||
			(item.residenceAddress &&
				(/\s\s/.test(item.residenceAddress) ||
					!/^[\p{L}\s.,-:0-9]+$/u.test(item.residenceAddress)))
		) {
			hasError = true
			errorPattern.residenceAddress = true
		}
		hasError && setError(errorPattern)
		IsError && !hasError && setError(null)
		return hasError
	}

	const getData = async () => {
		const response = await getParentItemRequest()
		if (response) {
			const corrected: IParentState[] = response.map(el => ({
				id: el.id,
				FIO:
					(!el.name ? '' : el.name) +
					' ' +
					(!el.surName ? '' : el.surName) +
					(!el.patronymic ? '' : ' ' + el.patronymic),
				dateIssue: el.dateIssue,
				divisionCode: el.divisionCode,
				eMail: el.eMail,
				issuedBy: el.issuedBy,
				documentTypeId: el.documentTypeId,
				phone: el.phone,
				passportSeries: el.passportSeries,
				passportNumber: el.passportNumber,
				registrationAddress: el.registrationAddress,
				residenceAddress: el.residenceAddress,
				inn: el.inn,
				snils: el.snils
			}))
			dispatch(allData(corrected))
		} else console.log('403')
	}

	const handleAddParent = async () => {
		const response = await postParentItemRequest({
			name: null,
			surName: null,
			patronymic: null,
			dateIssue: null,
			divisionCode: null,
			eMail: null,
			issuedBy: null,
			documentTypeId: 1,
			phone: null,
			passportSeries: null,
			passportNumber: null,
			registrationAddress: null,
			residenceAddress: null,
			inn: null,
			snils: null
		})
		if (response === 200) setUpdate(true)
		else console.log('403')
	}

	const handleDeleteParent = async (id: number) => {
		const response = await deleteParentItemRequest(id.toString())
		if (response === 200) setUpdate(true)
		else console.log('403')
	}

	const handleUpdateParent = async (item: IParentState) => {
		if (!checkParentItem(item)) {
			const fioSpliter = !item.FIO ? null : item.FIO.split(' ')
			if (fioSpliter !== null && fioSpliter.length !== 3) fioSpliter.push('')
			const response = await putParentItemRequest(item.id.toString(), {
				name: !fioSpliter ? null : fioSpliter[0],
				surName: !fioSpliter ? null : fioSpliter[1],
				patronymic: !fioSpliter ? null : fioSpliter[2],
				dateIssue: item.dateIssue,
				divisionCode: item.divisionCode,
				eMail: item.eMail,
				issuedBy: item.issuedBy,
				documentTypeId: item.documentTypeId,
				phone: item.phone,
				passportSeries: item.passportSeries,
				passportNumber: item.passportNumber,
				registrationAddress: item.registrationAddress,
				residenceAddress: item.residenceAddress,
				inn: item.inn,
				snils: item.snils
			})
			if (response === 200) setUpdate(true)
			else console.log('403')
		}
	}

	return (
		<ImagesLayout>
			<div className="radio w-[624px] m-auto">
				<Space direction="vertical" size={'small'}>
					<Typography.Title ellipsis className="font-bold text-black text-sm">
						{t('infoParents')}
					</Typography.Title>
					{parentData.map(item => (
						<div key={item.id}>
							<Space direction="vertical" size={'small'} className="w-full">
								<Space>
									<Typography.Text className="font-bold text-black text-lg">
										{t('Parent')}
									</Typography.Text>
									<Typography.Text
										className=" text-black cursor-pointer"
										onClick={() => handleUpdateParent(item)}
									>
										{t('Save')}
									</Typography.Text>
									<Typography.Text
										className=" text-black cursor-pointer"
										onClick={() => handleDeleteParent(item.id)}
									>
										{t('Delete')}
									</Typography.Text>
								</Space>
								<Space direction="vertical" size={2} className="w-full">
									<Typography.Text className=" text-black">
										{t('parentFIO')}
									</Typography.Text>
									<Input
										placeholder="Безухов Пьер Кириллович"
										size="large"
										maxLength={250}
										className={clsx(
											'shadow',
											IsError &&
												IsError.id === item.id &&
												IsError.FIO &&
												'border-rose-500'
										)}
										onChange={e => {
											dispatch(FIO({ id: item.id, FIO: e.target.value }))
										}}
										value={convertToString(
											parentData.filter(el => el.id === item.id)[0].FIO
										)}
									/>
									{IsError && IsError.id === item.id && IsError.FIO && (
										<span className="text-red-500 text-sm">
											{t('EmptyFolder')}
										</span>
									)}
								</Space>
								<Space direction="vertical" size={2} className="w-full">
									<Typography.Text className=" text-black">
										{t('parentPhone')}
									</Typography.Text>
									<Input
										placeholder="+7 999 898-88-00"
										size="large"
										className={clsx(
											'shadow',
											IsError &&
												IsError.id === item.id &&
												IsError.phone &&
												'border-rose-500'
										)}
										onChange={e =>
											dispatch(phone({ id: item.id, phone: e.target.value }))
										}
										value={convertToString(
											parentData.filter(el => el.id === item.id)[0].phone
										)}
										maxLength={16}
									/>
									{IsError && IsError.id === item.id && IsError.phone && (
										<span className="text-red-500 text-sm">
											{t('BadPhone')}
										</span>
									)}
								</Space>

								<Space direction="vertical" size={2} className="w-full">
									<Typography.Text className="text-black">
										{t('parentEmail')}
									</Typography.Text>
									<Input
										placeholder="BezuPr@gmail.com"
										size="large"
										className={clsx(
											'shadow',
											IsError &&
												IsError.id === item.id &&
												IsError.eMail &&
												'border-rose-500'
										)}
										onChange={e =>
											dispatch(eMail({ id: item.id, email: e.target.value }))
										}
										value={convertToString(
											parentData.filter(el => el.id === item.id)[0].eMail
										)}
									/>
									{IsError && IsError.id === item.id && IsError.eMail && (
										<span className="text-red-500 text-sm">
											{t('BadEmail')}
										</span>
									)}
								</Space>
							</Space>
							<Space direction="vertical" size="small" className="w-full mt-8">
								<Space direction="vertical" size={2} className="w-full">
									<Typography.Text className="font-bold text-black text-lg">
										{t('parentDocument')}
									</Typography.Text>
									<Typography.Text className="font-bold text-black">
										{t('documentType')}
									</Typography.Text>
									<Select
										className="w-full shadow rounded-lg"
										placeholder={t('documentType')}
										size="large"
										options={
											documentStorage !== null
												? documentStorage.map(el => ({
														value: el.id,
														label: el.type
												  }))
												: []
										}
										onChange={e =>
											dispatch(
												documentTypeId({ id: item.id, documentTypeId: e })
											)
										}
										value={
											parentData.filter(el => el.id === item.id)[0]
												.documentTypeId
										}
									/>
								</Space>
								<Space direction="vertical" size={2} className="w-full">
									<Typography.Text className="font-bold text-black">
										{t('documentInfo')}
									</Typography.Text>
									<div className="grid grid-cols-2 w-full gap-4">
										<Space direction="vertical" size={2} className="w-full">
											<Typography.Text className=" text-black">
												{t('divisionCode')}
											</Typography.Text>
											<Input
												placeholder="000-000"
												maxLength={7}
												size="large"
												className={clsx(
													'shadow',
													IsError &&
														IsError.id === item.id &&
														IsError.divisionCode &&
														'border-rose-500'
												)}
												onChange={e =>
													dispatch(
														divisionCode({
															id: item.id,
															divisionCode: e.target.value
														})
													)
												}
												value={convertToString(
													parentData.filter(el => el.id === item.id)[0]
														.divisionCode
												)}
											/>
											{IsError &&
												IsError.id === item.id &&
												IsError.divisionCode && (
													<span className="text-red-500 text-sm">
														{t('BadDivisionCode')}
													</span>
												)}
										</Space>
										<Space direction="vertical" size={2} className="w-full">
											<Typography.Text className=" text-black">
												{t('whenIssued')}
											</Typography.Text>
											<ConfigProvider
												locale={i18n.language === 'ru' ? ruPicker : enPicker}
											>
												<DatePicker
													className={clsx(
														'shadow w-full',
														IsError &&
															IsError.id === item.id &&
															IsError.dateIssue &&
															'border-rose-500'
													)}
													onChange={e =>
														dispatch(
															dateIssue({
																id: item.id,
																dateIssue:
																	e == null ? '' : e?.format('YYYY-MM-DD')
															})
														)
													}
													size="large"
													placeholder={t('date')}
													format={'DD.MM.YYYY'}
													value={
														convertToString(
															parentData.filter(el => el.id === item.id)[0]
																.dateIssue
														)
															? dayjs(
																	convertToString(
																		parentData.filter(
																			el => el.id === item.id
																		)[0].dateIssue
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
											{IsError &&
												IsError.id === item.id &&
												IsError.dateIssue && (
													<span className="text-red-500 text-sm">
														{t('DateError')}
													</span>
												)}
										</Space>
										<Space direction="vertical" size={2} className="w-full">
											<Typography.Text className=" text-black">
												{t('series')}
											</Typography.Text>
											<Input
												placeholder="0000"
												size="large"
												className={clsx(
													'shadow',
													IsError &&
														IsError.id === item.id &&
														IsError.passportSeries &&
														'border-rose-500'
												)}
												onChange={e =>
													dispatch(
														passportSeries({
															id: item.id,
															passportSeries: e.target.value
														})
													)
												}
												value={convertToString(
													parentData.filter(el => el.id === item.id)[0]
														.passportSeries
												)}
												maxLength={4}
											/>
											{IsError &&
												IsError.id === item.id &&
												IsError.passportSeries && (
													<span className="text-red-500 text-sm">
														{t('BadPassport')}
													</span>
												)}
										</Space>
										<Space direction="vertical" size={2} className="w-full">
											<Typography.Text className=" text-black">
												{t('number')}
											</Typography.Text>
											<Input
												placeholder="0000"
												size="large"
												maxLength={4}
												className={clsx(
													'shadow',
													IsError &&
														IsError.id === item.id &&
														IsError.passportNumber &&
														'border-rose-500'
												)}
												onChange={e =>
													dispatch(
														passportNumber({
															id: item.id,
															passportNumber: e.target.value
														})
													)
												}
												value={convertToString(
													parentData.filter(el => el.id === item.id)[0]
														.passportNumber
												)}
											/>
											{IsError &&
												IsError.id === item.id &&
												IsError.passportNumber && (
													<span className="text-red-500 text-sm">
														{t('BadPassport')}
													</span>
												)}
										</Space>
									</div>
								</Space>
								<Space direction="vertical" size={2} className="w-full">
									<Typography.Text className=" text-black">
										{t('issuedWhom')}
									</Typography.Text>
									<Input
										placeholder={t('location')}
										maxLength={200}
										size="large"
										className={clsx(
											'shadow',
											IsError &&
												IsError.id === item.id &&
												IsError.issuedBy &&
												'border-rose-500'
										)}
										onChange={e =>
											dispatch(
												issuedBy({ id: item.id, issuedBy: e.target.value })
											)
										}
										value={convertToString(
											parentData.filter(el => el.id === item.id)[0].issuedBy
										)}
									/>
									{IsError && IsError.id === item.id && IsError.issuedBy && (
										<span className="text-red-500 text-sm">
											{t('EmptyFolder')}
										</span>
									)}
								</Space>
							</Space>
							<Space direction="vertical" size={2} className="w-full mt-8">
								<Space direction="vertical" size={2} className="w-full">
									<Typography.Text className="font-bold text-black">
										{t('additionalDocuments')}
									</Typography.Text>
									<Typography.Text className=" text-black">
										{t('snils')}
									</Typography.Text>
									<Input
										placeholder="000-000-000 00"
										size="large"
										className={clsx(
											'shadow',
											IsError &&
												IsError.id === item.id &&
												IsError.snils &&
												'border-rose-500'
										)}
										onChange={e =>
											dispatch(snils({ id: item.id, snils: e.target.value }))
										}
										value={convertToString(
											parentData.filter(el => el.id === item.id)[0].snils
										)}
										maxLength={14}
									/>
									{IsError && IsError.id === item.id && IsError.snils && (
										<span className="text-red-500 text-sm">
											{t('BadSnils')}
										</span>
									)}
								</Space>
								<Space direction="vertical" size={2} className="w-full">
									<Typography.Text className=" text-black">
										{t('inn')}
									</Typography.Text>
									<Input
										placeholder="000000000000"
										maxLength={12}
										size="large"
										className={clsx(
											'mt-2 shadow',
											IsError &&
												IsError.id === item.id &&
												IsError.inn &&
												'border-rose-500'
										)}
										onChange={e =>
											dispatch(inn({ id: item.id, inn: e.target.value }))
										}
										value={convertToString(
											parentData.filter(el => el.id === item.id)[0].inn
										)}
									/>
									{IsError && IsError.id === item.id && IsError.inn && (
										<span className="text-red-500 text-sm">{t('BadInn')}</span>
									)}
								</Space>
								<Space direction="vertical" size={2} className="w-full mt-8">
									<Typography.Text className="font-bold text-black text-lg">
										{t('adress')}
									</Typography.Text>
									<Typography.Text className=" text-black">
										{t('RegAdress')}
									</Typography.Text>
									<Input
										placeholder={t('AdressLocation')}
										size="large"
										maxLength={400}
										className={clsx(
											'shadow',
											IsError &&
												IsError.id === item.id &&
												IsError.registrationAddress &&
												'border-rose-500'
										)}
										onChange={e =>
											dispatch(
												registrationAddress({
													id: item.id,
													registrationAddress: e.target.value
												})
											)
										}
										value={convertToString(
											parentData.filter(el => el.id === item.id)[0]
												.registrationAddress
										)}
									/>
									{IsError &&
										IsError.id === item.id &&
										IsError.registrationAddress && (
											<span className="text-red-500 text-sm">
												{t('EmptyFolder')}
											</span>
										)}
								</Space>
								<Space direction="vertical" size={2} className="w-full">
									<Typography.Text className=" text-black">
										{t('ResidenseAdress')}
									</Typography.Text>
									<Input
										placeholder={t('AdressLocation')}
										size="large"
										maxLength={400}
										className={clsx(
											'shadow',
											IsError &&
												IsError.id === item.id &&
												IsError.residenceAddress &&
												'border-rose-500'
										)}
										onChange={e =>
											dispatch(
												residenceAddress({
													id: item.id,
													residenceAddress: e.target.value
												})
											)
										}
										value={convertToString(
											parentData.filter(el => el.id === item.id)[0]
												.residenceAddress
										)}
									/>
									{IsError &&
										IsError.id === item.id &&
										IsError.residenceAddress && (
											<span className="text-red-500 text-sm">
												{t('EmptyFolder')}
											</span>
										)}
								</Space>
							</Space>
						</div>
					))}
				</Space>
				<Space
					className="flex items-center w-full mt-8"
					direction="vertical"
					size={'small'}
				>
					<Button
						className="rounded-full text-center p-0 w-8 h-8 text-xl m-auto"
						type="primary"
						onClick={handleAddParent}
					>
						+
					</Button>
				</Space>
				<Space
					direction="vertical"
					size={'small'}
					className="w-full flex items-center"
				>
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
				</Space>
			</div>
		</ImagesLayout>
	)
}
