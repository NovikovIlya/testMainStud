import { CheckOutlined, CloseOutlined, SearchOutlined, VerticalAlignBottomOutlined } from '@ant-design/icons'
import {
	Button,
	Col,
	Descriptions,
	Form,
	Input,
	Modal,
	Popconfirm,
	Radio,
	Result,
	Row,
	Select,
	Space,
	Table,
	Typography
} from 'antd'
import type { DescriptionsProps, TableProps } from 'antd'
import { FilterDropdownProps } from 'antd/es/table/interface'
import dayjs from 'dayjs'
import printJS from 'print-js'
import { useEffect, useRef, useState } from 'react'
import Highlighter from 'react-highlight-words'
import { useLocation, useNavigate } from 'react-router-dom'

import { ArrowLeftSvg } from '../../../../assets/svg'
import { EditSvg } from '../../../../assets/svg/EditSvg'
import { FilterType, GetColumnSearchProps, Item } from '../../../../models/representation'

import { EditableCell } from './EditableCell'
import { useEditSubmissionMutation, useGetDocRepresentationQuery, useGetOneSubmissionsQuery } from '../../../../store/api/practiceApi/representation'


const optionMock = [
	{ value: '1', label: '1' },
	{ value: '2', label: '2' },
	{ value: '3', label: '3' }
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

export const EditRepresentation = () => {
	const path = useLocation()
	const id = path.pathname.split('/').at(-1)!
	const tableRef = useRef(null)
	const originData: any = [
		{
			id: 'czxczxc',
			key: 'czxczxc',
			specialtyName: 'jim',
			academicYear: '2024',
			address: 'Kazan',
			period: [dayjs('2024-07-01'), dayjs('2024-07-15')],
			courseNumber: '1',
			type: null,
			dateFilling: '2024-07-30',
			selectKind: 'Производственная',
      subdivision: '',
      groupNumber: '1',
      level: 'бакалавр'
		},
		{
			id: 'bbq',
			key: 'bbq',
			specialtyName: 'jon',
			academicYear: '2030',
			address: 'Moscw',
			period: null,
			courseNumber: '2',
			type: null,
			dateFilling: '2024-07-29',
			selectKind: 'Производственная',
      groupNumber: '1',
       level: 'бакалавр'
		},
		{
			id: 'ccx',
			key: 'ccx',
			specialtyName: 'jen',
			academicYear: '2030',
			address: 'Moscw',
			period: null,
			courseNumber: '1',
			type: null,
			dateFilling: '2024-07-28',
			selectKind: 'Производственная',
      groupNumber: '2',
       level: 'ордин'
		}
	]
	const nav = useNavigate()
	const [tableData, setTableData] = useState<any>(originData)
	const [filter, setFilter] = useState<any>({
		type: '',
		spec: '',
		courseNumber: 'Все',
		level: 'Все',
		form: '',
		dateFilling: 'По дате (сначала новые)',
		selectKind: 'Все',
		specialtyName: 'Все',
    subdivision: 'Все',
    academicYear: 'Все',
    groupNumber: 'Все'
	})
	const [form] = Form.useForm()
	const [data, setData] = useState(originData)
	const [editingKey, setEditingKey] = useState('')
	const isEditing = (record: Item) => record.key === editingKey
	const [searchText, setSearchText] = useState('')
	const [searchedColumn, setSearchedColumn] = useState('')
	const searchInput = useRef<any>(null)
	const [selectedPractice, setSelectedPractice] = useState<any>(null)
	const [visiting,setVisiting] = useState(false)
	const {data:dataOneSubmissions,isSuccess} = useGetOneSubmissionsQuery(id,{skip:!id})
	const {data:dataGetDocRepresentation,isLoading:isLoadingDocRepesentation} = useGetDocRepresentationQuery(null)
	const [editSumbissions,{}] = useEditSubmissionMutation({})
	const [fullTable,setFullTable] = useState<any>([])
	const [editTheme,setEditTheme] = useState(dataOneSubmissions?.theme)

	useEffect(() => {
		// if (isSuccessPractiseAll) {
		setTableData(filterDataFull())
		console.log('update')
		// @ts-ignore

		// }
	}, [filter])

	useEffect(()=>{
		if(isSuccess){
			const obj = dataOneSubmissions.map((item:any)=>{
				return item.students
			})
			setFullTable(obj)
		}
	},[dataOneSubmissions,isSuccess])


	const columns = [
		{
			key: 'number',
			dataIndex: 'number',
			title: '№',
			className: 'text-xs !p-2',
			render: (text: any, record: any, index: any) => <div>{index + 1}</div>
		},
		{
			key: 'student',
			dataIndex: 'student',
			title: 'ФИО обучающегося',
			name: 'ФИО обучающегося',
			className: 'text-xs !p-2',
			render: (text: any, record: any) => (
				<div>{record?.students?.name || 'Нет челибаса...'}</div>
			)
		},

		{
			key: 'groupNumbers',
			dataIndex: 'groupNumbers',
			title: 'Номер группы',
			className: 'text-xs !p-2',
			render: (text: any, record: any) => (
				<div>{record?.groupNumber || 'Нет челибаса...'}</div>
			)
		},
		{
			key: 'place',
			dataIndex: 'place',
			title: 'Место прохождения практики',
			className: 'text-xs !p-2',
			editable: true,
			render: (text: any, record: any) => (
				<div>{record?.students?.place || 'Нет челибаса...'}</div>
			)
		},
		{
			key: 'FIO',
			dataIndex: 'FIO',
			title: 'ФИО руководителя от кафедры',
			className: 'text-xs !p-2',
			render: (text: any, record: any) => (
				<div>{record?.practice?.departmentDirector || 'Нет челибаса...'}</div>
			)
		},
		{
			key: 'A',
			dataIndex: 'A',
			title: 'Категория',
			className: `text-xs !p-2 ${isSuccess ? dataOneSubmissions.isWithDeparture ? '' : 'hidden' : 'hidden'}`,
			editable: true,
			render: (text: any, record: any) => (
				<div>{record?.students?.category || 'Нет челибаса...'}</div>
			)
		},
		{
			key: 'F',
			dataIndex: 'F',
			title: 'Суточные (50 руб/сут)',
			className: `text-xs !p-2 ${isSuccess ? dataOneSubmissions.isWithDeparture ? '' : 'hidden' : 'hidden'}`,
			editable: true,
			render: (text: any, record: any) => (
				<div>{record?.students?.costForDay || 'Нет челибаса...'}</div>
			)
		},
		{
			key: 'E',
			dataIndex: 'E',
			title: 'Проезд (руб)',
			className: `text-xs !p-2 ${isSuccess ? dataOneSubmissions.isWithDeparture ? '' : 'hidden' : 'hidden'}`,
			editable: true,
			render: (text: any, record: any) => (
				<div>{record?.students?.arrivingCost || 'Нет челибаса...'}</div>
			)
		},
		{
			key: 'C',
			dataIndex: 'C',
			title: 'Оплата проживания (руб)',
			className: `text-xs !p-2 ${isSuccess ? dataOneSubmissions.isWithDeparture ? '' : 'hidden' : 'hidden'}`,
			editable: true,
			render: (text: any, record: any) => (
				<div>{record?.students?.livingCost || 'Нет челибаса...'}</div>
			)
		},
		
		{
			title: '',
			dataIndex: 'operation',
			className: `text-xs !p-2 ${isSuccess ? dataOneSubmissions.status==='' ? '' : 'hidden' : ''}`,
			key: 'operation',
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
						<Typography.Link
							disabled={editingKey !== ''}
							onClick={() => edit(record)}
						>
							<EditSvg />
						</Typography.Link>
						{/* <Popconfirm title="Вы действительно хотите удалить?" onConfirm={deleteRow}>
                  <a><DeleteRedSvg/></a>
              </Popconfirm> */}
					</div>
				)
			}
		}
	]

	const items: DescriptionsProps['items'] = [
		{
		  key: '1',
		  label: 'Подразделение',
		  children: isSuccess ? dataOneSubmissions.subdivision : '',
		},
		{
		  key: '2',
		  label: 'Наименование специальности',
		  children: 'Акушерство',
		},
		{
		  key: '3',
		  label: 'Профиль',
		  children: 'Акушер',
		},
		{
		  key: '4',
		  label: 'Форма обучения',
		  children: 'Очная',
		},
		{
		  key: '5',
		  label: 'Курс',
		  children: '1',
		},
		{
			key: '5',
			label: 'Тип',
			children: '1',
		},
		{
			key: '6',
			label: 'Тема',
			children:  isSuccess ? dataOneSubmissions.status : '',
		},
		{
			key: '7',
			label: 'Статус',
			children:  isSuccess ? dataOneSubmissions.theme : '',
		},
	];

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
					col.dataIndex === 'selectCourse'
						? 'select'
						: col.dataIndex === 'selectType'
						? 'select'
						: col.dataIndex === 'selectKind'
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
					col.dataIndex === 'selectCourse'
						? optionMock
						: col.dataIndex === 'selectType'
						? optionMockType
						: col.dataIndex === 'selectKind'
						? optionMockKind
						: undefined,
				rules: col.dataIndex === 'F' || col.dataIndex === 'E' || col.dataIndex === 'C' ? [] :  [{ required: true, message: `Заполните "${col.title}"!` }]
			})
		}
	})


	const handleSearch = (
		selectedKeys: string[],
		confirm: FilterDropdownProps['confirm'],
		dataIndex: any
	) => {
		confirm()
		setSearchText(selectedKeys[0])
		setSearchedColumn(dataIndex)
	}

	const downloadFile = () => {
		if (dataGetDocRepresentation) {
			const link = document.createElement('a')
			link.href = dataGetDocRepresentation
			link.setAttribute('download', 'downloaded-file.docx')
			document.body.appendChild(link)
			link.click()

			// window.URL.revokeObjectURL(dataBlob)
		}
	}

	const handleReset = (clearFilters: () => void) => {
		clearFilters()
		setSearchText('')
	}

	function filterDataFull() {
		function filterCourse(elem: any) {
			if (filter.courseNumber === 'Все') {
				return elem
			} else {
				return elem.courseNumber === filter.courseNumber
			}
		}
    function filterSubdivision(elem: any) {
			if (filter.courseNumber === 'Все') {
				return elem
			} else {
				return elem.courseNumber === filter.courseNumber
			}
		}
		function filterKind(elem: any) {
			if (filter.selectKind === 'Все') {
				return elem
			} else {
				// @ts-ignore
				return elem.selectKind === filter.selectKind
			}
		}
    function filterAcademicYeary(elem: any) {
			if (filter.academicYear === 'Все') {
				return elem
			} else {
				// @ts-ignore
				return elem.academicYear === filter.academicYear
			}
		}
    function filterNumber(elem: any) {
			if (filter.groupNumber === 'Все') {
				return elem
			} else {
				// @ts-ignore
				return elem.groupNumber === filter.groupNumber
			}
		}
		function filterspecialtyName(elem: any) {
			if (filter.specialtyName === 'Все') {
				return elem
			} else {
				// @ts-ignore
				return elem.specialtyName === filter.specialtyName
			}
		}
    function filtersLevel(elem: any) {
			if (filter.level === 'Все') {
				return elem
			} else {
				// @ts-ignore
				return elem.level === filter.level
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

		return originData
			? originData
					.filter((elem: any) => filterCourse(elem))
					.filter((elem: any) => filterKind(elem))
					.filter((elem: any) => filterspecialtyName(elem))
          .filter((elem: any) => filterSubdivision(elem))
          .filter((elem: any) => filterAcademicYeary(elem))
          .filter((elem: any) => filterNumber(elem))
          .filter((elem: any) => filtersLevel(elem))
					.sort((a: any, b: any) => sortDateFilling(a, b))
			: []
	}

	const edit = (record: Partial<Item> & { key: React.Key }) => {
		form.setFieldsValue({ name: '', age: '', address: '', ...record })
		setEditingKey(record.key)
		// setCurrentRowValues(record);
	}

	const cancel = () => {
		setEditingKey('')
	}

	const save = async (key: React.Key) => {
		try {
			const row = (await form.validateFields()) as Item

			const newData = [...fullTable]
			const index = newData.findIndex(item => key === item.key)
			if (index > -1) {
				const item = newData[index]
				newData.splice(index, 1, {
					...item,
					...row
				})
				setData(newData)
				setTableData(newData)
				setFullTable(newData)
				setEditingKey('')
				console.log('1', newData[index])
			} else {
				// если новая запись
				newData.push(row)
				setData(newData)
				setTableData(newData)
				setFullTable(newData)
				setEditingKey('')
			}
		} catch (errInfo) {
			console.log('Validate Failed:', errInfo)
		}
	}

	const editData = ()=>{
		const arrayT: any = []
		const obj = arrayT.map((item:any)=>{
			return {
				students: fullTable.map(({key,...rest}:any)=>rest),
				id: dataOneSubmissions.id,
				theme: dataOneSubmissions.theme,
			}
		})
		editSumbissions(obj)
	}


	return (
		<section className="container">
			<Row gutter={[16, 16]}>
				<Col span={24}>
					<Button
						size="large"
						className="mt-1"
						icon={<ArrowLeftSvg className="w-4 h-4 cursor-pointer mt-1" />}
						type="text"
						onClick={() => {
							nav('/services/practices/representation')
						}}
					/>
					<Typography.Text className=" text-[28px] mb-14">
						Представление в приказ ...
					</Typography.Text>
				</Col>
			</Row>
			<Descriptions className='mt-8'  items={items} />
			<Row className="mt-4 mb-6 flex  ">
				<Col span={12} >
					<div>
						<Space>
							<Button onClick={downloadFile} loading={isLoadingDocRepesentation} disabled={isLoadingDocRepesentation}>
								<VerticalAlignBottomOutlined /> Скачать
							</Button>
						</Space>
					</div>
				</Col>
				{isSuccess && dataOneSubmissions.theme==='' ?
				<Col span={7} offset={5}>
					<Space className="w-full flex-row-reverse">
						<Button
							type="primary"
							className="!rounded-full"
							onClick={() => {
								editData()
							}}
						>
							Сохранить
						</Button>
					</Space>
				</Col> : ''}
			</Row>
				<>
					<Row className="mt-4">
						<Col flex={'auto'}>
							<Form form={form} component={false}>
								
								<Table
									ref={tableRef}
									components={{
										body: {
											cell: EditableCell
										}
									}}
									bordered
									dataSource={fullTable}
									
									columns={mergedColumns}
									rowClassName="editable-row"
									pagination={false}
									rowKey="id"
								/>
							</Form>
						</Col>
					</Row>
				</>	
		</section>
	)
}

export default EditRepresentation
