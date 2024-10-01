import { LoadingOutlined, SendOutlined } from '@ant-design/icons'
import { useTimeout } from 'ahooks'
import { Button, Col, Divider, Drawer, Form, Row, Select, Space, Spin, Table } from 'antd'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useGetAllMyPracticesQuery } from '../../../../store/api/practiceApi/mypractice'
import { useGetAllOrderQuery } from '../../../../store/api/practiceApi/representation'

import { CommentNewTeacher } from './CommentTeacher'
import './practiceTeacherStyle.scss'
import { isMobileDevice } from '../../../../utils/hooks/useIsMobile'
import TextArea from 'antd/es/input/TextArea'
import { ArrowLeftSvg } from '../../../../assets/svg'

const mockData = [
	{
		index: 1,
		specialty: 'Иванов Иван Иванович',
		specialtyDetails: '01.03.02 - Прикладная математика',
		group: 'Группа 101',
		academicYear: '2023/2024',
		course: 2,
		practiceType: 'Производственная',
		practiceKind: 'Техническая',
		departmentDirectorName: 'Петров Петр Петрович, зав. кафедрой математики',
		grade: 5
	},
	{
		index: 2,
		specialty: 'Сидорова Мария Сергеевна',
		specialtyDetails: '01.03.03 - Информатика и вычислительная техника',
		group: 'Группа 102',
		academicYear: '2023/2024',
		course: 1,
		practiceType: 'Научная',
		practiceKind: 'Исследовательская',
		departmentDirectorName: 'Смирнов Алексей Викторович, зав. кафедрой информатики',
		grade: 4
	},
	{
		index: 3,
		specialty: 'Кузнецов Алексей Николаевич',
		specialtyDetails: '01.03.04 - Программная инженерия',
		group: 'Группа 103',
		academicYear: '2023/2024',
		course: 3,
		practiceType: 'Производственная',
		practiceKind: 'Разработка ПО',
		departmentDirectorName: 'Федоров Игорь Дмитриевич, зав. кафедрой программирования',
		grade: 3
	},
	{
		index: 4,
		specialty: 'Лебедева Анна Владимировна',
		specialtyDetails: '01.03.05 - Системный анализ и управление',
		group: 'Группа 104',
		academicYear: '2023/2024',
		course: 2,
		practiceType: 'Научная',
		practiceKind: 'Аналитическая',
		departmentDirectorName: 'Зайцева Ольга Сергеевна, зав. кафедрой системного анализа',
		grade: 5
	}
	
]
const optionMock = [
	{ label: 'Зачтено', value: 'Зачтено' },
]

