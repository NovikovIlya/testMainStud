import { ConfigProvider, DatePicker, DatePickerProps, Space, Typography } from 'antd'
import React, { useState } from 'react'
import ru_RU from 'antd/locale/ru_RU';
import Title from 'antd/es/typography/Title';
import TableJournalPosDay from './table/TableJournalPosDay';
import { t } from 'i18next';
import i18n from '../../../../18n';
import en_US from 'antd/locale/en_US';
import JournalPosTable from './table/JournalPosTable';

const { Text, Link } = Typography

const JournalPosDay = () => {
    const [dataSource,setDataSource] = useState([])
    
	const onChange: DatePickerProps['onChange'] = (date, dateString) => {
		console.log(date, dateString)
	}

	return (
		<div>
            <Space direction="vertical">
			    <Text>{t('textLessonLog2')}</Text>
                <ConfigProvider locale={i18n.language==='ru'?ru_RU:en_US}>
		    	    <DatePicker   onChange={onChange} format="DD.MM.YYYY" />
                </ConfigProvider>

             
				<JournalPosTable dataSource={dataSource} setDataSource={setDataSource}/>
            </Space>
		</div>
	)
}

export default JournalPosDay
