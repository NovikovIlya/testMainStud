import { QuestionOutlined, UploadOutlined } from '@ant-design/icons'
import {
	Button,
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
import clsx from 'clsx'
import dayjs from 'dayjs'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import uuid from 'react-uuid'

import { useAppSelector } from '../../../store'
import { useGetEducationQuery } from '../../../store/api/formApi'
import {
	useGetCountriesQuery,
	useGetEducationLevelQuery
} from '../../../store/api/utilsApi'
import {
	addEducation,
	allData,
	countryId,
	documentNumber,
	documentSeries,
	educationLevelId,
	graduateYear,
	idDelete,
	nameOfInstitute,
	specialization
} from '../../../store/reducers/FormReducers/EducationReducer'

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

export const Education = () => {
	const { t, i18n } = useTranslation()
	const dispatch = useDispatch()
	const [isEdit, setIsEdit] = useState(false)
	const { data: education, isLoading: isLoadingEducation } = useGetEducationQuery()
	const educationData = useAppSelector(state => state.Education)
	if (education !== undefined && education.length) dispatch(allData(education))
	const role = useAppSelector(state => state.auth.user?.roles[0].type)
	const { data: educationLevel, isLoading: isLoadingEducationLevel } =useGetEducationLevelQuery(i18n.language)
	const { data: countries, isLoading: isLoadingCountries } =useGetCountriesQuery(i18n.language)
	const [acceptedData,setAcceptedData] = useLocalStorageState<any>('acceptedData',{defaultValue:null})
    const [typeAcc, _] = useLocalStorageState<any>('typeAcc',{  defaultValue: 'STUD',});

	const handleDeleteEducation = (id: string) => {
		dispatch(idDelete(id))
	}

	const handleAddEducation = () => {
		dispatch(addEducation(uuid()))
	}
	const onSubmit = () => {
		setIsEdit
		(false)
	}
	const isChanged = typeAcc === 'OTHER' ||  (typeAcc === 'ABITUR' && acceptedData[0])
	
	if (isLoadingCountries || isLoadingEducationLevel || isLoadingEducation)return <SkeletonPage />

	return (
		<div className="m-14 radio w-full">
			<Space.Compact
				block
				direction="vertical"
				className="w-full gap-5 max-w-2xl"
			>
				<Typography.Title
					level={3}
					className="text-black text-2xl font-bold leading-normal"
				>
					{t('education')}
				</Typography.Title>
				{educationData.map((item, index) => (
					<Space direction="vertical" key={item.id} className="w-full">
						<Space>
							<Typography.Text ellipsis className="font-bold mr-3">
								{t('educationDocument')}
							</Typography.Text>
							<Typography.Text
								onClick={() => handleDeleteEducation(item.id)}
								className={clsx(
									'cursor-pointer opacity-40 text-center text-black text-sm font-normal leading-[18px] mr-3',
									index === 0 && 'hidden'
								)}
							>
								{t('Delete')}
							</Typography.Text>
						</Space>
						<Space size={'large'} direction="vertical" className="w-full">
							<div className="grid grid-cols-2 gap-10 mt-5 w-full max-lg:grid-cols-1 max-lg:gap-1">
								<Space direction="vertical">
									<Typography.Text>{t('higherEducational')}</Typography.Text>
									{isEdit ? (
										<Select
											size="large"
											className="w-full  rounded-lg"
											defaultValue={item.educationLevelId}
											value={item.educationLevelId}
											options={
												!educationLevel
													? []
													: educationLevel.map(el => ({
															value: el.id,
															label: el.name
													  }))
											}
											onChange={e =>
												dispatch(
													educationLevelId({ id: item.id, educationLevelId: e })
												)
											}
										/>
									) : (
										<div className="bg-white p-2 h-10 rounded-md">
											<Typography.Text>
												{educationLevel?.find(
													lvl => lvl.id === item.educationLevelId
												)?.name || '-'}
											</Typography.Text>
										</div>
									)}
								</Space>
								<Space direction="vertical">
									<Typography.Text>{t('countryEducation')}</Typography.Text>
									{isEdit ? (
										<Select
											size="large"
											className="w-full  rounded-lg"
											onChange={e =>
												dispatch(
													countryId({
														id: item.id,
														countryId: e
													})
												)
											}
											options={
												countries === null || countries === undefined
													? []
													: countries.map(el => ({
															value: el.id,
															label: el.shortName
													  }))
											}
											value={item.countryId}
										/>
									) : (
										<div className="bg-white p-2 h-10 rounded-md">
											<Typography.Text>
												{countries?.find(lvl => lvl.id === item.countryId)
													?.shortName || '-'}
											</Typography.Text>
										</div>
									)}
								</Space>
							</div>

							<Space direction="vertical" size={'small'} className="w-full">
								<Typography.Text>{t('nameEducational')}</Typography.Text>
								{isEdit ? (
									<Input
										maxLength={200}
										size="large"
										value={item.nameOfInstitute}
										onChange={e =>
											dispatch(
												nameOfInstitute({
													id: item.id,
													nameOfInstitute: e.target.value
												})
											)
										}
									/>
								) : (
									<div className="bg-white p-2 h-10 rounded-md">
										<Typography.Text>
											{item.nameOfInstitute || '-'}
										</Typography.Text>
									</div>
								)}
							</Space>
							<div className="grid grid-cols-2 mt-4 gap-x-10 gap-y-4 w-full max-lg:gap-1 max-lg:grid-cols-1">
								<Space direction="vertical" size={'small'}>
									<Typography.Text>{t('diplomaNumber')}</Typography.Text>
									{isEdit ? (
										<Input
											placeholder="1234"
											size="large"
											maxLength={4}
											value={item.documentNumber}
											onChange={e =>
												dispatch(
													documentNumber({
														id: item.id,
														documentNumber: e.target.value
													})
												)
											}
										/>
									) : (
										<div className="bg-white p-2 h-10 rounded-md">
											<Typography.Text>
												{item.documentNumber || '-'}
											</Typography.Text>
										</div>
									)}
								</Space>
								<Space direction="vertical" size={'small'}>
									<Typography.Text>{t('diplomaSeries')}</Typography.Text>
									{isEdit ? (
										<Input
											placeholder="1234"
											size="large"
											maxLength={4}
											value={item.documentSeries}
											onChange={e =>
												dispatch(
													documentSeries({
														id: item.id,
														documentSeries: e.target.value
													})
												)
											}
										/>
									) : (
										<div className="bg-white p-2 h-10 rounded-md">
											<Typography.Text>
												{item.documentSeries || '-'}
											</Typography.Text>
										</div>
									)}
								</Space>
								<Space direction="vertical">
									<Typography.Text>{t('graduateYear')}</Typography.Text>
									{isEdit ? (
										<DatePicker
											className="w-full"
											onChange={e => {
												dispatch(
													graduateYear({
														id: item.id,
														graduateYear:
															e == null ? '' : e.format('YYYY').toString()
													})
												)
											}}
											size="large"
											placeholder={new Date().getFullYear().toString()}
											picker="year"
											value={
												item.graduateYear !== ''
													? dayjs(item.graduateYear, 'YYYY')
													: null
											}
										/>
									) : (
										<div className="bg-white p-2 h-10 rounded-md">
											<Typography.Text>
												{item.graduateYear || '-'}
											</Typography.Text>
										</div>
									)}
								</Space>
								<Space
									direction="vertical"
									className={clsx(isChanged && 'hidden')}
								>
									<Typography.Text>{t('specialization')}</Typography.Text>
									{isEdit ? (
										<Input
											placeholder={t('web')}
											size="large"
											className="w-full"
											value={item.specialization}
											onChange={e =>
												dispatch(
													specialization({
														id: item.id,
														specialization: e.target.value
													})
												)
											}
										/>
									) : (
										<div className="bg-white p-2 h-10 rounded-md">
											<Typography.Text>
												{item.specialization || '-'}
											</Typography.Text>
										</div>
									)}
								</Space>
							</div>
						</Space>
						{isEdit && (
							<Space direction="vertical">
								<Space size={'small'} className="mt-5">
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
						)}
					</Space>
				))}
			</Space.Compact>
			{isEdit && (
				<Space
					direction="vertical"
					size={'large'}
					className={clsx('w-full flex items-center', isChanged && 'hidden')}
				>
					<Button
						className="rounded-full text-center p-0 w-8 h-8 text-xl"
						type="primary"
						onClick={handleAddEducation}
					>
						+
					</Button>
				</Space>
			)}
			<Space
				direction="vertical"
				size={'small'}
				className={clsx('mt-4', !isChanged && 'hidden')}
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
						Сохранить
					</Button>
				)}
			</Space>
		</div>
	)
}
