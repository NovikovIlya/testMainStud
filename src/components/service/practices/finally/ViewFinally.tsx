// import { LoadingOutlined } from '@ant-design/icons'
// import {
// 	Button,
// 	Col,
// 	Form,
// 	Row,
// 	Select,
// 	Space,
// 	Spin,
// 	Table,
// 	Tooltip,
// 	TreeSelect
// } from 'antd'
// import dayjs from 'dayjs'
// import { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom'

// import {
// 	useGetCafedraNewQuery,
// 	useGetGroupNumberQuery,
// 	useGetGroupNumbersNewQuery,
// 	useGetPracticeTypeForPracticeQuery,
// 	useGetPracticesAllQuery,
// 	useGetPractiseSubdevisionApiTeacherQuery,
// 	useGetPractiseSubdevisionNewQuery,
// 	useGetSubdivisionForPracticeQuery
// } from '../../../../store/api/practiceApi/individualTask'
// import { useGetAllPracticesFinalQuery, useGetCafDepartmentsQuery } from '../../../../store/api/practiceApi/practical'
// import { useGetSpecialtyNamesForPractiseQuery } from '../../../../store/api/practiceApi/roster'
// import { processingOfDivisions } from '../../../../utils/processingOfDivisions'



// import './ViewPractical.scss'
// import { TitleHeadCell } from '../../businessTrip/NewBusinessTrip/archive/stepTwo/tableStepTwo/titleHeadCell/TitleHeadCell'
// import { disableParents } from '../../../../utils/disableParents'
// import { OptionsNameSpecialty } from '../../practices/roster/registerContracts/RegisterContracts'
// import { useGetAllPracticeTeacherQuery } from '../../../../store/api/practiceApi/practiceTeacher'

// const optionYears = [
// 	{value:'Все'},
// 	{value:'Текущие'},
// 	{value:'Прошедшие'}
// ]

// const optionYearsTwo = [
// 	{value:'Учебный год (по убыванию)'},
// 	{value:'Учебный год (по возрастанию)'},
// ]

// export const ViewFinally = () => {
// 	const [fullTable,setFullTable] = useState(true)
// 	const [form] = Form.useForm()
// 	const navigate = useNavigate()
// 	const initialFormValues = {
// 		podrazdelenie: 'Все',
// 		semester: 'Все',
// 	};
// 	const [pickCourse, setPickCourse] = useState<any>(null)
// 	const [pickSpeciality,setPickSpeciality] = useState(null)
// 	const [subDevisionId, setSubDevisionId] = useState(null)
// 	const [objType, setObjType] = useState<any>({subdivisionId: null,specialtyNameId: null})
// 	const [selectedFieldsFull, setSelectedFieldFull] = useState<any[]>([])
// 	const [departments, setDepartments] = useState<any[]>()
// 	const [filter, setFilter] = useState({
// 		nameSpecialty: 'Все',
// 		department: 'Все',
// 		course: 'Все',
// 		semester: 'Все',
// 		practiceType: 'Все',
// 		subdivision:'Все',
// 		dateFilling: 'Все',
// 		groupNumber: 'Все',
// 		dateYear:'Учебный год (по убыванию)'
// 	})
// 	const {data: dataPractiseAll,isSuccess: isSuccessPractiseAll,isFetching: isFetchingPractiseAll} = useGetAllPracticesFinalQuery()
// 	const {data:dataSubdevisionPracticeNew} = useGetPractiseSubdevisionApiTeacherQuery()
// 	const [tableData, setTableData] = useState<any[]>(dataPractiseAll)
// 	const [nameSpecialty, setNameSpecialty] = useState<OptionsNameSpecialty[]>()
// 	// const { data: dataDepartments, isSuccess: isSuccessDepartments } = useGetSubdivisionForPracticeQuery()
// 	const { data: dataNameSpecialty, isSuccess: isSuccessNameSpecialty } = useGetSpecialtyNamesForPractiseQuery(subDevisionId, {skip:!subDevisionId || subDevisionId==='Все'})
// 	const { data: dataPracticeType, isSuccess: isSuccessPracticeType } = useGetPracticeTypeForPracticeQuery(objType, {skip: objType.subDivisionId === null || !objType.specialtyNameId })
// 	const {data:dataGroupNumberNew} = useGetGroupNumbersNewQuery(subDevisionId,{ skip: !subDevisionId || subDevisionId === 'Все' })
// 	const [treeLine, setTreeLine] = useState(true);
// 	const [showLeafIcon, setShowLeafIcon] = useState(false);
// 	const [value, setValue] = useState<any>();

// 	const columns = [
// 		{
// 			key: 'subdivision',
// 			dataIndex: 'subdivision',
// 			title: 'Подразделение',
// 			name: 'Подразделение',
// 			className: 'text-xs !p-4',
			
// 		},
// 		{
// 			key: 'group',
// 			dataIndex: 'group',
// 			title: 'Номер группы',
// 			align: 'center',
// 			className: 'text-xs !p-4'
// 		},
// 		{
// 			key: 'specialty',
// 			dataIndex: 'specialty',
// 			title: 'Шифр и наименование специальности',
// 			name: 'Шифр и наименование специальности',
// 			className: 'text-xs !p-4',


