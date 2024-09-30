import { LoadingOutlined } from '@ant-design/icons'
import { Col, Drawer, Form, Radio, Row, Select, Spin, Table, Typography } from 'antd'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useGetAllMyPracticesQuery } from '../../../../store/api/practiceApi/mypractice'
import { useGetAllOrderQuery } from '../../../../store/api/practiceApi/representation'
import { CommentNewTeacher } from './CommentTeacher'

export const ViewPraciceTeacher = () => {
	const [open, setOpen] = useState(false);
	const [fullTable, setFullTable] = useState(true)
	const [currentPage, setCurrentPage] = useState(1)
	const [form] = Form.useForm()
	const navigate = useNavigate()
	const [filter, setFilter] = useState({
		specialtyName: 'Все',
		courseNumber: 'Все',
		dateFilling: 'По дате (сначала новые)'
	})
	const [selectSubdivisionId, setSelectSubdivisionId] = useState(null)
	const {data: dataAllOrder,isSuccess: isSuccessOrder,isFetching: isLoadingOrder} = useGetAllOrderQuery({ subdivisionId: selectSubdivisionId, page: currentPage - 1, size: '5' },{ skip: !selectSubdivisionId || !currentPage })
	const [dataTable, setDataTable] = useState<any>([])
	const {data: dataAllMyPractices,isSuccess: isSuccessMyPractice,isFetching: isFetchingMyPractice} = useGetAllMyPracticesQuery()
	const columns = [
		{
			key: 'specialty',
			dataIndex: 'specialty',
			title: 'Шифр и наименование специальности',
			className: 'text-xs !p-4'
		},
		{
			key: 'group',
			dataIndex: 'group',
			title: 'Номер группы',
			className: 'text-xs !p-2'
		},
		{
			key: 'academicYear',
			dataIndex: 'academicYear',
			title: 'Учебный год',
			className: 'text-xs !p-2'
		},
		{
			key: 'course',
			dataIndex: 'course',
			title: 'Курс',
			className: 'text-xs !p-2 mobileFirst'
		},
		{
			key: 'practiceType',
			dataIndex: 'practiceType',
			title: 'Тип',
			className: 'text-xs !p-2 mobileFirst'
		},
		{
			key: 'practiceKind',
			dataIndex: 'practiceKind',
			title: 'Вид',
			className: 'text-xs !p-2 mobileFirst'
		},

		{
			key: 'departmentDirectorName',
			dataIndex: 'departmentDirectorName',
			title: 'ФИО руководителя от кафедры, должность',
			className: 'text-xs !p-2 mobileFirst'
		},

		{
			key: 'grade',
			dataIndex: 'grade',
			title: 'Оценка',
			className: 'text-xs !p-2'
		}
	]
	const columnsMini = [
		{
			key: 'specialty',
			dataIndex: 'specialty',
			title: 'Шифр и наименование специальности',
			className: 'text-xs !p-4'
		},

		{
			key: 'academicYear',
			dataIndex: 'academicYear',
			title: 'Учебный год',
			className: 'text-xs !p-4'
		},
		{
			key: 'course',
			dataIndex: 'course',
			title: 'Курс',
			className: 'text-xs !p-4 mobileFirst'
		},
		{
			key: 'practiceType',
			dataIndex: 'practiceType',
			title: 'Тип',
			className: 'text-xs !p-4 mobileFirst'
		},

		{
			key: 'grade',
			dataIndex: 'grade',
			title: 'Оценка',
			className: 'text-xs !p-4'
		}
	]

	useEffect(() => {
		if (isSuccessMyPractice) {
			setDataTable(filterDataFull())
		}
	}, [filter, isSuccessMyPractice])

	function filterDataFull() {
		function filterCourse(elem: any) {
			if (filter.courseNumber === 'Все') {
				return elem
			} else {
				return elem.course === filter.courseNumber
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

		return dataAllMyPractices ? dataAllMyPractices.filter((elem: any) => filterCourse(elem)) : []
	}
	const handleRowClick = (record: any) => {
		showDrawer()
		// navigate(`/services/mypractices/myPractices/edit/${record.id}`)
	}
	const showDrawer = () => {
		setOpen(true);
	  };
	
	  const onClose = () => {
		setOpen(false);
	  };

	const uniqueCourseNumbers = [...new Set(dataTable?.map((item: any) => item.course))]

	if(isFetchingMyPractice)return(<Spin className="w-full mt-20" indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />)
	
	return (
		<Form form={form}>
			<section className="container animate-fade-in">
				<Row gutter={[16, 16]}>
					<Col span={24}>
						<Typography.Text className=" text-[28px] mb-14">Практика для преподавателя</Typography.Text>
					</Col>
				</Row>

				<Row gutter={[16, 16]} className="mt-14 flex items-center">
					<Col span={5}>
						<span>Статус</span>
					</Col>
					<Col span={7} className="overWrite">
						<Form.Item className="mb-0" name={'specialtyName'}>
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
					<Col span={5}>
						<span>Номер группы</span>
					</Col>
					<Col span={7} className="overWrite">
						<Select
							popupMatchSelectWidth={false}
							defaultValue="Все"
							className="w-full"
							options={[
								{ key: 2244612, value: 'Все', label: 'Все' },
								...uniqueCourseNumbers.map((item: any) => ({ key: item, label: item, value: item }))
							]}
							onChange={value => {
								setFilter({
									...filter,
									courseNumber: value
								})
							}}
						/>
					</Col>
				</Row>

				{/* <Row className="mt-12 flex items-center">
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
				</Row> */}

				

				<Row className="mt-4">
					<Col flex={'auto'}>
						{ !fullTable ?(
							<div className="viewPractical">
							<Table
								onRow={record => ({
									onClick: () => handleRowClick(record)
								})}
								rowKey="id"
								// @ts-ignore
								columns={columnsMini}
								dataSource={dataTable ? dataTable : []}
								pagination={
									dataTable && dataTable?.length < 10
										? false
										: {
												pageSize: 10
											}
								}
								rowClassName={() => 'animate-fade-in '}
								className="my- "
							/>
						</div>
						) :  (
							<Table
								onRow={record => ({
									onClick: () => handleRowClick(record)
								})}
								size="large"
								rowKey="id"
								// @ts-ignore
								columns={columns}
								dataSource={dataTable}
								pagination={
									dataTable.length > 10 && {
										current: currentPage,
										pageSize: 10,
										total: dataAllOrder?.length,
										onChange: page => setCurrentPage(page)
									}
								}
								className="my-10  absolute  sm:relative sm:left-0 top-10 sm:top-0"
								rowClassName={() => 'animate-fade-in'}
								locale={{
									emptyText: (
										<div>
											<h3>Нет данных для отображения</h3>
										</div>
									)
								}}
							/>
						)}
					</Col>
				</Row>
				<Drawer bodyStyle={{ paddingTop: '80px' }}  headerStyle={{paddingTop: '140px'}} className=''  onClose={onClose} open={open}>
					<div className='top-10'>
						<CommentNewTeacher/>
					</div>
				</Drawer>
			</section>
		</Form>
	)
}
export default ViewPraciceTeacher
