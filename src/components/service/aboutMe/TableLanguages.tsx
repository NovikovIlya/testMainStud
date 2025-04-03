import { DeleteTwoTone, EditTwoTone, EyeTwoTone } from '@ant-design/icons'
import { Button, ConfigProvider, Row, Space, Table, Tag } from 'antd'
import type { TableProps } from 'antd'
import { t } from 'i18next'
import React from 'react'
import { truncateString } from '../../../utils/truncateString'

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
			render: text => <div>{text}</div>
		},
		{
			title: 'Уровень владения',
			dataIndex: 'languageLevel',
			key: 'age'
		},
		{
			title: 'Языковой сертификат',
			dataIndex: 'certificates',
			key: 'address',
			render: (certificates) => (
			  <>
				{certificates?.map((item:any, index:any) => (
				  <div key={index}>
					<a target="_blank" href={item.certificateLink} rel="noopener noreferrer">
					  {item.certificateName} {index===certificates.length-1 ? '' : ', '}
					</a>
				  </div>
				))}
			  </>
			),
		  
		  
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
				<Table<DataType> 
					pagination={false} 
					columns={columns} 
					dataSource={dataForeign} 
					className="w-full" 
					locale={{ emptyText: t('noData') }}
				/>
			</ConfigProvider>
		</>
	)
}

export default TableLanguages
