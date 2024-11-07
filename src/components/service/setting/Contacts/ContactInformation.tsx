import { Button, Card, Form, Input, Modal, Spin } from 'antd'
import PhoneInput from 'antd-phone-input'
import FormItem from 'antd/es/form/FormItem'
import { useEffect, useState } from 'react'

import {
	useDeleteAccMutation,
	useFinalVerifyMutation,
	useGetEmailQuery,
	useGetPhoneUserQuery,
	usePostEmailMutation,
	usePostPhoneMutation,
	useVerifyAccMutation
} from '../../../../store/api/serviceApi'
import { SkeletonPage } from '../../aboutMe/Skeleton'
import ContactDataBlock from './ContactDataBlock'
import { useInterval, useUpdateEffect } from 'ahooks'
import { useAppDispatch, useAppSelector } from '../../../../store'
import { apiSlice } from '../../../../store/api/apiSlice'
import { showNotification } from '../../../../store/reducers/notificationSlice'

export const ContactInformation = () => {
	const [form] = Form.useForm()
	const { data: dataEmail,isError } = useGetEmailQuery()
	const [postMail,{data: dataPost, isLoading: isLoadingPost,isError: isErrorPost}] = usePostEmailMutation()
	const [sendVerify, { data: dataVer, isLoading: isLoadingVer,isError: isErrorVerif }] = useVerifyAccMutation()
	const [finalVerify, { data: dataFin, isLoading: isLoadingFin }] = useFinalVerifyMutation()
	const [deleteMail] = useDeleteAccMutation()
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [idUser, setIdUser] = useState(null)
	const [count, setCount] = useState(0);
	const dispatch = useAppDispatch()
	const mail = useAppSelector((state)=>state.auth.user?.email)


	useUpdateEffect(()=>{
		if(dataVer){
			setCount(dataVer.cooldownMs / 1000)
		}
	},[dataVer])

	useEffect(()=>{
		if(isErrorPost){
			dispatch(showNotification({
				message: `Такая почта уже занята`,
				type: 'warning'
			}))
		}
	},[isErrorPost])

	useInterval(() => { 
		setCount(count - 1);},
		// Интервал будет работать только когда модальное окно открыто и count > 0
		isModalOpen && count > 0 ? 1000 : undefined
	);

	const onSubmitPhone2 = () => {
		if(dataEmail && dataEmail?.length>10){
			alert('Нельзя добавлять больше 10 почт.')
			return
		}
		const text = form.getFieldValue('inputText')
		if(!text){
			alert('Напишите почту')
			return
		}
		postMail({ email: text }).unwrap().then(res => sendVerOne(res.id))
		form.setFieldValue('inputText', '')
	}

	const handleDeleteEmail = (id: any) => {
		deleteMail(id)
	}

	const showModal = () => {
		setIsModalOpen(true)
	}


	const handleCancel = () => {
		setIsModalOpen(false)
		form.setFieldValue('code', '')
		setCount(0); 
		dispatch(apiSlice.util.resetApiState())
	}

	const sendVer = (id: any) => {
		showModal()
		setIdUser(id)
		// отправить код
		sendVerify(id)
	}

	const sendVerOne = (id: any) => {
		showModal()
		setIdUser(id)
		setCount(60)

	
	}
	
	const finalFnVer = () => {
		const code = form.getFieldValue('code')

		if(!code){
			alert('Введите код')
		}
		
		finalVerify({
			id: idUser,
			otp: code
		})
	}

	const sortedEmails = dataEmail?.slice().sort((a:any, b:any) => {
		return b.verified === a.verified ? 0 : b.verified ? 1 : -1
	})

	if (isError) return <></>
	if (dataEmail === undefined ) return <SkeletonPage />

	return (
	
		<Form form={form} onFinish={onSubmitPhone2}>
			<section className="max-w-2xl">
				<h3 className="text-black text-2xl font-bold leading-normal">Контактные данные</h3>
				<Card className='bg-white rounded-xl shadow-md overflow-hidden mt-4 '>
					<h3>Основная почта:</h3>
					<div className='bg-gray-50 rounded-lg mt-2 p-3'>
						<a href={`mailto:${mail}`}>{mail}</a>
								
					</div>
				</Card>
				<article className=" mt-10">
					<ContactDataBlock isLoadingPost={isLoadingPost} sortedEmails={sortedEmails} sendVer={sendVer} handleDeleteEmail={handleDeleteEmail} showModal={showModal}/>
				</article>
			</section>
			<Modal   maskClosable={false}  title="Верификация почты" footer={null} open={isModalOpen} onCancel={handleCancel}>
			{isErrorVerif ? "Пожалуйста повторите позже, запрос на следующее подтвеждение будет доступен через 1 минуту" :
				<Spin  spinning={isLoadingVer || isLoadingFin}>
					{count <= 0 ? <div>{!isLoadingVer ? 'Время истекло, повторите попытку позже' : 'Идет загрузка...'}</div>:
					<>
					{dataFin?.verified ? <div className='text-center'>Верификация пройдена успешна!</div>:<>
					<p>Оставшееся время: {count}</p> 
					<p className="mb-2">На вашу почту отправлен код! Скопируйте его и напишите в поле ниже:</p>
					<Form.Item name={'code'} >
						<Input.OTP length={4}  />
					</Form.Item>
					<Button className="w-full" onClick={finalFnVer}>
						Подтвердить
					</Button></>} 
					</>}
				</Spin>
				}
			</Modal>
		</Form>

	)
}
