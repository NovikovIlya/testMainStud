import {
	Button, Col,
	Popover,
	Row,
	Select,
	Space,
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
import { optionsCourseValid } from '../../../../utils/optionsCourse'

const optionsNames = [
	{ value: 'Все', label: 'Все' },
	{ value: 'Представление 1', label: 'Представление 1' },
	{ value: 'тест', label: 'тест' },
]
const optionsSortDate: any = [
	{ value: 'По дате (сначала новые)', label: 'По дате (сначала новые)' },
	{ value: 'По дате (сначала старые)', label: 'По дате (сначала старые)' }
]



const specialtyNameOptions = [
	{ value: 'Все', label: 'Все' },
	{ value: '30.08.01 Акушерство и гинекология', label: '30.08.01 Акушерство и гинекология' },
]
const visitingOptions = [
	{ value: 'Все', label: 'Все' },
	{ value: 'Да', label: 'Да' },
	{ value: 'Нет', label: 'Нет' },
]
const fioOptions = [
	{ value: 'Все', label: 'Все' },
	{ value: 'Иванов И.И.', label: 'Иванов И.И.' },
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
const academicYearOptions = [
		{ value: 'Все', label: 'Все' },
		{ value: '2022/2023', label: '2022/2023' },
		{ value: '2023/2024', label: '2023/2024' },
		{ value: '2024/2025', label: '2024/2025' },
		{ value: '2025/2026', label: '2025/2026' },
		{ value: '2026/2027', label: '2026/2027' },
		{ value: '2027/2028', label: '2027/2028' },
		{ value: '2028/2029', label: '2028/2029' },
		{ value: '2029/2030', label: '2029/2030' },
]
const practiceKindOptions = [
	{ value: 'Все', label: 'Все' },
	{ value: 'Производственная', label: 'Производственная' },
	{ value: 'Технологическая', label: 'Технологическая' },
]
const typeOptions = [
	{ value: 'Все', label: 'Все' },
	{ value: 'Производственная', label: 'Производственная' },
	{ value: 'Технологическая', label: 'Технологическая' },
]

export const ViewRepresentation = () => {
	const originDate = [
		{
			key: '1',
			subdivision: 'Представление 1',
			specialtyName: '30.08.01 Акушерство и гинекология',
			groupNumber: '16',
			courseNumber: '1',
			academicYear: '2',
			period: '2',
			practiceType: 'Производственная',
			practiceKind: 'Технологическая',
			place: 'Казань',
			FIO: 'Петров И.И.',
			visiting: 'Нет',
			status: 'Ожидание'
		},
		{
			key: '2',
			subdivision: 'Представление 2',
			specialtyName: '30.08.02 Иное',
			groupNumber: '16',
			course: '1',
			academicYear: '2',
			courseNumber: '1',
			practiceType: 'Производственная',
			practiceKind: 'Технологическая',
			place: 'Москва',
			FIO: 'Иванов И.И.',
			visiting: 'Да',
			status: 'Согласовано'
		}
	]
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
	})
	const [tableData, setTableData] = useState([])
	const [selectedFieldsFull, setSelectedFieldFull] = useState<any>([])
	const [dataTable, setDataTable] = useState<any>(originDate)

	useEffect(() => {
		// if (isSuccessPractiseAll) {
		setDataTable(filterDataFull())
		// }
	}, [filter])

	function filterDataFull() {
		function filterName(elem: any) {
			if (filter.subdivision === 'Все') {
				return elem
			} else {
				return elem.subdivision === filter.subdivision
			}
		}
		function filterSpec(elem: any) {
			if (filter.specialtyName === 'Все') {
				return elem
			} else {
				return elem.specialtyName === filter.specialtyName
			}
		}
		function filtervisiting(elem: any) {
			if (filter.visiting === 'Все') {
				return elem
			} else {
				return elem.visiting === filter.visiting
			}
		}
		function filterFio(elem: any) {
			if (filter.FIO === 'Все') {
				return elem
			} else {
				return elem.FIO === filter.FIO
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
				return elem.academicYear === filter.academicYear
			}
		}
		function filterType(elem: any) {
			if (filter.practiceType === 'Все') {
				return elem
			} else {
				return elem.practiceType === filter.practiceType
			}
		}
		function filterKind(elem: any) {
			if (filter.practiceKind === 'Все') {
				return elem
			} else {
				return elem.practiceKind === filter.practiceKind
			}
		}
		// function sortDateFilling(a: any, b: any) {
		// 	if (filter.dateFilling === 'По дате (сначала новые)') {
		// 		return +new Date(b.dateFilling) - +new Date(a.dateFilling)
		// 	}
		// 	if (filter.dateFilling === 'По дате (сначала старые)') {
		// 		return +new Date(a.dateFilling) - +new Date(b.dateFilling)
		// 	}
		// 	return 0
		// }

		return originDate
			? originDate
			.filter((elem: any) => filterName(elem))
			.filter((elem: any) => filterSpec(elem))
			.filter((elem: any) => filtervisiting(elem))
			.filter((elem: any) => filterFio(elem))
			.filter((elem: any) => filterCourse(elem))
			.filter((elem: any) => filterAcademicYear(elem))
			.filter((elem: any) => filterType(elem))
			.filter((elem: any) => filterKind(elem))
			// .sort((a: any, b: any) => sortDateFilling(a, b))
			: []
	}



	const columns = [
		{
			key: 'subdivision',
			dataIndex: 'subdivision',
			title: 'Подразделение',
			name: 'Подразделение',
			className: 'text-xs !p-2 ',
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
			className: 'text-xs !p-2'
		},
		{
			key: 'groupNumber',
			dataIndex: 'groupNumber',
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
			key: 'courseNumber',
			dataIndex: 'courseNumber',
			title: 'Курс',
			className: 'text-xs !p-2'
		},
   		{
			key: 'practiceType',
			dataIndex: 'practiceType',
			title: 'Тип',
			className: 'text-xs !p-2'
		},
  		{
			key: 'practiceKind',
			dataIndex: 'practiceKind',
			title: 'Вид',
			className: 'text-xs !p-2'
		},
		{
			key: 'place',
			dataIndex: 'place',
			title: 'Место прохождения практики',
			className: 'text-xs !p-2'
		},
		{
			key: 'FIO',
			dataIndex: 'FIO',
			title: 'ФИО руководителя от кафедры, должность',
			className: 'text-xs !p-2'
		},
		{
			key: 'visiting',
			dataIndex: 'visiting',
			title: 'Выездные практики',
			className: 'text-xs !p-2'
		},
		{
			key: 'status',
			dataIndex: 'status',
			title: 'Статус',
			className: 'text-xs !p-2',
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
					<Button type="text" onClick={(e) => { e.stopPropagation()}} className="opacity-50" icon={<PointsSvg />} />
				</Popover>
			),
			fixed: 'right',
			width: 50
		}
	]
	const handleRowClick = (record:any) => {
		navigate(`/services/practices/representation/edit/${record.id}`)
    };

	

	return (
		<section className="container">
			<Row gutter={[16, 16]}>
				<Col span={24}>
					<Typography.Text className=" text-[28px] mb-14">
						Представление в приказ
					</Typography.Text>
				</Col>
			</Row>

			<Row gutter={[16, 16]} className="mt-12 flex items-center">
				<Col span={5}>
					<span>Подразделение</span>
				</Col>
				<Col span={7}>
					<Select
						popupMatchSelectWidth={false}
						defaultValue="Все"
						className="w-full"
						options={optionsNames}
						onChange={(value: any) => {
							setFilter({ ...filter, subdivision: value })
						}}
					/>
				</Col>
				<Col span={7} offset={5}>
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
				</Col>
			</Row>
    		<Row gutter={[16, 16]} className="mt-4 flex items-center">
				<Col span={5} >
					<span>Наименование специальности</span>
				</Col>
				<Col span={7}>
					<Select
						popupMatchSelectWidth={false}
						defaultValue="Все"
						className="w-full"
						options={specialtyNameOptions}
						onChange={(value: any) => {
							setFilter({ ...filter, specialtyName: value })
						}}
					/>
				</Col>
        
			</Row>
			<Row gutter={[16, 16]} className="mt-4 flex items-center">
				<Col span={5} >
					<span>Выездные практики</span>
				</Col>
				<Col span={7}>
					<Select
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
				<Col span={7}>
					<Select
						popupMatchSelectWidth={false}
						defaultValue="Все"
						className="w-full"
						options={fioOptions}
						onChange={(value: any) => {
							setFilter({ ...filter, FIO: value })
						}}
					/>
				</Col>
        
			</Row>
			

			<Row gutter={[16, 16]} className="mt-4 flex items-center">
				<Col span={2} >
					<span>Курс</span>
				</Col>
				<Col span={4}>
					<Select
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
				<Col span={4}>
					<Select
						popupMatchSelectWidth={false}
						defaultValue="Все"
						className="w-full"
						options={academicYearOptions}
						onChange={value => {
							setFilter({
								...filter,
								academicYear: value
							})
						}}
					/>
				</Col>
			</Row>
		
			<Row gutter={[16, 16]} className="mt-4 flex items-center">
				<Col span={2} >
					<span>Тип</span>
				</Col>
				<Col span={4}>
					<Select
						popupMatchSelectWidth={false}
						defaultValue="Все"
						options={typeOptions}
						onChange={value => {
							setFilter({
								...filter,
								practiceType: value
							})
						}}
						className="w-full"
					/>
				</Col>
       			<Col span={2} >
					<span>Вид</span>
				</Col>
				<Col span={4}>
					<Select
						options={practiceKindOptions}
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
							defaultValue="По дате (сначала новые)"
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
					<Table
						onRow={(record) => ({
							onClick: () => handleRowClick(record),
						})}
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
					/>
				</Col>
			</Row>
		</section>
	)
}

export default ViewRepresentation
