import { Button, ConfigProvider, DatePicker, Input, Select } from 'antd'
import enPicker from 'antd/locale/en_US'
import ruPicker from 'antd/locale/ru_RU'
import dayjs from 'dayjs'
import 'dayjs/locale/en'
import 'dayjs/locale/ru'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { useAppSelector } from '../../store'
import {
	useGetAllDocumentsQuery,
	useGetMyDocumentsQuery,
	usePostDocumentMutation
} from '../../store/api/formApi'
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
} from '../../store/reducers/FormReducers/DocumentReducer'
import { blue307 } from '../../utils/color'

import { ImagesLayout } from './ImagesLayout'

export const DocumentForm = () => {
	const { t, i18n } = useTranslation()
	dayjs.locale(i18n.language)
	const dispatch = useDispatch()
	const userRole = useAppSelector(state => state.auth.user?.roles[0].type)
	const { data: documents } = useGetAllDocumentsQuery()
	const { data: getDocument } = useGetMyDocumentsQuery()

	if (getDocument !== undefined) dispatch(allData(getDocument))
	const documentData = useAppSelector(state => state.Document)
	const [postDocument] = usePostDocumentMutation()

	const navigate = useNavigate()

	const handleCancel = () => {
		navigate('/form')
	}
	const handleOk = () => {
		postDocument(documentData)
		if (userRole && userRole === 'SCHOOL') navigate('/parent')
		else navigate('/education')
	}
	const handleSkip = () => {
		navigate('/user')
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
									? documents.map(el => ({
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
										maxLength={7}
										onChange={e =>
											dispatch(divisionCode(e.currentTarget.value))
										}
									/>
								</div>
							</div>
							<div>
								<p>{t('whenIssued')}</p>
								<div className="mt-2">
									<ConfigProvider
										locale={i18n.language === 'ru' ? ruPicker : enPicker}
									>
										<DatePicker
											className="w-full"
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
								</div>
							</div>
							<div>
								<p>{t('series')}</p>
								<div className="mt-2">
									<Input
										placeholder="0000"
										size="large"
										maxLength={4}
										onChange={e => dispatch(passportSeries(e.target.value))}
										value={
											documentData.passportSeries !== ''
												? documentData.passportSeries
												: ''
										}
									/>
								</div>
							</div>
							<div>
								<p>{t('number')}</p>
								<div className="mt-2">
									<Input
										placeholder="0000"
										size="large"
										maxLength={4}
										onChange={e => dispatch(passportNumber(e.target.value))}
										value={
											documentData.passportNumber !== ''
												? documentData.passportNumber
												: ''
										}
									/>
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
									onChange={e => dispatch(issuedBy(e.target.value))}
									value={
										documentData.issuedBy !== '' ? documentData.issuedBy : ''
									}
								/>
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
									maxLength={14}
									onChange={e => dispatch(snils(e.target.value))}
									value={documentData.snils}
								/>
							</div>
							<p className="mt-4">{t('inn')}</p>
							<div className="mt-2">
								<Input
									size="large"
									placeholder="000000000000"
									maxLength={12}
									onChange={e => dispatch(inn(e.target.value))}
									value={documentData.inn}
								/>
							</div>
						</div>
					</div>
					<div className="w-full flex justify-center items-center gap-8 mt-[60px]">
						<Button
							onClick={handleCancel}
							type="default"
							className={`w-[200px] h-[50px] font-bold rounded-full border-[${blue307}] text-[${blue307}]`}
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
