import {
	DeleteOutlined,
	EditOutlined,
	PrinterOutlined,
	SearchOutlined
} from '@ant-design/icons'
import {
	Button,
	Col,
	GetRef,
	Input,
	Row,
	Select,
	Space,
	Table,
	TableColumnType,
	TableColumnsType,
	Typography
} from 'antd'
import type { FilterDropdownProps } from 'antd/es/table/interface'
import { useRef, useState } from 'react'
import Highlighter from 'react-highlight-words'
import { useNavigate } from 'react-router-dom'

import { DownloadSvg } from '../../../../assets/svg/DownloadSvg'
import { PrinterSvg } from '../../../../assets/svg/PrinterSvg'

type InputRef = GetRef<typeof Input>

interface DataType {
	key: string
	name: string
	type: string
	tasks: string[]
}

type DataIndex = keyof DataType

const data: DataType[] = [
	{
		key: '1',
		name: '31.08.01 Акушерство и гинекология',
		type: 'Производственная (клиническая) практика: акушерство и гинекология',
		tasks: [
			'Овладеть методиками кесарева сечения (корпоральное, истмико-корпоральное, в нижнем сегменте матки, экстракорпоральное;',
			'Овладеть методиками родоразрешающих и плодоразрушающих операций',
			'Акушерский травматизм матери и плода'
		]
	},
	{
		key: '2',
		name: '31.08.01 Акушерство и гинекология',
		type: 'Производственная (клиническая) практика: тест и тест',
		tasks: [
			'Овладеть методиками кесарева сечения (корпоральное, истмико-корпоральное, в нижнем сегменте матки, экстракорпоральное;',
			'Овладеть методиками родоразрешающих и плодоразрушающих операций',
			'Акушерский травматизм матери и плода'
		]
	},
	{
		key: '3',
		name: '31.08.02 Акушерство и гинекология',
		type: 'Производственная (клиническая) практика: тест и тест',
		tasks: [
			'Овладеть методиками кесарева сечения (корпоральное, истмико-корпоральное, в нижнем сегменте матки, экстракорпоральное;',
			'Овладеть методиками родоразрешающих и плодоразрушающих операций',
			'Акушерский травматизм матери и плода'
		]
	},
	{
		key: '4',
		name: '31.08.02 Акушерство и гинекология',
		type: 'Производственная (клиническая) практика: акушерство и гинекология',
		tasks: [
			'Овладеть методиками кесарева сечения (корпоральное, истмико-корпоральное, в нижнем сегменте матки, экстракорпоральное;',
			'Овладеть методиками родоразрешающих и плодоразрушающих операций',
			'Акушерский травматизм матери и плода'
		]
	}
]

