import { QuestionOutlined, UploadOutlined } from '@ant-design/icons'
import {
	Button,
	DatePicker,
	Form,
	Input,
	Select,
	Space,
	Spin,
	Tooltip,
	Typography,
	Upload,
	message
} from 'antd'
import type { UploadProps } from 'antd'
import clsx from 'clsx'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import uuid from 'react-uuid'

import { useAppSelector } from '../../../store'
import { useGetEducationQuery, usePutEducationMutation } from '../../../store/api/formApi'
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
	const [form] = Form.useForm()
	const { t, i18n } = useTranslation()
	const dispatch = useDispatch()
	const [isEdit, setIsEdit] = useState(false)
	const { data: education, isLoading: isLoadingEducation,isSuccess } = useGetEducationQuery()
	const educationData = useAppSelector(state => state.Education)
	if (education !== undefined && education.length) dispatch(allData(education))
	const role = useAppSelector(state => state.auth.user?.roles[0].type)
	const { data: educationLevel, isLoading: isLoadingEducationLevel } =useGetEducationLevelQuery(i18n.language)
	const { data: countries, isLoading: isLoadingCountries } =useGetCountriesQuery(i18n.language)
	const [acceptedData,setAcceptedData] = useLocalStorageState<any>('acceptedData',{defaultValue:null})
    const [typeAcc, _] = useLocalStorageState<any>('typeAcc',{  defaultValue: 'STUD',});
	const [putEducation] = usePutEducationMutation()
	const [forms,setForm] = useState<any>([])
	const [isBlur,setIsBlur] = useState<any>([])
	console.log('isBlur',isBlur)
	const handleDeleteEducation = (id: string) => {
		dispatch(idDelete(id))
	}
	console.log('forms',forms)
	const handleAddEducation = () => {
		dispatch(addEducation(uuid()))
		setForm(forms.concat({
			id:uuid(),
			studentCountry: '',
			nameOfInstitute: '',
			educationLevelId: '',
			documentNumber: '',
			documentSeries: '',
			graduateYear: '',
			specialization: '',
			countryId: '',
			updatable: true,
		}))
	}

	const onSubmit = async(id:any) => {
		setIsEdit(false)

		const values = await form.validateFields()
		console.log('values',values)
		const data = {
			studentCountry: values[`studentCountry-${id}`],
			nameOfInstitute: values[`nameOfInstitute-${id}`],
			educationLevelId: values[`educationLevelId-${id}`],
			documentNumber: values[`documentNumber-${id}`],
			documentSeries: values[`documentSeries-${id}`],
			graduateYear: dayjs(values[`graduateYear-${id}`]).year(),
			specialization: values[`specialization-${id}`],
			countryId: values[`studentCountry-${id}`],
			updatable: true,
			id: id
		}
		putEducation(data)
	}

	const isChanged = typeAcc === 'OTHER' ||  (typeAcc === 'ABITUR' && !acceptedData[0])

	useEffect(()=>{
		if(isSuccess){
			setForm(education)
		}
	},[education,isSuccess])

	useEffect(() => {
		if (education?.length) {
			education?.forEach(item => {
				form.setFieldsValue({
					[`educationLevelId-${item.id}`]: item.educationLevelId,
					[`studentCountry-${item.id}`]: item.countryId,
					[`nameOfInstitute-${item.id}`]: item.nameOfInstitute,
					[`documentNumber-${item.id}`]: item.documentNumber,
					[`documentSeries-${item.id}`]: item.documentSeries,
					[`graduateYear-${item.id}`]: dayjs(item.graduateYear, 'YYYY'),
					[`specialization-${item.id}`]: item.specialization,
				})
			})
		}
	}, [education, form])

	if (isLoadingCountries || isLoadingEducationLevel || isLoadingEducation) return <SkeletonPage />

	return (
		<Spin spinning={isLoadingEducation} >
		<div className="m-14 radio w-full">
			<Form form={form} layout="vertical">
				<Space.Compact block direction="vertical" className="w-full gap-5 max-w-2xl">
					<Typography.Title level={3} className="text-black text-2xl font-bold leading-normal">
						{t('education')}
					</Typography.Title>
					{forms?.map((item:any, index:any) => (
						<Space direction="vertical" key={item.id} className="w-full">
							<Space>
								<Typography.Text ellipsis className="font-bold mr-3">
									{t('educationDocument')}
								</Typography.Text>
								{/* <Typography.Text
									onClick={() => handleDeleteEducation(item.id)}
									className={clsx(
										'cursor-pointer opacity-40 text-center text-black text-sm font-normal leading-[18px] mr-3',
										index === 0 && 'hidden'
									)}
								>
									{t('Delete')}
								</Typography.Text> */}
							</Space>
							<Space size={'large'} direction="vertical" className="w-full">
								<div className="grid grid-cols-2 gap-10 mt-5 w-full max-lg:grid-cols-1 max-lg:gap-1">
									<Form.Item
										label={t('higherEducational')}
										name={`educationLevelId-${item?.id}`}
									>
										{isEdit && isBlur?.includes(item?.id)? (
											<Select
												size="large"
												className="w-full rounded-lg"
												options={educationLevel?.map(el => ({
													value: el.id,
													label: el.name
												})) || []}
												onChange={e => dispatch(educationLevelId({ id: item.id, educationLevelId: e }))}
											/>
										) : (
											<div className="bg-white p-2 h-10 rounded-md">
												<Typography.Text>
													{educationLevel?.find(lvl => lvl.id === item.educationLevelId)?.name || '-'}
												</Typography.Text>
											</div>
										)}
									</Form.Item>

									<Form.Item
										label={t('countryEducation')}
										name={`studentCountry-${item.id}`}
									>
										{isEdit && isBlur?.includes(item?.id)? (
											<Select
												size="large"
												className="w-full rounded-lg"
												options={countries?.map(el => ({
													value: el.id,
													label: el.shortName
												})) || []}
												onChange={e => dispatch(countryId({ id: item.id, countryId: e }))}
											/>
										) : (
											<div className="bg-white p-2 h-10 rounded-md">
												<Typography.Text>
													{countries?.find(lvl => lvl.id === item.countryId)?.shortName || '-'}
												</Typography.Text>
											</div>
										)}
									</Form.Item>
								</div>

								<Form.Item
									label={t('nameEducational')}
									name={`nameOfInstitute-${item.id}`}
								>
									{isEdit && isBlur?.includes(item?.id)? (
										<Input
											maxLength={200}
											size="large"
											onChange={e => dispatch(nameOfInstitute({
												id: item.id,
												nameOfInstitute: e.target.value
											}))}
										/>
									) : (
										<div className="bg-white p-2 h-10 rounded-md">
											<Typography.Text>{item.nameOfInstitute || '-'}</Typography.Text>
										</div>
									)}
								</Form.Item>

								<div className="grid grid-cols-2 mt-4 gap-x-10 gap-y-4 w-full max-lg:gap-1 max-lg:grid-cols-1">
									<Form.Item
										label={t('diplomaNumber')}
										name={`documentNumber-${item.id}`}
									>
										{isEdit &&isBlur?.includes(item?.id)? (
											<Input
												placeholder="1234"
												size="large"
												maxLength={4}
												onChange={e => dispatch(documentNumber({
													id: item.id,
													documentNumber: e.target.value
												}))}
											/>
										) : (
											<div className="bg-white p-2 h-10 rounded-md">
												<Typography.Text>{item.documentNumber || '-'}</Typography.Text>
											</div>
										)}
									</Form.Item>

									<Form.Item
										label={t('diplomaSeries')}
										name={`documentSeries-${item.id}`}
									>
										{isEdit &&isBlur?.includes(item.id)? (
											<Input
												placeholder="1234"
												size="large"
												maxLength={4}
												onChange={e => dispatch(documentSeries({
													id: item.id,
													documentSeries: e.target.value
												}))}
											/>
										) : (
											<div className="bg-white p-2 h-10 rounded-md">
												<Typography.Text>{item.documentSeries || '-'}</Typography.Text>
											</div>
										)}
									</Form.Item>

									<Form.Item
										label={t('graduateYear')}
										name={`graduateYear-${item.id}`}
									>
										{isEdit &&isBlur?.includes(item.id)? (
											<DatePicker
												className="w-full"
												size="large"
												placeholder={new Date().getFullYear().toString()}
												picker="year"
												onChange={e => dispatch(graduateYear({
													id: item.id,
													graduateYear: e ? e.format('YYYY') : ''
												}))}
											/>
										) : (
											<div className="bg-white p-2 h-10 rounded-md">
												<Typography.Text>{item.graduateYear || '-'}</Typography.Text>
											</div>
										)}
									</Form.Item>

									<Form.Item
										label={t('specialization')}
										name={`specialization-${item.id}`}
										className={clsx(isChanged && 'hidden')}
									>
										{isEdit &&isBlur?.includes(item.id)? (
											<Input
												placeholder={t('web')}
												size="large"
												onChange={e => dispatch(specialization({
													id: item.id,
													specialization: e.target.value
												}))}
											/>
										) : (
											<div className="bg-white p-2 h-10 rounded-md">
												<Typography.Text>{item.specialization || '-'}</Typography.Text>
											</div>
										)}
									</Form.Item>
								</div>
							
							</Space>
							{isEdit && isBlur?.includes(item.id) && (
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
								{isBlur.length > 0 && !isBlur?.includes(item.id) ? '' :
								!isEdit  ? (
						<Button
							className="border-solid border-bluekfu border-[1px] text-bluekfu !rounded-md"
							onClick={() => {
								setIsEdit(true)
								setIsBlur((prev:any)=>[...prev, item.id])
							}}
						>
							{t('edit')}
						</Button>
					) : (
						<div className='flex gap-3'>
							<Button
								className="border-solid border-bluekfu border-[1px] text-bluekfu !rounded-md"
								onClick={() => {
									setIsEdit(false)
									setIsBlur((prev:any)=>prev.filter((el:any)=>el!==item.id))
								}}
							>
								Отмена
							</Button>
							<Button
								className="border-solid border-bluekfu border-[1px] text-bluekfu !rounded-md"
								onClick={()=>{
									onSubmit(item.id)
									setIsBlur((prev:any)=>prev.filter((el:any)=>el!==item.id))
								}}
							>
								Сохранить
							</Button>
						</div>
					)}

						</Space>
					))}
				</Space.Compact>
				
					{isChanged ?<Space
						direction="vertical"
						size={'large'}
						className={clsx('w-full flex items-center')}
					>
						<Button
							className="rounded-full text-center p-0 w-8 h-8 text-xl"
							type="primary"
							onClick={handleAddEducation}
						>
							+
						</Button>
					</Space> :'Информации нет'}
			
				<Space
					direction="vertical"
					size={'small'}
					className={clsx('mt-4', !isChanged && 'hidden')}
				>
					{/* {!isEdit ? (
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
					)} */}
				</Space>
			</Form>
		</div>
		</Spin>
	)
}