// 		},
// 		{
// 			key: 'practiceType',
// 			dataIndex: 'practiceType',
// 			title: 'Тип практики',
// 			className: 'text-xs !p-4 mobileFirst'
// 		},
// 		{
// 			key: 'department',
// 			dataIndex: 'department',
// 			title: 'Кафедра',
// 			className: 'text-xs !p-4 mobileFirst'
// 		},
// 		{
// 			key: 'semester',
// 			dataIndex: 'semester',
// 			title: 'Семестр',
// 			align: 'center',
// 			className: 'text-xs !p-4'
// 		},
// 		{
// 			key: 'academicYear',
// 			dataIndex: 'academicYear',
// 			title: 'Учебный год',
// 			align: 'center',
// 			className: 'text-xs !p-4',
// 			// sorter: (a:any, b:any) => +new Date(a.academicYear.split('/')[0]) - +new Date(b.academicYear.split('/')[0]),
// 		},
// 		{
// 			key: 'course',
// 			dataIndex: 'course',
// 			title: 'Курс',
// 			align: 'center',
// 			className: 'text-xs !p-4 mobileFirst'
// 		},
// 		{
// 			key: 'period',
// 			dataIndex: 'period',
// 			title: 'Период практики',
// 			align: 'center',
// 			className: 'text-xs !p-4',
// 			render: (_: any, record: any) => {
// 				return (
// 					<div className={'flex flex-col'}>
// 						<span>{dayjs(record.period.split(' - ')[0].trim()).format('DD.MM.YYYY')}</span>-
// 						<span>{dayjs(record.period.split(' - ')[1].trim()).format('DD.MM.YYYY')}</span>
// 					</div>
// 				)
// 			}
// 		},
		
// 	]
// 	const columnsCompressed = [
// 		{
// 			key: 'subdivision',
// 			dataIndex: 'subdivision',
// 			title: <TitleHeadCell title={'Подразделение'}/>,
// 			name: 'Подразделение',
// 			className: 'text-xs !p-2 mobileFirst',
// 			width: '20%',
			
// 			responsive: ['xs'],
// 		},
// 		{
// 			key: 'specialtyName',
// 			dataIndex: 'specialtyName',
// 			title: <TitleHeadCell title={'Шифр и наименование специальности'}/>,
// 			name: 'Шифр и наименование специальности',
// 			className: 'text-xs !p-2',

		
// 		},
// 		{
//             title: <TitleHeadCell title={'Дата заполнения'}/>,
//             dataIndex: 'dateFilling',
//             width: '20%',
//             render: (text:any) => dayjs(text).format('DD.MM.YYYY')
//         },
// 		{
// 			key: 'practiceType',
// 			dataIndex: 'practiceType',

// 			title: <TitleHeadCell title={'Тип практики'}/>,
// 			className: 'text-xs !p-2 mobileFirst'
		
// 		},
// 		{
// 			key: 'semester',
// 			dataIndex: 'semester',
// 			title: <TitleHeadCell title={'Семестр'}/>,
// 			align: 'center',
// 			className: 'text-xs !p-2 mobileFirst'
// 		},
// 		{
// 			key: 'courseNumber',
// 			dataIndex: 'courseNumber',
// 			title: <TitleHeadCell title={'Курс'}/>,
// 			align: 'center',
// 			className: 'text-xs !p-2 mobileFirst'
// 		}
		
// 	]

// 	// useEffect(() => {
// 	// 	if (isSuccessDepartments) {
// 	// 		setDepartments(processingOfDivisions(dataDepartments))
// 	// 	}
// 	// }, [dataDepartments])

// 	useEffect(() => {
// 		if (isSuccessPractiseAll) setTableData(dataPractiseAll)
// 	}, [isSuccessPractiseAll, isFetchingPractiseAll])

// 	useEffect(() => {
// 		if (isSuccessNameSpecialty) {
// 			setNameSpecialty(dataNameSpecialty)
// 		}
// 	}, [dataNameSpecialty])

// 	useEffect(() => {
// 		if (isSuccessPractiseAll) {
// 			setTableData(filterDataFull())
// 		}
// 	}, [filter, isSuccessPractiseAll])

// 	useEffect(() => {
	
// 		if (isSuccessNameSpecialty && subDevisionId && isSuccessNameSpecialty) {
// 			const pickSpecialityId = dataNameSpecialty?.find((elem: any) => {
// 				if (elem.value === pickSpeciality) {
// 					return elem
// 				}
// 			})
			
// 			setObjType({
// 				...objType,
// 				subdivisionId: subDevisionId,
// 				specialtyNameId: pickSpecialityId?.id
// 			})
// 		}
// 	}, [isSuccessNameSpecialty, form, pickSpeciality])

// 	useEffect(()=>{
// 		if(pickCourse === 'Все'){
		
// 			setFilter({
// 				...filter,
// 				semester: 'Все'
// 			})
// 		}
// 	},[pickCourse])


// 	function filterDataFull() {
// 		function filterPracticeType(elem: any) {
// 			if (filter.practiceType === 'Все') {
// 				return elem
// 			} else {
// 				return elem.practiceType === filter.practiceType
// 			}
// 		}

// 		function filterDepartment(elem: any) {
			
// 			if (filter.department === 'Все') {
// 				return elem
// 			} else {
// 				return elem.department === filter.department
// 			}
// 		}
// 		function filterSubdivision(elem: any) {

// 			if (filter.subdivision === 'Все') {
// 				return elem
// 			} 
// 			else {
	
// 				// @ts-ignore
// 				return elem.subdivision === filter.subdivision
// 			}
// 		}

// 		function filterCourse(elem: any) {
// 			if (filter.course === 'Все') {
// 				return elem
// 			} else {
// 				// @ts-ignore
// 				return elem.course === filter.course
// 			}
// 		}

// 		function filterSemester(elem: any) {
// 			if (filter.semester === 'Все') {
// 				return elem
// 			} else {
// 				return Number(elem.semester) === Number(filter.semester)
// 			}
// 		}

// 		function filterNameSpecialty(elem: any) {

// 			if (filter.nameSpecialty === 'Все') {
// 				return elem
// 			} else {
// 				return elem.specialty === filter.nameSpecialty
// 			}
// 		}
// 		function filterGroup(elem: any) {
// 			if (filter.groupNumber === 'Все') {
// 				return elem
// 			} else {
// 				return elem.group === filter.groupNumber
// 			}
// 		}
// 		function filterPast(elem: any) {
// 			if (filter.dateFilling === 'Прошедшие') {
// 				return dayjs(elem.period.split(' - ')[1].trim()).format('DD.MM.YYYY') < dayjs().format('DD.MM.YYYY')
//             }
// 			if (filter.dateFilling === 'Текущие') {
// 				return dayjs(elem.period.split(' - ')[1].trim()).format('DD.MM.YYYY') >= dayjs().format('DD.MM.YYYY')
//             }
// 			else{
// 				return elem
// 			}
// 		}
	
