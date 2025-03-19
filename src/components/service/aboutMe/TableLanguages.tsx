import { DeleteTwoTone, EditTwoTone, EyeTwoTone } from '@ant-design/icons'
import { Button, Row, Space, Table, Tag } from 'antd'
import type { TableProps } from 'antd'
import React from 'react'

interface DataType {
	key: string
	name: string
	age: number
	address: string
	tags: string[]
}

const columns: TableProps<DataType>['columns'] = [
	{
		title: 'Язык',
		dataIndex: 'name',
		key: 'name',
		render: text => <a>{text}</a>
	},
	{
		title: 'Уровень владения',
		dataIndex: 'age',
		key: 'age'
	},
	{
		title: 'Языковой сертификат',
		dataIndex: 'address',
		key: 'address'
	},

	{
		title: '',
		key: 'action',
		render: (_, record) => (
			<Space size="middle">
				<EyeTwoTone />
			</Space>
		)
	},
	{
		title: '',
		key: 'action',
		render: (_, record) => (
			<Space size="middle">
				<EditTwoTone />
			</Space>
		)
	},
	{
		title: '',
		key: 'action',
		render: (_, record) => (
			<Space size="middle">
				<DeleteTwoTone />
			</Space>
		)
	}
]

const data: DataType[] = [
	{
		key: '1',
		name: 'John Brown',
		age: 32,
		address: 'New York No. 1 Lake Park',
		tags: ['nice', 'developer']
	},
	{
		key: '2',
		name: 'Jim Green',
		age: 42,
		address: 'London No. 1 Lake Park',
		tags: ['loser']
	},
	{
		key: '3',
		name: 'Joe Black',
		age: 32,
		address: 'Sydney No. 1 Lake Park',
		tags: ['cool', 'teacher']
	}
]

const TableLanguages: React.FC = () => {
	
	return (
		<>
			<Table<DataType>
			 pagination={false} columns={columns} dataSource={data} 
			 className='w-full'
			 />
			
		</>
	)
}

export default TableLanguages
