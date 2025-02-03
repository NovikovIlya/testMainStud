import { Form, Spin } from 'antd'
import React from 'react'

import InputText from './InputText'

const ChatSkeleton = () => {
	return (
		<>
			<div className=" px-4 col-span-2 w-full flex justify-center flex-wrap ">
				<div className="w-full flex flex-wrap flex-col">
					{/* Чат контейнер */}
					<div className="flex-col-reverse h-[calc(100vh-270px)] space-y-4 overflow-y-auto p-10 bg-[#f5f8fb] rounded-[10px_10px_0px_0px]">
						{/* Кнопка "Загрузить больше" */}
						{/* <div className="w-full flex justify-center">
							<div className="h-8 w-32 bg-gray-200 animate-pulse rounded"></div>
						</div> */}

						{/* Сообщения */}
						{
						// [1, 2, 3].map(i => (
						// 	<div key={i} className="mb-4 flex items-start justify-end">
						// 		<div className="flex mb-10">
						// 			<div className="flex flex-col items-end">
						// 				{/* Заголовок сообщения */}
						// 				<div className="flex items-center mb-1">
						// 					<div className="h-4 w-16 bg-gray-200 animate-pulse rounded mr-2"></div>
						// 					<div className="h-4 w-32 bg-gray-200 animate-pulse rounded"></div>
						// 				</div>
						// 				{/* Тело сообщения */}
						// 				<div className="bg-gray-200 animate-pulse rounded-lg rounded-tr-none p-3 w-[250px]">
						// 					<div className="h-4 w-full bg-gray-300 rounded mb-2"></div>
						// 					<div className="h-4 w-3/4 bg-gray-300 rounded"></div>
						// 					<div className="h-3 w-16 bg-gray-300 rounded mt-3 ml-auto"></div>
						// 				</div>
						// 			</div>
						// 		</div>
						// 	</div>
						// ))
						<div className='w-full flex justify-center items-center'><Spin></Spin>
							</div>
						}
					</div>

					{/* Форма ввода */}
				</div>
			</div>
			<div className=" col-span-2  w-full flex justify-center flex-wrap ">
				<Form className="flex w-full flex-wrap">
					<div className="flex w-full mt-4">
						<InputText disabled={true} />
					</div>
				</Form>
			</div>
		</>
	)
}

export default ChatSkeleton