// 		function sortDateFilling(a:any, b:any) {
//             if (filter.dateYear === 'Учебный год (по убыванию)') {
// 				console.log('filter.dateFilling0',filter.dateYear)
//                 return +new Date(b.academicYear.split('/')[0]) - +new Date(a.academicYear.split('/')[0])
				
//             }
//             if (filter.dateYear === 'Учебный год (по возрастанию)') {
// 				console.log('filter.dateFilling1',filter.dateYear)
// 				console.log('1',a.academicYear.split('/')[0])
//                 return +new Date(a.academicYear.split('/')[0]) - +new Date(b.academicYear.split('/')[0])
//             }
			
//             return 0
//         }

// 		return dataPractiseAll
// 			? dataPractiseAll
// 					.filter((elem: any) => filterPracticeType(elem))
// 					.filter((elem: any) => filterDepartment(elem))
// 					.filter((elem: any) => filterCourse(elem))
// 					.filter((elem: any) => filterSemester(elem))
// 					.filter((elem: any) => filterNameSpecialty(elem))
// 					.filter((elem :any) => filterSubdivision(elem))
// 					.filter((elem :any) => filterGroup(elem))
// 					.filter((elem :any) => filterPast(elem))
// 					.sort((a:any, b:any) => sortDateFilling(a, b))
// 			: []
// 	}
// 	const handleChange = (value: string) => {
// 		departments?.find(elem => {
// 			if (elem.label === value) {
// 				console.log('elem.id',elem.id)
// 				setSubDevisionId(elem.id)
// 			}
// 		})
// 		setFilter({
// 			...filter,
// 			subdivision: value
// 		})
// 	}
// 	const onPopupScroll: any = (e:any) => {
//         console.log('onPopupScroll', e);
//     };
// 	const handleSelect = (value:any)=>{
		
// 		setPickSpeciality(value)
// 	}

// 	const handleCourse = (value:any)=>{
// 		setPickCourse(value)
// 		form.setFieldValue('semester', '')
// 	}
	
// 	const optionsCourseValid = (() => {
// 		switch (pickCourse) {
// 			case 1:
// 				return [
// 					{ value: 'Все', label: 'Все' },
// 					{ value: '1', label: '1' },
// 					{ value: '2', label: '2' }
// 				];
// 			case 2:
// 				return [
// 					{ value: 'Все', label: 'Все' },
// 					{ value: '3', label: '3' },
// 					{ value: '4', label: '4' }
// 				];
// 			case 3:
// 				return [
// 					{ value: 'Все', label: 'Все' },
// 					{ value: '5', label: '5' },
// 					{ value: '6', label: '6' }
// 				];
// 			case 4:
// 				return [
// 					{ value: 'Все', label: 'Все' },
// 					{ value: '7', label: '7' },
// 					{ value: '8', label: '8' }
// 				];
// 			case 5:
// 				return [
// 					{ value: 'Все', label: 'Все' },
// 					{ value: '9', label: '9' },
// 					{ value: '10', label: '10' }
// 				];
// 			case 6:
// 				return [
// 					{ value: 'Все', label: 'Все' },
// 					{ value: '11', label: '11' },
// 					{ value: '12', label: '12' }
// 				];
// 			default:
// 				return [];
// 		}
// 	})()
	
// 	const handleRowClick = (record: any) => {
// 		navigate(`/services/practices/finally/edit/${record.id}`)
// 	}

// 	const treeData = [{ key: 'Все', value: 'Все', label: 'Все' },...(dataSubdevisionPracticeNew ? dataSubdevisionPracticeNew?.map((item:any)=>{
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
//     }):[])]
// 	const treeDataValid = dataPractiseAll?.map((item:any)=>item.subdivision)
// 	console.log('treeData',treeData)
// 	const uniqueCourseNumbers = [...new Set(tableData?.map((item:any) => item.course))];


// 	return (
// 		<>
// 			<section className="container animate-fade-in">
// 			<Form form={form} initialValues={initialFormValues}>
// 				<Row>
// 					<Col flex={'auto'}>
// 						<span className="mb-14 text-[28px]">Итоговая проверка</span>
// 					</Col>
				
// 				</Row>
// 				<Row gutter={[16, 16]} className="mt-12 overWrite mb-4">
// 					<Col span={5} className='overWrite'>
// 						<span>Подразделение</span>
// 					</Col>
// 					<Col span={8} className='overWrite'>
// 					<Form.Item
// 						name={'podrazdelenie'}
// 						className='mb-[-4px]'
// 					>
// 							<TreeSelect
// 								treeLine={treeLine && { showLeafIcon }}
// 								showSearch
// 								style={{ height:'32px',width: '100%' }}
// 								value={value}
// 								dropdownStyle={{  overflow: 'auto' }}
// 								placeholder=""
// 								allowClear
// 								treeDefaultExpandAll
// 								onChange={(value)=>{
// 									setSubDevisionId(value)
// 									handleChange(value)
// 									setFilter({
// 										...filter,
// 										subdivision : value,
// 										nameSpecialty:'Все',
// 										course:'Все',
// 										semester:'Все',
// 										practiceType:'Все',
// 										department:'Все',
// 										groupNumber:'Все',
// 									})
// 									form.setFieldValue('nameSpecialty','Все')
// 									form.setFieldValue('course','Все')
// 									form.setFieldValue('semester','Все')
// 									form.setFieldValue('practiceType','Все')
// 									form.setFieldValue('department','Все')
// 									form.setFieldValue('groupNumber','Все')
// 								}}
// 								treeData={[
// 									{key:'Все',value:'Все',label:'Все'},
// 									...(treeDataValid ? treeDataValid?.map((item:any)=>{
// 									return{key:item, value:item, label:item}
// 									}):[])
// 							]}
// 								onPopupScroll={onPopupScroll}
// 								treeNodeFilterProp="title"
							
