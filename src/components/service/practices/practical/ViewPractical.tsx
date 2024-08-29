import { LoadingOutlined } from '@ant-design/icons'
import {
	Button,
	Col,
	Form,
	Popover,
	Radio,
	Row,
	Select,
	Space,
	Spin,
	Table
} from 'antd'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { EditSvg } from '../../../../assets/svg/EditSvg'
import { PointsSvg } from '../../../../assets/svg/PointsSvg'
import {
	useGetCafedraNewQuery,
	useGetDepartmentsQuery,
	useGetGroupNumberQuery,
	useGetGroupNumbersNewQuery,
	useGetPracticeKindQuery,
	useGetPracticeTypeForPracticeQuery,
	useGetPracticeTypeQuery,
	useGetPracticesAllQuery,
	useGetPractiseSubdevisionNewQuery,
	useGetSubdivisionForPracticeQuery
} from '../../../../store/api/practiceApi/individualTask'
import { useGetCafDepartmentsQuery } from '../../../../store/api/practiceApi/practical'
import { useGetSpecialtyNamesForPractiseQuery, useGetSpecialtyNamesQuery } from '../../../../store/api/practiceApi/roster'
import { processingOfDivisions } from '../../../../utils/processingOfDivisions'
import { PracticalPopoverContent } from '../popover/practical/PracticalPopoverContent'
import { PracticalPopoverMain } from '../popover/practical/PracticalPopoverMain'
import { OptionsNameSpecialty } from '../roster/registerContracts/RegisterContracts'

import './ViewPractical.scss'
import { TitleHeadCell } from '../../businessTrip/NewBusinessTrip/archive/stepTwo/tableStepTwo/titleHeadCell/TitleHeadCell'


interface FilterType {
	value: string | number
	label: string | number
}


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


export interface TablePractical {
	id: string
	key: string
	specialtyName: string
	practiceType: string
	department: string
	groupNumber: string
	semester: string
	academicYear: string
	courseStudy: string
	practicePeriod: string[]
	totalHours: number
	individualTasks: string[]
	competencies: string[]
	departmentDirector: string
	competence:any,
}

