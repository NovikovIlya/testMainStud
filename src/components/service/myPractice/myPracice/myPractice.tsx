import { LoadingOutlined, ReloadOutlined } from '@ant-design/icons'
import { Button, Col, Form, Radio, Row, Select, Spin, Table, Typography } from 'antd'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useGetAllMyPracticesQuery } from '../../../../store/api/practiceApi/mypractice'
import { useGetAllOrderQuery } from '../../../../store/api/practiceApi/representation'


export const MyPractice = () => {
	const [fullTable, setFullTable] = useState(false)
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
	const {data: dataAllMyPractices,isSuccess: isSuccessMyPractice,isFetching: isFetchingMyPractice,refetch} = useGetAllMyPracticesQuery()

	useEffect(() => {
		if (isSuccessMyPractice) {
			setDataTable(filterDataFull())
		}
	}, [filter, isSuccessMyPractice])

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
			className: 'text-xs !p-2',
			render: (text: any, record: any, index: any) => <div>{record?.grade ? record?.grade : 'Нет оценки'}</div>
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
			className: 'text-xs !p-4',
			render: (text: any, record: any, index: any) => <div>{record?.grade ? record?.grade : 'Нет оценки'}</div>	
		}
	]

	const filterDataFull = () => {
		function filterCourse(elem: any) {
			if (filter.courseNumber === 'Все') {
				return elem
			} else {
				return elem.course === filter.courseNumber
			}
		}


		return dataAllMyPractices ? dataAllMyPractices.filter((elem: any) => filterCourse(elem)) : []
	}
	const handleRowClick = (record: any) => {
		navigate(`/services/mypractices/myPractices/edit/${record.id}`)
	}

	const uniqueCourseNumbers = [...new Set(dataTable?.map((item: any) => item.course))]


	if(isFetchingMyPractice)return(<Spin className="w-full mt-20" indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />)
	
	return (
		<Form form={form}>
			<section className="container animate-fade-in">
				<Row gutter={[16, 16]}>
					<Col span={24}>
						<Typography.Text className=" text-[28px] mb-14">Мои практики</Typography.Text>
					</Col>
				</Row>

				<Row gutter={[16, 16]} className="mt-14 flex items-center">
					<Col span={5}>
						<span>Наименование специальности</span>
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
										? [...new Set(dataAllMyPractices.map(item => item.specialty))].map(specialty => ({
											key: specialty,
											value: specialty,
											label: specialty
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
						<span>Курс</span>
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

				<Row className="mt-12 flex items-center">
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
					<Col className='flex justify-end' span={12}>
						<Button
						onClick={refetch}
						className=""
						size="large"
						shape="circle"
						icon={<ReloadOutlined />}
						/>
					</Col>
				</Row>

				<Row className="mt-4">
					<Col flex={'auto'}>
						{ !fullTable ?(
							<div className="viewPractical">
							<Table
								onRow={record => ({
									onClick: () => handleRowClick(record)
								})}
								rowKey="id"
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
			</section>
		</Form>
	)
}
export default MyPractice
