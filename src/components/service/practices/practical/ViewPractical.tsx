import {
	Button,
	Col,
	Popover,
	Row,
	Select,
	Space,
	Table,
	TableProps
} from 'antd'
import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { EditSvg } from '../../../../assets/svg/EditSvg'
import { PointsSvg } from '../../../../assets/svg/PointsSvg'
import { useGetPracticesAllQuery } from '../../../../store/api/practiceApi/individualTask'
import { useGetSpecialtyNamesQuery } from '../../../../store/api/practiceApi/roster'
import { agreementFileDocument } from '../../../../utils/downloadDocument/agreementFileDocument'
import { practiceDocument } from '../../../../utils/downloadDocument/practiceDocument'
import { FullIndividualTask } from '../individual-tasks/IndividualTasks'
import { PracticalPopoverContent } from '../popover/practical/PracticalPopoverContent'
import { PracticalPopoverMain } from '../popover/practical/PracticalPopoverMain'
import { OptionsNameSpecialty } from '../roster/registerContracts/RegisterContracts'

import './ViewPractical.scss'

interface FilterType {
	value: string | number
	label: string | number
}

const filterSpecialization: FilterType[] = [
	{
		value: 'Все',
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
		value: 'Все',
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
		value: 'Все',
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
const filterSemester: FilterType[] = [
	{
		value: 'Все',
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
		value: 'Все',
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
	semester: string
	academicYear: string
	courseStudy: string
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
		practiceType: 'Производственная',
		department: 'Кафедра хирургических болезней постдипломного образования',
		groupNumber: '10.4-134',
		semester: '1',
		academicYear: '2022/2023',
		courseStudy: '2',
		practicePeriod: ['2023/03/30', '2023/05/30'],
		totalHours: 120,
		individualTasks: [
			'Овладеть методиками кесарева сечения (корпоральное, истмико-корпоральное, в нижнем сегменте матки, экстракорпоральное',
			'Овладеть методиками родоразрешающих и плодоразрушающих операций',
			'Акушерский травматизм матери и плода'
		],
		competencies: [
			'ПК-2 Овладеть методиками кесарева сечения (корпоральное, истмико-корпоральное, в нижнем сегменте матки, экстракорпоральное',
			'ПК-6 Овладеть методиками родоразрешающих и плодоразрушающих операций',
			'ПК-7 Акушерский травматизм матери и плода'
		],
		departmentDirector: 'Бурмистров М. В.'
	},
	{
		id: '2',
		key: '2',
		specialtyName: '31.08.12 Педиатрия',
		practiceType: 'Технологическая',
		department: 'Кафедра онкологических болезней',
		groupNumber: '10.4-134',
		semester: '2',
		academicYear: '2022/2023',
		courseStudy: '4',
		practicePeriod: ['2023/03/30', '2023/05/30'],
		totalHours: 120,
		individualTasks: [
			'Овладеть методиками кесарева сечения (корпоральное, истмико-корпоральное, в нижнем сегменте матки, экстракорпоральное',
			'Овладеть методиками родоразрешающих и плодоразрушающих операций',
			'Акушерский травматизм матери и плода'
		],
		competencies: [
			'ПК-2 Овладеть методиками кесарева сечения (корпоральное, истмико-корпоральное, в нижнем сегменте матки, экстракорпоральное',
			'ПК-6 Овладеть методиками родоразрешающих и плодоразрушающих операций',
			'ПК-7 Акушерский травматизм матери и плода'
		],
		departmentDirector: 'Бурмистров М. В.'
	}
]

export const ViewPractical = () => {
	const navigate = useNavigate()
	const [department, setDepartment] = useState<FilterType[]>(filterDepartment)

	const { data: dataPractiseAll } = useGetPracticesAllQuery(null)
	const [tableData, setTableData] = useState<TablePractical[]>(dataPractiseAll)
	const tokenAccess = localStorage.getItem('access')!.replaceAll('"', '')

	const [nameSpecialty, setNameSpecialty] = useState<OptionsNameSpecialty[]>()
	
	const { data: dataNameSpecialty, isSuccess: isSuccessNameSpecialty } =
		useGetSpecialtyNamesQuery()

	useEffect(() => {
		if (isSuccessNameSpecialty) {
			setNameSpecialty(dataNameSpecialty)
		}
	}, [dataNameSpecialty])

	const [selectedFieldsFull, setSelectedFieldFull] = useState<TablePractical[]>(
		[]
	)

	const [filter, setFilter] = useState({
		nameSpecialty: 'Все',
		department: 'Все',
		course: 'Все',
		semester: 'Все',
		practiceType: 'Все'
	})

	const columns = [
		{
			key: 'specialtyName',
			dataIndex: 'specialtyName',
			title: 'Шифр и наименование специальности',
			name: 'Шифр и наименование специальности',
			className: 'text-xs !p-2',

			// @ts-ignore
			render: (text, record) => (
				<div className={'flex items-center'}>
					<span className={'underline flex font-bold'}>{text}</span>
					<Button
						type="text"
						icon={<EditSvg />}
						onClick={() => {
							navigate(
								`/services/practices/practical/editPractical/${record.id}`
							)
						}}
					/>
				</div>
			)
		},
		{
			key: 'practiceType',
			dataIndex: 'practiceType',
			name: 'Тип практики',
			title: 'Тип практики',
			className: 'text-xs !p-2',
			filters:[{
				text: 'практика по получению первичных',
				value: 'практика по получению',
			  },],
			  // @ts-ignore
			  onFilter: (value, record) => record?.practiceType?.indexOf(value as string) === 0,
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
						<span>{dayjs(record.practicePeriod[0]).format('DD.MM.YYYY')}</span>-
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
						{record.individualTasks?.map((elem, index) => (
							<span key={index}>
								{index + 1}. {elem}
							</span>
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
						{record.competencies?.map((elem, index) => (
							<span key={index}>
								{index + 1}. {elem}
							</span>
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
			title: (
				<Popover
					trigger={'click'}
					content={
						<PracticalPopoverMain
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
			render: record => (
				<Popover
					trigger={'click'}
					content={
						<PracticalPopoverContent
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

	function filterDataFull() {
		function filterPracticeType(elem: TablePractical) {
			if (filter.practiceType === 'Все') {
				return elem
			} else {
				return elem.practiceType === filter.practiceType
			}
		}

		function filterDepartment(elem: TablePractical) {
			if (filter.department === 'Все') {
				return elem
			} else {
				return elem.department === filter.department
			}
		}

		function filterCourse(elem: TablePractical) {
			if (filter.course === 'Все') {
				return elem
			} else {
				return elem.courseStudy === filter.course
			}
		}

		function filterSemester(elem: TablePractical) {
			if (filter.semester === 'Все') {
				return elem
			} else {
				return elem.semester === filter.semester
			}
		}

		function filterNameSpecialty(elem: TablePractical) {
			if (filter.nameSpecialty === 'Все') {
				return elem
			} else {
				return elem.specialtyName === filter.nameSpecialty
			}
		}
		// function sortDateFilling(a: FullIndividualTask, b: FullIndividualTask) {
		// 	if (filter.dateFilling === 'По дате (сначала новые)') {
		// 		return +new Date(b.dateFilling) - +new Date(a.dateFilling)
		// 	}
		// 	if (filter.dateFilling === 'По дате (сначала старые)') {
		// 		return +new Date(a.dateFilling) - +new Date(b.dateFilling)
		// 	}
		// 	return 0
		// }
		//
		// if (isSuccess) {
		// 	const dataFull: FullIndividualTask[] = data.map(elem => changeListDataAll(elem))
		// 	return dataFull
		// 		.filter(elem => filterPracticeType(elem))
		// 		.filter(elem => filterNameSpecialty(elem))
		// 		.sort((a, b) => sortDateFilling(a, b))
		// }

		return mockData
			.filter(elem => filterPracticeType(elem))
			.filter(elem => filterDepartment(elem))
			.filter(elem => filterCourse(elem))
			.filter(elem => filterSemester(elem))
			.filter(elem => filterNameSpecialty(elem))
	}

	// useEffect(() => {
	// 	setTableData(filterDataFull())
	// }, [filter])
	

	return (
		<>
			<section className="container ">
				<Row>
					<Col flex={'auto'}>
						<span className="mb-14 text-[28px]">Практики</span>
					</Col>
					{/*Не актуально до создания на бекенде соответсвующего функционала*/}
					{/*<Col>*/}
					{/*	<Button*/}
					{/*		type="primary"*/}
					{/*		color={"none"}*/}
					{/*		className="!rounded-full scale-y-120"*/}
					{/*		onClick={() => {*/}
					{/*			practiceDocument(tokenAccess, "")*/}
					{/*		}}*/}
					{/*	>*/}
					{/*		Сформировать График Практик*/}
					{/*	</Button>*/}
					{/*</Col>*/}
					{/*<Col>*/}
					{/*	<Button*/}
					{/*		type="primary"*/}
					{/*		className="!rounded-full ml-2 scale-y-120"*/}
					{/*		onClick={() => {*/}
					{/*			practiceDocument(tokenAccess, "")*/}
					{/*		}}*/}
					{/*	>*/}
					{/*		Сформировать Представление в Приказ*/}
					{/*	</Button>*/}
					{/*</Col>*/}
					{/*<Col>*/}
					{/*	<Button*/}
					{/*		type="primary"*/}
					{/*		className="!rounded-full ml-2 scale-y-120"*/}
					{/*		onClick={() => {*/}
					{/*			practiceDocument(tokenAccess, "")*/}
					{/*		}}*/}
					{/*	>*/}
					{/*		Сформировать Приказ по практике*/}
					{/*	</Button>*/}
					{/*</Col>*/}
				</Row>

				<Row gutter={[16, 16]} className="mt-12">
					<Col span={5}>
						<span>Наименование специальности</span>
					</Col>
					<Col span={8}>
						<Select
							popupMatchSelectWidth={false}
							defaultValue="Все"
							className="w-full"
							options={nameSpecialty?.map((item)=>{
								return {
									key:item.id,
									value: item.value,
									label: item.label
								}}
							)}
							onChange={value => {
								setFilter({
									...filter,
									nameSpecialty: value
								})
							}}
						/>
					</Col>
					<Col span={7} offset={4}>
						<Space className="w-full flex-row-reverse">
							<Button
								type="primary"
								className="!rounded-full"
								onClick={() => {
									navigate('/services/practices/practical.ts/createPractical')
								}}
							>
								Добавить практику
							</Button>
						</Space>
					</Col>
				</Row>
				<Row gutter={[16, 16]} className="mt-4">
					<Col span={5}>
						<span>Кафедра</span>
					</Col>
					<Col span={8}>
						<Select
							popupMatchSelectWidth={false}
							defaultValue="Все"
							className="w-full"
							options={department}
							onChange={value => {
								setFilter({
									...filter,
									department: value
								})
							}}
						/>
					</Col>
				</Row>
				<Row gutter={[16, 16]} className="mt-4">
					<Col span={3} className={'flex items-center gap-4'}>
						<span>Курс</span>
						<Select
							popupMatchSelectWidth={false}
							defaultValue="Все"
							className="w-full"
							options={filterCourse}
							onChange={value => {
								setFilter({
									...filter,
									course: value
								})
							}}
						/>
					</Col>
					<Col span={3} className={'flex items-center gap-4'}>
						<span>Семестр</span>
						<Select
							popupMatchSelectWidth={false}
							defaultValue="Все"
							className="w-full"
							options={filterSemester}
							onChange={value => {
								setFilter({
									...filter,
									semester: value
								})
							}}
						/>
					</Col>
					<Col span={7} className={'flex items-center gap-2'}>
						<span className="whitespace-nowrap">Вид практики</span>
						<Select
							popupMatchSelectWidth={false}
							defaultValue="Все"
							className="w-full"
							options={filterType}
							onChange={value => {
								setFilter({
									...filter,
									practiceType: value
								})
							}}
						/>
					</Col>
				</Row>
			</section>
			<Table
				size="small"
				columns={columns}
				dataSource={dataPractiseAll?dataPractiseAll:[]}
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
		</>
	)
}
