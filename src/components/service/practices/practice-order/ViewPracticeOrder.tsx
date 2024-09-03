import {
	Button, Col,
	Popover,
	Row,
	Select,
	Space,
	Spin,
	Table,
	Typography, Form,
	TreeSelect
} from 'antd'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { PointsSvg } from '../../../../assets/svg/PointsSvg'

import { PopoverContent } from './PopoverContent'
import { PopoverMain } from './PopoverMain'
import { useGetAllOrderQuery, useGetAllSubmissionsQuery, useGetOrderSubdevisionQuery, useGetSubmissionsAcademicYearQuery, useGetSubmissionsDirectorQuery, useGetSubmissionsPracticeKindQuery, useGetSubmissionsPracticeTypeQuery, useGetSubmissionsSpecialtiesQuery, useGetSubmissionsSubdevisionQuery } from '../../../../store/api/practiceApi/representation'
import { LoadingOutlined } from '@ant-design/icons'
import { findSubdivisions } from '../../../../utils/findSubdivisions'
import { disableParents } from '../../../../utils/disableParents'


const visitingOptions = [
	{ value: 'Все', label: 'Все' },
	{ value: 'Да', label: 'Да' },
	{ value: 'Нет', label: 'Нет' },
]

const courseNumberOptions = [
	{ value: 'Все', label: 'Все' },
	{ value: '1', label: '1' },
	{ value: '2', label: '2' },
	{ value: '3', label: '3' },
	{ value: '4', label: '4' },
	{ value: '5', label: '5' },
	{ value: '6', label: '6' },
]

