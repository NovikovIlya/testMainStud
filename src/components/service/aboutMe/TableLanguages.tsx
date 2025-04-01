import { DeleteTwoTone, EditTwoTone, EyeTwoTone } from '@ant-design/icons'
import { Button, ConfigProvider, Row, Space, Table, Tag } from 'antd'
import type { TableProps } from 'antd'
import React from 'react'

interface DataType {
	key: string
	name: string
	age: number
	address: string
	tags: string[]
}





const TableLanguages = ({dataForeign}:any) => {
	const columns: TableProps<DataType>['columns'] = [
		{
			title: 'Язык',
			dataIndex: 'language',
			key: 'name',
			render: text => <a>{text}</a>
		},
		{
			title: 'Уровень владения',
			dataIndex: 'language_level',
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

	const data:any = [
		{
			key: '1',
			name: 'John Brown',
			age: 32,
			address: 'New York No. 1 Lake Park'
	
		},
		{
			key: '2',
			name: 'Jim Green',
			age: 42,
			address: 'London No. 1 Lake Park',
		
		},
		{
			key: '3',
			name: 'Joe Black',
			age: 32,
			address: 'Sydney No. 1 Lake Park',
			tags: ['cool', 'teacher']
		}
	]

	return (
		<>
			<ConfigProvider
				theme={{
					components: {
						Table: {
							headerBg: 'rgb(218, 231, 251)'
						}
					}
				}}
			>
				<Table<DataType> pagination={false} columns={columns} dataSource={dataForeign} className="w-full" />
			</ConfigProvider>
		</>
	)
}

export default TableLanguages
