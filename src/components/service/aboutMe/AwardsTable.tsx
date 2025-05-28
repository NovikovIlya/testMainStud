import { DeleteTwoTone, EditTwoTone, EyeTwoTone } from '@ant-design/icons'
import { ConfigProvider, Form, Popconfirm, Space, Table, TableProps } from 'antd'
import en_US from 'antd/locale/en_US'
import ru_RU from 'antd/locale/ru_RU'
import dayjs from 'dayjs'
import i18next, { t } from 'i18next'
import { useState } from 'react'
import uuid from 'react-uuid'

import { useDeleteNewAwardMutation, useGetAwardsQuery } from '../../../store/api/serviceApi'
import { AwardType } from '../../../store/reducers/type'

import { AddAwardModal } from './AddAwardModal'
import { AddEducationModal } from './AddEducationModal'

export const AwardsTable = () => {
	const [form] = Form.useForm()
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
	const [deleteAward] = useDeleteNewAwardMutation()

	const { data: awards } = useGetAwardsQuery()

	const columns: TableProps<AwardType>['columns'] = [
		{
			title: t('awardName'),
			dataIndex: 'award',
			key: 'award'
		},
		{
			title: t('awardDate'),
			dataIndex: 'awardDate',
			key: 'awardDate'
		},
		{
			title: t('awardDocumentNumber'),
			dataIndex: 'docNum',
			key: 'docNum'
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
								id: record.id,
								language: record.languagePortal ? record.languagePortal : 1,
								award: record.award,
								awardDate: dayjs(record.awardDate, 'DD.MM.YYYY'),
								awardDocumentNumber: record.docNum,
								awardDocumentDate: record.docDate ? dayjs(record.docDate, 'DD.MM.YYYY') : null,
								accept: record.portalStatus ? true : false,
								url: record.url,
								file: record.filename
									? [
											{
												uid: uuid(),
												name: record.filename,
												status: 'done',
												url: ''
											}
									  ]
									: []
							})
							setIsModalOpen(true)
						}}
					/>
					<ConfigProvider locale={i18next.language === 'ru' ? ru_RU : en_US}>
						<Popconfirm
							title={t('deleteEducationTitle')}
							description={t('deleteEducationDescription')}
							onConfirm={() => {
								deleteAward(record.id)
							}}
						>
							<DeleteTwoTone />
						</Popconfirm>
					</ConfigProvider>
				</Space>
			)
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
					dataSource={awards}
					className="w-full"
					locale={{ emptyText: t('noData') }}
					// loading={loading}
				/>
			</ConfigProvider>
		</>
	)
}
