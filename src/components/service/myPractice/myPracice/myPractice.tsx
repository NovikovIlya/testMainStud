import {
	Button, Col,
	Popover,
	Row,
	Select,
	Space,
	Spin,
	Table,
	Typography, Form,
	TreeSelect,
	Radio
} from 'antd'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { PointsSvg } from '../../../../assets/svg/PointsSvg'


import { useGetAllOrderQuery, useGetAllSubmissionsQuery, useGetOrderSubdevisionQuery, useGetSubmissionsAcademicYearQuery, useGetSubmissionsDirectorQuery, useGetSubmissionsPracticeKindQuery, useGetSubmissionsPracticeTypeQuery, useGetSubmissionsSpecialtiesQuery, useGetSubmissionsSubdevisionQuery } from '../../../../store/api/practiceApi/representation'
import { LoadingOutlined } from '@ant-design/icons'
import { findSubdivisions } from '../../../../utils/findSubdivisions'
import { disableParents } from '../../../../utils/disableParents'




const mockData = [
  {
      key: '1',
      practice: {
          specialtyName: 'Информационные технологии',
          groupNumber: 'IT-2023-01',
          academicYear: '2023-2024',
          courseNumber: '3',
          practiceType: 'Производственная практика',
          practiceKind: 'Очная',
          departmentDirector: 'Иванов И.И.',
      },
      isWithDeparture: true,
      orderStatus: 'Зачтено',
  },
  {
      key: '2',
      practice: {
          specialtyName: 'Экономика',
          groupNumber: 'ECO-2023-02',
          academicYear: '2023-2024',
          courseNumber: '2',
          practiceType: 'Научно-исследовательская практика',
          practiceKind: 'Заочная',
          departmentDirector: 'Петрова А.А.',
      },
      isWithDeparture: false,
      orderStatus: 'Не зачтено',
  },
  {
      key: '3',
      practice: {
          specialtyName: 'Менеджмент',
          groupNumber: 'MAN-2023-03',
          academicYear: '2023-2024',
          courseNumber: '4',
          practiceType: 'Производственная практика',
          practiceKind: 'Очная',
          departmentDirector: 'Сидоров С.С.',
      },
      isWithDeparture: true,
      orderStatus: 'Зачтено',
  },
  {
      key: '4',
      practice: {
          specialtyName: 'Финансы',
          groupNumber: 'FIN-2023-04',
          academicYear: '2023-2024',
          courseNumber: '1',
          practiceType: 'Практика в компании',
          practiceKind: 'Очная',
          departmentDirector: 'Кузнецова М.М.',
      },
      isWithDeparture: false,
      orderStatus: 'Зачтено',
  },
];

