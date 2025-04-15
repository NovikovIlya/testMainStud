// import {
//     Button, Col,
//     Popover,
//     Row,
//     Select,
//     Space,
//     Spin,
//     Table,
//     TreeSelect,
//     Typography
// } from 'antd'
// import dayjs from 'dayjs'
// import { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom'

// import { PointsSvg } from '../../../../assets/svg/PointsSvg'

// import { PopoverContent } from './PopoverContent'
// import { useGetAcademicYearQuery, useGetAllSchedulesQuery, useGetSubdivisionQuery } from '../../../../store/api/practiceApi/formingSchedule'
// import { useGetSubdivisionUserQuery } from '../../../../store/api/serviceApi'
// import { LoadingOutlined } from '@ant-design/icons'
// import { processingOfDivisions } from '../../../../utils/processingOfDivisions'
// import { ScheduleType } from '../../../../models/representation'
// import { NewDepartment } from '../../../../models/Practice'
// import { disableParents } from '../../../../utils/disableParents'
// import { transformSubdivisionData } from '../../../../utils/subdevisionToTree'
// import { OptionSortDate } from '../../../../models/schedule'


// const optionsSortDate: OptionSortDate[] = [
// 	{ value: 'По дате (сначала новые)', label: 'По дате (сначала новые)' },
// 	{ value: 'По дате (сначала старые)', label: 'По дате (сначала старые)' }
// ]

// export const PracticeSchedule = () => {
// 	const navigate = useNavigate()
// 	const [filter, setFilter] = useState(
// 		{
// 			dateFilling: 'По дате (сначала новые)',
// 			subdivisionId: 'Все',
// 			academicYear: 'Все',
// 		}
// 	)
// 	const [tableData, setTableData] = useState([])
// 	const [selectedFieldsFull, setSelectedFieldFull] = useState<any>([])
// 	const [dataTable, setDataTable] = useState<ScheduleType[]>([])
// 	// const {data:dataUserSubdivision,isLoading:isLoadingUserSubdivision} = useGetSubdivisionUserQuery()

// 	const {data:dataAcademicYear} = useGetAcademicYearQuery()
// 	const {data:dataSubdivision,isSuccess:isSuccessSubdivision} = useGetSubdivisionQuery()
// 	const [departments, setDepartments] = useState<NewDepartment[]>()
// 	const [flagLoad,setFlagLoad] = useState(false)
// 	const [treeLine, setTreeLine] = useState(true);
//     const [showLeafIcon, setShowLeafIcon] = useState(false);
//     const [value, setValue] = useState<any>('Все');
// 	const {data:dataAll,isSuccess:isSuccessData,isFetching:isFetchingDataAll} = useGetAllSchedulesQuery({subdivisionId:null,academicYear:getAcademicYear()})
// 	const columns = [
// 		{
// 			key: 'subdivision',
// 			dataIndex: 'subdivision',
// 			title: 'Подразделение',
// 			name: 'Подразделение',
// 			className: 'text-xs !p-2 ',
// 		},
// 		{
// 			key: 'name',
// 			dataIndex: 'name',
// 			title: 'Наименование графика',
// 			name: 'Наименование графика',
// 			className: 'text-xs !p-2 ',
// 		},

// 		{
// 			title: 'Дата заполнения',
// 			dataIndex: 'dateFilling',
// 			width: '20%',
// 			className: 'mobileFirst',
// 			// @ts-ignore
// 			render: (text: any) => dayjs(text).format('DD.MM.YYYY')
// 		},
// 		{
// 			key: 'academicYear',
// 			dataIndex: 'academicYear',
// 			title: 'Учебный год',
// 			className: 'text-xs !p-2'
// 		},
// 		{
// 			key: 'period',
// 			dataIndex: 'period',
// 			title: 'Период практики',
// 			className: 'text-xs !p-2'
// 		},
// 		{
// 			title: (
// 				''
// 			),
// 			align: 'center',
// 			render: (record: any) => (
// 				<Popover
// 					trigger={'click'}
// 					content={
// 						<PopoverContent
// 							recordFull={record}
// 							recordFullAll={tableData}
// 							setRecordFull={setTableData}
// 						/>
// 					}
// 				>
// 					<Button type="text" onClick={(e) => { e.stopPropagation(); /* обработка клика на PointsSvg */ }}  className="opacity-50" icon={<PointsSvg />} />
// 				</Popover>
// 			),
// 			fixed: 'right',
// 			width: 50
// 		}
// 	]