export const ViewPractical = () => {
	const [fullTable,setFullTable] = useState(false)
	const [form] = Form.useForm()
	const navigate = useNavigate()
	const initialFormValues = {
		podrazdelenie: 'Все',
		semester: '',
	};
	const [pickCourse, setPickCourse] = useState<any>(null)
	const [pickSpeciality,setPickSpeciality] = useState(null)
	const [subDevisionId, setSubDevisionId] = useState(null)
	const [objType, setObjType] = useState<any>({subdivisionId: null,specialtyNameId: null})
	const [selectedFieldsFull, setSelectedFieldFull] = useState<TablePractical[]>([])
	const [departments, setDepartments] = useState<any[]>()
	const [filter, setFilter] = useState({
		nameSpecialty: 'Все',
		department: 'Все',
		course: 'Все',
		semester: 'Все',
		practiceType: 'Все',
		subdivision:'Все',
		dateFilling: 'По дате (сначала новые)',
		groupNumber: 'Все'
	})
	const {data: dataPractiseAll,isSuccess: isSuccessPractiseAll,isFetching: isFetchingPractiseAll} = useGetPracticesAllQuery(null, {refetchOnFocus: true})
	const {data:dataSubdevisionPracticeNew} = useGetPractiseSubdevisionNewQuery()
	const [tableData, setTableData] = useState<TablePractical[]>(dataPractiseAll)
	const tokenAccess = localStorage.getItem('access')!.replaceAll('"', '')
	const [nameSpecialty, setNameSpecialty] = useState<OptionsNameSpecialty[]>()
	const { data: dataDepartments, isSuccess: isSuccessDepartments } = useGetSubdivisionForPracticeQuery()
	const { data: dataNameSpecialty, isSuccess: isSuccessNameSpecialty } = useGetSpecialtyNamesForPractiseQuery(subDevisionId, {skip:!subDevisionId})
	const { data: dataDep, isSuccess: isSuccessDep } = useGetCafDepartmentsQuery(subDevisionId,{ skip: !subDevisionId })
	const { data: dataPracticeType, isSuccess: isSuccessPracticeType } = useGetPracticeTypeForPracticeQuery(objType, {skip: objType.subDivisionId === null || objType.specialtyNameId === null})
	const {data:dataGroupNumber} = useGetGroupNumberQuery(subDevisionId, {skip:!subDevisionId})
	const {data:dataGroupNumberNew} = useGetGroupNumbersNewQuery(subDevisionId,{ skip: !subDevisionId })
	const {data:dataGetCafedraNew} = useGetCafedraNewQuery(subDevisionId,{ skip: !subDevisionId })

	const optionsSortDate: any = [
        {value: 'По дате (сначала новые)', label: 'По дате (сначала новые)'},
        {value: 'По дате (сначала старые)', label: 'По дате (сначала старые)'},
    ]

	const columns = [
		{
			key: 'subdivision',
			dataIndex: 'subdivision',
			title: 'Подразделение',
			name: 'Подразделение',
			className: 'text-xs !p-2',
			
		},
		{
			key: 'specialtyName',
			dataIndex: 'specialtyName',
			title: 'Шифр и наименование специальности',
			name: 'Шифр и наименование специальности',
			className: 'text-xs !p-2',

			// @ts-ignore
			// render: (text, record) => (
			// 	<div className={'flex items-center'}>
			// 		<span className={'underline flex font-bold'}>{text}</span>
			// 		<Button
			// 			type="text"
			// 			icon={<EditSvg />}
			// 			onClick={() => {
			// 				navigate(
			// 					`/services/practices/practical/editPractical/${record.id}`
			// 				)
			// 			}}
			// 		/>
			// 	</div>
			// )
		},
		{
            title: 'Дата заполнения',
            dataIndex: 'dateFilling',
      
            render: (text:any) => dayjs(text).format('DD.MM.YYYY')
        },
		{
			key: 'practiceType',
			dataIndex: 'practiceType',
			title: 'Тип практики',
			className: 'text-xs !p-2'
		},
		{
			key: 'department',
			dataIndex: 'department',
			title: 'Кафедра',
			className: 'text-xs !p-2'
		},
		{
			key: 'groupNumber',
			dataIndex: 'groupNumber',
			title: 'Номер группы',
			align: 'center',
			className: 'text-xs !p-2'
		},
		{
			key: 'semester',
			dataIndex: 'semester',
			title: 'Семестр',
			align: 'center',
			className: 'text-xs !p-2'
		},
		{
			key: 'academicYear',
			dataIndex: 'academicYear',
			title: 'Учебный год',
			align: 'center',
			className: 'text-xs !p-2'
		},
		{
			key: 'courseNumber',
			dataIndex: 'courseNumber',
			title: 'Курс',
			align: 'center',
			className: 'text-xs !p-2'
		},
		{
			key: 'practicePeriod',
			dataIndex: 'practicePeriod',
			title: 'Период практики',
			align: 'center',
			className: 'text-xs !p-2',
			render: (_: any, record: any) => {
				return (
					<div className={'flex flex-col'}>
						<span>{dayjs(record.practicePeriod[0]).format('DD.MM.YYYY')}</span>-
						<span>{dayjs(record.practicePeriod[1]).format('DD.MM.YYYY')}</span>
					</div>
				)
			}
		},
		{
			key: 'totalHours',
			dataIndex: 'totalHours',
			title: 'Кол-во часов по практике',
			align: 'center',
			className: 'text-xs !p-2'
		},
		{
			key: 'individualTasks',
			dataIndex: 'individualTasks',
			title: 'Индивидуальные задания',
			className: 'text-xs !p-2',
			render: (_: any, record: any) => {
				return (
					<div className={'flex flex-col gap-1'}>
						{record.tasks?.map((elem: any, index: any) => (
							<span key={index}>
								{index + 1}. {elem.taskDescription}
							</span>
						))}
					</div>
				)
			}
		},

		{
			key: 'departmentDirector',
			dataIndex: 'departmentDirector',
			title: 'Заведующий опорной кафедрой',
			className: 'text-xs !p-2'
		},
		{
			title: (
				<Popover
					trigger={'click'}
					content={
						<PracticalPopoverMain
							recordFullAll={tableData}
							setRecordFull={setTableData}
							recordFull={selectedFieldsFull}
							setSelectedFieldFull={setSelectedFieldFull}
						/>
					}
				>
					<Button type="text" className="opacity-50" icon={<PointsSvg />} />
				</Popover>
			),
			align: 'center',
			render: (record: any) => (
				<Popover
					trigger={'click'}
					content={
						<PracticalPopoverContent
							recordFull={record}
							recordFullAll={tableData}
							setRecordFull={setTableData}
						/>
					}
				>
					<Button onClick={(e) => { e.stopPropagation()}} type="text" className="opacity-50" icon={<PointsSvg />} />
				</Popover>
			),
			fixed: 'right',
			width: 50
		}
	]
	const columnsCompressed = [
		{
			key: 'subdivision',
			dataIndex: 'subdivision',
			title: <TitleHeadCell title={'Подразделение'}/>,
			name: 'Подразделение',
			className: 'text-xs !p-2 mobileFirst',
			width: '20%',
			
			responsive: ['xs'],
		},
		{
			key: 'specialtyName',
			dataIndex: 'specialtyName',
			title: <TitleHeadCell title={'Шифр и наименование специальности'}/>,
			name: 'Шифр и наименование специальности',
			className: 'text-xs !p-2',

			// @ts-ignore
			// render: (text, record) => (
			// 	<div className={'flex items-center'}>
			// 		<span className={'underline flex w-[200px]'}>{text}</span>
			// 		<Button
			// 			type="text"
			// 			icon={<EditSvg />}
			// 			onClick={() => {
			// 				navigate(
			// 					`/services/practices/practical/editPractical/${record.id}`
			// 				)
			// 			}}
			// 		/>
			// 	</div>
			// )
		},
		{
            title: <TitleHeadCell title={'Дата заполнения'}/>,
            dataIndex: 'dateFilling',
            width: '20%',
            render: (text:any) => dayjs(text).format('DD.MM.YYYY')
        },
		{
			key: 'practiceType',
			dataIndex: 'practiceType',

			title: <TitleHeadCell title={'Тип практики'}/>,
			className: 'text-xs !p-2 mobileFirst'
			// filters:[{
			// 	text: 'практика по получению первичных',
			// 	value: 'практика по получению',
			//   },],
			//   // @ts-ignore
			//   onFilter: (value, record) => record?.practiceType?.indexOf(value as string) === 0,
		},
		{
			key: 'semester',
			dataIndex: 'semester',
			title: <TitleHeadCell title={'Семестр'}/>,
			align: 'center',
			className: 'text-xs !p-2 mobileFirst'
		},
		{
			key: 'courseNumber',
			dataIndex: 'courseNumber',
			title: <TitleHeadCell title={'Курс'}/>,
			align: 'center',
			className: 'text-xs !p-2 mobileFirst'
		},
		{
			title: (
				<Popover
					trigger={'click'}
					content={
						<PracticalPopoverMain
							recordFullAll={tableData}
							setRecordFull={setTableData}
							recordFull={selectedFieldsFull}
							setSelectedFieldFull={setSelectedFieldFull}
						/>
					}
				>
					<Button type="text" className="opacity-50" icon={<PointsSvg />} />
				</Popover>
			),
			align: 'center',
			render: (record: any) => (
				<Popover
					trigger={'click'}
					content={
						<PracticalPopoverContent
							recordFull={record}
							recordFullAll={tableData}
							setRecordFull={setTableData}
						/>
					}
				>
					<Button onClick={(e) => { e.stopPropagation()}} type="text" className="opacity-50" icon={<PointsSvg />} />
				</Popover>
			),
			fixed: 'right',
			width: 50
		}
	]

	useEffect(() => {
		if (isSuccessDepartments) {
			setDepartments(processingOfDivisions(dataDepartments))
		}
	}, [dataDepartments])

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

	// объект для типа практик
	useEffect(() => {
		if (isSuccessNameSpecialty && subDevisionId && isSuccessNameSpecialty) {
			const pickSpecialityId = dataNameSpecialty?.find((elem: any) => {
				if (elem.value === pickSpeciality) {
					return elem
				}
			})
			setObjType({
				...objType,
				subdivisionId: subDevisionId,
				specialtyNameId: pickSpecialityId?.id
			})
		}
	}, [isSuccessNameSpecialty, form, pickSpeciality])

	// если выбираем курс "Все" то семестр тоже "Все"
	useEffect(()=>{
		if(pickCourse === 'Все'){
		
			setFilter({
				...filter,
				semester: 'Все'
			})
		}
	},[pickCourse])

	function filterDataFull() {
		function filterPracticeType(elem: TablePractical) {
			if (filter.practiceType === 'Все') {
				return elem
			} else {
				return elem.practiceType === filter.practiceType
			}
		}

		function filterDepartment(elem: TablePractical) {
			if (filter.department === 'Все') {
				return elem
			} else {
				return elem.department === filter.department
			}
		}
		function filterSubdivision(elem: TablePractical) {
			if (filter.subdivision === 'Все') {
				return elem
			} else if(!filter.subdivision.includes('-')){
				// @ts-ignore
				return elem.subdivision === filter.subdivision
			}
			else {
				// @ts-ignore
				return elem.subdivision === filter.subdivision.split(' - ')[1]
			}
		}

		function filterCourse(elem: TablePractical) {
			if (filter.course === 'Все') {
				return elem
			} else {
				// @ts-ignore
				return elem.courseNumber === filter.course
			}
		}

		function filterSemester(elem: TablePractical) {
			if (filter.semester === 'Все') {
				return elem
			} else {
				return elem.semester === filter.semester
			}
		}

		function filterNameSpecialty(elem: TablePractical) {
			if (filter.nameSpecialty === 'Все') {
				return elem
			} else {
				return elem.specialtyName === filter.nameSpecialty
			}
		}
		function filterGroup(elem: TablePractical) {
			if (filter.groupNumber === 'Все') {
				return elem
			} else {
				return elem.groupNumber === filter.groupNumber
			}
		}
	
		function sortDateFilling(a:any, b:any) {
            if (filter.dateFilling === 'По дате (сначала новые)') {
                return +new Date(b.dateFilling) - +new Date(a.dateFilling)
            }
            if (filter.dateFilling === 'По дате (сначала старые)') {
                return +new Date(a.dateFilling) - +new Date(b.dateFilling)
            }
            return 0
        }

		return dataPractiseAll
			? dataPractiseAll
					.filter((elem: any) => filterPracticeType(elem))
					.filter((elem: any) => filterDepartment(elem))
					.filter((elem: any) => filterCourse(elem))
					.filter((elem: any) => filterSemester(elem))
					.filter((elem: any) => filterNameSpecialty(elem))
					.filter((elem :any) => filterSubdivision(elem))
					.filter((elem :any) => filterGroup(elem))
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
	const handleSelect = (value:any)=>{
		setPickSpeciality(value)
	}
	function isCompressedTable() {
        setFullTable(false)
    }
    function isFullTable() {
        setFullTable(true)
    }

	const handleCourse = (value:any)=>{
		setPickCourse(value)
		form.setFieldValue('semester', '')
	}


	const optionsCourseValid = (() => {
		switch (pickCourse) {
			case '1':
				return [
					{ value: 'Все', label: 'Все' },
					{ value: '1', label: '1' },
					{ value: '2', label: '2' }
				];
			case '2':
				return [
					{ value: 'Все', label: 'Все' },
					{ value: '3', label: '3' },
					{ value: '4', label: '4' }
				];
			case '3':
				return [
					{ value: 'Все', label: 'Все' },
					{ value: '5', label: '5' },
					{ value: '6', label: '6' }
				];
			case '4':
				return [
					{ value: 'Все', label: 'Все' },
					{ value: '7', label: '7' },
					{ value: '8', label: '8' }
				];
			case '5':
				return [
					{ value: 'Все', label: 'Все' },
					{ value: '9', label: '9' },
					{ value: '10', label: '10' }
				];
			case '6':
				return [
					{ value: 'Все', label: 'Все' },
					{ value: '11', label: '11' },
					{ value: '12', label: '12' }
				];
			default:
				return [];
		}
	})()

	const handleRowClick = (record:any) => {
		navigate(
			`/services/practices/practical/editPractical/${record.id}`
		)
    };


	return (
		<>
			<section className="container">
			<Form form={form} initialValues={initialFormValues}>
				<Row>
					<Col flex={'auto'}>
						<span className="mb-14 text-[28px]">Практики</span>
					</Col>
				
				</Row>

				<Row gutter={[16, 16]} className="mt-12 overWrite">
					<Col span={5} className='overWrite'>
						<span>Подразделение</span>
					</Col>
					<Col span={8} className='overWrite'>
					
					<Form.Item
						name={'podrazdelenie'}
						className='mb-[-4px]'
					>
						<Select
							popupMatchSelectWidth={false}
							className="w-full "
							options={[
								{ key: 2244612, value: 'Все', label: 'Все' },
								...(dataSubdevisionPracticeNew
									? processingOfDivisions(dataSubdevisionPracticeNew).map((item:any) => ({
											key: item.id,
											value: item.value,
											label: item.label
									  }))
									: [])
							]}
							onChange={(value)=>{
								handleChange(value)
								setFilter({
									...filter,
									subdivision : value,
									nameSpecialty:'Все',
									course:'Все',
									semester:'Все',
									practiceType:'Все',
									department:'Все',
									groupNumber:'Все',
								})
								form.setFieldValue('nameSpecialty','Все')
								form.setFieldValue('course','Все')
								form.setFieldValue('semester','Все')
								form.setFieldValue('practiceType','Все')
								form.setFieldValue('department','Все')
								form.setFieldValue('groupNumber','Все')
							}}
							// defaultValue="Все"
						/>
						</Form.Item>
					</Col>
					<Col span={7} offset={4} className='orderHigh overWrite'>
						<Space className="w-full flex-row-reverse">
							<Button
								type="primary"
								className="!rounded-full my-buttonPractice"
								onClick={() => {
									navigate('/services/practices/practical.ts/createPractical')
								}}
							>
								
							</Button>
						</Space>
					</Col>
				</Row>
				
				<Row gutter={[16, 16]} className="mt-4 overWrite">
					<Col span={5} className='overWrite'>
						<span>Наименование специальности</span>
					</Col>
					<Col span={8} className='overWrite'>
					<Form.Item
						name={'nameSpecialty'}
						className='mb-[-4px]'
					>
						<Select
							disabled={filter.subdivision==='Все'}
							popupMatchSelectWidth={false}
							defaultValue="Все"
							className="w-full"
							options={[
								{ key: 2244612, value: 'Все', label: 'Все' },
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
						</Form.Item>
					</Col>
	
				</Row>
				<Row gutter={[16, 16]} className="mt-4 overWrite">
					<Col span={5}>
						<span>Кафедра</span>
					</Col>
					<Col span={8} className='overWrite'>
					<Form.Item name={'department'} className='mb-[-4px]'>
						<Select
							// rowKey="id"
							disabled={!isSuccessDep}
							popupMatchSelectWidth={false}
							defaultValue="Все"
							className="w-full"
							options={[
								{ key: 0, value: 'Все', label: 'Все' },
								...(dataGetCafedraNew
									? dataGetCafedraNew.map(item => ({
											key: item.id,
											value: item.value,
											label: item.label
									  }))
									: [])
							]}
							onChange={value => {
								setFilter({
									...filter,
									department: value
								})
							}}
						/>
						</Form.Item>
					</Col>
				</Row>

				<Row gutter={[16, 16]} className="mt-4 overWrite">
					<Col span={5}>
						<span>Номер группы</span>
					</Col>
					<Col span={8} className='overWrite'>
					<Form.Item name={'groupNumber'} className='mb-[-4px]'>
						<Select

							disabled={filter.nameSpecialty==='Все'}
							popupMatchSelectWidth={false}
							defaultValue="Все"
							className="w-full"
							options={[
								{ key: 0, value: 'Все', label: 'Все' },
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
						</Form.Item>
					</Col>
				</Row>

				<Row gutter={[16, 16]} className="mt-4 overWrite items-center ">
					<Col span={4} className='flex items-center'>
						<span className='w-12'>Курс</span>
				
					
						<Form.Item name={'course'} className='mb-[-4px] w-full'>
							<Select
								popupMatchSelectWidth={false}
								defaultValue="Все"
								className="w-full"
								options={filterCourse}
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
					
					<Col span={4} className='flex items-center'>
						<span className='w-20'>Семестр</span>
			
						
						<Form.Item
							className='mb-[-4px] w-full items-center'
							style={{marginBottom:'0'}}
							//rules={[{required: true}]}
							name={'semester'}	
						>
							<Select
								onChange={value => {
								
									setFilter({
										...filter,
										semester: value
									})
								}}
							    disabled={!pickCourse || pickCourse==='Все'} 
								size='middle'
								popupMatchSelectWidth={false}
								className="w-full "
								options={optionsCourseValid}
							/>
						</Form.Item>
					</Col>

					<Col span={5} className='flex items-center'>
						<span className='w-40'>Тип практики</span>
				
			
						<Form.Item name={'practiceType'} className='mb-[-4px] w-full items-center'>
						<Select
							disabled={!pickSpeciality}
							popupMatchSelectWidth={false}
							defaultValue="Все"
							className=""
							options={[
								{ key: 0, value: 'Все', label: 'Все' },
								...(dataPracticeType
									? dataPracticeType.map((item:any) => ({
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
				
				<Row className="mt-12 flex items-center">
                <Col span={12} flex="50%" className='mobileFirst'>
                    <Radio.Group defaultValue="compressedView" buttonStyle="solid">
                        <Radio.Button
                            onClick={isCompressedTable}
                            value="compressedView"
                            className="!rounded-l-full">
                            Посмотреть в сжатом виде
                        </Radio.Button>
                        <Radio.Button
                            onClick={isFullTable}
                            value="tableView"
                            className="!rounded-r-full">
                            Посмотреть данные в таблице
                        </Radio.Button>
                    </Radio.Group>
                </Col>
                <Col span={8} offset={4} className='mobileFirst'>
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

                </Col>
            </Row>
			</Form>

			</section>
			{isFetchingPractiseAll ? (
				<Spin
					className="w-full mt-20"
					indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />}
				/>
			) : (fullTable ?
				<Table
				onRow={(record) => ({
					onClick: () => handleRowClick(record),
				})}
				responsive
					size="small"
					rowKey="id"
					// @ts-ignore
					columns={columns}
					dataSource={tableData ? tableData : []}
					pagination={false}
					className="my-10"
					rowSelection={{
						type: 'checkbox',
						onSelect: (record, selected, selectedRows, nativeEvent) => {
							setSelectedFieldFull(selectedRows)
						},
						onSelectAll: (selected, selectedRows, changeRows) => {
							setSelectedFieldFull(selectedRows)
						}
					}}
				/> :
				<div className='viewPractical'>
				<Table
				onRow={(record) => ({
					onClick: () => handleRowClick(record),
				})}
					responsive
					rowKey="id"
					// @ts-ignore
					columns={columnsCompressed}
					dataSource={tableData ? tableData : []}
					pagination={tableData && tableData?.length<10?false:{
                        pageSize: 10
                    }}
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
		</>
	)
}
