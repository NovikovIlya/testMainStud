import { CheckOutlined, CloseOutlined, LoadingOutlined } from '@ant-design/icons'
import {
	Button,
	Col,
	Descriptions,
	Divider,
	Form,
	Input,
	Popconfirm,
	Radio,
	Result,
	Row,
	Select,
	Space,
	Spin,
	Steps,
	Table,
	Typography
} from 'antd'
import type { DescriptionsProps, TableProps } from 'antd'
import dayjs from 'dayjs'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { ArrowLeftSvg } from '../../../../assets/svg'
import { EditSvg } from '../../../../assets/svg/EditSvg'
import { Vector } from '../../../../assets/svg/Vector'
import { Item } from '../../../../models/representation'
import { useAppDispatch } from '../../../../store'
import { useGetPracticesAllQuery } from '../../../../store/api/practiceApi/individualTask'
import {
	useAddSubmissionAgreementMutation,
	useAddSubmissionMutation,
	useGetAllSubmissionsQuery,
	useGetDocRepresentationQuery,
	useGetStudentsQuery
} from '../../../../store/api/practiceApi/representation'
import { changeStatus, changeStatusTrue, showNotification } from '../../../../store/reducers/notificationSlice'

import { EditableCell } from './EditableCell'
import PracticeModal from './practicalModal'
import TableEdit from './tableEdit'

