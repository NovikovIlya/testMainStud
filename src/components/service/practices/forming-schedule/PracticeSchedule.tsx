// import {
// 	CheckOutlined,
// 	CloseOutlined, LoadingOutlined, PrinterOutlined
// } from '@ant-design/icons'
// import {
// 	Button,
// 	Col,
// 	Form,
// 	Popconfirm,
// 	Row,
// 	Select,
// 	Space,
// 	Spin,
// 	Table,
// 	TreeSelect,
// 	Typography
// } from 'antd'
// import type { TableProps } from 'antd'
// import dayjs from 'dayjs'
// import printJS from 'print-js'
// import { useEffect, useMemo, useRef, useState } from 'react'
// import { useNavigate } from 'react-router-dom'

// import { ArrowLeftSvg } from '../../../../assets/svg'
// import { DeleteRedSvg } from '../../../../assets/svg/DeleteRedSvg'
// import {
// 	useCreateScheduleMutation, useGetByFilterMutation,
// 	useGetDocQuery,
// 	useGetSubdivisionQuery,
// 	useGetSubmissionsKindPracticeQuery,
// 	useGetSubmissionsSpecPracticeQuery
// } from '../../../../store/api/practiceApi/formingSchedule'
// import { useGetDepartmentsQuery, useGetPracticeKindQuery, useGetPractiseSubdevisionNewQuery } from '../../../../store/api/practiceApi/individualTask'

// import { EditableCell } from './EditableCell'
// import { useGetSubdivisionUserQuery } from '../../../../store/api/serviceApi'
// import { useGetSpecialtyNamesForPractiseQuery, useGetSpecialtyNamesQuery } from '../../../../store/api/practiceApi/roster'
// import { useDispatch } from 'react-redux'
// import { showNotification } from '../../../../store/reducers/notificationSlice'

// import { Filter, Item } from '../../../../models/representation'
// import { disableParents } from '../../../../utils/disableParents'
// import { Vector } from '../../../../assets/svg/Vector'

// interface FilterType {
// 	value: string
// 	label: string
// }

// const filterLevel: FilterType[] = [
// 	{
// 		value: 'Все',
// 		label: 'Все'
// 	},
// 	{
// 		value: 'бакалавр',
// 		label: 'бакалавр'
// 	},
// 	{
// 		value: 'магистр',
// 		label: 'магистр'
// 	},
//     {
// 		value: 'ординатор',
// 		label: 'ординатор'
// 	},
//     {
// 		value: 'специалист',
// 		label: 'специалист'
// 	},
//     {
// 		value: 'аспирант',
// 		label: 'аспирант'
// 	}
// ]
// const filterForm: any = [
// 	{
// 		value: 'Все',
// 		label: 'Все'
// 	},
// 	{
// 		value: 'очное',
// 		label: 'очное'
// 	},
// 	{
// 		value: 'заочное',
// 		label: 'заочное'
// 	},
//     {
// 		value: 'очно-заочное',
// 		label: 'очно-заочное'
// 	}
// ]
// const filterCourse: FilterType[] = [
// 	{
// 		value: 'Все',
// 		label: 'Все'
// 	},
// 	{
// 		value: '1',
// 		label: '1'
// 	},
// 	{
// 		value: '2',
// 		label: '2'
// 	},
// 	{
// 		value: '3',
// 		label: '3'
// 	},
// 	{
// 		value: '4',
// 		label: '4'
// 	},
// 	{
// 		value: '5',
// 		label: '5'
// 	},
// 	{
// 		value: '6',
// 		label: '6'
// 	},
// 	{
// 		value: '7',
// 		label: '7'
// 	}
// ]


// const optionMock = [
// 	{ value: '1', label: '1' },
// 	{ value: '2', label: '2' },
// 	{ value: '3', label: '3' },
//     { value: '4', label: '4' },
// 	{ value: '5', label: '5' },
// 	{ value: '6', label: '6' },
//     { value: '7', label: '7' }
// ]
// const optionMockType = [
// 	{ value: '4', label: '4' },
// 	{ value: '5', label: '5' }
// ]
// const optionMockKind = [
// 	{ value: '7', label: '7' },
// 	{ value: '8', label: '8' },
// 	{ value: '9', label: '9' }
// ]

// export const PracticeSchedule = () => {
// 	const nav = useNavigate()
// 	const {data:dataUserSubdivision} = useGetSubdivisionUserQuery()
// 	const {data:dataAllSpec} = useGetSpecialtyNamesQuery(null)
// 	const {data:dataAllPracKind} = useGetPracticeKindQuery(dataUserSubdivision ? dataUserSubdivision?.id : null)
// 	const [scheduleIdState, setScheduleIdState] = useState(null)
//     const {data:dataSpeciality} = useGetSpecialtyNamesForPractiseQuery(dataUserSubdivision?.id,{skip:dataUserSubdivision?.id === null})
//     const {data:dataPracticeKind} = useGetPracticeKindQuery(dataUserSubdivision?.id,{skip:dataUserSubdivision?.id === null})    
// 	const [filter, setFilter] = useState<any>({
// 		type: '',
// 		spec: '',
// 		courseNumber: 'Все',
// 		educationLevel: 'Все',
// 		educationType: 'Все',
// 		dateFilling: 'По дате (сначала новые)',
// 		practiceKind: 'Все',
// 		specialtyName: 'Все',
//         subDivision:'Все'
// 	})
// 	const [form] = Form.useForm()
// 	const [editingKey, setEditingKey] = useState('')
// 	// const { data: dataAllSubdivision } = useGetSubdivisionQuery()
// 	const isEditing = (record: Item) => record.key === editingKey
// 	const [currentRowValues, setCurrentRowValues] = useState({})
// 	const [createSchedule, { data: dataCreateSchedule ,isLoading:isLoadingCreate}] = useCreateScheduleMutation({})
// 	const [sendFilterParams,{data:dataByFilter,isSuccess:isSuccessByFilter,isLoading:isLoadingByFilters}] = useGetByFilterMutation()
// 	const {data:dataSubNewCreate} = useGetPractiseSubdevisionNewQuery()
//     const [tableData, setTableData] = useState<any>(dataByFilter)
// 	const [selectedValuesLevel, setSelectedValuesLevel] = useState(['Все']);
// 	const [selectedValueForm, setSelectedValuesForm] = useState(['Все']);
// 	const [selectedValueCourse, setSelectedValuesCourse] = useState(['Все']);
// 	const [selectedValueSpecialty, setSelectedValuesSpectialty] = useState(['Все']);
// 	const [selectedValueKind, setSelectedValuesKind] = useState(['Все']);
// 	const [selectedValueSpecialtySend, setSelectedValuesSpectialtySend] = useState([]);
// 	const [selectedValueKindSend, setSelectedValuesKindSend] = useState([]);
// 	const [copyDataByFilter, setCopyDataByFilter] = useState(dataByFilter);
	
