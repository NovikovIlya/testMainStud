import { DeleteTwoTone, EditTwoTone, EyeTwoTone } from '@ant-design/icons'
import { ConfigProvider, Space, Table, TableProps } from 'antd'
import { t } from 'i18next'

import { EducationTableDataType } from '../../../store/reducers/type'

export const EducationsTable = () => {
	const columns: TableProps<EducationTableDataType>['columns'] = [
		{
			title: t('language'),
			dataIndex: 'language',
			key: 'language',
			render: text => <div>{text}</div>
		},
		{
			title: t('years'),
			dataIndex: 'graduateYear',
			key: 'graduateYear',
			render: (_, record) => <p>{record.beginningYear + '-' + record.graduateYear}</p>
		},
		{
			title: t('educationLevel'),
			dataIndex: 'educationLevelId',
			key: 'educationLevel'
		},
		{
			title: t('specialization'),
			dataIndex: 'specialization',
			key: 'specialization'
		},
		{
			title: t('nameEducational'),
			dataIndex: 'nameOfInstitute',
			key: 'nameOfInstitute'
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

	const data: any = [
		{
			language: 'RU',
			beginningYear: '2020',
			graduateYear: '2022',
			educationLevelId: 1,
			specialization: 'Веб-дизайн',
			nameOfInstitute: 'Казанский (Приволжский) Федеральный Университет'
		}
	]

	return (
		<>
			{' '}
			<ConfigProvider
				theme={{
					components: {
						Table: {
							headerBg: 'rgb(218, 231, 251)'
						}
					}
				}}
			>
				<Table<EducationTableDataType>
					pagination={false}
					columns={columns}
					dataSource={data}
					className="w-full"
					locale={{ emptyText: t('noData') }}
				/>
			</ConfigProvider>
		</>
	)
}
