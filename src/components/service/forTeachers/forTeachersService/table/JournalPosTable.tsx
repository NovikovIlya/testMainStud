import React, { useEffect, useState } from 'react'
import TableJournalPosDay from './TableJournalPosDay'
import { Button, Typography } from 'antd'
import Title from 'antd/es/typography/Title'
import { t } from 'i18next'

const { Text, Link } = Typography

const JournalPosTable = ({flag,setFlag,dataSource,groupId,description,title,data,setData}:any) => {
	// const [localData, setLocalData] = useState([])
	const [localData, setLocalData] = useState(() => {
		
		if (dataSource?.length===0) {
			return []
		}
		return data?.map((item: any) => ({
		  ...item,
		  key: item.studentId
		})) || []
	  })

	// useEffect(()=>{
	// 	if(data)
	// 	setLocalData(data?.map((item:any)=>{
	// 		return {
	// 			...item,
	// 			key:item.studentId
	// 		}
	// 	}))
	// },[data])

	console.log('data,',data)
	return (
		<>
			<Title className="mt-8" level={4}>
				{title}
			</Title>
			<Text>{description}</Text>
			<TableJournalPosDay dataSource={localData} setLocalData={setLocalData} />
			<Button className='mt-8 mb-8 rounded-xl' type='primary'>{t('Save')}</Button>
		</>
	)
}


export default JournalPosTable
