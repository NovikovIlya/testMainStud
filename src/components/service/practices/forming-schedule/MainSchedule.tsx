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


const optionsSortDate: any = [
	{ value: 'По дате (сначала новые)', label: 'По дате (сначала новые)' },
	{ value: 'По дате (сначала старые)', label: 'По дате (сначала старые)' }
]

export const PracticeSchedule = () => {
	const navigate = useNavigate()
	const [filter, setFilter] = useState({
		dateFilling: 'По дате (сначала новые)'
	})
	const [tableData, setTableData] = useState([])
	const [selectedFieldsFull, setSelectedFieldFull] = useState<any>([])
	const [dataTable, setDataTable] = useState<any>([])
	const {data:dataUserSubdivision} = useGetSubdivisionUserQuery()
	const {data:dataAll,isSuccess:isSuccessData,isFetching:isFetchingDataAll} = useGetAllSchedulesQuery({subdivisionId:dataUserSubdivision?.value,academicYear:getAcademicYear()},{skip:!dataUserSubdivision})
	const {data:dataAcademicYear} = useGetAcademicYearQuery()
	const {data:dataSubdivision,isSuccess:isSuccessSubdivision} = useGetSubdivisionQuery()
	const [departments, setDepartments] = useState<any[]>()
	const columns = [
		{
			key: 'name',
			dataIndex: 'name',
			title: 'Наименование графика',
			name: 'Наименование графика',
			className: 'text-xs !p-2 ',
			// @ts-ignore
			render: (text, record) => (
				<div className={'flex items-center justify-between'}>
					<span className={'underline flex font-bold'}>{text}</span>
					<Button
						type="text"
						icon={<EditSvg />}
						onClick={() => {
							navigate(`/services/practices/formingSchedule/edit/year=${record.academicYear.replace("/", "-")}/${record.id}`)
						}}
					/>
				</div>
			)
		},

		{
			title: 'Дата заполнения',
			dataIndex: 'dateFilling',
			width: '20%',
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
				<Popover
					trigger={'click'}
					content={
						<PopoverMain
							// @ts-ignore
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
						<PopoverContent
							recordFull={record}
							recordFullAll={tableData}
							setRecordFull={setTableData}
						/>
					}
				>
					<Button type="text" className="opacity-50" icon={<PointsSvg />} />
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
		function sortDateFilling(a: any, b: any) {
			if (filter.dateFilling === 'По дате (сначала новые)') {
				return +new Date(b.dateFilling) - +new Date(a.dateFilling)
			}
			if (filter.dateFilling === 'По дате (сначала старые)') {
				return +new Date(a.dateFilling) - +new Date(b.dateFilling)
			}
			return 0
		}

		return dataAll
			? [...dataAll].sort((a: any, b: any) => sortDateFilling(a, b))
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


	return (
		<section className="container">
			<Row gutter={[16, 16]}>
				<Col span={24}>
					<Typography.Text className=" text-[28px] mb-14">
						График практик
					</Typography.Text>
				</Col>
			</Row>
			<Row gutter={[16, 16]} className="mt-12">
				<Col span={5}>
					<span>Подразделение</span>
				</Col>
				<Col span={7}>
					<Select
						popupMatchSelectWidth={false}
						defaultValue="Все"
						className="w-full"
						options={
							[
								{ key: 2244612, value: 'Все', label: 'Все' },
								...(departments
									? departments.map(item => ({
											key: item.id,
											value: item.value,
											label: item.label
									  }))
									: [])
							]
						}
					/>
				</Col>
				{/* {dataUserSubdivision?.value ? */}
				 <Col span={7} offset={5}>
					<Space className="w-full flex-row-reverse">
						<Button
							type="primary"
							className="!rounded-full"
							onClick={() => {
								navigate('/services/practices/formingSchedule/createSchedule')
							}}
						>
							Добавить график практик
						</Button>
					</Space>
				</Col> 
				{/* : null} */}
			</Row>
			<Row gutter={[16, 16]} className="mt-4 flex items-center">
				<Col span={5}>
					<span>Учебный год</span>
				</Col>
				<Col span={7}>
					<Select
						popupMatchSelectWidth={false}
						defaultValue="Все"
						className="w-full"
						options={
							[
								{key: 2244612, value: "Все", label: "Все"},
                            ...(dataAcademicYear ? dataAcademicYear.map((item:any) => ({
                              key: item,
                              value: item,
                              label: item
                            })) : [])
							]
						}
					/>
				</Col>
			</Row>
			<Row gutter={[16, 16]} className="mt-4 flex items-centerек">
				<Col span={7} offset={17}>
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
			<Row className="mt-4">
				<Col flex={'auto'}>
					{isFetchingDataAll ? <Spin className='w-full mt-20' indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />  
					:  <Table
						size="small"
						rowKey="id"
						// @ts-ignore
						columns={columns}
						dataSource={dataTable ? dataTable : []}
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
					/>}
				</Col>
			</Row>
		</section>
	)
}

export default PracticeSchedule