// 	const prevDataByFilterLength = useRef([]);
// 	const prevUniqName = useRef()
// 	const prevUniqNameKind = useRef()
// 	const prevData = useRef([])
// 	const [treeLine, setTreeLine] = useState(true);
//     const [showLeafIcon, setShowLeafIcon] = useState(false);
//     const [value, setValue] = useState<any>();
// 	const [newSubdivisionId,setNewSubdivisionId] = useState(null)
// 	const {data:dataSubKindPractice} = useGetSubmissionsKindPracticeQuery(newSubdivisionId,{skip:!newSubdivisionId })
// 	const {data:dataSubSpecPractice} = useGetSubmissionsSpecPracticeQuery(newSubdivisionId,{skip:!newSubdivisionId })
// 	const [flag,setFlag] = useState(false)
// 	const [kindPracticeSub,setKindPracticeSub] = useState<any>(null)
// 	const [specPracticeSub,setSpecPracticeSub] = useState<any>(null)
// 	const dispatch = useDispatch()
// 	console.log('dataSubSpecPractice',dataSubSpecPractice)

// 	const columns = [
// 		{
// 			key: 'name',
// 			dataIndex: 'specialtyName',
// 			title: 'Шифр и наименование документа',
// 			name: 'Шифр и иаименование документа',
// 			className: 'text-xs !p-2'
// 		},
		
// 		{
// 			key: 'course',
// 			dataIndex: 'courseNumber',
// 			title: 'Курс',
// 			className: 'text-xs !p-2',
// 			editable: true
// 		},
// 		{
// 			key: 'groupNumbers',
// 			dataIndex: 'groupNumbers',
// 			title: 'Номер группы',
// 			className: 'text-xs !p-2'
// 		},
// 		{
// 			key: 'educationLevel',
// 			dataIndex: 'educationLevel',
// 			title: 'Уровень образования',
// 			className: 'text-xs !p-2 mobileFirst'
// 		},
// 		{
// 			key: 'educationType',
// 			dataIndex: 'educationType',
// 			title: 'Форма обучения',
// 			className: 'text-xs !p-2 mobileFirst'
// 		},
// 		{
// 			key: 'kind',
// 			dataIndex: 'practiceKind',
// 			title: 'Вид практики',
// 			className: 'text-xs !p-2 mobileFirst',
// 			editable: true
// 		},
// 		{
// 			key: 'type',
// 			dataIndex: 'practiceType',
// 			title: 'Тип практики',
// 			className: 'text-xs !p-2 mobileFirst ',
// 			editable: true
// 		},
// 		{
// 			key: 'id',
// 			title: 'Дата заполнения',
// 			dataIndex: 'dateFilling',
// 			width: '20%',
// 			className: 'mobileFirst',
// 			// sorter: (a:any, b:any) => +new Date(b.dateFilling) - +new Date(a.dateFilling),
// 			// @ts-ignore
// 			render: (text: any) => dayjs(text).format('DD.MM.YYYY')
// 		},

// 		{
// 			key: 'period',
// 			dataIndex: 'period',
// 			title: 'Период практики',
// 			className: 'text-xs !p-2',
// 			editable: true,
// 			render: (text: any, record: any) => {
// 				return <>{formatDateRange(Array.isArray(text) ? text : ['', ''])}</>
// 			}
// 		},
// 		{
// 			title: '',
// 			dataIndex: 'operation',
// 			render: (_: any, record: Item) => {
// 				const editable = isEditing(record)
// 				return editable ? (
// 					<div className="flex justify-around items-center w-[60px]">
// 						<Typography.Link
// 							onClick={() => save(record.key)}
// 							style={{ marginRight: 8 }}
// 						>
// 							<CheckOutlined style={{ color: '#75a4d3' }} />
// 						</Typography.Link>
// 						<Popconfirm
// 							title="Вы действительно хотите отменить действие?"
// 							onConfirm={cancel}
// 						>
// 							<CloseOutlined style={{ color: '#75a4d3' }} />
// 						</Popconfirm>
// 					</div>
// 				) : (
// 					<div className="flex justify-around items-center  w-[60px]">
// 						{/* <Typography.Link
// 							disabled={editingKey !== ''}
// 							onClick={() => edit(record)}
// 						>
// 							<EditSvg />
// 						</Typography.Link> */}
// 						<Popconfirm
// 							title="Вы действительно хотите удалить?"
// 							// @ts-ignore
// 							onConfirm={() => handleDelete(record.id)}
// 						>
// 							<a>
// 								<DeleteRedSvg />
// 							</a>
// 						</Popconfirm>
// 					</div>
// 				)
// 			}
// 		}
// 	]
// 	const mergedColumns: TableProps['columns'] = columns.map(col => {
// 		// @ts-ignore
// 		if (!col.editable) {
// 			return col
// 		}
// 		return {
// 			...col,
// 			onCell: (record: Item) => ({
// 				record,
// 				inputType:
// 					col.dataIndex === 'courseNumber'
// 						? 'select'
// 						: col.dataIndex === 'practiceType'
// 						? 'select'
// 						: col.dataIndex === 'practiceKind'
// 						? 'select'
// 						: col.dataIndex === 'period'
// 						? 'date'
// 						: col.dataIndex === 'course'
// 						? 'number'
// 						: 'text',
// 				dataIndex: col.dataIndex,
// 				title: col.title,
// 				editing: isEditing(record),
// 				options:
// 					col.dataIndex === 'courseNumber'
// 						? optionMock
// 						: col.dataIndex === 'practiceType'
// 						? optionMockType
// 						: col.dataIndex === 'practiceKind'
// 						? optionMockKind
// 						: undefined
// 			})
// 		}
// 	})
// 	useEffect(()=>{
// 		if(isSuccessByFilter){
// 			if(prevData.current.length < dataByFilter.length){
// 				prevData.current = dataByFilter
// 			}
// 		}
// 	},[isSuccessByFilter])
// 	console.log('kindPracticeSub',kindPracticeSub)
// 	useEffect(() => {
// 		const data = {
// 			subdivisionId:  newSubdivisionId ? newSubdivisionId  : null,
// 			specialtyNameId:specPracticeSub?.length===1 && specPracticeSub?.includes('Все') ? null : specPracticeSub?.filter((i:any)=>i!=='Все') ,
// 			courseNumber: selectedValueCourse?.includes('Все') ? null : selectedValueCourse.map((i)=>Number(i)),
// 			practiceKindId: kindPracticeSub?.length===1&&kindPracticeSub.includes('Все') ? null : kindPracticeSub?.filter((i:any)=>i!=='Все') ,
// 			educationLevel: selectedValuesLevel?.includes('Все') ? null : selectedValuesLevel,
// 			educationType: selectedValueForm.includes('Все') ? null : selectedValueForm,
// 		}
// 		console.log('selectedValueKindSend',selectedValueKindSend)
// 		console.log('datadatadatadata---------------------',data)
// 		if(data?.subdivisionId===null){
// 			return
// 		}
// 		sendFilterParams(data)
// 	}, [filter, dataUserSubdivision, form,selectedValuesLevel,selectedValueSpecialtySend,selectedValueCourse,selectedValueForm,selectedValueKind])

