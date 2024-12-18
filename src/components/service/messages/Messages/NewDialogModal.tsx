import { useDebounce } from 'ahooks'
import { AutoComplete, Button, Form, Modal, Spin } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { t } from 'i18next'
import { useEffect, useState } from 'react'

import { useAppDispatch, useAppSelector } from '../../../../store'
import {
	useAddNewChatMutation, useGetUsersMessagesQuery
} from '../../../../store/api/messages/messageApi'
import { ContentWithinBrackets, extractContentWithinBrackets, hasBrackets } from '../../../../utils/extractBrackets'
import { showNotification } from '../../../../store/reducers/notificationSlice'

export const NewDialogModal = ({ isModalOpen, onCancel }: any) => {
	const user = useAppSelector(state => state.auth.user)
	const [form] = Form.useForm()
	const student = Form.useWatch('student', form)
	const [id, setId] = useState(null)
	const debouncedNameStudent = useDebounce(student, { wait: 1000 })
	const { data: dataGetStudents, isFetching } = useGetUsersMessagesQuery(hasBrackets(debouncedNameStudent)
	? hasBrackets(ContentWithinBrackets(debouncedNameStudent))
		? ContentWithinBrackets(ContentWithinBrackets(debouncedNameStudent))
		: ContentWithinBrackets(debouncedNameStudent)
	: debouncedNameStudent, 
	{skip: !debouncedNameStudent || debouncedNameStudent.length < 4 || !isModalOpen})
	const [newChat] = useAddNewChatMutation()
	const [load, setIsload] = useState(false)
	const [dataGetStudentsValue, setdataGetStudentsValue] = useState<any>([])
	const [flag, setFlag] = useState(false)
	const [type,setType] = useState(null)
	const dispatch = useAppDispatch()

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

				setdataGetStudentsValue([])
				setFlag(false)
			})
			.catch(err => {
				console.log(err)
				
				setIsload(false)
				onCancel()
				form.resetFields()
				dispatch(
					showNotification({
						message: `Такой диалог уже создан`,
						type: 'error'
					})
				)

				setdataGetStudentsValue([])
				setFlag(false)
			})
	}

	const isButtonDisabled = () => {
		const filledCount = [
			form.getFieldValue('student')
		].filter(Boolean)

		return filledCount.length !== 1 || !id
	}

	return (
		<>
			{load ? <Spin fullscreen spinning/>: 
				(<Modal
					maskClosable={false}
					className="p-12 !min-w-[400px] !w-5/12"
					title={t('SelectUser')}
					open={isModalOpen}
					onCancel={() => {
						onCancel()
						form.resetFields()
						setdataGetStudentsValue([])
						setFlag(false)
						}
					}
					footer={null}
				>
					<Form
						labelCol={{ span: 6 }}
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
										}
									}
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
																	{student?.name}
															</div>
															<div style={{ fontSize: '12px', color: '#888' }}>
															{student?.userInfo}
															</div>
														</div>
													)
											  }))
									}
									onSelect={(value, option) => {
											setId(option.id)
											setType(option.userType)
										}
									}
								/>
							}
						</Form.Item>

						<Form.Item label={t('message')} name="text">
							<TextArea 	maxLength={75}  required placeholder={t('inputMessage')} />
						</Form.Item>

						<div className="w-full flex justify-center">
							<Button
								type="primary"
								className="!rounded-full  h-10"
								loading={load}
								disabled={isButtonDisabled()}
								htmlType="submit"
							>
								{t('createDialog')}
							</Button>
						</div>

						{/* {isButtonDisabled() && <div className="w-full text-center mt-2">Необходимо выбрать только одну роль</div>} */}
					</Form>
				</Modal>)
			}
		</>
	)
}
