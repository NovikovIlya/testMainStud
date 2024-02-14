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
import React from 'react'
import { useNavigate } from 'react-router-dom'

import { DownloadSvg } from '../../../../assets/svg/DownloadSvg'
import { PrinterSvg } from '../../../../assets/svg/PrinterSvg'

interface DataType {
	key: string
	cipher: string
	type: string
	department: string
	groupNumber: string
	term: string
	academicYear: string
	course: string
	practicePeriod: string
	numberHoursPractice: string
	individualTasks: string[]
	codeNameCompetence: string[]
	headDepartment: string
}
const data: DataType[] = [
	{
		key: '1',
		cipher: '31.08.01 Акушерствои гинекология',
		type: 'Производственная (клиническая) практика: акушерство и гинекология',
		department: 'Кафедра хирургических болезней постдипломного образования',
		groupNumber: '10.4-134',
		term: '2',
		academicYear: '2022/2023',
		course: '1',
		practicePeriod: '30.03.2023 - 10.04.2023',
		numberHoursPractice: '120',
		individualTasks: [
			'Овладеть методиками кесарева сечения (корпоральное, истмико-корпоральное, в нижнем сегменте матки, экстракорпоральное;',
			'Овладеть методиками родоразрешающих и плодоразрушающих операций',
			'Акушерский травматизм матери и плода'
		],
		codeNameCompetence: [
			'ПК-2 Овладеть методиками кесарева сечения (корпоральное, истмико-корпоральное, в нижнем сегменте матки, экстракорпоральное;',
			'ПК-6 Овладеть методиками родоразрешающих и плодоразрушающих операций',
			'ПК-7 Акушерский травматизм матери и плода'
		],
		headDepartment: 'Бурмистров М. В.'
	},
	{
		key: '2',
		cipher: '31.08.01 Акушерствои гинекология',
		type: 'Производственная (клиническая) практика: акушерство и гинекология',
		department: 'Кафедра хирургических болезней постдипломного образования',
		groupNumber: '10.4-134',
		term: '2',
		academicYear: '2022/2023',
		course: '1',
		practicePeriod: '30.03.2023 - 10.04.2023',
		numberHoursPractice: '120',
		individualTasks: [
			'Овладеть методиками кесарева сечения (корпоральное, истмико-корпоральное, в нижнем сегменте матки, экстракорпоральное;',
			'Овладеть методиками родоразрешающих и плодоразрушающих операций',
			'Акушерский травматизм матери и плода'
		],
		codeNameCompetence: [
			'ПК-2 Овладеть методиками кесарева сечения (корпоральное, истмико-корпоральное, в нижнем сегменте матки, экстракорпоральное;',
			'ПК-6 Овладеть методиками родоразрешающих и плодоразрушающих операций',
			'ПК-7 Акушерский травматизм матери и плода'
		],
		headDepartment: 'Бурмистров М. В.'
	},
	{
		key: '3',
		cipher: '31.08.01 Акушерствои гинекология',
		type: 'Производственная (клиническая) практика: акушерство и гинекология',
		department: 'Кафедра хирургических болезней постдипломного образования',
		groupNumber: '10.4-134',
		term: '2',
		academicYear: '2022/2023',
		course: '1',
		practicePeriod: '30.03.2023 - 10.04.2023',
		numberHoursPractice: '120',
		individualTasks: [
			'Овладеть методиками кесарева сечения (корпоральное, истмико-корпоральное, в нижнем сегменте матки, экстракорпоральное;',
			'Овладеть методиками родоразрешающих и плодоразрушающих операций',
			'Акушерский травматизм матери и плода'
		],
		codeNameCompetence: [
			'ПК-2 Овладеть методиками кесарева сечения (корпоральное, истмико-корпоральное, в нижнем сегменте матки, экстракорпоральное;',
			'ПК-6 Овладеть методиками родоразрешающих и плодоразрушающих операций',
			'ПК-7 Акушерский травматизм матери и плода'
		],
		headDepartment: 'Бурмистров М. В.'
	},
	{
		key: '4',
		cipher: '31.08.01 Акушерствои гинекология',
		type: 'Производственная (клиническая) практика: акушерство и гинекология',
		department: 'Кафедра хирургических болезней постдипломного образования',
		groupNumber: '10.4-134',
		term: '2',
		academicYear: '2022/2023',
		course: '1',
		practicePeriod: '30.03.2023 - 10.04.2023',
		numberHoursPractice: '120',
		individualTasks: [
			'Овладеть методиками кесарева сечения (корпоральное, истмико-корпоральное, в нижнем сегменте матки, экстракорпоральное;',
			'Овладеть методиками родоразрешающих и плодоразрушающих операций',
			'Акушерский травматизм матери и плода'
		],
		codeNameCompetence: [
			'ПК-2 Овладеть методиками кесарева сечения (корпоральное, истмико-корпоральное, в нижнем сегменте матки, экстракорпоральное;',
			'ПК-6 Овладеть методиками родоразрешающих и плодоразрушающих операций',
			'ПК-7 Акушерский травматизм матери и плода'
		],
		headDepartment: 'Бурмистров М. В.'
	}
]

