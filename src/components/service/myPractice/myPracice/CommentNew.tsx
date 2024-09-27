import { FileOutlined, ReloadOutlined, UploadOutlined } from '@ant-design/icons'
import { Avatar, Button, Col, Divider, Form, List, Row, Spin, Typography } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'

import avaStudent from '../../../../assets/images/avaStudent.png'
import avaTeacher from '../../../../assets/images/avaTeacher.png'
import { useGetAttachmentQuery } from '../../../../store/api/practiceApi/mypractice'

import './myPracticeStyle.scss'

export const CommentNew = ({ refetch, chat }: any) => {
	const [idAttachment, setIdAttachment] = useState<any>(null)
	const { data, isSuccess, isFetching } = useGetAttachmentQuery(idAttachment, { skip: !idAttachment })
	console.log('chat', chat)

	const sendAttachments = (id: any) => {
		console.log('setIdAttachment', id)
		setIdAttachment(id)
	}
	const download = async () => {
		if (data) {
			const link = document.createElement('a')
			link.href = data
			link.setAttribute('download', `${idAttachment}.docx`)
			document.body.appendChild(link)
			link.click()
		}
	}

	useEffect(() => {
		if (isSuccess) {
			download()
		}
	}, [isSuccess])

	const chatValid = chat ? [...chat].sort((a: any, b: any) => dayjs(a.dateTime).unix() - dayjs(b.dateTime).unix()) : []

	return (
		<>
			<Spin spinning={isFetching}>
				<Row className="mb-20">
					<Col xs={24} md={12}>
						<Typography.Title level={2}>Комментарии по практике</Typography.Title>
						<span>Загружайте пакет документов на проверку и получайте обратную связь прямо в окне комментариев </span>
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

				<div className="space-y-4 h-[400px] overflow-y-auto p-10">
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
														{new Date(message.dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })},
													</span>{' '}
													<span>
														{dayjs(message.dateTime).isSame(dayjs(), 'day')
															? 'Сегодня'
															: new Date(message.dateTime).toLocaleDateString()}
													</span>
												</span>
												<span className="font-bold ml-2">{message.senderName}</span>
											</div>
											<div className="bg-blue-500 text-white rounded-lg rounded-tr-none p-3 max-w-xs">
												{message.text}
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
												<span className="text-xs text-gray-500 flex gap-2 mt-[1px]">
													<span>
														{new Date(message.dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })},
													</span>{' '}
													<span>{new Date(message.dateTime).toLocaleDateString()}</span>
												</span>
											</div>
											<div className="bg-gray-200 rounded-lg rounded-tl-none p-3 max-w-xs">{message.text}</div>
											<div className="flex gap-3 mt-4">
												<FileOutlined style={{ color: '' }} className="w-4 h-4 cursor-pointer mt-1 color-white" />
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
				</div>
			</Spin>
		</>
	)
}
