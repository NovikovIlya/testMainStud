import {
	Button,
	Checkbox,
	Col,
	Popover,
	Row,
	Select,
	Space,
	Table,
	Typography
} from 'antd'
import type { GetProp } from 'antd'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { EditSvg } from '../../../../assets/svg/EditSvg'
import { PointsSvg } from '../../../../assets/svg/PointsSvg'
import {
	useCreateDocumentQuery,
	useGetDocQuery
} from '../../../../store/api/practiceApi/formingSchedule'

import { PopoverContent } from './PopoverContent'
import { PopoverMain } from './PopoverMain'


const optionsSortDate: any = [
	{ value: 'По дате (сначала новые)', label: 'По дате (сначала новые)' },
	{ value: 'По дате (сначала старые)', label: 'По дате (сначала старые)' }
]

export const ViewRepresentation = () => {
	const originDate = [
		{
			key: '1',
			name: 'График 2022',
			dateFilling: '2021.08.20',
			type: 'Бессрочный',
			course: '1',
			academicYear: '2',
			period: '2020-2021'
		},
		{
			key: '2',
			name: 'График 2022',
			dateFilling: '2021.08.22',
			type: 'Бессрочный',
			course: '1',
			academicYear: '2',
			period: '2020-2021'
		}
	]
	const navigate = useNavigate()
	const [filter, setFilter] = useState({
		dateFilling: 'По дате (сначала новые)'
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
		function sortDateFilling(a: any, b: any) {
			if (filter.dateFilling === 'По дате (сначала новые)') {
				return +new Date(b.dateFilling) - +new Date(a.dateFilling)
			}
			if (filter.dateFilling === 'По дате (сначала старые)') {
				return +new Date(a.dateFilling) - +new Date(b.dateFilling)
			}
			return 0
		}

		return originDate
			? originDate.sort((a: any, b: any) => sortDateFilling(a, b))
			: []
	}

	// function isCompressedView() {
	//     setStateSchedule({
	//         ...stateSchedule,
	//         compressed: true,
	//         table: false
	//     })
	// }

	// function isTableView() {
	//     setStateSchedule({
	//         ...stateSchedule,
	//         compressed: false,
	//         table: true,
	//     })
	// }

	const columns = [
		{
			key: 'name',
			dataIndex: 'name',
			title: 'Шифр и наименование специальности',
			name: 'Шифр и наименование специальности',
			className: 'text-xs !p-2 ',
			// @ts-ignore
			render: (text, record) => (
				<div className={'flex items-center justify-between'}>
					<span className={'underline flex font-bold'}>{text}</span>
					<Button
						type="text"
						icon={<EditSvg />}
						onClick={() => {
							navigate(`/services/practices/representation/edit/${record.id}`)
						}}
					/>
				</div>
			)
		},

		{
			title: 'Дата заполнения',
			dataIndex: 'dateFilling',
	
			// @ts-ignore
			render: (text: any) => dayjs(text).format('DD.MM.YYYY')
		},
    {
			key: 'FIO',
			dataIndex: 'FIO',
			title: 'ФИО обучающегося',
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
			className: 'text-xs !p-2'
		},
    {
			key: 'groupNumbers',
			dataIndex: 'groupNumbers',
			title: 'Номер группы',
			className: 'text-xs !p-2'
		},
    {
			key: 'place',
			dataIndex: 'place',
			title: 'Место прохождения практики',
			className: 'text-xs !p-2'
		},
    {
			key: 'director',
			dataIndex: 'director',
			title: 'ФИО руководителя от кафедры, должность',
			className: 'text-xs !p-2'
		},
		{
			key: 'isExit',
			dataIndex: 'isExit',
			title: 'Выездные практики',
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
					<span>Наименование специальности</span>
				</Col>
				<Col span={7}>
					<Select
						popupMatchSelectWidth={false}
						defaultValue="Все"
						className="w-full"
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
							Добавить приказ
						</Button>
					</Space>
				</Col>
			</Row>
			<Row gutter={[16, 16]} className="mt-4 flex items-center">
				<Col span={3} >
					<span>Выездные практики</span>
				</Col>
				<Col span={5}>
					<Select
						popupMatchSelectWidth={false}
						defaultValue="Все"
						className="w-full"
					/>
				</Col>
        <Col span={1} >
					<span>Курс</span>
				</Col>
				<Col span={3}>
					<Select
						popupMatchSelectWidth={false}
						defaultValue="Все"
						className="w-full"
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
					/>
				</Col>
        
			</Row>
			<Row gutter={[16, 16]} className="mt-4">
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
			</Row>
			<Row className="mt-4">
				<Col flex={'auto'}>
					<Table
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
