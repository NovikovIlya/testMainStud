import {
	CheckOutlined,
	CloseOutlined,
	LoadingOutlined, PrinterOutlined,
	VerticalAlignBottomOutlined
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
import { useLocation, useNavigate } from 'react-router-dom'

import { ArrowLeftSvg } from '../../../../assets/svg'
import { DeleteRedSvg } from '../../../../assets/svg/DeleteRedSvg'
import {
	useDeleteMutation,
	useDeleteRowMutation,
	useGetByFilterMutation,
	useGetDocQuery,
	useGetOneScheduleQuery
} from '../../../../store/api/practiceApi/formingSchedule'
import { useGetDepartmentsQuery, useGetPracticeKindQuery } from '../../../../store/api/practiceApi/individualTask'

import { EditableCell } from './EditableCell'
import { useGetSubdivisionUserQuery } from '../../../../store/api/serviceApi'
import { useGetSpecialtyNamesForPractiseQuery } from '../../../../store/api/practiceApi/roster'
import { Item } from '../../../../models/representation'
import { Vector } from '../../../../assets/svg/Vector'


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
	}
	
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

export const EditSchedule = () => {
	const nav = useNavigate()
	const path = useLocation()
	const id = path.pathname.split('/').at(-1)!
	const year =  path.pathname.split('/').at(-2)!
    const {data:dataUserSubdivision} = useGetSubdivisionUserQuery()
	const { data: dataBlob, isLoading: isLoadingBlob,isFetching:isFetchingBlob } = useGetDocQuery(id,{ skip: !id })
    const {data:dataSpeciality} = useGetSpecialtyNamesForPractiseQuery(dataUserSubdivision?.id,{skip:dataUserSubdivision?.id === null})
    const {data:dataPracticeKind} = useGetPracticeKindQuery(dataUserSubdivision?.id,{skip:dataUserSubdivision?.id === null})
    const [deleteRow] = useDeleteRowMutation()
    const {data:dataOneSchedule,isLoading:isLoadingOneSchedule,isSuccess:isSuccessAll} = useGetOneScheduleQuery(id,{skip:!id })
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
	const isEditing = (record: any) => record.key === editingKey
	const [sendFilterParams,{data:dataByFilter,isSuccess:isSuccessByFilter}] = useGetByFilterMutation()
    const [tableData, setTableData] = useState<any>(dataByFilter)
	const [deleteSchedule,{}] = useDeleteMutation()
	const [selectedValuesLevel, setSelectedValuesLevel] = useState(['Все']);
	const [selectedValueForm, setSelectedValuesForm] = useState(['Все']);
	const [selectedValueCourse, setSelectedValuesCourse] = useState(['Все']);
	const [selectedValueSpecialty, setSelectedValuesSpectialty] = useState(['Все']);
	const [selectedValueKind, setSelectedValuesKind] = useState(['Все']);
 
	const columns = [
		{
			key: 'name',
			dataIndex: 'specialtyName',
			title: 'Шифр и наименование документа',
			name: 'Шифр и иаименование документа',
			className: 'text-xs !p-2'
		},
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
			className: 'text-xs !p-2 mobileFirst',
			editable: true
		},
		{
			key: 'type',
			dataIndex: 'practiceType',
			title: 'Тип практики',
			className: 'text-xs !p-2 mobileFirst',
			editable: true
		},
		{
			key: 'id',
			title: 'Дата заполнения',
			dataIndex: 'dateFilling',
			width: '20%',
			className: 'mobileFirst',
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
			render: (_: any, record: any) => {
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
							title="Вы действительно хотите удалить? Данные будут удалены и в печатной форме"
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
		if (isSuccessAll) {
			setTableData(filterDataFull())
		}
	}, [filter, isSuccessAll])

	useEffect(() => {
		// if (isSuccessPractiseAll) {
		setTableData(filterDataFull())

		// @ts-ignore

		// }
	}, [filter])

	const handleChangeLevel = (values:any) => {
		if(selectedValuesLevel.includes('Все')===false && values.includes('Все') ){
			setSelectedValuesLevel(['Все']);
			return
		}
		setSelectedValuesLevel(values.filter((i:any)=>i!=='Все'))
	};

	const handleChangeForm = (values:any) => {
		if(selectedValueForm.includes('Все')===false && values.includes('Все') ){
			setSelectedValuesForm(['Все']);
			return
		}
		setSelectedValuesForm(values.filter((i:any)=>i!=='Все'))
	};

	const handleChangeCourse = (values:any) => {
		if(selectedValueCourse.includes('Все')===false && values.includes('Все') ){
			setSelectedValuesCourse(['Все']);
			return
		}
		setSelectedValuesCourse(values.filter((i:any)=>i!=='Все'))
	};

	const handleChangeSpecialty = (values:any) => {
		if(selectedValueSpecialty.includes('Все')===false && values.includes('Все') ){
			setSelectedValuesSpectialty(['Все']);
			return
		}
		setSelectedValuesSpectialty(values.filter((i:any)=>i!=='Все'))
	};

	const handleChangeKind = (values:any) => {
		if(selectedValueKind.includes('Все')===false && values.includes('Все') ){
			setSelectedValuesKind(['Все']);
			return
		}
		setSelectedValuesKind(values.filter((i:any)=>i!=='Все'))
	};

	function filterDataFull() {
		function filterCourse(elem: any) {
			if (selectedValueCourse?.includes('Все')) {
				return elem
			} else {
				return selectedValueCourse ? selectedValueCourse?.some((item:any)=>elem?.courseNumber === Number(item)) : null
			}
		}
		function filterLevel(elem: any) {
			if (selectedValuesLevel?.includes('Все')) {
				return elem
			} else {
				return selectedValuesLevel ? selectedValuesLevel?.some((item:any)=>elem?.educationLevel === (item)) : null
			}
		}
		function filterForm(elem: any) {
			if (selectedValueForm?.includes('Все')) {
				return elem
			} else {
				return selectedValueForm ? selectedValueForm?.some((item:any)=>elem?.educationType === (item)) : null
			}
		}
		function filterKind(elem: any) {
			if (selectedValueKind?.includes('Все')) {
				return elem
			} else {
				return selectedValueKind ? selectedValueKind?.some((item:any)=>elem?.practiceKind === (item)) : null
			}
		}
		function filterName(elem: any) {
			if (selectedValueSpecialty?.includes('Все')) {
				return elem
			} else {
				return selectedValueSpecialty ? selectedValueSpecialty?.some((item:any)=>elem?.specialtyName === (item)) : null
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
		

		return dataOneSchedule?.scheduleContent
			? dataOneSchedule?.scheduleContent
					.filter((elem: any) => filterCourse(elem))
					.filter((elem: any) => filterKind(elem))
					.filter((elem: any) => filterName(elem))
					.filter((elem: any) => filterLevel(elem))
					.filter((elem: any) => filterForm(elem))
					.sort((a: any, b: any) => sortDateFilling(a, b))
			: []
	}

	const downloadFile = () => {
		if (dataBlob) {
			const link = document.createElement('a')
			link.href = dataBlob
			link.setAttribute('download', `График проведения практик на ${year.split('=')[1].replace('-', '/')} учебный год ${dataOneSchedule?.subdivision} КФУ.docx`)
			document.body.appendChild(link)
			link.click()

			// window.URL.revokeObjectURL(dataBlob)
		}
	}

	function translateColumnsIntoRussia({ isPrint }: { isPrint?: boolean }) {
		const newData: any = []
		// const recordCompressedWithoutUndefinedElem = dataCreate.filter((elem:any) => elem !== undefined)

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

	const handleDelete = (idP: React.Key) => {
		if(tableData.length === 1) {
			const obj = {
					scheduleId:id,
					practiceId:idP
			}
			deleteRow(obj)
			deleteSchedule(id)
			nav('/services/practices/formingSchedule')
			return
		}
		const newData = tableData.filter((item: any) => item.id !== idP)
		setTableData(newData)
		const obj = {
			scheduleId:id,
			practiceId:idP
		}
		deleteRow(obj)
	}

	const arraySpec = [
        { key: 2244612, value: "Все", label: "Все" },
        ...(dataOneSchedule ? 
            dataOneSchedule?.scheduleContent.map((item:any) => ({
                key: item.id,
                value: item.specialtyName,
                label: item.specialtyName
            })) 
        : [])
    ];
	
    const arrayKind = [
        { key: 2244612, value: "Все", label: "Все" },
        ...(dataOneSchedule ?
            dataOneSchedule?.scheduleContent.map((item:any) => ({
                key: item.id,
                value: item.practiceKind,
                label: item.practiceKind
            }))
        : [])
    ];

	const uniqueSpecialityNames = Array.from(new Set(arraySpec.map(item => item.value)))
    .map(value => ({ value, label: value }));
    const uniqueKind           = Array.from(new Set(arrayKind.map(item => item.value)))
    .map(value => ({ value, label: value }));

	return (
		<section className="container animate-fade-in">
            <Form form={form} >
			<Row gutter={[16, 16]}>
				<Col span={24}>
					<Button
						size="large"
						style={{width:'48px'}}
						className="mt-1 mr-6 w-[48px] rounded-full border border-black"
						icon={<Vector />}
						type="text"
						onClick={() => {
							nav('/services/practices/formingSchedule')
						}}
					/>
					<Typography.Text className=" text-[28px] mb-14">
						График проведения практик на {year.split('=')[1].replace('-', '/')} учебный год подразделения "{dataOneSchedule?.subdivision}"" КФУ
					</Typography.Text>
				</Col>
			</Row>
			<Row gutter={[8, 16]} className="mt-12 w-full flex items-center overWrite">
				{/* {dataUserSubdivision?.value ? 
                <>
				<Col span={5}>
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
					
                </Col>
				</> : null} */}
				<Col span={4} className=''>
					<Typography.Text className='mobileFont'>Шифр и наименование специальности</Typography.Text>
				</Col>
				<Col span={8} className='overWrite grow'>
					<Select	
						mode='multiple'
						popupMatchSelectWidth={false}
						value={selectedValueSpecialty}
						className="w-full"
						options={uniqueSpecialityNames}
						onChange={value => {
							handleChangeSpecialty(value)
							setFilter({
								...filter,
								specialtyName: value
							})
						}}
					/>
				</Col>
			</Row>
			<Row gutter={[16, 0]} className="mt-4 flex items-center overWrite w-full  mrr mll">
				<Col span={1}>
					<Typography.Text className="whitespace-nowrap mobileFont">Курс</Typography.Text>
				</Col>
				<Col span={2} className='overWrite w-full'>
					<Select
						mode='multiple'
						popupMatchSelectWidth={false}
						value={selectedValueCourse}
						className="w-full"
						options={filterCourse}
						onChange={value => {
							handleChangeCourse(value)
							setFilter({
								...filter,
								courseNumber: value
							})
						}}
					/>
				</Col>
				<Col span={3}>
					<Typography.Text className='mobileFont'>Вид практики</Typography.Text>
				</Col>
				<Col span={6} className='overWrite w-full prr-0'>
					<Select
						mode='multiple'
						popupMatchSelectWidth={false}
						value={selectedValueKind}
						className="w-full"
						options={uniqueKind}
						onChange={value => {
							handleChangeKind(value)
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
					<Typography.Text className='mobileFont'>Уровень образования</Typography.Text>
				</Col>
				<Col span={8} className='overWrite grow'>
					<Select
						mode='multiple'
						popupMatchSelectWidth={false}
						value={selectedValuesLevel}
						className="w-full"
						options={filterLevel}
						onChange={value => {
							handleChangeLevel(value)
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
					<Typography.Text className='mobileFont'>Форма обучения</Typography.Text>
				</Col>
				<Col span={8} className='overWrite grow'>
					<Select
						mode='multiple'
						popupMatchSelectWidth={false}
						value={selectedValueForm}
						className="w-full"
						options={filterForm}
						onChange={value => {
							handleChangeForm(value)
							setFilter({
								...filter,
								educationType: value
							})
						}}
					/>
				</Col>
				{/* <Col span={7} offset={5}>
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
				</Col> */}
			</Row>
			<Row className="mt-4 mb-6 flex items-center ">
				<Col span={4} className=''>
					<div>
						<Space>
							<Button loading={isLoadingBlob || isFetchingBlob} disabled={isLoadingBlob || isFetchingBlob} onClick={downloadFile}>
								<VerticalAlignBottomOutlined /> Скачать
							</Button>
							{/* <Button disabled={isLoadingBlob} onClick={print}>
								<PrinterOutlined /> Печать
							</Button> */}
						</Space>
					</div>
				</Col>
				{/* <Col span={8} offset={4} className='overWrite'>
					<div className={'flex gap-2 items-center'}>
						<span className={'mr-2'}>Сортировка</span>
						<Select
							popupMatchSelectWidth={false}
							value={filter.dateFilling}
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

					{/* {stateSchedule.compressed && <CompressedView/>}
                    {stateSchedule.table && <TableView/>} */}
					{isLoadingOneSchedule  ? <Spin className='w-full mt-20' indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />   :
						<Table
							components={{
								body: {
									cell: EditableCell
								}
							}}
							bordered
							dataSource={tableData ? tableData?.map((item:any)=>{
                                return{
                                    ...item,
                                    period:  [dayjs(item.practiceStartDate), dayjs(item.practiceEndDate)]
                                }
                            }) : []}
							columns={mergedColumns}
							rowClassName="editable-row"
							pagination={tableData.length < 5 ? false : {
									pageSize: 5,					
							}}
							rowKey="id"
						/>
					}
				
            </Form>
		</section>
		
	)
}

export default EditSchedule
