import React, { useEffect, useState } from 'react'
import TableJournalPosDay from './TableJournalPosDay'
import { Button, Checkbox, CheckboxProps, Row, Typography } from 'antd'
import Title from 'antd/es/typography/Title'
import { t } from 'i18next'
import { useSendByDateMutation } from '../../../../../store/api/forTeacher/forTeacherApi'
import { useAppDispatch, useAppSelector } from '../../../../../store'
import { logOut } from '../../../../../store/reducers/authSlice'

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
	const [sendData,{error,data:dataSend}] = useSendByDateMutation()
	const [checkbox, setCheckbox] = useState(false)
	const dispatch = useAppDispatch()
	console.log('dataSenddataSend',dataSend)
	useEffect(()=>{
		console.log('dataSenddataSend',dataSend)
		if (typeof dataSend?.data === 'string') { // Проверка на текстовый ответ
			alert('Ответ сервера: ' + dataSend?.data); // Вывод alert
		  }
	},[dataSend])

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
		.unwrap()
		.then((res: string) => {
			console.log('Текст ответа:', res)
			alert('Ответ сервера: ' + res);
		})
		.catch((err:any)=>{
			if(err.status === 501){
			alert('Время сессии истекло. Пожалуйста, пройдите процедуру авторизации заново.');
			dispatch(logOut())}
		})
	}
	const onChange: CheckboxProps['onChange'] = (e) => {
		console.log(`checked = ${e.target.checked}`);
		setCheckbox(e.target.checked);
	};
	console.log('dataSend',dataSend)
	console.log('localData,',localData)
	return (
		<>
			<Title className="mt-2 px-2" level={4}>
				{title}
			</Title>
			<Text className='px-2'>{description}</Text>
			<TableJournalPosDay dataSource={localData} setLocalData={setLocalData} fixDay={fixDay}/>
			
			<Row className='mt-6 px-2' >
				{fixDay ? <div className='flex gap-2'><Text className='text-gray-500'>{t('dataAprove')}:</Text><span className='mb-3'>{fixDay}</span> </div> : <Checkbox  onChange={onChange}>{t('confirmData')}</Checkbox>}
			</Row>
			{fixDay===null ? <Button disabled={fixDay!==null ? true : false} onClick={send} className='mt-4 mb-8 rounded-xl mx-2' type='primary'>{t('Save')}</Button>:''}
		</>
	)
}


export default JournalPosTable
