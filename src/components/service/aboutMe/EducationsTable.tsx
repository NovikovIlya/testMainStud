import { DeleteTwoTone, EditTwoTone, EyeTwoTone } from '@ant-design/icons'
import { ConfigProvider, Form, Space, Table, TableProps } from 'antd'
import dayjs from 'dayjs'
import { t } from 'i18next'
import { useState } from 'react'

import { EngFlagSvg } from '../../../assets/svg/EngFlagSvg'
import { RuFlagSvg } from '../../../assets/svg/RuFlagSvg'
import { useGetEducationTypesQuery, useGetNewEducationsQuery } from '../../../store/api/serviceApi'
import { EducationTableDataType } from '../../../store/reducers/type'

import { AddEducationModal } from './AddEducationModal'

export const EducationsTable = () => {
	const { data: educations = { completed_edu: [] }, isLoading: loading } = useGetNewEducationsQuery()
	const { data: levels = { edu_types: [] } } = useGetEducationTypesQuery()
	const [form] = Form.useForm()
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

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
					<EditTwoTone
						onClick={() => {
							form.setFieldsValue({
								language: record.language_portal ? record.language_portal : 1,
								nameOfInstitute: record.organization,
								educationLevelId: record.edu_level,
								beginningYear: dayjs(record.start_date),
								graduateYear: dayjs(record.end_date),
								countryId: record.edu_country,
								specialization: record.eduspeciality,
								subdivision: record.development,
								qualification: record.qualification,
								issueDate: record.issue_date ? dayjs(record.issue_date) : null,
								number: record.docnum,
								series: record.docseries,
								accept: record.portal_status ? true : false
							})
							setIsModalOpen(true)
						}}
					/>
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
			<AddEducationModal
				form={form}
				open={isModalOpen}
				onCancel={() => {
					setIsModalOpen(false)
				}}
			/>
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
					loading={loading}
				/>
			</ConfigProvider>
		</>
	)
}
