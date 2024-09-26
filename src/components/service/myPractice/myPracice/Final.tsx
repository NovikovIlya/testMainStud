import { SendOutlined, UploadOutlined } from '@ant-design/icons'
import { Button, Card, Col, Divider, Form, FormProps, Row, Space, Typography, Upload, UploadProps, message } from 'antd'

import React, { useState } from 'react'

import { Comment } from './Comment'
import TextArea from 'antd/es/input/TextArea'
import { CommentNew } from './CommentNew'



const Final = ({dataOnePlace}:any) => {
	const [isFirstSend,setIsFirstSend] = useState(false)
	const [text,setText] = useState<string>('')
	const [fileList, setFileList] = useState<any[]>([])
	const [files,setFiles] = useState<any>({
		report:null,
		diary:null,
		tasks:null
	})
	console.log('isFirstSend',isFirstSend)

	
	const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setText(e.target.value);
	};
	const onFinish: any = (values:any) => {
		console.log('Success:', values);
		setIsFirstSend(true)
		setText('')
		setFileList([]) 
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
				<Col span={12}>
					{/* <Comment  /> */}
					<CommentNew/>
				</Col>
			</Row>

			<Row className="mb-16">
				<Col span={12} className="flex flex-wrap">
					<Form className='flex  w-full flex-wrap '  
						onFinish={onFinish}
    					onFinishFailed={onFinishFailed}>

						
						
						<div className='flex w-full '>
							<TextArea maxLength={75} placeholder='Напишите комментарий к работе' className='rounded-[10px_0px_0px_10px]' style={{ resize: 'none' }}  value={text} onChange={onChange}/>
							<Button htmlType='submit' icon={<SendOutlined />} className="rounded-[0px_10px_10px_0px] h-full" size="large" />
						</div>

						<div className='flex w-full gap-4 mt-4 justify-between'>
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
												const isPdf = file.type === 'application/pdf';
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
									accept={'.pdf'} 
									fileList={files.report ? [files.report] : []} 
									className='flex items-center  '>
								<Button className="rounded-[10px_10px_10px_10px] h-14"  icon={<UploadOutlined />} >Загрузить отчёт</Button>
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
												const isPdf = file.type === 'application/pdf';
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
									accept={'.pdf'} 
									fileList={files.diary ? [files.diary] : []} 
									className='flex items-center  '>
								<Button className="rounded-[10px_10px_10px_10px] h-14"  icon={<UploadOutlined />} >Загрузить дневник</Button>
							</Upload>

							<Upload  
									maxCount={1}
									beforeUpload={(file) => {
												const isPdf = file.type === 'application/pdf';
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
									accept={'.pdf'} 
									fileList={files.tasks ? [files.tasks] : []} 
									className='flex items-center '>
								<Button className="rounded-[10px_10px_10px_10px] h-14"  icon={<UploadOutlined />} >Загрузить {dataOnePlace==='На кафедре КФУ' ? 'задания' : 'путевку'}</Button>
							</Upload>
						</div>
					</Form>
				</Col>
			</Row>

			
		</>
	)
}

export default Final
