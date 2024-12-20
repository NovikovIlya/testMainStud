import { DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons'
import { Button, Form, Input, InputNumber, Spin } from 'antd'
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
import { t } from 'i18next'

const NumberDataBloc = ({isLoadingPost, sortedEmails, sendVer, handleDeleteEmail, showModal }: any) => {
	
    
	return (
		<Spin spinning={isLoadingPost}>
            <div className="">
			<div className=" mx-auto bg-white rounded-xl shadow-md overflow-hidden">
				<div className="p-6">
					<h1 className='mb-4'>{t('telephoneBtn')}:</h1>
					
					<div className="space-y-3 mb-6">
						{sortedEmails?.map((item: any, index: number) => (
							<div
								key={item.id || index}
								className="flex items-center justify-between p-3 bg-gray-50 rounded-lg group hover:bg-gray-100 transition-colors"
							>
								<span className="text-gray-700">
								<a href={`tel:+${item.phone}`}>
									{item.phone}
									</a>
									</span>
								<div className="flex gap-3">
									<span className="text-gray-400">
										{item.verified ? (
											t('verification')
										) : (
											<div className="cursor-pointer shadow-sm" onClick={() => sendVer(item.id)}>
												{t('requiredVerification')}
											</div>
										)}
									</span>
									<button
										type="button"
										onClick={() => handleDeleteEmail(item.id)}
										className="text-gray-400 hover:text-red-500 transition-colors border-none"
										aria-label="Удалить"
									>
										<DeleteOutlined className="" />
									</button>
								</div>
							</div>
						))}
					</div>


					<div className="flex gap-2">
						<Form.Item
							name={'inputText'}
							className="p-0 w-full"
							rules={[
								{
									pattern: /^7\d{0,11}$/,
									message: 'Номер должен начинаться с 7 и содержать до 11 цифр'
								}
						
							]}
						>
							<Input 
								type='number'
								maxLength={12}
								placeholder={t('addNumber')}
								className="w-full  h-[40px] flex items-center rounded-lg border-gray-300 shadow-sm  bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
							/>
						</Form.Item>

						<Button
						
							htmlType="submit"
							className="h-[40px] flex items-center"
						>
							<PlusCircleOutlined className=" " />
							<span>{t('addBtn')}</span>
						</Button>
					</div>
				</div>
			</div>
		</div>
        </Spin>
	)
}

export default NumberDataBloc