//     useEffect(() => {
// 		if (isSuccessByFilter) {
// 			setTableData(filterDataFull())
// 		}
// 	}, [filter, isSuccessByFilter])

// 	useEffect(() => {
// 		setTableData(filterDataFull())
	
// 	}, [filter])

// 	const onPopupScroll: any = (e:any) => {
//         console.log('onPopupScroll', e);
//     };

// 	const handleChangeLevel = (values:any) => {
// 		if(selectedValuesLevel.includes('Все')===false && values.includes('Все') ){
// 			setSelectedValuesLevel(['Все']);
// 			return
// 		}
// 		setSelectedValuesLevel(values.filter((i:any)=>i!=='Все'))
// 	};

// 	const handleChangeForm = (values:any) => {
// 		if(selectedValueForm.includes('Все')===false && values.includes('Все') ){
// 			setSelectedValuesForm(['Все']);
// 			return
// 		}
// 		setSelectedValuesForm(values.filter((i:any)=>i!=='Все'))
// 	};

// 	const handleChangeCourse = (values:any) => {
// 		if(selectedValueCourse.includes('Все')===false && values.includes('Все') ){
// 			setSelectedValuesCourse(['Все']);
// 			return
// 		}
// 		setSelectedValuesCourse(values.filter((i:any)=>i!=='Все'))
// 	};

// 	const handleChangeSpecialty = (values:any) => {
// 		if(selectedValueSpecialty.includes('Все')===false && values.includes('Все') ){
// 			setSelectedValuesSpectialty(['Все']);
		
// 			setSelectedValuesSpectialtySend([])
// 			return
// 		}
// 		setSelectedValuesSpectialty(values.filter((i:any)=>i!=='Все'))
	
// 		const stri = prevData.current.filter((item:any)=>values.includes(item.specialtyName))
	
// 		const x = stri.map((item:any)=>item.specialtyCode + ' ' + item.specialtyName)
	
// 		const araId = (dataAllSpec?.filter((item)=>x.includes(item?.value)))?.map((item)=>item.id)
// 		//@ts-ignore
// 		setSelectedValuesSpectialtySend(araId)
// 	};

// 	const handleChangeKind = (values:any) => {
// 		if(selectedValueKind.includes('Все')===false && values.includes('Все') ){
// 			setSelectedValuesKind(['Все']);
// 			setSelectedValuesKindSend([])
// 			return
// 		}
// 		setSelectedValuesKind(values.filter((i:any)=>i!=='Все'))
		
// 		setSelectedValuesKindSend(values.filter((i:any)=>i!=='Все'))
// 	};

// 	function filterDataFull() {
// 		setFlag(false)
// 		return dataByFilter
// 			? dataByFilter
// 					// .sort((a: any, b: any) => sortDateFilling(a, b))
// 			: []
// 	}


// 	const cancel = () => {
// 		setEditingKey('')
// 	}

// 	const formatDateRange = (dateRange: any) => {
// 		if (
// 			dateRange !== null &&
// 			Array.isArray(dateRange) &&
// 			dateRange.length === 2
// 		) {
// 			const startDate = dayjs(dateRange[0])
// 			const endDate = dayjs(dateRange[1])

// 			if (startDate.isValid() && endDate.isValid()) {
// 				return `${startDate.format('DD.MM.YYYY')} - ${endDate.format(
// 					'DD.MM.YYYY'
// 				)}`
// 			} else {
// 				return 'Неверный формат даты'
// 			}
// 		}
// 		return '' // Возвращает пустую строку, если dateRange не является массивом или если длина массива не равна 2
// 	}

// 	const save = async (key: React.Key) => {
// 		try {
// 			const row = (await form.validateFields()) as Item

// 			const newData = [...tableData]
// 			const index = newData.findIndex(item => key === item.key)
// 			if (index > -1) {
// 				const item = newData[index]
// 				newData.splice(index, 1, {
// 					...item,
// 					...row
// 				})
// 				// setData(newData)
// 				setTableData(newData)
// 				setEditingKey('')

// 			} else {
// 				// если новая запись
// 				newData.push(row)
// 				// setData(newData)
// 				setTableData(newData)
// 				setEditingKey('')
// 			}
// 		} catch (errInfo) {
// 			console.log('Validate Failed:', errInfo)
// 		}
// 	}

// 	const handleDelete = (id: React.Key) => {
// 		const newData = tableData.filter((item: any) => item.id !== id)
// 		setTableData(newData)
// 	}



// 	const handleCreateSchedule = () => {
// 		if(!newSubdivisionId){
// 			dispatch(showNotification({ message: 'Выберите подразделение', type: 'warning' }));
// 			return
// 		}
// 		console.log('tableData',tableData)
//         createSchedule({practiceIds: tableData?.scheduleContent?.map((item:any)=>item.id)})
// 			.unwrap()
// 			.then(()=>{
// 				nav('/services/practices/formingSchedule')
// 			})
// 			.catch((error)=>{
// 				console.log(error)
// 				if (error.status === 409) {
// 					dispatch(showNotification({ message: 'Такой график уже создан', type: 'error' }));
// 				}
// 				if (error.status === 404) {
// 					dispatch(showNotification({ message: 'Нельзя создать пустой график', type: 'error' }));
// 				}
// 				if (error.status === 400) {
// 					dispatch(showNotification({ message: 'Текст в консоли', type: 'error' }));
// 				}
// 			})

