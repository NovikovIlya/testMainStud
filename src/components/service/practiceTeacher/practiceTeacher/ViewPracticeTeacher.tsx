import { CloseOutlined, LoadingOutlined, PlusOutlined, ReloadOutlined } from '@ant-design/icons'
import { useTimeout } from 'ahooks'
import {
	Button,
	Col,
	Divider,
	Drawer,
	Form,
	Input,
	Modal,
	Row,
	Select,
	Skeleton,
	Space,
	Spin,
	Table,
	Upload,
	message
} from 'antd'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { Vector } from '../../../../assets/svg/Vector'
import { useAppDispatch, useAppSelector } from '../../../../store'
import { useGetAllMyPracticesQuery } from '../../../../store/api/practiceApi/mypractice'
import {
	useGetChatQuery,
	useGetCompetencesQuery,
	useGetInfoReportStudentQuery,
	useGetOneGroupQuery,
	useGetStatusQuery,
	useSendMessageMutation,
	useUpdateStatusMutation
} from '../../../../store/api/practiceApi/practiceTeacher'
import { setText } from '../../../../store/reducers/notificationSlice'
import { isMobileDevice } from '../../../../utils/hooks/useIsMobile'

import { CommentNewTeacher } from './CommentTeacher'
import InputText from './InputText'
import styles from './practiceTeacherStyle.module.scss'
import ModalReport from './ModalReport'
import ModalStudent from './ModalStudent'
import { apiSliceTeacher } from '../../../../store/api/apiSliceTeacher'

const optionMock = [
	{ label: 'Ожидает проверки', value: 'Ожидает проверки' },
	{ label: 'На доработке', value: 'На доработке' },
	{ label: 'Завершено', value: 'Завершено' }
]
const optionMockStatus = [
	{ label: 'Все', value: 'Все' },
	{ label: 'Ожидает проверки', value: 'Ожидает проверки' },
	{ label: 'На доработке', value: 'На доработке' },
	{ label: 'Завершено', value: 'Завершено' }
]
const optionMockGrade = [
	{ label: 'Не оценено', value: 'Не оценено' },
	{ label: '0', value: '0' },
	{ label: 'Не зачтено', value: 'Не зачтено' },
	{ label: '2', value: '2' },
	{ label: '3', value: '3' },
	{ label: '4', value: '4' },
	{ label: '5', value: '5' },
	{ label: 'зачтено', value: 'зачтено' },
	{ label: 'освобожден', value: 'освобожден' },
	{ label: 'Отсутствие по уважительной', value: 'Отсутствие по уважительной' },
	{ label: 'Отсутствие по неуважительной', value: 'Отсутствие по неуважительной' }
]

