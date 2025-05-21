import { DeleteTwoTone, EditTwoTone, EyeTwoTone } from '@ant-design/icons'
import { ConfigProvider, Form, Popconfirm, Space, Table, TableProps } from 'antd'
import en_US from 'antd/locale/en_US'
import ru_RU from 'antd/locale/ru_RU'
import dayjs from 'dayjs'
import i18next, { t } from 'i18next'
import { useState } from 'react'

import { AwardType } from '../../../store/reducers/type'

import { AddAwardModal } from './AddAwardModal'
import { AddEducationModal } from './AddEducationModal'

export const AwardsTable = () => {
	const [form] = Form.useForm()
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

	const columns: TableProps<AwardType>['columns'] = [
		{
			title: t('awardName'),
			dataIndex: 'awardName',
			key: 'awardName'
		},
		{
			title: t('awardDate'),
			dataIndex: 'awardDate',
			key: 'awardDate'
		},
		{
			title: t('awardDocumentNumber'),
			dataIndex: 'awardDocumentNumber',
			key: 'awardDocumentNumber'
		},
		{
			title: '',
			key: 'action',
			render: (_, record) => (
				<Space size="middle">
					<EyeTwoTone />
					<EditTwoTone
						onClick={() => {
							// form.setFieldsValue({
							// 	id: record.id,
							// 	s_id: record.s_id,
							// 	e_id: record.e_id,
							// 	user_allid: record.user_allid,
							// 	language: record.language_portal ? record.language_portal : 1,
							// 	nameOfInstitute: record.organization,
							// 	educationLevelId: record.edu_level,
							// 	beginningYear: dayjs(record.start_date, 'DD.MM.YYYY'),
							// 	graduateYear: dayjs(record.end_date, 'DD.MM.YYYY'),
							// 	countryId: record.edu_country,
							// 	specialization: record.eduspeciality,
							// 	subdivision: record.development,
							// 	qualification: record.qualification,
							// 	issueDate: record.issue_date ? dayjs(record.issue_date, 'DD.MM.YYYY') : null,
							// 	number: record.docnum,
							// 	series: record.docseries,
							// 	accept: record.portal_status ? true : false
							// })
							setIsModalOpen(true)
						}}
					/>
					<ConfigProvider locale={i18next.language === 'ru' ? ru_RU : en_US}>
						<Popconfirm
							title={t('deleteEducationTitle')}
							description={t('deleteEducationDescription')}
							onConfirm={() => {}}
						>
							<DeleteTwoTone />
						</Popconfirm>
					</ConfigProvider>
				</Space>
			)
		}
	]

	const data: AwardType[] = [
		{
			awardName: 'Премия им. Габдуллы Тукая',
			awardDate: '26.04.2014',
			awardDocumentNumber: '123456'
		},
		{
			awardName: 'Народный художник Республики Татарстан',
			awardDate: '08.10.2020',
			awardDocumentNumber: '333333'
		}
	]

	return (
		<>
			{' '}
			<AddAwardModal
				type="UPDATE"
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
				<Table<AwardType>
					pagination={false}
					columns={columns}
					dataSource={data}
					className="w-full"
					locale={{ emptyText: t('noData') }}
					// loading={loading}
				/>
			</ConfigProvider>
		</>
	)
}