//     }
	
// 	const arraySpec = [
//         { key: 2244612, value: "Все", label: "Все" },
//         ...(dataByFilter ? 
//             dataByFilter?.scheduleContent?.map((item:any) => ({
//                 key: item.id,
//                 value: item.specialtyName,
//                 label: item.specialtyName
//             })) 
//         : [])
//     ];
	
//     const arrayKind = [
//         { key: 2244612, value: "Все", label: "Все" },
//         ...(dataByFilter ?
//             dataByFilter?.scheduleContent?.map((item:any) => ({
//                 key: item.id,
//                 value: item.practiceKind,
//                 label: item.practiceKind
//             }))
//         : [])
//     ];
	
// 	const arrayKindWithId = [
      
//         ...(dataByFilter ?
//             dataByFilter?.scheduleContent?.map((item:any) => ({
//                 key: item.id,
//                 value: item,
//                 label: item
//             }))
//         : [])
//     ];
	
// 	const uniqueSpecialityNames = useMemo(() => {
	
// 		if(prevDataByFilterLength?.current <= dataByFilter?.scheduleContent.length){

// 			const uniqueNames = Array.from(new Set(arraySpec.map(item => item.value)))
// 			.map(value => ({ value, label: value }));

// 			prevDataByFilterLength.current = dataByFilter?.length

// 			if(dataByFilter.scheduleContent.length>=prevDataByFilterLength.current){
// 				//@ts-ignore
// 				prevDataByFilterLength.current = uniqueNames.length
// 			}
// 			//@ts-ignore
// 			prevUniqName.current = uniqueNames
// 			return uniqueNames;
// 		}else return prevUniqName.current
// 	  }, [dataByFilter]);

// 	const uniqueKind = useMemo(() => {
	
// 	if(prevDataByFilterLength?.current <= dataByFilter?.scheduleContent.length){
// 		const uniqueNames = Array.from(new Set(arrayKind.map(item => item.value)))
// 		.map(value => ({ value, label: value }));
// 		prevDataByFilterLength.current = dataByFilter?.scheduleContent.length
// 		//@ts-ignore
// 		prevUniqNameKind.current = uniqueNames
	
// 		return uniqueNames;
// 	}else {
	
// 	return prevUniqNameKind.current}
// 	}, [dataByFilter]);

	
// 	const treeData = dataSubNewCreate?.map((item:any)=>{
//         return{
//             title:item.value,
//             value:item.id,
//             // @ts-ignore
//             children: item?.responses?.map((item)=>{
//                 return{
//                     title:item.value,
//                     value:item.id,
//                 }
//             })
//         }
//     })

// 	return (
// 		<Spin spinning={isLoadingCreate}>
// 		<section className="container animate-fade-in">
//             <Form form={form} >
// 			<Row gutter={[16, 16]}>
// 				<Col span={24}>
// 					<Button
// 						size="large"
// 						style={{width:'48px'}}
// 						className="mt-1 mr-6 w-[48px] rounded-full border border-black"
// 						icon={<Vector />}
// 						type="text"
// 						onClick={() => {
// 							nav('/services/practices/formingSchedule')
// 						}}
// 					/>
// 					<Typography.Text className=" text-[28px] mb-14 titleMobile">
// 						Добавление графика проведения практик
// 					</Typography.Text>
// 				</Col>
// 			</Row>
// 			<Row gutter={[8, 16]} className="mt-12 w-full flex  overWrite ">
				
//                 <Col span={4} className='overWrite'>
// 					<span>Подразделение</span>
// 				</Col>
// 				<Col span={8} className='overWrite grow'>
					
// 						<Form.Item name={'subDivision'}>

// 							  <TreeSelect
// 								treeLine={treeLine && { showLeafIcon }}
// 								showSearch
// 								style={{ height:'32px',width: '100%' }}
// 								value={value}
// 								dropdownStyle={{  overflow: 'auto' }}
// 								placeholder=""
// 								allowClear
// 								treeDefaultExpandAll
// 								onChange={value => {
// 									setFlag(true)
// 									setNewSubdivisionId(value)
// 									setFilter({
// 										...filter,
// 										subDivision: value
// 									})
// 								}}
// 								treeData={disableParents(treeData)}
// 								onPopupScroll={onPopupScroll}
// 								treeNodeFilterProp="title"
                                    
//                                     />
// 						</Form.Item>
//                 </Col>
// 				</Row>
// 				<Row gutter={[8, 16]} className="mt-0 w-full flex items-center overWrite ">
// 				<Col span={4} className='overWrite'>
// 					<Typography.Text className='mobileFont'>Шифр и наименование специальности</Typography.Text>
// 				</Col>
// 				<Col span={8} className='overWrite grow'>
// 					<Select
// 						disabled={filter.subDivision==='Все'}
// 						mode='multiple'
// 						popupMatchSelectWidth={false}
// 						value={selectedValueSpecialty}
// 						className="w-full "
// 						options={ [
// 							{ key: 2244612, value: 'Все', label: 'Все' },
// 							...(Array.isArray(dataSubSpecPractice) ? dataSubSpecPractice.map(item => ({
// 								label: item.value,
// 								key: item.id,
// 								value: item.id
// 							})) : [])
// 						]
// 					}
// 						onChange={value => {
// 							if(specPracticeSub?.includes('Все')===false && value?.includes('Все')){
// 								setSpecPracticeSub(['Все'])
// 							}else{
// 								const x = value.filter((i)=>i!=='Все')
// 								setSpecPracticeSub(x)
// 							}
// 							// setSpecPracticeSub(value)
// 							handleChangeSpecialty(value)
// 							setFilter({
// 								...filter,
// 								specialtyName: value
// 							})
// 						}}
// 					/>
// 				</Col>
// 			</Row>
// 			<Row gutter={[16, 0]} className="mt-4 flex items-center mrr">
// 				<Col span={1}>
// 					<Typography.Text className="whitespace-nowrap mobileFont">Курс</Typography.Text>
// 				</Col>
// 				<Col span={3} className='grow overWrite'>
// 					<Select
// 						disabled={filter.subDivision==='Все'}
// 						mode='multiple'
// 						popupMatchSelectWidth={false}
// 						value={selectedValueCourse}
// 						className="w-full"
// 						options={filterCourse}
// 						onChange={value => {
// 							handleChangeCourse(value)
// 							setFilter({
// 								...filter,
// 								courseNumber: value
// 							})
// 						}}
// 					/>
// 				</Col>
// 				<Col span={3}>
// 					<Typography.Text className='mobileFont'>Вид практики</Typography.Text>
// 				</Col>
// 				<Col span={5} className='overWrite grow'>
// 					<Select
// 						disabled={filter.subDivision==='Все'}
// 						mode='multiple'
// 						popupMatchSelectWidth={false}
// 						value={selectedValueKind}
// 						className="w-full"
// 						options={ [
// 							{ key: 2244612, value: 'Все', label: 'Все' },
// 							...(Array.isArray(dataSubKindPractice) ? dataSubKindPractice.map(item => ({
// 								label: item.value,
// 								key: item.id,
// 								value: item.id
// 							})) : [])
// 						]
// 					}
						
