import { PlusOutlined, SendOutlined } from '@ant-design/icons'
import { Button, Col, Divider, Form, Row, Upload, message } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import React, { useState } from 'react'

import { Message } from '../../../../models/myPractice'
import { useAppSelector } from '../../../../store'
import { useAddSendMutation } from '../../../../store/api/practiceApi/mypractice'

import { CommentNew } from './CommentNew'
import { t } from 'i18next'

dayjs.extend(utc)
dayjs.extend(timezone)

const Final = ({ dataOneLength,isSuccessFull,refetch, id, dataOnePlace, chat }: any) => {
	const user = useAppSelector(state => state.auth.user)
	const [text, setText] = useState<string>('')
	const [fileList, setFileList] = useState<any[]>([])
	const [files, setFiles] = useState<any>({
		report: null,
		diary: null,
		tasks: null
	})
	const [sendMessage, { data,isSuccess,isLoading }] = useAddSendMutation()
	const nameUser = user?.lastname + ' ' + user?.firstname
	const [change,setChange] = useState(0)

	const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setText(e.target.value)
	}
	const onFinish: any = (values: any) => {
		const newForm = new FormData()

		console.log('text:', text)
		const currentDate = dayjs().tz('Europe/Moscow').format()
		const message: Message = {
			practiceId: id,
			text: text,
			senderName: nameUser,
			datetime: currentDate
		}
		const jsonData = JSON.stringify(message)
		const blob = new Blob([jsonData], { type: 'application/json' })
		newForm.append('message', blob)
		if(files?.report){
			newForm.append('report', files.report)
		}
		if(files?.diary){
			newForm.append('diary', files.diary)
		}
		if(files?.tasks){
			newForm.append('tasks', files.tasks)
		}
		

		console.table(message)
		console.table([...newForm.entries()])
		setText('')
		setFileList([])
		setFiles({
			report: null,
			diary: null,
			tasks: null
		})
		//@ts-ignore
		sendMessage(newForm)
		setChange((prev: number) => prev + 1)
		
	}

	const onFinishFailed: any = (errorInfo: any) => {
		console.log('Failed:', errorInfo)
	}

	return (
		<>


			<Row className="mb-12">
				<Col xs={24} md={12}>
					<CommentNew dataOnePlace={dataOnePlace} isLoading={isLoading} dataOneLength={dataOneLength} change={change} isSuccessFull={isSuccessFull} refetch={refetch} chat={chat} />
				</Col>
			</Row>

			<Row className="mb-16">
				<Col xs={24} md={12} className="flex flex-wrap">
					<Form className="flex  w-full flex-wrap " onFinish={onFinish} onFinishFailed={onFinishFailed}>
						<div className="flex w-full ">
							<TextArea
								maxLength={75}
								placeholder="Напишите комментарий к работе"
								className="rounded-[10px_0px_0px_10px] "
								style={{ resize: 'none' }}
								value={text}
								onChange={onChange}
								required
								onKeyDown={(e) => {
									if (e.key === 'Enter') {
										e.preventDefault(); 
										onFinish();
									}
								}}
							/>
							<Button
								htmlType="submit"
								icon={<SendOutlined />}
								className="rounded-[0px_10px_10px_0px] h-full"
								size="large"
							/>
						</div>

						<div className="flex w-full gap-4 mt-4 justify-between flex-wrap">
							<Upload
								maxCount={1}
								onChange={info => {
									if (info.file.status === 'removed') {
										// form.setFieldValue('pdfContract', undefined)
										setFiles({
											...files,
											report: undefined
										})
									}
								}}
								beforeUpload={file => {
									const isPdf = file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
									const isLt5M = file.size / 1024 / 1024 < 5 // Проверка на размер меньше 5 МБ

									if (!isPdf) {
										message.error('Вы можете загружать только docx файлы!')
										return false
									}
									if (!isLt5M) {
										message.error('Файл должен быть меньше 5 МБ!')
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
								className="flex items-center  "
							>
								<Button className="rounded-[20px_20px_20px_20px] h-14" icon={<PlusOutlined />}>
									{t('loadOtchet')}
								</Button>
							</Upload>

							<Upload
								maxCount={1}
								onChange={info => {
									if (info.file.status === 'removed') {
										// form.setFieldValue('pdfContract', undefined)
										setFiles({
											...files,
											diary: undefined
										})
									}
								}}
								beforeUpload={file => {
									const isPdf = file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
									const isLt5M = file.size / 1024 / 1024 < 5 // Проверка на размер меньше 5 МБ

									if (!isPdf) {
										message.error('Вы можете загружать только PDF файлы!')
										return false
									}
									if (!isLt5M) {
										message.error('Файл должен быть меньше 5 МБ!')
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
								className="flex items-center  "
							>
								<Button className="rounded-[20px_20px_20px_20px] h-14" icon={<PlusOutlined />}>
									{t('loadDiary')}
								</Button>
							</Upload>

							<Upload
								maxCount={1}
								beforeUpload={file => {
									const isPdf = file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
									const isLt5M = file.size / 1024 / 1024 < 5 // Проверка на размер меньше 5 МБ

									if (!isPdf) {
										message.error('Вы можете загружать только PDF файлы!')
										return false
									}
									if (!isLt5M) {
										message.error('Файл должен быть меньше 5 МБ!')
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
								className="flex items-center "
							>
								<Button className="rounded-[20px_20px_20px_20px] h-14" icon={<PlusOutlined />}>
									{t('loadPutevkaa')} {dataOnePlace === 'На кафедре КФУ' ? t('zadanie') : t('putevka')}
								</Button>
							</Upload>
						</div>
					</Form>
				</Col>
			</Row>
		</>
	)
}

export default Final
