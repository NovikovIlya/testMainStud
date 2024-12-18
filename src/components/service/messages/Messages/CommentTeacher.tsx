import { FileTextOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import dayjs from 'dayjs'
import { useEffect, useRef } from 'react'
import { useGetAllUnReadQuery } from '../../../../store/api/messages/messageApi'



export const CommentNewTeacher = ({dataOneChatOld, files, isLoading, gotToBottom, refetch ,chatArray,loadMessages,children}: any) => {
	const messagesEndRef = useRef<HTMLDivElement | null>(null)
	const {data:dataUnReadMessage} = useGetAllUnReadQuery(null)

	useEffect(() => {
		if (messagesEndRef.current) {
			messagesEndRef.current.scrollIntoView() // Прокручиваем вниз
		}
	}, [gotToBottom])

	

	const chatValid = chatArray ? [...chatArray].sort((a: any, b: any) => dayjs(a.dateTime).unix() - dayjs(b.dateTime).unix()) : []

	return (
		<>
			<div  className="flex-col-reverse h-[calc(100vh-270px)] space-y-4  overflow-y-auto p-10 bg-[#f5f8fb] rounded-[10px_10px_0px_0px] ">
				{dataOneChatOld?.messages.length===0 ? <div className='w-full text-center mb-[33px] text-[12px] text-opacity-35 text-gray-600'>Нет других сообщений</div>: <div className='w-full flex justify-center'><Button htmlType='button' onClick={loadMessages}>Загрузить больше</Button></div>}

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
				{chatValid?.map((message: any) => {
					const isMe = (message.senderId ===  dataUnReadMessage.currentUserInternalId)  && (dataUnReadMessage.userType === message.senderType)

					return (
						<div className={`animate-fade-in mb-4 flex items-start ${isMe ? 'justify-end' : ''}`} key={message.dateTime}>
							{isMe ? (
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
										<div className="bg-blue-500 text-white rounded-lg rounded-tr-none p-3 flex flex-wrap  w-[91%] animate-fade-in">
											<div className="break-all w-full">{message.message}</div>
											<div className="text-[10px]  w-full flex justify-end mt-3">
												{new Date(message.dateTime).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Moscow' })}
											</div>
										</div>
									</div>
								</div>
							) : (
								<>
									<div className="flex flex-col">
										<div className="flex items-center mb-1">
											<span className="font-bold mr-2">{children}</span>
											<span className="text-xs text-gray-500 flex gap-2 mt-[2px]">
												<span>{dayjs(message.dateTime).isSame(dayjs(), 'day')
														? 'Сегодня'
														: new Date(message.dateTime).toLocaleDateString()}</span>
											</span>
										</div>
										<div className="bg-gray-200 rounded-lg rounded-tl-none p-3  flex flex-wrap w-[91%] animate-fade-in ">
											<div className="break-all w-full">{message.message}</div>
											<div className="text-[10px]  w-full flex justify-end mt-3">
												{new Date(message.dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
											</div>
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