// 	useEffect(() => {
// 		if (isSuccessSubdivision) {
// 			setDepartments(processingOfDivisions(dataSubdivision))
// 		}
// 	}, [dataSubdivision])
	
// 	useEffect(() => {
// 		if (isSuccessData) {
// 			setDataTable(filterDataFull())
// 		}
// 	}, [filter,isSuccessData,dataAll])


// 	function filterDataFull() {
// 		function sortDateFilling(a: ScheduleType, b: ScheduleType) {
// 			if (filter.dateFilling === 'По дате (сначала новые)') {
// 				return +new Date(b.dateFilling) - +new Date(a.dateFilling)
// 			}
// 			if (filter.dateFilling === 'По дате (сначала старые)') {
// 				return +new Date(a.dateFilling) - +new Date(b.dateFilling)
// 			}
// 			return 0
// 		}
// 		function filterSubdivision(elem: any) {
// 			if (filter.subdivisionId === 'Все') {
// 				return elem
// 			} else {
// 				return elem.subdivisionId === filter.subdivisionId
// 			}
// 		}
// 		function filterAcademicYear(elem: any) {
// 			if (filter.academicYear === 'Все') {
// 				return elem
// 			} else {
// 				return elem.academicYear === filter.academicYear
// 			}
// 		}
// 		setFlagLoad(false)
// 		return dataAll
// 			? [...dataAll]
// 			.sort((a: ScheduleType, b: ScheduleType) => sortDateFilling(a, b))
// 			// .filter((elem: any) => filterSubdivision(elem))
// 			.filter((elem: any) => filterAcademicYear(elem))
// 			: []
// 	}

// 	const onPopupScroll: any = (e:any) => {
//         console.log('onPopupScroll', e);
//     };

// 	function getAcademicYear() {
//         const today = dayjs();
//         const year = today.year();
//         const month = today.month() + 1; 
    
//         if (month >= 8) {
//             return `${year}/${year + 1}`; 
//         } else {
//             return `${year - 1}/${year}`;
//         }
//     }	

// 	const handleRowClick = (record:any) => {
// 		navigate(`/services/practices/formingSchedule/edit/year=${record.academicYear.replace("/", "-")}/${record.id}`)
//     };

// 	const treeData = dataAll?.value ?  transformSubdivisionData(dataAll) : 
// 	[{ key: 'Все', value: 'Все', label: 'Все' },...transformSubdivisionData(dataSubdivision) ]


// 	return (
// 		<section className="container animate-fade-in">
// 			<Row gutter={[16, 16]}>
// 				<Col span={24}>
// 					<Typography.Text className=" text-[28px] mb-14 titleMobile">
// 						График практик
// 					</Typography.Text>
// 				</Col>
// 			</Row>
// 			<Row gutter={[16, 16]} className="mt-12 overWrite">
// 				<Col span={5} className='overWrite'>
// 					<span>Подразделение</span>
// 				</Col>
// 				<Col span={7} className='overWrite'>	
// 					<TreeSelect
// 						disabled={treeData.length === 1}
// 						treeLine={treeLine && { showLeafIcon }}
// 						showSearch
// 						style={{ height:'32px', width: '100%' }}
// 						value={value}
// 						dropdownStyle={{  overflow: 'auto' }}
// 						placeholder=""
// 						allowClear
// 						treeDefaultExpandAll
// 						onChange={(value: any) => {
// 							setValue(value)
// 							setFlagLoad(true)
// 							setFilter({ ...filter, subdivisionId: value })
// 						}}
// 						treeData={(treeData)}
// 						onPopupScroll={onPopupScroll}
// 						treeNodeFilterProp="title"					
// 					/>
// 				</Col>
				