export const MyPractice = () => {
	const [fullTable,setFullTable] = useState(false)
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
	const {data:dataAllSubmissions,isLoading,isSuccess:isSuccessSubAll} = useGetAllSubmissionsQuery(null)
	const [selectSubdivisionId,setSelectSubdivisionId] = useState(null)
	const {data:dataSubmissionSpecialty} = useGetSubmissionsSpecialtiesQuery(selectSubdivisionId,{skip:!selectSubdivisionId})
	const {data:dataSubmissionAcademicYear} = useGetSubmissionsAcademicYearQuery(selectSubdivisionId,{skip:!selectSubdivisionId})
	const {data:dataAllOrder,isSuccess:isSuccessOrder,isFetching:isLoadingOrder} = useGetAllOrderQuery({subdivisionId:selectSubdivisionId,page:currentPage - 1,size :'5'},{skip:!selectSubdivisionId || !currentPage})
	const [dataTable, setDataTable] = useState<any>(mockData)

	const columns = [
		
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

		{
			key: 'FIO',
			dataIndex: 'FIO',
			title: 'ФИО руководителя от кафедры, должность',
			className: 'text-xs !p-2 mobileFirst',
			render: (text: any, record: any) => <span >{record?.practice?.departmentDirector}</span>
		},
		{
			key: 'place',
			dataIndex: 'place',
			title: 'Место прохождения практики',
			className: 'text-xs !p-2 mobileFirst',
			render: (text: any, record: any) => <span >{record?.isWithDeparture ? 'Да' : 'Нет'}</span>
		},
		{
			key: 'status',
			dataIndex: 'status',
			title: 'Оценка',
			className: 'text-xs !p-2',
			render: (text: any, record: any) => <span >{record?.orderStatus}</span>
			
		}
		
	]

	const columnsMini = [
		
    	{
			key: 'specialtyName',
			dataIndex: 'specialtyName',
			title: 'Шифр и наименование специальности',
			className: 'text-xs !p-4',
			render: (text: any, record: any) => <span >{record?.practice?.specialtyName}</span>
		},

   		{
			key: 'academicYear',
			dataIndex: 'academicYear',
			title: 'Учебный год',
			className: 'text-xs !p-4',
			render: (text: any, record: any) => <span >{record?.practice?.academicYear}</span>
		},
    	{
			key: 'courseNumber',
			dataIndex: 'courseNumber',
			title: 'Курс',
			className: 'text-xs !p-4 mobileFirst',
			render: (text: any, record: any) => <span >{record?.practice?.courseNumber}</span>
		},
   		{
			key: 'practiceType',
			dataIndex: 'practiceType',
			title: 'Тип',
			className: 'text-xs !p-4 mobileFirst',
			render: (text: any, record: any) => <span >{record?.practice?.practiceType}</span>
		},
  



		{
			key: 'status',
			dataIndex: 'status',
			title: 'Оценка',
			className: 'text-xs !p-4',
			render: (text: any, record: any) => <span >{record?.orderStatus}</span>
			
		}
		
	]

	// useEffect(()=>{
	// 	form.setFieldValue('practiceType', 'Все')
	// 	form.setFieldValue('practiceKind', 'Все')
	// 	form.setFieldValue('specialtyName', 'Все')
	// 	form.setFieldValue('FIO', 'Все')
	// 	form.setFieldValue('academicYear', 'Все')
	// 	form.setFieldValue('visiting', 'Все')
	// 	setFilter({
	// 		...filter,
	// 		specialtyName: 'Все',
	// 		visiting: 'Все',
	// 		FIO: 'Все',
	// 		courseNumber: 'Все',
	// 		academicYear:'Все',
	// 		practiceType: "Все",
	// 		practiceKind: "Все",
		
	// 	})
	// },[selectSubdivisionId])

	// useEffect(() => {
		
	// 		setDataTable(dataAllOrder?.length > 0 ? dataAllOrder : [])
		
	// }, [dataAllOrder, filter.subdivision, isSuccessOrder])
	useEffect(() => {
		if (isSuccessSubAll) {
			setDataTable(filterDataFull())	
		}
	}, [filter,isSuccessSubAll])

	function filterDataFull() {
		function filterName(elem: any) {
			if (filter.subdivision === 'Все') {
				return elem
			} else {
				
				
				return elem.practice.subdivisionId === filter.subdivision
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
				return elem.practice.courseNumber === filter.courseNumber
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
	
		return dataAllSubmissions
			? dataAllSubmissions
			// .filter((elem: any) => filterName(elem))
			// .filter((elem: any) => filterSpec(elem))
			// .filter((elem: any) => filtervisiting(elem))
			// .filter((elem: any) => filterFio(elem))
			.filter((elem: any) => filterCourse(elem))
			// .filter((elem: any) => filterAcademicYear(elem))
			// .filter((elem: any) => filterType(elem))
			// .filter((elem: any) => filterKind(elem))
			// .sort((a: any, b: any) => sortDateFilling(a, b))
			: []
	}

	const handleRowClick = (record:any) => {
		navigate(`/services/mypractices/myPractices/edit/${record.id}`)
    };


	// const uniqueCourseNumbers = [...new Set(dataTable?.map((item:any) => item.practice.courseNumber))];
	const uniqueCourseNumbers = ['1','2']

	return (
		<Form form={form}>
		<section className="container animate-fade-in">
			<Row gutter={[16, 16]}>
				<Col span={24}>
					<Typography.Text className=" text-[28px] mb-14">
						Мои практики
					</Typography.Text>
				</Col>
			</Row>

			
    		<Row gutter={[16, 16]} className="mt-14 flex items-center">
				<Col span={5} >
					<span>Наименование специальности</span>
				</Col>
				<Col span={7} className='overWrite'>
				<Form.Item className='mb-0' name={'specialtyName'}>
					<Select
					
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
					<span>Курс</span>
				</Col>
				<Col span={7} className='overWrite'>
					<Select
					
						popupMatchSelectWidth={false}
						defaultValue="Все"
						className="w-full"
						options={uniqueCourseNumbers.map((item: any) => ({ key: item,label: item, value: item }))}
						onChange={value => {
							setFilter({
								...filter,
								courseNumber: value
							})
						}}
					/>
				</Col>
       			{/* <Col span={2} >
					<span>Учебный год</span>
				</Col> */}
				{/* <Col span={4} className='overWrite'>
				<Form.Item className='mb-0'  name={'academicYear'}>
					<Select
						
						popupMatchSelectWidth={false}
						defaultValue="Все"
						className="w-full"
						
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
				</Col> */}
			</Row>

			
			<Row className="mt-12 flex items-center">
                <Col span={12} flex="50%" className='mobileFirst'>
                    <Radio.Group defaultValue="compressedView" buttonStyle="solid">
                        <Radio.Button
                            onClick={()=>setFullTable(false)}
                            value="compressedView"
                            className="!rounded-l-full">
                            Посмотреть в сжатом виде
                        </Radio.Button>
                        <Radio.Button
                            onClick={()=>setFullTable(true)}
                            value="tableView"
                            className="!rounded-r-full">
                            Посмотреть данные в таблице
                        </Radio.Button>
                    </Radio.Group>
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
					fullTable ?
					<Table
						onRow={(record) => ({
							onClick: () => handleRowClick(record),
						})}
						size="small"
						rowKey="id"
						// @ts-ignore
						columns={columns}
						dataSource={dataTable}
						pagination={dataTable.length > 10 && {
							current: currentPage,
							pageSize: 10,
							total: dataAllOrder?.length,
							onChange: (page) => setCurrentPage(page),
						  }}
						className="my-10  absolute  sm:relative sm:left-0 top-10 sm:top-0"

						rowClassName={() => 'animate-fade-in'}
						locale={{
							emptyText: (
							  <div>
								<h3>Нет данных для отображения</h3>
							
							  </div>
							),
						  }}
					/> :
					
				<div className='viewPractical'>
				<Table
					onRow={(record) => ({
						onClick: () => handleRowClick(record),
					})}
					
					rowKey="id"
					// @ts-ignore
					columns={columnsMini}
					dataSource={dataTable ? dataTable : []}
					pagination={dataTable && dataTable?.length<10?false:{
                        pageSize: 10
                    }}
					rowClassName={() => 'animate-fade-in '}
					className="my- "
					// rowSelection={{
					// 	type: 'checkbox',
					// 	onSelect: (record, selected, selectedRows, nativeEvent) => {
					// 		setSelectedFieldFull(selectedRows)
					// 	},
					// 	onSelectAll: (selected, selectedRows, changeRows) => {
					// 		setSelectedFieldFull(selectedRows)
					// 	}
					// }}
				/>
				</div>
					}
				</Col>
			</Row>
		</section>
		</Form>
	)
}
export default MyPractice
