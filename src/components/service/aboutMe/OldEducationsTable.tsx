import { ConfigProvider, Table, TableProps } from 'antd'
import { t } from 'i18next'

import { useGetOldEducationsQuery } from '../../../store/api/serviceApi'
import { OldEducationTableDataType } from '../../../store/reducers/type'

export const OldEducationsTable = () => {
	const { data: oldEducations = { previous: [] }, isFetching } = useGetOldEducationsQuery()

	const columns: TableProps<OldEducationTableDataType>['columns'] = [
		{
			title: t('educationLevel'),
			dataIndex: 'GRADE',
			key: 'educationLevel'
		},
		{
			title: t('City'),
			dataIndex: 'INSTITUTION_PLACE',
			key: 'city'
		},
		{
			title: t('nameEducational'),
			dataIndex: 'INSTITUTION_NAME',
			key: 'nameOfInstitute'
		},
		{
			title: t('graduateYear'),
			dataIndex: 'INSTITUTION_YEAR',
			key: 'graduateYear'
		},
		{
			title: t('medal'),
			dataIndex: 'MEDAL',
			key: 'medal'
		}
	]

	const data: any = [
		{
			INSTITUTION_YEAR: '2020',
			GRADE: '1',
			INSTITUTION_NAME: 'СУНЦ IT-лицей КФУ',
			INSTITUTION_PLACE: 'Казань',
			MEDAL: '-'
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
					dataSource={oldEducations.previous}
					loading={isFetching}
					className="w-full"
					locale={{ emptyText: t('noData') }}
				/>
			</ConfigProvider>
		</>
	)
}
