import React from 'react'
import TableJournalPosDay from './TableJournalPosDay'
import { Typography } from 'antd'
import Title from 'antd/es/typography/Title'

const { Text, Link } = Typography

const JournalPosTable = ({dataSource,setDataSource}:any) => {
	return (
		<>
			<Title className="mt-8" level={4}>
				Группа 6-409
			</Title>
			<Text>08:30 - 10:00 - Компьютерные</Text>
			<TableJournalPosDay dataSource={dataSource} setDataSource={setDataSource} />
		</>
	)
}


export default JournalPosTable
