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


import { useGetAllOrderQuery, useGetAllSubmissionsQuery, useGetOrderSubdevisionQuery, useGetSubmissionsAcademicYearQuery, useGetSubmissionsDirectorQuery, useGetSubmissionsPracticeKindQuery, useGetSubmissionsPracticeTypeQuery, useGetSubmissionsSpecialtiesQuery, useGetSubmissionsSubdevisionQuery } from '../../../../store/api/practiceApi/representation'
import { LoadingOutlined } from '@ant-design/icons'
import { findSubdivisions } from '../../../../utils/findSubdivisions'
import { disableParents } from '../../../../utils/disableParents'


const visitingOptions = [
	{ value: 'Все', label: 'Все' },
	{ value: 'Да', label: 'Да' },
	{ value: 'Нет', label: 'Нет' },
]

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

export const ViewPracticeTeacher = () => {
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
		form.setFieldValue('visiting', 'Все')
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

	useEffect(() => {
		
			setDataTable(dataAllOrder?.length > 0 ? dataAllOrder : [])
		
	}, [dataAllOrder, filter.subdivision, isSuccessOrder])
	

	const onPopupScroll: any = (e:any) => {
        console.log('onPopupScroll', e);
    };

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

	const handleRowClick = (record:any) => {
		navigate(`/services/mypractices/myPractices/edit/${record.id}`)
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

	const uniqueCourseNumbers = [...new Set(dataTable?.map((item:any) => item.practice.courseNumber))];

	return (
		<Form form={form}>
		<section className="container animate-fade-in">
			<Row gutter={[16, 16]}>
				<Col span={24}>
					<Typography.Text className=" text-[28px] mb-14">
						Модуль "практики студентов"
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
					<span>ФИО руководителя</span>
				</Col>
				<Col span={7} className='overWrite'>
					<Form.Item className='mb-0'  name={'FIO'}>
					<Select
						
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
						options={uniqueCourseNumbers.map((item: any) => ({ key: item,label: item, value: item }))}
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
						dataSource={mockData}
						pagination={dataTable.length > 10 && {
							current: currentPage,
							pageSize: 10,
							total: dataAllOrder?.length,
							onChange: (page) => setCurrentPage(page),
						  }}
						className="my-10  absolute  sm:relative sm:left-0 sm:top-10"

						rowClassName={() => 'animate-fade-in'}
						locale={{
							emptyText: (
							  <div>
								<h3>Нет данных для отображения</h3>
							
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
export default ViewPracticeTeacher
