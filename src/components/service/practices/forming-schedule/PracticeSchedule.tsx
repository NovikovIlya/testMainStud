import {
	CheckOutlined,
	CloseOutlined, LoadingOutlined, PrinterOutlined
} from '@ant-design/icons'
import {
	Button,
	Col,
	Form,
	Popconfirm,
	Row,
	Select,
	Space,
	Spin,
	Table,
	Typography
} from 'antd'
import type { TableProps } from 'antd'
import dayjs from 'dayjs'
import printJS from 'print-js'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { ArrowLeftSvg } from '../../../../assets/svg'
import { DeleteRedSvg } from '../../../../assets/svg/DeleteRedSvg'
import {
	useCreateScheduleMutation, useGetByFilterMutation,
	useGetDocQuery
} from '../../../../store/api/practiceApi/formingSchedule'
import { useGetDepartmentsQuery, useGetPracticeKindQuery } from '../../../../store/api/practiceApi/individualTask'

import { EditableCell } from './EditableCell'
import { useGetSubdivisionUserQuery } from '../../../../store/api/serviceApi'
import { useGetSpecialtyNamesForPractiseQuery } from '../../../../store/api/practiceApi/roster'
import { useDispatch } from 'react-redux'
import { showNotification } from '../../../../store/reducers/notificationSlice'
import { Item } from '../Representation/EditableCell'
import { Filter } from '../../../../models/representation'

interface FilterType {
	value: string
	label: string
}

const filterLevel: FilterType[] = [
	{
		value: 'Все',
		label: 'Все'
	},
	{
		value: 'бакалавр',
		label: 'бакалавр'
	},
	{
		value: 'магистр',
		label: 'магистр'
	},
    {
		value: 'ординатор',
		label: 'ординатор'
	},
    {
		value: 'специалист',
		label: 'специалист'
	},
    {
		value: 'аспирант',
		label: 'аспирант'
	}
]
const filterForm: any = [
	{
		value: 'Все',
		label: 'Все'
	},
	{
		value: 'очное',
		label: 'очное'
	},
	{
		value: 'заочное',
		label: 'заочное'
	},
    {
		value: 'очно-заочное',
		label: 'очно-заочное'
	}
]
const filterCourse: FilterType[] = [
	{
		value: 'Все',
		label: 'Все'
	},
	{
		value: '1',
		label: '1'
	},
	{
		value: '2',
		label: '2'
	},
	{
		value: '3',
		label: '3'
	},
	{
		value: '4',
		label: '4'
	},
	{
		value: '5',
		label: '5'
	},
	{
		value: '6',
		label: '6'
	},
	{
		value: '7',
		label: '7'
	}
]
const filterType: FilterType[] = [
	{
		value: 'Все',
		label: 'Все'
	},
	{
		value: 'Производственная',
		label: 'Производственная'
	},
	{
		value: 'Технологическая',
		label: 'Технологическая'
	}
]

const optionsSortDate: any = [
	{ value: 'По дате (сначала новые)', label: 'По дате (сначала новые)' },
	{ value: 'По дате (сначала старые)', label: 'По дате (сначала старые)' }
]

const optionMock = [
	{ value: '1', label: '1' },
	{ value: '2', label: '2' },
	{ value: '3', label: '3' },
    { value: '4', label: '4' },
	{ value: '5', label: '5' },
	{ value: '6', label: '6' },
    { value: '7', label: '7' }
]
const optionMockType = [
	{ value: '4', label: '4' },
	{ value: '5', label: '5' }
]
const optionMockKind = [
	{ value: '7', label: '7' },
	{ value: '8', label: '8' },
	{ value: '9', label: '9' }
]