export const ViewPraciceTeacher = () => {
	const nav = useNavigate()
	const [delay, setDelay] = useState<number | undefined>(250)
	const [open, setOpen] = useState(false)
	const [fullTable, setFullTable] = useState(false)
	const [currentPage, setCurrentPage] = useState(1)
	const [form] = Form.useForm()
	const [filter, setFilter] = useState({
		specialtyName: 'Все',
		courseNumber: 'Все',
		dateFilling: 'По дате (сначала новые)'
	})
	const [text,setText] = useState('')
	const [selectSubdivisionId, setSelectSubdivisionId] = useState(null)
	const {data: dataAllOrder,isSuccess: isSuccessOrder,isFetching: isLoadingOrder} = useGetAllOrderQuery({ subdivisionId: selectSubdivisionId, page: currentPage - 1, size: '5' },{ skip: !selectSubdivisionId || !currentPage })
	const isMobile = isMobileDevice();
	const [dataTable, setDataTable] = useState<any>(mockData)
	const {data: dataAllMyPractices,isSuccess: isSuccessMyPractice,isFetching: isFetchingMyPractice} = useGetAllMyPracticesQuery()

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
			render: (record:any,row:any)=>{
				return <Select value={record} placeholder={'Выбрать'} options={optionMock} onChange={(value) => changeSelect(value, row)}></Select>
			},
			fixed: 'right',
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
		},

		
	]
	const columnsMini = [
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
			className: 'w-[250px]'
		},
		{
			key: 'grade',
			dataIndex: 'grade',
			title: 'Оценка',
			className: 'text-xs !p-4 ',
			render: (record:any,row:any)=>{
				return <Select className='w-full' value={record} placeholder={'Выбрать'} options={optionMock} onChange={(value) => changeSelect(value, row)}></Select>
			}
		
		},
		{
			key: 'academicYear',
			dataIndex: 'academicYear',
			title: 'Учебный год',
			className: 'text-xs !p-4 w-[250px]'
		},
		{
			key: 'course',
			dataIndex: 'course',
			title: 'Курс',
			className: 'text-xs !p-4 mobileFirst'
		},
		{
			key: 'practiceType',
			dataIndex: 'practiceType',
			title: 'Тип',
			className: 'text-xs !p-4 mobileFirst'
		}

		
	]

	useEffect(() => {
		if (isSuccessMyPractice) {
			// setDataTable(filterDataFull())
		}
	}, [filter, isSuccessMyPractice])

	const timeoutFunction = useTimeout(() => {
		if (delay !== 250) {
			showDrawer()
			console.log('ttt')
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

		function sortDateFilling(a: any, b: any) {
			if (filter.dateFilling === 'По дате (сначала новые)') {
				return +new Date(b.dateFilling) - +new Date(a.dateFilling)
			}
			if (filter.dateFilling === 'По дате (сначала старые)') {
				return +new Date(a.dateFilling) - +new Date(b.dateFilling)
			}
			return 0
		}

		return dataAllMyPractices ? dataAllMyPractices.filter((elem: any) => filterCourse(elem)) : []
	}
	const changeSelect = (value:any,row:any)=>{
		console.log('value',value)
		console.log('row',row)

		const updatedData = dataTable.map((item:any) => {
			if (item.index === row.index) {
				return { ...item, grade: value };
			}
			return item;
		});
		setDataTable(updatedData);

		if(row.fio===''){
			setOpen(false)
		}
	}
	const handleRowClick = (record: any) => {
		setOpen(false)
		setDelay(v => (v !== undefined ? v + 1 : 1))

		// showDrawer()
		// navigate(`/services/mypractices/myPractices/edit/${record.id}`)
	}
	const showDrawer = () => {
		setOpen(true)
	}

	const onClose = () => {
		setOpen(false)
	}
	const onChange = ()=>{

	}

	const uniqueCourseNumbers = [...new Set(dataTable?.map((item: any) => item.course))]

	if (isFetchingMyPractice)
		return <Spin className="w-full mt-20" indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />

	return (
		<Form form={form}>
			<section className="container animate-fade-in">
				<Space size={10} align="center">
                    <Button
                        size="large"
                        className="mt-1 mr-6 rounded-full border border-black"
                        icon={<ArrowLeftSvg className="w-4 h-4 cursor-pointer mt-1"/>}
                        type="text"
                        onClick={() => {
                            nav('/services/practiceteacher')
                        }}
                    />
                    <span className=" text-[28px] font-normal">
                        Практика группы ...
                    </span>
                </Space>
			

				<Row gutter={[16, 16]} className="mt-14 flex items-center">
					<Col span={5}>
						<span>Статус</span>
					</Col>
					<Col span={7} className="overWrite">
						<Form.Item className="mb-0" name={'specialtyName'}>
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
									setFilter({ ...filter, specialtyName: value })
								}}
							/>
						</Form.Item>
					</Col>
				</Row>

				<Row gutter={[16, 16]} className="mt-4 flex items-center">
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
				</Row>

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
									onRow={(record) => ({
										onClick: (e) => {
											// @ts-ignore
											if (e.target.closest('.ant-select')) {
												return
											}
											// @ts-ignore
											if (e.target.closest('.ant-select-item-option-content')) {
												return
											}
											handleRowClick(record)},
									})}
									rowKey="id"
									// @ts-ignore
									columns={columnsMini}
									dataSource={dataTable ? dataTable : []}
									pagination={
										dataTable && dataTable?.length < 10
											? false
											: {
													pageSize: 10
											  }
									}
									rowClassName={() => 'animate-fade-in '}
									className=""
								/>
							</div>
						) : (
							<Table
								onRow={(record) => ({
									onClick: (e) => {
										// @ts-ignore
										if (e.target.closest('.ant-select')) {
											return
										}
										// @ts-ignore
										if (e.target.closest('.ant-select-item-option-content')) {
											return
										}
										handleRowClick(record)},
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
					headerStyle={{ paddingTop: isMobile ? '140px':'100px', background: '#d2def1' }}
					className=""
					onClose={onClose}
					open={open}
					title="Новиков Илья"
				>
					<div className="top-10">
						<div>Смена статуса</div>
						<Divider />
						<CommentNewTeacher />
						<div className="flex w-full ">
							<TextArea
								maxLength={75}
								placeholder="Напишите комментарий к работе"
								className="rounded-[0px_0px_0px_10px] "
								style={{ resize: 'none' }}
								value={text}
								onChange={onChange}
								required
							/>
							<Button
								htmlType="submit"
								icon={<SendOutlined />}
								className="rounded-[0px_0px_10px_0px] h-[54px] "
								size="large"
							/>
						</div>
					</div>
				</Drawer>
			</section>
		</Form>
	)
}
export default ViewPraciceTeacher
