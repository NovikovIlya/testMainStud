import { CheckOutlined, CloseOutlined, SearchOutlined, VerticalAlignBottomOutlined } from '@ant-design/icons'
import {
	Button,
	Col,
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
import type { TableProps } from 'antd'
import { FilterDropdownProps } from 'antd/es/table/interface'
import dayjs from 'dayjs'
import printJS from 'print-js'
import { useEffect, useRef, useState } from 'react'
import Highlighter from 'react-highlight-words'
import { useNavigate } from 'react-router-dom'

import { ArrowLeftSvg } from '../../../../assets/svg'
import { EditSvg } from '../../../../assets/svg/EditSvg'
import { FilterType, GetColumnSearchProps, Item } from '../../../../models/representation'

import { EditableCell } from './EditableCell'



const filterSpecialization: FilterType[] = [
	{
		value: 'Все',
		label: 'Все'
	},
	{
		value: '1',
		label: '1'
	}
]

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

	useEffect(() => {
		// if (isSuccessPractiseAll) {
		setTableData(filterDataFull())
		console.log('update')
		// @ts-ignore

		// }
	}, [filter])

	const getColumnSearchProps = (dataIndex: any): GetColumnSearchProps => ({
		filterDropdown: ({
			setSelectedKeys,
			selectedKeys,
			confirm,
			clearFilters,
			close
		}) => (
			<div style={{ padding: 8 }} onKeyDown={e => e.stopPropagation()}>
				<Input
					ref={searchInput}
					placeholder={`Search ${dataIndex}`}
					value={selectedKeys[0]}
					onChange={e =>
						setSelectedKeys(e.target.value ? [e.target.value] : [])
					}
					onPressEnter={() =>
						handleSearch(selectedKeys as string[], confirm, dataIndex)
					}
					style={{ marginBottom: 8, display: 'block' }}
				/>
				<Space>
					<Button
						type="primary"
						onClick={() =>
							handleSearch(selectedKeys as string[], confirm, dataIndex)
						}
						icon={<SearchOutlined />}
						size="small"
						style={{ width: 90 }}
					>
						Искать
					</Button>
					<Button
						onClick={() => clearFilters && handleReset(clearFilters)}
						size="small"
						style={{ width: 90 }}
					>
						Сбросить
					</Button>
					{/* <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button> */}
					{/* <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button> */}
				</Space>
			</div>
		),
		filterIcon: (filtered: boolean) => (
			<SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
		),
		onFilter: (value, record) =>
			record[dataIndex]
				.toString()
				.toLowerCase()
				.includes((value as string).toLowerCase()),
		onFilterDropdownOpenChange: visible => {
			if (visible) {
				setTimeout(() => searchInput.current?.select(), 100)
			}
		},
		render: text =>
			searchedColumn === dataIndex ? (
				<Highlighter
					highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
					searchWords={[searchText]}
					autoEscape
					textToHighlight={text ? text.toString() : ''}
				/>
			) : (
				text
			)
	})

	const columnsRepresentation = [
		{
			key: 'specialtyName',
			dataIndex: 'specialtyName',
			title: 'Шифр и иаименование документа',
			name: 'Шифр и иаименование документа',
			className: 'text-xs !p-2',
			...getColumnSearchProps('name')
		},
		{
			key: 'academicYear',
			dataIndex: 'academicYear',
			title: 'Учебный год',
			className: 'text-xs !p-2'
		},

		{
			key: 'groupNumber',
			dataIndex: 'groupNumber',
			title: 'Номер группы',
			className: 'text-xs !p-2'
		},
		{
			key: 'level',
			dataIndex: 'level',
			title: 'Уровень образования',
			className: 'text-xs !p-2',
			editable: true
		},
		{
			key: 'course',
			dataIndex: 'courseNumber',
			title: 'Курс',
			className: 'text-xs !p-2',
			editable: true
		}

		// {
		//   title: '',
		//   key: 'action',
		//   render: (_:any, record:any) => (
		//     <Space size="middle">
		//       <Button onClick={()=>hanldeSelectedPractise(record.id)}>Выбрать </Button>
		//     </Space>
		//   ),
		// },
	]

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
			className: 'text-xs !p-2'
		},

		{
			key: 'groupNumbers',
			dataIndex: 'groupNumbers',
			title: 'Номер группы',
			className: 'text-xs !p-2'
		},
		{
			key: 'place',
			dataIndex: 'place',
			title: 'Место прохождения практики',
			className: 'text-xs !p-2',
			editable: true
		},
		{
			key: 'FIO',
			dataIndex: 'FIO',
			title: 'ФИО руководителя от кафедры',
			className: 'text-xs !p-2'
		},
		{
			key: 'F',
			dataIndex: 'F',
			title: 'Суточные (50 руб/сут)',
			className: `text-xs !p-2 ${visiting? '' : 'hidden'}`,
			editable: true
		},
		{
			key: 'E',
			dataIndex: 'E',
			title: 'Проезд (руб)',
			className: `text-xs !p-2 ${visiting? '' : 'hidden'}`,
			editable: true
		},
		{
			key: 'C',
			dataIndex: 'C',
			title: 'Оплата проживания (руб)',
			className: `text-xs !p-2 ${visiting? '' : 'hidden'}`,
			editable: true
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

	function translateColumnsIntoRussia({ isPrint }: { isPrint?: boolean }) {
		const newData: any = []
		// const recordCompressedWithoutUndefinedElem = dataCreate.filter((elem:any) => elem !== undefined)
		const dataMock = [
			{
				specialityName: 'test',
				practiceKind: 'тест',
				dateFilling: '2021.09.10'
			}
		]
		for (let elem of dataMock) {
			const newObj = {
				'Шифр и наименование специальности': elem.specialityName,
				'Дата заполнения': dayjs(elem.dateFilling).format('YYYY.MM.DD'),
				'Вид практики': elem.practiceKind
			}

			newData.push(newObj)
		}

		return newData
	}

	const print = () => {
		function properties() {
			return [
				'Шифр и наименование специальности',
				'Дата заполнения',
				'Вид практики'
			]
		}
		printJS({
			printable: translateColumnsIntoRussia({ isPrint: true }),
			properties: properties(),
			type: 'json',
			style: 'body {font-size: 10px}'
		})
	}

	const edit = (record: Partial<Item> & { key: React.Key }) => {
		form.setFieldsValue({ name: '', age: '', address: '', ...record })
		setEditingKey(record.key)
		// setCurrentRowValues(record);
	}

	const cancel = () => {
		setEditingKey('')
	}

	const deleteRow = () => {}
	const formatDateRange = (dateRange: any) => {
		console.log('dateRange', dateRange)
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

			const newData = [...data]
			const index = newData.findIndex(item => key === item.key)
			if (index > -1) {
				const item = newData[index]
				newData.splice(index, 1, {
					...item,
					...row
				})
				setData(newData)
				setTableData(newData)
				setEditingKey('')
				console.log('1', newData[index])
			} else {
				// если новая запись
				newData.push(row)
				setData(newData)
				setTableData(newData)
				setEditingKey('')
			}
		} catch (errInfo) {
			console.log('Validate Failed:', errInfo)
		}
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
			
			{/* {selectedPractice ? (
				<Row className='items-end'>
					<Col span={12} flex="50%" className="mt-4 mobileFirst">
					<Radio.Group defaultValue="compressedView" buttonStyle="solid">
						<Radio.Button value="compressedView" className="!rounded-l-full" onClick={()=>setVisiting(false)}>
							Невыездная практика
						</Radio.Button>
						<Radio.Button value="tableView" className="!rounded-r-full" onClick={()=>setVisiting(true)}>
							Выездная практика
						</Radio.Button>
					</Radio.Group>
				</Col>
				<Col span={7} offset={5}>
					<Space className="w-full flex-row-reverse">
						<Button
							type="primary"
							className="!rounded-full"
							onClick={() => {
								
							}}
						>
							Добавить
						</Button>
					</Space>
				</Col>
				</Row>
			) : (
				''
			)} */}
			<Row className="mt-4 mb-6 flex  ">
				<Col span={12} >
					<div>
						<Space>
							<Button >
								<VerticalAlignBottomOutlined /> Скачать
							</Button>
							{/* <Button disabled={isLoadingBlob} onClick={print}>
								<PrinterOutlined /> Печать
							</Button> */}
						</Space>
					</div>
				</Col>
				
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
									dataSource={tableData ? tableData : []}
									columns={mergedColumns}
									rowClassName="editable-row"
									pagination={false}
									rowKey="id"
								/>
							</Form>
						</Col>
					</Row>
				</>
			) 
		</section>
	)
}

export default EditRepresentation
