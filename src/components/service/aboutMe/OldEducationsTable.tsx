import { ConfigProvider, Table, TableProps } from 'antd'
import { t } from 'i18next'

import { OldEducationTableDataType } from '../../../store/reducers/type'

export const OldEducationsTable = () => {
	const columns: TableProps<OldEducationTableDataType>['columns'] = [
		{
			title: t('educationLevel'),
			dataIndex: 'educationLevelId',
			key: 'educationLevel'
		},
		{
			title: t('City'),
			dataIndex: 'city',
			key: 'city'
		},
		{
			title: t('nameEducational'),
			dataIndex: 'nameOfInstitute',
			key: 'nameOfInstitute'
		},
		{
			title: t('graduateYear'),
			dataIndex: 'graduateYear',
			key: 'graduateYear'
		},
		{
			title: t('medal'),
			dataIndex: 'medal',
			key: 'medal'
		}
	]

	const data: any = [
		{
			graduateYear: '2020',
			educationLevelId: 1,
			nameOfInstitute: 'СУНЦ IT-лицей КФУ',
			city: 'Казань',
			medal: '-'
		}
	]

	return (
		<>
			{' '}
			<ConfigProvider
				theme={{
					components: {
						Table: {
							headerBg: 'rgb(245, 248, 251)',
							cellPaddingInline: 40
						}
					}
				}}
			>
				<Table<OldEducationTableDataType>
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
