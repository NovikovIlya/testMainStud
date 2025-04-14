import { Button, Card, Form, Input, Modal, Row, Spin } from 'antd'
import { useEffect, useState } from 'react'

import {
	useDeleteAccMutation,
	useFinalVerifyMutation,
	useGetEmailQuery, usePostEmailMutation, useVerifyAccMutation
} from '../../../../store/api/serviceApi'
import { SkeletonPage } from '../../aboutMe/Skeleton'
import ContactDataBlock from './ContactDataBlock'
import { useInterval, useUpdateEffect } from 'ahooks'
import { useAppDispatch, useAppSelector } from '../../../../store'
import { apiSlice } from '../../../../store/api/apiSlice'
import { showNotification } from '../../../../store/reducers/notificationSlice'
import { t } from 'i18next'
import Title from 'antd/es/typography/Title'

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
				message: t('errorText'),
				type: 'warning'
			}))
		}
	},[isErrorPost])

	useInterval(() => { 
		setCount(count - 1);
		// Интервал будет работать только когда модальное окно открыто и count > 0, где 1000 - это мс
		}, isModalOpen && (count > 0) ? 1000 : undefined
	);

	const onSubmitPhone2 = () => {
		if(dataEmail && dataEmail?.length>10){
			alert('Нельзя добавлять больше 10 почт.')
			return
		}
		const text = form.getFieldValue('inputText')
		if(!text){
			// alert(t('emailNeed'))
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

	// @ts-ignore
	const sortedEmails = dataEmail?.toSorted((a:any, b:any) => {
		return b.verified === a.verified ? 0 : b.verified ? 1 : -1
	})

	if (isError) return <></>
	if (dataEmail === undefined ) return <div className='mt-[-45px] ml-[-40px]'><SkeletonPage /></div>

	return (
	
		<Form form={form} onFinish={onSubmitPhone2} className='w-full'>
			<Row className="mb-8 flex items-center justify-between mt-6">
			<Title level={2} className='!mb-0'>{t('contactInformation')}</Title></Row>
			<section className=" w-full">
				<Card className='bg-white rounded-xl shadow-md overflow-hidden mt-4 w-full'>
					<h3>{t('mainMail')}</h3>
					<div className='bg-gray-50 rounded-lg mt-2 p-3'>
						<a href={`mailto:${mail}`}>{mail}</a>		
					</div>
				</Card>
				<article className=" mt-10">
					<ContactDataBlock isLoadingPost={isLoadingPost} sortedEmails={sortedEmails} sendVer={sendVer} handleDeleteEmail={handleDeleteEmail} showModal={showModal}/>
				</article>
			</section>
			<Modal   maskClosable={false}  title="" footer={null} open={isModalOpen} onCancel={handleCancel}>
			{isErrorVerif ? t('verErr') :
				<Spin  spinning={isLoadingVer || isLoadingFin}>
					{count <= 0 ? <div>{!isLoadingVer ? t('verText3') : t('loading')}</div>:
					<>
					{dataFin?.verified ? <div className='text-center'>{t('verSuc')}</div>:<>
					<p>{t('verText')}: {count}</p> 
					<p className="mb-2">{t('verText2')}</p>
					<Form.Item name={'code'} >
						<Input.OTP length={4}  />
					</Form.Item>
					<Button className="w-full" onClick={finalFnVer}>
						{t('addBtn')}
					</Button></>} 
					</>}
				</Spin>
				}
			</Modal>
		</Form>

	)
}
