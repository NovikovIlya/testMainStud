import { useDebounce } from 'ahooks'
import { AutoComplete, Button, Form, Modal, Skeleton, Spin } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { t } from 'i18next'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useAppDispatch, useAppSelector } from '../../../../store'
import { apiSlice } from '../../../../store/api/apiSlice'
import {
	useAddNewChatMutation,
	useGetEmployeesMessageQuery,
	useGetStudentsMessaageQuery,
	useGetUsersMessagesQuery
} from '../../../../store/api/messages/messageApi'
import { ContentWithinBrackets, extractContentWithinBrackets, hasBrackets } from '../../../../utils/extractBrackets'

export const NewDialogModal = ({ isModalOpen, onCancel }: any) => {
	const user = useAppSelector(state => state.auth.user)
	const [form] = Form.useForm()
	const teacher = Form.useWatch('teacher', form)
	const student = Form.useWatch('student', form)
	const [id, setId] = useState(null)
	const debouncedNameEmployee = useDebounce(teacher, { wait: 1000 })
	const debouncedNameStudent = useDebounce(student, { wait: 1000 })
	const { data: dataGetStudents, isFetching } = useGetUsersMessagesQuery(debouncedNameStudent, {skip: !debouncedNameStudent || debouncedNameStudent.length < 4 || !isModalOpen})
	const [newChat, { isLoading: isLoadingNew }] = useAddNewChatMutation()
	const [load, setIsload] = useState(false)
	const [dataGetStudentsValue, setdataGetStudentsValue] = useState<any>([])
	const [flag, setFlag] = useState(false)
	const [type,setType] = useState(null)

	useEffect(() => {
		if (dataGetStudents) {
			setdataGetStudentsValue(dataGetStudents)
			setFlag(true)
		}
	}, [dataGetStudents])

	const handleSearch = (value: string, field: string) => {
		if (value.length < 4) {
			form.setFields([
				{
					name: field,
					errors: ['Введите минимум 4 символа']
				}
			])
			setdataGetStudentsValue([])
			setFlag(false)
		} else {
			form.setFields([
				{
					name: field,
					errors: []
				}
			])
		}
	}
	console.log('type',type)
	const onFinish = () => {
		setIsload(true)
		const obj = {
			message: form.getFieldValue('text'),
			senderName: `${user.lastname} ${user.firstname} ${user.middlename}`,
			recipientType: type,
			recipientName: form.getFieldValue('student'),
			recipientId: id
		}
		newChat(obj)
			.unwrap()
			.then(() => {
				form.resetFields()
				onCancel()
				setIsload(false)
			})
			.catch(err => {
				console.log(err)
			})
	}



	const isButtonDisabled = () => {
		const filledCount = [
			form.getFieldValue('graduate'),
			form.getFieldValue('teacher'),
			form.getFieldValue('student')
		].filter(Boolean)

		return filledCount.length !== 1 || !id
	}

	return (
		<>
			{load ? (
				<Spin fullscreen spinning={true} className="!z-[10000000000000000000]" />
			) : (
				<Modal
					maskClosable={false}
					className="p-12 !min-w-[400px] !w-6/12"
					title={t('SelectUser')}
					open={isModalOpen}
					onCancel={() => {
						onCancel()
						form.resetFields()
						setdataGetStudentsValue([])
						setFlag(false)
					}}
					footer={null}
				>
					<Form
						labelCol={{ span: 5 }}
						wrapperCol={{ span: 18 }}
						form={form}
						onFinish={onFinish}
						className="flex justify-center flex-col "
					>
						<Form.Item
							help={student && student.length < 4 ? 'Введите минимум 4 символа' : ''}
							validateStatus={student && student.length < 4 ? 'error' : ''}
							className="mt-6"
							label={t('user')}
							name="student"
						>
							{
								<AutoComplete
									onChange={value => handleSearch(value, 'student')}
									allowClear
									disabled={form.getFieldValue('graduate') || form.getFieldValue('teacher')}
									placeholder={t('inputFio')}
									onClear={() => {
										setdataGetStudentsValue([])
										setFlag(false)
									}}
									options={
										isFetching
											? [
													{
														value: 'NULL',
														disabled: true,
														label: (
															<div className="flex items-center justify-center w-full h-[100px]">
																<Spin size="large" />
															</div>
														)
													}
											  ]
											: flag && dataGetStudentsValue?.length === 0
											? [
													{
														value: 'NULL',
														disabled: true,
														label: <div className="flex items-center justify-center w-full h-[100px]">Не найден</div>
													}
											  ]
											: dataGetStudentsValue?.map((student: any) => ({
													key: student.id,
													value: student.name,
													id: student.id,
													userType:student.userType,
													label: (
														<div>
															<div className="">
																{hasBrackets(student.name)
																	? hasBrackets(ContentWithinBrackets(student.name))
																		? ContentWithinBrackets(ContentWithinBrackets(student.name))
																		: ContentWithinBrackets(student.name)
																	: student.name}
															</div>
															<div style={{ fontSize: '12px', color: '#888' }}>
																{hasBrackets(student.name) ? extractContentWithinBrackets(student.name) : ''}
															</div>{' '}
															{/* Дополнительная информация */}
														</div>
													)
											  }))
									}
									// dropdownRender={(menu) => (
									// 	<>

									// 		<div className='flex flex-col gap-2 whitespace-normal border-b-2'>
									// 		{menu}
									// 		</div>
									// 	</>
									// )}
									onSelect={(value, option) => {
										setId(option.id)
										setType(option.userType)
									}}
									// notFoundContent={isFetching ? <Spin className='w-full flex justify-center' size="small" /> : null}
								/>
							}
						</Form.Item>

						{/* <Form.Item label="Сотрудник" name="teacher">
					<AutoComplete
						allowClear
						disabled={form.getFieldValue('graduate') || form.getFieldValue('student')}
						placeholder="Введите ФИО"
						options={dataGetEmployees?.map((employee: any) => ({
							value: employee.name,
							id: employee.id
						}))}
						onSelect={(value, option) => {
							setId(option.id)
						}}
					/>
				</Form.Item> */}

						{/*<Form.Item label="Аспирант" name="graduate">
					<AutoComplete
						allowClear
						disabled={form.getFieldValue('student') || form.getFieldValue('teacher')}
						placeholder="Введите ФИО"
						options={dataGetEmployees?.map((employee: any) => ({
							value: employee.name,
							id: employee.id
						}))}
						onSelect={(value, option) => {
							setId(option.id)
						}}
					/>
				</Form.Item> */}

						<Form.Item label={t('message')} name="text">
							<TextArea required placeholder={t('inputMessage')} />
						</Form.Item>

						<div className="w-full flex justify-center">
							<Button
								type="primary"
								className="!rounded-full  h-10"
								loading={isLoadingNew}
								disabled={isButtonDisabled()}
								htmlType="submit"
							>
								{t('createDialog')}
							</Button>
						</div>

						{/* {isButtonDisabled() && <div className="w-full text-center mt-2">Необходимо выбрать только одну роль</div>} */}
					</Form>
				</Modal>
			)}
		</>
	)
}
