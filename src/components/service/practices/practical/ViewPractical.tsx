import {
	Button,
	Col, Popover,
	Row,
	Select,
	Space,
	Table,
	TableProps,
	Typography
} from 'antd'
import React, {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'

import {DownloadSvg} from '../../../../assets/svg/DownloadSvg'
import {PrinterSvg} from '../../../../assets/svg/PrinterSvg'

import {IPracticeInfoFull, IPracticesResponse} from '../../../../models/Practice'
import {string} from "yup";
import dayjs from "dayjs";
import {EditSvg} from "../../../../assets/svg/EditSvg";
import {RegisterPopoverMain} from "../popover/register/RegisterPopoverMain";
import {PointsSvg} from "../../../../assets/svg/PointsSvg";
import {RegisterPopoverContent} from "../popover/register/RegisterPopoverContent";
import {PracticalPopoverMain} from "../popover/practical/PracticalPopoverMain";
import {ColumnsTableFull} from "../roster/registerContracts/RegisterContracts";

interface FilterType {
	value: string
	label: string
}

const filterSpecialization: FilterType[] = [
	{
		value: '',
		label: 'Все'
	},
	{
		value: '31.08.01 Акушерство и гинекология',
		label: '31.08.01 Акушерство и гинекология'
	},
	{
		value: '31.08.12 Педиатрия',
		label: '31.08.12 Педиатрия'
	}
]
const filterDepartment: FilterType[] = [
	{
		value: '',
		label: 'Все'
	},
	{
		value: 'Кафедра хирургических болезней постдипломного образования',
		label: 'Кафедра хирургических болезней постдипломного образования'
	},
	{
		value: 'Кафедра онкологических болезней',
		label: 'Кафедра онкологических болезней'
	}
]
const filterCourse: FilterType[] = [
	{
		value: '',
		label: 'Все'
	},
	{
		value: '1',
		label: '1'
	},
	{
		value: '2',
		label: '2'
	},
	{
		value: '3',
		label: '3'
	},
	{
		value: '4',
		label: '4'
	},
	{
		value: '5',
		label: '5'
	},
	{
		value: '6',
		label: '6'
	}
]
const filterSemestr: FilterType[] = [
	{
		value: '',
		label: 'Все'
	},
	{
		value: '1',
		label: '1'
	},
	{
		value: '2',
		label: '2'
	}
]
const filterType: FilterType[] = [
	{
		value: '',
		label: 'Все'
	},
	{
		value: 'Производственная',
		label: 'Производственная'
	},
	{
		value: 'Технологическая',
		label: 'Технологическая'
	}
]

export interface TablePractical {
	id: string
	key: string
	specialtyName: string
	practiceType: string
	department: string
	groupNumber: string
	semester: number
	academicYear: string
	courseStudy: number
	practicePeriod: string[]
	totalHours: number
	individualTasks: string[]
	competencies: string[]
	departmentDirector: string
}

const mockData: TablePractical[] = [
	{
		id: '1',
		key: '1',
		specialtyName: '31.08.01 Акушерство и гинекология',
		practiceType: 'Производственная (клиническая) практика: акушерство и гинекология',
		department: 'Кафедра хирургических болезней постдипломного образования',
		groupNumber: '10.4-134',
		semester: 2,
		academicYear: '2022/2023',
		courseStudy: 1,
		practicePeriod: ['2023/03/30', '2023/05/30'],
		totalHours: 120,
		individualTasks: [
			'Овладеть методиками кесарева сечения (корпоральное, истмико-корпоральное, в нижнем сегменте матки, экстракорпоральное',
			'Овладеть методиками родоразрешающих и плодоразрушающих операций',
			'Акушерский травматизм матери и плода',
		],
		competencies: [
			'ПК-2 Овладеть методиками кесарева сечения (корпоральное, истмико-корпоральное, в нижнем сегменте матки, экстракорпоральное',
			'ПК-6 Овладеть методиками родоразрешающих и плодоразрушающих операций',
			'ПК-7 Акушерский травматизм матери и плода',
		],
		departmentDirector: 'Бурмистров М. В.',
	},
	{
		id: '2',
		key: '2',
		specialtyName: '31.08.01 Акушерство и гинекология',
		practiceType: 'Производственная (клиническая) практика: акушерство и гинекология',
		department: 'Кафедра хирургических болезней постдипломного образования',
		groupNumber: '10.4-134',
		semester: 4,
		academicYear: '2022/2023',
		courseStudy: 1,
		practicePeriod: ['2023/03/30', '2023/05/30'],
		totalHours: 120,
		individualTasks: [
			'Овладеть методиками кесарева сечения (корпоральное, истмико-корпоральное, в нижнем сегменте матки, экстракорпоральное',
			'Овладеть методиками родоразрешающих и плодоразрушающих операций',
			'Акушерский травматизм матери и плода',
		],
		competencies: [
			'ПК-2 Овладеть методиками кесарева сечения (корпоральное, истмико-корпоральное, в нижнем сегменте матки, экстракорпоральное',
			'ПК-6 Овладеть методиками родоразрешающих и плодоразрушающих операций',
			'ПК-7 Акушерский травматизм матери и плода',
		],
		departmentDirector: 'Бурмистров М. В.',
	}
]



export const ViewPractical = () => {
	const navigate = useNavigate()
	const [nameSpecialty, setNameSpecialty] = useState<FilterType[]>(filterSpecialization)
	const [department, setDepartment] = useState<FilterType[]>(filterDepartment)

	const [tableData, setTableData] = useState<TablePractical[]>(mockData)


	const [
		selectedFieldsFull,
		setSelectedFieldFull
	] = useState<TablePractical[]>([])

	const [filter, setFilter] = useState({
		nameSpecialty: 'Все',
		department: 'Все',
		course: 'Все',
		semestr: 'Все',
		practiceType: 'Все',
	})

	const columns: TableProps<TablePractical>['columns'] = [
		{
			key: 'specialtyName',
			dataIndex: 'specialtyName',
			title: 'Шифр и наименование специальности',
			className: 'text-xs !p-2',
			render: (text, record) =>
				<div className={'flex items-center'}>
                    <span className={'underline flex font-bold'}>
                        {text}
                    </span>
					<Button
						type="text"
						icon={<EditSvg/>}
						onClick={() => {}}
					/>
				</div>
		},
		{
			key: 'practiceType',
			dataIndex: 'practiceType',
			title: 'Тип практики',
			className: 'text-xs !p-2'
		},
		{
			key: 'department',
			dataIndex: 'department',
			title: 'Кафедра',
			className: 'text-xs !p-2'
		},
		{
			key: 'groupNumber',
			dataIndex: 'groupNumber',
			title: 'Номер группы',
			align: 'center',
			className: 'text-xs !p-2'

		},
		{
			key: 'semester',
			dataIndex: 'semester',
			title: 'Семестр',
			align: 'center',
			className: 'text-xs !p-2'
		},
		{
			key: 'academicYear',
			dataIndex: 'academicYear',
			title: 'Учебный год',
			align: 'center',
			className: 'text-xs !p-2'
		},
		{
			key: 'courseStudy',
			dataIndex: 'courseStudy',
			title: 'Курс',
			align: 'center',
			className: 'text-xs !p-2'
		},
		{
			key: 'practicePeriod',
			dataIndex: 'practicePeriod',
			title: 'Период практики',
			align: 'center',
			className: 'text-xs !p-2',
			render: (value, record, index) => {
				return (
					<div className={'flex flex-col'}>
						<span>{dayjs(record.practicePeriod[0]).format('DD.MM.YYYY')}</span>
						-
						<span>{dayjs(record.practicePeriod[1]).format('DD.MM.YYYY')}</span>
					</div>
				)
			}
		},
		{
			key: 'totalHours',
			dataIndex: 'totalHours',
			title: 'Кол-во часов по практике',
			align: 'center',
			className: 'text-xs !p-2'
		},
		{
			key: 'individualTasks',
			dataIndex: 'individualTasks',
			title: 'Индивидуальные задания',
			className: 'text-xs !p-2',
			render: (value, record, index) => {
				return (
					<div className={'flex flex-col gap-1'}>
						{record.individualTasks.map((elem, index) => (
							<span key={index}>{index + 1}. {elem}</span>
						))}
					</div>
				)
			}
		},
		{
			key: 'competencies',
			dataIndex: 'competencies',
			title: 'Код и наименование компетенции',
			className: 'text-xs !p-2',
			render: (value, record, index) => {
				return (
					<div className={'flex flex-col gap-1'}>
						{record.competencies.map((elem, index) => (
							<span key={index}>{index + 1}. {elem}</span>
						))}
					</div>
				)
			}
		},
		{
			key: 'departmentDirector',
			dataIndex: 'departmentDirector',
			title: 'Заведующий опорной кафедрой',
			className: 'text-xs !p-2'
		},
		{
			title:
			<Popover trigger={'click'}
					 content={<PracticalPopoverMain
						 recordFullAll={tableData}
						 setRecordFull={setTableData}
						 recordFull={selectedFieldsFull}
						 setSelectedFieldFull={setSelectedFieldFull}
					 />}>
				<Button
					type="text"
					className="opacity-50"
					icon={<PointsSvg/>}
				/>
			</Popover>,
			align: 'center',
			render: (record) =>
					<Button
						type="text"
						className="opacity-50"
						icon={<PointsSvg/>}
					/>,
			fixed: "right",
			width: 50
		}
	]




	return (
		<>
			<section className="container ">
				<Row>
					<Col flex={'auto'}>
						<span className="mb-14 text-[28px]">
							Практики
						</span>
					</Col>
				</Row>
				<Row gutter={[16, 16]} className="mt-12">
					<Col span={5}>
						<span>
							Наименование специальности
						</span>
					</Col>
					<Col span={8}>
						<Select
							popupMatchSelectWidth={false}
							defaultValue=""
							className="w-full"
							options={nameSpecialty}
							onChange={() => {
							}}
						/>
					</Col>
					<Col span={7} offset={4}>
						<Space className="w-full flex-row-reverse">
							<Button
								type="primary"
								className="!rounded-full"
								onClick={() => {
									navigate('/services/practices/practical/createPractical')
								}}
							>
								Добавить практику
							</Button>
						</Space>
					</Col>
				</Row>
				<Row gutter={[16, 16]} className="mt-4">
					<Col span={5}>
						<span>
							Кафедра
						</span>
					</Col>
					<Col span={8}>
						<Select
							popupMatchSelectWidth={false}
							defaultValue=""
							className="w-full"
							options={department}
							onChange={() => {
							}}
						/>
					</Col>
				</Row>
				<Row gutter={[16, 16]} className="mt-4">
					<Col span={3} className={'flex items-center gap-4'}>
						<span>
							Курс
						</span>
						<Select
							popupMatchSelectWidth={false}
							defaultValue=""
							className="w-full"
							options={filterCourse}
							onChange={() => {
							}}
						/>
					</Col>
					<Col span={3} className={'flex items-center gap-4'}>
						<span>
							Семестр
						</span>

						<Select
							popupMatchSelectWidth={false}
							defaultValue=""
							className="w-full"
							options={filterSemestr}
							onChange={() => {
							}}
						/>
					</Col>
					<Col span={7} className={'flex items-center gap-2'}>
						<span className="whitespace-nowrap">
							Вид практики
						</span>
						<Select
							popupMatchSelectWidth={false}
							defaultValue=""
							className="w-full"
							options={filterType}
							onChange={() => {
							}}
						/>
					</Col>
				</Row>
			</section>
			<Table
				size="small"
				columns={columns}
				dataSource={tableData}
				pagination={false}
				className="my-10"
				rowSelection={{
					type: "checkbox",
					onSelect: (record, selected, selectedRows, nativeEvent) => {
						setSelectedFieldFull(selectedRows)
					},
					onSelectAll: (selected, selectedRows, changeRows) => {
						setSelectedFieldFull(selectedRows)
					}
				}}
			/>
		</>
	)
}