// 						onChange={value => {
// 							if(kindPracticeSub?.includes('Все')===false && value?.includes('Все')){
// 								setKindPracticeSub(['Все'])
// 							}else{
// 								const x = value.filter((i)=>i!=='Все')
// 								setKindPracticeSub(x)
// 							}
// 							// setKindPracticeSub(value)
// 							handleChangeKind(value)
// 							setFilter({
// 								...filter,
// 								practiceKind: value
// 							})
// 						}}
// 					/>
// 				</Col>
// 			</Row>
// 			<Row gutter={[8, 16]} className="mt-4 w-full flex items-center ">
// 				<Col span={4}>
// 					<Typography.Text className='mobileFont'>Уровень образования</Typography.Text>
// 				</Col>
// 				<Col span={8} className='overWrite grow'>
// 					<Select	
// 						disabled={filter.subDivision==='Все'}
// 						mode='multiple'
// 						value={selectedValuesLevel}
// 						popupMatchSelectWidth={false}
// 						className="w-full"
// 						options={filterLevel}
// 						onChange={value => {
// 							handleChangeLevel(value)
// 							setFilter({
// 								...filter,
// 								educationLevel: value
// 							})
// 						}}
// 					/>
// 				</Col>
// 			</Row>
// 			<Row gutter={[8, 16]} className="mt-4 pb-4 mb-4 w-full flex items-center ">
// 				<Col span={4}>
// 					<Typography.Text className='mobileFont'>Форма обучения</Typography.Text>
// 				</Col>
// 				<Col span={8} className='overWrite grow'>
// 					<Select
// 						disabled={filter.subDivision==='Все'}
// 						mode='multiple'
// 						popupMatchSelectWidth={false}
// 						value={selectedValueForm}
// 						className="w-full"
// 						options={filterForm}
// 						onChange={value => {
// 							handleChangeForm(value)
// 							setFilter({
// 								...filter,
// 								educationType: value
// 							})
// 						}}
// 					/>
// 				</Col>
// 				{/* <Col span={7} offset={5} className='overWrite'>
// 					<Space className="w-full flex-row-reverse overWrite">
// 						<Button
// 							type="primary"
// 							className="!rounded-full h-10"
// 							onClick={() => {
// 								handleCreateSchedule()
// 							}}
// 						>
// 							Добавить
// 						</Button>
// 					</Space>
// 				</Col> */}
// 			</Row>

// 					{flag ? <Spin className='w-full mt-20' indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} /> : isLoadingByFilters ?  <Spin className='w-full mt-20' indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />   :
// 						<Table
// 							components={{
// 								body: {
// 									cell: EditableCell
// 								}
// 							}}
// 							bordered
// 							dataSource={!newSubdivisionId ? [] : tableData ? tableData?.scheduleContent?.map((item:any)=>{
//                                 return{
//                                     ...item,
//                                     period:  [dayjs(item.practiceStartDate), dayjs(item.practiceEndDate)]
//                                 }
//                             }) : []}
// 							columns={mergedColumns}
// 							rowClassName="editable-row animate-fade-in"
// 							pagination={false}
// 							rowKey="id"
							
// 							locale={{
// 								emptyText: (
// 								  <div>
// 									<h3>Нет данных для отображения</h3>
// 									<p>Поле "Подразделение" не должно быть пустым</p>
// 								  </div>
// 								),
// 							  }}
// 						/>
// 						}
// 						<Row className='mt-5'>
// 						<Col span={2}  className='overWrite'>
// 						<Space className="w-full  overWrite">
// 							<Button
// 								type="primary"
// 								className="!rounded-full h-10"
// 								onClick={() => {
// 									handleCreateSchedule()
// 								}}
// 							>
// 							Сохранить
// 						</Button>
// 					</Space>
// 				</Col>
// 						</Row>
//             </Form>
// 		</section>
// 		</Spin>
// 	)
// }

// export default PracticeSchedule
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
	TreeSelect,
	Typography
} from 'antd'
import type { TableProps } from 'antd'
import dayjs from 'dayjs'
import printJS from 'print-js'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { ArrowLeftSvg } from '../../../../assets/svg'
import { DeleteRedSvg } from '../../../../assets/svg/DeleteRedSvg'
import {
	useCreateScheduleMutation, useGetByFilterMutation,
	useGetDocQuery,
	useGetSubdivisionQuery,
	useGetSubmissionsKindPracticeQuery,
	useGetSubmissionsSpecPracticeQuery
} from '../../../../store/api/practiceApi/formingSchedule'
import { useGetDepartmentsQuery, useGetPracticeKindQuery, useGetPractiseSubdevisionNewQuery } from '../../../../store/api/practiceApi/individualTask'

import { EditableCell } from './EditableCell'
import { useGetSubdivisionUserQuery } from '../../../../store/api/serviceApi'
import { useGetSpecialtyNamesForPractiseQuery, useGetSpecialtyNamesQuery } from '../../../../store/api/practiceApi/roster'
import { useDispatch } from 'react-redux'
import { showNotification } from '../../../../store/reducers/notificationSlice'

