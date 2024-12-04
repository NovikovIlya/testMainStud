import { LoadingOutlined } from '@ant-design/icons'
import {
	Button,
	Col,
	Form,
	Radio,
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
import { useGetCafDepartmentsQuery } from '../../../../store/api/practiceApi/practical'
import { useGetSpecialtyNamesForPractiseQuery } from '../../../../store/api/practiceApi/roster'
import { processingOfDivisions } from '../../../../utils/processingOfDivisions'



import './ViewPractical.scss'
import { TitleHeadCell } from '../../businessTrip/NewBusinessTrip/archive/stepTwo/tableStepTwo/titleHeadCell/TitleHeadCell'
import { disableParents } from '../../../../utils/disableParents'
import { OptionsNameSpecialty } from '../../practices/roster/registerContracts/RegisterContracts'
import { useGetAllPracticeTeacherQuery } from '../../../../store/api/practiceApi/practiceTeacher'
import { useGetSubmissionsSpecPracticeQuery, useGetSubmissionsTypePracticeQuery } from '../../../../store/api/practiceApi/formingSchedule'

const optionYears = [
	{value:'Все'},
	{value:'Текущие'},
	{value:'Прошедшие'}
]

const optionYearsTwo = [
	{value:'Учебный год (по убыванию)'},
	{value:'Учебный год (по возрастанию)'},
]

export const ViewAll = () => {
	const [fullTable,setFullTable] = useState(false)
	const [form] = Form.useForm()
	const navigate = useNavigate()
	const initialFormValues = {
		podrazdelenie: 'Все',
		semester: 'Все',
	};
	const [pickCourse, setPickCourse] = useState<any>(null)
	const [pickSpeciality,setPickSpeciality] = useState(null)
	const [subDevisionId, setSubDevisionId] = useState(null)
	const [objType, setObjType] = useState<any>({subdivisionId: null,specialtyNameId: null})
	const [selectedFieldsFull, setSelectedFieldFull] = useState<any[]>([])
	const [departments, setDepartments] = useState<any[]>()
	const [filter, setFilter] = useState({
		nameSpecialty: 'Все',
		department: 'Все',
		course: 'Все',
		semester: 'Все',
		practiceType: 'Все',
		subdivision:'Все',
		dateFilling: 'Все',
		groupNumber: 'Все',
		dateYear:'Учебный год (по убыванию)'
	})
	const {data: dataPractiseAll,isSuccess: isSuccessPractiseAll,isFetching: isFetchingPractiseAll} = useGetAllPracticeTeacherQuery()
	const {data:dataSubdevisionPracticeNew} = useGetPractiseSubdevisionApiTeacherQuery()
	const [tableData, setTableData] = useState<any[]>(dataPractiseAll)
	const [nameSpecialty, setNameSpecialty] = useState<OptionsNameSpecialty[]>()
	// const { data: dataDepartments, isSuccess: isSuccessDepartments } = useGetSubdivisionForPracticeQuery()
	const { data: dataNameSpecialty, isSuccess: isSuccessNameSpecialty } = useGetSubmissionsSpecPracticeQuery(subDevisionId, {skip:!subDevisionId || subDevisionId==='Все'})
	const { data: dataPracticeType, isSuccess: isSuccessPracticeType } = useGetSubmissionsTypePracticeQuery(subDevisionId,{ skip: !subDevisionId  || subDevisionId==='Все'})
	const {data:dataGroupNumberNew} = useGetGroupNumbersNewQuery(subDevisionId,{ skip: !subDevisionId })
	const [treeLine, setTreeLine] = useState(true);
    const [showLeafIcon, setShowLeafIcon] = useState(false);
    const [value, setValue] = useState<any>();

	const columns = [
		{
			key: 'subdivision',
			dataIndex: 'subdivision',
			title: 'Подразделение',
			name: 'Подразделение',
			className: 'text-xs !p-4',
			
		},
		{
			key: 'group',
			dataIndex: 'group',
			title: 'Номер группы',
			align: 'center',
			className: 'text-xs !p-4'
		},
		{
			key: 'specialty',
			dataIndex: 'specialty',
			title: 'Шифр и наименование специальности',
			name: 'Шифр и наименование специальности',
			className: 'text-xs !p-4',


		},
		{
			key: 'practiceType',
			dataIndex: 'practiceType',
			title: 'Тип практики',
			className: 'text-xs !p-4 mobileFirst'
		},
		{
			key: 'department',
			dataIndex: 'department',
			title: 'Кафедра',
			className: 'text-xs !p-4 mobileFirst'
		},
		{
			key: 'semester',
			dataIndex: 'semester',
			title: 'Семестр',
			align: 'center',
			className: 'text-xs !p-4'
		},
		{
			key: 'academicYear',
			dataIndex: 'academicYear',
			title: 'Учебный год',
			align: 'center',
			className: 'text-xs !p-4',
			// sorter: (a:any, b:any) => +new Date(a.academicYear.split('/')[0]) - +new Date(b.academicYear.split('/')[0]),
		},
		{
			key: 'course',
			dataIndex: 'course',
			title: 'Курс',
			align: 'center',
			className: 'text-xs !p-4 mobileFirst'
		},
		{
			key: 'period',
			dataIndex: 'period',
			title: 'Период практики',
			align: 'center',
			className: 'text-xs !p-4',
			render: (_: any, record: any) => {
				return (
					<div className={'flex flex-col'}>
						<span>{dayjs(record.period.split(' - ')[0].trim()).format('DD.MM.YYYY')}</span>-
						<span>{dayjs(record.period.split(' - ')[1].trim()).format('DD.MM.YYYY')}</span>
					</div>
				)
			}
		},
		{
			key: 'send',
			dataIndex: 'send',
			title: 'Сформирован отчет',
			align: 'center',
			className: 'text-xs !p-4',
			render: (_: any, record: any) => {
				return (
					<div className={' '}>
						{record?.isReportExist ? 'Да' : 'Нет'}
					</div>
				)
			}
		},
		{
			key: 'send',
			dataIndex: 'send',
			title: 'Отправлен в деканат',
			align: 'center',
			className: 'text-xs !p-4',
			render: (_: any, record: any) => {
				return (
					<div className={' '}>
						{record?.isReportExist ? 'Да' : 'Нет'}
					</div>
				)
			}
		},
		
		

		
		
	]
	const columnsCompressed = [
		{
			key: 'subdivision',
			dataIndex: 'subdivision',
			title: <TitleHeadCell title={'Подразделение'}/>,
			name: 'Подразделение',
			className: 'text-xs !p-6 mobileFirst ',
			width: '20%',

		},
		{
			key: 'group',
			dataIndex: 'group',
			title: <TitleHeadCell title={'Номер группы'}/>,
			align: 'center',
			className: 'text-xs !p-6 mobileFirst ',
		},
		{
			key: 'specialty',
			dataIndex: 'specialty',
			title: <TitleHeadCell title={'Шифр и наименование специальности'}/>,
			name: 'Шифр и наименование специальности',
			className: 'text-xs !p-2',

		
		},
		{
			key: 'period',
			dataIndex: 'period',
			title: <TitleHeadCell title={'Период практики'}/>,
			align: 'center',
			className: 'text-xs !p-4',
			render: (_: any, record: any) => {
				return (
					<div className={'flex flex-col'}>
						<span>{dayjs(record.period.split(' - ')[0].trim()).format('DD.MM.YYYY')}</span>-
						<span>{dayjs(record.period.split(' - ')[1].trim()).format('DD.MM.YYYY')}</span>
					</div>
				)
			}
		},
		{
			key: 'send',
			dataIndex: 'send',
			title: <TitleHeadCell title={'Сформирован отчет'}/>,
			align: 'center',
			className: 'text-xs !p-4',
			render: (_: any, record: any) => {
				return (
					<div className={' '}>
						{record?.isReportExist ? 'Да' : 'Нет'}
					</div>
				)
			}
		},
		{
			key: 'send',
			dataIndex: 'send',
			title: <TitleHeadCell title={'Отправлен в деканат'}/>,
			align: 'center',
			className: 'text-xs !p-4',
			render: (_: any, record: any) => {
				return (
					<div className={' '}>
						{record?.isReportExist ? 'Да' : 'Нет'}
					</div>
				)
			}
		}
	
		
		
		
	]

	useEffect(() => {
		if (isSuccessPractiseAll) {
			setTableData(dataPractiseAll)
		}
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

	useEffect(()=>{
		if(pickCourse === 'Все'){
			setFilter({
				...filter,
				semester: 'Все'
			})
		}
	},[pickCourse])


	function filterDataFull() {
		function filterPracticeType(elem: any) {
			if (filter.practiceType === 'Все') {
				return elem
			} else {
				return elem.practiceType === filter.practiceType
			}
		}

		function filterDepartment(elem: any) {
			if (filter.department === 'Все') {
				return elem
			} else {
				return elem.department === filter.department
			}
		}
		function filterSubdivision(elem: any) {
			if (filter.subdivision === 'Все') {
				return elem
			} 
			else {
				console.log('filter.subdivision,',filter.subdivision)
				console.log('elem', elem)
				// @ts-ignore
				return elem.subdivisionId === filter.subdivision
			}
		}

		function filterCourse(elem: any) {
			if (filter.course === 'Все') {
				return elem
			} else {
				// @ts-ignore
				return elem.course === filter.course
			}
		}

		function filterSemester(elem: any) {
			if (filter.semester === 'Все') {
				return elem
			} else {
				return Number(elem.semester) === Number(filter.semester)
			}
		}

		function filterNameSpecialty(elem: any) {

			if (filter.nameSpecialty === 'Все') {
				return elem
			} else {
				return elem.specialty === filter.nameSpecialty
			}
		}
		function filterGroup(elem: any) {
			if (filter.groupNumber === 'Все') {
				return elem
			} else {
				return elem.group === filter.groupNumber
			}
		}
		function filterPast(elem: any) {
			if (filter.dateFilling === 'Прошедшие') {
				return dayjs(elem.period.split(' - ')[1].trim()).format('DD.MM.YYYY') < dayjs().format('DD.MM.YYYY')
            }
			if (filter.dateFilling === 'Текущие') {
				return dayjs(elem.period.split(' - ')[1].trim()).format('DD.MM.YYYY') >= dayjs().format('DD.MM.YYYY')
            }
			else{
				return elem
			}
		}
	
		function sortDateFilling(a:any, b:any) {
            if (filter.dateYear === 'Учебный год (по убыванию)') {
				console.log('filter.dateFilling0',filter.dateYear)
                return +new Date(b.academicYear.split('/')[0]) - +new Date(a.academicYear.split('/')[0])
				
            }
            if (filter.dateYear === 'Учебный год (по возрастанию)') {
				console.log('filter.dateFilling1',filter.dateYear)
				console.log('1',a.academicYear.split('/')[0])
                return +new Date(a.academicYear.split('/')[0]) - +new Date(b.academicYear.split('/')[0])
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
					.filter((elem :any) => filterPast(elem))
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
	const onPopupScroll: any = (e:any) => {
        console.log('onPopupScroll', e);
    };
	const handleSelect = (value:any)=>{
		setPickSpeciality(value)
	}

	const handleCourse = (value:any)=>{
		setPickCourse(value)
		form.setFieldValue('semester', '')
	}
	
	const optionsCourseValid = (() => {
		switch (pickCourse) {
			case 1:
				return [
					{ value: 'Все', label: 'Все' },
					{ value: '1', label: '1' },
					{ value: '2', label: '2' }
				];
			case 2:
				return [
					{ value: 'Все', label: 'Все' },
					{ value: '3', label: '3' },
					{ value: '4', label: '4' }
				];
			case 3:
				return [
					{ value: 'Все', label: 'Все' },
					{ value: '5', label: '5' },
					{ value: '6', label: '6' }
				];
			case 4:
				return [
					{ value: 'Все', label: 'Все' },
					{ value: '7', label: '7' },
					{ value: '8', label: '8' }
				];
			case 5:
				return [
					{ value: 'Все', label: 'Все' },
					{ value: '9', label: '9' },
					{ value: '10', label: '10' }
				];
			case 6:
				return [
					{ value: 'Все', label: 'Все' },
					{ value: '11', label: '11' },
					{ value: '12', label: '12' }
				];
			default:
				return [];
		}
	})()
	
	const handleRowClick = (record: any) => {
		navigate(`/services/practiceteacher/edit/${record.id}`)
	}

	const treeData = [{ key: 'Все', value: 'Все', label: 'Все' },...(dataSubdevisionPracticeNew ? dataSubdevisionPracticeNew?.map((item:any)=>{
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
    }):[])]

	const uniqueCourseNumbers = [...new Set(tableData?.map((item:any) => item.course))];

	return (
		<>
			<section className="container animate-fade-in">
			<Form form={form} initialValues={initialFormValues}>
				<Row>
					<Col flex={'auto'}>
						<span className="mb-14 text-[28px]">Практики для преподавателя</span>
					</Col>
				
				</Row>
				<Row gutter={[16, 16]} className="mt-12 overWrite mb-4">
					<Col span={5} className='overWrite'>
						<span>Подразделение</span>
					</Col>
					<Col span={8} className='overWrite'>
					<Form.Item
						name={'podrazdelenie'}
						className='mb-[-4px]'
					>
							<TreeSelect
								treeLine={treeLine && { showLeafIcon }}
								showSearch
								style={{ height:'32px',width: '100%' }}
								value={value}
								dropdownStyle={{  overflow: 'auto' }}
								placeholder=""
								allowClear
								treeDefaultExpandAll
								onChange={(value)=>{
									setSubDevisionId(value)
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
								treeData={disableParents(treeData)}
								onPopupScroll={onPopupScroll}
								treeNodeFilterProp="title"
							
							/>
						</Form.Item>
					</Col>
					
				</Row>
				
				<Row gutter={[16, 16]} className="mt-1 overWrite">
					<Col span={5} className='overWrite'>
						<span>Наименование специальности</span>
					</Col>
					<Col span={8} className='overWrite'>
					<Form.Item
						name={'nameSpecialty'}
						className='mb-[-4px]'
					>
						<Tooltip title={filter.subdivision==='Все' ? 'Выберите подразделение' : ''}><Select
							disabled={filter.subdivision==='Все' || !filter.subdivision}
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
						/></Tooltip>
						</Form.Item>
					</Col>
	
				</Row>
				

				<Row gutter={[16, 16]} className="mt-4 overWrite">
					<Col span={5}>
						<span>Номер группы</span>
					</Col>
					<Col span={8} className='overWrite'>
					<Form.Item name={'groupNumber'} className='mb-[-4px]'>
					<Tooltip title={filter.subdivision==='Все' ? 'Выберите подразделение' : ''}><Select

							disabled={filter.subdivision==='Все' || !filter.subdivision}
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
						/></Tooltip>
						</Form.Item>
					</Col>
				</Row>
				<Row gutter={[16, 16]} className='mt-4 overWrite'>
				<Col span={5}><span className={'mr-2 mobileFirst'}>Период практики</span></Col>
				<Col span={8}  className='mobileFirst overWrite'>
                    
						
                        
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

				<Row gutter={[16, 16]} className="mt-4 overWrite items-center ">
					<Col span={4} className='flex items-center overWrite'>
						<span className='w-12'>Курс</span>
				
					
						<Form.Item name={'course'} className='mb-[-4px] w-auto sm:w-full overWrite'>
							<Select
								popupMatchSelectWidth={false}
								defaultValue="Все"
								className="w-full"
								options={['Все'].concat(uniqueCourseNumbers).map((item)=>({key: item, value: item, label: item}))}
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
					
					<Col span={4} className='flex items-center overWrite'>
						<span className='w-20'>Семестр</span>
			
						<Tooltip title={filter.course==='Все' ? 'Выберите курс' : ''}><Form.Item
							className='mb-[-4px] w-auto sm:w-full items-center'
							style={{marginBottom:'0'}}
							//rules={[{required: true}]}
							name={'semester'}	
						>
							<Select
								defaultValue="Все"
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
						</Form.Item></Tooltip>
					</Col>

					<Col span={5} className='flex items-center overWrite'>
						<span className='w-40'>Тип практики</span>
						<Tooltip title={filter.nameSpecialty==='Все' ? 'Выберите специальносиь' : ''}><Form.Item name={'practiceType'} className='mb-[-4px] sm:max-w-[220px] sm:min-w-[220px]  items-center'>
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
						</Form.Item></Tooltip>
					</Col>
				</Row>
			</Form>
			<Row className='flex justify-between items-center mt-8 mb-8'>
			
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
			
			
				<Col span={8}  className='mobileFirst  '>
                    <div className={'flex gap-2 items-center justify-end '}>
                        <span className={'mr-2'}>Сортировка</span>
                        <div className='w-[228px] flex justify-end'><Select
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
                        /></div>
                    </div>

                </Col>
			
			</Row>

			
			{isFetchingPractiseAll ? (
				<Spin
					className="w-full mt-20"
					indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />}
				/>
			) : (fullTable ?
				<Table
					onRow={(record) => ({
						onClick: (e) => {
							// @ts-ignore
							if (e.target.closest('.ant-table-selection-column')) {
								return
							}
							handleRowClick(record)},
					})}
					responsive
					size="small"
					rowKey="id"
					//@ts-ignore
					columns={columns}
					dataSource={tableData ? tableData : []}
					pagination={false}
					className="my-10"
					
				/> :
				<div className='viewPractical'>
				<Table
					onRow={(record) => ({
						onClick: (e) => {
							// @ts-ignore
							if (e.target.closest('.ant-table-selection-column')) {
								return
							}
							handleRowClick(record)},
					})}
					responsive
					rowKey="id"
					//@ts-ignore
					columns={columnsCompressed}
					dataSource={tableData ? tableData : []}
					pagination={tableData && tableData?.length<10?false:{
                        pageSize: 10
                    }}
					rowClassName={() => 'animate-fade-in'}
					className="my-"
					
				/>
				</div>
			)}
			</section>
		</>
	)
}