const columns: TableProps<DataType>['columns'] = [
	{
		key: 'cipher',
		dataIndex: 'cipher',
		title: 'Шифр и наименование специальности',
		className: 'text-xs !p-2'
	},
	{
		key: 'type',
		dataIndex: 'type',
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
		key: 'term',
		dataIndex: 'term',
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
		key: 'course',
		dataIndex: 'course',
		title: 'Курс',
		align: 'center',
		className: 'text-xs !p-2'
	},
	{
		key: 'practicePeriod',
		dataIndex: 'practicePeriod',
		title: 'Период практики',
		align: 'center',
		className: 'text-xs !p-2'
	},
	{
		key: 'numberHoursPractice',
		dataIndex: 'numberHoursPractice',
		title: 'Кол-во часов по практике',
		align: 'center',
		className: 'text-xs !p-2'
	},
	{
		key: 'individualTasks',
		dataIndex: 'individualTasks',
		title: 'Индивидуальные задания',
		render(value, _, index) {
			return (
				<ol className="list-inside gap-2 flex flex-col">
					{value.map((text: string) => (
						<li key={index}>{text}</li>
					))}
				</ol>
			)
		},
		className: 'text-xs !p-2'
	},
	{
		key: 'codeNameCompetence',
		dataIndex: 'codeNameCompetence',
		title: 'Код и наименование компетенции',
		render(value) {
			return (
				<ol className="list-inside gap-2 flex flex-col text-xs">
					{value.map((text: string, index: number) => (
						<li key={index}>{text}</li>
					))}
				</ol>
			)
		},
		className: 'text-xs !p-2'
	},
	{
		key: 'headDepartment',
		dataIndex: 'headDepartment',
		title: 'Заведующий опорной кафедрой ',
		className: 'text-xs !p-2'
	}
]

export const ViewPractical = () => {
	const navigate = useNavigate()
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
						<Typography.Text>Сортировка</Typography.Text>
					</Col>
					<Col span={8}>
						<Select
							popupMatchSelectWidth={false}
							defaultValue="1"
							className="w-full"
							options={[{ value: '1', label: 'Все' }]}
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
						<Typography.Text>Наименование специальности</Typography.Text>
					</Col>
					<Col span={8}>
						<Select
							popupMatchSelectWidth={false}
							defaultValue="1"
							className="w-full"
							options={[
								{ value: '1', label: '31.08.01 Акушерство и гинекология' }
							]}
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
					<Col span={5}>
						<Typography.Text>Кафедра</Typography.Text>
					</Col>
					<Col span={8}>
						<Select
							popupMatchSelectWidth={false}
							defaultValue="1"
							className="w-full"
							options={[
								{
									value: '1',
									label:
										'Кафедра хирургических болезней постдипломного образования'
								}
							]}
						/>
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
							defaultValue="1"
							className="w-full"
							options={[
								{
									value: '1',
									label: '1'
								}
							]}
						/>
					</Col>
					<Col span={2}>
						<Typography.Text>Семестр</Typography.Text>
					</Col>
					<Col span={2}>
						<Select
							popupMatchSelectWidth={false}
							defaultValue="1"
							className="w-full"
							options={[
								{
									value: '2',
									label: '2'
								}
							]}
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
							defaultValue="1"
							className="w-full"
							options={[
								{
									value: '1',
									label: 'Производственная'
								}
							]}
						/>
					</Col>
				</Row>
			</section>
			<Table
				size="small"
				columns={columns}
				dataSource={data}
				bordered
				pagination={false}
				className="my-10"
			/>
		</>
	)
}