// 				 <Col span={7} offset={5} className='overWrite orderHigh'>
// 					<Space className="w-full flex-row-reverse">
// 						<Button
// 							type="primary"
// 							className="!rounded-full my-buttonSchedule h-10"
// 							onClick={() => {
// 								navigate('/services/practices/formingSchedule/createSchedule')
// 							}}
// 						>
							
// 						</Button>
// 					</Space>
// 				</Col> 

// 			</Row>
// 			<Row gutter={[16, 16]} className="mt-1 flex items-center overWrite">
// 					<Col span={5} className='overWrite'>
// 					<span>Учебный год</span>
				
// 					</Col>
// 					<Col span={7} className='overWrite grow'>
// 						<Select
// 							popupMatchSelectWidth={false}
// 							defaultValue="Все"
// 							className="w-full"
// 							onChange={(value: any) => {
// 								setFilter({ ...filter, academicYear: value })
// 							}}
// 							options={
// 								[
// 									{key: 2244612, value: "Все", label: "Все"},
// 								...(dataAcademicYear ? dataAcademicYear.map((item:string) => ({
// 								key: item,
// 								value: item,
// 								label: item
// 								})) : [])
// 								]
// 							}
// 						/>
// 					</Col>
// 			</Row>
// 			<Row gutter={[16, 16]} className="mt-4 flex items-center overWrite">
// 				<Col span={7} offset={17} className='overWrite w-full'>
// 					<div className={'flex gap-2 items-center overWrite w-full'}>
// 						<span className={'mr-2'}>Сортировка</span>
// 						<Select
// 							popupMatchSelectWidth={false}
// 							value={filter.dateFilling}
// 							className="w-full sm:w-[500px]"
// 							options={optionsSortDate}
// 							onChange={value => {
// 								setFilter({
// 									...filter,
// 									dateFilling: value
// 								})
// 							}}
// 						/>
// 					</div>
// 				</Col>
// 			</Row>
// 			{ isFetchingDataAll || flagLoad? <Spin className='w-full mt-20' indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />  
// 			:  <Table
// 				onRow={(record) => ({
// 					onClick: () => handleRowClick(record),
// 				})}
// 				responsive
// 				size="small"
// 				rowKey="id"
// 				// @ts-ignore
// 				columns={columns}
// 				dataSource={dataTable ? dataTable : []}
// 				pagination={dataTable && dataTable?.length <10 ? false : {
// 					pageSize: 10
// 				}}
// 				className="my-10"
// 				rowClassName={() => 'animate-fade-in'}
				
// 			/>}
		
// 		</section>
// 	)
// }

// export default PracticeSchedule


import {
    Button, Col,
    ConfigProvider,
    Popover,
    Row,
    Select,
    Space,
    Spin,
    Table,
    TreeSelect,
    Typography
} from 'antd'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next';

import { PointsSvg } from '../../../../assets/svg/PointsSvg'

import { PopoverContent } from './PopoverContent'
import { useGetAcademicYearQuery, useGetAllSchedulesQuery, useGetSubdivisionQuery } from '../../../../store/api/practiceApi/formingSchedule'
import { useGetSubdivisionUserQuery } from '../../../../store/api/serviceApi'
import { LoadingOutlined } from '@ant-design/icons'
import { processingOfDivisions } from '../../../../utils/processingOfDivisions'
import { ScheduleType } from '../../../../models/representation'
import { NewDepartment } from '../../../../models/Practice'
import { disableParents } from '../../../../utils/disableParents'
 import { transformSubdivisionData } from '../../../../utils/subdevisionToTree'
import { OptionSortDate } from '../../../../models/schedule'



