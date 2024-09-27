import { PlusOutlined, SendOutlined, UploadOutlined } from '@ant-design/icons'
import { Button, Card, Col, Divider, Form, FormProps, Row, Space, Typography, Upload, UploadProps, message } from 'antd'

import React, { useState } from 'react'

import { Comment } from './Comment'
import TextArea from 'antd/es/input/TextArea'
import { CommentNew } from './CommentNew'
import { useAppSelector } from '../../../../store'
import { useAddSendMutation } from '../../../../store/api/practiceApi/mypractice'
import { send } from 'process'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { DataMessages, Message } from '../../../../models/myPractice'

dayjs.extend(utc);
dayjs.extend(timezone);

const Final = ({refetch,id,dataOnePlace,chat}:any) => {
	const user = useAppSelector((state) => state.auth.user)
	const [text,setText] = useState<string>('')
	const [fileList, setFileList] = useState<any[]>([])
	const [files,setFiles] = useState<any>({
		report:null,
		diary:null,
		tasks:null
	})
	const [sendMessage,{data} ] = useAddSendMutation()
	const nameUser = user?.lastname + ' ' + user?.firstname
	
	
	const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setText(e.target.value);
	};
	const onFinish: any = (values:any) => {
		const newForm = new FormData()

		console.log('text:', text);	
		const currentDate = dayjs().tz("Europe/Moscow").format()
		const message:Message = {
			practiceId:id,
			text:text,
			senderName:nameUser,
			datetime:currentDate,

		}
		const jsonData = JSON.stringify(message)
		const blob = new Blob([jsonData], { type: 'application/json' })
		newForm.append('message', blob)
		newForm.append('report', files.report)
		newForm.append('diary', files.diary)
		newForm.append('tasks', files.tasks)

		console.table(message);
		console.table([...newForm.entries()]);
		setText('')
		setFileList([]) 
		setFiles({
			report:null,
			diary:null,
			tasks:null
		})
		//@ts-ignore
		sendMessage(newForm);
	};
	  
	const onFinishFailed: any = (errorInfo:any) => {
		console.log('Failed:', errorInfo);
	};

	return (
		<>
			<Row>
				<Col span={12}>
					<Divider />
				</Col>
			</Row>
		
			<Row className="mb-12">
				<Col xs={24} md={12}>
					{/* <Comment  /> */}
					<CommentNew refetch={refetch} chat={chat}/>
				</Col>
			</Row>

			<Row className="mb-16">
				<Col xs={24} md={12} className="flex flex-wrap">
					<Form className='flex  w-full flex-wrap '  
						onFinish={onFinish}
    					onFinishFailed={onFinishFailed}>
	
						<div className='flex w-full '>
							<TextArea maxLength={75} placeholder='Напишите комментарий к работе' className='rounded-[10px_0px_0px_10px]' style={{ resize: 'none' }}  value={text} onChange={onChange}/>
							<Button htmlType='submit' icon={<SendOutlined />} className="rounded-[0px_10px_10px_0px] h-full" size="large" />
						</div>

						<div className='flex w-full gap-4 mt-4 justify-between flex-wrap'>
							<Upload  
									maxCount={1}
									onChange={info => {
										if (info.file.status === "removed") {
											// form.setFieldValue('pdfContract', undefined)
											setFiles({
												...files,
												report: undefined
											})
										}
									}}
									beforeUpload={(file) => {
												const isPdf = file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
												const isLt5M = file.size / 1024 / 1024 < 5; // Проверка на размер меньше 5 МБ

												if (!isPdf) {
													message.error('Вы можете загружать только PDF файлы!');
													return false
												}
												if (!isLt5M) {
													message.error('Файл должен быть меньше 5 МБ!');
													return false
												}
											
												setFiles({
													...files,
													report: file
												})
												return false
										}}   
									accept={'.docx'} 
									fileList={files.report ? [files.report] : []} 
									className='flex items-center  '>
								<Button className="rounded-[10px_10px_10px_10px] h-14"  icon={<PlusOutlined />} >Загрузить отчёт</Button>
							</Upload>

							<Upload  
									maxCount={1}
									onChange={info => {
										if (info.file.status === "removed") {
											// form.setFieldValue('pdfContract', undefined)
											setFiles({
												...files,
												diary: undefined
											})
										}
									}}
									beforeUpload={(file) => {
												const isPdf = file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
												const isLt5M = file.size / 1024 / 1024 < 5; // Проверка на размер меньше 5 МБ

												if (!isPdf) {
													message.error('Вы можете загружать только PDF файлы!');
													return false
												}
												if (!isLt5M) {
													message.error('Файл должен быть меньше 5 МБ!');
													return false
												}
											
												setFiles({
													...files,
													diary: file
												})
												return false
										}}   
									accept={'.docx'} 
									fileList={files.diary ? [files.diary] : []} 
									className='flex items-center  '>
								<Button  className="rounded-[10px_10px_10px_10px] h-14"  icon={<PlusOutlined />} >Загрузить дневник</Button>
							</Upload>

							<Upload  
									maxCount={1}
									beforeUpload={(file) => {
												const isPdf = file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
												const isLt5M = file.size / 1024 / 1024 < 5; // Проверка на размер меньше 5 МБ

												if (!isPdf) {
													message.error('Вы можете загружать только PDF файлы!');
													return false
												}
												if (!isLt5M) {
													message.error('Файл должен быть меньше 5 МБ!');
													return false
												}
											
												setFiles({
													...files,
													tasks: file
												})
												return false
										}}   
									accept={'.docx'} 
									fileList={files.tasks ? [files.tasks] : []} 
									className='flex items-center '>
								<Button   className="rounded-[10px_10px_10px_10px] h-14"  icon={<PlusOutlined />} >Загрузить {dataOnePlace==='На кафедре КФУ' ? 'задания' : 'путевку'}</Button>
							</Upload>
						</div>
					</Form>
				</Col>
			</Row>

			
		</>
	)
}

export default Final
