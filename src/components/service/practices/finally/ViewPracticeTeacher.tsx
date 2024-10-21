import { ReloadOutlined } from '@ant-design/icons'
import {
	Button,
	Col,
	Form,
	Row,
	Select,
	Space,
	Spin,
	Table} from 'antd'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { Vector } from '../../../../assets/svg/Vector'
import {
	useGetOneGroupQuery,
	useGetStatusQuery} from '../../../../store/api/practiceApi/practiceTeacher'



export const ViewPraciceTeacher = () => {
	const path = useLocation()
	const id = path.pathname.split('/').at(-1)!
	const [files, setFiles] = useState<any>({
		report: null,
		diary: null,
		tasks: null
	})
	const [idStudent, setIdStudent] = useState<any>(null)
	const { data: dataStatus, isSuccess: isSuccessStatus } = useGetStatusQuery(idStudent, { skip: !idStudent })
	const [grade, setGrade] = useState<any>(null)
	const [rowData, setRowData] = useState(null)
	const [statusStudent, setStatusStudent] = useState<any>(null)
	const nav = useNavigate()
	const [delay, setDelay] = useState<number | undefined>(250)
	const [fullTable, setFullTable] = useState(false)
	const [currentPage, setCurrentPage] = useState(1)
	const [form] = Form.useForm()
	const [filter, setFilter] = useState({
		name: 'Все',
		courseNumber: 'Все',
		dateFilling: 'По дате (сначала новые)',
		status: 'Все'
	})
	const {data: dataAllOrder,isSuccess: isSuccessOrder,isFetching: isFetchingMyPractice,refetch: refetchAll} = useGetOneGroupQuery(id, { refetchOnMountOrArgChange: true })
	const [dataTable, setDataTable] = useState<any>(dataAllOrder)
	

	const columnsMini = [
		{
			key: 'number',
			dataIndex: 'number',
			title: '№',
			className: 'text-xs !p-4'
		},
		{
			key: 'studentName',
			dataIndex: 'studentName',
			title: 'ФИО обучающегося',
			className: 'w-[250px]'
		},
		{
			key: 'grade',
			dataIndex: 'grade',
			title: 'Оценка',
			className: 'text-xs !p-4 ',
			render: (record: any, text: any) => {
				return (
					<div className="">
						{text?.grade ? (
							<div>
								{text?.grade}
								{text?.reason ? ` (${text?.reason})` : ''}
							</div>
						) : (
							'Не оценено'
						)}
					</div>
				)
			}
		},
		{
			key: 'documentsStudent',
			dataIndex: 'documentsStudent',
			title: 'Документы студентов',
			className: 'text-xs !p-4 ',
			render: (record: any, text: any) => {
				return (
					<>
						<div className="!text-xs">Отчет: <a>Отчет.docx</a></div>
						<div className="!text-xs">Дневник: <a>Дневник.docx</a></div>
						<div className="!text-xs">
							{text?.thirdDocType === 'TASKS' ? 'Инд.задания' : 'Путевка'}:{' '}
							<a>Док.docx</a>
						</div>
					</>
				)
			}
		},
		{
			key: 'reportTeacher',
			dataIndex: 'reportTeacher',
			title: 'Отчет преподаватеоя',
			className: 'text-xs !p-4 ',
			render: (record: any, text: any) => {
				return (
					<>
						<a className="p-5">Отчет.docx</a>
					</>
				)
			}
		}
	]

	useEffect(() => {
		if (isSuccessStatus) {
			form.setFieldValue('reasonText', dataStatus?.reason)
			if (dataStatus?.grade === null) {
				setGrade('')
			} else {
				setGrade(dataStatus?.grade)
			}

			if (dataStatus?.status === null) {
				setStatusStudent('Ожидает проверки')
			} else {
				setStatusStudent(dataStatus?.status)
			}
		}
	}, [dataStatus?.grade, dataStatus?.status, isSuccessStatus])

	useEffect(() => {
		if (isSuccessOrder) {
			setDataTable(filterDataFull())
		}
	}, [filter, isSuccessOrder, dataAllOrder])

	function filterDataFull() {
		function filterCourse(elem: any) {
			if (filter.courseNumber === 'Все') {
				return elem
			} else {
				return elem.course === filter.courseNumber
			}
		}
		function filterStatus(elem: any) {
			if (filter.status === 'Все') {
				return elem
			} else if (filter.status === 'Ожидает проверки') {
				return elem.status === null || elem.status === 'Ожидает проверки'
			} else {
				return elem.status === filter.status
			}
		}
		function filterName(elem: any) {
			if (filter.name === 'Все') {
				return elem
			} else {
				return elem.studentName === filter.name
			}
		}

		return dataAllOrder
			? dataAllOrder
					.filter((elem: any) => filterCourse(elem))
					.filter((elem: any) => filterName(elem))
					.filter((elem: any) => filterStatus(elem))
			: []
	}

	const handleRowClick = (record: any) => {
		setIdStudent(record.id)

		setRowData(record)

		setFiles({
			report: null,
			diary: null,
			tasks: null
		})
	}

	const sortedData =
		dataTable?.length > 0
			? [...dataTable]
					.sort((a: any, b: any) => a.studentName.localeCompare(b.studentName))
					.map((item: any, index: number) => ({ ...item, number: index + 1 }))
			: []
	const uniqueNames = Array.from(new Set(dataAllOrder?.map((student: any) => student.studentName)))

	return (
		<Form form={form}>
			<Spin spinning={isFetchingMyPractice}>
				<section className="container animate-fade-in">
					<Space size={10} align="center">
						<Button
							size="large"
							style={{ width: '48px' }}
							className="mt-1 mr-6 w-[48px] rounded-full border border-black"
							icon={<Vector />}
							type="text"
							onClick={() => {
								nav('/services/practices/finally')
							}}
						/>
						<span className=" text-[28px] font-normal">Практика группы {dataAllOrder?.[0]?.groupNumber}</span>
					</Space>

					<Row gutter={[16, 16]} className="mt-14  flex items-center">
						<Col span={5}>
							<span>ФИО обучающегося</span>
						</Col>
						<Col span={7} className="overWrite">
							<Form.Item className="mb-0" name={'name'}>
								<Select
									showSearch
									defaultValue={'Все'}
									popupMatchSelectWidth={false}
									className="w-full"
									options={[
										{ key: 2244612, value: 'Все', label: 'Все' },
										...(uniqueNames
											? uniqueNames.map((item: any) => ({
													key: item,
													value: item,
													label: item
											  }))
											: [])
									]}
									onChange={(value: any) => {
										setFilter({ ...filter, name: value })
									}}
								/>
							</Form.Item>
						</Col>
					</Row>

					<Row gutter={[16, 16]} className="mt-4 mb-14 flex items-center"></Row>
					<Row>
						<Col className="flex justify-end" span={24}>
							<Button onClick={refetchAll} className="" size="large" shape="circle" icon={<ReloadOutlined />} />
						</Col>
					</Row>

					<Row className="mt-4">
						<Col flex={'auto'}>
							{!fullTable ? (
								<div className="viewPractical">
									<Table
										onRow={record => ({
											onClick: e => {
												// @ts-ignore
												if (e.target.closest('.ant-btn')) {
													return
												}
												// @ts-ignore
												if (e.target.closest('.ant-select-item-option-content')) {
													return
												}
												handleRowClick(record)
											}
										})}
										rowKey="id"
										// @ts-ignore
										columns={columnsMini}
										dataSource={sortedData}
										pagination={
											dataTable && dataTable?.length < 10
												? false
												: {
														pageSize: 10,
														position: ['bottomLeft']
												  }
										}
										rowClassName={() => 'animate-fade-in '}
										className="ant-table2"
									/>
								</div>
							) : (
								<Table
									onRow={record => ({
										onClick: e => {
											// @ts-ignore
											if (e.target.closest('.ant-select')) {
												return
											}
											// @ts-ignore
											if (e.target.closest('.ant-select-item-option-content')) {
												return
											}
											handleRowClick(record)
										}
									})}
									size="large"
									rowKey="id"
									// @ts-ignore
									columns={columns}
									dataSource={dataTable.map((item: any, index: number) => ({ ...item, number: index + 1 }))}
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
			</Spin>
		</Form>
	)
}
export default ViewPraciceTeacher
