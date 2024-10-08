import { LoadingOutlined, PlusOutlined, SendOutlined } from '@ant-design/icons'
import { useTimeout } from 'ahooks'
import {
	Button,
	Col,
	Divider,
	Drawer,
	Dropdown,
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
import TextArea from 'antd/es/input/TextArea'
import dayjs from 'dayjs'
import { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { ArrowLeftSvg } from '../../../../assets/svg'
import { useAppDispatch, useAppSelector } from '../../../../store'
import { useGetAllMyPracticesQuery } from '../../../../store/api/practiceApi/mypractice'
import {
	useGetChatQuery,
	useGetOneGroupQuery,
	useSendMessageMutation
} from '../../../../store/api/practiceApi/practiceTeacher'
import { useGetAllOrderQuery } from '../../../../store/api/practiceApi/representation'
import { isMobileDevice } from '../../../../utils/hooks/useIsMobile'

import { CommentNewTeacher } from './CommentTeacher'
import './practiceTeacherStyle.scss'
import { setText } from '../../../../store/reducers/notificationSlice'
import { Vector } from '../../../../assets/svg/Vector'


const optionMock = [{ label: 'Зачтено', value: 'Зачтено' }]

export const ViewPraciceTeacher = () => {

	const [files, setFiles] = useState<any>({
		report: null,
		diary: null,
		tasks: null
	})
	const user = useAppSelector(state => state.auth.user)
	const [studentName, setStudentName] = useState<any>(null)
	const [grade,setGrade] = useState<any>(null)
	const [rowData,setRowData] = useState(null)
	const [statusStudent,setStatusStudent] = useState(null)
	const nav = useNavigate()
	const path = useLocation()
	const id = path.pathname.split('/').at(-1)!
	const [idStudent, setIdStudent] = useState(null)
	const [delay, setDelay] = useState<number | undefined>(250)
	const [open, setOpen] = useState(false)
	const [fullTable, setFullTable] = useState(false)
	const [currentPage, setCurrentPage] = useState(1)
	const [form] = Form.useForm()
	const [filter, setFilter] = useState({
		name: 'Все',
		courseNumber: 'Все',
		dateFilling: 'По дате (сначала новые)',
		status: 'Все'
	})
	const [isModalOpen, setIsModalOpen] = useState(false);
	// const [text, setText] = useState('')
	const [selectSubdivisionId, setSelectSubdivisionId] = useState(null)
	const { data: dataAllOrder, isSuccess: isSuccessOrder, isFetching: isLoadingOrder } = useGetOneGroupQuery(id)
	const isMobile = isMobileDevice()
	const [dataTable, setDataTable] = useState<any>(dataAllOrder)
	const {data: dataAllMyPractices,isSuccess: isSuccessMyPractice,isFetching: isFetchingMyPractice} = useGetAllMyPracticesQuery()
	const { data: dataChat, isFetching: isFethcingChat,refetch } = useGetChatQuery(idStudent, { skip: !idStudent })
	const [sendMessageApi, { isLoading}] = useSendMessageMutation()




	const columns = [
		{
			key: 'index',
			dataIndex: 'index',
			title: '№',
			className: 'text-xs !p-4'
		},
		{
			key: 'specialty',
			dataIndex: 'specialty',
			title: 'ФИО обучающегося',
			className: 'text-xs !p-4'
		},
		{
			key: 'grade',
			dataIndex: 'grade',
			title: 'Оценка',
			className: 'text-xs !p-2',
			render: (record: any, row: any) => {
				return (
					<Select
						value={record}
						placeholder={'Выбрать'}
						options={optionMock}
						onChange={value => changeSelect(value, row)}
					></Select>
				)
			},
			fixed: 'right'
		},
		{
			key: 'specialty',
			dataIndex: 'specialty',
			title: 'Шифр и наименование специальности',
			className: 'text-xs !p-4'
		},
		{
			key: 'group',
			dataIndex: 'group',
			title: 'Номер группы',
			className: 'text-xs !p-2'
		},
		{
			key: 'group',
			dataIndex: 'group',
			title: 'Номер группы',
			className: 'text-xs !p-2'
		},
		{
			key: 'academicYear',
			dataIndex: 'academicYear',
			title: 'Учебный год',
			className: 'text-xs !p-2'
		},
		{
			key: 'course',
			dataIndex: 'course',
			title: 'Курс',
			className: 'text-xs !p-2 mobileFirst'
		},
		{
			key: 'practiceType',
			dataIndex: 'practiceType',
			title: 'Тип',
			className: 'text-xs !p-2 mobileFirst'
		},
		{
			key: 'practiceKind',
			dataIndex: 'practiceKind',
			title: 'Вид',
			className: 'text-xs !p-2 mobileFirst'
		},

		{
			key: 'departmentDirectorName',
			dataIndex: 'departmentDirectorName',
			title: 'ФИО руководителя от кафедры, должность',
			className: 'text-xs !p-2 mobileFirst'
		}
	]
	const columnsMini = [
		{
			key: 'index',
			dataIndex: 'index',
			title: '№',
			className: 'text-xs !p-4',
			render: (text: string, record: any, index: number) => index + 1
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
			// render: (record: any, row: any) => {
			// 	return (
			// 		<Select
			// 			className="w-full"
			// 			value={record}
			// 			placeholder={'Выбрать'}
			// 			options={optionMock}
			// 			onChange={value => changeSelect(value, row)}
			// 		></Select>
			// 	)
			// }
		},
		{
			key: 'status',
			dataIndex: 'status',
			title: 'Статус',
			className: 'text-xs !p-4 ',
			// render: (record: any, row: any) => {
			// 	return (
			// 		<Select
			// 			className="w-full"
			// 			value={record}
			// 			placeholder={'Выбрать'}
			// 			options={optionMock}
			// 			onChange={value => changeSelect(value, row)}
			// 		></Select>
			// 	)
			// }
		},
		{
			key: 'documents',
			dataIndex: 'documents',
			title: 'Документы',
			className: 'text-xs !p-4 ',
			
		}
	]

	useEffect(() => {
		if (isSuccessOrder) {
			setDataTable(filterDataFull())
		}
	}, [filter, isSuccessOrder])

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
		function filterName(elem: any) {
			if (filter.name === 'Все') {
				return elem
			} else {
				return elem.studentName === filter.name
			}
		}

		function sortDateFilling(a: any, b: any) {
			if (filter.dateFilling === 'По дате (сначала новые)') {
				return +new Date(b.dateFilling) - +new Date(a.dateFilling)
			}
			if (filter.dateFilling === 'По дате (сначала старые)') {
				return +new Date(a.dateFilling) - +new Date(b.dateFilling)
			}
			return 0
		}

		return dataAllOrder ? dataAllOrder
		.filter((elem: any) => filterCourse(elem))
		.filter((elem: any) => filterName(elem)) : []
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

	const clickTextArea = ()=>{
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
		setIsModalOpen(true);
	};
	
	const handleOk = () => {
	setIsModalOpen(false);
	};
	
	const handleCancel = () => {
	setIsModalOpen(false);
	};
	
	const sortedData = dataTable?.length > 0 ? [...dataTable].sort((a: any, b: any) => a.studentName.localeCompare(b.studentName)) : [];

	const uniqueNames = Array.from(new Set(dataAllOrder?.map((student:any) => student.studentName)));

	if (isFetchingMyPractice)	return <Spin className="w-full mt-20" indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />

	return (
		<Form form={form}>
			<section className="container animate-fade-in">
				<Space size={10} align="center">
					<Button
						size="large"
						style={{width:'48px'}}
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
								options={[
									{ key: 2244612, value: 'Все', label: 'Все' },
									...(dataAllMyPractices
										? dataAllMyPractices.map((item: any) => ({
												key: item.specialty,
												value: item.specialty,
												label: item.specialty
										  }))
										: [])
								]}
								onChange={(value: any) => {
									setFilter({ ...filter, status: value })
								}}
							/>
						</Form.Item>
					</Col>
				</Row>

			

				{/* <Row gutter={[16, 16]} className="mt-4 flex items-center">
					<Col span={5}>
						<span>Номер группы</span>
					</Col>
					<Col
						span={7}
						className="overWrite
"
					>
						<Select
							popupMatchSelectWidth={false}
							defaultValue="Все"
							className="w-full"
							options={[
								{ key: 2244612, value: 'Все', label: 'Все' },
								...uniqueCourseNumbers.map((item: any) => ({ key: item, label: item, value: item }))
							]}
							onChange={value => {
								setFilter({
									...filter,
									courseNumber: value
								})
							}}
						/>
					</Col>
				</Row> */}

				{/* <Row className="mt-12 flex items-center"> 
				<Col span={12} flex="50%" className="mobileFirst"> 
				<Radio.Group defaultValue="compressedView" buttonStyle="solid"> 
				<Radio.Button onClick={() => setFullTable(false)} value="compressedView" className="!rounded-l-full"> 
					Посмотреть в сжатом виде 
				</Radio.Button> 
				<Radio.Button onClick={() => setFullTable(true)} value="tableView" className="!rounded-r-full"> 
					Посмотреть данные в таблице 
				</Radio.Button> 
				</Radio.Group> 
				</Col> 
				</Row> */}

				<Row className="mt-4">
					<Col flex={'auto'}>
						{!fullTable ? (
							<div className="viewPractical">
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
									rowKey="id"
									// @ts-ignore
									columns={columnsMini}
									dataSource={
										sortedData
									}
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
								dataSource={dataTable}
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
					headerStyle={{ paddingTop: isMobile ? '140px' : '100px', background: '#d2def1' }}
					className=""
					onClose={onClose}
					open={open}
					title={studentName}
					width={isMobile ? '100%' : '30%'}
					
				>
					
					{!isFethcingChat ? (
						
						<div className="top-10">
							<Form form={form} className="flex  w-full flex-wrap " onFinish={onFinish}>
								<Row className='flex items-center w-full mb-4'>
									<Col span={5}>Статус</Col>
									<Col span={19}>
										<Select
											className="w-full"
											
											placeholder={'Выбрать'}
											options={optionMock}
											onChange={value => setStatusStudent(value)}
										></Select>
									</Col>
								</Row>
								<Row className='flex items-center w-full'>
									<Col span={5}>Оценка</Col>
									<Col span={19}>
										<Form.Item className='  flex-wrap items-center  mb-[0]' name={'gradeForm'}>
											<Input
												className="w-full flex"
												
												placeholder={'Ввести'}
											
											
											></Input>
										</Form.Item>
									</Col>
								</Row>
								<Row className='flex justify-end w-full mt-2'>
									<Col >
										<Button>Сохранить</Button>
									</Col>
								</Row>
							</Form>
							
							<Divider />
							<Spin spinning={isLoading}>
								<CommentNewTeacher dataChat={dataChat} refetch={refetch}/>
							</Spin>
							<Form form={form} className="flex  w-full flex-wrap " onFinish={onFinish}>
								<div className="flex w-full mt-4 ">
									
										<Button className='h-[54px] rounded-[10px_0_0_10px]'  onClick={showModal}><PlusOutlined /></Button>
									

									<Form.Item className=' w-full' name={'textArea'}>
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
									/>
								</div>
							</Form>
						</div>
					) : (
						<>
						<Skeleton active  />
						<Skeleton.Input active className='mt-20 !h-72 !w-72'/>
						</>
					)}
					
				</Drawer>
				<Modal title='Выберите файлы'  width={600} style={{paddingBottom:'40px'}} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
					<div className='flex gap-3 w-full flex-wrap'>
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
					<Button className={`${files.report ? 'opacity-100' : ''} rounded-[20px_20px_20px_20px] h-14 w-[170px] flex justify-start`} icon={<PlusOutlined />}>
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
					<Button className={`${files.diary ? 'opacity-100' : ''} rounded-[20px_20px_20px_20px] h-14 w-[170px] flex justify-start`}  icon={<PlusOutlined />}>
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
					<Button  className={`${files.tasks ? 'opacity-100' : ''} rounded-[20px_20px_20px_20px] h-14 w-[170px] flex justify-start`}  icon={<PlusOutlined />}>
						Загрузить путевку
					</Button>
				</Upload>
					</div>
				</Modal>
			</section>
		</Form>
	)
}
export default ViewPraciceTeacher
