import { DeleteTwoTone, EditTwoTone, EyeTwoTone } from '@ant-design/icons'
import { ConfigProvider, Space, Table, TableProps } from 'antd'
import { t } from 'i18next'

import { EngFlagSvg } from '../../../assets/svg/EngFlagSvg'
import { RuFlagSvg } from '../../../assets/svg/RuFlagSvg'
import { useGetEducationTypesQuery, useGetNewEducationsQuery } from '../../../store/api/serviceApi'
import { EducationTableDataType } from '../../../store/reducers/type'

export const EducationsTable = () => {
	const { data: educations = { completed_edu: [] } } = useGetNewEducationsQuery()
	const { data: levels = { edu_types: [] } } = useGetEducationTypesQuery()

	const columns: TableProps<EducationTableDataType>['columns'] = [
		{
			title: t('language'),
			dataIndex: 'language',
			key: 'language',
			render: (_, record) => (record.language_portal === 2 ? <EngFlagSvg /> : <RuFlagSvg />)
		},
		{
			title: t('years'),
			dataIndex: 'graduateYear',
			key: 'graduateYear',
			render: (_, record) => (
				<p>
					{record.start_date.substring(record.start_date.length - 4) +
						'-' +
						record.end_date.substring(record.end_date.length - 4)}
				</p>
			)
		},
		{
			title: t('educationLevel'),
			dataIndex: 'edu_level',
			key: 'educationLevel',
			render: (_, record) => <p>{levels.edu_types.find(type => type.id === record.edu_level)?.name}</p>
		},
		{
			title: t('specialization'),
			dataIndex: 'eduspeciality',
			key: 'specialization'
		},
		{
			title: t('nameEducational'),
			dataIndex: 'organization',
			key: 'nameOfInstitute'
		},

		{
			title: '',
			key: 'action',
			render: (_, record) => (
				<Space size="middle">
					<EyeTwoTone />
					<EditTwoTone />
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
		},
		{
			language: 'RU',
			beginningYear: '2016',
			graduateYear: '2020',
			educationLevelId: 1,
			specialization: 'Графический дизайн',
			nameOfInstitute: 'Казанский (Приволжский) Федеральный Университет'
		},
		{
			language: 'ENG',
			beginningYear: '2020',
			graduateYear: '2022',
			educationLevelId: 1,
			specialization: 'Web-design',
			nameOfInstitute: 'Kazan federal university'
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
				<Table<EducationTableDataType>
					pagination={false}
					columns={columns}
					dataSource={educations.completed_edu}
					className="w-full"
					locale={{ emptyText: t('noData') }}
				/>
			</ConfigProvider>
		</>
	)
}