const optionMock = [
	{ value: 'контракт', label: 'контракт' },
	{ value: 'бюджет', label: 'бюджет' }
]
const optionMockSelect = [
	{
		value: 'В профильной организации',
		label: 'В профильной организации'
	},
	{
		value: 'На кафедре КФУ',
		label: 'На кафедре КФУ'
	},
	{
		value: 'В структурном подразделении КФУ',
		label: 'В структурном подразделении КФУ'
	}
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

export const CreateRepresentation = () => {
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
	const [editingKey, setEditingKey] = useState('')
	const isEditing = (record: Item) => record.key === editingKey
	const [isModalOpenOne, setIsModalOpenOne] = useState(true)
	const [selectedPractice, setSelectedPractice] = useState<any>(null)
	const [visiting, setVisiting] = useState(false)
	const [value, setValue] = useState(1)
	const [theme, setTheme] = useState('')
	const [sendSubmission, { isLoading: isLoadingAddSub }] = useAddSubmissionMutation()
	const [sendSubmissionaAgeement, { isLoading: isLoadingAddSubAgreement }] = useAddSubmissionAgreementMutation()
	const {data: dataGetStudents,isSuccess: isSuccessGetStudents,isLoading: isLoadingStudents} = useGetStudentsQuery(selectedPractice, { skip: !selectedPractice })
	const { data: dataAllSubmissions } = useGetAllSubmissionsQuery(selectedPractice, { skip: !selectedPractice })
	const [fullTable, setFullTable] = useState<any>([])
	const [fullSelectedPractise, setFullSelectedPractise] = useState<any>([])
	const { data: dataAllPractise, isSuccess: isSuccessAllPractice } = useGetPracticesAllQuery(selectedPractice, {skip: !selectedPractice})
	const [data, setData] = useState(fullTable)
	const [step, setStep] = useState(0)
	const [selectedPlace, setSelecectedPlace] = useState('В профильной организации')
	const dispatch = useAppDispatch()

	
	useEffect(() => {
		if (isSuccessGetStudents) {
			const newArray = dataGetStudents?.map((item: any) => ({
				name: item.name,
				studentId : item.studentId,
				costForDay: null,
				arrivingCost: null,
				livingCost: null,
				place: null,
				placeTwo: null,
				category: item.category,
				categoryId: item.categoryId,
				departmentDirector: fullSelectedPractise.departmentDirector,
				groupNumber: fullSelectedPractise.groupNumber
			}))
			setFullTable(newArray.map((item: any) => ({ key: item.name, ...item })))
			setStep(1)
		}
	}, [isSuccessGetStudents, isSuccessAllPractice, dataGetStudents, dataAllPractise])

	useEffect(() => {
		if (!visiting) {
			if (selectedPlace !== 'В профильной организации') {
				setStep(2)
			}
			if (isSuccessGetStudents && fullTable.length > 0) {
				if (visiting) {
					if (
						fullTable.every(
							(item: any) =>
								item.place !== null ||
								item.arrivingCost !== null ||
								item.livingCost !== null ||
								item.costForDay !== null
						)
					) {
						setStep(2)
					}
				}
				// if(fullTable.every((item:any)=>item.place!==null )){
				// 	setStep(2)
				// }
			}
		}
		if (visiting) {
			if (isSuccessGetStudents && fullTable.length > 0) {
				if (selectedPlace === 'В профильной организации') {
					if (
						fullTable.every(
							(item: any) => item.place !== null && item.arrivingCost !== null && item.livingCost !== null
						)
					) {
						setStep(2)
					} else {
						setStep(1)
					}
				} else {
					if (fullTable.every((item: any) => item.arrivingCost !== null && item.livingCost !== null)) {
						setStep(2)
					} else {
						setStep(1)
					}
				}
			}
		}
	}, [fullTable, isSuccessGetStudents, visiting])

	useEffect(() => {
		dispatch(changeStatusTrue())
	}, [])

	const items: DescriptionsProps['items'] = [
		{
			key: '1',
			label: 'Подразделение',
			children: fullSelectedPractise ? fullSelectedPractise.subdivision : ''
		},
		{
			key: '2',
			label: 'Наименование специальности',
			children: fullSelectedPractise ? fullSelectedPractise.specialtyName : ''
		},

		{
			key: '4',
			label: 'Вид',
			children: fullSelectedPractise ? fullSelectedPractise.practiceKind : ''
		},
		{
			key: '5',
			label: 'Курс',
			children: fullSelectedPractise ? fullSelectedPractise.courseNumber : ''
		},
		{
			key: '5',
			label: 'Тип',
			children: fullSelectedPractise ? fullSelectedPractise.practiceType : ''
		},

		{
			key: '7',
			label: 'Статус',
			children: 'В ожидании'
		}
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
			key: 'nane',
			dataIndex: 'name',
			title: 'ФИО обучающегося',
			name: 'ФИО обучающегося',
			className: 'text-xs !p-2'
		},

		{
			key: 'groupNumber',
			dataIndex: 'groupNumber',
			title: 'Номер группы',
			className: 'text-xs !p-2'
		},
		{
			key: 'place',
			dataIndex: 'place',
			title: 'Где будет проходить практика',
			className: 'text-xs !p-2',
			editable: true
		},
		{
			key: 'placeTwo',
			dataIndex: 'placeTwo',
			title: 'Место прохождения практики',
			className: 'text-xs !p-2',
			editable: true
		},
		{
			key: 'departmentDirector',
			dataIndex: 'departmentDirector',
			title: 'ФИО руководителя от кафедры',
			className: 'text-xs !p-2'
		},
		{
			key: 'category',
			dataIndex: 'category',
			title: 'Категория',
			className: `text-xs !p-2 ${visiting ? '' : 'hidden'}`
			// editable: true
		},
		{
			key: 'costForDay',
			dataIndex: 'costForDay',
			title: 'Суточные (50 руб/сут)',
			className: `text-xs !p-2 ${visiting ? '' : 'hidden'}`,
			editable: true
		},
		{
			key: 'arrivingCost',
			dataIndex: 'arrivingCost',
			title: 'Проезд (руб)',
			className: `text-xs !p-2 ${visiting ? '' : 'hidden'}`,
			editable: true
		},
		{
			key: 'livingCost',
			dataIndex: 'livingCost',
			title: 'Оплата проживания (руб)',
			className: `text-xs !p-2 ${visiting ? '' : 'hidden'}`,
			editable: true
		},
		{
			title: '',
			dataIndex: 'operation',
			render: (_: any, record: Item) => {
				const editable = isEditing(record)
				return editable ? (
					<div className="flex justify-around items-center w-[60px]">
						<Typography.Link onClick={() => save(record.key)} style={{ marginRight: 8 }}>
							<CheckOutlined style={{ color: '#75a4d3' }} />
						</Typography.Link>
						<Popconfirm title="Вы действительно хотите отменить действие?" onConfirm={cancel}>
							<CloseOutlined style={{ color: '#75a4d3' }} />
						</Popconfirm>
					</div>
				) : (
					<div className="flex justify-around items-center  w-[60px]">
						<Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
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
					col.dataIndex === 'place'
						? 'select'
						: col.dataIndex === 'costForDay'
						? 'number'
						: col.dataIndex === 'arrivingCost'
						? 'number'
						: col.dataIndex === 'livingCost'
						? 'number'
						: col.dataIndex === 'course'
						? 'number'
						: 'text',
				dataIndex: col.dataIndex,
				title: col.title,
				editing: isEditing(record),
				options:
					col.dataIndex === 'category'
						? optionMock
						: col.dataIndex === 'selectType'
						? optionMockType
						: col.dataIndex === 'selectKind'
						? optionMockKind
						: undefined,
				rules:
					visiting === false
						? col.dataIndex === 'place'
							? [
									{
										required: true,
										message: 'Поле обязательно для заполнения'
									}
							  ]
							: []
						: col.dataIndex === 'place' ||
						  col.dataIndex === 'costForDay' ||
						  col.dataIndex === 'arrivingCost' ||
						  col.dataIndex === 'livingCost'
						? [
								{
									required: true,
									message: 'Поле обязательно для заполнения'
								}
						  ]
						: []
			})
		}
	})

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
				// setData(newData)
				setTableData(newData)
				setFullTable(newData)
				setEditingKey('')
				console.log('1', newData[index])
			} else {
				// если новая запись
				newData.push(row)
				// setData(newData)
				setTableData(newData)
				setFullTable(newData)
				setEditingKey('')
				console.log('222222', newData[index])
			}
		} catch (errInfo) {
			console.log('Validate Failed:', errInfo)
		}
	}

	const hanldeSelectedPractise = (id: any) => {
		setSelectedPractice(id)
		setStep(1)
		setIsModalOpenOne(false)
	}

	const showModalOne = () => {
		setIsModalOpenOne(true)
	}

	const handleOkOne = () => {
		setIsModalOpenOne(false)
	}

	const handleCancelOne = () => {
		setIsModalOpenOne(false)
	}

	const handleRowClick = (record: any) => {
		hanldeSelectedPractise(record.id)
		setFullSelectedPractise(record)
	}

	const onChange = (e: any) => {
		setValue(e.target.value)
	}

	const sendData = () => {
		if (!selectedPlace) {
			return dispatch(showNotification({ message: `Выберите где будет проходить практика`, type: 'warning' }))
		}
		if (selectedPlace === 'В профильной организации') {
			if (fullTable.some((item: any) => item.place === null)) {
				return dispatch(
					showNotification({
						message: `Для сохранения необходимо заполнить "Место прохождение практики" ${
							visiting ? `,  "Суточные", "Проезд" и "Оплата проживания"` : ''
						}`,
						type: 'warning'
					})
				)
			}
			if (visiting) {
				if (
					fullTable.some(
						(item: any) => item.costForDay === null || item.arrivingCost === null || item.livingCost === null
					)
				) {
					return dispatch(
						showNotification({
							message: `Для сохранения необходимо заполнить "Место прохождение практики" ${
								visiting ? `,  "Суточные", "Проезд" и "Оплата проживания"` : ''
							}`,
							type: 'warning'
						})
					)
				}
			}
		}
		const tableDataStudent = fullTable.map((item: any) => ({
			studentId :item.studentId ,
			costForDay: item.costForDay,
			arrivingCost: item.arrivingCost,
			livingCost: item.livingCost,
			name: item.name,
			place:
				selectedPlace === 'На кафедре КФУ' || selectedPlace === 'В структурном подразделении КФУ'
					? selectedPlace
					: item.place,
			category: item.category
		}))
		const obj = {
			practiceId: selectedPractice,
			isWithDeparture: visiting ? true : false,
			theme: theme,
			students: tableDataStudent
		}

		sendSubmissionaAgeement(obj)
			.unwrap()
			.then(() => {
				nav('/services/practices/representation')
			})
			.catch(error => {
				if (error.status === 409) {
					dispatch(showNotification({ message: 'Такое представление уже имеется, создайте другое', type: 'error' }))
				}
				console.log(error)
			})
	}
	const sendDataTwo = () => {
		console.log('fullTablefullTable', fullTable)
		if (!selectedPlace) {
			return dispatch(showNotification({ message: `Выберите где будет проходить практика`, type: 'warning' }))
		}
		if (selectedPlace === 'В профильной организации') {
			if (fullTable.some((item: any) => item.place === null)) {
				return dispatch(
					showNotification({
						message: `Для сохранения необходимо заполнить "Место прохождение практики" ${
							visiting ? `,  "Суточные", "Проезд" и "Оплата проживания"` : ''
						}`,
						type: 'warning'
					})
				)
			}
			if (visiting) {
				if (
					fullTable.some(
						(item: any) => item.costForDay === null || item.arrivingCost === null || item.livingCost === null
					)
				) {
					return dispatch(
						showNotification({
							message: `Для сохранения необходимо заполнить "Место прохождение практики" ${
								visiting ? `,  "Суточные", "Проезд" и "Оплата проживания"` : ''
							}`,
							type: 'warning'
						})
					)
				}
			}
		}
		const tableDataStudent = fullTable.map((item: any) => ({
			costForDay: item.costForDay,
			arrivingCost: item.arrivingCost,
			livingCost: item.livingCost,
			name: item.name,
			place:
				selectedPlace === 'На кафедре КФУ' || selectedPlace === 'В структурном подразделении КФУ'
					? selectedPlace
					: item.place,
			category: item.category
		}))
		const obj = {
			practiceId: selectedPractice,
			isWithDeparture: visiting ? true : false,
			theme: theme,
			students: tableDataStudent
		}
		console.log('obj',obj)
		// sendSubmission(obj)
		// 	.unwrap()
		// 	.then(() => {
		// 		nav('/services/practices/representation')
		// 	})
		// 	.catch(error => {
		// 		if (error.status === 409) {
		// 			dispatch(showNotification({ message: 'Такое представление уже имеется, создайте другое', type: 'error' }))
		// 		}
		// 		console.log(error)
		// 	})
	}

	const okayModal = () => {
		showModalOne()
	}

	return (
		<Spin spinning={isLoadingAddSub}>
			<section className="container ">
				<Row gutter={[16, 16]}>
					<Col span={24}>
						<Button
							size="large"
							style={{ width: '48px' }}
							className="mt-1 mr-6 w-[48px] rounded-full border border-black"
							icon={<Vector />}
							type="text"
							onClick={() => {
								nav('/services/practices/representation')
							}}
						/>
						<Typography.Text className=" text-[28px] mb-14">Добавление представления в приказ</Typography.Text>
					</Col>
				</Row>

				<Row className="mt-7 flex items-center justify-between">
					<Col span={12} className="justify-start flex overWrite">
						<Steps
							className="mt-6 mb-6"
							size="default"
							current={step}
							items={[
								{
									title: 'Выберите практику'
								},
								{
									title: 'Заполните данные'
								},
								{
									title: 'Сохраните'
								}
							]}
						/>
					</Col>

					<Col span={12} className="justify-start sm:justify-end flex overWrite">
						<div>
							<Space>
								{selectedPractice ? (
									<Popconfirm
										title="Редактирование"
										description="Вы уверены, что хотите изменить практику? Все данные будут удалены."
										onConfirm={okayModal}
										okText="Да"
										cancelText="Нет"
									>
										<Button>Изменить практику</Button>
									</Popconfirm>
								) : (
									<Button onClick={showModalOne}>Выбрать практику</Button>
								)}
							</Space>
						</div>
					</Col>
				</Row>
				<Divider />
				{selectedPractice ? (
					<>
						<Descriptions className="mt-8" items={items} />
						<Divider />
						<Row className="items-end mb-7">
							<Col span={12} flex="50%" className=" mobileFirst">
								<Radio.Group onChange={onChange} value={value}>
									<Space direction="vertical">
										<Radio value={1} onClick={() => setVisiting(false)}>
											Невыездная практика
										</Radio>
										<Radio value={2} onClick={() => setVisiting(true)}>
											Выездная практика
										</Radio>
									</Space>
								</Radio.Group>
							</Col>
						</Row>
						<Row className="items-center flex gap-2">
							<Col>
								<span>Где будет проходить практика</span>
							</Col>
							<Col span={3}>
								<Select
									value={selectedPlace}
									onChange={value => {
										setSelecectedPlace(value)
										if (value === 'На кафедре КФУ' || value === 'В структурном подразделении КФУ') {
											if (!visiting) {
												setStep(2)
											}
										}
										if (value === 'В профильной организации') {
											if (fullTable.every((item: any) => item.place === null)) {
												setStep(1)
											}
										}
									}}
									options={optionMockSelect}
								/>
							</Col>
						</Row>
					</>
				) : (
					''
				)}

				{visiting ? (
					<Row className="mt-4">
						<Col span={1} className="flex items-center">
							<label htmlFor="topic">Тема:</label>
						</Col>
						<Col span={3} className="">
							<Input id="topic" placeholder="" onChange={e => setTheme(e.target.value)} />
						</Col>
					</Row>
				) : (
					''
				)}

				<PracticeModal
					selectedPractice={selectedPractice}
					isModalOpenOne={isModalOpenOne}
					handleOkOne={handleOkOne}
					handleCancelOne={handleCancelOne}
					setFilter={setFilter}
					filter={filter}
					handleRowClick={handleRowClick}
					tableRef={tableRef}
					tableData={tableData}
				/>

				{selectedPractice ? (
					isLoadingStudents ? (
						<Spin className="w-full mt-20" indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
					) : (
						<>
							<Row className="mt-4">
								<Col flex={'auto'}>
									<Form form={form} component={false}>
										<TableEdit
											selectedPlace={selectedPlace}
											visiting={visiting}
											fullTable={fullTable}
											setFullTable={setFullTable}
											create={true}
										/>
									</Form>
								</Col>
							</Row>
							<Row className="mt-[-68px] flex gap-4 mb-10">
								<Col className=" mt-6">
									<Space className=" ">
										<Button
											type="primary"
											className="!rounded-full"
											onClick={() => {
												sendData()
											}}
										>
											Отправить на согласование
										</Button>
									</Space>
								</Col>
								<Col className=" mt-6">
									<Space className="w-full ">
										<Button
											className="!rounded-full"
											onClick={() => {
												sendDataTwo()
											}}
										>
											Сохранить со статусом "Новый"
										</Button>
									</Space>
								</Col>
							</Row>
						</>
					)
				) : // <Result title="Выберите практику чтобы добавить представление" />
				null}
			</section>
		</Spin>
	)
}

export default CreateRepresentation
