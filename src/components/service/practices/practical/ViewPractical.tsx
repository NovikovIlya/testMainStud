import {
	Button,
	Col,
	Row,
	Select,
	Space,
	Table,
	TableProps,
	Typography
} from 'antd'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { DownloadSvg } from '../../../../assets/svg/DownloadSvg'
import { PrinterSvg } from '../../../../assets/svg/PrinterSvg'
import {
	useGetPracticesQuery,
	useGetTaskQuery,
	useLazyGetTaskQuery
} from '../../../../store/api/practiceApi/taskService'
import { IPracticeInfoFull, IPracticesResponse } from '../../../../models/Practice'

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

const uniqueId = (length = 16) => {
	return parseInt(
		Math.ceil(Math.random() * Date.now())
			.toPrecision(length)
			.toString()
			.replace('.', '')
	)
}

const columns: TableProps<IPracticeInfoFull>['columns'] = [
	{
		key: 'specialtyName',
		dataIndex: 'specialtyName',
		title: 'Шифр и наименование специальности',
		className: 'text-xs !p-2'
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
		key: 'practiceStartDate',
		dataIndex: 'practiceStartDate',
		title: 'Период практики',
		align: 'center',
		className: 'text-xs !p-2'
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
		className: 'text-xs !p-2'
	},
	{
		key: 'competence',
		dataIndex: 'competence',
		title: 'Код и наименование компетенции',
		className: 'text-xs !p-2'
	},
	{
		key: 'departmentDirector',
		dataIndex: 'departmentDirector',
		title: 'Заведующий опорной кафедрой',
		className: 'text-xs !p-2'
	}
]

export const ViewPractical = () => {
	const [sort, setSort] = useState<string>('')
	const { data } = useGetPracticesQuery({
		page: 0,
		size: 10,
		sort: sort || sort
	})
	const navigate = useNavigate()

	const [dataFilter, setDataFilter] = useState<any>([])

	const [filters, setFilters] = useState<{
		type: string
		spec: string
		course: string
		semestr: string
		department: string
	}>({ type: '', spec: '', course: '', semestr: '', department: '' })

	useEffect(() => {
		if (data) {
			setDataFilter(data?.content)
		}
	}, [data])

	useEffect(() => {
		if (filters) {
			setDataFilter(
				data?.content?.filter(
					(x: any) =>
						x.practiceType.includes(filters.type) &&
						x.specialtyName.includes(filters.spec) &&
						x.courseStudy.toString().includes(filters.course) &&
						x.semester.toString().includes(filters.semestr) &&
						x.department.includes(filters.department)
				)
			)
		}
	}, [filters])

	const filter = (value: string, index: string) => {
		setFilters(prev => ({ ...prev, [index]: value }))
	}

	return (
		<>
			<section className="container ">
				<Row>
					<Col flex={'auto'}>
						<Typography.Text className="mb-14 text-[28px]">
							Практики
						</Typography.Text>
					</Col>
				</Row>
				<Row gutter={[16, 16]} className="mt-12">
					<Col span={5}>
						<Typography.Text>Наименование специальности</Typography.Text>
					</Col>
					<Col span={8}>
						<Select
							popupMatchSelectWidth={false}
							defaultValue=""
							className="w-full"
							options={filterSpecialization}
							onChange={value => filter(value, 'spec')}
						/>
					</Col>
					<Col flex={'auto'} />
					<Col span={7}>
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
						<Typography.Text>Кафедра</Typography.Text>
					</Col>
					<Col span={8}>
						<Select
							popupMatchSelectWidth={false}
							defaultValue=""
							className="w-full"
							options={filterDepartment}
							onChange={value => filter(value, 'department')}
						/>
					</Col>
					<Col flex={'auto'} />
					<Col span={5}>
						<Space className="w-full flex justify-end">
							<Button
								type="text"
								icon={<DownloadSvg />}
								className="flex items-center"
							>
								Скачать
							</Button>
							<Button
								type="text"
								icon={<PrinterSvg />}
								className="flex items-center"
							>
								Печать
							</Button>
						</Space>
					</Col>
				</Row>
				<Row gutter={[16, 16]} className="mt-4">
					<Col span={1}>
						<Typography.Text className="whitespace-nowrap">
							Курс
						</Typography.Text>
					</Col>
					<Col span={2}>
						<Select
							popupMatchSelectWidth={false}
							defaultValue=""
							className="w-full"
							options={filterCourse}
							onChange={value => filter(value, 'course')}
						/>
					</Col>
					<Col span={2}>
						<Typography.Text>Семестр</Typography.Text>
					</Col>
					<Col span={2}>
						<Select
							popupMatchSelectWidth={false}
							defaultValue=""
							className="w-full"
							options={filterSemestr}
							onChange={value => filter(value, 'semestr')}
						/>
					</Col>
					<Col span={2}>
						<Typography.Text className="whitespace-nowrap">
							Вид практики
						</Typography.Text>
					</Col>
					<Col span={4}>
						<Select
							popupMatchSelectWidth={false}
							defaultValue=""
							className="w-full"
							options={filterType}
							onChange={value => filter(value, 'type')}
						/>
					</Col>
				</Row>
			</section>
			<Table
				size="small"
				columns={columns}
				dataSource={dataFilter && dataFilter}
				pagination={false}
				className="my-10"
			/>
		</>
	)
}
