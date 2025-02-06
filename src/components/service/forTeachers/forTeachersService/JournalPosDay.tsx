import { ConfigProvider, DatePicker, DatePickerProps, Space, Typography } from 'antd'
import React, { useState } from 'react'
import ru_RU from 'antd/locale/ru_RU';
import Title from 'antd/es/typography/Title';
import TableJournalPosDay from './table/TableJournalPosDay';

const { Text, Link } = Typography

const JournalPosDay = () => {
    const [dataSource,setDataSource] = useState([])
    
	const onChange: DatePickerProps['onChange'] = (date, dateString) => {
		console.log(date, dateString)
	}

	return (
		<div>
            <Space direction="vertical">
			    <Text>Для отображения списка дисциплин выберите необходимую дату в календаре: (варианты заполнения: н — не был, б — болел)</Text>
                <ConfigProvider locale={ru_RU}>
		    	    <DatePicker onChange={onChange} format="DD.MM.YYYY" />
                </ConfigProvider>

                <Title className='mt-8' level={4}>Группа 6-409</Title>
                <Text>08:30 - 10:00 - Компьютерные</Text>
                <TableJournalPosDay dataSource={dataSource} setDataSource={setDataSource}/>
            </Space>


		</div>
	)
}

export default JournalPosDay
