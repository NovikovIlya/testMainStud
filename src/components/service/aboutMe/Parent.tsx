import { QuestionOutlined, UploadOutlined } from '@ant-design/icons'
import {
	Button,
	ConfigProvider,
	DatePicker,
	Input,
	Select,
	Space,
	Tooltip,
	Typography,
	Upload,
	message
} from 'antd'
import type { UploadProps } from 'antd'
import ruPicker from 'antd/locale/ru_RU'
import clsx from 'clsx'
import dayjs from 'dayjs'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'

import { IParentError, IParentState } from '../../../api/types'
import { useAppSelector } from '../../../store'
import {
	useGetDocumentsQuery,
	useGetParentsQuery
} from '../../../store/api/formApi'
import {
	deleteParentItemRequest,
	postParentItemRequest,
	putParentItemRequest
} from '../../../store/creators/MainCreators'
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

const props: UploadProps = {
	name: 'file',
	action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
	headers: {
		authorization: 'authorization-text'
	},
	onChange(info) {
		if (info.file.status !== 'uploading') {
			console.log(info.file, info.fileList)
		}
		if (info.file.status === 'done') {
			message.success(`${info.file.name} file uploaded successfully`)
		} else if (info.file.status === 'error') {
			message.error(`${info.file.name} file upload failed.`)
		}
	}
}