import { Filter, Item } from '../../../../models/representation'
import { disableParents } from '../../../../utils/disableParents'
import { Vector } from '../../../../assets/svg/Vector'
import { t } from 'i18next'

interface FilterType {
	value: string
	label: string
}


export const PracticeSchedule = () => {
	
const filterLevel: FilterType[] = [
	{
		value: 'all',
		label: t('all')
	},
	{
		value: 'bachelor',
		label: t('bachelor')
	},
	{
		value: 'master',
		label: t('master')
	},
    {
		value: 'residency',
		label: t('residency')
	},
    {
		value: 'specialist',
		label: t('specialist')
	},
    {
		value: 'graduateStudent',
		label: t('graduateStudent')
	}
]
const filterForm: any = [
	{
		value: 'all',
		label: t('all')
	},
	{
		value: 'fullTime',
		label: t('fullTime')
	},
	{
		value: 'partTime',
		label: t('partTime')
	},
    {
		value: 'combined',
		label: t('combined')
	}
]
const filterCourse: FilterType[] = [
	{
		value: 'all',
		label: t('all')
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
	const nav = useNavigate()
	const {data:dataUserSubdivision} = useGetSubdivisionUserQuery()
	const {data:dataAllSpec} = useGetSpecialtyNamesQuery(null)
	const {data:dataAllPracKind} = useGetPracticeKindQuery(dataUserSubdivision ? dataUserSubdivision?.id : null)
	const [scheduleIdState, setScheduleIdState] = useState(null)
    const {data:dataSpeciality} = useGetSpecialtyNamesForPractiseQuery(dataUserSubdivision?.id,{skip:dataUserSubdivision?.id === null})
    const {data:dataPracticeKind} = useGetPracticeKindQuery(dataUserSubdivision?.id,{skip:dataUserSubdivision?.id === null})
	const [filter, setFilter] = useState<any>({
		type: '',
		spec: '',
		courseNumber: 'all',
		educationLevel: 'all',
		educationType: 'all',
		dateFilling: 'dateFilling',
		practiceKind: 'all',
		specialtyName: 'all',
        subDivision:'all'
	})
	const [form] = Form.useForm()
	const [editingKey, setEditingKey] = useState('')
	// const { data: dataAllSubdivision } = useGetSubdivisionQuery()
	const isEditing = (record: Item) => record.key === editingKey
	const [currentRowValues, setCurrentRowValues] = useState({})
	const [createSchedule, { data: dataCreateSchedule ,isLoading:isLoadingCreate}] = useCreateScheduleMutation({})
	const [sendFilterParams,{data:dataByFilter,isSuccess:isSuccessByFilter,isLoading:isLoadingByFilters}] = useGetByFilterMutation()
	const {data:dataSubNewCreate} = useGetPractiseSubdevisionNewQuery()
    const [tableData, setTableData] = useState<any>(dataByFilter)
	const [selectedValuesLevel, setSelectedValuesLevel] = useState(['all']);
	const [selectedValueForm, setSelectedValuesForm] = useState(['all']);
	const [selectedValueCourse, setSelectedValuesCourse] = useState(['all']);
	const [selectedValueSpecialty, setSelectedValuesSpectialty] = useState(['all']);
	const [selectedValueKind, setSelectedValuesKind] = useState(['all']);
	const [selectedValueSpecialtySend, setSelectedValuesSpectialtySend] = useState([]);
	const [selectedValueKindSend, setSelectedValuesKindSend] = useState([]);
	const [copyDataByFilter, setCopyDataByFilter] = useState(dataByFilter);

	const prevDataByFilterLength = useRef([]);
	const prevUniqName = useRef()
	const prevUniqNameKind = useRef()
	const prevData = useRef([])
	const [treeLine, setTreeLine] = useState(true);
    const [showLeafIcon, setShowLeafIcon] = useState(false);
    const [value, setValue] = useState<any>();
	const [newSubdivisionId,setNewSubdivisionId] = useState(null)
	const {data:dataSubKindPractice} = useGetSubmissionsKindPracticeQuery(newSubdivisionId,{skip:!newSubdivisionId })
	const {data:dataSubSpecPractice} = useGetSubmissionsSpecPracticeQuery(newSubdivisionId,{skip:!newSubdivisionId })
	const [flag,setFlag] = useState(false)
	const [kindPracticeSub,setKindPracticeSub] = useState<any>(null)
	const [specPracticeSub,setSpecPracticeSub] = useState<any>(null)
	const dispatch = useDispatch()
	console.log('dataSubSpecPractice',dataSubSpecPractice)

	const columns = [
		{
			key: 'name',
			dataIndex: 'specialtyName',
			title: t('specialtyCodeAndName'),
			name: 'specialtyCodeAndName',
			className: 'text-xs !p-2'
		},

		{
			key: 'course',
			dataIndex: 'courseNumber',
			title: t('courseNumber'),
			className: 'text-xs !p-2',
			editable: true
		},
		{
			key: 'groupNumbers',
			dataIndex: 'groupNumbers',
			title: t('groupNumbers'),
			className: 'text-xs !p-2'
		},
		{
			key: 'educationLevel',
			dataIndex: 'educationLevel',
			title: t('educationLevel'),
			className: 'text-xs !p-2 mobileFirst'
		},
		{
			key: 'educationType',
			dataIndex: 'educationType',
			title: t('educationType'),
			className: 'text-xs !p-2 mobileFirst'
		},
		{
			key: 'kind',
			dataIndex: 'practiceKind',
			title: t('practiceKind'),
			className: 'text-xs !p-2 mobileFirst',
			editable: true
		},
		{
			key: 'type',
			dataIndex: 'practiceType',
			title: t('practiceType'),
			className: 'text-xs !p-2 mobileFirst ',
			editable: true
		},
		{
			key: 'id',
			title: t('dateFilling'),
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
			title: t('practicePeriod'),
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
	useEffect(()=>{
		if(isSuccessByFilter){
			if(prevData.current.length < dataByFilter.length){
				prevData.current = dataByFilter
			}
		}
	},[isSuccessByFilter])
	console.log('kindPracticeSub',kindPracticeSub)
	useEffect(() => {
		const data = {
			subdivisionId:  newSubdivisionId ? newSubdivisionId  : null,
			specialtyNameId:specPracticeSub?.length===1 && specPracticeSub?.includes('all') ? null : specPracticeSub?.filter((i:any)=>i!=='all') ,
			courseNumber: selectedValueCourse?.includes('all') ? null : selectedValueCourse.map((i)=>Number(i)),
			practiceKindId: kindPracticeSub?.length===1&&kindPracticeSub.includes('all') ? null : kindPracticeSub?.filter((i:any)=>i!=='all') ,
			educationLevel: selectedValuesLevel?.includes('all') ? null : selectedValuesLevel,
			educationType: selectedValueForm.includes('all') ? null : selectedValueForm,
		}
		console.log('selectedValueKindSend',selectedValueKindSend)
		console.log('datadatadatadata---------------------',data)
		if(data?.subdivisionId===null){
			return
		}
		sendFilterParams(data)
	}, [filter, dataUserSubdivision, form,selectedValuesLevel,selectedValueSpecialtySend,selectedValueCourse,selectedValueForm,selectedValueKind])

    useEffect(() => {
		if (isSuccessByFilter) {
			setTableData(filterDataFull())
		}
	}, [filter, isSuccessByFilter])

	useEffect(() => {
		setTableData(filterDataFull())

	}, [filter])

	const onPopupScroll: any = (e:any) => {
        console.log('onPopupScroll', e);
    };

	const handleChangeLevel = (values:any) => {
		if(selectedValuesLevel.includes('all')===false && values.includes('all') ){
			setSelectedValuesLevel(['all']);
			return
		}
		setSelectedValuesLevel(values.filter((i:any)=>i!=='all'))
	};

	const handleChangeForm = (values:any) => {
		if(selectedValueForm.includes('all')===false && values.includes('all') ){
			setSelectedValuesForm(['all']);
			return
		}
		setSelectedValuesForm(values.filter((i:any)=>i!=='all'))
	};

	const handleChangeCourse = (values:any) => {
		if(selectedValueCourse.includes('all')===false && values.includes('all') ){
			setSelectedValuesCourse(['all']);
			return
		}
		setSelectedValuesCourse(values.filter((i:any)=>i!=='all'))
	};

	const handleChangeSpecialty = (values:any) => {
		if(selectedValueSpecialty.includes('all')===false && values.includes('all') ){
			setSelectedValuesSpectialty(['all']);

			setSelectedValuesSpectialtySend([])
			return
		}
		setSelectedValuesSpectialty(values.filter((i:any)=>i!=='all'))

		const stri = prevData.current.filter((item:any)=>values.includes(item.specialtyName))

		const x = stri.map((item:any)=>item.specialtyCode + ' ' + item.specialtyName)

		const araId = (dataAllSpec?.filter((item)=>x.includes(item?.value)))?.map((item)=>item.id)
		//@ts-ignore
		setSelectedValuesSpectialtySend(araId)
	};

	const handleChangeKind = (values:any) => {
		if(selectedValueKind.includes('all')===false && values.includes('all') ){
			setSelectedValuesKind(['all']);
			setSelectedValuesKindSend([])
			return
		}
		setSelectedValuesKind(values.filter((i:any)=>i!=='all'))

		setSelectedValuesKindSend(values.filter((i:any)=>i!=='all'))
	};

	function filterDataFull() {
		setFlag(false)
		return dataByFilter
			? dataByFilter
					// .sort((a: any, b: any) => sortDateFilling(a, b))
			: []
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

	const handleDelete = (id: React.Key) => {
		const newData = tableData.filter((item: any) => item.id !== id)
		setTableData(newData)
	}

	const handleCreateSchedule = () => {
		if(!newSubdivisionId){
			dispatch(showNotification({ message: 'Выберите подразделение', type: 'warning' }));
			return
		}
		console.log('tableData',tableData)
        createSchedule({practiceIds: tableData?.scheduleContent?.map((item:any)=>item.id)})
			.unwrap()
			.then(()=>{
				nav('/services/practices/formingSchedule')
			})
			.catch((error)=>{
				console.log(error)
				if (error.status === 409) {
					dispatch(showNotification({ message: 'Такой график уже создан', type: 'error' }));
				}
				if (error.status === 404) {
					dispatch(showNotification({ message: 'Нельзя создать пустой график', type: 'error' }));
				}
				if (error.status === 400) {
					dispatch(showNotification({ message: 'Текст в консоли', type: 'error' }));
				}
			})

    }

	const arraySpec = [
        { key: 2244612, value: "all", label: "all" },
        ...(dataByFilter ?
            dataByFilter?.scheduleContent?.map((item:any) => ({
                key: item.id,
                value: item.specialtyName,
                label: item.specialtyName
            }))
        : [])
    ];

    const arrayKind = [
        { key: 2244612, value: "all", label: "all" },
        ...(dataByFilter ?
            dataByFilter?.scheduleContent?.map((item:any) => ({
                key: item.id,
                value: item.practiceKind,
                label: item.practiceKind
            }))
        : [])
    ];

	const arrayKindWithId = [

        ...(dataByFilter ?
            dataByFilter?.scheduleContent?.map((item:any) => ({
                key: item.id,
                value: item,
                label: item
            }))
        : [])
    ];

	const uniqueSpecialityNames = useMemo(() => {

		if(prevDataByFilterLength?.current <= dataByFilter?.scheduleContent.length){

			const uniqueNames = Array.from(new Set(arraySpec.map(item => item.value)))
			.map(value => ({ value, label: value }));

			prevDataByFilterLength.current = dataByFilter?.length

			if(dataByFilter.scheduleContent.length>=prevDataByFilterLength.current){
				//@ts-ignore
				prevDataByFilterLength.current = uniqueNames.length
			}
			//@ts-ignore
			prevUniqName.current = uniqueNames
			return uniqueNames;
		}else return prevUniqName.current
	  }, [dataByFilter]);

	const uniqueKind = useMemo(() => {

	if(prevDataByFilterLength?.current <= dataByFilter?.scheduleContent.length){
		const uniqueNames = Array.from(new Set(arrayKind.map(item => item.value)))
		.map(value => ({ value, label: value }));
		prevDataByFilterLength.current = dataByFilter?.scheduleContent.length
		//@ts-ignore
		prevUniqNameKind.current = uniqueNames

		return uniqueNames;
	}else {

	return prevUniqNameKind.current}
	}, [dataByFilter]);

	const treeData = dataSubNewCreate?.map((item:any)=>{
        return{
            title:item.value,
            value:item.id,
            // @ts-ignore
            children: item?.responses?.map((item)=>{
                return{
                    title:item.value,
                    value:item.id,
                }
            })
        }
    })
	console.log('selectedValuesLevel',selectedValuesLevel)
	return (
		<Spin spinning={isLoadingCreate}>
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
					<Typography.Text className=" text-[28px] mb-14 titleMobile">
						{t('addPracticeSchedule')}
					</Typography.Text>
				</Col>
			</Row>
			<Row gutter={[8, 16]} className="mt-12 w-full flex  overWrite ">

                <Col span={4} className='overWrite'>
					<span>{t('department')}</span>
				</Col>
				<Col span={8} className='overWrite grow'>

						<Form.Item name={'subDivision'}>

							  <TreeSelect
								treeLine={treeLine && { showLeafIcon }}
								showSearch
								style={{ height:'32px',width: '100%' }}
								value={value}
								dropdownStyle={{  overflow: 'auto' }}
								placeholder=""
								allowClear
								treeDefaultExpandAll
								onChange={value => {
									setFlag(true)
									setNewSubdivisionId(value)
									setFilter({
										...filter,
										subDivision: value
									})
								}}
								treeData={disableParents(treeData)}
								onPopupScroll={onPopupScroll}
								treeNodeFilterProp="title"

                                     />
						</Form.Item>
                </Col>
				</Row>
				<Row gutter={[8, 16]} className="mt-0 w-full flex items-center overWrite ">
				<Col span={4} className='overWrite'>
					<Typography.Text className='mobileFont'>{t('specialtyCodeAndName')}</Typography.Text>
				</Col>
				<Col span={8} className='overWrite grow'>
					<Select
						disabled={filter.subDivision==='all'}
						mode='multiple'
						popupMatchSelectWidth={false}
						value={selectedValueSpecialty}
						className="w-full "
						options={ [
							{ key: 2244612, value: 'all', label: t('all') },
							...(Array.isArray(dataSubSpecPractice) ? dataSubSpecPractice.map(item => ({
								label: item.value,
								key: item.id,
								value: item.id
							})) : [])
						]
					}
						onChange={value => {
							if(specPracticeSub?.includes('all')===false && value?.includes('all')){
								setSpecPracticeSub(['all'])
							}else{
								const x = value.filter((i)=>i!=='all')
								setSpecPracticeSub(x)
							}
							// setSpecPracticeSub(value)
							handleChangeSpecialty(value)
							setFilter({
								...filter,
								specialtyName: value
							})
						}}
					/>
				</Col>
			</Row>
			<Row gutter={[16, 0]} className="mt-4 flex items-center mrr">
				<Col span={2}>
					<Typography.Text className="whitespace-nowrap mobileFont">{t('courseNumber')}</Typography.Text>
				</Col>
				<Col span={3} className='grow overWrite'>
					<Select
						disabled={filter.subDivision==='all'}
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
				<Col span={2}>
					<Typography.Text className='mobileFont'>{t('practiceKind')}</Typography.Text>
				</Col>
				<Col span={5} className='overWrite grow'>
					<Select
						disabled={filter.subDivision==='all'}
						mode='multiple'
						popupMatchSelectWidth={false}
						value={selectedValueKind}
						className="w-full"
						options={ [
							{ key: 2244612, value: 'all', label: t('all') },
							...(Array.isArray(dataSubKindPractice) ? dataSubKindPractice.map(item => ({
								label: item.value,
								key: item.id,
								value: item.id
							})) : [])
						]
					}

						onChange={value => {
							if(kindPracticeSub?.includes('all')===false && value?.includes('all')){
								setKindPracticeSub(['all'])
							}else{
								const x = value.filter((i)=>i!=='all')
								setKindPracticeSub(x)
							}
							// setKindPracticeSub(value)
							handleChangeKind(value)
							setFilter({
								...filter,
								practiceKind: value
							})
						}}
					/>
				</Col>
			</Row>
			<Row gutter={[8, 16]} className="mt-4 w-full flex items-center ">
				<Col span={4}>
					<Typography.Text className='mobileFont'>{t('educationLevel')}</Typography.Text>
				</Col>
				<Col span={8} className='overWrite grow'>
					<Select
						disabled={filter.subDivision==='all'}
						mode='multiple'
						value={selectedValuesLevel}
						popupMatchSelectWidth={false}
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
			<Row gutter={[8, 16]} className="mt-4 pb-4 mb-4 w-full flex items-center ">
				<Col span={4}>
					<Typography.Text className='mobileFont'>{t('educationType')}</Typography.Text>
				</Col>
				<Col span={8} className='overWrite grow'>
					<Select
						disabled={filter.subDivision==='all'}
						mode='multiple'
						popupMatchSelectWidth={false}
						value={selectedValueForm}
						className="w-full"
						optionLabelProp="label" 
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
				{/* <Col span={7} offset={5} className='overWrite'>
					<Space className="w-full flex-row-reverse overWrite">
						<Button
							type="primary"
							className="!rounded-full h-10"
							onClick={() => {
								handleCreateSchedule()
							}}
						>
							{createSchedule}
						</Button>
					</Space>
				</Col> */}
			</Row>

					{flag ? <Spin className='w-full mt-20' indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} /> : isLoadingByFilters ?  <Spin className='w-full mt-20' indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />   :
						<Table
							components={{
								body: {
									cell: EditableCell
								}
							}}
							bordered
							dataSource={!newSubdivisionId ? [] : tableData ? tableData?.scheduleContent?.map((item:any)=>{
                                return{
                                    ...item,
                                    period:  [dayjs(item.practiceStartDate), dayjs(item.practiceEndDate)]
                                }
                            }) : []}
							columns={mergedColumns}
							rowClassName="editable-row animate-fade-in"
							pagination={false}
							rowKey="id"

							locale={{
								emptyText: (
								  <div>
									<h3>{t('noDataMessage')}</h3>
									<p>{t('emptyFieldDepartmentMessage')}</p>
								  </div>
								),
							  }}
						/>
						}
						<Row className='mt-5'>
						<Col span={2}  className='overWrite'>
						<Space className="w-full  overWrite">
							<Button
								type="primary"
								className="!rounded-full h-10"
								onClick={() => {
									handleCreateSchedule()
								}}
							>
							{t('save')}
						</Button>
					</Space>
				</Col>
						</Row>
            </Form>
		</section>
		</Spin>
	)
}

export default PracticeSchedule
