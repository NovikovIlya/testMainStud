import { SendOutlined, UploadOutlined } from '@ant-design/icons'
import { Button, Card, Col, Divider, Form, FormProps, Row, Space, Typography, Upload, UploadProps, message } from 'antd'

import React, { useState } from 'react'

import { Comment } from './Comment'
import TextArea from 'antd/es/input/TextArea'



const Final = () => {
	const [isFirstSend,setIsFirstSend] = useState(false)
	const [text,setText] = useState<string>('')
	const [fileList, setFileList] = useState<any[]>([])
	console.log('isFirstSend',isFirstSend)
	const props: UploadProps = {
		name: 'file',
		action: 'https://jsonplaceholder.typicode.com/posts',
		headers: {
			authorization: 'authorization-text'
		},
		// fileList, // Передаем список файлов в компонент Upload
		onChange(info) {
			if (info.file.status !== 'uploading') {
				console.log(info.file, info.fileList)
			}
			if (info.file.status === 'done') {
				message.success(`${info.file.name} file uploaded successfully`)
				setFileList(info.fileList) // Обновляем состояние списка файлов
			} else if (info.file.status === 'error') {
				message.error(`${info.file.name} file upload failed.`)
			}
		}
	}
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
					<Comment />
				</Col>
			</Row>

			<Row className="mb-6">
				<Col span={12} className="flex flex-wrap">
					<Form className='flex w-full'  
						onFinish={onFinish}
    					onFinishFailed={onFinishFailed}>

						<Upload {...props} className='flex items-center h-full '>
							<Button className="rounded-[10px_0px_0px_10px] h-14"  icon={<UploadOutlined />}>
							
							</Button>
						</Upload>
						<TextArea className='rounded-[0px_0px_0px_0px]' style={{ resize: 'none' }}  value={text} onChange={onChange}/>
						<Button htmlType='submit' icon={<SendOutlined />} className="rounded-[0px_10px_10px_0px] h-full" size="large" >
							
						</Button>
					</Form>
				</Col>
			</Row>

			<Row>
				<Col span={12}>
					<Divider />
				</Col>
			</Row>
			

			
		</>
	)
}

export default Final
