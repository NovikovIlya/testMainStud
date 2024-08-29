import {
    Button, Col,
    Popover,
    Row,
    Select,
    Space,
    Spin,
    Table,
    Typography
} from 'antd'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { EditSvg } from '../../../../assets/svg/EditSvg'
import { PointsSvg } from '../../../../assets/svg/PointsSvg'

import { PopoverContent } from './PopoverContent'
import { PopoverMain } from './PopoverMain'
import { useGetAcademicYearQuery, useGetAllSchedulesQuery, useGetSubdivisionQuery } from '../../../../store/api/practiceApi/formingSchedule'
import { useGetSubdivisionUserQuery } from '../../../../store/api/serviceApi'
import { LoadingOutlined } from '@ant-design/icons'
import { processingOfDivisions } from '../../../../utils/processingOfDivisions'
import { ScheduleType } from '../../../../models/representation'
import { NewDepartment } from '../../../../models/Practice'


const optionsSortDate: any = [
	{ value: 'По дате (сначала новые)', label: 'По дате (сначала новые)' },
	{ value: 'По дате (сначала старые)', label: 'По дате (сначала старые)' }
]

export const PracticeSchedule = () => {
	const navigate = useNavigate()
	const [filter, setFilter] = useState(
		{
			dateFilling: 'По дате (сначала новые)',
			subdivisionId: 'Все',
			academicYear: 'Все',
		}
	)
	const [tableData, setTableData] = useState([])
	const [selectedFieldsFull, setSelectedFieldFull] = useState<any>([])
	const [dataTable, setDataTable] = useState<ScheduleType[]>([])
	const {data:dataUserSubdivision,isLoading:isLoadingUserSubdivision} = useGetSubdivisionUserQuery()
	const {data:dataAll,isSuccess:isSuccessData,isFetching:isFetchingDataAll} = useGetAllSchedulesQuery({subdivisionId:dataUserSubdivision?.value,academicYear:getAcademicYear()},{skip:!dataUserSubdivision})
	const {data:dataAcademicYear} = useGetAcademicYearQuery()
	const {data:dataSubdivision,isSuccess:isSuccessSubdivision} = useGetSubdivisionQuery()
	const [departments, setDepartments] = useState<NewDepartment[]>()
	const [flagLoad,setFlagLoad] = useState(false)
	const columns = [
		{
			key: 'name',
			dataIndex: 'name',
			title: 'Наименование графика',
			name: 'Наименование графика',
			className: 'text-xs !p-2 ',
			// @ts-ignore
			// render: (text, record) => (
			// 	<div className={'flex items-center justify-between'}>
			// 		<span className={'underline flex font-bold'}>{text}</span>
			// 		<Button
			// 			type="text"
			// 			icon={<EditSvg />}
			// 			onClick={() => {
			// 				navigate(`/services/practices/formingSchedule/edit/year=${record.academicYear.replace("/", "-")}/${record.id}`)
			// 			}}
			// 		/>
			// 	</div>
			// )
		},

		{
			title: 'Дата заполнения',
			dataIndex: 'dateFilling',
			width: '20%',
			className: 'mobileFirst',
			// @ts-ignore
			render: (text: any) => dayjs(text).format('DD.MM.YYYY')
		},
		{
			key: 'academicYear',
			dataIndex: 'academicYear',
			title: 'Учебный год',
			className: 'text-xs !p-2'
		},
		{
			key: 'period',
			dataIndex: 'period',
			title: 'Период практики',
			className: 'text-xs !p-2'
		},
		{
			title: (
				''
			),
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
					<Button type="text" onClick={(e) => { e.stopPropagation(); /* обработка клика на PointsSvg */ }}  className="opacity-50" icon={<PointsSvg />} />
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
	}, [filter,isSuccessData,dataAll])


	function filterDataFull() {
		function sortDateFilling(a: ScheduleType, b: ScheduleType) {
			if (filter.dateFilling === 'По дате (сначала новые)') {
				return +new Date(b.dateFilling) - +new Date(a.dateFilling)
			}
			if (filter.dateFilling === 'По дате (сначала старые)') {
				return +new Date(a.dateFilling) - +new Date(b.dateFilling)
			}
			return 0
		}
		function filterSubdivision(elem: any) {
			if (filter.subdivisionId === 'Все') {
				return elem
			} else {
				return elem.subdivisionId === filter.subdivisionId
			}
		}
		function filterAcademicYear(elem: any) {
			if (filter.academicYear === 'Все') {
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

	const handleRowClick = (record:any) => {
		navigate(`/services/practices/formingSchedule/edit/year=${record.academicYear.replace("/", "-")}/${record.id}`)
    };


	return (
		<section className="container">
			<Row gutter={[16, 16]}>
				<Col span={24}>
					<Typography.Text className=" text-[28px] mb-14 titleMobile">
						График практик
					</Typography.Text>
				</Col>
			</Row>
			<Row gutter={[16, 16]} className="mt-12 overWrite">
				<Col span={5} className='overWrite'>
					<span>Подразделение</span>
				</Col>
				<Col span={7} className='overWrite'>
					<Select
						popupMatchSelectWidth={false}
						defaultValue="Все"
						className="w-full"
						onChange={(value: any) => {
							setFlagLoad(true)
							setFilter({ ...filter, subdivisionId: value })
						}}
						options={
							[
								{ key: 2244612, value: 'Все', label: 'Все' },
								...(departments
									? departments.map(item => ({
											key: item.id,
											value: item.id,
											label: item.label
									  }))
									: [])
							]
						}
					/>
				</Col>
				{/* {dataUserSubdivision?.value ? */}
				 <Col span={7} offset={5} className='overWrite orderHigh'>
					<Space className="w-full flex-row-reverse">
						<Button
							type="primary"
							className="!rounded-full my-buttonSchedule"
							onClick={() => {
								navigate('/services/practices/formingSchedule/createSchedule')
							}}
						>
							
						</Button>
					</Space>
				</Col> 
				{/* : null} */}
			</Row>
			<Row gutter={[16, 16]} className="mt-4 flex items-center overWrite">
					<Col span={5} className='overWrite'>
				{/* <div className={'flex gap-2 items-center overWrite w-full'}> */}
					<span>Учебный год</span>
				
					</Col>
					<Col span={7} className='overWrite grow'>
						<Select
							popupMatchSelectWidth={false}
							defaultValue="Все"
							className="w-full"
							onChange={(value: any) => {
								setFilter({ ...filter, academicYear: value })
							}}
							options={
								[
									{key: 2244612, value: "Все", label: "Все"},
								...(dataAcademicYear ? dataAcademicYear.map((item:string) => ({
								key: item,
								value: item,
								label: item
								})) : [])
								]
							}
						/>
					{/* </div> */}
					
					</Col>
			</Row>
			<Row gutter={[16, 16]} className="mt-4 flex items-center overWrite">
				<Col span={7} offset={17} className='overWrite w-full'>
					<div className={'flex gap-2 items-center overWrite w-full'}>
						<span className={'mr-2'}>Сортировка</span>
						<Select
							popupMatchSelectWidth={false}
							defaultValue=""
							className="w-[500px]"
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
		
					{isLoadingUserSubdivision || isFetchingDataAll || flagLoad? <Spin className='w-full mt-20' indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />  
					:  <Table
						onRow={(record) => ({
							onClick: () => handleRowClick(record),
						})}
						responsive
						size="small"
						rowKey="id"
						// @ts-ignore
						columns={columns}
						dataSource={dataTable ? dataTable : []}
						pagination={dataTable && dataTable?.length<10?false:{
							pageSize: 10
						}}
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
					/>}
				
		</section>
	)
}

export default PracticeSchedule


