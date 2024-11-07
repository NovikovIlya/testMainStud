import { DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons'
import { Button, Form, Input, Spin } from 'antd'
import { useState } from 'react'

import {
	useDeleteAccMutation,
	useFinalVerifyMutation,
	useGetEmailQuery,
	useGetPhoneUserQuery,
	usePostEmailMutation,
	usePostPhoneMutation,
	useVerifyAccMutation
} from '../../../../store/api/serviceApi'

const ContactDataBlock = ({isLoadingPost, sortedEmails, sendVer, handleDeleteEmail, showModal }: any) => {
    
	return (
		<Spin spinning={isLoadingPost}>
            <div className="">
			<div className=" mx-auto bg-white rounded-xl shadow-md overflow-hidden">
				<div className="p-6">
					<h1 className='mb-4'>Личная почта:</h1>
					{/* Список почт */}
					<div className="space-y-3 mb-6">
						{sortedEmails?.map((email: any, index: number) => (
							<div
								key={email.id || index}
								className="flex items-center justify-between p-3 bg-gray-50 rounded-lg group hover:bg-gray-100 transition-colors"
							>
								<span className="text-gray-700">{email.email}</span>
								<div className="flex gap-3">
									<span className="text-gray-400">
										{email.verified ? (
											'Верифицирован'
										) : (
											<div className="cursor-pointer shadow-sm" onClick={() => sendVer(email.id)}>
												Требуется верификации
											</div>
										)}
									</span>
									<button
										type="button"
										onClick={() => handleDeleteEmail(email.id)}
										className="text-gray-400 hover:text-red-500 transition-colors border-none"
										aria-label="Удалить"
									>
										<DeleteOutlined className="" />
									</button>
								</div>
							</div>
						))}
					</div>

					{/* Форма добавления */}
					<div className="flex gap-2">
						<Form.Item
							name={'inputText'}
							className="p-0 w-full"
							rules={[
								// { required: true, message: 'Пожалуйста, введите электронную почту!' },
								{ type: 'email', message: 'Введите корректный адрес электронной почты!' }
							]}
						>
							<Input
								type="email"
								placeholder="Введите email"
								className="flex-1 rounded-lg border-gray-300 shadow-sm px-4 py-2 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
							/>
						</Form.Item>

						<Button
							// onClick={handleAddEmail}
							htmlType="submit"
							className="h-[40px] flex items-center"
						>
							<PlusCircleOutlined className=" " />
							<span>Добавить</span>
						</Button>
					</div>
				</div>
			</div>
		</div>
        </Spin>
	)
}

export default ContactDataBlock
