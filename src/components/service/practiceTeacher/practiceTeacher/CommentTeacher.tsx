import { FileOutlined, ReloadOutlined, UploadOutlined } from '@ant-design/icons'
import { Avatar, Button, Col, Divider, Form, List, Row, Spin, Typography } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import dayjs from 'dayjs'
import { useEffect, useRef, useState } from 'react'

import avaStudent from '../../../../assets/images/avaStudent.png'
import avaTeacher from '../../../../assets/images/avaTeacher.png'
import { useGetAttachmentQuery } from '../../../../store/api/practiceApi/mypractice'

// import './myPracticeStyle.scss'
const chat = [
    {
        "text": "Привет! Как дела?",
        "senderName": "Алексей",
        "senderType": "STUDENT",
        "dateTime": "2024-10-01T10:15:30Z",
        "attachments": [
            {
                "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                "name": "фото_отпуска.jpg"
            }
        ]
    },
    {
        "text": "Не забудь про встречу завтра.",
        "senderName": "Мария",
        "senderType": "администратор",
        "dateTime": "2024-10-01T11:00:00Z",
        "attachments": []
    },
    {
        "text": "Отправляю отчет за сентябрь.",
        "senderName": "Алексей",
        "senderType": "STUDENT",
        "dateTime": "2024-10-01T12:30:45Z",
        "attachments": [
            {
                "id": "b2c85f64-5717-4562-b3fc-2c963f66afa6",
                "name": "отчет_сентябрь.pdf"
            }
        ]
    }
]

export const CommentNewTeacher = ({ isLoading,dataOneLength,refetch }: any) => {
	const [idAttachment, setIdAttachment] = useState<any>(null)
	const { data, isSuccess, isFetching ,refetch:ref} = useGetAttachmentQuery(idAttachment, { skip: !idAttachment })
	const messagesEndRef = useRef<HTMLDivElement | null>(null) 

	const sendAttachments = (id: any) => {
		if(id===idAttachment){
			// ref()
			return
		}
		setIdAttachment(id)
	}

	const download = async () => {
		
			const link = document.createElement('a')
			// link.href = data
			link.setAttribute('download', `${idAttachment}.docx`)
			document.body.appendChild(link)
			link.click()
		
	}


	// useEffect(() => {
	// 	if (isSuccess) {
	// 		download()
	// 	}
	// }, [isSuccess])

	// useEffect(() => {
	// 	if (messagesEndRef.current) {
	// 		messagesEndRef.current.scrollIntoView({ behavior: 'smooth' }) // Прокручиваем вниз
	// 	}
	// }, [dataOneLength])


	const chatValid = chat ? [...chat].sort((a: any, b: any) => dayjs(a.dateTime).unix() - dayjs(b.dateTime).unix()) : []



	return (
		<>
			
				<Row className="mb-20">
					<Col xs={24} md={12} className='flex items-center'>
						{/* <Typography.Title level={2}>Здесь отобразятся материалы студента</Typography.Title> */}
						<span>Проверяйте пакет документов и оставляйте обратную связь </span>
					</Col>
					<Col xs={24} md={12} className="flex justify-end">
						<Button
							onClick={refetch}
							className="mt-8 mb-8 ml-8"
							size="large"
							shape="circle"
							icon={<ReloadOutlined />}
						/>
					</Col>
				</Row>

				<div className="space-y-4 h-[400px] overflow-y-auto p-10 bg-gray-100 rounded-[10px_10px_0px_0px]">
					{chatValid?.map((message: any) => {
						const isStudent = message.senderType === 'STUDENT'

						return (
							<div className={`mb-4 flex items-start ${isStudent ? 'justify-end' : ''}`} key={message.dateTime}>
								{isStudent ? (
									<div className="flex mb-10">
										<div className="flex flex-col items-end">
											<div className="flex items-center mb-1">
												<span className="text-xs text-gray-500 flex gap-2">
	
													<span>
														{dayjs(message.dateTime).isSame(dayjs(), 'day')
															? 'Сегодня'
															: new Date(message.dateTime).toLocaleDateString()}
													</span>
												</span>
												<span className="font-bold ml-2">{message.senderName}</span>
											</div>
											<div className="bg-blue-500 text-white rounded-lg rounded-tr-none p-3 flex flex-wrap  w-[91%]">
												<div className='break-all w-full'>{message.text}</div>
												<div className="text-[10px]  flex justify-end mt-3">
													{new Date(message.dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
												</div>
											</div>
											<div className="flex flex-wrap gap-3 mt-4 flex-col">
												{message.attachments.map((attachment: any) => (
													<div className="flex gap-3">
														<div
															onClick={() => sendAttachments(attachment.id)}
															className="text-blue-500 cursor-pointer"
														>
															{attachment.name}
														</div>
														<FileOutlined style={{ color: '' }} className="w-4 h-4 cursor-pointer mt-1 color-white" />
													</div>
												))}
											</div>
										</div>
										<div className="flex-shrink-0 ml-3">
											<div className="w-10 h-10 rounded-full overflow-hidden">
												<img className="w-full h-full object-cover" src={avaStudent} alt="student" />
											</div>
										</div>
									</div>
								) : (
									<>
										<div className="flex-shrink-0 mr-3">
											<div className="w-10 h-10 rounded-full overflow-hidden">
												<img className="w-full h-full object-cover" src={avaTeacher} alt="teacher" />
											</div>
										</div>
										<div className="flex flex-col">
											<div className="flex items-center mb-1">
												<span className="font-bold mr-2">{message.senderName}</span>
												<span className="text-xs text-gray-500 flex gap-2 mt-[2px]">
	
													<span>{new Date(message.dateTime).toLocaleDateString()}</span>
												</span>
											</div>
											<div className="bg-gray-200 rounded-lg rounded-tl-none p-3  flex flex-wrap w-[91%]">
												<div className='break-all w-full'>{message.text}</div>
												<div className="text-[10px]  flex justify-end mt-3">
													{new Date(message.dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
												</div>
											</div>
											<div className="flex gap-3 mt-4 flex-col">
											
												{message.attachments.map((attachment: any) => (
													<div className="flex gap-3">
														<FileOutlined style={{ color: '' }} className="w-4 h-4 cursor-pointer mt-1 color-white" />
														<div
															onClick={() => sendAttachments(attachment.id)}
															className="text-blue-500 cursor-pointer"
														>
															{attachment.name}
														</div>
													</div>
												))}
											</div>
										</div>
									</>
								)}
							</div>
						)
					})}
					<div ref={messagesEndRef} />
				</div>
			
		</>
	)
}