// 							/>
// 						</Form.Item>
// 					</Col>
					
// 				</Row>
				
// 				<Row gutter={[16, 16]} className="mt-1 overWrite">
// 					<Col span={5} className='overWrite'>
// 						<span>Наименование специальности</span>
// 					</Col>
// 					<Col span={8} className='overWrite'>
// 					<Form.Item
// 						name={'nameSpecialty'}
// 						className='mb-[-4px]'
// 					>
// 						<Tooltip title={filter.subdivision==='Все' ? 'Выберите подразделение' : ''}><Select
// 							disabled={filter.subdivision==='Все' || !filter.subdivision}
// 							popupMatchSelectWidth={false}
// 							defaultValue="Все"
// 							className="w-full"
// 							options={[
// 								{ key: 2244612, value: 'Все', label: 'Все' },
// 								...(nameSpecialty
// 									? nameSpecialty.map(item => ({
// 											key: item.id,
// 											value: item.value,
// 											label: item.label
// 									  }))
// 									: [])
// 							]}
// 							onChange={value => {
// 								handleSelect(value)
// 								setFilter({
// 									...filter,
// 									nameSpecialty: value
// 								})
// 							}}
// 						/></Tooltip>
// 						</Form.Item>
// 					</Col>
	
// 				</Row>
				

// 				<Row gutter={[16, 16]} className="mt-4 overWrite">
// 					<Col span={5}>
// 						<span>Номер группы</span>
// 					</Col>
// 					<Col span={8} className='overWrite'>
// 					<Form.Item name={'groupNumber'} className='mb-[-4px]'>
// 					<Tooltip title={filter.subdivision==='Все' ? 'Выберите подразделение' : ''}><Select

// 							disabled={filter.subdivision==='Все' || !filter.subdivision}
// 							popupMatchSelectWidth={false}
// 							defaultValue="Все"
// 							className="w-full"
// 							options={[
// 								{ key: 0, value: 'Все', label: 'Все' },
// 								...(dataGroupNumberNew
// 									? dataGroupNumberNew.map(item => ({
// 											key: item.id,
// 											value: item.value,
// 											label: item.label
// 									  }))
// 									: [])
// 							]}
// 							onChange={value => {
// 								setFilter({
// 									...filter,
// 									groupNumber: value
// 								})
// 							}}
// 						/></Tooltip>
// 						</Form.Item>
// 					</Col>
// 				</Row>
// 				<Row gutter={[16, 16]} className='mt-4 overWrite'>
// 				<Col span={5}><span className={'mr-2 mobileFirst'}>Период практики</span></Col>
// 				<Col span={8}  className='mobileFirst overWrite'>
                    
						
                        
//                         <Select
//                             popupMatchSelectWidth={false}
//                             value={filter.dateFilling}
//                             className="w-full"
//                             options={optionYears}
//                             onChange={value => {
//                                 setFilter({
//                                     ...filter,
//                                     dateFilling: value
//                                 })
//                             }}
//                         />
               

//                 </Col>
// 				</Row>

// 				<Row gutter={[16, 16]} className="mt-4 overWrite items-center ">
// 					<Col span={4} className='flex items-center overWrite'>
// 						<span className='w-12'>Курс</span>
				
					
// 						<Form.Item name={'course'} className='mb-[-4px] sm:w-full overWrite'>
// 							<Select
// 								popupMatchSelectWidth={false}
// 								defaultValue="Все"
// 								className="w-full"
// 								options={['Все'].concat(uniqueCourseNumbers).map((item)=>({key: item, value: item, label: item}))}
// 								onChange={value => {
// 									handleCourse(value)
// 									setFilter({
// 										...filter,
// 										course: value
// 									})
// 								}}
// 							/>
// 						</Form.Item>
// 					</Col>
					
// 					<Col span={4} className='flex items-center overWrite'>
// 						<span className='w-20'>Семестр</span>
			
// 						<Form.Item
// 							className='mb-[-4px] sm:w-full items-center'
// 							style={{marginBottom:'0'}}
// 							//rules={[{required: true}]}
// 							name={'semester'}	
// 						>
// 							<Select
// 								defaultValue="Все"
// 								onChange={value => {
									
// 									setFilter({
// 										...filter,
// 										semester: value
// 									})
// 								}}
// 							    disabled={!pickCourse || pickCourse==='Все'} 
// 								size='middle'
// 								popupMatchSelectWidth={false}
// 								className="w-full "
// 								options={optionsCourseValid}
// 							/>
// 						</Form.Item>
// 					</Col>

// 					<Col span={5} className='flex items-center overWrite'>
// 						<span className='w-40'>Тип практики</span>
// 						<Form.Item name={'practiceType'} className='mb-[-4px] sm:max-w-[220px] sm:min-w-[220px]  items-center'>
// 						<Select
// 							disabled={!pickSpeciality}
// 							popupMatchSelectWidth={false}
// 							defaultValue="Все"
// 							className=""
// 							options={[
// 								{ key: 0, value: 'Все', label: 'Все' },
// 								...(dataPracticeType
// 									? dataPracticeType.map((item:any) => ({
// 											key: item.id,
// 											value: item.value,
// 											label: item.label
// 									  }))
// 									: [])
// 							]}
// 							onChange={value => {
// 								setFilter({
// 									...filter,
// 									practiceType: value
// 								})
// 							}}
// 						/>
// 						</Form.Item>
// 					</Col>
// 				</Row>
// 			</Form>
// 			<Row className='flex justify-end'>
				
// 				<Col span={8}  className='mobileFirst mt-4 '>
//                     <div className={'flex gap-2 items-center justify-end '}>
//                         <span className={'mr-2'}>Сортировка</span>
//                         <div className='w-[228px] flex justify-end'><Select
//                             popupMatchSelectWidth={false}
//                             value={filter.dateYear}
//                             className="w-full"
//                             options={optionYearsTwo}
//                             onChange={value => {
//                                 setFilter({
//                                     ...filter,
//                                     dateYear: value
//                                 })
//                             }}
//                         /></div>
//                     </div>

