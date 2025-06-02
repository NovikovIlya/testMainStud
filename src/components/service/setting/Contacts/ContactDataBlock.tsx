import { DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons'
import { Button, Form, Input, Popconfirm, Select, Spin } from 'antd'
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
									<a href={`mailto:${email.email}`} className="text-gray-700 hover:text-blue-600 transition-colors">{email.email}</a>
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
												t('verification')
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
											<button
											type="button"
											// onClick={() => handleDeleteEmail(email.id)}
											className="text-gray-400 hover:text-red-500 transition-colors border-none"
											aria-label="Удалить"
										>
											<DeleteOutlined className="" />
										</button>
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






// import { DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons'
// import { Button, Form, Input, Popconfirm, Select, Spin, Switch, Tooltip } from 'antd'
// import { useTranslation } from 'react-i18next'

// import { useSetEmailMarkerMutation, useSetMainEmailMutation } from '../../../../store/api/serviceApi'

// const ContactDataBlock = ({ isLoadingPost, sortedEmails, sendVer, handleDeleteEmail, showModal }: any) => {
// 	const { t } = useTranslation()
// 	const [setMainMail,{isLoading:isLoadingMail}] = useSetMainEmailMutation()
// 	const [setMarker,{isLoading}] = useSetEmailMarkerMutation()

// 	const handleMarkerChange = (emailId: number, marker: string) => {
// 		setMarker({
// 			id: emailId,
// 			marker: marker
// 		})
// 	}

// 	const getSortedEmails = () => {
// 		if (!sortedEmails) return []
		
// 		return [...sortedEmails].sort((a, b) => {
// 			// Если a корпоративный, а b нет - a идет первым
// 			if (a.isCorporative && !b.isCorporative) return -1
// 			// Если b корпоративный, а a нет - b идет первым
// 			if (!a.isCorporative && b.isCorporative) return 1
// 			// Если оба одинакового типа - сохраняем исходный порядок
// 			return 0
// 		})
// 	}

// 	return (
// 		<Spin spinning={isLoadingPost || isLoading || isLoadingMail}>
// 			<div className="animate-fade-in">
// 				<div className=" mx-auto bg-white rounded-xl shadow-md overflow-hidden">
// 					<div className="p-6">
// 						<h1 className="mb-4">{t('privateMail')}:</h1>
// 						{/* Список почт */}
// 						<div className="space-y-3 mb-6">
// 							{getSortedEmails()?.map((email: any, index: number) => (
// 								<div
// 									key={email.id || index}
// 									className={`${email.isCorporative ? 'border-l-1 border-l-blue65A border-r-0 border-t-0 border-b-0 border-solid ' :''} flex items-center justify-between p-3 bg-gray-50 rounded-lg group hover:bg-gray-100 transition-colors`}
// 								>
// 									<a href={`mailto:${email.email}`} className=" hover:text-blue-600 transition-colors">{email.email}</a>

// 									<div className="flex gap-3">
// 										<span className="text-gray-400">
// 											{email.verified ? (
// 												<div className="flex items-center gap-2">
// 													{email.isCorporative ? '' : 
// 														<Select
// 															placeholder="Выберите тип"
// 															value={email.marker || null}
// 															className="!w-[150px]"
// 															onChange={(value) => handleMarkerChange(email.id, value)}
// 															options={[
// 																{ value: null, label: '' },
// 																{ value: 'PRIVATE', label: 'Личный' },
// 																{ value: 'WORK', label: 'Рабочий' },
// 																{ value: 'ADDITIONAL', label: 'Дополнительный' },
// 															]}
// 														/>
// 													}
// 													{/* {email.isCorporative ? '' : <div>|</div>} */}
// 													{/* <Tooltip title={t('textMainAboutMe')}> */}
// 														<Switch
// 															disabled={email?.isMain}
// 															value={email?.isMain}
// 															onChange={() => {
// 																if(email?.isMain){
// 																	return
// 																}
// 																setMainMail(email.id)
// 															}}
// 														/>
// 													{/* </Tooltip> */}
// 												</div>
// 											) : (
// 												<div className="cursor-pointer shadow-sm" onClick={() => sendVer(email.id)}>
// 													{t('requiredVerification')}
// 												</div>
// 											)}
// 										</span>
// 										{email.isCorporative || email.isMain ? '' : 
// 											<Popconfirm
// 												title={t('deleteEducationTitle')}
// 												description={t('deleteEducationDescription')}
// 												onConfirm={() => {
// 													handleDeleteEmail(email.id)
// 												}}
// 											>
// 												<DeleteOutlined className="" />
// 											</Popconfirm>
// 										}
// 									</div>
// 								</div>
// 							))}
// 						</div>

// 						{/* Форма добавления */}
// 						<div className="flex gap-2">
// 							<Form.Item
// 								name={'inputText'}
// 								className="p-0 w-full"
// 								rules={[
// 									// { required: true, message: 'Пожалуйста, введите электронную почту!' },
// 									{ type: 'email', message: 'Введите корректный адрес электронной почты!' }
// 								]}
// 							>
// 								<Input
// 									type="email"
// 									placeholder={t('putYourEmail')}
// 									className="flex-1 rounded-lg border-gray-300 shadow-sm px-4 py-2 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
// 								/>
// 							</Form.Item>
		
// 							<Button
// 								// onClick={handleAddEmail}
// 								htmlType="submit"
// 								className="h-[40px] flex items-center"
// 							>
// 								<PlusCircleOutlined className=" " />
// 								<span>{t('addBtn')}</span>
// 							</Button>
// 						</div>
// 					</div>
// 				</div>
// 			</div>
// 		</Spin>
// 	)
// }

// export default ContactDataBlock