export const PracticeSchedule = () => {
    const { t } = useTranslation();
    const navigate = useNavigate()
	const optionsSortDate: OptionSortDate[] = [
		{ value: 'newestFirst', label: t('newestFirst') },
		{ value: 'oldestFirst', label: t('oldestFirst') }
	]
    const [filter, setFilter] = useState(
        {
            dateFilling: 'newestFirst',
            subdivisionId: 'all',
            academicYear: 'all',
        }
    )
    const [tableData, setTableData] = useState([])
    const [selectedFieldsFull, setSelectedFieldFull] = useState<any>([])
    const [dataTable, setDataTable] = useState<ScheduleType[]>([])
    const { data: dataAcademicYear } = useGetAcademicYearQuery()
    const { data: dataSubdivision, isSuccess: isSuccessSubdivision } = useGetSubdivisionQuery()
    const [departments, setDepartments] = useState<NewDepartment[]>()
    const [flagLoad, setFlagLoad] = useState(false)
    const [treeLine, setTreeLine] = useState(true);
    const [showLeafIcon, setShowLeafIcon] = useState(false);
    const [value, setValue] = useState<any>('all');
    const { data: dataAll, isSuccess: isSuccessData, isFetching: isFetchingDataAll } = useGetAllSchedulesQuery({ subdivisionId: null, academicYear: getAcademicYear() })

	const columns = [
        {
            key: 'subdivision',
            dataIndex: 'subdivision',
            title: t('subdivision'),
            name: t('subdivision'),
            className: 'text-xs !p-2 ',
        },
        {
            key: 'name',
            dataIndex: 'name',
            title: t('scheduleName'),
            name: t('scheduleName'),
            className: 'text-xs !p-2 ',
        },
        {
            title: t('dateFilling'),
            dataIndex: 'dateFilling',
            width: '20%',
            className: 'mobileFirst',
            // @ts-ignore
            render: (text: any) => dayjs(text).format('DD.MM.YYYY')
        },
        {
            key: 'academicYear',
            dataIndex: 'academicYear',
            title: t('academicYear'),
            className: 'text-xs !p-2'
        },
        {
            key: 'period',
            dataIndex: 'period',
            title: t('practicePeriod'),
            className: 'text-xs !p-2'
        },
        {
            title: '',
            align: 'center',
            render: (record: any) => (
                <Popover
                    trigger={'click'}
                    content={
                        <PopoverContent
                            recordFull={record}
                            recordFullAll={tableData}
                            setRecordFull={setTableData}
                        />
                    }
                >
                    <Button type="text" onClick={(e) => { e.stopPropagation(); /* обработка клика на PointsSvg */ }} className="opacity-50" icon={<PointsSvg />} />
                </Popover>
            ),
            fixed: 'right',
            width: 50
        }
    ]

    useEffect(() => {
        if (isSuccessSubdivision) {
            setDepartments(processingOfDivisions(dataSubdivision))
        }
    }, [dataSubdivision])

    useEffect(() => {
        if (isSuccessData) {
            setDataTable(filterDataFull())
        }
    }, [filter, isSuccessData, dataAll])

    function filterDataFull() {
        function sortDateFilling(a: ScheduleType, b: ScheduleType) {
            if (filter.dateFilling === 'newestFirst') {
                return +new Date(b.dateFilling) - +new Date(a.dateFilling)
            }
            if (filter.dateFilling === 'oldestFirst') {
                return +new Date(a.dateFilling) - +new Date(b.dateFilling)
            }
            return 0
        }
        function filterSubdivision(elem: any) {
            if (filter.subdivisionId === 'all') {
                return elem
            } else {
                return elem.subdivisionId === filter.subdivisionId
            }
        }
        function filterAcademicYear(elem: any) {
            if (filter.academicYear === 'all') {
                return elem
            } else {
                return elem.academicYear === filter.academicYear
            }
        }
        setFlagLoad(false)
        return dataAll
            ? [...dataAll]
                .sort((a: ScheduleType, b: ScheduleType) => sortDateFilling(a, b))
                .filter((elem: any) => filterSubdivision(elem))
                .filter((elem: any) => filterAcademicYear(elem))
            : []
    }

    const onPopupScroll: any = (e: any) => {
        console.log('onPopupScroll', e);
    };

    function getAcademicYear() {
        const today = dayjs();
        const year = today.year();
        const month = today.month() + 1;

        if (month >= 8) {
            return `${year}/${year + 1}`;
        } else {
            return `${year - 1}/${year}`;
        }
    }

    const handleRowClick = (record: any) => {
        navigate(`/services/practices/formingSchedule/edit/year=${record.academicYear.replace("/", "-")}/${record.id}`)
    };

    const treeData = dataAll?.value ? transformSubdivisionData(dataAll) :
        [{ key: 'all', value: 'all', label: t('all') }, ...transformSubdivisionData(dataSubdivision)]

    return (
        <section className="container animate-fade-in">
            <Row gutter={[16, 16]}>
                <Col span={24}>
                    <Typography.Text className=" text-[28px] mb-14 titleMobile">
                        {t('practiceSchedule')}
                    </Typography.Text>
                </Col>
            </Row>
            <Row gutter={[16, 16]} className="mt-12 overWrite">
                <Col span={5} className='overWrite'>
                    <span>{t('subdivision')}</span>
                </Col>
                <Col span={7} className='overWrite'>
                    <TreeSelect
                        disabled={treeData.length === 1}
                        treeLine={treeLine && { showLeafIcon }}
                        showSearch
                        style={{ height: '32px', width: '100%' }}
                        value={value}
                        dropdownStyle={{ overflow: 'auto' }}
                        placeholder=""
                        allowClear
                        treeDefaultExpandAll
                        onChange={(value: any) => {
                            setValue(value)
                            setFlagLoad(true)
                            setFilter({ ...filter, subdivisionId: value })
                        }}
                        treeData={treeData}
                        onPopupScroll={onPopupScroll}
                        treeNodeFilterProp="title"
                    />
                </Col>
                <Col span={7} offset={5} className='overWrite orderHigh'>
                    <Space className="w-full flex-row-reverse">
                        <Button
                            type="primary"
                            className="!rounded-full  h-10"
                            onClick={() => {
                                navigate('/services/practices/formingSchedule/createSchedule')
                            }}
                        >
                            {t('createSchedule')}
                        </Button>
                    </Space>
                </Col>
            </Row>
            <Row gutter={[16, 16]} className="mt-1 flex items-center overWrite">
                <Col span={5} className='overWrite'>
                    <span>{t('academicYear')}</span>
                </Col>
                <Col span={7} className='overWrite grow'>
                    <Select
                        popupMatchSelectWidth={false}
                        defaultValue="all"
                        className="w-full"
                        onChange={(value: any) => {
                            setFilter({ ...filter, academicYear: value })
                        }}
                        options={[
                            { key: 2244612, value: "all", label: t('all') },
                            ...(dataAcademicYear ? dataAcademicYear.map((item: string) => ({
                                key: item,
                                value: item,
                                label: item
                            })) : [])
                        ]}
                    />
                </Col>
            </Row>
            <Row gutter={[16, 16]} className="mt-4 flex items-center overWrite">
                <Col span={7} offset={17} className='overWrite w-full'>
                    <div className={'flex gap-2 items-center overWrite w-full'}>
                        <span className={'mr-2'}>{t('sortDate')}</span>
                        <Select
                            popupMatchSelectWidth={false}
                            value={filter.dateFilling}
                            className="w-full sm:w-[500px]"
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
            {isFetchingDataAll || flagLoad ? <Spin className='w-full mt-20' indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
                : <ConfigProvider
                                theme={{
                                    components: {
                                        Table: {
                                            headerBg: 'rgb(218, 231, 251)'
                                        }
                                    }
                                }}
                            ><Table
                    onRow={(record) => ({
                        onClick: () => handleRowClick(record),
                    })}
                    responsive
                    size="small"
                    rowKey="id"
					// @ts-ignore
                    columns={columns}
                    dataSource={dataTable ? dataTable : []}
                    pagination={dataTable && dataTable?.length < 10 ? false : {
                        pageSize: 10
                    }}
                    className="my-10"
                    rowClassName={() => 'animate-fade-in'}
                /></ConfigProvider>}
        </section>
    )
}

export default PracticeSchedule
