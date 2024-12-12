import { useDebounce } from 'ahooks'
import { AutoComplete, Button, Form, Modal, Skeleton, Spin } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useAppDispatch, useAppSelector } from '../../../../store'
import {
	useAddNewChatMutation,
	useGetEmployeesMessageQuery,
	useGetStudentsMessaageQuery
} from '../../../../store/api/messages/messageApi'
import { apiSlice } from '../../../../store/api/apiSlice'
import { t } from 'i18next'

export const NewDialogModal = ({ isModalOpen, onCancel }: any) => {
	const user = useAppSelector(state => state.auth.user)
	const [form] = Form.useForm()
	const teacher = Form.useWatch('teacher', form)
	const student = Form.useWatch('student', form)
	const graduate = Form.useWatch('graduate', form)
	const [id, setId] = useState(null)
	const debouncedNameEmployee = useDebounce(teacher, { wait: 1000 })
	const debouncedNameStudent = useDebounce(student, { wait: 1000 })
	const debouncedNameAspir = useDebounce(graduate, { wait: 1000 })

	const { data: dataGetEmployees } = useGetEmployeesMessageQuery(debouncedNameEmployee, {skip: !debouncedNameEmployee || debouncedNameEmployee.length < 4 || !isModalOpen})
	const { data: dataGetStudents ,isFetching} = useGetStudentsMessaageQuery(debouncedNameStudent, {skip: !debouncedNameStudent || debouncedNameStudent.length < 4 || !isModalOpen})
	const [newChat, { isLoading: isLoadingNew }] = useAddNewChatMutation()
    const [load,setIsload] = useState(false)
	const dispatch = useAppDispatch()
	const [dataGetStudentsValue,setdataGetStudentsValue] = useState<any>([])
	const [flag,setFlag] = useState(false)

	useEffect(()=>{
		if(dataGetStudents){
			setdataGetStudentsValue(dataGetStudents)
			setFlag(true)
		}
		
	},[dataGetStudents])
	

	const handleSearch = (value: string, field: string) => {
		if (value.length < 4) {
		  form.setFields([{
			name: field,
			errors: ['Введите минимум 4 символа']
		  }]);
		} else {
		  form.setFields([{
			name: field,
			errors: []
		  }]);
		}
	  };
	  

	const onFinish = () => {
		setIsload(true)
		const obj = {
			message: form.getFieldValue('text'),
			senderName: `${user.lastname} ${user.firstname} ${user.middlename}`,
			recipientType: getFilledField() === 'graduate' ? 'graduate' : getFilledField() === 'teacher' ? 'EMPL' : 'STUD',
			recipientName:
				getFilledField() === 'graduate'
					? form.getFieldValue('graduate')
					: getFilledField() === 'teacher'
					? form.getFieldValue('teacher')
					: form.getFieldValue('student'),
			recipientId: id
		}
		newChat(obj)
			.unwrap()
			.then(() => {
				form.resetFields()
				onCancel()
				setIsload(false)
				// dispatch(apiSlice.util.resetApiState())
			})
			.catch(err => {
				console.log(err)
			})
	}

	const getFilledField = () => {
		const graduate = form.getFieldValue('graduate')
		const teacher = form.getFieldValue('teacher')
		const student = form.getFieldValue('student')
		
		if (graduate) return 'graduate'
		if (teacher) return 'teacher'
		if (student) return 'student'
		
		return null // Если ни одно поле не заполнено
	}

	const isButtonDisabled = () => {
		const filledCount = [
			form.getFieldValue('graduate'),
			form.getFieldValue('teacher'),
			form.getFieldValue('student')
		].filter(Boolean)

		return (filledCount.length !== 1) || (!id)
	}
	console.log('flag',flag)
	return (
		<>
		{load ?<Spin fullscreen spinning={true} className='!z-[10000000000000000000]'/> :
		<Modal    maskClosable={false} className="p-12 !min-w-[400px] !w-6/12" title={t('SelectUser')} open={isModalOpen} onCancel={()=>{
				onCancel()
				form.resetFields()
				setdataGetStudentsValue([])
			}} footer={null}>
			
			<Form labelCol={{ span: 5 }} wrapperCol={{ span: 18 }} form={form} onFinish={onFinish} className='flex justify-center flex-col '>
				<Form.Item 
					
					help={student && student.length < 4 ? "Введите минимум 4 символа" : ""}
					validateStatus={student && student.length < 4 ? "error" : ""}
					className="mt-6" label={t('user')} name="student">

					{ <AutoComplete
						onChange={(value) => handleSearch(value, 'student')}
						
						allowClear
						disabled={form.getFieldValue('graduate') || form.getFieldValue('teacher')}
						placeholder="Введите ФИО"
						options={
							isFetching? [
								{
									value: 'NULL',
									disabled: true,
									label: (
										<div className='flex items-center justify-center w-full h-[100px]'>
											<Spin size='large' />
										</div>
									),
								},
						  ]
						:
					(flag &&	dataGetStudentsValue?.length===0 ) ? [
							{
								value: 'NULL',
								disabled: true,
								label: (
									<div className='flex items-center justify-center w-full h-[100px]'>
										Не найден
									</div>
								),
							},
					  ] :	dataGetStudentsValue?.map((student: any) => ({
							value: student.name,
							id: student.id
						}))}
						dropdownRender={(menu) => (
							<>
								
								<div className='flex flex-col gap-2 whitespace-normal border-b-2'>
								{menu}
								</div>
							</>
						)}
						onSelect={(value, option) => {
							setId(option.id)
						}}
						// notFoundContent={isFetching ? <Spin className='w-full flex justify-center' size="small" /> : null}
					/>}
				</Form.Item>

			 <Form.Item label="Сотрудник" name="teacher">
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
				</Form.Item>

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
					<TextArea required placeholder="Введите текст сообщения" />
				</Form.Item>

				<div className="w-full flex justify-center">
					<Button type="primary"
							className="!rounded-full  h-10" loading={isLoadingNew} disabled={isButtonDisabled()} htmlType="submit" >
						{t('createDialog')}
					</Button>
				</div>

				{/* {isButtonDisabled() && <div className="w-full text-center mt-2">Необходимо выбрать только одну роль</div>} */}
			</Form>
		</Modal>}
		</>
	)
}