const IndividualTasks = () => {
	const [searchText, setSearchText] = useState('')
	const [searchedColumn, setSearchedColumn] = useState('')
	const searchInput = useRef<InputRef>(null)

	const handleSearch = (
		selectedKeys: string[],
		confirm: FilterDropdownProps['confirm'],
		dataIndex: DataIndex
	) => {
		confirm()
		setSearchText(selectedKeys[0])
		setSearchedColumn(dataIndex)
	}

	const handleReset = (clearFilters: () => void) => {
		clearFilters()
		setSearchText('')
	}

	const getColumnSearchProps = (
		dataIndex: DataIndex
	): TableColumnType<DataType> => ({
		filterDropdown: ({
			setSelectedKeys,
			selectedKeys,
			confirm,
			clearFilters,
			close
		}) => (
			<div style={{ padding: 8 }} onKeyDown={e => e.stopPropagation()}>
				<Input
					ref={searchInput}
					placeholder={`Search ${dataIndex}`}
					value={selectedKeys[0]}
					onChange={e =>
						setSelectedKeys(e.target.value ? [e.target.value] : [])
					}
					onPressEnter={() =>
						handleSearch(selectedKeys as string[], confirm, dataIndex)
					}
					style={{ marginBottom: 8, display: 'block' }}
				/>
				<Space>
					<Button
						type="primary"
						onClick={() =>
							handleSearch(selectedKeys as string[], confirm, dataIndex)
						}
						icon={<SearchOutlined />}
						size="small"
						style={{ width: 90 }}
					>
						Search
					</Button>
					<Button
						onClick={() => clearFilters && handleReset(clearFilters)}
						size="small"
						style={{ width: 90 }}
					>
						Reset
					</Button>
					<Button
						type="link"
						size="small"
						onClick={() => {
							close()
						}}
					>
						close
					</Button>
				</Space>
			</div>
		),
		filterIcon: (filtered: boolean) => (
			<SearchOutlined
				className="h-5 w-5 flex items-center justify-center"
				style={{ color: filtered ? '#1677ff' : undefined }}
			/>
		),
		onFilter: (value, record) =>
			record[dataIndex]
				.toString()
				.toLowerCase()
				.includes((value as string).toLowerCase()),
		onFilterDropdownOpenChange: visible => {
			if (visible) {
				//@ts-ignore
				setTimeout(() => searchInput.current?.select(), 100)
			}
		},
		render: tasks => {
			return searchedColumn === dataIndex ? (
				<ol className="list-inside gap-2 flex flex-col">
					{tasks.map?.((task: string, index: number) => (
						<li key={index}>
							{
								<Highlighter
									highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
									searchWords={[searchText]}
									autoEscape
									textToHighlight={task ? task.toString() : ''}
								/>
							}
						</li>
					))}
				</ol>
			) : (
				<ol className="list-inside gap-2 flex flex-col">
					{tasks.map?.((task: string, index: number) => (
						<li key={index}>{task}</li>
					))}
				</ol>
			)
		}
	})

	const columns: TableColumnsType<DataType> = [
		{
			title: 'Шифр и наименование специальности',
			dataIndex: 'name',
			key: 'name',
			width: '20%',
			render: text => <span className="font-bold">{text}</span>,
			filters: [
				{
					text: '31.08.01',
					value: '31.08.01'
				},
				{
					text: '31.08.02',
					value: '31.08.02'
				}
			],
			filterSearch: true,
			//@ts-ignore
			onFilter: (value: string, record) => record.name.includes(value),
			sorter: (a, b) => a.name.length - b.name.length
		},
		{
			title: 'Тип практики',
			dataIndex: 'type',
			key: 'type',
			width: '20%',
			filters: [
				{
					text: 'Производственная (клиническая) практика: акушерство и гинекология',
					value:
						'Производственная (клиническая) практика: акушерство и гинекология'
				},
				{
					text: 'Производственная (клиническая) практика: тест и тест',
					value: 'Производственная (клиническая) практика: тест и тест'
				}
			],
			filterSearch: true,
			//@ts-ignore
			onFilter: (value: string, record) => record.type.includes(value),
			sorter: (a, b) => a.type.length - b.type.length
		},
		{
			title: 'Индивидуальные задания',
			dataIndex: 'tasks',
			key: 'tasks',
			...getColumnSearchProps('tasks')
		},
		{
			title: '',
			dataIndex: '',
			key: 'x',
			render: _ => (
				<Space size="middle">
					<Button type="default" icon={<EditOutlined />} />
					<Button type="link" icon={<PrinterOutlined />} />
					<Button type="default" icon={<DeleteOutlined />} danger />
				</Space>
			)
		}
	]
	const navigate = useNavigate()
	return (
		<section className="container">
			<Row>
				<Col flex={'auto'}>
					<Typography.Text className="mb-14 text-[28px]">
						Индивидуальные задания
					</Typography.Text>
				</Col>
			</Row>
			<Row gutter={[16, 16]} className="mt-12">
				<Col span={5}>
					<Typography.Text>Сортировка</Typography.Text>
				</Col>
				<Col span={7}>
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
								navigate('/services/practices/individualTasks/createTask')
							}}
						>
							Добавить индивидуальные задания
						</Button>
					</Space>
				</Col>
			</Row>
			<Row gutter={[16, 16]} className="mt-4">
				<Col span={5}>
					<Typography.Text>Наименование специальности</Typography.Text>
				</Col>
				<Col span={7}>
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
			<Table
				locale={{
					triggerDesc: 'descend sort text',
					triggerAsc: 'ascend sort text',
					cancelSort: 'cancel sort text'
				}}
				bordered
				columns={columns}
				dataSource={data}
				className="my-8"
				pagination={false}
			/>
		</section>
	)
}

export default IndividualTasks
