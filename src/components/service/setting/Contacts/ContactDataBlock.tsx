import { DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons'
import { Button, Form, Input, Popconfirm, Select, Spin, Switch, Tooltip } from 'antd'
import { useTranslation } from 'react-i18next'

const ContactDataBlock = ({ isLoadingPost, sortedEmails, sendVer, handleDeleteEmail, showModal }: any) => {
	const { t } = useTranslation()

	return (
		<Spin spinning={isLoadingPost}>
			<div className="">
				<div className=" mx-auto bg-white rounded-xl shadow-md overflow-hidden">
					<div className="p-6">
						<h1 className="mb-4">{t('privateMail')}:</h1>
						{/* Список почт */}
						<div className="space-y-3 mb-6">
							{sortedEmails?.map((email: any, index: number) => (
								<div
									key={email.id || index}
									className="flex items-center justify-between p-3 bg-gray-50 rounded-lg group hover:bg-gray-100 transition-colors"
								>
									<span className="text-gray-700">{email.email}</span>
									{/* <Select
									defaultValue="lucy"
									className='w-[30%]'
									
									options={[
									{ value: 'jack', label: 'Личный' },
									{ value: 'lucy', label: 'Рабочий' },
									{ value: 'Yiminghe', label: 'Дополнительный' },
									{ value: 'disabled', label: 'Контактный'},
									{ value: 'disabled', label: 'SMS'},
									]}
								/> */}
									<div className="flex gap-3">
										<span className="text-gray-400">
											{email.verified ? (
												<div className="flex items-center gap-2">
													<Form.Item name={'inputType'} className="flex h-full items-center m-0">
														<Select
															placeholder="Выберите тип"
															defaultValue={null}
															className="!w-[150px] "
															options={[
																{ value: null, label: '' },
																{ value: 'lucy', label: 'Рабочий' },
																{ value: 'Yiminghe', label: 'Дополнительный' },
																{ value: 'disabled', label: 'Контактный' },
																{ value: 'disabled', label: 'SMS' }
															]}
														/>
													</Form.Item>
													<div>|</div>
													<Form.Item name={'switcher'} className="flex h-full items-center m-0">
														<Tooltip title="prompt text">
															<Switch />
														</Tooltip>
													</Form.Item>
												</div>
											) : (
												<div className="cursor-pointer shadow-sm" onClick={() => sendVer(email.id)}>
													{t('requiredVerification')}
												</div>
											)}
										</span>
										<Popconfirm
											title={t('deleteEducationTitle')}
											description={t('deleteEducationDescription')}
											onConfirm={() => {
												handleDeleteEmail(email.id)
											}}
										>
											
										
											<DeleteOutlined className="" />
										
										</Popconfirm>
										
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
									placeholder={t('putYourEmail')}
									className="flex-1 rounded-lg border-gray-300 shadow-sm px-4 py-2 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
								/>
							</Form.Item>
							{/* <Form.Item
							name={'inputType'}
							className=""
							rules={[
								{ type: 'email', message: 'Введите тип!' }
							]}
						>
						<Select
									defaultValue="lucy"
									className='!w-[150px] h-[40px]'
									
									options={[
									{ value: 'jack', label: 'Личный' },
									{ value: 'lucy', label: 'Рабочий' },
									{ value: 'Yiminghe', label: 'Дополнительный' },
									{ value: 'disabled', label: 'Контактный'},
									{ value: 'disabled', label: 'SMS'},
									]}
								/>
								</Form.Item> */}
							<Button
								// onClick={handleAddEmail}
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

export default ContactDataBlock
