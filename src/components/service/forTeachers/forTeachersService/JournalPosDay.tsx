import { ConfigProvider, DatePicker, DatePickerProps, Space, Typography } from 'antd'
import Title from 'antd/es/typography/Title'
import en_US from 'antd/locale/en_US'
import ru_RU from 'antd/locale/ru_RU'
import { t } from 'i18next'
import React, { useEffect, useState } from 'react'

import i18n from '../../../../18n'

import JournalPosTable from './table/JournalPosTable'
import TableJournalPosDay from './table/TableJournalPosDay'
import { useGetByDateQuery } from '../../../../store/api/forTeacher/forTeacherApi'

const { Text } = Typography

const JournalPosDay = () => {
	const [dataSource, setDataSource] = useState<any>([])
	const [date, setDate] = useState<any>('')
	const {data} = useGetByDateQuery(date,{skip:!date})
	const [flag,setFlag] = useState(false)
	useEffect(()=>{
		if(data){
			setDataSource(data)
		}
	},[data])

	const onChange: DatePickerProps['onChange'] = (date, dateString) => {
		console.log(date, dateString)
		setDate(dateString)
		setFlag(true)
		setDataSource([])
	}
	console.log('dataSource',dataSource)

	return (
		<div>
			<Space direction="vertical">
				<Text>{t('textLessonLog2')}</Text>
				<ConfigProvider locale={i18n.language === 'ru' ? ru_RU : en_US}>
					<DatePicker className='mb-4' onChange={onChange} format="DD.MM.YYYY" />
				</ConfigProvider>
				{dataSource?.map((item:any)=>{
					return <div >
						<JournalPosTable flag={flag} setFlag={setFlag} dataSource={dataSource}    key={`${item.groupId}-${date}`} groupId={item.groupId} setDataSource={setDataSource} description={item?.subjectName} title={item?.groupName} data={item.students} />
					</div>
				})}
				{dataSource?.length===0 && <Title level={4}>{t('noData')}</Title>}
				
			</Space>
		</div>
	)
}

export default JournalPosDay