//                 </Col>
			
// 			</Row>

			
// 			{isFetchingPractiseAll ? (
// 				<Spin
// 					className="w-full mt-20"
// 					indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />}
// 				/>
// 			) : (fullTable ?
// 				<Table
// 					onRow={(record) => ({
// 						onClick: (e) => {
// 							// @ts-ignore
// 							if (e.target.closest('.ant-table-selection-column')) {
// 								return
// 							}
// 							handleRowClick(record)},
// 					})}
// 					responsive
// 					size="small"
// 					rowKey="id"
// 					//@ts-ignore
// 					columns={columns}
// 					dataSource={tableData ? tableData : []}
// 					pagination={false}
// 					className="my-10"
					
// 				/> :
// 				<div className='viewPractical'>
// 				<Table
// 					onRow={(record) => ({
// 						onClick: (e) => {
// 							// @ts-ignore
// 							if (e.target.closest('.ant-table-selection-column')) {
// 								return
// 							}
// 							handleRowClick(record)},
// 					})}
// 					responsive
// 					rowKey="id"
// 					//@ts-ignore
// 					columns={columnsCompressed}
// 					dataSource={tableData ? tableData : []}
// 					pagination={tableData && tableData?.length<10?false:{
//                         pageSize: 10
//                     }}
// 					rowClassName={() => 'animate-fade-in'}
// 					className="my-"
// 					rowSelection={{
// 						type: 'checkbox',
// 						onSelect: (record, selected, selectedRows, nativeEvent) => {
// 							setSelectedFieldFull(selectedRows)
// 						},
// 						onSelectAll: (selected, selectedRows, changeRows) => {
// 							setSelectedFieldFull(selectedRows)
// 						}
// 					}}
// 				/>
// 				</div>
// 			)}
// 			</section>
// 		</>
// 	)
// }
import { LoadingOutlined } from '@ant-design/icons'
import {
	Button,
	Col,
	ConfigProvider,
	Form,
	Row,
	Select,
	Space,
	Spin,
	Table,
	Tooltip,
	TreeSelect
} from 'antd'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import {
	useGetCafedraNewQuery,
	useGetGroupNumberQuery,
	useGetGroupNumbersNewQuery,
	useGetPracticeTypeForPracticeQuery,
	useGetPracticesAllQuery,
	useGetPractiseSubdevisionApiTeacherQuery,
	useGetPractiseSubdevisionNewQuery,
	useGetSubdivisionForPracticeQuery
} from '../../../../store/api/practiceApi/individualTask'
import { useGetAllPracticesFinalQuery, useGetCafDepartmentsQuery } from '../../../../store/api/practiceApi/practical'
import { useGetSpecialtyNamesForPractiseQuery } from '../../../../store/api/practiceApi/roster'
import { processingOfDivisions } from '../../../../utils/processingOfDivisions'

import './ViewPractical.scss'
import { TitleHeadCell } from '../../businessTrip/NewBusinessTrip/archive/stepTwo/tableStepTwo/titleHeadCell/TitleHeadCell'
import { disableParents } from '../../../../utils/disableParents'
import { OptionsNameSpecialty } from '../../practices/roster/registerContracts/RegisterContracts'
import { useGetAllPracticeTeacherQuery } from '../../../../store/api/practiceApi/practiceTeacher'

