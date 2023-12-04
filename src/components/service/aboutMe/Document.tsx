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
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'

import { useAppSelector } from '../../../store'
import {
	useGetAllDocumentsQuery,
	useGetMyDocumentsQuery,
	usePostDocumentMutation
} from '../../../store/api/formApi'
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

import { SkeletonPage } from './Skeleton'

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
export const Document = () => {
	const [t, i18n] = useTranslation()
	dayjs.locale(i18n.language)
	const dispatch = useDispatch()

	const [isEdit, setIsEdit] = useState(false)
	const role = useAppSelector(state => state.auth.user?.roles[0].type)
	const {
		data: documents,
		refetch,
		isLoading: isLoadingDocuments
	} = useGetMyDocumentsQuery()
	const { data: levelDocuments, isLoading: isLoadingLevelDocs } =
		useGetAllDocumentsQuery()
	const [postDocument] = usePostDocumentMutation()

	const documentData = useAppSelector(state => state.Document)

	const onSubmit = () => {
		postDocument(documentData)
		setIsEdit(false)
	}
	useEffect(() => {
		refetch()
		documents && dispatch(allData(documents))
	}, [documents])
	const isStudent = role === 'STUD'
	if (isLoadingDocuments || isLoadingLevelDocs) return <SkeletonPage />
	return (
		<div className="m-14 radio w-full">
			<Space.Compact block direction="vertical" className="gap-5 max-w-2xl">
				<Typography.Title level={3}>{t('documents')}</Typography.Title>

				<Space direction="vertical" size={'small'}>
					<Typography.Text>{t('documentType')}</Typography.Text>
					{!isEdit ? (
						<div className="bg-white p-2 h-10 rounded-md">
							<Typography.Text>
								{levelDocuments?.find(
									el => el.id === documentData.documentTypeId
								)?.type || '-'}
							</Typography.Text>
						</div>
					) : (
						<Select
							onChange={e => {
								dispatch(documentTypeId(e))
							}}
							placeholder={t('rf')}
							size="large"
							className="rounded-lg w-full"
							options={
								!levelDocuments
									? []
									: levelDocuments.map(el => ({ value: el.id, label: el.type }))
							}
							value={documentData.documentTypeId}
						/>
					)}
				</Space>

				<Typography.Text className="text-black text-sm font-bold">
					{t('documentInfo')}
				</Typography.Text>

				<Space.Compact block className="gap-3" size={'large'}>
					<Space direction="vertical" className="w-full">
						<Typography.Text className="whitespace-nowrap">
							{t('divisionCode')}
						</Typography.Text>
						{!isEdit ? (
							<div className="bg-white p-2 h-10 rounded-md">
								<Typography.Text>
									{documentData.divisionCode || '-'}
								</Typography.Text>
							</div>
						) : (
							<Input
								placeholder={isStudent ? '' : '000-000'}
								size="large"
								value={documentData.divisionCode}
								className={clsx(' w-full !rounded-lg ')}
								maxLength={7}
								onChange={e => dispatch(divisionCode(e.currentTarget.value))}
							/>
						)}
					</Space>
					<Space direction="vertical" className="w-full">
						<Typography.Text>{t('whenIssued')}</Typography.Text>
						{!isEdit ? (
							<div className="bg-white p-2 h-10 rounded-md">
								<Typography.Text>
									{documentData.dateIssue || '-'}
								</Typography.Text>
							</div>
						) : (
							<ConfigProvider locale={ruPicker}>
								<DatePicker
									className={clsx(' w-full !rounded-lg ')}
									onChange={e =>
										dispatch(
											dateIssue(e == null ? '' : e?.format('YYYY-MM-DD'))
										)
									}
									size="large"
									placeholder={t('date')}
									format={'DD.MM.YYYY'}
									value={
										documentData.dateIssue
											? dayjs(
													documentData.dateIssue.split('-').reverse().join('.'),
													'DD.MM.YYYY'
											  )
											: null
									}
								/>
							</ConfigProvider>
						)}
					</Space>
				</Space.Compact>

				<Space.Compact size={'large'} className="w-full gap-3">
					<Space direction="vertical" className="w-full">
						<Typography.Text>{t('series')}</Typography.Text>
						{!isEdit ? (
							<div className="bg-white p-2 h-10 rounded-md">
								<Typography.Text>
									{documentData.passportSeries || '-'}
								</Typography.Text>
							</div>
						) : (
							<Input
								placeholder="0000"
								size="large"
								className={clsx('!rounded-lg  ')}
								maxLength={4}
								onChange={e => dispatch(passportSeries(e.target.value))}
								value={
									documentData.passportSeries !== ''
										? documentData.passportSeries
										: ''
								}
							/>
						)}
					</Space>
					<Space direction="vertical" className="w-full">
						<Typography.Text>{t('number')}</Typography.Text>
						{!isEdit ? (
							<div className="bg-white p-2 h-10 rounded-md">
								<Typography.Text>
									{documentData.passportNumber || '-'}
								</Typography.Text>
							</div>
						) : (
							<Input
								placeholder="0000"
								size="large"
								className={clsx('!rounded-lg ')}
								maxLength={4}
								onChange={e => dispatch(passportNumber(e.target.value))}
								value={
									documentData.passportNumber !== ''
										? documentData.passportNumber
										: ''
								}
							/>
						)}
					</Space>
				</Space.Compact>

				<Space direction="vertical" size={'small'} className="w-full ">
					<Typography.Text>{t('issuedWhom')}</Typography.Text>
					{!isEdit ? (
						<div className="bg-white p-2 h-10 rounded-md">
							<Typography.Text>{documentData.issuedBy || '-'}</Typography.Text>
						</div>
					) : (
						<Input
							placeholder={t('location')}
							size="large"
							maxLength={200}
							onChange={e => dispatch(issuedBy(e.target.value))}
							value={documentData.issuedBy !== '' ? documentData.issuedBy : ''}
						/>
					)}
				</Space>

				<Typography.Text className="text-black text-sm font-bold">
					{t('documentInfo')}
				</Typography.Text>

				<Space direction="vertical" size={'small'} className="w-full">
					<Typography.Text>{t('snils')}</Typography.Text>
					{!isEdit ? (
						<div className="bg-white p-2 h-10 rounded-md">
							<Typography.Text>{documentData.snils || '-'}</Typography.Text>
						</div>
					) : (
						<Input
							size="large"
							placeholder="000-000-000 00"
							maxLength={14}
							onChange={e => dispatch(snils(e.target.value))}
							value={documentData.snils}
						/>
					)}
				</Space>
				<Space direction="vertical" size={'small'} className="w-full">
					<Typography.Text>{t('inn')}</Typography.Text>
					{!isEdit ? (
						<div className="bg-white p-2 h-10 rounded-md">
							<Typography.Text>{documentData.inn || '-'} </Typography.Text>
						</div>
					) : (
						<Input
							size="large"
							placeholder="000000000000"
							maxLength={12}
							onChange={e => dispatch(inn(e.target.value))}
							value={documentData.inn}
						/>
					)}
				</Space>
				<Space size={'small'} className={clsx(isStudent && 'hidden')}>
					<Typography.Text className="text-black opacity-80 text-sm font-normal leading-none">
						{t('AttachDocuments')}
					</Typography.Text>
					<Tooltip title={t('AttachDocumentsDescription')}>
						<Button
							type="default"
							className="bg-transparent"
							icon={<QuestionOutlined className="text-xs" />}
						/>
					</Tooltip>
				</Space>

				<Upload {...props} className={clsx(isStudent && 'hidden')}>
					<Button icon={<UploadOutlined />}>{t('AddFile')}</Button>
				</Upload>
				<Space
					direction="vertical"
					size={'small'}
					className={clsx('mt-4', isStudent && 'hidden')}
				>
					{!isEdit ? (
						<Button
							className="border-solid border-bluekfu border-[1px] text-bluekfu !rounded-md"
							onClick={() => setIsEdit(true)}
						>
							{t('edit')}
						</Button>
					) : (
						<Button
							className="border-solid border-bluekfu border-[1px] text-bluekfu !rounded-md"
							onClick={onSubmit}
						>
							{t('save')}
						</Button>
					)}
				</Space>
			</Space.Compact>
		</div>
	)
}
