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
import { useGetAllMyPracticesQuery } from '../../../../store/api/practiceApi/mypractice'





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
	// const {data:dataAllSubmissions,isLoading,isSuccess:isSuccessSubAll} = useGetAllSubmissionsQuery(null)
	const [selectSubdivisionId,setSelectSubdivisionId] = useState(null)
	const {data:dataSubmissionSpecialty} = useGetSubmissionsSpecialtiesQuery(selectSubdivisionId,{skip:!selectSubdivisionId})
	const {data:dataSubmissionAcademicYear} = useGetSubmissionsAcademicYearQuery(selectSubdivisionId,{skip:!selectSubdivisionId})
	const {data:dataAllOrder,isSuccess:isSuccessOrder,isFetching:isLoadingOrder} = useGetAllOrderQuery({subdivisionId:selectSubdivisionId,page:currentPage - 1,size :'5'},{skip:!selectSubdivisionId || !currentPage})
	const [dataTable, setDataTable] = useState<any>([])
	const {data:dataAllMyPractices,isSuccess:isSuccessMyPractice,isFetching:isFetchingMyPractice} = useGetAllMyPracticesQuery()

	const columns = [
		
    	{
			key: 'specialty',
			dataIndex: 'specialty',
			title: 'Шифр и наименование специальности',
			className: 'text-xs !p-2',
			
		},
		{
			key: 'group',
			dataIndex: 'group',
			title: 'Номер группы',
			className: 'text-xs !p-2',
			
		},
   		{
			key: 'academicYear',
			dataIndex: 'academicYear',
			title: 'Учебный год',
			className: 'text-xs !p-2',
			
		},
    	{
			key: 'course',
			dataIndex: 'course',
			title: 'Курс',
			className: 'text-xs !p-2 mobileFirst',
			
		},
   		{
			key: 'practiceType',
			dataIndex: 'practiceType',
			title: 'Тип',
			className: 'text-xs !p-2 mobileFirst',
			
		},
  		{
			key: 'practiceKind',
			dataIndex: 'practiceKind',
			title: 'Вид',
			className: 'text-xs !p-2 mobileFirst',
			
		},

		{
			key: 'departmentDirectorName',
			dataIndex: 'departmentDirectorName',
			title: 'ФИО руководителя от кафедры, должность',
			className: 'text-xs !p-2 mobileFirst',
			
		},
		
		{
			key: 'grade',
			dataIndex: 'grade',
			title: 'Оценка',
			className: 'text-xs !p-2',
			
			
		}
		
	]

	const columnsMini = [
    	{
			key: 'specialty',
			dataIndex: 'specialty',
			title: 'Шифр и наименование специальности',
			className: 'text-xs !p-4',
			
		},

   		{
			key: 'academicYear',
			dataIndex: 'academicYear',
			title: 'Учебный год',
			className: 'text-xs !p-4',
			
		},
    	{
			key: 'course',
			dataIndex: 'course',
			title: 'Курс',
			className: 'text-xs !p-4 mobileFirst',
			
		},
   		{
			key: 'practiceType',
			dataIndex: 'practiceType',
			title: 'Тип',
			className: 'text-xs !p-4 mobileFirst',
			
		},
  



		{
			key: 'grade',
			dataIndex: 'grade',
			title: 'Оценка',
			className: 'text-xs !p-4',
			
			
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
		if (isSuccessMyPractice) {
			setDataTable(filterDataFull())	
		}
	}, [filter,isSuccessMyPractice])

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
				return elem.course === filter.courseNumber
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
	
		return dataAllMyPractices
			? dataAllMyPractices
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


	const uniqueCourseNumbers = [...new Set(dataTable?.map((item:any) => item.course))];
	// const uniqueCourseNumbers = ['1','2']

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
						defaultValue={'Все'}
						popupMatchSelectWidth={false}
						className="w-full"
						options={[
							{ key: 2244612, value: 'Все', label: 'Все' },
							...(dataAllMyPractices
								? dataAllMyPractices.map((item: any) => ({
										key: item.specialty,
										value: item.specialty,
										label: item.specialty
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
						options={[
							{ key: 2244612, value: 'Все', label: 'Все' },...(uniqueCourseNumbers.map((item: any) => ({ key: item,label: item, value: item })))
						]}
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
				{isFetchingMyPractice ? <Spin className="w-full mt-20" indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />}/> :
					!fullTable ?
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
				</div> :
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
					/> 
					
				
					}
				</Col>
			</Row>
		</section>
		</Form>
	)
}
export default MyPractice
