import {
  Col, Modal,
  Row,
  Select, Table,
  Typography
} from 'antd'

import {
  FilterType
} from '../../../../models/representation'

import { EditableCell } from './EditableCell'
import { useGetPracticesAllQuery } from '../../../../store/api/practiceApi/individualTask'

const filterSpecialization: FilterType[] = [
	{ value: 'Все', label: 'Все' },
	{ value: '1', label: '1' }
]

const PracticeModal = ({isModalOpenOne,handleOkOne,handleCancelOne,setFilter,filter,handleRowClick,tableRef, tableData}: any) => {
 
 const columnsRepresentation = [
	{
		key: 'specialtyName',
		dataIndex: 'specialtyName',
		title: 'Шифр и иаименование документа',
		name: 'Шифр и иаименование документа',
		className: 'text-xs !p-2',
		// ...getColumnSearchProps('name')
	},
	{
		key: 'academicYear',
		dataIndex: 'academicYear',
		title: 'Учебный год',
		className: 'text-xs !p-2'
	},

	{
		key: 'groupNumber',
		dataIndex: 'groupNumber',
		title: 'Номер группы',
		className: 'text-xs !p-2'
	},
	{
		key: 'level',
		dataIndex: 'level',
		title: 'Уровень образования',
		className: 'text-xs !p-2',
		editable: true
	},
	{
		key: 'course',
		dataIndex: 'courseNumber',
		title: 'Курс',
		className: 'text-xs !p-2',
		editable: true
	}

	// {
	//   title: '',
	//   key: 'action',
	//   render: (_:any, record:any) => (
	//     <Space size="middle">
	//       <Button onClick={()=>hanldeSelectedPractise(record.id)}>Выбрать </Button>
	//     </Space>
	//   ),
	// },
]
  return (
		<Modal
			footer={null}
			width={'100%'}
			title="Выберите практику"
			open={isModalOpenOne}
			onOk={handleOkOne}
			onCancel={handleCancelOne}
		>
			<Row gutter={[8, 16]} className="mt-12 w-full flex items-center">
				<Col span={4}>
					<Typography.Text>Подразделение</Typography.Text>
				</Col>
				<Col span={8}>
					<Select
						popupMatchSelectWidth={false}
						defaultValue="Все"
						className="w-full"
						options={filterSpecialization}
						onChange={value => {
							setFilter({
								...filter,
								subdivision: value
							})
						}}
					/>
				</Col>
			</Row>
			<Row gutter={[8, 16]} className="mt-4 w-full flex items-center">
				<Col span={4}>
					<Typography.Text>Шифр и наимеование документа</Typography.Text>
				</Col>
				<Col span={8}>
					<Select
						showSearch
						optionFilterProp="label"
						filterSort={(optionA, optionB) =>
							(optionA?.label ?? '')
								.toLowerCase()
								.localeCompare((optionB?.label ?? '').toLowerCase())
						}
						popupMatchSelectWidth={false}
						defaultValue="Все"
						className="w-full"
						options={filterSpecialization}
						onChange={value => {
							setFilter({
								...filter,
								specialtyName: value
							})
						}}
					/>
				</Col>
			</Row>

			<Row gutter={[8, 16]} className="mt-4 w-full flex items-center">
				<Col span={4}>
					<Typography.Text>Учебный год</Typography.Text>
				</Col>
				<Col span={8}>
					<Select
						popupMatchSelectWidth={false}
						defaultValue="Все"
						className="w-full"
						options={filterSpecialization}
						onChange={value => {
							setFilter({
								...filter,
								academicYear: value
							})
						}}
					/>
				</Col>
			</Row>
			<Row gutter={[8, 16]} className="mt-4 w-full flex items-center">
				<Col span={4}>
					<Typography.Text>Номер группы</Typography.Text>
				</Col>
				<Col span={8}>
					<Select
						popupMatchSelectWidth={false}
						defaultValue="Все"
						className="w-full"
						options={filterSpecialization}
						onChange={value => {
							setFilter({
								...filter,
								groupNumber: value
							})
						}}
					/>
				</Col>
			</Row>
			<Row gutter={[8, 16]} className="mt-4  w-full flex items-center">
				<Col span={4}>
					<Typography.Text>Уровень образования</Typography.Text>
				</Col>
				<Col span={8}>
					<Select
						popupMatchSelectWidth={false}
						defaultValue="Все"
						className="w-full"
						options={filterSpecialization}
						onChange={value => {
							setFilter({
								...filter,
								level: value
							})
						}}
					/>
				</Col>
			</Row>
			<Row gutter={[8, 16]} className="mt-4 mb-12 w-full flex items-center">
				<Col span={4}>
					<Typography.Text>Курс</Typography.Text>
				</Col>
				<Col span={8}>
					<Select
						popupMatchSelectWidth={false}
						defaultValue="Все"
						className="w-full"
						options={filterSpecialization}
						onChange={value => {
							setFilter({
								...filter,
								courseNumber: value
							})
						}}
					/>
				</Col>
			</Row>

			<Table
				onRow={record => ({
					onClick: () => handleRowClick(record)
				})}
				ref={tableRef}
				components={{
					body: {
						cell: EditableCell
					}
				}}
				bordered
				dataSource={tableData}
				columns={columnsRepresentation}
				rowClassName="editable-row"
				pagination={false}
				rowKey="id"
			/>
		</Modal>
	)
}

export default PracticeModal
