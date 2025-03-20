import { ConfigProvider, Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { useTranslation } from 'react-i18next'

import { DataTypeSession } from '../../../models/session'
import { useGetExamsScheduleQuery } from '../../../store/api/serviceApi'

export const Session = () => {
	const { data: exam } = useGetExamsScheduleQuery()
	const { t } = useTranslation()

	const columns: ColumnsType<DataTypeSession> = [
		{
			title: t('Time'),
			dataIndex: 'time_note',
			key: 'time_note',
			render: item => <p className="text-base ">{item}</p>
		},
		{
			title: t('adress'),
			dataIndex: 'building_name',
			key: 'building_name',
			render: item => <p className="text-base">{item}</p>
		},
		{
			title: t('LectureHall'),
			dataIndex: 'room_num',
			key: 'room_num',
			render: item => <p className="text-base">{item}</p>
		},
		{
			title: t('Subject'),
			key: 'name',
			dataIndex: 'name',
			render: item => <p className="text-base max-w-xs text-start">{item}</p>
		},
		{
			title: t('DateCertification'),
			key: 'certification',
			dataIndex: 'certification',
			render: item => <p className="text-base">{item}</p>
		},
		{
			title: t('Teacher'),
			key: 'employee_name',
			dataIndex: 'employee_name',
			render: item => <p className="text-base">{item}</p>
		}
	]
	return (
		<div>
			<div className="text-black text-3xl font-normal leading-7">{t('SessionSchedule')}</div>
			<ConfigProvider
				theme={{
					components: {
						Table: {
							headerBg: 'rgb(218, 231, 251)'
						}
					}
				}}
			>
				<Table
					columns={columns}
					dataSource={exam}
					pagination={false}
					className=" mt-[50px]  rounded-none max-w-[1300px]"
					locale={{ emptyText: t('noData') }}
				/>
			</ConfigProvider>
		</div>
	)
}