export const PracticeSchedule = () => {
	const nav = useNavigate()
	const [scheduleIdState, setScheduleIdState] = useState(null)
    const {data:dataUserSubdivision} = useGetSubdivisionUserQuery()
	const { data: dataBlob, isLoading: isLoadingBlob } = useGetDocQuery(scheduleIdState,{ skip: scheduleIdState === null })
    const {data:dataSpeciality} = useGetSpecialtyNamesForPractiseQuery(dataUserSubdivision?.id,{skip:dataUserSubdivision?.id === null})
    const {data:dataPracticeKind} = useGetPracticeKindQuery(dataUserSubdivision?.id,{skip:dataUserSubdivision?.id === null})    
	const [filter, setFilter] = useState<any>({
		type: '',
		spec: '',
		courseNumber: 'Все',
		educationLevel: 'Все',
		educationType: 'Все',
		dateFilling: 'По дате (сначала новые)',
		practiceKind: 'Все',
		specialtyName: 'Все',
        subDivision:'Все'
	})
	const [form] = Form.useForm()
	const [editingKey, setEditingKey] = useState('')
	const { data: dataAllSubdivision } = useGetDepartmentsQuery()
	const isEditing = (record: Item) => record.key === editingKey
	const [currentRowValues, setCurrentRowValues] = useState({})
	const [createSchedule, { data: dataCreateSchedule ,isLoading:isLoadingCreate}] = useCreateScheduleMutation({})
	const [sendFilterParams,{data:dataByFilter,isSuccess:isSuccessByFilter,isLoading:isLoadingByFilters}] = useGetByFilterMutation()
    const [tableData, setTableData] = useState<any>(dataByFilter)
	const dispatch = useDispatch()

	const columns = [
		{
			key: 'name',
			dataIndex: 'specialtyName',
			title: 'Шифр и наименование документа',
			name: 'Шифр и иаименование документа',
			className: 'text-xs !p-2'
		},
		// {
		// 	key: 'academicYear',
		// 	dataIndex: 'academicYear',
		// 	title: 'Учебный год',
		// 	className: 'text-xs !p-2'
		// },
		{
			key: 'course',
			dataIndex: 'courseNumber',
			title: 'Курс',
			className: 'text-xs !p-2',
			editable: true
		},
		{
			key: 'groupNumbers',
			dataIndex: 'groupNumbers',
			title: 'Номер группы',
			className: 'text-xs !p-2'
		},
		{
			key: 'educationLevel',
			dataIndex: 'educationLevel',
			title: 'Уровень образования',
			className: 'text-xs !p-2'
		},
		{
			key: 'educationType',
			dataIndex: 'educationType',
			title: 'Форма обучения',
			className: 'text-xs !p-2'
		},
		{
			key: 'kind',
			dataIndex: 'practiceKind',
			title: 'Вид практики',
			className: 'text-xs !p-2',
			editable: true
		},
		{
			key: 'type',
			dataIndex: 'practiceType',
			title: 'Тип практики',
			className: 'text-xs !p-2',
			editable: true
		},
		{
			key: 'id',
			title: 'Дата заполнения',
			dataIndex: 'dateFilling',
			width: '20%',
			// sorter: (a:any, b:any) => +new Date(b.dateFilling) - +new Date(a.dateFilling),
			// @ts-ignore
			render: (text: any) => dayjs(text).format('DD.MM.YYYY')
		},

		{
			key: 'period',
			dataIndex: 'period',
			title: 'Период практики',
			className: 'text-xs !p-2',
			editable: true,
			render: (text: any, record: any) => {
				return <>{formatDateRange(Array.isArray(text) ? text : ['', ''])}</>
			}
		},
		{
			title: '',
			dataIndex: 'operation',
			render: (_: any, record: Item) => {
				const editable = isEditing(record)
				return editable ? (
					<div className="flex justify-around items-center w-[60px]">
						<Typography.Link
							onClick={() => save(record.key)}
							style={{ marginRight: 8 }}
						>
							<CheckOutlined style={{ color: '#75a4d3' }} />
						</Typography.Link>
						<Popconfirm
							title="Вы действительно хотите отменить действие?"
							onConfirm={cancel}
						>
							<CloseOutlined style={{ color: '#75a4d3' }} />
						</Popconfirm>
					</div>
				) : (
					<div className="flex justify-around items-center  w-[60px]">
						{/* <Typography.Link
							disabled={editingKey !== ''}
							onClick={() => edit(record)}
						>
							<EditSvg />
						</Typography.Link> */}
						<Popconfirm
							title="Вы действительно хотите удалить?"
							// @ts-ignore
							onConfirm={() => handleDelete(record.id)}
						>
							<a>
								<DeleteRedSvg />
							</a>
						</Popconfirm>
					</div>
				)
			}
		}
	]
	const mergedColumns: TableProps['columns'] = columns.map(col => {
		// @ts-ignore
		if (!col.editable) {
			return col
		}
		return {
			...col,
			onCell: (record: Item) => ({
				record,
				inputType:
					col.dataIndex === 'courseNumber'
						? 'select'
						: col.dataIndex === 'practiceType'
						? 'select'
						: col.dataIndex === 'practiceKind'
						? 'select'
						: col.dataIndex === 'period'
						? 'date'
						: col.dataIndex === 'course'
						? 'number'
						: 'text',
				dataIndex: col.dataIndex,
				title: col.title,
				editing: isEditing(record),
				options:
					col.dataIndex === 'courseNumber'
						? optionMock
						: col.dataIndex === 'practiceType'
						? optionMockType
						: col.dataIndex === 'practiceKind'
						? optionMockKind
						: undefined
			})
		}
	})

	useEffect(() => {
		console.log('filter.courseNumber',filter.courseNumber)
		const data = {
			subdivisionId:  dataUserSubdivision?.id ? dataUserSubdivision?.id : null,
			specialtyNameId:  dataSpeciality ? dataSpeciality : null,
			courseNumber: filter.courseNumber ==='Все' ? null : filter.courseNumber.includes('Все') ? null : filter?.courseNumber?.filter(x => x !== "Все").map(Number),
			practiceKindId: filter.practiceKindId ==='Все' ? null: filter?.practiceKindId?.filter(x => x !== "Все").map(Number),
			educationLevel: filter.educationLevel ==='Все' ? null : filter.educationLevel.includes('Все') ? null : filter?.educationLevel,
			educationType: filter.educationType ==='Все' ? null : filter.educationType.includes('Все') ? null : filter?.educationType,
		}
		sendFilterParams(data)
	}, [filter, dataAllSubdivision, form])

    useEffect(() => {
		if (isSuccessByFilter) {
			setTableData(filterDataFull())
		}
	}, [filter, isSuccessByFilter])

	useEffect(() => {
		setTableData(filterDataFull())
	}, [filter])

	function filterDataFull() {
		// function filterCourse(elem: any) {
		// 	if (filter.course === 'Все') {
		// 		return elem
		// 	} else {
		// 		return elem.courseNumber === filter.course
		// 	}
		// }
		// function filterLevel(elem: any) {
		// 	if (filter.educationLevel === 'Все') {
		// 		return elem
		// 	} else {
		// 		return elem.educationLevel === filter.educationLevel
		// 	}
		// }
		// function filterForm(elem: any) {
		// 	if (filter.educationType === 'Все') {
		// 		return elem
		// 	} else {
		// 		return elem.educationType === filter.educationType
		// 	}
		// }
		// function filterKind(elem: any) {
		// 	if (filter.practiceKind === 'Все') {
		// 		return elem
		// 	} else {
		// 		return elem.practiceKind === filter.practiceKind
		// 	}
		// }
		// function filterName(elem: any) {
		// 	if (filter.specialtyName === 'Все') {
		// 		return elem
		// 	} else {
		// 		return elem.specialtyName === filter.specialtyName
		// 	}
		// }

		// function sortDateFilling(a: any, b: any) {
		// 	console.log('a',a)
		// 	if (filter.dateFilling === 'По дате (сначала новые)') {
		// 		return +new Date(b.dateFilling) - +new Date(a.dateFilling)
		// 	}
		// 	if (filter.dateFilling === 'По дате (сначала старые)') {
		// 		return +new Date(a.dateFilling) - +new Date(b.dateFilling)
		// 	}
		// 	return 0
		// }

		return dataByFilter
			? dataByFilter
					// .sort((a: any, b: any) => sortDateFilling(a, b))
			: []
	}

	// const downloadFile = () => {
	// 	if (dataBlob) {
	// 		const link = document.createElement('a')
	// 		link.href = dataBlob
	// 		link.setAttribute('download', 'downloaded-file.docx')
	// 		document.body.appendChild(link)
	// 		link.click()

	// 		window.URL.revokeObjectURL(dataBlob)
	// 	}
	// }

	function translateColumnsIntoRussia({ isPrint }: { isPrint?: boolean }) {
		const newData: any = []
	

		for (let elem of tableData) {
			const startPractice = `${dayjs(elem.period?.[0]).format('DD.MM.YYYY')}`
			const endPractice = `${dayjs(elem.period?.[1]).format('DD.MM.YYYY')}`
			const newObj = {
				'Шифр и наименование специальности': elem.specialtyName,
				// 'Учебный год': elem.academicYear,
				'Курс': elem.courseNumber,
				'Номер группы': elem.groupNumbers,
				'Уровень образования': elem.educationLevel,
				'Форма обучения': elem.educationType,
				'Тип практики': elem.practiceType,
				'Дата заполнения': dayjs(elem.dateFilling).format('YYYY.MM.DD'),
				'Вид практики': elem.practiceKind,
				'Период практики': `${startPractice} - ${endPractice}`
			}

			newData.push(newObj)
		}

		return newData
	}

	const print = () => {
		function properties() {
			return [
				'Шифр и наименование специальности',
				// 'Учебный год',
				'Курс',
				'Номер группы',
				'Уровень образования',
				'Форма обучения',
				'Тип практики',
				'Дата заполнения',
				'Вид практики',
				'Период практики'
			]
		}
		printJS({
			printable: translateColumnsIntoRussia({ isPrint: true }),
			properties: properties(),
			type: 'json',
			style: 'body {font-size: 10px}'
		})
	}

	// const edit = (record: Partial<Item> & { key: React.Key }) => {
	// 	form.setFieldsValue({ name: '', age: '', address: '', ...record })
	// 	setEditingKey(record.key)
	// 	setCurrentRowValues(record)
	// }

	const cancel = () => {
		setEditingKey('')
	}

	const formatDateRange = (dateRange: any) => {
		if (
			dateRange !== null &&
			Array.isArray(dateRange) &&
			dateRange.length === 2
		) {
			const startDate = dayjs(dateRange[0])
			const endDate = dayjs(dateRange[1])

			if (startDate.isValid() && endDate.isValid()) {
				return `${startDate.format('DD.MM.YYYY')} - ${endDate.format(
					'DD.MM.YYYY'
				)}`
			} else {
				return 'Неверный формат даты'
			}
		}
		return '' // Возвращает пустую строку, если dateRange не является массивом или если длина массива не равна 2
	}

	const save = async (key: React.Key) => {
		try {
			const row = (await form.validateFields()) as Item

			const newData = [...tableData]
			const index = newData.findIndex(item => key === item.key)
			if (index > -1) {
				const item = newData[index]
				newData.splice(index, 1, {
					...item,
					...row
				})
				// setData(newData)
				setTableData(newData)
				setEditingKey('')

			} else {
				// если новая запись
				newData.push(row)
				// setData(newData)
				setTableData(newData)
				setEditingKey('')
			}
		} catch (errInfo) {
			console.log('Validate Failed:', errInfo)
		}
	}

	const handleDelete = (id: React.Key) => {
		const newData = tableData.filter((item: any) => item.id !== id)
		setTableData(newData)
	}

	function getAcademicYear() {
		const today = dayjs()
		const year = today.year()
		const month = today.month() + 1

		if (month >= 8) {
			return `${year}/${year + 1}`
		} else {
			return `${year - 1}/${year}`
		}
	}

	const handleCreateSchedule = () => {
        createSchedule({practiceIds: tableData.map((item:any)=>item.id)})
			.unwrap()
			.then(()=>{
				nav('/services/practices/formingSchedule')
			})
			.catch((error)=>{
				console.log(error)
				if (error.status === 409) {
					dispatch(showNotification({ message: 'Такой график уже создан', type: 'error' }));
				}
				if (error.status === 400) {
					dispatch(showNotification({ message: 'Текст в консоли', type: 'error' }));
				}
			})

    }


	return (
		<Spin spinning={isLoadingCreate}>
		<section className="container">
            <Form form={form} >
			<Row gutter={[16, 16]}>
				<Col span={24}>
					<Button
						size="large"
						className="mt-1"
						icon={<ArrowLeftSvg className="w-4 h-4 cursor-pointer mt-1" />}
						type="text"
						onClick={() => {
							nav('/services/practices/formingSchedule')
						}}
					/>
					<Typography.Text className=" text-[28px] mb-14">
						Добавление графика проведения практик на {getAcademicYear()} учебный год
						{dataUserSubdivision?.value} КФУ
					</Typography.Text>
				</Col>
			</Row>
			<Row gutter={[8, 16]} className="mt-12 w-full flex items-center">
				{dataUserSubdivision?.value ? 
                <><Col span={5}>
					<span>Подразделение</span>
				</Col>
				<Col span={7}>
					
						<Form.Item name={'subDivision'}>
							<Select
								popupMatchSelectWidth={false}
								defaultValue="Все"
								className="w-full"
								options={dataAllSubdivision}
                                onChange={value => {
									setFilter({
										...filter,
										subDivision: value
									})
								}}
							/>
						</Form.Item>
					
                </Col></> : null}
				<Col span={4}>
					<Typography.Text>Шифр и наименование специальности</Typography.Text>
				</Col>
				<Col span={8}>
					<Select
						mode='multiple'
						popupMatchSelectWidth={false}
						defaultValue="Все"
						className="w-full"
						options={[
							{key: 2244612, value: "Все", label: "Все"},
                            ...(dataSpeciality ? dataSpeciality.map((item:any) => ({
                              key: item.id,
                              value: item.value,
                              label: item.label
                            })) : [])
						]}
						onChange={value => {
							setFilter({
								...filter,
								specialtyName: value
							})
						}}
					/>
				</Col>
			</Row>
			<Row gutter={[16, 0]} className="mt-4 flex items-center">
				<Col span={1}>
					<Typography.Text className="whitespace-nowrap">Курс</Typography.Text>
				</Col>
				<Col span={3}>
					<Select
						mode='multiple'
						popupMatchSelectWidth={false}
						defaultValue="Все"
						className="w-full"
						options={filterCourse}
						onChange={value => {
							setFilter({
								...filter,
								courseNumber: value
							})
						}}
					/>
				</Col>
				<Col span={3}>
					<Typography.Text>Вид практики</Typography.Text>
				</Col>
				<Col span={5}>
					<Select
						mode='multiple'
						popupMatchSelectWidth={false}
						defaultValue="Все"
						className="w-full"
						options={[
							{key: 2244612, value: "Все", label: "Все"},
                            ...(dataPracticeKind ? dataPracticeKind.map((item) => ({
                              key: item.id,
                              value: item.id,
                              label: item.value
                            })) : [])
						]}
						onChange={value => {
							setFilter({
								...filter,
								practiceKind: value
							})
						}}
					/>
				</Col>
			</Row>
			<Row gutter={[8, 16]} className="mt-4 w-full flex items-center">
				<Col span={4}>
					<Typography.Text>Уровень образования</Typography.Text>
				</Col>
				<Col span={8}>
					<Select	
						mode='multiple'
						popupMatchSelectWidth={false}
						defaultValue="Все"
						className="w-full"
						options={filterLevel}
						onChange={value => {
							setFilter({
								...filter,
								educationLevel: value
							})
						}}
					/>
				</Col>
			</Row>
			<Row gutter={[8, 16]} className="mt-4 pb-4 mb-4 w-full flex items-center">
				<Col span={4}>
					<Typography.Text>Форма обучения</Typography.Text>
				</Col>
				<Col span={8}>
					<Select
						mode='multiple'
						popupMatchSelectWidth={false}
						defaultValue="Все"
						className="w-full"
						options={filterForm}
						onChange={value => {
							setFilter({
								...filter,
								educationType: value
							})
						}}
					/>
				</Col>
				<Col span={7} offset={5}>
					<Space className="w-full flex-row-reverse">
						<Button
							type="primary"
							className="!rounded-full"
							onClick={() => {
								handleCreateSchedule()
							}}
						>
							Добавить
						</Button>
					</Space>
				</Col>
			</Row>
			<Row className="mt-4 flex items-center">
				<Col span={12} flex="50%">
					<div>
						<Space>
							{/* <Button disabled={isLoadingBlob} onClick={downloadFile}>
								<VerticalAlignBottomOutlined /> Скачать
							</Button> */}
							{/* <Button disabled={isLoadingBlob} onClick={print}>
								<PrinterOutlined /> Печать
							</Button> */}
						</Space>
					</div>
				</Col>
				{/* <Col span={8} offset={4}>
					<div className={'flex gap-2 items-center'}>
						<span className={'mr-2'}>Сортировка</span>
						<Select
							popupMatchSelectWidth={false}
							defaultValue=""
							className="w-full"
							options={optionsSortDate}
							onChange={value => {
								setFilter({
									...filter,
									dateFilling: value
								})
							}}
						/>
					</div>
				</Col> */}
			</Row>

			<Row className="mt-4">
				<Col flex={'auto'}>
					{/* {stateSchedule.compressed && <CompressedView/>}
                    {stateSchedule.table && <TableView/>} */}
					{isLoadingByFilters ?  <Spin className='w-full mt-20' indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />   :
						<Table
							components={{
								body: {
									cell: EditableCell
								}
							}}
							bordered
							dataSource={tableData ? tableData.map((item:any)=>{
                                return{
                                    ...item,
                                    period:  [dayjs(item.practiceStartDate), dayjs(item.practiceEndDate)]
                                }
                            }) : []}
							columns={mergedColumns}
							rowClassName="editable-row"
							pagination={false}
							rowKey="id"
						/>
						}
				</Col>
			</Row>
            </Form>
		</section>
		</Spin>
	)
}

export default PracticeSchedule