export const ViewPraciceTeacher = () => {
	const path = useLocation()
	const id = path.pathname.split('/').at(-1)!
	const [files, setFiles] = useState<any>({
		report: null,
		diary: null,
		tasks: null
	})
	const user = useAppSelector(state => state.auth.user)
	const [idStudent, setIdStudent] = useState<any>(null)
	const { data: dataStatus, isSuccess: isSuccessStatus } = useGetStatusQuery(idStudent, { skip: !idStudent })
	const [studentName, setStudentName] = useState<any>(null)
	const [grade, setGrade] = useState<any>(null)
	const [rowData, setRowData] = useState(null)
	const [statusStudent, setStatusStudent] = useState<any>(null)
	const nav = useNavigate()
	const [delay, setDelay] = useState<number | undefined>(250)
	const [open, setOpen] = useState(false)
	const [openModalReport,setIsModalOpenReport] = useState(false)
	const [openModalStudent,setIsModalStudent] = useState(false)
	const [fullTable, setFullTable] = useState(false)
	const [currentPage, setCurrentPage] = useState(1)
	const [form] = Form.useForm()
	const [filter, setFilter] = useState({
		name: 'Все',
		courseNumber: 'Все',
		dateFilling: 'По дате (сначала новые)',
		status: 'Все',
		grade:'Все'
	})
	const [isModalOpen, setIsModalOpen] = useState(false)
	const { data: dataAllOrder, isSuccess: isSuccessOrder,isFetching:isFetchingMyPractice,refetch:refetchAll } = useGetOneGroupQuery(id, { skip: !id })
	const isMobile = isMobileDevice()
	const [dataTable, setDataTable] = useState<any>(dataAllOrder)
	const { data: dataChat, isFetching: isFethcingChat, refetch } = useGetChatQuery(idStudent, { skip: !idStudent })
	const [sendMessageApi, { isLoading }] = useSendMessageMutation()
	const [updateStatus, {isLoading:isLoadingUpdateStatus}] = useUpdateStatusMutation()
	const {data:dataCompetences,isSuccess:isSuccessCompetences,isFetching:isFetchingComp,refetch:refechComp} = useGetCompetencesQuery({studentId :idStudent,orderId:id},{skip:!idStudent,refetchOnMountOrArgChange: true })
	const dispatch = useAppDispatch()
	const [oldId,setOldId] = useState(null)
	const {data:dataReportStudent} = useGetInfoReportStudentQuery(idStudent,{skip: !idStudent})

	const columnsMini = [
		{
			key: 'number',
			dataIndex: 'number',
			title: '№',
			className: 'text-xs !p-4',
			
		},
		{
			key: 'studentName',
			dataIndex: 'studentName',
			title: 'ФИО обучающегося',
			className: 'w-[250px]'
		},
		{
			key: 'grade',
			dataIndex: 'grade',
			title: 'Оценка',
			className: 'text-xs !p-4 ',
			render:(record: any, text: any) => {
				return <div className="">{text?.grade ? <div>{text?.grade}{text?.reason ? ` (${text?.reason})` : ''}</div>  : 'Не оценено'}</div>
			}
		},
		{
			key: 'status',
			dataIndex: 'status',
			title: 'Статус',
			className: 'text-xs !p-4 ',
			render:(record: any, text: any) => {
				return <div className="">{text?.status ? text?.status : 'Ожидает проверки'}</div>
			}
		},
		{
			key: 'documents',
			dataIndex: 'documents',
			title: 'Наличие документов',
			className: 'text-xs !p-4 ',
			render: (record: any, text: any) => {
				return (
					<>
						<div className="!text-xs">Отчет: {text?.isReportSent ? 'Отправлено' : 'Не отправлено'}</div>
						<div className="!text-xs">Дневник: {text?.isDiarySent ? 'Отправлено' : 'Не отправлено'}</div>
						<div className="!text-xs">{text?.thirdDocType === 'TASKS'? 'Инд.задания':'Путевка' }: {text?.isThirdDocSent ? 'Отправлено' : 'Не отправлено'}</div>
					</>
				)
			}
		},
		{
			key: 'report',
			dataIndex: 'report',
			title: 'Наличие отчета',
			className: 'text-xs !p-4 ',
			render: (record: any, text: any) => {
				return (
					<>
						{record?.isReportExist ? 
						<Button onClick={()=>modalButton(text)} className='p-5'>Отчет сформирован</Button> : 
						<Button onClick={()=>modalButton(text)} className='p-5'>Отчет не сформирован</Button>}
					</>
				)
			}
		}
	]

	useEffect(() => {
		if (isSuccessStatus) {
			form.setFieldValue('reasonText', dataStatus?.reason)
			if(dataStatus?.grade === null){
				setGrade('')
			}else{
				setGrade(dataStatus?.grade)
			}
			
			if(dataStatus?.status === null){
				setStatusStudent('Ожидает проверки')
			}else{
				setStatusStudent(dataStatus?.status)
			}
		}
	}, [dataStatus?.grade, dataStatus?.status, isSuccessStatus])
	
	useEffect(() => {
		if (isSuccessOrder) {
			setDataTable(filterDataFull())
		}
	}, [filter, isSuccessOrder,dataAllOrder])


	useTimeout(() => {
		if (delay !== 250) {
			showDrawer()
		}
	}, delay)

	function filterDataFull() {
		function filterCourse(elem: any) {
			if (filter.courseNumber === 'Все') {
				return elem
			} else {
				return elem.course === filter.courseNumber
			}
		}
		function filterStatus(elem: any) {

			if (filter.status === 'Все') {
				return elem
			}else if(filter.status === 'Ожидает проверки'){
				return elem.status === null || elem.status === 'Ожидает проверки'
			
			} else {
				return elem.status === filter.status
			}
		}
		function filterGrade(elem: any) {
			console.log('filter.grade',filter.grade)
			console.log('elem.grade',elem.grade)
			if (filter.grade === 'Все') {
				return elem
			}else if(filter.grade==='Не оценено'){
					return !elem.grade
				}
			 else {
				return elem.grade === filter.grade
			}
		}
		function filterName(elem: any) {
			if (filter.name === 'Все') {
				return elem
			} else {
				return elem.studentName === filter.name
			}
		}


		return dataAllOrder
			? dataAllOrder
			.filter((elem: any) => filterCourse(elem))
			.filter((elem: any) => filterName(elem))
			.filter((elem: any) => filterStatus(elem))
			.filter((elem: any) => filterGrade(elem))
			: []
	}
	const changeSelect = (value: any, row: any) => {
		const updatedData = dataTable.map((item: any) => {
			if (item.index === row.index) {
				return { ...item, grade: value }
			}
			return item
		})
		setDataTable(updatedData)

		if (row.fio === '') {
			setOpen(false)
		}
	}
	const handleRowClick = (record: any) => {
		setOpen(false)
		setDelay(v => (v !== undefined ? v + 1 : 1))
		setIdStudent(record.id)
		setStudentName(record.studentName)
		setRowData(record)

		setFiles({
			report: null,
			diary: null,
			tasks: null
		})
	}
	const showDrawer = () => {
		setOpen(true)
	}
	const onClose = () => {
		setOpen(false)
	}
	const modalButton = (value:any)=>{
		if(value.id===idStudent){
			console.log('был')
			refechComp()
			dispatch(apiSliceTeacher.util.resetApiState())
		}
		setOldId(value.studentName)
		refetchAll()
		console.log('value',value)
		setRowData(value)
		setIdStudent(value.id)
		// openStudentModal()
		setIsModalStudent(true)	
	}
	
	const clickTextArea = () => {
		// refetch()
	}
	const onFinish = () => {
		const nameUser = user?.lastname + ' ' + user?.firstname

		const newForm = new FormData()

		const currentDate = dayjs().tz('Europe/Moscow').format()
		const message: any = {
			practiceId: id,
			text: form.getFieldValue('textArea'),
			senderName: nameUser,
			datetime: currentDate,
			studentId: idStudent
		}
		const jsonData = JSON.stringify(message)
		const blob = new Blob([jsonData], { type: 'application/json' })
		newForm.append('message', blob)
		if (files?.report) {
			newForm.append('report', files.report)
		}
		if (files?.diary) {
			newForm.append('diary', files.diary)
		}
		if (files?.tasks) {
			newForm.append('tasks', files.tasks)
		}

		sendMessageApi(newForm)
		form.setFieldsValue({ textArea: '' })

		setText('')
		setFiles({
			report: null,
			diary: null,
			tasks: null
		})
	}
	const showModal = () => {
		setIsModalOpen(true)
	}

	const handleOk = () => {
		setIsModalOpen(false)
	}

	const handleCancel = () => {
		setIsModalOpen(false)
	
		form.setFieldsValue({ textArea: '' })

		setText('')
		setFiles({
			report: null,
			diary: null,
			tasks: null
		})
	}

	const updateStatusFn = () => {
		const obj = {
			id: idStudent,
			status: statusStudent,
			grade: grade,
			reason: form.getFieldValue('reasonText') 
		}
		
		updateStatus(obj)
	}
	const openReportModal=()=>{
		setIsModalOpenReport(true)
	}

	const openStudentModal = (value:any) =>{
		if(value===oldId){
			console.log('был да старый')
			refechComp()
			dispatch(apiSliceTeacher.util.resetApiState())
		}
		setOldId(value)
		onClose()
		refetchAll()
		refechComp()
		setIsModalStudent(true)	
	}

	const sortedData =
		dataTable?.length > 0 ? [...dataTable].sort((a: any, b: any) => a.studentName.localeCompare(b.studentName)).map((item:any,index:number)=>({...item, number:index+1})) : []
	const uniqueNames = Array.from(new Set(dataAllOrder?.map((student: any) => student.studentName)))

	
	return (
		<Form form={form}>
			<Spin spinning={isFetchingMyPractice}>
			<section className="container animate-fade-in">
				<Space size={10} align="center">
					<Button
						size="large"
						style={{ width: '48px' }}
						className="mt-1 mr-6 w-[48px] rounded-full border border-black"
						icon={<Vector />}
						type="text"
						onClick={() => {
							nav('/services/practiceteacher')
						}}
					/>
					<span className=" text-[28px] font-normal">Практика группы {dataAllOrder?.[0]?.groupNumber}</span>
				</Space>

				<Row gutter={[16, 16]} className="mt-14  flex items-center">
					<Col span={5}>
						<span>ФИО обучающегося</span>
					</Col>
					<Col span={7} className="overWrite">
						<Form.Item className="mb-0" name={'name'}>
							<Select
								showSearch
								defaultValue={'Все'}
								popupMatchSelectWidth={false}
								className="w-full"
								options={[
									{ key: 2244612, value: 'Все', label: 'Все' },
									...(uniqueNames
										? uniqueNames.map((item: any) => ({
												key: item,
												value: item,
												label: item
										  }))
										: [])
								]}
								onChange={(value: any) => {
									setFilter({ ...filter, name: value })
								}}
							/>
						</Form.Item>
					</Col>
					<Col className='flex justify-end' span={12}>
						<Button onClick={openReportModal}>Сформировать отчет</Button>
					</Col>
				</Row>
				<Row gutter={[16, 16]} className="mt-4 flex items-center">
				<Col span={5}>
						<span>Оценка</span>
					</Col>
					<Col span={7} className="overWrite">
						<Form.Item className="mb-0" name={'grade'}>
							<Select
								defaultValue={'Все'}
								popupMatchSelectWidth={false}
								className="w-full"
								
								options={[{value:'Все',label:'Все'}].concat(optionMockGrade)}
								onChange={(value: any) => {
									setFilter({ ...filter, grade: value })
								}}
							/>
						</Form.Item>
					</Col>
					<Col className='flex justify-end' span={12}>
						<Button >Отправить в деканат</Button>
					</Col>
				</Row>		
				<Row gutter={[16, 16]} className="mt-4 mb-14 flex items-center">
					<Col span={5}>
						<span>Статус</span>
					</Col>
					<Col span={7} className="overWrite">
						<Form.Item className="mb-0" name={'status'}>
							<Select
								defaultValue={'Все'}
								popupMatchSelectWidth={false}
								className="w-full"
								// options={[
								// 	{ key: 2244612, value: 'Все', label: 'Все' },
								// 	...(dataAllMyPractices
								// 		? dataAllMyPractices.map((item: any) => ({
								// 				key: item.specialty,
								// 				value: item.specialty,
								// 				label: item.specialty
								// 		  }))
								// 		: [])
								// ]}
								options={optionMockStatus}
								onChange={(value: any) => {
									setFilter({ ...filter, status: value })
								}}
							/>
						</Form.Item>
					</Col>

				</Row>
			
				<Row>
					<Col className='flex justify-end' span={24}>
						<Button
						onClick={refetchAll}
						className=""
						size="large"
						shape="circle"
						icon={<ReloadOutlined />}
						/>
					</Col>
				</Row>

				<Row className="mt-4">
					<Col flex={'auto'}>
						{!fullTable ? (
							<div className="viewPractical">
								<Table
									onRow={record => ({
										onClick: e => {
											// @ts-ignore
											if (e.target.closest('.ant-btn')) {
												return
											}
											// @ts-ignore
											if (e.target.closest('.ant-select-item-option-content')) {
												return
											}
											handleRowClick(record)
										}
									})}
									rowKey="id"
									// @ts-ignore
									columns={columnsMini}
									dataSource={sortedData}
									pagination={
										dataTable && dataTable?.length < 10
											? false
											: {
													pageSize: 10,
													position: ['bottomLeft']
											  }
									}
									rowClassName={() => 'animate-fade-in '}
									className="ant-table2"
								/>
							</div>
						) : (
							<Table
								onRow={record => ({
									onClick: e => {
										// @ts-ignore
										if (e.target.closest('.ant-select')) {
											return
										}
										// @ts-ignore
										if (e.target.closest('.ant-select-item-option-content')) {
											return
										}
										handleRowClick(record)
									}
								})}
								size="large"
								rowKey="id"
								// @ts-ignore
								columns={columns}
								dataSource={dataTable.map((item:any,index:number)=>({...item, number:index+1}))}
								pagination={
									dataTable.length > 10 && {
										current: currentPage,
										pageSize: 10,
										total: dataAllOrder?.length,
										onChange: page => setCurrentPage(page)
									}
								}
								className="my-10  absolute  sm:relative sm:left-0 top-10 sm:top-0"
								rowClassName={() => 'animate-fade-in'}
								locale={{
									emptyText: (
										<div>
											<h3>Нет данных для отображения</h3>
										</div>
									)
								}}
							/>
						)}
					</Col>
				</Row>

				<Drawer
					mask={false}
					bodyStyle={{ paddingTop: '30px' }}
					headerStyle={{ paddingTop: isMobile ? '140px' : '100px', background: '#f5f8fb' }}
					className=""
					onClose={onClose}
					open={open}
					title={
						<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
							<span>{studentName}</span>
							<div className='flex gap-3'>
								<Button type='primary' onClick={()=>openStudentModal(studentName)}>Отчет</Button>
								<Button type="text" icon={<CloseOutlined />} onClick={onClose} />
							</div>
						</div>
					}
					width={isMobile ? '100%' : '30%'}
				>
					{!isFethcingChat ? (
					
						<div className="top-10">
							<Spin spinning={isLoadingUpdateStatus}>
							<Form form={form} className="flex  w-full flex-wrap " onFinish={onFinish}>
								
								<Row className="flex items-center w-full mb-4">
									<Col span={5}>Статус</Col>
									<Col span={19}>
										<Select
											value={statusStudent}
											className="w-full"
											placeholder={'Выбрать'}
											options={optionMock}
											onChange={value => setStatusStudent(value)}
										></Select>
									</Col>
								</Row>
								<Row className="flex items-center w-full">
									<Col span={5}>Оценка</Col>
									<Col span={19}>
										<Select
											value={grade}
											placeholder={'Выбрать'}
											options={optionMockGrade}
											className="w-full"
											onChange={value => setGrade(value)}
										></Select>
									</Col>
								</Row>
								{grade === 'освобожден'|| grade === 'Отсутствие по уважительной'|| grade === 'Отсутствие по неуважительной'?<Row className="flex items-center w-full mt-4">
									<Col span={5}>Причина</Col>
									<Col span={19}>
										<Form.Item className='w-full mb-0' name={'reasonText'}>
											<Input
											
												placeholder={'Напишите причину'}
												maxLength={20}
												className="w-full"
												
											/>
										</Form.Item>
									</Col>
								</Row>:''}
								<Row className="flex justify-end w-full mt-2">
									<Col>
										<Button onClick={updateStatusFn}>Сохранить</Button>
									</Col>
								</Row>
							</Form>
							</Spin>

							<Divider />
							<Spin spinning={isLoading}>
								<CommentNewTeacher files={files} dataChat={dataChat} refetch={refetch} />
							</Spin>
							<Form form={form} className="flex  w-full flex-wrap " onFinish={onFinish}>
								<div className="flex w-full mt-4 ">
									<Button className="h-[54px] rounded-[10px_0_0_10px]" onClick={showModal}>
										<PlusOutlined />
									</Button>

									{/* <Form.Item className=' w-full' name={'textArea'}>
										<TextArea
										
										maxLength={75}
										placeholder="Напишите комментарий к работе"
										className="rounded-[0px_0px_0px_0px]   !h-[54px]"
										style={{ resize: 'none' }}
										onClick={clickTextArea}
										
										required
									/></Form.Item>

									<Button
										htmlType="submit"
										icon={<SendOutlined />}
										className="rounded-[0px_10px_10px_0px] h-[54px] "
										size="large"
									/> */}
									<InputText setIsModalOpen={setIsModalOpen} clickTextArea={clickTextArea} />
								</div>
							</Form>
							
						</div>
					) : (
						<>
							<Skeleton active />
							<Skeleton.Input active className="mt-10 mb-5 !h-[400px] !w-[500px]" />
							<Skeleton.Input active className="mt-10 !h-14 !w-[500px]" />
						</>
					)}
				</Drawer>
				<Modal
					title="Выберите файлы и отправьте комментарий"
					width={650}
					style={{ paddingBottom: '150px' }}
					open={isModalOpen}
					onOk={handleOk}
					onCancel={handleCancel}
					footer={null}
				>
					<div className={`${styles.item2} flex gap-3 w-full flex-wrap p-6`}>
						<Upload
							maxCount={1}
							onChange={info => {
								if (info.file.status === 'removed') {
									// form.setFieldValue('pdfContract', undefined)
									setFiles({
										...files,
										report: undefined
									})
								}
							}}
							beforeUpload={file => {
								const isPdf = file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
								const isLt5M = file.size / 1024 / 1024 < 5 // Проверка на размер меньше 5 МБ

								if (!isPdf) {
									message.error('Вы можете загружать только docx файлы!')
									return false
								}
								if (!isLt5M) {
									message.error('Файл должен быть меньше 5 МБ!')
									return false
								}

								setFiles({
									...files,
									report: file
								})
								return false
							}}
							accept={'.docx'}
							fileList={files.report ? [files.report] : []}
							className="flex items-center  "
						>
							<Button
								className={`${
									files.report ? 'opacity-100' : ''
								} rounded-[20px_20px_20px_20px] h-14 w-[170px] flex justify-start`}
								icon={<PlusOutlined />}
							>
								Загрузить отчёт
							</Button>
						</Upload>
						<Upload
							maxCount={1}
							onChange={info => {
								if (info.file.status === 'removed') {
									// form.setFieldValue('pdfContract', undefined)
									setFiles({
										...files,
										diary: undefined
									})
								}
							}}
							beforeUpload={file => {
								const isPdf = file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
								const isLt5M = file.size / 1024 / 1024 < 5 // Проверка на размер меньше 5 МБ

								if (!isPdf) {
									message.error('Вы можете загружать только PDF файлы!')
									return false
								}
								if (!isLt5M) {
									message.error('Файл должен быть меньше 5 МБ!')
									return false
								}

								setFiles({
									...files,
									diary: file
								})
								return false
							}}
							accept={'.docx'}
							fileList={files.diary ? [files.diary] : []}
							className="flex items-center  "
						>
							<Button
								className={`${
									files.diary ? 'opacity-100' : ''
								} rounded-[20px_20px_20px_20px] h-14 w-[170px] flex justify-start`}
								icon={<PlusOutlined />}
							>
								Загрузить дневник
							</Button>
						</Upload>
						<Upload
							onChange={info => {
								if (info.file.status === 'removed') {
									// form.setFieldValue('pdfContract', undefined)
									setFiles({
										...files,
										tasks: undefined
									})
								}
							}}
							maxCount={1}
							beforeUpload={file => {
								const isPdf = file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
								const isLt5M = file.size / 1024 / 1024 < 5 // Проверка на размер меньше 5 МБ

								if (!isPdf) {
									message.error('Вы можете загружать только PDF файлы!')
									return false
								}
								if (!isLt5M) {
									message.error('Файл должен быть меньше 5 МБ!')
									return false
								}

								setFiles({
									...files,
									tasks: file
								})
								return false
							}}
							accept={'.docx'}
							fileList={files.tasks ? [files.tasks] : []}
							className="flex items-center "
						>
							<Button
								className={`${
									files.tasks ? 'opacity-100' : ''
								} rounded-[20px_20px_20px_20px] h-14 w-[170px] flex justify-start`}
								icon={<PlusOutlined />}
							>
								Загрузить путевку
							</Button>
						</Upload>
						<Form form={form} className="flex  w-full flex-wrap " onFinish={onFinish}>
							<div className="w-full flex mt-20">
								<InputText
									files={files}
									text={form.getFieldValue('textArea')}
									isModal={true}
									setIsModalOpen={setIsModalOpen}
									clickTextArea={clickTextArea}
								/>
							</div>
						</Form>
					</div>
				</Modal>
				
				<ModalReport id={id} setIsModalOpenReport={setIsModalOpenReport} handleOk={handleOk} openModalReport={openModalReport}/>

				<ModalStudent dataReportStudent={dataReportStudent} dataAllOrder={dataAllOrder} isFetchingComp={isFetchingComp} id={id} idStudent={idStudent} isSuccessCompetences={isSuccessCompetences} data={dataCompetences} dataCompetences={dataCompetences?.competencesTable} rowData={rowData} setIsModalStudent={setIsModalStudent} handleOk={handleOk} openModalStudent={openModalStudent}/>
			</section>
			</Spin>
			
		</Form>
	)
}
export default ViewPraciceTeacher
