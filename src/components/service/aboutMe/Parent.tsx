import { UploadOutlined } from '@ant-design/icons'
import {
	Button,
	ConfigProvider,
	DatePicker,
	Form,
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
import uuid from 'react-uuid'

import { useAppSelector } from '../../../store'
import {
	useGetAllDocumentsQuery,
	useGetParentsQuery,
	usePostParentsMutation
} from '../../../store/api/formApi'
import {
	FIO,
	addParent,
	allData,
	dateIssue,
	deleteParent,
	divisionCode,
	documentTypeId,
	eMail,
	inn,
	issuedBy,
	passportNumber,
	passportSeries,
	registrationAddress,
	residenceAddress,
	snils
} from '../../../store/reducers/FormReducers/ParentReducer'

import { SkeletonPage } from './Skeleton'
import { useLocalStorageState } from 'ahooks'

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
	const [form] = Form.useForm()
	dayjs.locale(i18n.language)
	const { data: parent, isLoading: isLoadingParent } = useGetParentsQuery()
	const [isEdit, setIsEdit] = useState(false)
	const role = useAppSelector(state => state.auth.user?.roles[0].type)
	const { data: documents, isLoading: isLoadingDocuments } = useGetAllDocumentsQuery()
	if (parent !== undefined && parent.length) dispatch(allData(parent))
	const parentData = useAppSelector(state => state.Parent)
	const [acceptedData, setAcceptedData] = useLocalStorageState<any>('acceptedData', { defaultValue: null })
	const [typeAcc, _] = useLocalStorageState<any>('typeAcc', { defaultValue: 'STUD' })
	const [postParent ] = usePostParentsMutation()

	const handleDeleteParent = (id: string) => {
		dispatch(deleteParent(id))
	}
	
	const handleAddParent = () => {
		dispatch(addParent(uuid()))
	}

	const onSubmit = (values:any) => {
		console.log('values',values)
		form.validateFields().then(() => {
			setIsEdit(false)
		})
		postParent({
			mother: values.mother,
			father: values.father,
			name: values.name,
			surName: values.surName,
			patronymic: values.patronymic,
			documentTypeId: values.documentTypeId,
			phone: values.phone,
			passportSeries: values.passportSeries,
			passportNumber: values.passportNumber,
			dateIssue: values.dateIssue,
			divisionCode: values.divisionCode,
			issuedBy: values.issuedBy,
			registrationAddress: values.registrationAddress,
			residenceAddress: values.residenceAddress,
			inn: values.inn,
			snils: values.snils,
			eMail: values.eMail,
			updatable:true,
			id:1

		})
	}

	const isStudent = role === 'STUD'
	const isChanged = typeAcc === 'OTHER' || (typeAcc === 'ABITUR' && !acceptedData)

	if (isLoadingDocuments || isLoadingParent) return <SkeletonPage />

	return (
		<div className="m-14 radio w-full">
			<Form form={form} layout="vertical" onFinish={onSubmit} className="w-full">
				<Space.Compact direction="vertical" block className="gap-5 max-w-2xl">
					<Space.Compact direction="vertical" size={'small'} className="gap-5 max-w-2xl">
						<Typography.Title level={3} ellipsis className="font-bold text-black text-sm">
							{t('infoParents')}
						</Typography.Title>
						{parent?.length>0 ? parentData?.map((item: any, index: any) => (
							<Space direction="vertical" key={item.id}>
								<Space direction="vertical" size={'large'} className="w-full">
									<Space>
										<Typography.Text className="font-bold text-black text-lg">
											{t('Parent')}
										</Typography.Text>
										<Typography.Text
											className={clsx('text-black cursor-pointer', index === 0 && 'hidden')}
											onClick={() => handleDeleteParent(item.id)}
										>
											{t('Delete')}
										</Typography.Text>
									</Space>

									<Form.Item
										label={isStudent ? t('Mother') : t('parentFIO')}
										name={['parents', item.id, 'FIO']}
										
									>
										{isEdit ? (
											<Input
												disabled={isStudent}
												placeholder={t('bpk')}
												size="large"
												maxLength={250}
												onChange={e => {
													dispatch(FIO({ id: item.id, FIO: e.target.value }))
												}}
												value={isStudent ? item.mother?.replace(/&#39;/g, "'") : item?.FIO?.replace(/&#39;/g, "'")}
											/>
										) : (
											<div className="bg-white p-4 rounded-md">
												<Typography.Text>
													{isStudent ? item.mother?.replace(/&#39;/g, "").split(',').map((item: any) => <div>{item}</div>) : item?.FIO?.replace(/&#39;/g, "'") || '-'}
												</Typography.Text>
											</div>
										)}
									</Form.Item>

									<Form.Item
										label={isStudent ? t('Dad') : t('parentEmail')}
										name={['parents', item.id, 'email']}
										
									>
										{isEdit ? (
											<Input
												disabled={isStudent}
												placeholder="email@example.com"
												size="large"
												onChange={e => dispatch(eMail({ id: item.id, email: e.target.value }))}
												value={isStudent ? item.father : item.eMail}
											/>
										) : (
											<div className="bg-white p-2 h-10 rounded-md">
												<Typography.Text>
													{isStudent ? item.father : item.eMail || '-'}
												</Typography.Text>
											</div>
										)}
									</Form.Item>
								</Space>

								<Space direction="vertical" size="large" className={clsx('w-full my-5', isStudent && 'hidden')}>
									<Typography.Text className="font-bold text-black text-lg">
										{t('parentDocument')}
									</Typography.Text>

									<Form.Item
										label={t('documentType')}
										name={['parents', item.id, 'documentTypeId']}
										
									>
										{isEdit ? (
											<Select
												className="w-full rounded-lg"
												placeholder={t('documentType')}
												size="large"
												options={documents?.map(el => ({
													value: el.id,
													label: el.type
												})) || []}
												onChange={e => dispatch(documentTypeId({ id: item.id, documentTypeId: e }))}
												value={item.documentTypeId}
											/>
										) : (
											<div className="bg-white p-2 h-10 rounded-md">
												<Typography.Text>
													{documents?.find(el => el.id === item.documentTypeId)?.type || '-'}
												</Typography.Text>
											</div>
										)}
									</Form.Item>

									<Space direction="vertical" className="w-full">
										<Typography.Text className="font-bold text-black">
											{t('documentInfo')}
										</Typography.Text>
										<div className="grid grid-cols-2 w-full gap-5 mt-5">
											<Form.Item
												label={t('divisionCode')}
												name={['parents', item.id, 'divisionCode']}
												
											>
												{isEdit ? (
													<Input
														placeholder="000-000"
														maxLength={7}
														size="large"
														onChange={e => dispatch(divisionCode({ id: item.id, divisionCode: e.target.value }))}
														value={item.divisionCode}
													/>
												) : (
													<div className="bg-white p-2 h-10 rounded-md">
														<Typography.Text>{item.divisionCode || '-'}</Typography.Text>
													</div>
												)}
											</Form.Item>

											<Form.Item
												label={t('whenIssued')}
												name={['parents', item.id, 'dateIssue']}
												
											>
												<ConfigProvider locale={ruPicker}>
													{isEdit ? (
														<DatePicker
															className="w-full"
															onChange={e => dispatch(dateIssue({
																id: item.id,
																dateIssue: e == null ? '' : e.format('YYYY-MM-DD')
															}))}
															size="large"
															placeholder={t('date')}
															format={'DD.MM.YYYY'}
															value={item.dateIssue ? dayjs(item.dateIssue.split('-').reverse().join('.'), 'DD.MM.YYYY') : null}
														/>
													) : (
														<div className="bg-white p-2 h-10 rounded-md">
															<Typography.Text>{item.dateIssue || '-'}</Typography.Text>
														</div>
													)}
												</ConfigProvider>
											</Form.Item>

											<Form.Item
												label={t('series')}
												name={['parents', item.id, 'passportSeries']}
												
											>
												{isEdit ? (
													<Input
														placeholder="0000"
														size="large"
														onChange={e => dispatch(passportSeries({ id: item.id, passportSeries: e.target.value }))}
														value={item.passportSeries}
														maxLength={4}
													/>
												) : (
													<div className="bg-white p-2 h-10 rounded-md">
														<Typography.Text>{item.passportSeries || '-'}</Typography.Text>
													</div>
												)}
											</Form.Item>

											<Form.Item
												label={t('number')}
												name={['parents', item.id, 'passportNumber']}
												
											>
												{isEdit ? (
													<Input
														placeholder="000000"
														size="large"
														maxLength={6}
														onChange={e => dispatch(passportNumber({ id: item.id, passportNumber: e.target.value }))}
														value={item.passportNumber}
													/>
												) : (
													<div className="bg-white p-2 h-10 rounded-md">
														<Typography.Text>{item.passportNumber || '-'}</Typography.Text>
													</div>
												)}
											</Form.Item>
										</div>
									</Space>

									<Form.Item
										label={t('issuedWhom')}
										name={['parents', item.id, 'issuedBy']}
										
									>
										{isEdit ? (
											<Input
												placeholder={t('location')}
												maxLength={200}
												size="large"
												onChange={e => dispatch(issuedBy({ id: item.id, issuedBy: e.target.value }))}
												value={item.issuedBy}
											/>
										) : (
											<div className="bg-white p-2 h-10 rounded-md">
												<Typography.Text>{item.issuedBy || '-'}</Typography.Text>
											</div>
										)}
									</Form.Item>
								</Space>

								<Typography.Text className="font-bold text-black">
									{t('additionalDocuments')}
								</Typography.Text>

								<Space direction="vertical" size={'large'} className={clsx('w-full my-5', isStudent && 'hidden')}>
									<Form.Item
										label={t('snils')}
										name={['parents', item.id, 'snils']}
										
									>
										{isEdit ? (
											<Input
												placeholder="000-000-000 00"
												size="large"
												onChange={e => dispatch(snils({ id: item.id, snils: e.target.value }))}
												value={item.snils}
												maxLength={14}
											/>
										) : (
											<div className="bg-white p-2 h-10 rounded-md">
												<Typography.Text>{item.snils || '-'}</Typography.Text>
											</div>
										)}
									</Form.Item>

									<Form.Item
										label={t('inn')}
										name={['parents', item.id, 'inn']}
										
									>
										{isEdit ? (
											<Input
												placeholder="000000000000"
												maxLength={12}
												size="large"
												className="mt-2"
												onChange={e => dispatch(inn({ id: item.id, inn: e.target.value }))}
												value={item.inn}
											/>
										) : (
											<div className="bg-white p-2 h-10 rounded-md">
												<Typography.Text>{item.inn || '-'}</Typography.Text>
											</div>
										)}
									</Form.Item>
								</Space>

								<Typography.Text className="font-bold text-black text-lg">
									{t('adress')}
								</Typography.Text>

								<Space direction="vertical" className="w-full mt-5" size={'large'}>
									<Form.Item
										label={t('RegAdress')}
										name={['parents', item.id, 'registrationAddress']}
										
									>
										{isEdit ? (
											<Input
												placeholder={t('AdressLocation')}
												size="large"
												maxLength={400}
												onChange={e => dispatch(registrationAddress({ id: item.id, registrationAddress: e.target.value }))}
												value={item.registrationAddress}
											/>
										) : (
											<div className="bg-white p-2 h-10 rounded-md">
												<Typography.Text>{item.registrationAddress || '-'}</Typography.Text>
											</div>
										)}
									</Form.Item>

									<Form.Item
										label={t('ResidenseAdress')}
										name={['parents', item.id, 'residenceAddress']}
										
									>
										{isEdit ? (
											<Input
												placeholder={t('AdressLocation')}
												size="large"
												maxLength={400}
												onChange={e => dispatch(residenceAddress({ id: item.id, residenceAddress: e.target.value }))}
												value={item.residenceAddress}
											/>
										) : (
											<div className="bg-white p-2 h-10 rounded-md">
												<Typography.Text>{item.residenceAddress || '-'}</Typography.Text>
											</div>
										)}
									</Form.Item>
								</Space>

								{isEdit && (
									<>
										<Space size={'small'} className="mt-5" align="center">
											<Typography.Text className="text-black opacity-80 text-sm font-normal leading-none">
												{t('AttachDocuments')}
											</Typography.Text>
											<Tooltip title={t('AttachDocsDescription')}>
												<Button type="default" className="bg-transparent w-6 h-6">
													?
												</Button>
											</Tooltip>
										</Space>

										<Upload {...props}>
											<Button icon={<UploadOutlined />}>{t('AddFile')}</Button>
										</Upload>
									</>
								)}
							</Space>
						))
						: 'Информации нет'
						}
					</Space.Compact>

					{/* <Space direction="vertical" size={'small'} className={clsx('w-full flex items-center', isStudent && 'hidden')}>
						<Button
							className="!rounded-full flex items-center justify-center p-0 w-8 h-8 text-xl"
							type="primary"
							onClick={handleAddParent}
						>
							+
						</Button>
						<Typography.Text className="opacity-40 text-center text-black text-sm font-normal leading-[18px]">
							{t('AddParent')}
						</Typography.Text>
					</Space> */}

					<Space direction="vertical" size={'small'} className={clsx('mt-4', !isChanged && 'hidden')}>
						{!isEdit ? (
							<></>
							// <Button
							// 	className="border-solid border-bluekfu border-[1px] text-bluekfu !rounded-md"
							// 	onClick={() => setIsEdit(true)}
							// >
							// 	{t('edit')}
							// </Button>
						) : 
						(
							<></>
							// <Button
							// 	className="border-solid border-bluekfu border-[1px] text-bluekfu !rounded-md"
							// 	htmlType='submit'
							// >
							// 	Сохранить
							// </Button>
						)
						}
					</Space>
				</Space.Compact>
			</Form>
		</div>
	)
}