export const ViewFinally = () => {
  const { t } = useTranslation()
  // Для фильтров удобно использовать константу для значения "Все"
  const ALL_VALUE = "all"

  // Опции для фильтрации периода практики
  const optionYears = [
    { value: ALL_VALUE, label: t('all') },
    { value: "current", label: t('current') },
    { value: "past", label: t('past') }
  ]

  // Опции для сортировки учебного года
  const optionYearsTwo = [
    { value: "academicYearDesc", label: t('academicYearDesc') },
    { value: "academicYearAsc", label: t('academicYearAsc') }
  ]

  const [fullTable, setFullTable] = useState(true)
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const initialFormValues = {
    podrazdelenie: ALL_VALUE,
    semester: ALL_VALUE,
  }
  const [pickCourse, setPickCourse] = useState<any>(null)
  const [pickSpeciality, setPickSpeciality] = useState<any>(null)
  const [subDevisionId, setSubDevisionId] = useState<any>(null)
  const [objType, setObjType] = useState<any>({ subdivisionId: null, specialtyNameId: null })
  const [selectedFieldsFull, setSelectedFieldFull] = useState<any[]>([])
  const [departments, setDepartments] = useState<any[]>()
  const [filter, setFilter] = useState({
    nameSpecialty: ALL_VALUE,
    department: ALL_VALUE,
    course: ALL_VALUE,
    semester: ALL_VALUE,
    practiceType: ALL_VALUE,
    subdivision: ALL_VALUE,
    dateFilling: ALL_VALUE,
    groupNumber: ALL_VALUE,
    dateYear: "academicYearDesc"
  })
  const { data: dataPractiseAll, isSuccess: isSuccessPractiseAll, isFetching: isFetchingPractiseAll } = useGetAllPracticesFinalQuery()
  const { data: dataSubdevisionPracticeNew } = useGetPractiseSubdevisionApiTeacherQuery()
  const [tableData, setTableData] = useState<any[]>(dataPractiseAll)
  const [nameSpecialty, setNameSpecialty] = useState<OptionsNameSpecialty[]>()
  const { data: dataNameSpecialty, isSuccess: isSuccessNameSpecialty } = useGetSpecialtyNamesForPractiseQuery(subDevisionId, { skip: !subDevisionId || subDevisionId === ALL_VALUE })
  const { data: dataPracticeType, isSuccess: isSuccessPracticeType } = useGetPracticeTypeForPracticeQuery(objType, { skip: objType.subdivisionId === null || !objType.specialtyNameId })
  const { data: dataGroupNumberNew } = useGetGroupNumbersNewQuery(subDevisionId, { skip: !subDevisionId || subDevisionId === ALL_VALUE })
  const [treeLine, setTreeLine] = useState(true)
  const [showLeafIcon, setShowLeafIcon] = useState(false)
  const [value, setValue] = useState<any>()

  const columns = [
    {
      key: 'subdivision',
      dataIndex: 'subdivision',
      title: t('subdivision'),
      name: t('subdivision'),
      className: 'text-xs !p-4',
    },
    {
      key: 'group',
      dataIndex: 'group',
      title: t('groupNumber'),
      align: 'center',
      className: 'text-xs !p-4'
    },
    {
      key: 'specialty',
      dataIndex: 'specialty',
      title: t('specialtyInfo'),
      name: t('specialtyInfo'),
      className: 'text-xs !p-4',
    },
    {
      key: 'practiceType',
      dataIndex: 'practiceType',
      title: t('practiceType'),
      className: 'text-xs !p-4 mobileFirst'
    },
    {
      key: 'department',
      dataIndex: 'department',
      title: t('department'),
      className: 'text-xs !p-4 mobileFirst'
    },
    {
      key: 'semester',
      dataIndex: 'semester',
      title: t('semester'),
      align: 'center',
      className: 'text-xs !p-4'
    },
    {
      key: 'academicYear',
      dataIndex: 'academicYear',
      title: t('academicYear'),
      align: 'center',
      className: 'text-xs !p-4',
    },
    {
      key: 'course',
      dataIndex: 'course',
      title: t('course'),
      align: 'center',
      className: 'text-xs !p-4 mobileFirst'
    },
    {
      key: 'period',
      dataIndex: 'period',
      title: t('practicePeriod'),
      align: 'center',
      className: 'text-xs !p-4',
      render: (_: any, record: any) => {
        return (
          <div className="flex flex-col">
            <span>{dayjs(record.period.split(' - ')[0].trim()).format('DD.MM.YYYY')}</span>-
            <span>{dayjs(record.period.split(' - ')[1].trim()).format('DD.MM.YYYY')}</span>
          </div>
        )
      }
    },
  ]

  const columnsCompressed = [
    {
      key: 'subdivision',
      dataIndex: 'subdivision',
      title: <TitleHeadCell title={t('subdivision')}/>,
      name: t('subdivision'),
      className: 'text-xs !p-2 mobileFirst',
      width: '20%',
      responsive: ['xs'],
    },
    {
      key: 'specialtyName',
      dataIndex: 'specialtyName',
      title: <TitleHeadCell title={t('specialtyInfo')}/>,
      name: t('specialtyInfo'),
      className: 'text-xs !p-2',
    },
    {
      title: <TitleHeadCell title={t('dateFilling')}/>,
      dataIndex: 'dateFilling',
      width: '20%',
      render: (text: any) => dayjs(text).format('DD.MM.YYYY')
    },
    {
      key: 'practiceType',
      dataIndex: 'practiceType',
      title: <TitleHeadCell title={t('practiceType')}/>,
      className: 'text-xs !p-2 mobileFirst'
    },
    {
      key: 'semester',
      dataIndex: 'semester',
      title: <TitleHeadCell title={t('semester')}/>,
      align: 'center',
      className: 'text-xs !p-2 mobileFirst'
    },
    {
      key: 'courseNumber',
      dataIndex: 'courseNumber',
      title: <TitleHeadCell title={t('course')}/>,
      align: 'center',
      className: 'text-xs !p-2 mobileFirst'
    }
  ]

  useEffect(() => {
    if (isSuccessPractiseAll) setTableData(dataPractiseAll)
  }, [isSuccessPractiseAll, isFetchingPractiseAll])

  useEffect(() => {
    if (isSuccessNameSpecialty) {
      setNameSpecialty(dataNameSpecialty)
    }
  }, [dataNameSpecialty])

  useEffect(() => {
    if (isSuccessPractiseAll) {
      setTableData(filterDataFull())
    }
  }, [filter, isSuccessPractiseAll])

  useEffect(() => {
    if (isSuccessNameSpecialty && subDevisionId && isSuccessNameSpecialty) {
      const pickSpecialityId = dataNameSpecialty?.find((elem: any) => {
        return elem.value === pickSpeciality
      })

      setObjType({
        ...objType,
        subdivisionId: subDevisionId,
        specialtyNameId: pickSpecialityId?.id
      })
    }
  }, [isSuccessNameSpecialty, form, pickSpeciality])

  useEffect(() => {
    if (pickCourse === ALL_VALUE) {
      setFilter({
        ...filter,
        semester: ALL_VALUE
      })
    }
  }, [pickCourse])

  function filterDataFull() {
    function filterPracticeType(elem: any) {
      return filter.practiceType === ALL_VALUE ? elem : elem.practiceType === filter.practiceType
    }

    function filterDepartment(elem: any) {
      return filter.department === ALL_VALUE ? elem : elem.department === filter.department
    }
    function filterSubdivision(elem: any) {
      return filter.subdivision === ALL_VALUE ? elem : elem.subdivision === filter.subdivision
    }
    function filterCourse(elem: any) {
      return filter.course === ALL_VALUE ? elem : elem.course === filter.course
    }
    function filterSemester(elem: any) {
      return filter.semester === ALL_VALUE ? elem : Number(elem.semester) === Number(filter.semester)
    }
    function filterNameSpecialty(elem: any) {
      return filter.nameSpecialty === ALL_VALUE ? elem : elem.specialty === filter.nameSpecialty
    }
    function filterGroup(elem: any) {
      return filter.groupNumber === ALL_VALUE ? elem : elem.group === filter.groupNumber
    }
    function filterPast(elem: any) {
      if (filter.dateFilling === "past") {
        return dayjs(elem.period.split(' - ')[1].trim()).format('DD.MM.YYYY') < dayjs().format('DD.MM.YYYY')
      }
      if (filter.dateFilling === "current") {
        return dayjs(elem.period.split(' - ')[1].trim()).format('DD.MM.YYYY') >= dayjs().format('DD.MM.YYYY')
      }
      return elem
    }

    function sortDateFilling(a: any, b: any) {
      if (filter.dateYear === "academicYearDesc") {
        return +new Date(b.academicYear.split('/')[0]) - +new Date(a.academicYear.split('/')[0])
      }
      if (filter.dateYear === "academicYearAsc") {
        return +new Date(a.academicYear.split('/')[0]) - +new Date(b.academicYear.split('/')[0])
      }
      return 0
    }

    return dataPractiseAll
      ? dataPractiseAll
          .filter((elem:any) => filterPracticeType(elem))
          .filter((elem:any) => filterDepartment(elem))
          .filter((elem:any) => filterCourse(elem))
          .filter((elem:any) => filterSemester(elem))
          .filter((elem:any) => filterNameSpecialty(elem))
          .filter((elem:any) => filterSubdivision(elem))
          .filter((elem:any) => filterGroup(elem))
          .filter((elem:any) => filterPast(elem))
          .sort((a:any, b:any) => sortDateFilling(a, b))
      : []
  }

  const handleChange = (value: string) => {
    departments?.find(elem => {
      if (elem.label === value) {
        setSubDevisionId(elem.id)
      }
    })
    setFilter({
      ...filter,
      subdivision: value
    })
  }
  const onPopupScroll: any = (e: any) => {
    console.log('onPopupScroll', e)
  }
  const handleSelect = (value: any) => {
    setPickSpeciality(value)
  }

  const handleCourse = (value: any) => {
    setPickCourse(value)
    form.setFieldValue('semester', '')
  }

  const optionsCourseValid = (() => {
    switch (pickCourse) {
      case 1:
        return [
          { value: ALL_VALUE, label: t('all') },
          { value: '1', label: '1' },
          { value: '2', label: '2' }
        ]
      case 2:
        return [
          { value: ALL_VALUE, label: t('all') },
          { value: '3', label: '3' },
          { value: '4', label: '4' }
        ]
      case 3:
        return [
          { value: ALL_VALUE, label: t('all') },
          { value: '5', label: '5' },
          { value: '6', label: '6' }
        ]
      case 4:
        return [
          { value: ALL_VALUE, label: t('all') },
          { value: '7', label: '7' },
          { value: '8', label: '8' }
        ]
      case 5:
        return [
          { value: ALL_VALUE, label: t('all') },
          { value: '9', label: '9' },
          { value: '10', label: '10' }
        ]
      case 6:
        return [
          { value: ALL_VALUE, label: t('all') },
          { value: '11', label: '11' },
          { value: '12', label: '12' }
        ]
      default:
        return []
    }
  })()

  const handleRowClick = (record: any) => {
    navigate(`/services/practices/finally/edit/${record.id}`)
  }

  const treeData = [
    { key: ALL_VALUE, value: ALL_VALUE, label: t('all') },
    ...(dataSubdevisionPracticeNew
      ? dataSubdevisionPracticeNew.map((item: any) => {
          return {
            title: item.value,
            value: item.id,
            // @ts-ignore
            children: item?.responses?.map((sub: any) => {
              return {
                title: sub.value,
                value: sub.id,
              }
            })
          }
        })
      : [])
  ]
  const treeDataValid = dataPractiseAll?.map((item: any) => item.subdivision)
  const uniqueCourseNumbers = [...new Set(tableData?.map((item: any) => item.course))]

  return (
    <>
      <section className="container animate-fade-in">
        <Form form={form} initialValues={initialFormValues}>
          <Row>
            <Col flex={'auto'}>
              <span className="mb-14 text-[28px]">{t('finalCheckTitle')}</span>
            </Col>
          </Row>
          <Row gutter={[16, 16]} className="mt-12 overWrite mb-4">
            <Col span={5} className="overWrite">
              <span>{t('subdivision')}</span>
            </Col>
            <Col span={8} className="overWrite">
              <Form.Item name={'podrazdelenie'} className="mb-[-4px]">
                <TreeSelect
                  treeLine={treeLine && { showLeafIcon }}
                  showSearch
                  style={{ height: '32px', width: '100%' }}
                  value={value}
                  dropdownStyle={{ overflow: 'auto' }}
                  placeholder=""
                  allowClear
                  treeDefaultExpandAll
                  onChange={(val) => {
                    setSubDevisionId(val)
                    handleChange(val)
                    setFilter({
                      ...filter,
                      subdivision: val,
                      nameSpecialty: ALL_VALUE,
                      course: ALL_VALUE,
                      semester: ALL_VALUE,
                      practiceType: ALL_VALUE,
                      department: ALL_VALUE,
                      groupNumber: ALL_VALUE,
                    })
                    form.setFieldValue('nameSpecialty', ALL_VALUE)
                    form.setFieldValue('course', ALL_VALUE)
                    form.setFieldValue('semester', ALL_VALUE)
                    form.setFieldValue('practiceType', ALL_VALUE)
                    form.setFieldValue('department', ALL_VALUE)
                    form.setFieldValue('groupNumber', ALL_VALUE)
                  }}
                  treeData={[
                    { key: ALL_VALUE, value: ALL_VALUE, label: t('all') },
                    ...(treeDataValid
                      ? treeDataValid.map((item: any) => {
                          return { key: item, value: item, label: item }
                        })
                      : [])
                  ]}
                  onPopupScroll={onPopupScroll}
                  treeNodeFilterProp="title"
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 16]} className="mt-1 overWrite">
            <Col span={5} className="overWrite">
              <span>{t('specialtyName')}</span>
            </Col>
            <Col span={8} className="overWrite">
              <Form.Item name={'nameSpecialty'} className="mb-[-4px]">
                <Tooltip title={filter.subdivision === ALL_VALUE ? t('selectSubdivision') : ''}>
                  <Select
                    disabled={filter.subdivision === ALL_VALUE || !filter.subdivision}
                    popupMatchSelectWidth={false}
                    defaultValue={ALL_VALUE}
                    className="w-full"
                    options={[
                      { key: 2244612, value: ALL_VALUE, label: t('all') },
                      ...(nameSpecialty
                        ? nameSpecialty.map(item => ({
                            key: item.id,
                            value: item.value,
                            label: item.label
                          }))
                        : [])
                    ]}
                    onChange={value => {
                      handleSelect(value)
                      setFilter({
                        ...filter,
                        nameSpecialty: value
                      })
                    }}
                  />
                </Tooltip>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 16]} className="mt-4 overWrite">
            <Col span={5}>
              <span>{t('groupNumber')}</span>
            </Col>
            <Col span={8} className="overWrite">
              <Form.Item name={'groupNumber'} className="mb-[-4px]">
                <Tooltip title={filter.subdivision === ALL_VALUE ? t('selectSubdivision') : ''}>
                  <Select
                    disabled={filter.subdivision === ALL_VALUE || !filter.subdivision}
                    popupMatchSelectWidth={false}
                    defaultValue={ALL_VALUE}
                    className="w-full"
                    options={[
                      { key: 0, value: ALL_VALUE, label: t('all') },
                      ...(dataGroupNumberNew
                        ? dataGroupNumberNew.map(item => ({
                            key: item.id,
                            value: item.value,
                            label: item.label
                          }))
                        : [])
                    ]}
                    onChange={value => {
                      setFilter({
                        ...filter,
                        groupNumber: value
                      })
                    }}
                  />
                </Tooltip>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 16]} className="mt-4 overWrite">
            <Col span={5}>
              <span className="mr-2 mobileFirst">{t('practicePeriod')}</span>
            </Col>
            <Col span={8} className="mobileFirst overWrite">
              <Select
                popupMatchSelectWidth={false}
                value={filter.dateFilling}
                className="w-full"
                options={optionYears}
                onChange={value => {
                  setFilter({
                    ...filter,
                    dateFilling: value
                  })
                }}
              />
            </Col>
          </Row>

          <Row gutter={[16, 16]} className="mt-4 overWrite items-center">
            <Col span={4} className="flex items-center overWrite">
              <span className="w-12">{t('course')}</span>
              <Form.Item name={'course'} className="mb-[-4px] sm:w-full overWrite">
                <Select
                  popupMatchSelectWidth={false}
                  defaultValue={ALL_VALUE}
                  className="w-full"
                  options={[''].concat(uniqueCourseNumbers).map(item => ({ key: item, value: item, label: item || t('all') }))}
                  onChange={value => {
                    handleCourse(value)
                    setFilter({
                      ...filter,
                      course: value
                    })
                  }}
                />
              </Form.Item>
            </Col>

            <Col span={4} className="flex items-center overWrite">
              <span className="w-20">{t('semester')}</span>
              <Form.Item name={'semester'} className="mb-[-4px] sm:w-full items-center">
                <Select
                  defaultValue={ALL_VALUE}
                  onChange={value => {
                    setFilter({
                      ...filter,
                      semester: value
                    })
                  }}
                  disabled={!pickCourse || pickCourse === ALL_VALUE}
                  size="middle"
                  popupMatchSelectWidth={false}
                  className="w-full"
                  options={optionsCourseValid}
                />
              </Form.Item>
            </Col>

            <Col span={5} className="flex items-center overWrite">
              <span className="w-40">{t('practiceType')}</span>
              <Form.Item name={'practiceType'} className="mb-[-4px] sm:max-w-[220px] sm:min-w-[220px] items-center">
                <Select
                  disabled={!pickSpeciality}
                  popupMatchSelectWidth={false}
                  defaultValue={ALL_VALUE}
                  className=""
                  options={[
                    { key: 0, value: ALL_VALUE, label: t('all') },
                    ...(dataPracticeType
                      ? dataPracticeType.map((item: any) => ({
                          key: item.id,
                          value: item.value,
                          label: item.label
                        }))
                      : [])
                  ]}
                  onChange={value => {
                    setFilter({
                      ...filter,
                      practiceType: value
                    })
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <Row className="flex justify-end">
          <Col span={8} className="mobileFirst mt-4">
            <div className="flex gap-2 items-center justify-end">
              <span className="mr-2">{t('sorting')}</span>
              <div className="w-[228px] flex justify-end">
                <Select
                  popupMatchSelectWidth={false}
                  value={filter.dateYear}
                  className="w-full"
                  options={optionYearsTwo}
                  onChange={value => {
                    setFilter({
                      ...filter,
                      dateYear: value
                    })
                  }}
                />
              </div>
            </div>
          </Col>
        </Row>

        {isFetchingPractiseAll ? (
          <Spin className="w-full mt-20" indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
        ) : fullTable ? (
          <ConfigProvider
                                        theme={{
                                          components: {
                                            Table: {
                                              headerBg: 'rgb(218, 231, 251)'
                                            }
                                          }
                                        }}
                                      ><Table
            onRow={(record) => ({
              onClick: (e) => {
                // @ts-ignore
                if (e.target.closest('.ant-table-selection-column')) {
                  return
                }
                handleRowClick(record)
              },
            })}
            responsive
            size="small"
            rowKey="id"
            //@ts-ignore
            columns={columns}
            dataSource={tableData ? tableData : []}
            pagination={false}
            className="my-10"
          /></ConfigProvider>
        ) : (
          <div className="viewPractical">
            <Table
              onRow={(record) => ({
                onClick: (e) => {
                  // @ts-ignore
                  if (e.target.closest('.ant-table-selection-column')) {
                    return
                  }
                  handleRowClick(record)
                },
              })}
              responsive
              rowKey="id"
              //@ts-ignore
              columns={columnsCompressed}
              dataSource={tableData ? tableData : []}
              pagination={tableData && tableData?.length < 10 ? false : { pageSize: 10 }}
              rowClassName={() => 'animate-fade-in'}
              className="my-"
              rowSelection={{
                type: 'checkbox',
                onSelect: (record, selected, selectedRows, nativeEvent) => {
                  setSelectedFieldFull(selectedRows)
                },
                onSelectAll: (selected, selectedRows, changeRows) => {
                  setSelectedFieldFull(selectedRows)
                }
              }}
            />
          </div>
        )}
      </section>
    </>
  )
}