export const Parent = () => {
	const { t, i18n } = useTranslation()
	const dispatch = useDispatch()
	dayjs.locale(i18n.language)
	const { data: parent } = useGetParentsQuery()
	const [IsError] = useState<IParentError | null>(null)
	const role = useAppSelector(state => state.auth.user?.roles)
	const { data: documents } = useGetDocumentsQuery(i18n.language)
	if (parent !== undefined) dispatch(allData(parent))
	const parentData = useAppSelector(state => state.Parent)

	const convertToString = (field: any): string => {
		if (typeof field === 'string') {
			return field
		} else {
			return ''
		}
	}

	const handleAddParent = async () =>
		await postParentItemRequest({
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

	const handleDeleteParent = async (id: number) =>
		await deleteParentItemRequest(id.toString())

	const handleUpdateParent = async (item: IParentState) => {
		const fioSpliter = !item.FIO ? null : item.FIO.split(' ')
		if (fioSpliter !== null && fioSpliter.length !== 3) fioSpliter.push('')
		await putParentItemRequest(item.id.toString(), {
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
	}
	if (!role) return <></>
	const isStudent = role[0].type === 'STUD'

	return (
		<div className="m-14 radio">
			<Space direction="vertical" size={20}>
				<Space direction="vertical" size={'small'} className="min-w-[624px]">
					<Typography.Title
						level={3}
						ellipsis
						className="font-bold text-black text-sm"
					>
						{t('infoParents')}
					</Typography.Title>
					{parentData.map((item, index) => (
						<Space direction="vertical" key={item.id} className="min-w-[624px]">
							<Space direction="vertical" size={'small'} className="w-full">
								<Space>
									<Typography.Text className="font-bold text-black text-lg">
										{t('Parent')}
									</Typography.Text>
									<Typography.Text
										className={clsx(
											' text-black cursor-pointer',
											isStudent && 'hidden'
										)}
										onClick={() => handleUpdateParent(item)}
									>
										{t('Save')}
									</Typography.Text>
									<Typography.Text
										className={clsx(
											' text-black cursor-pointer',
											index === 0 && 'hidden'
										)}
										onClick={() => handleDeleteParent(item.id)}
									>
										{t('Delete')}
									</Typography.Text>
								</Space>
								<Space direction="vertical" className="w-full">
									<Typography.Text className=" text-black">
										{isStudent ? t('Mother') : t('parentFIO')}
									</Typography.Text>
									<Input
										disabled={isStudent}
										placeholder={t('bpk')}
										size="large"
										maxLength={250}
										className={clsx(
											'',
											IsError &&
												IsError.id === item.id &&
												IsError.FIO &&
												'border-rose-500'
										)}
										onChange={e => {
											dispatch(FIO({ id: item.id, FIO: e.target.value }))
										}}
										value={
											isStudent
												? parentData[0].mother
												: convertToString(
														parentData.filter(el => el.id === item.id)[0].FIO
												  )
										}
									/>
									{IsError && IsError.id === item.id && IsError.FIO && (
										<span className="text-red-500 text-sm">
											{t('EmptyFolder')}
										</span>
									)}
								</Space>
								<Space
									direction="vertical"
									className={clsx('w-full', isStudent && 'hidden')}
								>
									<Typography.Text className=" text-black">
										{t('parentPhone')}
									</Typography.Text>
									<Input
										placeholder="+7 999 898-88-00"
										size="large"
										className={clsx(
											'',
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

								<Space direction="vertical" className="w-full">
									<Typography.Text className="text-black">
										{isStudent ? t('Dad') : t('parentEmail')}
									</Typography.Text>
									<Input
										disabled={isStudent}
										placeholder="BezuPr@gmail.com"
										size="large"
										className={clsx(
											'',
											IsError &&
												IsError.id === item.id &&
												IsError.eMail &&
												'border-rose-500'
										)}
										onChange={e =>
											dispatch(eMail({ id: item.id, email: e.target.value }))
										}
										value={
											isStudent
												? parentData[0].father
												: convertToString(
														parentData.filter(el => el.id === item.id)[0].eMail
												  )
										}
									/>
									{IsError && IsError.id === item.id && IsError.eMail && (
										<span className="text-red-500 text-sm">
											{t('BadEmail')}
										</span>
									)}
								</Space>
							</Space>
							<Space
								direction="vertical"
								size="small"
								className={clsx('w-full mt-8', isStudent && 'hidden')}
							>
								<Space direction="vertical" className="w-full">
									<Typography.Text className="font-bold text-black text-lg">
										{t('parentDocument')}
									</Typography.Text>
									<Typography.Text className="font-bold text-black">
										{t('documentType')}
									</Typography.Text>
									<Select
										className="w-full  rounded-lg"
										placeholder={t('documentType')}
										size="large"
										options={
											documents !== null || documents !== undefined
												? //@ts-ignore
												  documents.map(el => ({
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
								<Space direction="vertical" className="w-full">
									<Typography.Text className="font-bold text-black">
										{t('documentInfo')}
									</Typography.Text>
									<div className="grid grid-cols-2 w-full gap-4">
										<Space direction="vertical" className="w-full">
											<Typography.Text className=" text-black">
												{t('divisionCode')}
											</Typography.Text>
											<Input
												placeholder="000-000"
												maxLength={7}
												size="large"
												className={clsx(
													'',
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
										<Space direction="vertical" className="w-full">
											<Typography.Text className=" text-black">
												{t('whenIssued')}
											</Typography.Text>
											<ConfigProvider locale={ruPicker}>
												<DatePicker
													className={clsx(
														' w-full',
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
										<Space direction="vertical" className="w-full">
											<Typography.Text className=" text-black">
												{t('series')}
											</Typography.Text>
											<Input
												placeholder="0000"
												size="large"
												className={clsx(
													'',
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
										<Space direction="vertical" className="w-full">
											<Typography.Text className=" text-black">
												{t('number')}
											</Typography.Text>
											<Input
												placeholder="0000"
												size="large"
												maxLength={4}
												className={clsx(
													'',
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
								<Space direction="vertical" className="w-full">
									<Typography.Text className=" text-black">
										{t('issuedWhom')}
									</Typography.Text>
									<Input
										placeholder={t('location')}
										maxLength={200}
										size="large"
										className={clsx(
											'',
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
							<Space
								direction="vertical"
								className={clsx('w-full mt-8', isStudent && 'hidden')}
							>
								<Space direction="vertical" className="w-full">
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
											'',
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
								<Space direction="vertical" className="w-full">
									<Typography.Text className=" text-black">
										{t('inn')}
									</Typography.Text>
									<Input
										placeholder="000000000000"
										maxLength={12}
										size="large"
										className={clsx(
											'mt-2 ',
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
								<Space direction="vertical" className="w-full mt-8">
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
											'',
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
								<Space direction="vertical" className="w-full">
									<Typography.Text className=" text-black">
										{t('ResidenseAdress')}
									</Typography.Text>
									<Input
										placeholder={t('AdressLocation')}
										size="large"
										maxLength={400}
										className={clsx(
											'',
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
								<Space size={'small'} className="mt-8">
									<Typography.Text className="text-black opacity-80 text-sm font-normal leading-none">
										{t('AttachDocuments')}
									</Typography.Text>
									<Tooltip title={t('AttachDocsDescription')}>
										<Button
											type="default"
											className="bg-transparent"
											icon={<QuestionOutlined className="text-xs" />}
										/>
									</Tooltip>
								</Space>

								<Upload {...props}>
									<Button icon={<UploadOutlined />}>{t('AddFile')}</Button>
								</Upload>
							</Space>
						</Space>
					))}
				</Space>

				<Space
					direction="vertical"
					size={'small'}
					className={clsx('w-full flex items-center', isStudent && 'hidden')}
				>
					<Button
						className="rounded-full text-center p-0 w-8 h-8 text-xl"
						type="primary"
						onClick={handleAddParent}
					>
						+
					</Button>
					<Typography.Text className="opacity-40 text-center text-black text-sm font-normal leading-[18px]">
						{t('AddParent')}
					</Typography.Text>
				</Space>
			</Space>
		</div>
	)
}
