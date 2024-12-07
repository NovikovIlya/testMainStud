import { FileOutlined, FileTextOutlined, ReloadOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import dayjs from 'dayjs'
import { useEffect, useRef, useState } from 'react'
import { useGetAttachmentQuery } from '../../../../store/api/practiceApi/mypractice'



export const CommentNewTeacher = ({ files,  isLoading, dataOneLength, refetch }: any) => {
	const [loading, setLoading] = useState(false);
	const [messages, setMessages] = useState<any>([])
	const [dataChat,setDataChat] = useState<any>([])
	const [name, sendName] = useState(null)
	const [idAttachment, setIdAttachment] = useState<any>(null)
	const [page, setPage] = useState(1)
	const { data, isSuccess, isFetching, refetch: ref } = useGetAttachmentQuery(idAttachment, { skip: !idAttachment })
	const messagesEndRef = useRef<HTMLDivElement | null>(null)
	const dataChaTwo = [
		{
		text: "Тест",
		senderName: "Файзуллин Аяз",
		senderType: "STUDENT",
		dateTime: "2024-10-11T09:54:50Z",
		attachments: [
			{
				"id": "3e5138ad-50bf-4766-b816-d9cf2d328464",
				"name": "1.docx",
				"type": "report"
			}
		]
	},
	{
		"text": "ТЕСТ!",
		"senderName": "Файзуллин Аяз",
		"senderType": "TEACHER",
		"dateTime": "2024-10-11T09:55:01Z",
		"attachments": []
	},
	{
		text: "Тест",
		senderName: "Файзуллин Аяз",
		senderType: "STUDENT",
		dateTime: "2024-10-11T09:54:50Z",
		attachments: [
			{
				"id": "3e5138ad-50bf-4766-b816-d9cf2d328464",
				"name": "1.docx",
				"type": "report"
			}
		]
	},
	{
		"text": "ТЕСТ!",
		"senderName": "Файзуллин Аяз",
		"senderType": "TEACHER",
		"dateTime": "2024-10-11T09:55:01Z",
		"attachments": []
	},
	{
		text: "Тест",
		senderName: "Файзуллин Аяз",
		senderType: "STUDENT",
		dateTime: "2024-10-11T09:54:50Z",
		attachments: [
			{
				"id": "3e5138ad-50bf-4766-b816-d9cf2d328464",
				"name": "1.docx",
				"type": "report"
			}
		]
	},
	{
		"text": "ТЕСТ!",
		"senderName": "Файзуллин Аяз",
		"senderType": "TEACHER",
		"dateTime": "2024-10-11T09:55:01Z",
		"attachments": []
	}
	]

	const loadMessages = async (page:any) => {
		console.log('сработал')
		setLoading(true);
		const response = await fetch(`/api/messages?page=${page}`);
		const newMessages = await response.json();
		setMessages((prevMessages:any) => [...newMessages, ...prevMessages]);
		setLoading(false);
	};





	useEffect(() => {
		if (messagesEndRef.current) {
			messagesEndRef.current.scrollIntoView() // Прокручиваем вниз
		}
	}, [dataOneLength])

	const chatValid = dataChat ? [...dataChat].sort((a: any, b: any) => dayjs(a.dateTime).unix() - dayjs(b.dateTime).unix()) : []

	return (
		<>
			<div  className="flex-col-reverse h-[calc(100vh-270px)] space-y-4  overflow-y-auto p-10 bg-[#f5f8fb] rounded-[10px_10px_0px_0px] ">
				<div className='w-full flex justify-center'><Button htmlType='button' onClick={loadMessages}>Загрузить больше</Button></div>
				<div className="mb-8 ml-8 absolute top-0.5 right-20 flex flex-wrap  gap-5 backdrop:blur-[3px] m-[15px]">
					<div className="">
						{files?.report ? (
							<div>
							
								<Button icon={<FileTextOutlined />} shape="circle"></Button>
								<div className="!text-xs">Отчет</div>
							</div>
						) : (
							''
						)}
					</div>

					{files?.diary ? (
						<div className="flex items-center flex-col">
					
							<Button icon={<FileTextOutlined />} shape="circle"></Button>
							<div className="!text-xs">Дневник</div>
						</div>
					) : (
						''
					)}
					{files?.tasks ? (
						<div>
						
							<Button icon={<FileTextOutlined />} shape="circle"></Button>
							<div className="!text-xs">Иное</div>
						</div>
					) : (
						''
					)}
				</div>
				{dataChaTwo?.map((message: any) => {
					const isStudent = message.senderType !== 'STUDENT'

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
											<div className="break-all w-full">{message.text}</div>
											<div className="text-[10px]  flex justify-end mt-3">
												{new Date(message.dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
											</div>
										</div>
										<div className="flex flex-wrap gap-3 mt-4 flex-col">
											{message.attachments.map((attachment: any) => (
												<div  key={attachment.id} className="flex gap-3 justify-end text-end">
													<div
														onClick={() => {
															
														}}
														className="text-blue-500 cursor-pointer"
													>
														{attachment.name}
													</div>
													<FileOutlined style={{ color: '' }} className="w-4 h-4 cursor-pointer mt-1 color-white" />
												</div>
											))}
										</div>
									</div>
									{/* <div className="flex-shrink-0 ml-3">
										<div className="w-10 h-10 rounded-full overflow-hidden">
											<img className="w-full h-full object-cover" src={avaStudent} alt="student" />
										</div>
									</div> */}
								</div>
							) : (
								<>
									{/* <div className="flex-shrink-0 mr-3">
										<div className="w-10 h-10 rounded-full overflow-hidden">
											<img className="w-full h-full object-cover" src={avaTeacher} alt="teacher" />
										</div>
									</div> */}
									<div className="flex flex-col">
										<div className="flex items-center mb-1">
											<span className="font-bold mr-2">{message.senderName}</span>
											<span className="text-xs text-gray-500 flex gap-2 mt-[2px]">
												<span>{new Date(message.dateTime).toLocaleDateString()}</span>
											</span>
										</div>
										<div className="bg-gray-200 rounded-lg rounded-tl-none p-3  flex flex-wrap w-[91%]">
											<div className="break-all w-full">{message.text}</div>
											<div className="text-[10px]  flex justify-end mt-3">
												{new Date(message.dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
											</div>
										</div>
										<div className="flex gap-3 mt-4 flex-col">
											{message.attachments.map((attachment: any) => (
												<div  key={attachment.id} className="flex gap-3">
													<FileOutlined style={{ color: '' }} className="w-4 h-4 cursor-pointer mt-1 color-white" />
													<div onClick={() => {

															}
														} 
														className="text-blue-500 cursor-pointer">
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
