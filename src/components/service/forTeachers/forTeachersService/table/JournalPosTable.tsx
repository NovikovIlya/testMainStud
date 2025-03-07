import React, { useEffect, useState } from 'react'
import TableJournalPosDay from './TableJournalPosDay'
import { Button, Checkbox, CheckboxProps, Row, Typography } from 'antd'
import Title from 'antd/es/typography/Title'
import { t } from 'i18next'
import { useSendByDateMutation } from '../../../../../store/api/forTeacher/forTeacherApi'
import { useAppSelector } from '../../../../../store'

const { Text, Link } = Typography

const JournalPosTable = ({date,fixDay,time,timeId,groupId,description,title,data}:any) => {
	const [localData, setLocalData] = useState(() => {
		return data?.map((item: any) => ({
		  ...item,
		  key: item.studentId
		})) || []
	})
	const yearForm = useAppSelector(state => state.forTeacher.yearForm)
	const semestrForm = useAppSelector(state => state.forTeacher.semestrForm)
	const [sendData,{}] = useSendByDateMutation()
	const [checkbox, setCheckbox] = useState(false)

	const send = ()=>{
		const data = {
           year:yearForm,
		   semester:semestrForm,
		   isBlocked:checkbox,
		   groupId:groupId,
		   groupName:title,
		   timeId:timeId,
		   time:time,		  
		   date:date,
		   subjectName:description,
		   fixDay:fixDay,
		   students:localData,

		}
		console.log('data',data)
		sendData(data)
	}
	const onChange: CheckboxProps['onChange'] = (e) => {
		console.log(`checked = ${e.target.checked}`);
		setCheckbox(e.target.checked);
	};

	console.log('localData,',localData)
	return (
		<>
			<Title className="mt-8" level={4}>
				{title}
			</Title>
			<Text>{description}</Text>
			<TableJournalPosDay dataSource={localData} setLocalData={setLocalData} />
			
			<Row className='mt-6'><Checkbox onChange={onChange}>Подтвердить?</Checkbox></Row>
			<Button onClick={send} className='mt-8 mb-8 rounded-xl' type='primary'>{t('Save')}</Button>
		</>
	)
}


export default JournalPosTable
