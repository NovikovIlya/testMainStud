// import { DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons'
// import { Button, Form, Input, InputNumber, Popconfirm, Spin } from 'antd'
// import { t } from 'i18next'
// import { useState } from 'react'

// import {
// 	useDeleteAccMutation,
// 	useFinalVerifyMutation,
// 	useGetEmailQuery,
// 	useGetPhoneUserQuery,
// 	usePostEmailMutation,
// 	usePostPhoneMutation,
// 	useVerifyAccMutation
// } from '../../../../store/api/serviceApi'

// const NumberDataBloc = ({ isLoadingPost, sortedEmails, sendVer, handleDeleteEmail, showModal }: any) => {
// 	const [detectedCountry, setDetectedCountry] = useState<string>('')

// 	// Common country codes and their names
// 	const countryPrefixes: { [key: string]: string } = {
// 		'1': t('us_ca') + t('warningNumber'),
// 		'7': t('ru_kz'),
// 		'33': t('fr') + t('warningNumber'),
// 		'34': t('es') + t('warningNumber'),
// 		'39': t('it') + t('warningNumber'),
// 		'44': t('uk') + t('warningNumber'),
// 		'46': t('se') + t('warningNumber'),
// 		'49': t('de') + t('warningNumber'),
// 		'81': t('jp') + t('warningNumber'),
// 		'86': t('cn') + t('warningNumber'),
// 		'91': t('in') + t('warningNumber'),
// 		'351': t('pt') + t('warningNumber'),
// 		'380': t('ua') + t('warningNumber'),
// 		'375': t('by') + t('warningNumber'),
// 		'89': t('country') + t('notAllow') + t('warningNumber')
// 	}

// 	const detectCountry = (phoneNumber: string): string => {
// 		// Remove any non-digit characters
// 		const cleanNumber = phoneNumber.replace(/\D/g, '')

// 		// Try matching longer prefixes first
// 		for (let length = 3; length >= 1; length--) {
// 			const prefix = cleanNumber.slice(0, length)

// 			if (countryPrefixes[prefix]) {
// 				return `${prefix === '89' ? '' : t('country') + ':'}  ${countryPrefixes[prefix]}`
// 			}
// 		}

// 		return t('countryNotDetermined')
// 	}

// 	const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// 		const value = e.target.value
// 		const country = detectCountry(value)
// 		setDetectedCountry(value === '' ? '' : country)
// 	}

// 	return (
// 		<Spin spinning={isLoadingPost}>
// 			<div className="">
// 				<div className=" mx-auto bg-white rounded-xl shadow-md overflow-hidden">
// 					<div className="p-6">
// 						<h1 className="mb-4">{t('telephoneBtn')}:</h1>

// 						<div className="space-y-3 mb-6">
// 							{sortedEmails?.map((item: any, index: number) => (
// 								<div
// 									key={item.id || index}
// 									className="flex items-center justify-between p-3 bg-gray-50 rounded-lg group hover:bg-gray-100 transition-colors"
// 								>
// 									<span className="text-gray-700">
// 										<a href={`tel:+${item.phone}`}>{item.phone}</a>
// 									</span>
// 									<div className="flex gap-3">
// 										<span className="text-gray-400">
// 											{item.verified ? (
// 												t('verification')
// 											) : (
// 												<div
// 													className="cursor-pointer shadow-sm"
// 													onClick={() => {
// 														console.log('item', item)
// 														const num = detectCountry(item.phone)

// 														console.log('num', num)
// 														// if(num !== 'Страна:  Россия/Казахстан'){
// 														// 	console.log('asd')
// 														// 	setDetectedCountry(num);
// 														// 	return
// 														// }
// 														sendVer(item.id)
// 													}}
// 												>
// 													{t('requiredVerification')}
// 												</div>
// 											)}
// 										</span>
// 										<Popconfirm
// 											title={t('deleteEducationTitle')}
// 											description={t('deleteEducationDescription')}
// 											onConfirm={() => {
// 												handleDeleteEmail(item.id)
// 											}}
// 										>
// 											<DeleteOutlined className="" />
// 										</Popconfirm>
// 									</div>
// 								</div>
// 							))}
// 						</div>

// 						<div className="flex gap-2">
// 							<Form.Item
// 								name={'inputText'}
// 								className="p-0 w-full"
// 								// rules={[
// 								// 	{
// 								// 		pattern: /^\d{11,13}$/,
// 								// 		message: t('validNumber')
// 								// 	}

// 								// ]}
// 							>
// 								<Input
// 									allowClear
// 									type="number"
// 									// maxLength={12}

// 									placeholder={t('addNumber')}
// 									className="w-full  h-[40px] flex items-center rounded-lg border-gray-300 shadow-sm  bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
// 									onChange={handlePhoneChange}
// 								/>
// 							</Form.Item>

// 							<Button htmlType="submit" className="h-[40px] flex items-center">
// 								<PlusCircleOutlined className=" " />
// 								<span>{t('addBtn')}</span>
// 							</Button>
// 						</div>
// 						{detectedCountry ? <div className="text-sm text-gray-500 mt-1 ml-1">{detectedCountry}</div> : ''}
// 					</div>
// 				</div>
// 			</div>
// 		</Spin>
// 	)
// }

// export default NumberDataBloc





import { DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons'
import { Button, Form, Input, Popconfirm, Select, Spin, Switch, Tooltip } from 'antd'
import { t } from 'i18next'
import { useState } from 'react'
import { useSetMainPhoneMutation, useSetPhoneMarkerMutation } from '../../../../store/api/serviceApi'


const NumberDataBloc = ({ isLoadingPost, sortedEmails, sendVer, handleDeleteEmail, showModal,textForm,detectedCountry,setDetectedCountry }: any) => {
	
	const [setMain,{isLoading:isLoadingMain}] = useSetMainPhoneMutation()
	const [setMarker,{isLoading}] = useSetPhoneMarkerMutation()

	// Common country codes and their names
	const countryPrefixes: { [key: string]: string } = {
		'1': t('us_ca') + t('warningNumber'),
		'7': t('ru_kz'),
		'33': t('fr') + t('warningNumber'),
		'34': t('es') + t('warningNumber'),
		'39': t('it') + t('warningNumber'),
		'44': t('uk') + t('warningNumber'),
		'46': t('se') + t('warningNumber'),
		'49': t('de') + t('warningNumber'),
		'81': t('jp') + t('warningNumber'),
		'86': t('cn') + t('warningNumber'),
		'91': t('in') + t('warningNumber'),
		'351': t('pt') + t('warningNumber'),
		'380': t('ua') + t('warningNumber'),
		'375': t('by') + t('warningNumber'),
		'89': t('country') + t('notAllow') + t('warningNumber')
	}

	const detectCountry = (phoneNumber: string): string => {
		// Remove any non-digit characters
		const cleanNumber = phoneNumber.replace(/\D/g, '')

		// Try matching longer prefixes first
		for (let length = 3; length >= 1; length--) {
			const prefix = cleanNumber.slice(0, length)

			if (countryPrefixes[prefix]) {
				return `${prefix === '89' ? '' : t('country') + ':'}  ${countryPrefixes[prefix]}`
			}
		}

		return t('countryNotDetermined')
	}

	const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value
		const country = detectCountry(value)
		setDetectedCountry(value === '' ? '' : country)
	}

	const handleMarkerChange = (phoneId: any, marker: string) => {
		setMarker({
			id: phoneId,
			marker: marker
		})
	}

	return (
		<Spin spinning={isLoadingPost || isLoadingMain || isLoading}>
			<div className="mb-[16px]">
				<div className=" mx-auto bg-white rounded-xl shadow-md overflow-hidden">
					<div className="p-6">
						<h1 className="mb-4">{t('telephoneBtn')}:</h1>

						<div className="space-y-3 mb-6">
							{sortedEmails?.map((item: any, index: number) => (
								<div
									key={item.id || index}
									className="flex items-center justify-between p-3 bg-gray-50 rounded-lg group hover:bg-gray-100 transition-colors"
								>
									<span className="text-gray-700">
										<a href={`tel:+${item.phone}`}>{item.phone}</a>
									</span>
									<div className="flex gap-3">
										<span className="text-gray-400">
											{item.verified ? (
												<div className="flex items-center gap-2">
													<Select
														placeholder="Выберите тип"
														value={item.marker || null}
														className="!w-[150px]"
														onChange={(value) => handleMarkerChange(item.id, value)}
														options={[
																{ value: null, label: '' },
																{ value: 'PRIVATE', label: t('private') },
																{ value: 'WORK', label: t('working') },
																{ value: 'ADDITIONAL', label: t('additional') },
														]}
													/>
													{/* <div>|</div> */}
													{/* <Tooltip title={t('textMainAboutMe')}> */}
														<Switch 
															disabled={item?.isMain}
															value={item?.isMain}
															onChange={() => {
																if(item?.isMain){
																	return
																}
																 setMain(item.id)
															}}
														/>
													{/* </Tooltip> */}
												</div>
											) : (
												<div
													className="cursor-pointer shadow-sm"
													onClick={() => {
														const num = detectCountry(item.phone)
														console.log('num', num)
														sendVer(item.id)
													}}
												>
													{t('requiredVerification')}
												</div>
											)}
										</span>
										{item?.isMain ? '' : <Popconfirm
											title={t('deleteEducationTitle')}
											description={t('deleteEducationDescription')}
											onConfirm={() => {
												handleDeleteEmail(item.id)
											}}
										>
											<DeleteOutlined className="" />
										</Popconfirm>}
									</div>
								</div>
							))}
						</div>

						<div className="flex gap-2">
							<Form.Item
								name={'inputText'}
								className="p-0 w-full"
								// rules={[
								// 	{
								// 		pattern: /^\d{11,13}$/,
								// 		message: t('validNumber')
								// 	}

								// ]}
							>
								<Input
									allowClear
									
									// maxLength={12}
									onKeyPress={e => {
										if (!/[0-9]/.test(e.key)) {
											e.preventDefault() // Блокируем ввод нецифровых символов
										}
									}}
									placeholder={t('addNumber')}
									className="w-full  h-[40px] flex items-center rounded-lg border-gray-300 shadow-sm  bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
									onChange={handlePhoneChange}
								/>
							</Form.Item>

							<Button disabled={!textForm} htmlType="submit" className="h-[40px] flex items-center">
								<PlusCircleOutlined className=" " />
								<span>{t('addBtn')}</span>
							</Button>
						</div>
						{detectedCountry ? <div className="text-sm text-gray-500 mt-1 ml-1">{detectedCountry}</div> : ''}
					</div>
				</div>
			</div>
		</Spin>
	)
}

export default NumberDataBloc