export const ViewPracticeOrder = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const [form] = Form.useForm()
	const navigate = useNavigate()
	const [filter, setFilter] = useState({
		subdivision: 'Все',
		specialtyName: 'Все',
		visiting: 'Все',
		FIO: 'Все',
		courseNumber: 'Все',
		academicYear:'Все',
		practiceType: "Все",
		practiceKind: "Все",
		dateFilling: 'По дате (сначала новые)',
	})
	const [tableData, setTableData] = useState([])
	const [selectedFieldsFull, setSelectedFieldFull] = useState<any>([])
	const {data:dataAllSubmissions,isLoading,isSuccess:isSuccessSubAll} = useGetAllSubmissionsQuery(null)
	const {data:dataSubmisisionsSubdevision} = useGetOrderSubdevisionQuery()
	const [selectSubdivisionId,setSelectSubdivisionId] = useState(null)
	const {data:dataSubmissionSpecialty} = useGetSubmissionsSpecialtiesQuery(selectSubdivisionId,{skip:!selectSubdivisionId})
	const {data:dataSubmissionType} = useGetSubmissionsPracticeTypeQuery(selectSubdivisionId,{skip:!selectSubdivisionId})
	const {data:dataSubmissionKind} = useGetSubmissionsPracticeKindQuery(selectSubdivisionId,{skip:!selectSubdivisionId})
	const {data:dataSubmissionDirector} = useGetSubmissionsDirectorQuery(selectSubdivisionId,{skip:!selectSubdivisionId})
	const {data:dataSubmissionAcademicYear} = useGetSubmissionsAcademicYearQuery(selectSubdivisionId,{skip:!selectSubdivisionId})
	const {data:dataAllOrder,isSuccess:isSuccessOrder,isFetching:isLoadingOrder} = useGetAllOrderQuery({subdivisionId:selectSubdivisionId,page:currentPage - 1,size :'5'},{skip:!selectSubdivisionId || !currentPage})
	const [dataTable, setDataTable] = useState<any>([])
	const [treeLine, setTreeLine] = useState(true);
    const [showLeafIcon, setShowLeafIcon] = useState(false);
    const [value, setValue] = useState<any>();

	useEffect(()=>{
		form.setFieldValue('practiceType', 'Все')
		form.setFieldValue('practiceKind', 'Все')
		form.setFieldValue('specialtyName', 'Все')
		form.setFieldValue('FIO', 'Все')
		form.setFieldValue('academicYear', 'Все')
		setFilter({
			...filter,
			specialtyName: 'Все',
			visiting: 'Все',
			FIO: 'Все',
			courseNumber: 'Все',
			academicYear:'Все',
			practiceType: "Все",
			practiceKind: "Все",
		
		})
	},[selectSubdivisionId])

	console.log('dataAllOrder',dataAllOrder)
	console.log('dataTable',dataTable)
	useEffect(() => {
		
			setDataTable(dataAllOrder?.length > 0 ? dataAllOrder : [])
		
	}, [dataAllOrder, filter.subdivision, isSuccessOrder])
	

	function filterDataFull() {
		function filterName(elem: any) {
			if (filter.subdivision === 'Все') {
				return elem
			} else {
				return elem.practice.subdivision === filter.subdivision
			}
		}
		function filterSpec(elem: any) {
			if (filter.specialtyName === 'Все') {
				return elem
			} else {
				return elem.practice.specialtyName === filter.specialtyName
			}
		}
		function filtervisiting(elem: any) {
	
			if (filter.visiting === 'Все') {
				return elem
			} else {
				const v = elem.isWithDeparture ? 'Да' : 'Нет'
				return v === filter.visiting
			}
		}
		function filterFio(elem: any) {
			if (filter.FIO === 'Все') {
				return elem
			} else {
				return elem.practice.departmentDirector === filter.FIO
			}
		}
		function filterCourse(elem: any) {
			if (filter.courseNumber === 'Все') {
				return elem
			} else {
				return elem.courseNumber === filter.courseNumber
			}
		}
		function filterAcademicYear(elem: any) {
			if (filter.academicYear === 'Все') {
				return elem
			} else {
				return elem.practice.academicYear === filter.academicYear
			}
		}
		function filterType(elem: any) {
			if (filter.practiceType === 'Все') {
				return elem
			} else {
				return elem.practice.practiceType === filter.practiceType
			}
		}
		function filterKind(elem: any) {
			if (filter.practiceKind === 'Все') {
				return elem
			} else {
				return elem.practice.practiceKind === filter.practiceKind
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

		return dataAllOrder
			? dataAllOrder
			// .filter((elem: any) => filterName(elem))
			// .filter((elem: any) => filterSpec(elem))
			// .filter((elem: any) => filtervisiting(elem))
			// .filter((elem: any) => filterFio(elem))
			// .filter((elem: any) => filterCourse(elem))
			// .filter((elem: any) => filterAcademicYear(elem))
			// .filter((elem: any) => filterType(elem))
			// .filter((elem: any) => filterKind(elem))
			// .sort((a: any, b: any) => sortDateFilling(a, b))
			: []
	}

	const onPopupScroll: any = (e:any) => {
        console.log('onPopupScroll', e);
    };

	const columns = [
		{
			key: 'subdivision',
			dataIndex: 'subdivision',
			title: 'Подразделение',
			name: 'Подразделение',
			className: 'text-xs !p-2 ',
			render: (text: any, record: any) => <span >{record?.practice?.subdivision}</span>
			// @ts-ignore
			// render: (text, record) => (
			// 	<div className={'flex items-center justify-between'}>
			// 		<span className={'underline flex font-bold'}>{text}</span>
			// 		<Button
			// 			type="text"
			// 			icon={<EditSvg />}
			// 			onClick={() => {
			// 				navigate(`/services/practices/representation/edit/${record.id}`)
			// 			}}
			// 		/>
			// 	</div>
			// )
		},

		// {
		// 	title: 'Дата заполнения',
		// 	dataIndex: 'dateFilling',
	
		// 	// @ts-ignore
		// 	render: (text: any) => dayjs(text).format('DD.MM.YYYY')
		// },
    	{
			key: 'specialtyName',
			dataIndex: 'specialtyName',
			title: 'Шифр и наименование специальности',
			className: 'text-xs !p-2',
			render: (text: any, record: any) => <span >{record?.practice?.specialtyName}</span>
		},
		{
			key: 'groupNumber',
			dataIndex: 'groupNumber',
			title: 'Номер группы',
			className: 'text-xs !p-2',
			render: (text: any, record: any) => <span >{record?.practice?.groupNumber}</span>
		},
   		{
			key: 'academicYear',
			dataIndex: 'academicYear',
			title: 'Учебный год',
			className: 'text-xs !p-2',
			render: (text: any, record: any) => <span >{record?.practice?.academicYear}</span>
		},
    	{
			key: 'courseNumber',
			dataIndex: 'courseNumber',
			title: 'Курс',
			className: 'text-xs !p-2 mobileFirst',
			render: (text: any, record: any) => <span >{record?.practice?.courseNumber}</span>
		},
   		{
			key: 'practiceType',
			dataIndex: 'practiceType',
			title: 'Тип',
			className: 'text-xs !p-2 mobileFirst',
			render: (text: any, record: any) => <span >{record?.practice?.practiceType}</span>
		},
  		{
			key: 'practiceKind',
			dataIndex: 'practiceKind',
			title: 'Вид',
			className: 'text-xs !p-2 mobileFirst',
			render: (text: any, record: any) => <span >{record?.practice?.practiceKind}</span>
		},
		// {
		// 	key: 'place',
		// 	dataIndex: 'place',
		// 	title: 'Место прохождения практики',
		// 	className: 'text-xs !p-2',
		// 	render: (text: any, record: any) => <span >{record?.place}</span>
		// },
		{
			key: 'FIO',
			dataIndex: 'FIO',
			title: 'ФИО руководителя от кафедры, должность',
			className: 'text-xs !p-2 mobileFirst',
			render: (text: any, record: any) => <span >{record?.practice?.departmentDirector}</span>
		},
		{
			key: 'visiting',
			dataIndex: 'visiting',
			title: 'Выездные практики',
			className: 'text-xs !p-2 mobileFirst',
			render: (text: any, record: any) => <span >{record?.isWithDeparture ? 'Да' : 'Нет'}</span>
		},
		{
			key: 'orderStatus',
			dataIndex: 'orderStatus',
			title: 'Статус',
			className: 'text-xs !p-2',
			render: (text: any, record: any) => <span >{record?.orderStatus}</span>
			// render: (text:any, record:any) => (
			// 	<div className={'flex items-center justify-between'}>
			// 		<span className={'underline flex font-bold'}>{text}</span>
			// 		<Button
			// 			type="text"
			// 			icon={<EditSvg />}
			// 			onClick={() => {
			// 				navigate(`/services/practices/representation/edit/${record.id}`)
			// 			}}
			// 		/>
			// 	</div>
			// )
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
							setRecordFull={setDataTable}
						/>
					}
				>
					<Button type="text" onClick={(e) => { e.stopPropagation()}} className="opacity-50" icon={<PointsSvg />} />
				</Popover>
			),
			fixed: 'right',
			width: 50
		}
	]

	const handleRowClick = (record:any) => {
		navigate(`/services/practices/order/edit/${record.id}`)
    };

	const treeData =[...(dataSubmisisionsSubdevision ? dataSubmisisionsSubdevision?.map((item:any)=>{
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


	return (
		<Form form={form}>
		<section className="container">
			<Row gutter={[16, 16]}>
				<Col span={24}>
					<Typography.Text className=" text-[28px] mb-14">
						Приказ по практике
					</Typography.Text>
				</Col>
			</Row>

			<Row gutter={[16, 16]} className="mt-12 flex items-center">
				<Col span={5}>
					<span>Подразделение</span>
				</Col>
				<Col span={7} className='overWrite'>
					{/* <Select
						popupMatchSelectWidth={false}
						defaultValue=""
						className="w-full"
						options={dataSubmisisionsSubdevision}
						onChange={(value: any) => {
							const x = findSubdivisions(dataSubmisisionsSubdevision,value)
							if(x){
								setSelectSubdivisionId(x.id)
							}
								setFilter({ ...filter, subdivision: value })
							}}
					/> */}
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
							
								setSelectSubdivisionId(value)
								setFilter({ ...filter, subdivision: value })
							}}
							treeData={disableParents(treeData)}
							onPopupScroll={onPopupScroll}
							treeNodeFilterProp="title"
						
						/>
				</Col>
				{/* <Col span={7} offset={5}>
					<Space className="w-full flex-row-reverse">
						<Button
							type="primary"
							className="!rounded-full"
							onClick={() => {
								navigate('/services/practices/representation/createRepresentation')
							}}
						>
							Добавить представление
						</Button>
					</Space>
				</Col> */}
			</Row>
    		<Row gutter={[16, 16]} className="mt-4 flex items-center">
				<Col span={5} >
					<span>Наименование специальности</span>
				</Col>
				<Col span={7} className='overWrite'>
				<Form.Item className='mb-0' name={'specialtyName'}>
					<Select
						disabled={filter.subdivision === 'Все' ? true : false}
						popupMatchSelectWidth={false}
						className="w-full"
						options={[
							{ key: 2244612, value: 'Все', label: 'Все' },
							...(dataSubmissionSpecialty
								? dataSubmissionSpecialty.map((item: any) => ({
										key: item.id,
										value: item.value,
										label: item.label
								  }))
								: [])
						]}
						onChange={(value: any) => {
							setFilter({ ...filter, specialtyName: value })
						}}
					/>
					</Form.Item>
				</Col>
			</Row>
			<Row gutter={[16, 16]} className="mt-4 flex items-center">
				<Col span={5} >
					<span>Выездные практики</span>
				</Col>
				<Col span={7} className='overWrite'>
					<Select
						disabled={filter.subdivision === 'Все' ? true : false}
						popupMatchSelectWidth={false}
						defaultValue="Все"
						className="w-full"
						options={visitingOptions}
						onChange={(value: any) => {
							setFilter({ ...filter, visiting: value })
						}}
					/>
				</Col>
			</Row>
			<Row gutter={[16, 16]} className="mt-4 flex items-center">
				<Col span={5} >
					<span>ФИО руководителя</span>
				</Col>
				<Col span={7} className='overWrite'>
					<Form.Item className='mb-0'  name={'FIO'}>
					<Select
						disabled={filter.subdivision === 'Все' ? true : false}
						popupMatchSelectWidth={false}
						defaultValue="Все"
						className="w-full"
						options={[
							{ key: 2244612, value: 'Все', label: 'Все' },
							...(dataSubmissionDirector
								? dataSubmissionDirector.map((item: any) => ({
										key: item.id,
										value: item.value,
										label: item.label
								  }))
								: [])
						]}
						onChange={(value: any) => {
							setFilter({ ...filter, FIO: value })
						}}
					/>
					</Form.Item>
				</Col>
			</Row>
			

			<Row gutter={[16, 16]} className="mt-4 flex items-center">
				<Col span={2} >
					<span>Курс</span>
				</Col>
				<Col span={4} className='overWrite'>
					<Select
						disabled={filter.subdivision === 'Все' ? true : false}
						popupMatchSelectWidth={false}
						defaultValue="Все"
						className="w-full"
						options={courseNumberOptions}
						onChange={value => {
							setFilter({
								...filter,
								courseNumber: value
							})
						}}
					/>
				</Col>
       			<Col span={2} >
					<span>Учебный год</span>
				</Col>
				<Col span={4} className='overWrite'>
				<Form.Item className='mb-0'  name={'academicYear'}>
					<Select
						disabled={filter.subdivision === 'Все' ? true : false}
						popupMatchSelectWidth={false}
						defaultValue="Все"
						className="w-full"
						// options={dataSubmissionAcademicYear?.map((item: any) => ({ label: item, value: item }))}
						options={[
							{ key: 2244612, value: 'Все', label: 'Все' },
							...(dataSubmissionAcademicYear?.map((item: any) => ({ label: item, value: item }))
								? dataSubmissionAcademicYear?.map((item: any) => ({ label: item, value: item })).map((item: any) => ({
										key: item.id,
										value: item.value,
										label: item.label
								  }))
								: [])
						]}
						onChange={value => {
							setFilter({
								...filter,
								academicYear: value
							})
						}}
					/>
					</Form.Item>
				</Col>
			</Row>
		
			<Row gutter={[16, 16]} className="mt-4 flex items-center">
				<Col span={2} >
					<span>Тип</span>
				</Col>
				<Col span={4} className='overWrite'>
				<Form.Item className='mb-0'  name={'practiceType'}>
					<Select
						disabled={filter.subdivision === 'Все' ? true : false}
						popupMatchSelectWidth={false}
						defaultValue="Все"
						// options={dataSubmissionType}
						options={[
							{ key: 2244612, value: 'Все', label: 'Все' },
							...(dataSubmissionType
								? dataSubmissionType?.map((item: any) => ({
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
						className="w-full"
					/>
					</Form.Item>
				</Col>
       			<Col span={2} >
					<span>Вид</span>
				</Col>
				<Col span={4} className='overWrite'>
					<Select
						disabled={filter.subdivision === 'Все' ? true : false}
						options={[
							{ key: 2244612, value: 'Все', label: 'Все' },
							...(dataSubmissionKind
								? dataSubmissionKind?.map((item: any) => ({
										key: item.id,
										value: item.value,
										label: item.label
								  }))
								: [])
						]}
						onChange={value => {
							setFilter({
								...filter,
								practiceKind: value
							})
						}}
						popupMatchSelectWidth={false}
						defaultValue="Все"
						className="w-full"
					/>
				</Col>
			</Row>

			 {/* Сортировка  */}
			{/* <Row gutter={[16, 16]} className="mt-4">
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
			</Row> */}

			<Row className="mt-4">
				<Col flex={'auto'}>
				{isLoadingOrder ? <Spin className="w-full mt-20" indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />}/> :
					<Table
						onRow={(record) => ({
							onClick: () => handleRowClick(record),
						})}
						size="small"
						rowKey="id"
						// @ts-ignore
						columns={columns}
						dataSource={filter?.subdivision !== 'Все' ? dataTable : []}
						pagination={dataTable.length > 10 && {
							current: currentPage,
							pageSize: 10,
							total: dataAllOrder?.length,
							onChange: (page) => setCurrentPage(page),
						  }}
						className="my-10  absolute  sm:relative sm:left-0 sm:top-10"
						rowSelection={{
							type: 'checkbox',
							onSelect: (record, selected, selectedRows, nativeEvent) => {
								setSelectedFieldFull(selectedRows)
							},
							onSelectAll: (selected, selectedRows, changeRows) => {
								setSelectedFieldFull(selectedRows)
							}
						}}
						locale={{
							emptyText: (
							  <div>
								<h3>Нет данных для отображения</h3>
								<p>Поле "Подразделение" не должно быть пустым</p>
							  </div>
							),
						  }}
					/>}
				</Col>
			</Row>
		</section>
		</Form>
	)
}
export default ViewPracticeOrder
